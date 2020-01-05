import firebase from "./firebase";

class StorageService {
  constructor() {
    this.ref = firebase.storage().ref();
  }

  async uploadAvatar(userId, file) {
    const path = `users/${userId}/${file.name}`;
    const snapshot = await this.ref.child(path).put(file);

    // 作成したファイルのURLを保持するためURLを取得して返す
    return await snapshot.ref.getDownloadURL();
  }
}

const storageService = new StorageService();
export { storageService };
