<template>
  <div
    class="member-group-detail"
    :style="{ height: bodyHeight - 64 + 'px'}"
  >
    <v-nav :navpath="navpath"></v-nav>
    <div class="wrap">

      <div class="groupmember">
        <p class="groupmember-title">会员共{{page.total}}人</p>
        <div class="table-content">
          <el-table
            :data="memberData"
            tooltip-effect="dark"
            ref="multipleTable"
            @sort-change='sortChange'
          >
            <el-table-column
              prop="title"
              label="会员信息"
            >
              <template slot-scope="scope">
                <div
                  @click="linkDetail(scope.row.memberId)"
                  style="cursor: pointer;"
                  class="tablecontent-cell"
                >
                  <el-popover
                    placement="top-start"
                    width="400"
                    height="180"
                    trigger="hover"
                    @show="showSingleInfo(scope.row.memberId)"
                  >
                    <div
                      class="pointer"
                      @click="linkDetail(scope.row.memberId)"
                    >
                      <div class="singelinfo">
                        <div class="singelinfo-img"><img
                            width="100"
                            height="100"
                            :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : './static/img/default.png'"
                            alt=""
                          ></div>
                        <div class="singelinfo-content pLeft10 pRight10">
                          <span class="lheigth0">{{ scope.row.memberName }}
                            <span
                              :title="singleInfo.status == 0 ? '取消关注公众号' : singleInfo.status == 1 ? '已关注公众号' : '未关注公众号'"
                              class="channelicon fr"
                              :class="singleInfo.status == 0 ? 'gzhiconcanclegray' : singleInfo.status == 1 ? 'gzhicon' : 'gzhicongray'"
                            ></span>
                            <span
                              :title="singleInfo.wxStatus == 0 ? '未使用小程序' : singleInfo.wxStatus == 1 ? '使用过小程序' : ''"
                              class="channelicon fr mr6"
                              :class="singleInfo.wxStatus == 0 ? 'xcxicongray' : singleInfo.wxStatus == 1 ? 'xcxicon' : ''"
                            ></span>
                          </span>
                          <p class="lheigth0">
                            <span class="evl-right">{{ singleInfo.sex }}</span><span class="evl-right">{{ singleInfo.age }}</span><span :title="singleInfo.cardNo">{{ singleInfo.cardNo }}</span></p>
                          <p class="lheigth0"><span class="fix-block">{{ singleInfo.mainStoreName }}</span></p>
                          <div class="singelinfo-cost">
                            <div class="singelinfo-costitem">
                              <p>{{ singleInfo.costFee }}</p>
                              <p>消费总额</p>
                            </div>
                            <div class="singelinfo-costitem">
                              <p>{{ singleInfo.costTimes }}</p>
                              <p>消费次数</p>
                            </div>
                            <div class="singelinfo-costitem">
                              <p>{{ singleInfo.lastCost }}</p>
                              <p>最近消费</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="singelinfo-jl mBottom20 mTop20">
                        <a class="singelinfo-jlitem">消费记录 ({{ singleInfo.numOfSale }})</a>
                        <a class="singelinfo-jlitem">营销记录 ({{ singleInfo.numOfmarket }})</a>
                        <a class="singelinfo-jlitem">卡券记录 ({{ singleInfo.couponCount }})</a>
                      </div>
                    </div>
                    <span slot="reference"><img
                        class="tablecontent-cellimg mr6"
                        width="60"
                        height="60"
                        :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : './static/img/default.png'"
                        alt=""
                      ></span>
                  </el-popover>
                  <span>{{ scope.row.memberName | formatMember }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
            > </el-table-column>
            <el-table-column
              prop="title"
              label="会员状态"
            >
              <template slot-scope="scope">
                <div>
                  <span
                    :title="scope.row.wxStatus == 0 ? '未使用小程序' : scope.row.wxStatus == 1 ? '已使用小程序' : ''"
                    class="channelicon"
                    :class="scope.row.wxStatus == 0 ? 'xcxicongray' : scope.row.wxStatus == 1 ? 'xcxicon' : ''"
                  ></span>
                  <span
                    :title="scope.row.status == 0 ? '取消关注公众号' : scope.row.status == 1 ? '已关注公众号' : '未关注公众号'"
                    class="channelicon"
                    :class="scope.row.status == 0 ? 'gzhiconcanclegray' : scope.row.status == 1 ? 'gzhicon' : 'gzhicongray'"
                  ></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="gradeName"
              label="会员等级"
            > </el-table-column>
            <el-table-column
              prop="costAll"
              sortable='custom'
              label="消费总额"
            >
              <template slot-scope="scope">
                <div>{{scope.row.costFee}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="costTimes"
              sortable='custom'
              label="消费次数"
            ></el-table-column>
            <el-table-column
              prop="lastCostTime"
              sortable='custom'
              label="最近消费时间"
            >
              <template slot-scope="scope">
                <div>
                  <div> {{ scope.row.lastCostTime | formatTimeYMD }} </div>
                  <div> {{ scope.row.lastCostTime | formatTimeHMS }} </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              sortable='custom'
              label="新增时间"
            >
              <template slot-scope="scope">
                <div>
                  <div> {{ scope.row.createTime | formatTimeYMD }} </div>
                  <div> {{ scope.row.createTime | formatTimeHMS }} </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="operate">
                  <router-link
                    :to="{path:'/wechatmemberDetail',query:{memberId: scope.row.memberId , channel: 'wxMember'}}"
                    class="operate-btn"
                  >查看</router-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="page"
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
              :total="page.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <vue-gic-footer></vue-gic-footer>
    <!-- <div class="footwrap">
      <el-button plain @click="goback">返回</el-button>
    </div> -->
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
import { mapState } from "vuex";

export default {
  name: "membergrop-detail",
  data() {
    return {
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      memberGroupId: this.$route.query.memberGroupId || "",
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "会员分组",
          path: "/membergroup"
        },
        {
          name: "会员分组详情",
          path: ""
        }
      ],
      groupForm: {
        memberGroupName: "",
        memberGroupDescribe: "",
        memberSearchStr: ""
      },
      page: {
        currentPage: 1,
        pageSize: 20,
        totalPage: 0,
        total: ""
      },
      memberData: [],
      sortColName: "",
      sortType: "desc",
      singleInfo: {
        sex: 0,
        age: 0,
        cardNo: 0,
        mainStoreName: "dd",
        costFee: 0,
        costTimes: 0,
        lastCost: 0,
        numOfSale: 0,
        numOfmarket: 0,
        couponCount: 0,
        status: 0,
        wxStatus: 0,
        phoneStatus: 0,
        authStatus: 0
      }
    };
  },
  computed: {
    ...mapState(["storeImageUrl"])
  },
  filters: {
    formatMember(val) {
      if (val) {
        if (val.length > 3) {
          val = val.substr(0, 3) + "...";
        }
      }
      return val;
    },
    formatTimeYMD(val) {
      return val != "--" ? val.split(" ")[0] : "--";
    },
    formatTimeHMS(val) {
      return val != "--" ? val.split(" ")[1] : "--";
    }
  },
  methods: {
    showSingleInfo(memberId) {
      this.singleInfo = "";
      doFetch(url.singleInfo, {
        memberId: memberId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            let ret = res.data.result.memberSingle;
            this.singleInfo = {
              ...ret,
              sex: ret.sex == 0 ? "性别未知" : ret.sex == 1 ? "男" : "女",
              age: ret.age != 0 ? ret.age : "年龄未知",
              cardNo: !!ret.cardNo ? ret.cardNo : "无会员卡",
              mainStoreName: !!ret.mainStoreName
                ? ret.mainStoreName
                : "主门店未知"
            };
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    linkDetail(memberId) {
      this.$router.push({
        path: "/wechatmemberDetail",
        query: { memberId: memberId }
      });
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getAjaxMembers({ pageSize: 20, currentPage: val });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getAjaxMembers({ pageSize: val, currentPage: 1 });
    },
    sortChange(column) {
      this.sortColumn = column.prop;
      if (column.order === "descending") {
        this.getAjaxMembers({ sortColName: this.sortColumn, sortType: "desc" });
      } else if (column.order === "ascending") {
        this.getAjaxMembers({ sortColName: this.sortColumn, sortType: "asc" });
      }
    },
    // 会员列表-待定
    getAjaxMembers(opt) {
      doFetch(url.ajaxMembers, {
        sortColName: opt.sortColName || this.sortColName,
        sortType: opt.sortType || this.sortType,
        memberSearchStr: this.groupForm.memberSearchStr,
        pageName: "wxMember",
        showFields:
          "name,status,grade,costAll,costTimes,lastCostTime,createTime",
        pageSize: opt.pageSize || 20,
        currentPage: opt.currentPage || 1
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.memberData = res.data.result.page.result.map(ele => ({
              ...ele,
              sex: ele.sex == 0 ? "未知" : ele.sex == "1" ? "男" : "女",
              costFee:
                ele.costFee == null
                  ? "--"
                  : "￥" + parseInt(ele.costFee, 10).toFixed(2),
              createTime:
                ele.createTime != "-1"
                  ? this.formatLongTime("" + ele.createTime)
                  : "--", // 新增时间
              lastCostTime:
                ele.lastCostTime && ele.lastCostTime != "-1"
                  ? this.formatLongTime("" + ele.lastCostTime)
                  : "--", // 最近消费时间
              thirdImgUrl: ele.thirdImgUrl
                ? ele.thirdImgUrl
                : this.storeImageUrl
            }));
            this.page.currentPage = res.data.result.page.currentPage;
            this.page.total = res.data.result.page.totalCount;
            this.page.totalPage = res.data.result.page.totalPage;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getDetail() {
      doFetch(url.findMemberGroupInfo, {
        memberGroupId: this.memberGroupId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.groupForm.memberGroupName =
              res.data.result.memberGroup.memberGroupName;
            this.groupForm.memberGroupDescribe =
              res.data.result.memberGroup.memberGroupDescribe;
            this.groupForm.memberSearchStr =
              res.data.result.memberGroup.memberSearchStr;
            // 首先查出来筛选条件
            this.getAjaxMembers({});
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    formatLongTime(ret) {
      let rt =
        ret.substr(0, 4) +
        "-" +
        ret.substr(4, 2) +
        "-" +
        ret.substr(6, 2) +
        " " +
        ret.substr(8, 2) +
        ":" +
        ret.substr(10, 2) +
        ":" +
        ret.substr(12, 2);
      return rt;
    },
    goback() {
      this.$router.push({ path: "/membergroup" });
    }
  },
  created() {
    if (this.memberGroupId) {
      this.getDetail();
    }
    if (!this.storeImageUrl) {
      this.$store.dispatch("getStorePicture");
    }
    this.$store.commit("mutations-slide", false);
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="stylus" scoped>
.wrap {
  min-height: 580px;
  padding: 24px;
  background: #f0f2f5;

  .groupmember {
    padding: 24px;
    background: #fff;
  }
}

.el-table {
  >>>.el-table__empty-block {
    height: 256px;

    .el-table__empty-text {
      margin-bottom: 0;

      &::before {
        margin-top: 0;
      }
    }
  }
}

.member-group-detail {
  overflow: auto;
}
</style>
