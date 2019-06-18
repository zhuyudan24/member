<template>
  <div class="buyer-part">
    <Navbar></Navbar>
    电商买家
  </div>
</template>

<script>
import Navbar from "@/view/layout/components/Navbar.vue";

export default {
  name: "buyermembers",
  components: {
    Navbar
  }
};
</script>

<style lang="stylus" scoped>
.buyer-part {
  padding: 0 20px;
}
</style>