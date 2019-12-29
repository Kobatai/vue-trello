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
          type="usl"
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
    addBookmark() {
      // TODO: 登録処理を入れる
    },
    validateTitle(title) {
      this.titleError = null;
      if (!title) {
        this.titleError = "タイトルは必須です";
      } else if (title.length > 50) {
        this.titleError = "タイトルは50文字までです。";
      }
    },
    validateCpmment(comment) {
      // コメントがあって150以上ならエラー文、そうじゃなければnull
      this.commentError =
        comment && comment.length > 150 ? "コメントは150文字までです" : null;
    }
  }
};
</script>
