import gravatar from "gravatar";
import firebase from "./firebase";

class UserService {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  async getCurrentUser() {
    if (this.auth.currentUser == null) {
      throw new Error("サインインしていません。　サインインしてください");
    }

    // firestoreからuserを取得
    const snapshot = await this.db
      .collection("users")
      .where("authId", "==", this.auth.currentUser.uid)
      .get();

    // Firestoreのデータからユーザーオブジェクトを作成
    let user = null;
    snapshot.forEach(doc => {
      user = doc.data();
      user.id = doc.id;
    });
    return user;
  }

  async createUser(auth) {
    // 作成したコレクションに合わせてオブジェクトを作成する
    const user = {
      authId: auth.uid,
      name: auth.email.substr(0, auth.email.indexOf("@")),
      gravatarUrl: gravatar.url(auth.email)
    };
    // users コレクションに登録する
    await this.db.collection("users").add(user);
    return user;
  }
}

const userService = new UserService();
export { userService };
