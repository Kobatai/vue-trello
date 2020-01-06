<template>
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">退会しますか?</p>
        <button class="delete" aria-label="close" @click="cancel"></button>
      </header>
      <section class="modal-card-body">
        <div class="notification is-danger">
          退会するには現在のパスワードを入力して「退会する」ボタンをクリックしてください。この処理は元に戻すことはできません。
        </div>
        <pm-text-field
          label="現在のパスワード（必須）"
          type="password"
          placeholder="パスワード"
          icon="key"
          :error="passwordError"
          v-model="password"
        ></pm-text-field>
      </section>
      <footer class="modal-card-foor">
        <button class="button is-danger" @click="retire">退会する</button>
        <button class="button" @click="cancel">キャンセル</button>
      </footer>
    </div>
  </div>
</template>

<script>
import pmTextField from "./TextField";

export default {
  name: "pm-retire-modal",
  components: { pmTextField },
  props: {
    value: Boolean
  },
  data() {
    return {
      password: null,
      passwordError: null
    };
  },
  computed: {
    active: {
      get() {
        return this.value;
      },
      set(val) {
        if (this.value !== val) {
          this.$emit("input", val);
        }
      }
    }
  },
  methods: {
    retire() {
      if (!this.password) {
        this.passwordError = "現在のパスワードは必須です";
        return;
      }
      this.$emit("retire", {
        password: this.password,
        teardown: this.cancel
      });
    },
    cancel() {
      this.password = null;
      this.passwordError = null;
      this.active = false;
    }
  }
};
</script>
