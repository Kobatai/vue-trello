import firebase from "./firebase";

class AuthSeivice {
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
}

const authService = new AuthService();
export { authService };
