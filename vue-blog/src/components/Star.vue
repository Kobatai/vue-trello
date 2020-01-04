<template>
  <!-- tooltip 表示のために tooltip クラスを追加 -->
  <!-- ユーザー名は動的に取得するため data-tooltip 属性にバインドする -->
  <pm-icon
    name="star"
    class="is-small has-text-info tooltip"
    :data-tooltip="userName"
    @mouseover.native.once="loadUserName"
  ></pm-icon>
</template>

<script>
import pmIcon from "./Icon";
import { userService } from "@/services/UserService";

export default {
  name: "pm-star",
  components: { pmIcon },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userName: null
    };
  },
  methods: {
    async loadUserName() {
      if (this.userName) {
        return;
      }
      const user = await userService.getUser(this.userId);
      this.userName = user ? user.name : "不明なユーザー";
    }
  }
};
</script>
