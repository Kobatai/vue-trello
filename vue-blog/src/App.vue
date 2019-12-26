<template>
  <div id="app">
    <nav id="nav" class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">Vue-blog</router-link>
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
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
              </a>
              <div class="navbar-dropdown is-right">
                <a class="navbar-item" @click="signOut">
                  <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                  </span>
                  <span>サインアウト</span>
                </a>
              </div>
            </div>
          </div>
          <div class="navbar-end" v-else>
            <div class="navbar-item">
              <router-link :to="{ name: 'sign_in'}" class="button is-text">
                <span class="icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>サインイン</span>
              </router-link>
            </div>
          </div>
          <div class="navbar-item">
            <router-link :to="{ name: 'sign_up'}" class="button is-text">
              <span class="icon">
                <i class="fas fa-user-plus"></i>
              </span>
              <span>サインアップ</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "app",
  data() {
    return {
      user: null
    };
  },
  // vueインスタンス作成時にfirebaseでログインしていればuserに値をセット
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    async signOut() {
      await firebase.auth().signOut();
      this.$router.push({ name: "home" });
    }
  }
};
</script>
