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
    const user = this.auth.currentUser;
    // ユーザーの認証情報を現在のアドレスとPWで取得する
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    // 再度認証を行う
    await user.reauthenticateWithCredential(credential);
    if (email) {
      await user.updateEmail(email);
    }
    if (password) {
      await user.updatePassword(password);
    }
  }
}

const authService = new AuthService();
export { authService };
