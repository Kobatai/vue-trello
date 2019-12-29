import gravatar from "gravatar";
import firebase from "./firebase";

class UserService {
  constructor() {
    this.db = firebase.firestore();
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
