<template>
  <div>
    <!-- pm-page-titleにサインインをtitleで渡す -->
    <pm-page-title title="サインイン"></pm-page-title>
    <section class="section">
      <form class="container">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="email" placeholder="メールアドレス" v-model="email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="パスワード" v-model="password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <!-- submitボタンのデフォルトの挙動を制御 -->
            <button class="button is-primary" @click.prevent="signIn">サインイン</button>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import pmPageTitle from "@/components/PageTitle";

import { authService } from "@/services/AuthService";

export default {
  name: "sign_in",
  // 使用するcomponentを宣言
  components: {
    pmPageTitle
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signIn() {
      authService
        .signIn(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>
