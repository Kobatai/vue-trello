<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="avatarUrl" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong>{{ userName }}</strong>
        <div>{{ comment }}</div>
      </div>
      <nav class="level" v-if="comment">
        <div class="level-left">
          <!-- サインインしている場合のみ登録できるようにする -->
          <button
            class="level-item button is-outlined is-info"
            v-if="showAddButton"
            @click="addStar"
          >
            <pm-icon class="is-small" mode="far" name="star"></pm-icon>
          </button>
          <!-- スターの数だけ表示 -->
          <pm-icon
            name="star"
            class="is-small has-text-info"
            v-for="s in stars"
            :key="s"
          ></pm-icon>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
import pmIcon from "./Icon";

export default {
  name: "pm-user-comment",
  components: { pmIcon },
  props: {
    avatarUrl: String,
    userName: String,
    comment: String,
    // emit時にどのコメントに対するスターか呼び出し側に渡すため
    commentId: String,
    stars: Array,
    showAddButton: Boolean
  },
  methods: {
    addStar() {
      this.$emit("add-star", this.commentId);
    }
  }
};
</script>
