<template>
  <div>
    <pm-page-title title="ブックマークの登録"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field
          placeholder="タイトル"
          :error="titleError"
          @change="validateTitle"
          v-model="title"
        ></pm-text-field>
        <pm-text-field
          type="url"
          placeholder="URL"
          :error="urlError"
          @change="validateUrl"
          v-model="url"
        ></pm-text-field>
        <pm-text-field
          placeholder="コメント"
          :error="commentError"
          @change="validateComment"
          v-model="comment"
        ></pm-text-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" @click.prevent="addBookmark">
              登録する
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

import { userService } from "@/services/UserService";
import { userBookmarkService } from "@/services/UserBookmarkService";

export default {
  name: "bookmark_new",
  components: { pmPageTitle, pmTextField },
  data() {
    return {
      title: null,
      url: null,
      comment: null,
      titleError: null,
      urlError: null,
      commentError: null
    };
  },
  methods: {
    // awaitを使用するためasyncをつける
    async addBookmark() {
      this.validateAll();

      const error = this.titleError || this.urlError || this.commentError;

      if (error) {
        alert("入力値が不正です。");
        return;
      }

      const user = await userService.getCurrentUser();
      // すでに同じurlでブックマークしているかのチェック
      const userBookmark = await userBookmarkService.getBookmark(
        user,
        this.url
      );

      if (userBookmark != null) {
        alert("すでに登録されているURLです。");
        return;
      }

      const form = {
        title: this.title,
        url: this.url,
        comment: this.comment
      };

      try {
        await userBookmarkService.addBookmark(user, form);
        this.$router.push({ name: "home" });
      } catch (e) {
        alert(e.message);
      }
    },
    validateAll() {
      this.validateTitle(this.title);
      this.validateUrl(this.url);
      this.validateComment(this.comment);
    },
    validateTitle(title) {
      this.titleError = null;
      if (!title) {
        this.titleError = "タイトルは必須です";
      } else if (title.length > 50) {
        this.titleError = "タイトルは50文字までです。";
      }
    },
    validateUrl(url) {
      this.urlError = null;
      if (!url) {
        this.urlError = "URLは必須です";
      }
    },
    validateComment(comment) {
      // コメントがあって150文字以上ならエラー文、そうじゃなければnull
      this.commentError =
        comment && comment.length > 150 ? "コメントは150文字までです" : null;
    }
  }
};
</script>
