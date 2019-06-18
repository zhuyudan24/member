<template>
  <div
    class="achievementwrap"
    :style="{height: (bodyHeight - 64) + 'px'}"
  >
    <div class="achievementwrap-right">
      <div :style="{height: '100%'}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../view/layout/components/Navbar.vue";
export default {
  name: "memberlist",
  data() {
    return {
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      defaultActive: this.$route.path
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.bodyHeight =
          document.body.clientHeight || document.documentElement.clientHeight;
      })();
    };
  },
  components: {
    Navbar
  }
};
</script>

<style lang="stylus" scoped>
.achievementwrap {
  display: flex;
  flex: 1;
  overflow: hidden;

  &-left {
    flex: 0 0 200px;
    width: 200px;
    background-color: #020b21;
  }

  &-right {
    flex: 1;
    overflow: auto;
  }
}

.rewardname {
  margin-left: 24px;
  line-height: 0;
}

.fooconsole.logo {
  padding: 0 !important;
}
</style>
