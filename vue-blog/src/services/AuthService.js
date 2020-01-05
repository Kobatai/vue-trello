import firebase from "./firebase";

class AuthService {
  constructor() {
    this.auth = firebase.auth();
  }

  onStateChanged(fn) {
    this.auth.onAuthStateChanged(fn);
  }

  signUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  // 認証情報更新処理
  async update(currentPassword, email, password) {
    // 再認証の部分を共通処理として別メソッドにしたので変更
    const user = await this.reauthenticate(currentPassword);
    if (email) {
      await user.updateEmail(email);
    }
    if (password) {
      await user.updatePassword(password);
    }
  }

  // 認証情報を削除することで退会処理とする
  async retire(password) {
    const user = await this.reauthenticate(password);
    await user.delete();
  }

  // 再認証処理
  async reauthenticate(password) {
    const user = this.auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    user.reauthenticateWithCredential(credential);
    return user;
  }
}

const authService = new AuthService();
export { authService };
