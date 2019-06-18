<template>
  <div class="minwidth1200">
    <v-nav :navpath="navpath"></v-nav>
    <div class="wrap modify-container">
      <el-form
        ref="IntegralForm"
        :model="IntegralForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          label="调整积分"
          prop="editType"
        >
          <el-radio-group v-model="IntegralForm.editType">
            <el-radio :label=1>增加积分</el-radio>
            <el-radio :label=2>扣除积分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="调整额度"
          prop="accumulatPoints"
        >
          <el-input-number
            v-model="IntegralForm.accumulatPoints"
            controls-position="right"
            :min="1"
            :max="100000"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="原因备注"
          prop="remark"
        >
          <el-input
            style="width: 400px;"
            type="textarea"
            v-model="IntegralForm.remark"
            :maxlength="50"
          > </el-input>
          <div class="remark-limit">{{remarkTotal}}/50</div>
        </el-form-item>
        <!-- <el-form-item
          label="成本金额"
          prop="cash"
        >
          <el-input
            style="width: 150px"
            placeholder="请输入成本金额"
            v-model="IntegralForm.cash"
            @keyup.native="formatCash"
          ></el-input> &nbsp; 元
          <p style="font-size: 12px; color: #f00;">输入数字且保留两位小数</p>
        </el-form-item> -->

        <el-form-item
          label="原始成本主体"
          v-show="integralFlag == 'gic'"
        >
          <div>
            <span
              class="is-require"
              style="color: red; float: left;margin-left: -105px;"
            >*</span>
            <span
              class="pointer"
              @click="deductionType = 1"
            >
              <span
                class="el-radio__input"
                :class="{'is-checked': deductionType == 1}"
              >
                <span class="el-radio__inner"></span>
              </span>
              <span
                class="el-radio__label"
                v-show="IntegralForm.editType == 1"
              >选择主体</span>
              <span
                class="el-radio__label"
                v-show="IntegralForm.editType == 2"
              >遵循先进先出原则</span>
            </span>
            <span
              class="pointer"
              style="margin-left: 25px;"
              @click="chooseDetails"
              v-show="IntegralForm.editType == 1"
            >
              <span
                class="el-radio__input"
                :class="{'is-checked': deductionType == 2}"
              >
                <span class="el-radio__inner"></span>
              </span>
              <span
                class="el-radio__label"
                v-show="IntegralForm.editType == 1"
              >选择明细</span>
            </span>
          </div>
          <!-- remote reserve-keyword :remote-method="handleKeyup" -->
          <el-select
            v-show="deductionType == 1 && IntegralForm.editType == 1"
            v-model="IntegralForm.mainPartStoreId"
            filterable
            clearable
            remote
            reserve-keyword
            @change="changeVal"
            :remote-method="handleKeyup"
            placeholder="请输入原始成本主体名称"
            :loading="loading"
          >
            <el-option
              v-for="item in storeList"
              :key="item.storeId"
              :label="item.storeName"
              :value="item.storeId"
            ></el-option>
          </el-select>
          <div
            style="color: #f00; font-size: 14px;"
            v-show="mainRequired"
          >主体为必填内容</div>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="table-container"
      v-show="deductionType == 2 && IntegralForm.editType == 1"
    >
      <div class="mBottom20">
        <el-row>
          <el-col :span="12">
            <el-date-picker
              v-model="rangeVal"
              type="daterange"
              @change="changeDate"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <!-- <el-select v-model="intervalInOut"  placeholder="所有日志" @change="handleSearch">
              <el-option :key=-1 label="所有日志" :value=-1></el-option>
              <el-option :key=1 label="积分获取" :value=1></el-option>
              <el-option :key=2 label="积分扣除" :value=2></el-option>
            </el-select> -->
            <el-select
              v-model="dictCode"
              placeholder="所有事由"
              @change="handleSearch"
            >
              <el-option
                :key=-1
                label="所有事由"
                :value=-1
              ></el-option>
              <el-option
                v-for="(item, index) in dictList"
                :key="index"
                :label="item.dictName"
                :value="item.dictCode"
              ></el-option>
            </el-select>
          </el-col>
          <div :span="12">
            <div class="displayflex tr">
              <div class="flex">
                <el-input
                  v-model="searchStr"
                  prefix-icon="el-icon-search"
                  placeholder="请输入会员名称"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="handleSearch"
                ></el-input>
              </div>
            </div>
          </div>
        </el-row>
      </div>

      <div class="mBottom40">
        <div class="table-content" >
          <el-table
            :data="memberData"
            tooltip-effect="dark"
            ref="multipleTable"
          >
            <el-table-column
              prop="callBeginTime"
              label="时间"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.createTime | formatTimeYMD }}</div>
                <div>{{ scope.row.createTime | formatTimeHMS }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="intervalInout"
              label="日志类型"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.intervalInout == 1">积分获取</span>
                <span v-if="scope.row.intervalInout == 2">积分扣除</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="intervalHistory"
              label="日志详情"
            >
              <template slot-scope="scope">
                <span :style="{color: scope.row.intervalHistory > 0 ? '#00c52d' : 'red'}">{{ scope.row.intervalHistory > 0 ? '+' : '-' }}{{ scope.row.intervalHistory }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="memberIntegralName"
              label="事由"
            ></el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
            ></el-table-column>
            <el-table-column
              prop="mainStoreName"
              label="主门店"
            ></el-table-column>
            <!-- <el-table-column prop="openStoreName" label="开卡门店"></el-table-column> -->
            <el-table-column
              prop="intervalEffect"
              label="可扣积分"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.intervalEffect">{{ scope.row.intervalEffect }}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="调整积分"
              width="180"
            >
              <template slot-scope="scope">
                <!-- {{IntegralForm.editType}} 1 是增加积分 2 是扣除积分 -->
                <div class="adjust-points">
                  <el-input-number
                    v-model="scope.row.adjustPoint"
                    controls-position="right"
                    :min="0"
                    :max="100000"
                    v-if="IntegralForm.editType == 1"
                  ></el-input-number>
                  <el-input-number
                    v-model="scope.row.adjustPoint"
                    controls-position="right"
                    :min="0"
                    :max="scope.row.intervalHistory"
                    v-if="IntegralForm.editType == 2"
                  ></el-input-number>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="page mTop20"
            v-if="page.totalCount > 0"
          >
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[20, 40, 60, 80]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next"
              :total="page.totalCount"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="footwrap">
      <el-button
        plain
        @click="goback"
      >返 回</el-button>
      <el-button
        type="primary"
        @click="submitIntegral('IntegralForm')"
      >确认调整</el-button>
    </div>
  </div>
</template>

<script>
import nav from "../../common/navbar/navbar.vue";
import { doFetch, doFetchqs } from "../../components/axios/api";
import { dateformat } from "@/utils/formatTime";
import url from "../../components/axios/url";
import {
  checkFalse,
  checkStatus,
  checkSuccess
} from "../../../static/js/checkStatus";
import searchinput from "common/searchinput";
export default {
  name: "talkLogPage",
  data() {
    return {
      mainRequired: false,
      memberId: this.$route.query.memberId || "",
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "微信会员",
          path: "/wechatmembers"
        },
        {
          name: "会员详情",
          path: "/wechatmemberDetail?memberId=" + this.$route.query.memberId
        },
        {
          name: "积分明细",
          path: "/integralDataPage?memberId=" + this.$route.query.memberId
        },
        {
          name: "会员积分调整",
          path: ""
        }
      ],
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      rangeVal: [
        dateformat(new Date(+new Date() - 3600 * 24 * 1000 * 30), "yyyy-MM-dd"),
        dateformat(new Date(), "yyyy-MM-dd")
      ],
      intervalInOut: 1,
      dictCode: -1,
      searchStr: "",
      searchType: 1,
      beginTime: "",
      endTime: "",
      storeName: "",
      dictList: [],
      dilogIntegralVisible: false,
      IntegralForm: {
        editType: 1,
        accumulatPoints: 0,
        remark: "",
        mainPartStoreId: "",
        cash: ""
      },
      storeList: [],
      loading: false,
      rules: {
        accumulatPoints: [
          { required: true, message: "请选择调整额度", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请输入原因备注", trigger: "change" }
        ],
        cash: [{ required: true, message: "请输入成本金额", trigger: "change" }]
      },
      integralFlag: "",
      deductionType: 1
    };
  },
  computed: {
    remarkTotal() {
      return this.IntegralForm.remark.length;
    }
  },
  filters: {
    formatTimeYMD(val) {
      return val != "--" ? val.split(" ")[0] : "--";
    },
    formatTimeHMS(val) {
      return val != "--" ? val.split(" ")[1] : "--";
    }
  },
  methods: {
    formatCash(eve) {
      const REG = /^[0-9]+(.[0-9]{0,2})?$/;
      let value = eve.target.value;
      if (!REG.test(value)) {
        eve.target.value = "";
      }
    },
    chooseDetails() {
      this.deductionType = 2;
      this.mainRequired = false;
    },
    changeVal(val) {
      if (!!val) {
        this.mainRequired = false;
      }
    },
    submitIntegral(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 选择主体
          if (
            this.integralFlag == "gic" &&
            this.deductionType == 1 &&
            this.IntegralForm.editType == 1 &&
            !this.IntegralForm.mainPartStoreId
          ) {
            this.mainRequired = true;
            return;
          }
          // 如果有明细 判断调整额度是否等于调整积分和
          if (this.deductionType == 2) {
            // this.IntegralForm.accumulatPoints ===
            let totalPoint = this.memberData.reduce(
              (cla, ele) => cla + ele.adjustPoint,
              0
            );
            // 如果调整额度不相等
            if (this.IntegralForm.accumulatPoints !== totalPoint) {
              this.$alert("调整额度与调整积分不匹配", "提示", {
                confirmButtonText: "确定"
              });
              return;
            }
          }
          // 明细说明
          let detailData = this.memberData.map(ele => ({
            id: ele.intervalLogId,
            val: ele.adjustPoint
          }));
          const datas = {
            memberId: this.memberId, // 会员id
            editType: this.IntegralForm.editType, // 调整方式
            accumulatPoints: this.IntegralForm.accumulatPoints, // 调整额度
            deductionType: this.deductionType, // 原始成本主体选择
            mainPartStoreId: this.IntegralForm.mainPartStoreId, // 成本主体
            remark: this.IntegralForm.remark, // 备注
            detailJson: JSON.stringify(detailData) // 明细说明
          };
          if (this.submitFlag) {
            this.submitFlag = false;
            doFetch(url.memberIntegralUpdate, datas)
              .then(res => {
                if (res.data.errorCode == 0) {
                  this.submitFlag = true;
                  checkSuccess();
                  this.$router.back();
                } else {
                  this.submitFlag = true;
                  checkFalse();
                }
              })
              .catch(err => {
                this.submitFlag = true;
                checkStatus(err);
              });
          }
        } else {
          // 占位
        }
      });
    },
    handleKeyup(val) {
      this.getStoreCodeName(val);
    },
    getStoreCodeName(val) {
      // 如果条件为空 则不查
      if (!val) return;
      doFetchqs(url.storeCodeName, {
        searchParam: val,
        flag: 1
      })
        .then(res => {
          this.loading = true;
          if (res.data.errorCode === 0) {
            this.loading = false;
            this.storeList = res.data.result;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    handleSearch() {
      this.page.currentPage = 1;
      this.getIntegralDataPage();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getIntegralDataPage();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getIntegralDataPage();
    },
    goback() {
      this.$router.push({
        path: "integralDataPage",
        query: { memberId: this.memberId }
      });
    },
    changeDate(val) {
      this.getIntegralDataPage();
    },
    // 选择明细查分页
    getIntegralDataPage() {
      const datas = {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        intervalInOut: this.intervalInOut,
        dictCode: this.dictCode,
        searchStr: this.searchStr,
        searchType: this.searchType,
        beginTime: !!this.rangeVal[0]
          ? dateformat(new Date(this.rangeVal[0]), "yyyy-MM-dd")
          : "",
        endTime: !!this.rangeVal[1]
          ? dateformat(new Date(this.rangeVal[1]), "yyyy-MM-dd")
          : "",
        storeName: this.storeName
      };
      doFetch(url.integralDataPage, datas)
        .then(res => {
          if (res.data.errorCode === 0) {
            if (res.data.result.page.result) {
              this.memberData = res.data.result.page.result.map(ele => ({
                ...ele,
                createTime: !!ele.createTime
                  ? dateformat(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss")
                  : "--",
                adjustPoint: 0
              }));
              this.page.currentPage = res.data.result.page.currentPage;
              this.page.totalCount = res.data.result.page.totalCount;
            } else {
              this.memberData = [];
              this.page.totalCount = 0;
            }
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getIntegralOperateType() {
      doFetch(url.integralOperateType, {
        businessType: "member_integral",
        dictStatus: 1
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.dictList = res.data.result.dictList;
          } else {
            checkFalse();
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getEnterpriseInfo() {
      doFetch(url.enterpriseInfo)
        .then(res => {
          if (res.data.errorCode == 0) {
            this.integralFlag = res.data.result.enterpriseInfo.integralFlag;
            if (this.integralFlag == "gic" && this.memberId) {
              this.getIntegralDataPage();
            }
          } else {
            checkFalse();
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    }
  },
  created() {
    this.submitFlag = true;
    if (this.memberId) {
      this.getEnterpriseInfo();
      this.getIntegralOperateType();
      this.$store.commit("mutations-slide", false);
    }
  },
  components: {
    "v-nav": nav,
    searchinput
  }
};
</script>

<style lang="stylus">
.clerk {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clerkimg {
  flex: 0 0 60px;
  width: 60px;
}

.clerkname {
  flex: 1;
  margin-left: 5px;
}

.remark-limit {
  width: 390px;
  color: #c0c4cc;
  text-align: right;
}

.modify-container {
  margin: 20px;
  margin-bottom: -20px;
  padding: 24px 24px 10px 24px;
  background-color: #fff;
}

.table-container {
  padding: 0 20px 20px 140px;
  margin: 20px;
  background-color: #fff;
}
</style>
