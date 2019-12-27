<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="tilte">{{ title }}</h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // このコンポーネント使用する時の名前で他とかぶらないようにprefixを付ける
  name: "pm-page-title",
  // 引数で受け取るものとその型
  props: { title: String }
};
</script>
