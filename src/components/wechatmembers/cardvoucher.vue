<template>
  <div class="crad-con">
    <div class="main-container min100">
      <v-nav :navpath="navpath"></v-nav>
      <div class="card-warp">
        <div class="table-container-member">
          <div class="mBottom20">
            <el-select
              v-model="cardReviceCode"
              style="margin-right: 7px;"
              placeholder="所有渠道"
              @change="handleSearch"
            >
              <el-option
                :key=-1
                label="所有渠道"
                :value=-1
              ></el-option>
              <el-option
                v-for="item in dictList"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              ></el-option>
            </el-select>
            <el-select
              v-model="useStatus"
              placeholder="所有状态"
              @change="handleSearch"
            >
              <el-option
                :key=-1
                label="所有状态"
                :value=-1
              ></el-option>
              <el-option
                :key=1
                label="待领取"
                :value=1
              ></el-option>
              <el-option
                :key=2
                label="待使用"
                :value=2
              ></el-option>
              <el-option
                :key=3
                label="已发放"
                :value=3
              ></el-option>
              <el-option
                :key=4
                label="已领取"
                :value=4
              ></el-option>
              <el-option
                :key=5
                label="已使用"
                :value=5
              ></el-option>
              <el-option
                :key=6
                label="已到期"
                :value=6
              ></el-option>
              <el-option
                :key=7
                label="已销毁"
                :value=7
              ></el-option>
            </el-select>
          </div>
          <div class="mBottom40">
            <div class="table-content">
              <el-table
                :data="memberData"
                tooltip-effect="dark"
                ref="multipleTable"
              >
                <el-table-column
                  prop="putOnTime"
                  label="投放时间"
                  width="160px"
                >
                  <template slot-scope="scope">
                    {{ scope.row.putOnTime | formatTime }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="receiveTime"
                  label="领取时间"
                  width="160px"
                >
                  <template slot-scope="scope">
                    {{ scope.row.receiveTime | formatTime }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="receiveName"
                  label="投放渠道"
                ></el-table-column>
                <el-table-column
                  prop="cardName"
                  label="卡券名称"
                > </el-table-column>
                <el-table-column
                  prop="cardCode"
                  label="卡券代码"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.cardCode">{{ scope.row.cardCode }}</span>
                    <span v-else>--</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === -1">所有</span>
                    <span v-if="scope.row.status === 1">待领取</span>
                    <span v-if="scope.row.status === 2">待使用</span>
                    <span v-if="scope.row.status === 3">已发放</span>
                    <span v-if="scope.row.status === 4">已领取</span>
                    <span v-if="scope.row.status === 5">已使用</span>
                    <span v-if="scope.row.status === 6">已到期</span>
                    <span v-if="scope.row.status === 7">已销毁</span>
                    <span v-if="scope.row.status === 8">已占用</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="saleAmount"
                  label="销售额"
                > </el-table-column>
                <el-table-column
                  prop="checkSource"
                  label="核销来源"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.checkSource === 0">订单核销</span>
                    <span v-if="scope.row.checkSource === 1">手动核销</span>
                    <span v-if="scope.row.checkSource === -1">--</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="operate">
                      <el-button
                        type="text"
                        v-if="scope.row.status === 4"
                        @click="handleCheckDestory(scope.row)"
                      >核销</el-button>
                      <el-button
                        type="text"
                        v-if="scope.row.status === 4"
                        @click="handleCardDestroy(scope.row)"
                      >销毁</el-button>
                      <span
                        class="pointer"
                        v-else
                      >--</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div
                class="page mTop20"
                v-if="memberData.length > 0"
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
      <el-dialog
        title="选择订单"
        :visible.sync="checkVisible"
        width="40%"
        :close-on-click-modal="false"
      >
        <div class="check-box">
          <div>
            <el-input
              placeholder="输入门店信息/订单流水号"
              prefix-icon="el-icon-search"
              v-model="orderinfo"
              @keyup.native.enter="checkOrder"
              style="width: 220px"
            >
            </el-input>
            <span style="float: right; line-height: 36px">
              *仅显示满足核销条件的订单
            </span>
          </div>
          <div
            class="table"
            style="margin-top: 20px; max-height: 400px; overflow: scroll;"
          >
            <template>
              <el-table
                :data="checkData"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column
                  prop="storeName"
                  label="消费门店"
                >
                </el-table-column>
                <el-table-column
                  prop="orderNumber"
                  label="订单流水号"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="success"
                      plain
                      @click="choose(scope.row)"
                    >选取</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div
            class="pager"
            style="float: right; margin: 10px 0;"
            v-if="model.total > 0"
          >
            <el-pagination
              background
              @size-change="handleModelSizeChange"
              @current-change="handleModelCurrentChange"
              :current-page="model.currentPage"
              :page-sizes="[20, 50, 75, 100]"
              :page-size="model.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="model.total"
            >
            </el-pagination>
          </div>
        </div>
        <div
          slot="footer"
          class="dilog-footer"
        >
          <el-button @click="checkVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="confirmBtn"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- <div class="footwrap">
        <el-button plain @click="goback">返回</el-button>
      </div> -->
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
export default {
  name: "cardvoucher",
  data() {
    return {
      checkVisible: false,
      orderinfo: "",
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
          path:
            "/wechatmemberDetail?memberId=" + this.$route.query.memberId || ""
        },
        {
          name: "会员卡券",
          path: ""
        }
      ],
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      cardReviceCode: -1,
      dictList: [],
      useStatus: -1,
      model: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      cardLogId: "",
      checkData: []
    };
  },
  methods: {
    // 销核数据条件插件
    checkOrder() {
      doFetch(url.checkCard, {
        memberId: this.memberId,
        pageSize: this.model.pageSize,
        currentPage: this.model.currentPage,
        coupCardId: this.cardLogId,
        storeNameOrOrderNum: this.orderinfo
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.checkData = !!res.data.result.result
              ? res.data.result.result
              : [];
            this.model.total = res.data.result.totalCount;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    // 核销操作
    handleCheckDestory(opt) {
      this.cardLogId = opt.cardLogId;
      doFetch(url.checkCard, {
        memberId: this.memberId,
        pageSize: this.model.pageSize,
        currentPage: this.model.currentPage,
        coupCardId: this.cardLogId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.checkData = !!res.data.result.result
              ? res.data.result.result
              : [];
            this.model.total = res.data.result.totalCount;
            this.checkVisible = true;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    // 改变页码
    handleModelSizeChange(val) {
      this.model.pageSize = val;
      this.handleCheckDestory();
    },
    handleModelCurrentChange(val) {
      this.model.currentPage = val;
      this.handleCheckDestory();
    },
    handleSearch() {
      this.page.currentPage = 1;
      this.getMemberCardsPage();
    },
    getCardChannelType() {
      doFetch(url.cardChannelType, {
        businessType: "CARD_RECEIVE_TYPE"
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.dictList = res.data.result.dictList;
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    handleCardDestroy(row) {
      this.$confirm("您确定要销毁该卡券么，一旦销毁将无法恢复", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          doFetch(url.cardDestroy, {
            cardLogId: row.cardLogId,
            memberId: this.memberId
          })
            .then(res => {
              if (res.data.errorCode === 0) {
                checkSuccess();
                this.page.currentPage = 1;
                this.getMemberCardsPage();
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
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getMemberCardsPage();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getMemberCardsPage();
    },
    goback() {
      this.$router.push({
        path: "wechatmemberDetail",
        query: { memberId: this.memberId }
      });
    },
    getMemberCardsPage() {
      doFetch(url.memberCardsPage, {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        cardReviceCode: this.cardReviceCode,
        useStatus: this.useStatus
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.memberData = res.data.result.page.result;
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
    // 选取
    choose(opt) {
      this.orderId = opt.orderId;
    },
    confirmBtn() {
      if (!this.cardLogId) {
        checkFalse("订单ID不存在");
        return;
      }
      // 如果没有订单 就return
      if (!this.checkData.length) {
        this.$message.warning("没有可选的订单！");
        return;
      }

      doFetch("/api-member/member-card-write-off", {
        memberId: this.memberId,
        cardLogId: this.cardLogId,
        orderId: this.orderId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.checkVisible = false;
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
    if (this.memberId) {
      this.getMemberCardsPage();
    }
    this.getCardChannelType();
    this.$store.commit("mutations-slide", false);
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="stylus" scoped>
.check-box {
  padding-bottom: 20px;
}

.table-container-member {
  padding: 20px;
  background-color: #fff;
}

.card-warp {
  padding: 24px 24px 0;
}

.crad-con {
  height: 100%;
  overflow: auto;
}
</style>
