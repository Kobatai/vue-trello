<template>
  <nav
    id="nav"
    class="navbar has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Vue-blog</router-link>
        <a
          role="button"
          id="navbar-burger"
          class="navbar-burger burger"
          :class="{ 'is-active': menuExpanded }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-links"
          @click="onMenuClicked"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbar-links"
        class="navbar-menu"
        :class="{ 'is-active': menuExpanded }"
      >
        <div class="navbar-end" v-if="user">
          <router-link :to="{ name: 'bookmark_new' }" class="navbar-item">
            <pm-icon name="bookmark"></pm-icon>
            <span>ブックマークする</span>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <pm-icon name="user"></pm-icon>
            </a>
            <div class="navbar-dropdown is-right">
              <router-link class="navbar-item" :to="{ name: 'profile' }">
                <pm-icon name="address-card"></pm-icon>
                <span>プロファイル</span>
              </router-link>
              <router-link class="navbar-item" :to="{ name: 'auth_edit' }">
                <pm-icon name="user-edit"></pm-icon>
                <span>認証情報変更</span>
              </router-link>
              <a class="navbar-item" @click="signOut">
                <pm-icon name="sign-out-alt"></pm-icon>
                <span>サインアウト</span>
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-end" v-else>
          <div class="navbar-item">
            <router-link :to="{ name: 'sign_in' }" class="button is-text">
              <pm-icon name="sign-in-alt"></pm-icon>
              <span>サインイン</span>
            </router-link>
          </div>
          <div class="navbar-item">
            <router-link :to="{ name: 'sign_up' }" class="button is-text">
              <span class="icon">
                <pm-icon name="user-plus"></pm-icon>
              </span>
              <span>サインアップ</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import pmIcon from "./Icon";

export default {
  name: "pm-nav-bar",
  components: { pmIcon },
  props: {
    user: Object,
    menuExpanded: Boolean
  },
  methods: {
    signOut() {
      this.$emit("sign-out-clicked");
    },
    // メニュークリック時の挙動
    // 現在メニューを開いているかどうかをemitで関数の引数として渡す
    onMenuClicked() {
      this.$emit("menu-clicked", this.menuExpanded);
    }
  }
};
</script>
