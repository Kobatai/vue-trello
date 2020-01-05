<template>
  <div>
    <pm-page-title title="認証情報変更"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field
          label="現在のパスワード（必須）"
          type="password"
          placeholder="パスワード"
          icon="key"
          v-model="currentPassword"
        ></pm-text-field>
        <pm-text-field
          label="新しいメールアドレス"
          type="email"
          placeholder="メールアドレス"
          icon="envelope"
          v-model="email"
        ></pm-text-field>
        <pm-text-field
          label="新しいパスワード"
          type="password"
          placeholder="パスワード"
          icon="lock"
          v-model="password"
        ></pm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="update">
              更新
            </button>
          </div>
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
  name: "auth_edit",
  components: { pmPageTitle, pmTextField },
  data() {
    return {
      email: null,
      password: null,
      currentPassword: null
    };
  },
  created() {
    authService.onStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    async update() {
      try {
        if (this.email || this.password) {
          await authService.update(
            this.currentPassword,
            this.email,
            this.password
          );
          // このページはprivate: trueで保護するのでサインアウトした場合エラーページに飛ぶので先にprivateじゃないページに移動
          this.$router.replace({ name: "home" });
          await authService.signOut();
          await authService.signIn(
            // 新しいメールアドレスは入力されるとは限らないので、新しいメールアドレスが入力されていれば
            // 新しいメールアドレスを使い、そうでなければ現在のメールアドレスを使用する
            this.email || this.user.email,
            this.password || this.currentPassword
          );
          alert("正常に更新されました");
        } else {
          alert("メールアドレスかパスワードのどちらかは入力してください");
        }
      } catch (e) {
        alert(e.message);
      }
    }
  }
};
</script>
