<template>
  <div
    class="member-task"
    :style="{ height: bodyHeight - 64 + 'px'}"
  >

    <div class="min100">
      <v-nav :navpath="navpath"></v-nav>
      <div class="achievement">
        <div
          class="achievement-item"
          v-for="(missitem, index) in missionList"
          :key="index"
        >
          <div class="achievement-top">
            <span class="achievement-title">{{ missitem.missionName }}</span>
          </div>
          <div class="achievement-editwrap">
            <el-table
              :data="missitem.item"
              tooltip-effect="dark"
              header-row-class-name="curheader"
            >
              <el-table-column
                prop="missionItemName"
                label="字段名称"
              ></el-table-column>
              <el-table-column
                prop="rewardValue"
                label="奖励积分额">
                <template slot-scope="scope">
                  <p>奖励
                    <el-input-number
                      v-show="scope.row.isEdit == true"
                      maxlength="6"
                      v-model="scope.row.rewardValue"
                      controls-position="right"
                      :min="0"
                      :max="100000"
                    ></el-input-number>
                    <span v-show="scope.row.isEdit !== true"> {{ scope.row.rewardValue }} </span> 积分
                    <i
                      v-show="isEdit == 1 && scope.row.isEdit !== true"
                      @click="editRewardValue(scope.row)"
                      class="el-icon-edit pointer"
                    ></i>
                    <el-button
                      v-show="isEdit == 1 && scope.row.isEdit == true"
                      @click="submitRewardValue(scope.row)"
                      type="text"
                    >
                      保存
                    </el-button>
                    <el-button
                      v-show="isEdit == 1 && scope.row.isEdit == true"
                      @click="cancleRewardValue(scope.row)"
                      type="text"
                    >
                      取消
                    </el-button>
                    <!-- <i v-show="isEdit == 0 && scope.row.isEdit == true" @click="submitRewardValue(scope.row)" class="el-icon-check pointer"></i>
                  <i v-show="isEdit == 0 && scope.row.isEdit == true" @click="cancleRewardValue(scope.row)" class="el-icon-close pointer"></i> -->
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="开关"
                v-if="isEdit == 1"
                width="300">
                <template slot-scope="scope">
                  <div class="achievement-handler">
                    <el-switch
                      v-model="scope.row.statusEdit"
                      @change="changeValue(scope.row)"
                      active-text="启用"
                      inactive-text="停用"
                    >
                    </el-switch>
                    <!-- <a class="achievement-btn pointer" :class="{activebtn: scope.row.status == 1}"  @click="handlerStatus(scope.row,1)" >启用</a><a class="achievement-btn pointer" :class="{activebtn: scope.row.status == 0}"  @click="handlerStatus(scope.row,0)" >停用</a> -->
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-box foot-add">
      <vue-gic-footer></vue-gic-footer>
    </div>
  </div>
</template>

<script>
import nav from "../../common/navbar/navbar.vue";
import { doFetch } from "../../components/axios/api";
import url from "../../components/axios/url";
import {
  checkFalse,
  checkStatus,
  checkSuccess
} from "../../../static/js/checkStatus";
import Vue from "vue";
export default {
  name: "membertask",
  data() {
    return {
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "会员",
          path: "/wechatmembers"
        },
        {
          name: "会员任务",
          path: ""
        }
      ],
      isEdit: null,
      missionList: []
    };
  },
  methods: {
    changeVal(i) {
       val = val.length > 6 ? val.substr(0, 6) : val;
    },
    getMemberMissionList() {
      doFetch(url.memberMissionList)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.isEdit = res.data.result.isEdit;
            this.missionList = res.data.result.missionList.map(ele => ({
              ...ele,
              item: ele.item.map(item => ({
                ...item,
                statusEdit: item.status == 1 ? true : false
              }))
            }));
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    editRewardValue(row) {
      if (!row.isEdit) {
        Vue.set(row, "isEdit", true);
      } else {
        row.isEdit = true;
      }
      if (!row.isCurValue) {
        Vue.set(row, "isCurValue", row.rewardValue);
      } else {
        row.isCurValue = row.rewardValue;
      }
    },
    submitRewardValue(row) {
      doFetch(url.memberMissionUpdate, {
        missionItemEnterpriseId: row.missionItemEnterpriseId,
        usedRule: row.usedRule,
        rewardRule: row.rewardRule,
        rewardValue: row.rewardValue
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            row.isEdit = false;
            checkSuccess();
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    cancleRewardValue(row) {
      row.rewardValue = row.isCurValue;
      row.isEdit = false;
    },
    changeValue(row) {
       const _item = row;
      const type = row.statusEdit ? 1 : 0;
      if (type == 1) {
        if (row.rewardValue === 0) {
          checkFalse("请完善积分奖励");
          row.statusEdit = false;
          return false;
        }
      }
      if (row.status === type) {
        row.statusEdit = false;
        return false;
      }
      doFetch(url.memberMissionOpen, {
        missionItemEnterpriseId: row.missionItemEnterpriseId,
        status: type
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            row.status = type;
            checkSuccess();
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    }
  },
  created() {
    this.getMemberMissionList();
    this.$store.commit("mutations-slide", false);
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="stylus">
.member-task {
  overflow: auto;
}

.achievement {
  display: block;
  padding: 24px;

  &-item {
    padding: 15px 10px;
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-top {
    display: flex;
  }

  &-title {
    font-size: 16px;
    font-weight: bold;
  }

  &-handler {
    flex: 1;
  }

  &-btn {
    display: inline-block;
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 6px 20px;
    box-sizing: border-box;

    &:last-child {
      border-left: 0;
    }
  }

  .activebtn {
    border: 1px solid $btncolor;
    color: #fff;
    background-color: $btncolor;
  }

  &-editwrap {
    margin: 20px 0;
  }
}
</style>
