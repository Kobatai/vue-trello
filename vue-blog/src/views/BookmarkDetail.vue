<template>
  <div v-if="bookmark">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <a :href="bookmark.url">{{ bookmark.title }}</a>
          </h1>
          <h2 class="subtitle">{{ bookmark.userCount }} USERS</h2>
        </div>
      </div>
    </section>
    <section class="section content comments">
      <h2>コメント</h2>
      <pm-user-comment
        v-for="c in comments"
        :key="c.id"
        :avatar-url="c.user.avatarUrl || c.user.gravatarUrl"
        :user-name="c.user.name"
        :comment="c.comment"
      ></pm-user-comment>
    </section>
  </div>
</template>

<script>
import pmUserComment from "@/components/UserComment";
import { bookmarkService } from "@/services/BookmarkService";

export default {
  name: "bookmark_detail",
  componets: { pmUserComment },
  data() {
    return {
      bookmark: null,
      comments: null
    };
  },
  async created() {
    // ルーティングからパラメータを取得
    const bookmarkId = this.$route.params.id;
    this.bookmark = await bookmarkService.getBookmark(bookmarkId);
    if (this.bookmark == null) {
      // 取得できなければエラー
      this.$router.push({ name: "error_not_found" });
    }
    this.comments = await bookmarkService.getBookmarkComments(bookmarkId);
  }
};
</script>
