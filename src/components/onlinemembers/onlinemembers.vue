<template>
  <div class="online-part">
    <Navbar></Navbar>
    电商会员
  </div>
</template>

<script>
import Navbar from "@/view/layout/components/Navbar.vue";

export default {
  name: "onlinemembers",
  components: {
    Navbar
  }
};
</script>

<style lang="stylus" scoped>
.online-part {
  padding: 0 20px;
}
</style>
