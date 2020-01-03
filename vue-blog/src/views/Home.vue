<template>
  <div class="container">
    <div class="columns is-multiline bookmarks">
      <div class="column is-4" v-for="b in bookmarks" :key="b.id">
        <pm-bookmark-card
          :url="b.url"
          :title="b.title"
          :userCount="b.userCount"
          :createdAt="b.createdAt"
        ></pm-bookmark-card>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <button
          class="button is-rounded is-fullwidth"
          v-if="hasNext"
          @click="loadNextBookmarks"
        >
          もっとみる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "@/services/AuthService";
import { bookmarkService } from "@/services/BookmarkService";

import pmBookmarkCard from "@/components/BookmarkCard";

export default {
  name: "home",
  components: { pmBookmarkCard },
  data() {
    return {
      // ブックマークデータの受け口
      bookmarks: [],
      user: null,
      hasNext: false
    };
  },
  // ライフサイクルフック
  // Vueインスタンスが作成された時に実行される
  async created() {
    authService.onStateChanged(user => {
      this.user = user;
    });

    // ブックマークを取得し設定
    const bookmarks = await bookmarkService.getBookmarks(30);
    this.bookmarks = bookmarks;
    // 初期データを30件取得できない場合は次のページはないと判断
    this.hasNext = this.bookmarks.length === 30;
  },
  methods: {
    // データ追加処理
    async loadNextBookmarks() {
      // 最後のブックマークの作成日以降のデータを取得
      const nextBookmarks = await bookmarkService.getBookmarks(
        30,
        this.bookmarks[this.bookmarks.length - 1].createdAt
      );
      // 30件取得できない場合、次のページはないと判断する
      this.hasNext = nextBookmarks.length === 30;
      // dataに追加
      this.bookmarks.push(...nextBookmarks);
    }
  }
};
</script>

<style scoped>
/* style scopedはこのコンポーネントにだけ作用する CSS を宣言するときに使用 */
/* これ以外のコンポーネントのbookmarksクラスには影響しない */
/* navbarにくっつかないようにmarginを設定 */
.bookmarks {
  margin-top: 1rem;
}
</style>
