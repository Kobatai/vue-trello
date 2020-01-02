const functions = require("firebase-functions");

// Firestoreからデータを取得するため
const admin = require("firebase-admin");
// regionの指定
const fns = functions.region("asia-northeast1");

admin.initializeApp();
const db = admin.firestore();

// 同期関数の定義
exports.syncBookmark = fns.firestore
  // トリガーを設定するドキュメントを指定
  // usersのドキュメント配下のbookmarks
  // {userId}のようにすることでcontext.params.userIdというような形で取得できる
  .document("users/{userId}/bookmarks/{bookmarkId}")
  // documentが作成されていた場合に実行
  .onCreate(async (snapshot, context) => {
    // snapshotにドキュメントのデータが入っている
    const userBookmark = snapshot.data();
    // bookmarksコレクションに同じURLがないかチェックするため
    // また使うため変数化
    const bookmarksRef = db.collection("bookmarks");
    const bookmarkSnapshot = await bookmarksRef
      .where("url", "==", userBookmark.url)
      .get();
    if (bookmarkSnapshot.empty) {
      // 存在していないときはbookmarksコレクションに新規登録する
      const resultRef = await bookmarksRef.add({
        title: userBookmark.title,
        url: userBookmark.url,
        userCount: 1,
        createdAt: userBookmark.bookarkedAt
      });
      // commentsのサブコレクションにも新規登録する
      resultRef.collection("comments").add({
        // context.params.userIdで{userId}を取得する
        userId: context.params.userId,
        comment: userBookmark.comment,
        commentedAt: userBookmark.bookarkedAt
      });
    } else {
      // すでに存在している場合
      let bookmark = {}:
      bookmarkSnapshot.forEach(doc => {
        bookmark.data = doc.data();
        bookmark.id = doc.id;
      });
      // 現在のcommentsサブコレクションを取得して、末尾に登録をする
      const bookmarkRef = bookmarksRef.doc(bookamrk.id);
      const commentsRef = bookmarkRef.collection("comments");
      const commentsSnapshot = await commentsRef.get();

      // ブックマークのドキュメントをuserCountを増やしたデータで更新する
      bookmarkRef.set(
        Object.assign({}, bookmark.data, {
          userCount: commentsSnapshot.size + 1
        })
      );
      // commentsサブコレクションに新規登録する
    }
  });
