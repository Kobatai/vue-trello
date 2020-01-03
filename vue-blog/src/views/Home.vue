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
      user: null
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
