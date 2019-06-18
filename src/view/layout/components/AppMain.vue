<template>
  <div>
    <div class="app-main">
      <div class="achievementwrap-left content-wrap" :style="{height: (bodyHeight - 64) + 'px'}">
        <vue-gic-aside-menu
          :projectName="projectName"
          :leftModulesName="leftModulesName"
          :collapseFlag="collapseFlag">
        </vue-gic-aside-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'AppMain',
  props: {
    collapseFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bodyHeight: document.body.clientHeight || document.documentElement.clientHeight,
      leftModulesName: '会员标签',
      projectName: 'member'
    };
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.bodyHeight =  document.body.clientHeight || document.documentElement.clientHeight;
      })()
    }
  },
  components: {
    Navbar
  }
}
</script>
<style lang="stylus" scoped>
  .app-main
    position relative
    display flex
    .achievementwrap-left
      display inline-block
    /*padding 0 25px*/
</style>
