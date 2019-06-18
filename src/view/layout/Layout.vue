<template>
  <div>
    <vue-gic-header
      :projectName="projectName"
      @collapseTag="collapseTag"
      @toRouterView="toRouterView"
    ></vue-gic-header>
    <div
      class="layout"
      :style="{ height: bodyHeight - 64 + 'px'}"
    >
      <div class="app-main">
        <div class="rou-container">
          <div class="achievementwrap-left content-wrap"
            v-if="slideShow"
            :style="{height: (bodyHeight - 64) + 'px'}">
            <vue-gic-aside-menu
              :projectName="projectName"
              :leftModulesName="leftModulesName"
              :collapseFlag="collapseFlag">
            </vue-gic-aside-menu>
          </div>
          <div class="right-maincontainer">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <!-- <router-view></router-view> -->
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </div>
      </div>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
 import { doFetch } from "../../components/axios/api";
 import url from "../../components/axios/url";
import AppMain from "./components/AppMain";
export default {
  name: "layout",
  data() {
    return {
      collapseFlag: false,
      menuRouter: [],
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      leftModulesName: "会员",
      projectName: "member"
    };
  },
  computed: {
    slideShow() {
      return this.$store.state.slideShow;
    }
  },
  methods: {
    toRouterView(val) {
      this.$router.push({
        path: val.path
      });
    },
    getClerkMenu() {
       doFetch(url.clerkMenu,{
         project: 'gic-web'
       }).then(res => {
         this.menuRouter = res.data.result;
       }).catch(err => {
        //  checkStatus(err);
       })
    },
    collapseTag(val) {
      this.collapseFlag = !this.collapseFlag;
    }
  },
  created() {
    this.getClerkMenu();
    window.onresize = () => {
      return (() => {
        this.bodyHeight =
          document.body.clientHeight || document.documentElement.clientHeight;
      })();
    };
  },
  components: {
    AppMain
  }
};
</script>

<style lang="stylus">
.layout {
  overflow-x: auto;
  overflow-y: hidden;
  min-width: 1200px;
  padding-top: 64px;
  background-color: #f0f2f5;

  .app-main {
    height: 100%;
  }
}

.user-header-pop {
  min-width: 95px;
}

.el-popover.user-header-pop {
  min-width: 95px;
}

.rou-container {
  display: flex;
  height: 100%;

  .right-maincontainer {
    flex: 1;
    overflow: auto;
  }
}
</style>
