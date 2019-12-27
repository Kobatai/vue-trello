<template>
  <span class="icon">
    <i :class="['fas', nameClass]"></i>
  </span>
</template>

<script>
export default {
  name: "pm-icon",
  props: { name: Srting },
  // tpl内で読み取れる関数
  // ここではFontawesomeのfaを返す
  computed: {
    nameClass() {
      return `fa-${this.name}`;
    }
  }
};
</script>
