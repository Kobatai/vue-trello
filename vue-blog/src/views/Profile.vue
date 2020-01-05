<template>
  <div class="container">
    <div class="columns" v-if="profile">
      <div class="column is-one-fifth">
        <p class="image is-128x128">
          <img :src="profile.avatarUrl || profile.gravatarUrl" />
        </p>
        <p>name: {{ profile.name }}</p>
        <div class="columns">
          <div class="column">
            <button
              class="button is-small is-primary is-outlined"
              @click="showProfileEditModal"
            >
              編集
            </button>
          </div>
        </div>
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
    <pm-profile-edit-modal
      v-if="profile"
      v-model="editProfileModalActive"
      :name="profile.name"
      @update="updateProfile"
    ></pm-profile-edit-modal>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { authService } from "@/services/AuthService";
import { userService } from "@/services/UserService";
import { userBookmarkService } from "@/services/UserBookmarkService";
import { storageService } from "@/services/StorageService";

import pmProfileEditModal from "@/components/ProfileEditModal";

export default {
  name: "profile",
  components: { pmProfileEditModal },
  data() {
    return {
      user: null,
      profile: null,
      bookmarks: [],
      editProfileModalActive: false
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
    // プロファイル編集ダイアログ表示・非表示の切り替え処理
    showProfileEditModal() {
      this.editProfileModalActive = true;
    },
    // プロファイル更新処理
    async updateProfile(val) {
      const data = { name: val.name };
      // ファイルが登録されれば更新処理
      if (val.file) {
        // ファイルをFIrebase Storageに保存しそのURLを取得
        data.avatarUrl = await storageService.uploadAvatar(
          this.profile.id,
          val.file
        );
      }
      // プロファイルの更新を行う
      await userService.updateUser(this.profile.id, data);
      // 更新後のプロファイルを取得
      this.profile = await userService.getCurrentUser();
      // 更新が終了したので終了処理を行う
      if (val.teardown) {
        val.teardown();
      }
    },
    formatTime(dateTime) {
      return dayjs(dateTime).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
