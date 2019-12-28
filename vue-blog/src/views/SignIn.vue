<template>
  <div>
    <!-- pm-page-titleにサインインをtitleで渡す -->
    <pm-page-title title="サインイン"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field type="email" placeholder="メールアドレス" icon="envelope" v-model="email"></pm-text-field>
        <pm-text-field type="password" placeholder="パスワード" icon="lock" v-model="password"></pm-text-field>
        <div class="field is-grouped">
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
import pmTextField from "@/components/TextField";

import { authService } from "@/services/AuthService";

export default {
  name: "sign_in",
  // 使用するcomponentを宣言
  components: {
    pmPageTitle,
    pmTextField
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
