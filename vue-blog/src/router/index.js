import Vue from "vue";
import Router from "vue-router";
// コンポーネントをインポート
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import BookmarkNew from "../views/BookmarkNew";
import Error404 from "../views/Error404";
import BookmarkDetail from "../views/BookmarkDetail";
import Profile from "../views/Profile";

Vue.use(Router);

export default new Router({
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
      component: BookmarkNew
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
      component: Profile
    },
    {
      path: "/not_found",
      name: "error_not_found",
      component: Error404
    },
    {
      path: "*",
      name: "error_unknown_path",
      component: Error404
    }
  ]
});
