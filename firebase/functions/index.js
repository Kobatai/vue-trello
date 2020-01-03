const functions = require("firebase-functions");
// Firestore からデータを取得するためには firebase-admin が必要です
const admin = require("firebase-admin");
// Functions はすべて asia-northeast1 リージョンに登録します
const fns = functions.region("asia-northeast1");

// firebase-admin を初期化します
admin.initializeApp();
const db = admin.firestore();

// 同期間数の定義をします
exports.syncBookmark = fns.firestore
  // トリガーを設定するドキュメントを指定します
  // 固定のドキュメントのID を指定しない場合 {userId} の様に設定します
  // これは後で context.params.userId という形式で取得できます
  .document("users/{userId}/bookmarks/{bookmarkId}")
  // ドキュメントが作成されてたときに実行したいため onCreate を指定します
  // await を使用するためここで async をつけています
  .onCreate(async (snapshot, context) => {
    // snapshot に作成されたドキュメントのデータが入っています
    const userBookmark = snapshot.data();
    // bookmarks コレクションに URL が同じものがすでに存在しているかどうかを調べる
    // 後の処理で参照を再利用できるように都度変数に代入しています
    const bookmarksRef = db.collection("bookmarks");
    const bookmarkSnapshot = await bookmarksRef
      .where("url", "==", userBookmark.url)
      .get();
    if (bookmarkSnapshot.empty) {
      // 存在していないときは bookmarks コレクションに新規登録する
      const resultRef = await bookmarksRef.add({
        title: userBookmark.title,
        url: userBookmark.url,
        userCount: 1,
        createdAt: userBookmark.bookmarkedAt
      });
      // comments サブコレクションにも新規登録する
      resultRef.collection("comments").add({
        userId: context.params.userId,
        comment: userBookmark.comment,
        commentedAt: userBookmark.bookmarkedAt
      });
    } else {
      // すでに存在しているのでそのデータを取得する
      let bookmark = {};
      bookmarkSnapshot.forEach(doc => {
        bookmark.data = doc.data();
        bookmark.id = doc.id;
      });
      // 現在の comments サブコレクションを取得し、末尾に登録する
      const bookmarkRef = bookmarksRef.doc(bookmark.id);
      const commentsRef = bookmarkRef.collection("comments");
      const commentsSnapshot = await commentsRef.get();
      // ブックマークのドキュメントを userCount を増やしたデータで更新する
      bookmarkRef.set(
        Object.assign({}, bookmark.data, {
          userCount: commentsSnapshot.size + 1
        })
      );
      // comments サブコレクションに新規登録する
      commentsRef.add({
        userId: context.params.userId,
        comment: userBookmark.comment,
        commentedAt: userBookmark.bookmarkedAt
      });
    }
  });
