<template>
  <div class="mall-container">
    <div class="min100">
      <v-nav :navpath="navpath"></v-nav>
      <div class="record-nav">
        <div class="record-navitem">
          <p class="lheigth40">消费总额</p>
          <p class="cost-txt">￥{{ memberInfo.costFee | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">消费次数</p>
          <p class="cost-txt">{{ memberInfo.costTimes }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">最近消费</p>
          <p class="cost-txt">{{ memberInfo.lastCostTime | formatYMD }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">客单价</p>
          <p class="cost-txt">￥{{ memberInfo.avgCost | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">连带率</p>
          <p class="cost-txt">{{ memberInfo.relatedPercent | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">件单价</p>
          <p class="cost-txt">￥{{ memberInfo.avgGoodsCost | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">最高单笔</p>
          <p class="cost-txt">{{ memberInfo.highCost | fomatFloat }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">消费品类</p>
          <p class="cost-txt">{{ memberInfo.costCategoryCount }}</p>
        </div>
        <div class="record-navitem">
          <p class="lheigth40">平均折扣</p>
          <p class="cost-txt">{{ memberInfo.avgDiscount | fomatFloat }}</p>
        </div>
      </div>

      <div class="record">
        <div class="mTop20 pBottom100">
          <div class="groupmember mBottom40">
            <!-- <div class="table-content">
              <el-table :data="memberData" tooltip-effect="dark"  ref="multipleTable" >
                <el-table-column prop="putOnTime" label="商品信息" width="160px">
                  <template slot-scope="scope">
                    {{ scope.row.orderTime }}
                  </template>
                </el-table-column>
                <el-table-column label="商品信息"></el-table-column>
              </el-table>
            </div> -->
            <!-- </div> -->

            <div class="">
              <div class="record-header">
                <div class="w-30">商品信息</div>
                <div class="w-10">单价</div>
                <div class="w-15">数量</div>
                <div class="w-15">退款金额</div>
                <div class="w-15">实付款</div>
                <div class="w-15">交易状态</div>
              </div>
              <div
                class="mTop20 member-table-txt"
                v-for="(item, index) in memberData"
                :key="index"
                v-if="memberData && memberData.length > 0"
              >
                <div class="orderheader">
                  <div class="headerinfo">订单编号: {{ item.orderNumber }}</div>
                  <div class="headerinfo">下单时间：{{ item.createTime }}</div>
                  <div class="headerinfo">收件人： {{ item.buyerName }}</div>
                  <div class="headerinfo">手机号码：{{ item.buyerPhone }}</div>
                  <div class="headerinfo">收货地址：{{ item.addressInfo }}</div>
                </div>
                <div
                  class="record-table"
                  :style="{height: item.orderItemList ? (80*item.orderItemList.length) + 'px': ''}"
                >
                  <div class="record-flex70">
                    <div
                      class="record-tablecontent"
                      v-for="(list, index) in item.orderItemList"
                      :key="index"
                    >
                      <div class="w-43">
                        <div style="display: flex;flex-wrap: wrap;align-items: center">
                          <div style="flex: 0 0 60px">
                            <img
                              width="60"
                              height="60"
                              :src="list.mallProImageUrl"
                              alt=""
                            >
                          </div>
                          <div style="flex: 1;margin-left: 5px">
                            <div class="font14 break">{{ list.mallProName }}</div>
                            <div class="mTop10 font14 member-goods-txt">{{ list.mallProSkuAttr | mallname}}</div>
                          </div>
                        </div>
                      </div>
                      <div class="w-14">{{ list.mallProPrice }}</div>
                      <div class="w-21">{{ list.mallProNumber }}</div>
                      <div class="w-21">{{ list.refundPrice }}</div>
                    </div>
                  </div>
                  <div
                    class="width15 talign font14 borderight"
                    :style="{lineHeight: item.orderItemList ? (80*item.orderItemList.length) + 'px': ''}"
                  >
                    <div class="posrelative">{{ item.payAmount }}
                      <div class="posabsolute">（含快递￥{{ item.orderItemFreight }}）</div>
                    </div>
                  </div>
                  <div
                    class="width15 font14 talign"
                    :style="{lineHeight: item.orderItemList ? (80*item.orderItemList.length) + 'px': ''}"
                  >
                    <div v-if="item.orderStep == 0">交易关闭</div>
                    <div v-if="item.orderStep == 1">等待买家付款</div>
                    <div v-if="item.orderStep == 2">买家已付款</div>
                    <div v-if="item.orderStep == 3">已发货</div>
                    <div v-if="item.orderStep == 4">交易完成</div>
                  </div>
                </div>
              </div>

              <div
                style="text-align: center; font-size: 14px;"
                v-if="memberData && memberData.length == 0"
              >
                <span class="el-table__empty-text">暂无数据</span>
              </div>

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
    </div>

    <div class="foot-add">
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
} from "../../../static/js/checkStatus";
import { dateformat } from "@/utils/formatTime";

export default {
  name: "infoMall",
  data() {
    return {
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
          name: "微信商城消费",
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
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: []
    };
  },
  filters: {
    formatColorSize: val => {
      let temp = "";
      if (val) {
        let oldval = JSON.parse(val);
        let nowval = oldval.map(item => {
          return `${item.key}: ${item.value}`;
        });
        temp = nowval[0];
      }
      return temp;
    },
    mallname: val => {
      let temp = "";
      if (val) {
        let tempArr = JSON.parse(val);
        tempArr.forEach(item => {
          temp += item.propName + ":" + item.valueName + " ";
        });
      }
      return temp;
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getMemberOrderPage();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getMemberOrderPage();
    },
    getMemberOrderPage() {
      doFetch(url.ajaxWechatMembers, {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.memberData = res.data.result.page.result.map(ele => ({
              ...ele,
              createTime: !!ele.createTime
                ? dateformat(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss")
                : "--"
            }));
              console.log(this.memberData);
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
      doFetch(url.infoMall, {
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
              avgDiscount: temp.avgDiscount
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
    "v-nav": nav
  }
};
</script>
<style lang="stylus">
$bgcolor = #fbfcfd;
$bordercolor = #e3e5e9;

.record {
  margin: 24px 24px 0;
  padding: 20px 20px 0;
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

  &-header {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    font-weight: bold;
    background: #f5f5f9;
  }

  .w-10 {
    flex: 0 0 10%;
    width: 10%;
  }

  .w-15 {
    flex: 0 0 15%;
    width: 15%;
  }

  .w-30 {
    flex: 0 0 30%;
    width: 30%;
  }

  .w-21 {
    flex: 0 0 21.5%;
    width: 21.5%;
  }

  .w-14 {
    flex: 0 0 14.5%;
    width: 14.5%;
  }

  .w-43 {
    flex: 0 0 43%;
    width: 43%;
  }

  .orderheader {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    background-color: #f5f5f9;
  }

  .headerinfo {
    flex: 1;
  }

  &-table {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: center;
    border-bottom: 1px solid $bordercolor;
  }

  &-tablecontent {
    display: flex;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid $bordercolor;

    &:last-child {
      border-bottom: 0;
    }
  }

  &-flex70 {
    flex: 0 0 70%;
    border-right: 1px solid $bordercolor;
    box-sizing: border-box;
  }

  &-flex30 {
    flex: 0 0 30%;
    height: 100%;
  }

  &-total {
    display: flex;
    height: 100%;
    text-align: center;
  }

  .width15 {
    width: 15%;
    height: 100%;
    box-sizing: border-box;
  }

  .borderight {
    border-right: 1px solid $bordercolor;
  }

  .posrelative {
    position: relative;
  }

  .posabsolute {
    position: absolute;
    left: 0;
    top: 15px;
    right: 0;
  }
}

.mall-container {
  height: 100%;
}

.cost-txt {
  font-size: 20px;
  margin-top: 10px;
  line-height: 1;
}
</style>
