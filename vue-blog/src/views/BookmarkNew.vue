<template>
  <div>
    <pm-page-title title="ブックマークの登録"></pm-page-title>
    <section class="section">
      <form class="container">
        <pm-text-field placeholder="タイトル" v-model="title"></pm-text-field>
        <pm-text-field
          type="usl"
          placeholder="URL"
          v-model="url"
        ></pm-text-field>
        <pm-text-field placeholder="コメント" v-model="comment"></pm-text-field>
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
      comment: null
    };
  },
  methods: {
    addBookmark() {
      // TODO: 登録処理を入れる
    }
  }
};
</script>
