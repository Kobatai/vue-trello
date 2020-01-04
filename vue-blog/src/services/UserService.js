import gravatar from "gravatar";
import firebase from "./firebase";
import { cacheService } from "./CacheService";

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

  // キャッシュからユーザー一覧を取得するロジック
  async getUser(userId) {
    const users = cacheService.getItem("users") || {};
    // 特定のIDのユーザーが登録されていなければ新規に取得
    if (!users[userId]) {
      const userRef = await this.db
        .collection("users")
        .doc(userId)
        .get();
      let user = null;
      if (userRef.exists) {
        user = {
          ...userRef.data(),
          id: userId
        };
      }
      // ユーザー一覧に取得したユーザーを設定しキャッシュに登録する
      users[userId] = user;
      cacheService.setItem("users", users);
    }
    return users[userId];
  }
}

const userService = new UserService();
export { userService };
