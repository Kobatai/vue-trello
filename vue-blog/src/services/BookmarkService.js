import firebase from "./firebase";

class BookmarkService {
  constructor() {
    this.db = firebase.firestore();
  }

  async getBookmarks(num, time) {
    let ref = this.db.collection("bookmarks");
    // 日時が渡されたときは指定日以降のデータを取得
    if (time) {
      ref = ref.where("createdAt", "<", time);
    }

    const snapshot = await ref
      .orderBy("createdAt", "desc")
      .limit(num)
      .get();
    return snapshot.docs.map(doc => {
      return {
        // dataの内容を展開してコピーする
        ...doc.data(),
        id: doc.id,
        // firestore 内のタイムスタンプデータは firestore.Timestamp という特殊なクラスで帰ってくる
        // ここではそれを JavaScript 標準の Date に変換
        createdAt: doc.data().createdAt.toDate()
      };
    });
  }
}
const bookmarkService = new BookmarkService();
export { bookmarkService };
