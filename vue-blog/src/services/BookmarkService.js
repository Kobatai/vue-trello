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

  async getBookmark(id) {
    if (id == null) {
      return null;
    }

    const snapshot = await this.db
      .collection("bookmarks")
      .doc(id)
      .get();
    if (snapshot.exists) {
      return {
        // snapshotを展開してコピーする
        ...snapshot.data(),
        id: id
      };
    }
    return null;
  }

  async getBookmarkComments(id) {
    const snapshot = await this.db
      .collection("bookmarks")
      .doc(id)
      .collection("comments")
      .get();
    const comments = [];
    for (let doc of snapshot.doc) {
      const userId = doc.data().userId;
      const user = await this.db
        .collection("users")
        .doc(userId)
        .get();
      comments.push({
        ...doc.data(),
        id: doc.id,
        user: {
          ...user.data(),
          id: userId
        }
      });
    }
    return comments;
  }

  // スター登録ロジック
  async addStar(bookmarkId, commentId, userId) {
    const commentRef = this.db
      .collection("bookmarks")
      .doc(bookmarkId)
      .collection("comments")
      .doc(commentId);

    const comment = await commentRef.get();
    // すでにスターの配列があればそれを使用、なければ空の配列を用意
    const stars = comment.data().stars || [];
    stars.push(userId);
    // 特定のフィールドを更新するためにはupdateに更新するフィールドだけを設定したオブジェクトを渡す
    return commentRef.update({ stars: stars });
  }
}
const bookmarkService = new BookmarkService();
export { bookmarkService };
