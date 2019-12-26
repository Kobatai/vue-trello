<template>
  <div class="container">
    <span v-if="user">こんにちは {{ user.email }} さん</span>
    <span v-else>ログインしていません</span>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "home",
  data() {
    return {
      user: null
    };
  },
  // ライフサイクルフック
  // Vueインスタンスが作成された時に実行される
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>
