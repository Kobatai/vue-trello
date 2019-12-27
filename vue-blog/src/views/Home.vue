<template>
  <div class="container">
    <span v-if="user">こんにちは {{ user.email }} さん</span>
    <span v-else>ログインしていません</span>
  </div>
</template>

<script>
import { authService } from "@/services/AuthService";

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
    authService.onStateChanged(user => {
      this.user = user;
    });
  }
};
</script>
