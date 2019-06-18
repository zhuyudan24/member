<template>
  <div class="minwidth1200 member-fee">
    <div class="con-container">
      <v-nav :navpath="navpath"></v-nav>
      <div class="record-nav">
        <div class="record-navitem">
          <!-- 这里跑数据的时候去反了 -->
          <p class="lheigth40">消费总额(实付)</p>
          <p class="record-txt">￥{{ memberInfo.costFeePaid | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">消费总额(应收)</p>
          <p class="record-txt">{{ memberInfo.costFee | fomatFloat }}</p>
        </div> 
        <div class="record-navitem">
          <p class="lheigth40">消费次数</p>
          <p class="record-txt">{{ memberInfo.costTimes }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">最近消费</p>
          <p class="record-txt">{{ memberInfo.lastCostTime | formatYMD }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">客单价</p>
          <p class="record-txt">￥{{ memberInfo.avgCost | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">连带率</p>
          <p class="record-txt">{{ memberInfo.relatedPercent | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">件单价</p>
          <p class="record-txt">￥{{ memberInfo.avgGoodsCost | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">最高单笔(实付)</p>
          <p class="record-txt">{{ memberInfo.highCostPaid | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">最高单笔(应收)</p>
          <p class="record-txt">{{ memberInfo.highCost | fomatFloat }}</p>
        </div>
        <!--<div class="record-navitem">
          <p class="lheigth40">消费品类</p>
          <p class="record-txt">{{ memberInfo.costCategoryCount }}</p>
        </div>-->
        <div class="record-navitem">
          <p class="lheigth40">平均折扣</p>
          <p class="record-txt">{{ memberInfo.avgDiscount | fomatFloat }}</p>
        </div>
      </div>

      <div class="record">
        <div class="mTop20">
          <div class="record-search mBottom20">
            <div class="record-searchitem">
              <el-select
                v-model="orderType"
                placeholder="所有类型"
                @change="handleSearch"
              >
                <el-option
                  :key=-1
                  label="所有类型"
                  :value=-1
                ></el-option>
                <el-option
                  :key=1
                  label="销售"
                  :value=1
                ></el-option>
                <el-option
                  :key=2
                  label="退货"
                  :value=2
                ></el-option>
                <el-option
                  :key=4
                  label="退换货"
                  :value=4
                ></el-option>
              </el-select>
              <el-select
                v-model="evaluateStatus"
                placeholder="所有状态"
                @change="handleSearch"
              >
                <el-option
                  :key=-1
                  label="所有状态"
                  :value=-1
                ></el-option>
                <el-option
                  :key=0
                  label="未评价"
                  :value=0
                ></el-option>
                <el-option
                  :key=1
                  label="已评价"
                  :value=1
                ></el-option>
                <el-option
                  :key=2
                  label="不良评价"
                  :value=2
                ></el-option>
              </el-select>
            </div>
            <!-- prefix-icon="el-icon-search" placeholder="输入会员姓名/昵称/手机号/卡号"  -->
            <!-- <div class="record-search"><searchinput stylelink="width: 280px" v-model="searchInfo" @handleSearch="handleSearch" ></searchinput></div> -->
          </div>
          <div class="mBottom40">
            <div class="table-content">
              <el-table
                :data="memberData"
                v-loading="load"
                tooltip-effect="dark"
                ref="multipleTable"
              >
                <el-table-column
                  prop="putOnTime"
                  label="操作时间"
                  width="160px"
                >
                  <template slot-scope="scope">
                    {{ scope.row.orderTime }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="orderNumber"
                  label="单据流水号"
                  width="160px"
                >
                  <template slot-scope="scope">
                    <div>{{ scope.row.orderNumber }}</div>
                    <div>{{ scope.row.receiptsDate }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="storeName"
                  label="消费门店"
                ></el-table-column>
                <el-table-column
                  prop="clerkImageUrl"
                  label="导购信息"
                >
                  <template slot-scope="scope">
                    <el-popover
                      placement="top-start"
                      width="400"
                      height="180"
                      trigger="hover"
                    >
                      <div class="record-clerkpopover">
                        <div class="record-popoverimg"><img
                            width="150"
                            height="150"
                            :src="scope.row.clerkImageUrl ? scope.row.clerkImageUrl : './static/img/default.png'"
                            alt=""
                          ></div>
                        <div class="record-content">
                          <p style="color: #fff;">s</p>
                          <p><span class="record-infodetail">姓名</span><span>{{ scope.row.clerkName }}</span></p>
                          <p><span class="record-infodetail">员工代码</span><span>{{ scope.row.clerkCode }}</span></p>
                          <p><span class="record-infodetail">职位</span><span>{{ scope.row.positionName }}</span></p>
                          <p><span class="record-infodetail">所属门店</span><span>{{ scope.row.storeName }}</span></p>
                        </div>
                      </div>
                      <div
                        slot="reference"
                        class="record-clerk"
                      >
                        <span class="record-clerkimg"><img
                            style="vertical-align: middle"
                            width="60"
                            height="60"
                            :src="scope.row.clerkImageUrl ? scope.row.clerkImageUrl : './static/img/default.png'"
                            alt=""
                          ></span>
                        <span class="record-clerkname">{{ scope.row.clerkName }}<br>{{ scope.row.clerkCode }}</span>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="orderStatus"
                  label="订单类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus === 1">销售</span>
                    <span v-if="scope.row.orderStatus === 2">退货</span>
                    <span v-if="scope.row.orderStatus === 4">退换货</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paidAmount"
                  label="成交金额"
                > </el-table-column>
                <el-table-column
                  prop="evaluateStatus"
                  label="评价状态"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.evaluateStatus === 0">未评价</span>
                    <span v-if="scope.row.evaluateStatus === 1">已评价</span>
                    <span v-if="scope.row.evaluateStatus === 2">不良评价</span>
                    <span v-if="scope.row.evaluateStatus === 3">未评价-已过期</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="operate">
                      <span
                        class="pointer"
                        @click="getOrderDetail(scope.row.orderId)"
                      >查看详情</span>
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
        <!-- <div class="footwrap">
          <el-button plain @click="goback">返回</el-button>
        </div> -->
      </div>
    </div>

    <!--订单详情-->
    <el-dialog
      title="订单详情"
      :visible.sync="dilogOrderVisible"
      width="600px"
    >
      <div
        class="record-dilog"
        style="width: 560px;"
      >
        <div class="table-content">
          <el-table
            :data="orderData"
            tooltip-effect="dark"
            ref="orderTable"
          >
            <el-table-column
              prop="productName"
              label="商品信息"
              width="200px"
            >
              <template slot-scope="scope">
                <div class="record-info">
                  <div class="record-infoimg"><img
                      width="60"
                      height="60"
                      :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : './static/img/default.png'"
                      alt=""
                    ></div>
                  <div class="record-infocontent">
                    <div>{{ scope.row.productName }}</div>
                    <div>{{ scope.row.productCode }}</div>
                    <div style="color: #c0c4cc;">
                      <span
                        v-for="(item, index) in scope.row.attrColorSize"
                        :key="index"
                      >
                        {{item.key}}:{{item.value}}
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="number"
              label="数量"
              width="120px"
            ></el-table-column>
            <el-table-column
              prop="payPrice"
              label="成交价"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.unitPrice }}</p>
                <p>{{ scope.row.payPrice }}</p>
              </template>
            </el-table-column>
          </el-table>

          <div class="record-border">
            <div class="record-countwrap">
              <p><span class="record-count">商品总价</span><span class="record-countvalue">{{ orderInfo.totalAmount }}</span></p>
              <p><span class="record-count">优惠活动</span><span class="record-countvalue">{{ orderInfo.promotionAmount }}</span></p>
              <p><span class="record-count">应付金额</span><span class="record-countvalue">{{ orderInfo.paidAmount }}</span></p>
            </div>
          </div>

          <div class="record-border">
            <div class="record-countwrap">
              <p
                v-for="(item, index) in payInfo"
                :key="index"
              ><span class="record-count">{{ item.name }}</span><span class="record-countvalue">{{ item.value }}</span></p>
            </div>
          </div>
          <div class="record-border">
            <div class="record-countwrap">
              <p><span class="record-count">订单总额</span><span class="record-countvalue">{{ orderInfo.paidAmount }}</span></p>
            </div>
          </div>
        </div>
        <div
          class="evaluate-box"
          v-if="evaluateData.length"
        >
          <div class="evaluate-con">
            <div
              class="item"
              v-for="(item, index) in evaluateData"
              :key="index"
            >
              {{item.ruleName}}
              <div class="evaluate-star">
                <el-rate
                  disabled
                  v-model="item.evaluateScore"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                ></el-rate>
              </div>
            </div>
          </div>
          <div class="e-txt">
            <div class="e-con">
              <p>买家评语</p>
              <p>{{evaluate.evaluateContent}}</p>
            </div>
            <span class="e-time">
              {{evaluate.createTime}}
            </span>
          </div>
          <div
            class="r-txt"
            v-if="evaluate.replyContent"
          >
            <div class="e-con">
              <p>商家回复</p>
              <p>{{evaluate.replyContent}}</p>
            </div>
            <span class="e-time">
              {{evaluate.replayDate}}
            </span>
          </div>
          <div
            style="text-align: center"
            v-if="!evaluate.replyContent"
          >
            <el-button @click="replayFast">立即回复</el-button>
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="dilog-footer talign"
      >
        <el-button @click="dilogOrderVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="回复"
      :visible.sync="replayVisable"
      width="30%"
    >
      <div class="">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入回复内容"
          v-model="textarea"
        >
        </el-input>
      </div>
      <span
        slot="footer"
        class="dilog-footer"
      >
        <el-button @click="replayVisable = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmReplay"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--订单详情-end-->
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
  name: "ajaxmembersinfo",
  data() {
    return {
      load: false,
      replayVisable: false,
      textarea: "",
      evaluate: {},
      evaluateData: [],
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
          name: "会员门店消费",
          path: ""
        }
      ],
      memberInfo: {
        costFee: 0,
        costTimes: 0,
        lastCostTime: "",
        avgCost: 0,
        relatedPercent: 0,
        avgGoodsCost: 0,
        highCost: 0,
        costCategoryCount: 0,
        avgDiscount: 0
      },
      orderType: -1,
      evaluateStatus: -1,
      searchInfo: "",
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      dilogOrderVisible: false,
      orderData: [],
      orderInfo: "",
      payInfo: []
    };
  },
  methods: {
    getOrderDetail(orderId) {
      this.orderData = [];
      this.orderInfo = "";
      this.orderId = orderId;
      this.payInfo = [];
      doFetch(url.orderDetail, {
        memberId: this.memberId,
        orderId: orderId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.dilogOrderVisible = true;
            this.orderInfo = res.data.result.orderInfo;
            // 组装一下商品的属性 方便遍历
            this.orderData = res.data.result.orderInfo.list.map(ele => ({
              ...ele,
              attrColorSize: JSON.parse(ele.attrColorSize)
            }));
            if (this.orderInfo.payInfo) {
              this.payInfo = JSON.parse(this.orderInfo.payInfo);
            }
            // 评价数据
            const data = res.data.result.orderInfo.evaluate;
            if (!data) {
              this.evaluateData = [];
            } else {
              this.evaluateId = data.evaluateId;
              this.evaluate = {
                ...data,
                createTime:
                  data.createTime != -1
                    ? formatLongTime(data.createTime, 1)
                    : "--",
                replayDate:
                  data.replayDate != -1
                    ? formatLongTime(data.replayDate, 1)
                    : "--"
              };
              this.evaluateData = data.scoresList.map(ele => ({
                ...ele,
                evaluateScore: ele.evaluateScore / 2
              }));
            }
            console.log();
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
      this.getMemberOrderPage();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getMemberOrderPage();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getMemberOrderPage();
    },
    getMemberOrderPage() {
      doFetch(url.memberOrderPage, {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        orderType: this.orderType,
        evaluateStatus: this.evaluateStatus,
        searchInfo: this.searchInfo
      })
        .then(res => {
          this.memberData = [];
          this.load = true;
          if (res.data.errorCode === 0) {
            this.load = false;
            this.memberData = res.data.result.page.result.map(ele => ({
              ...ele,
              receiptsDate:
                ele.receiptsDate != -1
                  ? formatLongTime(ele.receiptsDate, 1)
                  : "", // 订单流水时间
              orderTime:
                ele.orderTime != -1 ? formatLongTime(ele.orderTime, 1) : "" // 操作时间
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
    getAjaxMembersInfo() {
      doFetch(url.ajaxMembersInfo, {
        memberId: this.memberId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            let temp = res.data.result.memberInfo;
            this.memberInfo = {
              costFee: temp.costFee,
              costTimes: temp.costTimes,
              lastCostTime: temp.lastCostTime,
              avgCost: temp.avgCost,
              relatedPercent: temp.relatedPercent,
              avgGoodsCost: temp.avgGoodsCost,
              highCost: temp.highCost,
              costCategoryCount: temp.costCategoryCount,
              avgDiscount: temp.avgDiscount,
              costFeePaid: temp.costFeePaid,
              highCostPaid: temp.highCostPaid
            };
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    goback() {
      this.$router.push({
        path: "wechatmemberDetail",
        query: { memberId: this.memberId }
      });
    },
    // 回复买家留言
    replayFast() {
      this.replayVisable = true;
    },
    confirmReplay() {
      if (!this.textarea) {
        return;
      }
      doFetch("/api-member/evalaute_recover", {
        evaluateId: this.evaluateId,
        replyContent: this.textarea
      }).then(res => {
        if (res.data.errorCode === 0) {
          this.getOrderDetail(this.orderId);
          this.replayVisable = false;
        }
      });
    }
  },
  created() {
    if (this.memberId) {
      this.getAjaxMembersInfo();
      this.getMemberOrderPage();
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
$bgcolor = #fbfcfd;
$bordercolor = #e3e5e9;

.record {
  margin: 20px 25px;
  padding: 20px;
  background-color: #fff;

  &-nav {
    display: flex;
  }

  &-navitem {
    flex: 1;
    height: 100px;
    padding-left: 25px;
    background: #fff;
  }

  &-search {
    display: flex;
  }

  &-searchitem {
    flex: 1;
  }

  &-clerk {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-clerkimg {
    flex: 0 0 60px;
    width: 60px;
  }

  &-clerkname {
    flex: 1;
    margin-left: 5px;
  }

  &-clerkpopover {
    display: flex;
  }

  &-popovercontent {
    flex: 1;
    margin-left: 15px;
  }

  &-popoverimg {
    flex: 0 0 150px;
    width: 150px;
  }

  &-infodetail {
    display: inline-block;
    width: 80px;
    font-size: 12px;
    line-height: 16px;
  }

  &-dilog {
    height: 400px;
    overflow: auto;
  }

  &-info {
    display: flex;
  }

  &-infoimg {
    flex: 0 0 60px;
    width: 60px;
  }

  &-infocontent {
    flex: 0 0 120px;
    width: 120px;
    margin-left: 10px;
    line-height: 18px;
  }

  &-countwrap {
    margin-left: 200px;
  }

  &-count {
    display: inline-block;
    width: 100px;
    padding: 0 10px;
  }

  &-countvalue {
    display: inline-block;
    width: 180px;
    padding: 0 10px;
  }

  &-border {
    border-bottom: 1px solid #ebeef5;
  }
}

.evaluate-box {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
  margin-bottom: 2px;
  padding-bottom: 10px;

  .evaluate-con {
    display: flex;
    padding: 10px;
    background-color: #f5f7fa;

    .item {
      flex: 1;

      .evaluate-star {
        position: relative;
        top: -2px;
        display: inline-block;
      }
    }
  }

  .e-txt {
    padding: 10px;

    .e-con {
      display: inline-block;
      width: 360px;
      font-size: 14px;
    }

    .e-time {
      float: right;
      line-height: 70px;
      margin-right: 10px;
    }
  }

  .r-txt {
    padding: 10px;

    .e-con {
      display: inline-block;
      width: 360px;
      font-size: 14px;
    }

    .e-time {
      float: right;
      line-height: 70px;
      margin-right: 10px;
    }
  }
}

.member-fee {
  height: 100%;
  overflow: auto;
}

.con-container {
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.record-txt {
  font-size: 20px;
  margin-top: 10px;
  line-height: 1;
}

.footer-box {
  margin-top: -112px;
}

.record-content {
  margin-left: 15px;
}
</style>
