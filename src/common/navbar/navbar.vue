<template>
  <div class="navbarwrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in navpath"
        :key="index"
      >
        <a
          :href="homeurl"
          v-if="index === 0"
        >{{item.name}}</a>
        <router-link
          class="member-bread-link"
          :to="item.path"
          :class="{ 'member-nav-link' : item.path !== '' }"
          v-if="index !== 0"
        >
          {{item.name}}
        </router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="navtitle">
      {{ navpath[navpath.length - 1].name }}
      <slot name="member"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navpath",
  data() {
    return {
      curitem: 0,
      homeurl: `${window.location.origin}/report/#/memberSummary`
    };
  },
  props: {
    navpath: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.navbarwrap {
  padding: 20px 25px;
  background-color: #fff;
  border-radius: 2px;

  .navtitle {
    margin: 24px 0 0 0;
    font-size: 20px;
    color: #303133;
    font-weight: 700;

    .wechat-setting {
      float: right;
      padding: 8px 15px;
      text-align: right;
      line-height: 1;
      border: 1px solid #dcdfe6;
      color: #606266;
      box-sizing: border-box;
      font-size: 14px;
      border-radius: 4px;
      font-weight: initial;
      cursor: pointer;

      &:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }
    }
  }
}

.boxshow {
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 5px -1px 5px #dfdfdf;
}

.member-bread-link {
  cursor: pointer;
}

.member-nav-link {
  font-weight: 700;
  color: #303133;
}
</style>
