<template>
  <div id="app">
    <pm-nav-bar :user="user" @sign-out-clicked="signOut"></pm-nav-bar>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
// firebaseのサービスクラスをインポート(@は同じディレクトリであるapp/vue-blog/srcという意味)
import { authService } from "@/services/AuthService";

import pmNavBar from "@/components/NavBar";

export default {
  name: "app",
  components: { pmNavBar },
  data() {
    return {
      user: null
    };
  },
  // vueインスタンス作成時にfirebaseでログインしていればuserに値をセット
  created() {
    authService.onStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    async signOut() {
      await authService.signOut();
      this.$router.push({ name: "home" });
    }
  }
};
</script>
