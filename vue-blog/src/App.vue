<template>
  <div id="app">
    <pm-nav-bar
      :user="user"
      :menu-expanded="menuExpanded"
      @sign-out-clicked="signOut"
      @menu-clicked="switchMenuState"
    ></pm-nav-bar>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
// firebaseのサービスクラスをインポート(@は同じディレクトリであるapp/vue-blog/srcという意味)
import { authService } from "@/services/AuthService";
import { cacheService } from "@/services/CacheService";

import pmNavBar from "@/components/NavBar";

export default {
  name: "app",
  components: { pmNavBar },
  data() {
    return {
      user: null,
      // menuが開いているかどうかのパラメーター
      menuExpanded: false
    };
  },
  // vueインスタンス作成時にfirebaseでログインしていればuserに値をセット
  created() {
    // ユーザーのキャッシュを削除
    cacheService.removeItem("users");
    authService.onStateChanged(user => {
      this.user = user;
    });
    // ページ遷移する前に実行すること
    this.$router.beforeEach((to, from, next) => {
      this.menuExpanded = false;
      next();
    });
  },
  methods: {
    async signOut() {
      await authService.signOut();
      this.$router.push({ name: "home" });
    },
    // emitで受け取ったイベントのメソッド
    switchMenuState(currentState) {
      this.menuExpanded = !currentState;
    }
  }
};
</script>
