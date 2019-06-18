<template>
  <div class="frozen-list">
    <div class="min100">
      <nav-path :navpath="navpath"></nav-path>
      <div class="forzen-container">
        <div class="search">
          <div class="search-item">
            会员共{{total}}人
            <el-input
              v-model="keywords"
              placeholder="请输入会员姓名/卡号/手机号"
              clearable
              @keyup.enter.native="submit"
              style="width: 240px;">
              <i
                slot="prefix"
                class="el-input__icon el-icon-search"
              ></i>
            </el-input>
            <el-select
              v-model="frozenType"
              @change="changeType"
              style="margin-left: 5px"
              placeholder="请选择冻结方式"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="choose-title"
            v-if="multipleList.length == pageSize"
          >
            <span v-if="selectAll == false">已勾选本页 {{ multipleList.length }} 个会员，</span>
            <span v-else>已勾选 {{ total }} 个会员，</span>
            <span
              @click="selectAllmultipleList"
              class="multiple-all pointer"
              v-if="selectAll == false"
            >勾选全部 {{ total }} 个会员</span>
            <span
              @click="selectAllmultipleList"
              class="multiple-all pointer"
              v-else
            >取消勾选</span>
          </div>
          <div class="right-btn">
            <router-link
              to="/frozenList/frozenMember"
              class="inner-btn-link"
            >冻结会员</router-link>
            <el-button
              type="primary"
              @click="unFrozen"
            >批量解冻</el-button>
          </div>
        </div>

        <div class="frozen-table">
          <template>
            <el-table
              v-loading="load"
              ref="multipleTable"
              :data="frozenList"
              tooltip-effect="dark"
              style="width: 100%"
              @sort-change="changeSort"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                prop="frozenMember"
                label="基本信息"
                width="160"
              >
                <template slot-scope="scope">
                  <div
                    class="basic-info-table"
                    @click="linkDetail(scope.row.memberId)"
                    style="cursor: pointer;"
                  >
                    <el-popover
                      placement="top-start"
                      width="400"
                      height="180"
                      trigger="hover"
                      @show="showSingleInfo(scope.row.memberId)"
                    >
                      <div class="pointer">
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
                              <span class="evl-right">{{ singleInfo.sex }}</span><span class="evl-right">{{ singleInfo.age }}</span><span>{{ singleInfo.cardNo | formatCardName }}</span></p>
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
                      <span slot="reference" class="member-span"><img
                          class="tablecontent-cellimg mr6"
                          width="60"
                          height="60"
                          :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : './static/img/default.png'"
                          alt=""
                        ></span>
                    </el-popover>
                    <!-- <img :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl :  'https:gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d36dbe5170cf3bc7fc0dc5beb069d1c4/10dfa9ec8a136327d6b4806f918fa0ec08fac715.jpg'" class="basic-img"> -->
                    <span class="fix-block">{{ scope.row.memberName | formatMember }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="gradeName"
                label="会员等级"
              >
                <template slot-scope="scope">
                  {{ scope.row.gradeName ? scope.row.gradeName : '--'}}
                </template>
              </el-table-column>

              <el-table-column
                prop="pointsCurrent"
                sortable
                label="积分余额"
              >
                <template slot-scope="scope">
                  {{ scope.row.pointsCurrent.toFixed(2) }}
                </template>
              </el-table-column>

              <el-table-column
                prop="frozenCount"
                sortable
                label="冻结次数"
              >
                <!-- <template slot-scope="scope">
              </template> -->
              </el-table-column>

              <el-table-column
                prop="forzenLastReason"
                label="最新冻结原因"
              >
                <template slot-scope="scope">
                  <div v-if="!!scope.row.forzenLastReason">{{scope.row.forzenLastReason}}</div>
                  <div v-else>暂无原因</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="forzenLastTime"
                sortable
                label="最新冻结时间"
              >
                <template slot-scope="scope">
                  <div>{{scope.row.forzenLastTime | formatTimeYMD}}</div>
                  <div>{{scope.row.forzenLastTime | formatTimeHMS}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="JumpLink(scope.$index)"
                    v-if="!!scope.row.channel"
                  >查看</el-button>
                  <el-button
                    type="text"
                    @click="unFrozenItem(scope.$index)"
                  >解冻</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <div
            class="pager"
            v-if="total > 0"
          >
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 75, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
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
import NavPath from "@/common/navbar/navbar.vue";
import { doFetch } from "@/components/axios/api";
import { formatLongTime } from "@/utils/utils";
import url from "@/components/axios/url";
import { mapState } from "vuex";

export default {
  name: "forzenlist",
  components: {
    NavPath
  },
  data() {
    return {
      navpath: [{ name: "首页", path: "" }, { name: "冻结会员列表", path: "" }],
      typeOptions: [
        { label: "全部", value: -1 },
        { label: "异常解冻", value: 101 },
        { label: "会员主动冻结", value: 102 },
        { label: "erp操作", value: 103 }
      ],
      selectAll: false, // 是否全选
      frozenType: "",
      load: false,
      keywords: "",
      currentPage: 1,
      total: 0,
      pageSize: 20,
      frozenList: [],
      multipleList: [],
      // 会员基本信息
      singleInfo: {
        sex: 0,
        age: 0,
        cardNo: 0,
        mainStoreName: "",
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
  created() {
    if (!this.storeImageUrl) {
      this.$store.dispatch("getStorePicture");
    }
    this.ids = [];
    this.keywords = !!sessionStorage.getItem("keywords")
      ? sessionStorage.getItem("keywords")
      : "";
    this.frozenType = !!sessionStorage.getItem("frozenType")
      ? sessionStorage.getItem("frozenType")
      : "";

    this.frozenType = !!this.frozenType ? parseInt(this.frozenType, 10) : "";
    this.currentPage = !!sessionStorage.getItem("frozenlistcurrentPage")
      ? Number(sessionStorage.getItem("frozenlistcurrentPage"))
      : 1;
    this.$store.commit("mutations-slide", true);
  },
  beforeMount() {
    this.getList({
      pSize: 20,
      cPage: 1
    });
  },
  filters: {
    formatTimeYMD(val) {
      return val != "--" ? val.split(" ")[0] : "--";
    },
    formatTimeHMS(val) {
      return val != "--" ? val.split(" ")[1] : "--";
    },
    formatCardName(val) {
      if (val) {
        if (val.length > 10) {
          val = val.substr(0, 10) + "...";
        }
      }
      return val;
    },
    formatMember(val) {
      if (val) {
        if (val.length > 3) {
          val = val.substr(0, 3) + "...";
        }
      }
      return val;
    }
  },
  watch: {
    keywords(newval) {
      sessionStorage.setItem("keywords", newval);
    },
    frozenType(newval) {
      sessionStorage.setItem("frozenType", newval);
    }
  },
  methods: {
    linkDetail(memberId) {
      this.$router.push({
        path: "/wechatmemberDetail",
        query: { memberId: memberId }
      });
    },
    getList(options) {
      const datas = {
        pageSize: options.pSize,
        currentPage: options.cPage,
        phoneNameCard: this.keywords, // 会员名称
        wxOrPos: -1, // 微信或pos会员 -1 表示所有
        fieldNames:
          "gradeName,name,nickName,pointsCurrent,photoUrl,cardNo,crateCardDateString,wxMember,posMember,frozenType,forzenLastTime,frozenCount"
      };
      // 如果异常冻结
      datas.frozenType = this.frozenType ? this.frozenType : -1;

      if (this.sortType) {
        datas.sortType = this.sortType;
      }
      if (this.sortColName) {
        datas.sortColName = this.sortColName;
      }
      doFetch("/api-member/ajax-frozen-members", datas).then(res => {
        this.load = true;
        if (res.data.errorCode === 0) {
          this.load = false;
          if (res.data.result.result) {
            this.frozenList =
              res.data.result.result &&
              res.data.result.result.map(ele => ({
                ...ele,
                forzenLastTime:
                  ele.forzenLastTime != -1
                    ? formatLongTime(ele.forzenLastTime, 1)
                    : "--",
                thirdImgUrl: ele.thirdImgUrl
                  ? ele.thirdImgUrl
                  : this.storeImageUrl
              }));
            this.total = res.data.result.totalCount;
          } else {
            this.frozenList = [];
            this.total = 0;
          }
        } else {
          this.load = false;
        }
      });
    },
    changeType(val) {
      this.getList({
        pSize: 20,
        cPage: 1
      });
    },
    changeSort(row) {
      this.sortType = row.order == "ascending" ? "asc" : "desc";
      this.sortColName = row.prop;
      this.getList({
        pSize: 20,
        cPage: 1
      });
    },
    frozenMember() {
      this.frozenMethod({
        frozenType: 1
      });
    },
    // 解冻
    unFrozen() {
      // 判断
      if (this.multipleList.length === 0) {
        this.$message({
          message: "暂无数据，无法解冻",
          type: "warning"
        });
        return;
      }
      if (!this.multipleList.length) {
        this.$message({
          message: "请先勾选选项",
          type: "warning"
        });
        return;
      }
      this.$confirm("确定解冻?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.frozenMethod({
          frozenType: 0
        });
      });
    },
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
    // 冻结解冻
    frozenMethod(options) {
      this.ids = [];
      if (options.idsIndex >= 0) {
        this.ids.push(this.frozenList[options.idsIndex].memberId);
      } else {
        this.multipleList.forEach(ele => {
          this.ids.push(ele.memberId);
        });
      }
      const datas = {
        memberIds: this.ids.join(","), // 会员id
        remark: "", // 备注暂留
        //所有会员是2 当前是1 其他是0
        isCurrent: this.selectAll ? 2 : this.multipleList.length == this.pageSize ? 1 : 0,
        status: options.frozenType, // 1 冻结 0 解冻
        phoneNameCard: this.keywords // 会员名称 手机号
      };
      doFetch("/api-member/members-batch-update-frozen", datas).then(res => {
        if (res.data.errorCode === 0) {
          this.$message({
            message: "解冻成功",
            type: "success"
          });
          this.getList({
            pSize: 20,
            cPage: 1
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleList = val;
    },
    unFrozenItem(index) {
      this.$confirm("确定解冻?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.frozenMethod({
          frozenType: 0,
          idsIndex: index
        });
      });
    },
    submit() {
      this.getList({
        pSize: 20,
        cPage: 1
      });
    },
    // 查看跳转
    JumpLink(index) {
      const mdlObj = this.frozenList[index];
      // 会员类型 1 微信会员 2 pos会员
      if (mdlObj.channel == 1) {
        this.$router.push({
          path: `/wechatmemberDetail?memberId=${
            mdlObj.memberId
          }&channel=wxMember`
        });
      } else if (mdlObj.channel == 2) {
        this.$router.push({
          path: `/posmemberDetail?memberId=${mdlObj.memberId}&channel=posMember`
        });
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.getList({
        pSize: val,
        cPage: 1
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      sessionStorage.setItem("frozenlistcurrentPage", Number(val));
      this.getList({
        pSize: 20,
        cPage: val
      });
    },
    selectAllmultipleList() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.frozenList.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.forzen-container {
  margin: 25px 24px 20px;
  padding: 24px 25px 30px 23px;
  background-color: #fff;

  .search {
    margin-bottom: 24px;

    .search-item {
      display: inline-block;
    }

    .right-btn {
      float: right;

      .frozen-mem {
        display: inline-block;
        vertical-align: middle;
        padding: 0 16px;
        margin-right: 5px;
        font-size: 14px;
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        height: 34px;
        line-height: 34px;
        border-radius: 4px;
      }
    }

    .choose-title {
      display: inline-block;
      margin-left: 60px;
      font-size: 14px;

      .choose-all {
        display: inline-block;
        cursor: pointer;
        color: #409EFF;
      }
    }
  }

  .basic-info-table {
    .basic-img {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      width: 40px;
    }
  }
}

.frozen-table {
  .pager {
    text-align: right;
    padding: 20px 0;
  }
}

.frozen-list {
  height: 100%;

  .inner-btn-link {
    display: inline-block;
    padding: 0 16px;
    margin-right: 5px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #1890ff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
  }
}
</style>
