<template>
  <!-- tplを使用する側が渡してきたclass属性とマージされる ex)icon is-small is-left-->
  <span class="icon">
    <!-- @はv-onの省略記法,: はv-bindの省略記法で属性及びコンポーネントプロパティを動的に設定する -->
    <!-- 属性値を<i class="fas fa-{{name}}"></i>とするとエラーになるため -->
    <!-- fasとnameClassをjsに渡してfas fa-userのようなものが返ってきている -->
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
