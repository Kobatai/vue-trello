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
        :commentId="c.id"
        :stars="c.stars"
        :show-add-button="isSignedIn"
        @add-star="addStar"
      ></pm-user-comment>
    </section>
  </div>
</template>

<script>
import pmUserComment from "@/components/UserComment";
import { authService } from "@/services/AuthService";
import { bookmarkService } from "@/services/BookmarkService";
import { userService } from "@/services/UserService";

export default {
  name: "bookmark_detail",
  componets: { pmUserComment },
  data() {
    return {
      bookmark: null,
      comments: null,
      isSignedIn: false
    };
  },
  async created() {
    authService.onStateChanged(u => {
      this.isSignedIn = u != null;
    });
    // ルーティングからパラメータを取得
    const bookmarkId = this.$route.params.id;
    this.bookmark = await bookmarkService.getBookmark(bookmarkId);
    if (this.bookmark == null) {
      // 取得できなければエラー
      this.$router.push({ name: "error_not_found" });
    }
    this.comments = await bookmarkService.getBookmarkComments(bookmarkId);
  },
  methods: {
    async addStar(commentId) {
      if (this.isSignedIn) {
        const user = await userService.getCurrentUser();
        const bookmarkId = this.$route.params.id;
        await bookmarkService.addStar(bookmarkId, commentId, user.id);
        this.comments = await bookmarkService.getBookmarkComments(bookmarkId);
      }
    }
  }
};
</script>
