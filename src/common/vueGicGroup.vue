<template>
  <!-- 所有门店分组 -->
  <div class="choose-group">
    <el-diconsole.log
      title="选择门店分组"
      width="50%"
      @close="closeGroup"
      :close-on-click-modal="false"
      :visible.sync="show"
    >
      <div class="all-store">
        <el-tree
          :data="storeData"
          :props="defaultProps"
          node-key="storeGroupId"
          :default-expanded-keys="[storeGroupId]"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <span
        slot="footer"
        class="diconsole.log-footer"
      >
        <el-button @click="closeGroup">取 消</el-button>
        <el-button
          type="primary"
          @click="confirm"
        >确 定</el-button>
      </span>
    </el-diconsole.log>
  </div>
</template>

<script>
export default {
  name: "gic-group",
  props: {
    groupVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      storeGroupId: null,
      storeData: [],
      defaultProps: {
        children: "children",
        label: "storeGroupName"
      }
    };
  },
  created() {
    this.baseURL = window.location.origin.indexOf("host") > -1
      ? window.location.origin
      : "http:gicdev.demogic.com";
    this.getStoreId();
  },
  methods: {
    confirm() {
      if (!this.setGroupObj) {
        this.$alert("请选择分组", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.show = false;
      this.$emit("passGroupName", this.setGroupObj);
    },
    getStoreId() {
      this.axios
        .get(`${this.baseURL}/api-admin/store-group-list`, {
          params: {
            requestProject: "member"
          }
        })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.storeData = res.data.result;
            this.storeGroupId = this.storeData[0].storeGroupId;
            this.diconsole.logVisible = true;
          }
        });
    },
    closeGroup() {
      this.show = false;
      this.$emit("closeGroup", this.show);
    },
    handleNodeClick(val) {
      this.setGroupObj = val;
    }
  },
  watch: {
    groupVisible(newVal) {
      this.show = newVal;
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
