<template>
  <div class="member-achievement">
    <div class="member-achievement-container">
      <div>
        <v-nav :navpath="navpath"></v-nav>
        <!-- <el-breadcrumb separator="/" class="member-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/achievement_interaction">会员成就</el-breadcrumb-item>
        <el-breadcrumb-item>互动类</el-breadcrumb-item> -->
        <!-- </el-breadcrumb> -->
        <!-- <h2 class="member-title">会员互动</h2> -->
      </div>
      <div class="achievement">
        <div
          class="achievement-item"
          v-if="achievememntTypeList.length > 0"
          v-for="(item, index) in achievememntTypeList"
          :key="index"
        >
          <div class="achievement-top">
            <span class="achievement-title">{{ item.achievementName }}</span>
            <div class="achievement-handler tr">
              <el-switch
                v-model="item.isOpen"
                @change="changeValue(item, index)"
              >
              </el-switch>
              <!-- <a class="achievement-btn pointer" :class="{activebtn: item.isOpen == 1 }" @click="handleStatus(item,1)">启用</a><a  @click="handleStatus(item,0)" class="achievement-btn pointer" :class="{activebtn: item.isOpen == 0 }">停用</a> -->
            </div>
          </div>
          <div class="achievement-editwrap">
            <el-table
              :data="item.subAchievementList"
              tooltip-effect="dark"
              header-row-class-name="curheader"
            >
              <el-table-column
                prop="achievementTarget"
                label="额度"
              >
                <template slot-scope="scope">
                  <div>
                    <span>{{ item.achievementDoc | formatStart }}</span>
                    <el-input-number
                      class="numberinput"
                      v-show="scope.row.isEdit == true"
                      v-model="scope.row.achievementTarget"
                      controls-position="right"
                      :min="0"
                      :max="100000"
                    ></el-input-number>
                    <span v-show="scope.row.isEdit !== true">{{ scope.row.achievementTarget }} </span> <span>{{ item.achievementDoc | formatEnd }}</span>
                    <i
                      v-show="isEdit == 1 && scope.row.isEdit !== true"
                      @click="editAchievementTarget(scope.row)"
                      class="el-icon-edit pointer"
                    ></i>
                    <el-button
                      v-show="scope.row.isEdit == true"
                      @click="submitAchievementTarget(scope.row)"
                      type="text"
                    >
                      保存
                    </el-button>
                    <el-button
                      v-show="scope.row.isEdit == true"
                      @click="cancleAchievementTarget(scope.row)"
                      type="text"
                    >
                      取消
                    </el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="rewardValue"
                label="奖励"
              >
                <template slot-scope="scope">
                  <div>
                    <span>奖励 </span>
                    <span v-if="scope.row.achievementRewardType === 1">{{ scope.row.rewardValue }} <span> 积分</span></span>
                    <span v-if="scope.row.achievementRewardType === 2">{{ scope.row.rewardName }}</span>
                    <i
                      @click="eidtRewardValue(scope.row)"
                      v-show="isEdit == 1"
                      class="el-icon-edit pointer"
                    ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="couponStock"
                label="库存"
                width="300"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.achievementRewardType == 1">--</span>
                  <span v-if="scope.row.achievementRewardType == 2">{{scope.row.couponStock}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-box">
      <vue-gic-footer></vue-gic-footer>
    </div>
    <!--编辑奖励-->
    <el-dialog
      title="编辑奖励"
      :visible.sync="dilogRewardVisible"
      @closeDilog="closeDilog"
    >
      <el-form :model="rewardForm">
        <el-form-item
          label="奖励形式"
          label-width="100px"
          prop="achievementRewardType"
        >
          <span
            class="el-radio__input"
            @click="selectRewardType(1)"
            :class="rewardForm.achievementRewardType == 1 ? 'is-checked' : ''"
          ><span class="el-radio__inner"></span>
          </span><span class="el-radio__label">奖励</span>
          <span>
            <el-input-number
              class="numberinput"
              v-model="rewardForm.rewardValue"
              controls-position="right"
              :min="0"
              :max="999999"
            ></el-input-number> 积分
          </span>
        </el-form-item>
        <el-form-item
          label=""
          label-width="100px"
          prop="achievementRewardType"
        >
          <div @click="selectRewardType(2)">
            <span
              class="el-radio__input"
              :class="rewardForm.achievementRewardType == 2 ? 'is-checked' : ''"
            ><span class="el-radio__inner"></span>
            </span><span class="el-radio__label">奖励卡券</span>
            <div
              class="rewardname"
              style="color: #409EFF; cursor: pointer;"
              v-if="rewardNameFlag"
              @click="chooseCard"
            >
              <span>{{rewardPrize}}</span>
              {{rewardForm.rewardName}}
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dilog-footer"
      >
        <el-button @click="dilogRewardVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitRewardType"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑奖励-end-->
    <vue-gic-card
      :projectName="projectName"
      :cardLimit="cardLimit"
      :cardType="cardType"
      :showCardDialog="showCardDialog"
      @selectCard="selectCard"
      :disabledList="disabledList"
    ></vue-gic-card>
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
  name: "achievement",
  data() {
    return {
      prizeflag: false,
      integral: "",
      disabledList: [],
      rewardPrize: "",
      rewardNameFlag: false,
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "会员成就",
          path: "/achievement"
        },
        {
          name: "互动类",
          path: ""
        }
      ],
      activeitem: 1,
      tableData: [],
      isEdit: null,
      achievememntTypeList: [],
      achievememntTypeOneList: [],
      achievememntTypeTwoList: [],
      dilogRewardVisible: false,
      rewardForm: {
        achievementEnterpriseRankId: null,
        achievementRewardType: 1,
        rewardValue: null,
        rewardName: "",
        rewardReferId: null
      },
      showCardDialog: false,
      projectName: "member",
      cardLimit: 1,
      cardType: null
    };
  },
  filters: {
    formatStart: function(value) {
      if (value && value.indexOf("XX") !== -1) {
        let temp = value.split("XX");
        return temp[0];
      } else {
        return false;
      }
    },
    formatEnd: function(value) {
      if (value && value.indexOf("XX") !== -1) {
        let temp = value.split("XX");
        return temp[1];
      } else {
        return false;
      }
    }
  },
  methods: {
    chooseCard() {
      this.showCardDialog = true;
    },
    submitRewardType() {
      if (
        this.rewardForm.achievementRewardType !== 1 &&
        this.rewardForm.achievementRewardType !== 2
      ) {
        checkFalse("请选择奖励类型");
        return false;
      }
      if (this.rewardForm.achievementRewardType === 1) {
        if (this.rewardForm.rewardValue < 1) {
          checkFalse("积分奖励要大于0");
          return false;
        }
      }
      if (this.rewardForm.achievementRewardType === 2) {
        if (!this.rewardForm.rewardName.trim()) {
          checkFalse("请选择卡券");
          return false;
        }
        if (!this.rewardForm.rewardReferId) {
          checkFalse("卡券id不能为空");
          return false;
        }
      }
      let params = "";
      if (this.rewardForm.achievementRewardType === 1) {
        params = {
          achievementEnterpriseRankId: this.rewardForm
            .achievementEnterpriseRankId,
          updateType: 2,
          achievementRewardType: this.rewardForm.achievementRewardType,
          rewardValue: this.rewardForm.rewardValue,
          rewardName: "积分" + this.rewardForm.rewardValue
        };
      }
      if (this.rewardForm.achievementRewardType === 2) {
        params = {
          achievementEnterpriseRankId: this.rewardForm
            .achievementEnterpriseRankId,
          updateType: 2,
          achievementRewardType: this.rewardForm.achievementRewardType,
          rewardName: this.rewardForm.rewardName,
          rewardReferId: this.rewardForm.rewardReferId
        };
      }
      doFetch(url.achievementUpdate, params)
        .then(res => {
          if (res.data.errorCode === 0) {
            checkSuccess();
            this.getAchievementList();
          } else {
            checkFalse(res.data.message);
          }
          this.dilogRewardVisible = false;
        })
        .catch(err => {
          checkStatus(err);
          this.dilogRewardVisible = false;
        });
    },
    selectCard(val) {
      this.rewardForm.rewardName = val && val.cardName ? val.cardName : "";
      this.rewardPrize = "重新选择";
      this.showCardDialog = false;
      this.rewardForm.rewardReferId = val.coupCardId;
    },
    selectRewardType(type) {
      if (type === 1) {
        if (!this.prizeflag) {
          this.rewardPrize = "重新选择";
        }
        this.prizeflag = true;
        this.rewardForm.achievementRewardType = type;
      }
      if (type === 2) {
        this.rewardForm.achievementRewardType = type;
        this.rewardNameFlag = true;
        if (!this.prizeflag) {
          this.rewardPrize = "选择卡券";
          this.prizeflag = true;
        }
      }
    },
    closeDilog() {
      this.prizeflag = false;
    },
    eidtRewardValue(row) {
      this.rewardForm.achievementEnterpriseRankId = null;
      this.rewardForm.rewardValue = null;
      this.rewardForm.achievementRewardType = null;
      this.dilogRewardVisible = true;
      this.rewardForm.achievementEnterpriseRankId =
        row.achievementEnterpriseRankId;
      this.rewardForm.rewardValue = row.rewardValue;
      this.rewardForm.rewardName = row.rewardName;
      this.integral = row.rewardName;
      this.rewardForm.achievementRewardType = row.achievementRewardType;
      this.rewardForm.rewardReferId = row.rewardReferId;
      if (this.rewardForm.achievementRewardType === 1) {
        this.rewardForm.rewardName = "";
      }
      if (this.rewardForm.achievementRewardType === 2) {
        this.rewardPrize = "重新选择";
        this.rewardNameFlag = true;
      }
    },
    cancleAchievementTarget(row) {
      row.achievementTarget = row.isCurAchievementTarget;
      row.isEdit = false;
    },
    editAchievementTarget(row) {
      if (!row.isEdit) {
        Vue.set(row, "isEdit", true);
      } else {
        row.isEdit = true;
      }
      if (!row.isCurAchievementTarget) {
        Vue.set(row, "isCurAchievementTarget", row.achievementTarget);
      } else {
        row.isCurAchievementTarget = row.achievementTarget;
      }
    },
    submitAchievementTarget(row) {
      let params = {
        achievementEnterpriseRankId: row.achievementEnterpriseRankId,
        updateType: 1,
        achievementTarget: row.achievementTarget
      };
      doFetch(url.achievementUpdate, params)
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
    getAchievementList() {
      doFetch(url.achievementList)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.isEdit = res.data.result.isEdit;
            let tempArr = res.data.result.achievememntList;
            this.achievememntTypeOneList = tempArr.filter(item => {
              return item.achievementType == 1;
            });
            this.achievememntTypeTwoList = tempArr.filter(item => {
              return item.achievementType == 2;
            });
            this.achievememntTypeList = this.achievememntTypeTwoList.map(
              ele => ({
                ...ele,
                isOpen: !!ele.isOpen ? true : false,
                disabled: false
              })
            );
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getCurTab(tab) {
      if (tab === 1) {
        this.achievememntTypeList = this.achievememntTypeOneList;
      }
      if (tab === 2) {
        this.achievememntTypeList = this.achievememntTypeTwoList;
      }
      this.activeitem = tab;
    },
    changeValue(item) {
      const _item = item;
      const type = item.isOpen ? 1 : 0;
      // 判断奖励积分是否大于0 并且是否有卡券奖励
      for (let ele of _item.subAchievementList) {
        if (ele.achievementRewardType == 2) {
          if (ele.rewardReferId == -1 || !ele.rewardReferId) {
            this.$message.warning("卡券奖励不存在");
            item.isOpen = false;
            return;
          }
        } else if (ele.achievementRewardType == 1) {
          if (ele.rewardValue <= 0) {
            this.$message.warning("积分奖励不能小于等于0！");
            item.isOpen = false;
            return;
          }
        }
      }

      doFetch(url.achievementOpen, {
        achievementSystemId: item.achievementSystemId,
        openStatus: type
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            checkSuccess();
            this.getAchievementList();
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    handleStatus(item, type) {
      if (item.isOpen === type) {
        return false;
      }
      let text = "";
      if (type === 1) {
        text = "开启";
      }
      if (type === 0) {
        text = "停用";
      }
      this.$confirm(`确定${text}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          doFetch(url.achievementOpen, {
            achievementSystemId: item.achievementSystemId,
            openStatus: type
          })
            .then(res => {
              if (res.data.errorCode === 0) {
                this.getAchievementList();
              } else {
                checkFalse(res.data.message);
                return false;
              }
            })
            .catch(err => {
              checkStatus(err);
            });
        })
        .catch(err => {
          checkStatus(err);
        });
    }
  },
  created() {
    this.getAchievementList();
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="stylus" scoped>
.rewardname {
  margin-left: 24px;
  line-height: 0;
}

.achievement {
  display: block;
  padding: 20px 25px;

  &-item {
    padding: 15px 10px;
    margin-bottom: 16px;
    background-color: #fff;

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

.member-breadcrumb {
  line-height: 60px;
  padding-left: 20px;
  background-color: #fff;
}

.member-title {
  background-color: #fff;
  padding-left: 20px;
  padding-bottom: 20px;
  font-size: 20px;
  color: #303133;
}

.member-achievement-container {
  min-height: 100%;
  padding-bottom: 100px;
}

.footer-box {
  margin-top: -100px;
}
</style>
