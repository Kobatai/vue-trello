import firebase from "./firebase";

class UserBookmarkService {
  constructor() {
    this.db = firebase.firestore();
  }

  // userのブックマークを取得する関数
  async getBookmark(user, url) {
    const userBookmarkSnapshot = await this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .where("url", "==", url)
      .get();

    if (userBookmarkSnapshot.empty) {
      return null;
    }

    let userBookmark = null;
    userBookmarkSnapshot.forEach(doc => {
      userBookmark = doc.data();
      userBookmark.id = doc.id;
    });

    return userBookmark;
  }
  // ブックマークの登録の関数
  addBookmark(user. form) {
    // ブックマークの登録する時間はサーバーの時間を使用する
    form.bookmarkedAt = firebase.firestore.FieldValue.serverTimestamp();
    // 現在のユーザーのサブコレクションである`bookmarks`に登録する
    return this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .add(form);
  }
}

const UserBookmarkService = new UserBookmarkService();
export { UserBookmarkService }
