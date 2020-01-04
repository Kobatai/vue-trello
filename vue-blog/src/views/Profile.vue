<template>
  <div class="container">
    <div class="columns" v-if="profile">
      <div class="column is-one-fifth">
        <p class="image is-128x128">
          <img :src="profile.avatarUrl || profile.gravatarUrl" />
        </p>
        <p>name: {{ profile.name }}</p>
      </div>
      <div class="column is-for-fifths">
        <div class="card" v-for="b in bookmarks" :key="b.id">
          <div class="card-content">
            <div class="content">
              <div>
                <a :href="b.url">{{ b.title }}</a>
              </div>
              <div>{{ b.comment }}</div>
              <div>
                <time
                  class="is-size-7"
                  :datatime="formatTime(b.bookmarkedAt)"
                  >{{ formatTime(b.bookmarkedAt) }}</time
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { authService } from "@/services/AuthService";
import { userService } from "@/services/UserService";
import { userBookmarkService } from "@/services/UserBookmarkService";

export default {
  name: "profile",
  data() {
    return {
      user: null,
      profile: null,
      bookmarks: []
    };
  },
  async created() {
    authService.onStateChanged(async user => {
      this.user = user;
      // サインインしていなければ実行しない
      if (user) {
        this.profile = await userService.getCurrentUser();
        this.bookmarks = await userBookmarkService.getBookmarks(this.profile);
      }
    });
  },
  methods: {
    formatTime(dateTime) {
      return dayjs(dateTime).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
