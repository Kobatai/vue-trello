const functions = require("firebase-functions");
// Firestore からデータを取得するためには firebase-admin が必要です
const admin = require("firebase-admin");
// gravatar のインポート
const gravatar = require("gravatar");
// faker のインポート
const faker = require("faker");

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

// 認証機能
const auth = admin.auth();
//ユーザーを5人作成
const userNames = ["alice", "bob", "charlie", "dave", "ellen"];
// テストユーザーを作成する関数
exports.testUsers = fns.https.onRequest(async (req, res) => {
  await Promise.all(
    userNames.map(userName => {
      // firebase-adminのユーザー作成関数を実行
      return auth
        .createUser({
          email: `${userName}@example.com`,
          emailVerified: false,
          password: "12345678",
          disabled: false
        })
        .then(user => {
          // ユーザーが作成されたらFirestoreに登録する
          return db
            .collection("users")
            .doc(userName)
            .set({
              authId: user.uid,
              name: user.email.substr(0, user.email.indexOf("@")),
              gravatarUrl: gravatar.url(user.email)
            });
        })
        .catch(console.log);
    })
  );
  // 結果のレスポンスを返す
  res.status(200).send("users are created successfully.");
});

// ブックマークのテストデータを作成する関数
exports.testBookmarks = fns.https.onRequest(async (req, res) => {
  // 100件のURLを生成する
  const urls = [];
  for (let i = 0; i < 100; i++) {
    urls.push(faker.internet.url());
  }

  // バッチによる一括書き込み処理のためのオブジェクトを取得する
  const batch = db.batch();
  // Promise.all で全てのユーザーブックマークサブコレクションの参照取得まで待機する
  const refs = await Promise.all(
    userNames.map(userName => {
      return db
        .collection("users")
        .doc(userName)
        .collection("bookmarks");
    })
  );
  refs.forEach(ref => {
    urls.forEach(url => {
      // 30%の確率でブックマークしないようにする
      if (Math.random() < 0.3) {
        return;
      }

      // 20%の確率でコメントはなしとする
      const comment = Math.random() >= 0.2 ? faker.lorem.sentence(4) : null;
      // バッチに書き込み処理を登録する
      batch.create(ref.doc(), {
        title: url.toUpperCase().replace(/HTTPS?:\/\//, ""),
        url: url,
        comment: comment,
        // 登録日をランダムにする
        bookmarkedAt: faker.date.between("2010-01-01", "2018-12-31")
      });
    });
  });
  // バッチによる一括書き込みを実行する
  const result = await batch.commit();
  // 結果として作成件数を含めたレスポンスを返す
  res.status(200).send(`${result.length} bookmarks are created successfully.`);
});
