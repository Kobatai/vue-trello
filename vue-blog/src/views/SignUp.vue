<template>
  <div>
    <!-- pm-page-titleにサインアップをtitleで渡す -->
    <pm-page-title title="サインアップ"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field type="email" placeholder="メールアドレス" icon="envelope" v-model="email"></pm-text-field>
        <pm-text-field type="password" placeholder="パスワード" icon="lock" v-model="password"></pm-text-field>
        <div class="field">
          <p class="control">
            <!-- submitボタンのデフォルトの挙動を制御 -->
            <button class="button is-primary" @click.prevent="signUp">サインアップ</button>
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
  name: "sign_up",
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
    signUp() {
      // 認証用オブジェクトの取得
      authService
        // ユーザーの新規作成処理
        .signUp(this.email, this.password)
        .then(() => {
          // 成功したらTOPページへ遷移
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          // エラーがあれば表示
          alert(error.message);
        });
    }
  }
};
</script>
