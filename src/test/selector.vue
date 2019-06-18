<template>
  <div class="selector-router">
    <vue-gic-goods-selector ref="selector"></vue-gic-goods-selector>
    <div class="gic-button">
      <el-button
        type="primary"
        @click="confirm"
        v-if="expends"
      >确认</el-button>
      <el-button
        @click="goback"
        v-else
      >返回</el-button>
    </div>
    <h1>一共有{{ total }}条数据</h1>
    <!-- 展示数据 -->
    <div>
      <li v-for="(r, i) in ret" :key="i" class="good-list">{{r}}</li>
    </div>
  </div>
</template>

<script>
import vueGicGoodsSelector from "./goods/index.vue";
import { doFetchqs } from "../components/axios/api";
import { baseUrl, ERR_OK } from "@/config/index.js";

export default {
  name: "selector",

  components: {
    vueGicGoodsSelector
  },

  data() {
    return {
      expends: true,
      ret: [],
      total: 0
    };
  },

  methods: {
    // 提交
    confirm() {
      // 占位
      this.$refs.selector.collectConditions().then(res => {
        this.expends = !res.filterAbbrInfo.length;
        this.getGoodsList(res.conditions);
      });
    },
    // reback 返回展示选的选项
    goback() {
      this.ret = [];
      this.expends = !this.expends;
      this.$refs.selector.removeConditions();
    },
    // 通过商品选择器获取商品列表
    getGoodsList(queryList) {
      const data = {
        currentPage: 1,
        pageSize: 40,
        source: 1,
        queryList: queryList
      };
      this.axios.post(`${baseUrl}/api-plug/store-goods-sku-filter`,data).then(res => {
        if (res.data.errorCode === ERR_OK) {
          const data = res.data.result;
          this.ret = data.result;
          this.total = data.total;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.selector-router {
  width: 650px;
  margin: 40px auto;
  .gic-button {
    margin-top: 20px;
  }
  .good-list {
    margin: 10px 0;
  }
}
</style>
