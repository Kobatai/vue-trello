<template>
  <nav id="nav" class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Pitmark</router-link>
        <a
          role="button"
          id="navbar-burger"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-links"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar-links" class="navbar-menu">
        <div class="navbar-end" v-if="user">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <pm-icon name="user"></pm-icon>
            </a>
            <div class="navbar-dropdown is-right">
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
    user: Object
  },
  methods: {
    signOut() {
      this.$emit("sign-out-clicked");
    }
  }
};
</script>
