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
    </div>
  </article>
</template>

<script>
export default {
  name: "pm-user-comment",
  props: {
    avatarUrl: String,
    userName: String,
    comment: String
  }
};
</script>
