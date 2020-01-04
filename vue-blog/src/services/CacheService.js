class CacheService {
  getItem(key) {
    const value = localStorage.getItem(key);
    // ローカルストレージはユーザーのローカル環境のブラウザにデータを保存できるもので永続的
    // sessionStorageはウィンドウを閉じるまで
    // クッキーは指定期限まで
    // ローカルストレージには文字列でデータを保存するのでJSON形式に復元する
    return value != null ? JSON.parse(value) : null;
  }

  setItem(key, value) {
    if (value != null) {
      // ローカルストレージには文字列でデータを保存するためJSONから文字列に変換する
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, null);
    }
  }
  removeItem(key) {
    localStorage.removeItem(key);
  }
}

const cacheService = new CacheService();
export { cacheService };
