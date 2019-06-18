<template>
  <div class="minwidth1200 wechat-point-details">
    <div class="con-container">
      <v-nav :navpath="navpath"></v-nav>
      <div class="wrap table-container">
        <div class="mBottom20">
          <el-row>
            <el-col :span="12">
              <el-select
                v-model="intervalInOut"
                style="margin-right: 7px;"
                placeholder="所有日志"
                @change="handleSearch"
              >
                <el-option
                  :key=-1
                  label="所有日志"
                  :value=-1
                ></el-option>
                <el-option
                  :key=1
                  label="积分获取"
                  :value=1
                ></el-option>
                <el-option
                  :key=2
                  label="积分扣除"
                  :value=2
                ></el-option>
              </el-select>
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
                  v-for="item in dictList"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-col>
            <div :span="12">
              <div class="displayflex tr">
                <div class="flex">
                  <searchinput
                    stylelink="width: 280px"
                    prefix-icon="el-icon-search"
                    placeholder="请输入会员姓名/昵称/手机"
                    v-model="searchStr"
                    @handleSearch="handleSearch"
                  ></searchinput>
                </div>
                <div class="ml15">
                  <el-button
                    type="primary"
                    @click="linkRoute('/modifyintegral')"
                  >调整积分</el-button>
                </div>
              </div>
            </div>
          </el-row>
        </div>

        <div class="mBottom40">
          <div class="table-content">
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
                  {{ scope.row.createTime | formatTime }}
                </template>
              </el-table-column>
              <el-table-column
                prop="intervalInout"
                label="日志类型"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.intervalInout == 1">积分获取</span>
                  <span v-if="scope.row.intervalInout == 0">积分扣除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="intervalHistory"
                label="日志详情"
              >
                <template slot-scope="scope">
                  <span :style="{color: scope.row.intervalHistory > 0 ? 'green' : 'red'}">{{ scope.row.intervalHistory }}</span>
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
              <el-table-column
                prop="openStoreName"
                label="开卡门店"
              ></el-table-column>
              <el-table-column
                prop="intervalEffect"
                label="积分成本主体"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.intervalInout == 0">--</span>
                  <span v-if="scope.row.intervalInout == 1">{{scope.row.mainPartStoreName ? scope.row.mainPartStoreName : '--'}}</span>
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
    </div>
    <!-- <div class="footwrap">
      <el-button plain @click="goback">返回</el-button>
    </div> -->
    <el-dialog
      title="积分扣除来源"
      :visible.sync="loseVisible"
      width="60%"
      :close-on-click-modal="false"
    >
      <div class="lose-dilog">
        <el-table
          :data="loseData"
          tooltip-effect="dark"
          ref="multipleTable"
        >
          <el-table-column
            prop="createTime"
            label="日期"
            width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="intervalHistory"
            label="日志详情"
          >
            <template slot-scope="scope">
              <span :style="{color: scope.row.intervalHistory > 0 ? 'green' : 'red'}">{{ scope.row.intervalHistory }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberIntegralName"
            label="事由"
          ></el-table-column>
          <el-table-column
            prop="mainPartStoreName"
            label="积分成本主体"
          >
            <template slot-scope="scope">
              <span>{{scope.row.mainPartStoreName ? scope.row.mainPartStoreName : '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sourceIntegralChange"
            label="扣除积分值"
          >
            <template slot-scope="scope">
              <span style="color: red">{{ scope.row.sourceIntegralChange }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="intervalEffect"
            label="积分剩余值"
          ></el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dilog-footer"
      >
        <el-button @click="loseVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="loseVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

    <div class="footer-box">
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
  checkStatus
} from "../../../static/js/checkStatus";
import searchinput from "common/searchinput";
import { formatLongTime } from "@/utils/utils";

export default {
  name: "talkLogPage",
  data() {
    return {
      loseVisible: false,
      loseData: [],
      memberId: this.$route.query.memberId || "",
      navpath: [
        {
          name: "首页",
          path: "/"
        },
        {
          name: "会员详情",
          path:"/wechatmemberDetail?memberId=" + this.$route.query.memberId || ""
        },
        {
          name: "会员积分明细",
          path: ""
        }
      ],
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      intervalInOut: -1,
      dictCode: -1,
      searchStr: "",
      searchType: 1,
      beginTime: "",
      endTime: "",
      storeName: "",
      dilogPlayVisible: false,
      curRecordUrl: "",
      dictList: [],
      dilogIntegralVisible: false,
      integralFlag: ""
    };
  },
  methods: {
    linkRoute(route) {
      this.$router.push({ path: route, query: { memberId: this.memberId } });
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
        path: "wechatmemberDetail",
        query: { memberId: this.memberId }
      });
    },
    // 扣除积分详情
    detaliInfo(id) {
      doFetch("/api-member/member-integral-source", {
        intervalLogId: id
      }).then(res => {
        if (res.data.errorCode === 0) {
          this.loseData = res.data.result.intervalDetailList.map(ele => ({
            ...ele,
            createTime:
              ele.createTime != -1 ? formatLongTime(ele.createTime, 1) : "--"
          }));
          this.loseVisible = true;
        }
      });
    },
    getIntegralDataPage() {
      doFetch(url.integralDataPage, {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        intervalInOut: this.intervalInOut,
        dictCode: this.dictCode,
        searchStr: this.searchStr,
        searchType: this.searchType,
        beginTime: this.beginTime,
        endTime: this.endTime,
        storeName: this.storeName
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.memberData =
              res.data.result.page.result &&
              res.data.result.page.result.map(ele => ({
                ...ele,
                mainStoreName: !!ele.mainStoreName ? ele.mainStoreName : "--"
              }));
            this.page.currentPage = res.data.result.page.currentPage;
            this.page.totalCount = res.data.result.page.totalCount;
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
        dictStatus: 0
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            res.data.result.dictList.forEach(ele => {
              if (ele.dictCode == "1113") {
                 占位
              }
            });
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
    if (this.memberId) {
      this.getIntegralDataPage();
      this.getIntegralOperateType();
    }
    this.$store.commit("mutations-slide", false);
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

.wechat-point-details {
  height: 100%;
  overflow: auto;

  .table-container {
    padding: 20px;
    margin: 20px;
    background-color: #fff;
  }
}

.con-container {
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.footer-box {
  margin-top: -112px;
}
</style>
