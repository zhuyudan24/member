<template>
  <div class="member-setting">
    <div class="minheight">
      <v-nav :navpath="navpath"></v-nav>
      <div class="setting-con">
        <div class="setting-container">
          <el-switch v-model="value"></el-switch>
          <span class="member-setting-txt">是否允许好办通过会员姓名、手机号和卡号搜索查询全品牌会员</span>
        </div>
        <div class="save-btn">
          <el-button
            type="primary"
            @click="saveSet(2)"
          >保存</el-button>
        </div>
      </div>
    </div>
    <div class="footer-box">
      <vue-gic-footer></vue-gic-footer>
    </div>
  </div>
</template>

<script>
import nav from "@/common/navbar/navbar.vue";
import { doFetch } from "../../components/axios/api";
import {
  checkFalse,
} from "../../../static/js/checkStatus";
import { setTimeout } from "timers";

export default {
  components: {
    "v-nav": nav
  },
  data() {
    return {
      navpath: [
        { name: "首页", path: "" },
        { name: "微信会员", path: "/wechatmembers" },
        { name: "会员设置", path: "" }
      ],
      value: false,
      projectName: "member",
      actionUrl: "/api-plug/upload-img",
      dilogVisible: false,
      maxlength: 5,
      dilogImageUrl: ""
    };
  },
  methods: {
    // 上传的方法
    uploadOnSuccess(obj) {
      obj.file.url = obj.res.result[0].qcloudImageUrl;
      this.imageList.push(obj.file);
    },
    deleteImage(i) {
      this.imageList.splice(i, 1);
    },
    saveSet(types) {
      doFetch("/api-member/members-setting", {
        optype: types,
        appStatus: !!this.value ? 1 : 0
      }).then(res => {
        if (res.data.errorCode === 0) {
          if (res.data.result.appStatus == 1) {
            this.value = true;
          }
          // 主动设置
          if (types == 2) {
            this.$message({
              message: "设置成功！",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({ path: "/wechatmembers" });
            }, 1000);
          }
        } else {
          checkFalse(res.data.message);
        }
      });
    },
    sortImg(val) {
      this.imageList = val;
    }
  },
  created() {
    this.saveSet(1);
    this.$store.commit("mutations-slide", true);
  }
};
</script>

<style lang="stylus" scoped>
.setting-con {
  margin: 24px 24px 0;
  padding: 24px 24px 48px;
  background-color: #fff;

  .setting-container {
    height: 20px;
    line-height: 20px;
    font-size: 14px;

    .member-setting-txt {
      position: relative;
      margin-left: 5px;
      top: 2px;
      color: #606266;
    }
  }

  .save-btn {
    margin-top: 24px;
  }
}

.member-setting {
  height: 100%;
  background-color: #f5f7fa;
}

.minheight {
  min-height: 100%;
}

.footer-box {
  margin-top: -116px;
}
</style>
