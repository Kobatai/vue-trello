import Vue from "vue";
import Router from "vue-router";
// コンポーネントをインポート
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import BookmarkNew from "../views/BookmarkNew";
import BookmarkDetail from "../views/BookmarkDetail";
import Profile from "../views/Profile";

// エラー周り
import Error404 from "../views/Error404";
import Error401 from "../views/Error401";

// サービスクラス
import { authService } from "../services/AuthService";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: SignUp
    },
    {
      path: "/sign_in",
      name: "sign_in",
      component: SignIn
    },
    {
      path: "/bookmarks/new",
      name: "bookmark_new",
      component: BookmarkNew,
      meta: { private: true }
    },
    {
      // :idとすることでidをパラメータとしている
      path: "/bookmarks/:id",
      name: "bookmark_detail",
      component: BookmarkDetail
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { private: true }
    },
    {
      path: "/not_found",
      name: "error_not_found",
      component: Error404
    },
    {
      path: "/unauthorized",
      name: "error_unauthorized",
      component: Error401
    },
    {
      path: "*",
      name: "error_unknown_path",
      component: Error404
    }
  ]
});

// ページ遷移前に実行されるメソッド
router.beforeEach((to, from, next) => {
  // 表示しようとしているページがプライベート設定されているかどうかチェック
  // someは配列が条件を一つ満たしていればtrueを返す
  // アロー関数で配列要素を短く表現 recはto
  if (to.matched.some(rec => rec.meta.private)) {
    authService.onStateChanged(user => {
      if (user) {
        // そのまま表示
        next();
      } else {
        // 認証エラーのページ表示
        next({ name: "error_unauthorized" });
      }
    });
  } else {
    // プレイベートなページではないのでそのまま表示
    next();
  }
});

export default router;
