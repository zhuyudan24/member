<template>
  <div class="frozen-list">
    <div class="min100">
      <nav-path :navpath="navpath"></nav-path>
      <div class="member-forzen-container">
        <!--
        会员列表
      -->
        <div
          class="list"
          v-if="forzenShow"
          ref="memberlist"
        >
          <div class="switch">
            <span>会员列表</span>
            <!-- <a class="switch-link">切换为导入模式</a> -->
          </div>
          <div class="search-box">
            <el-input
              v-model="keywords"
              maxlength="11"
              placeholder="请输入会员姓名/卡号/手机号码"
              clearable
              @keyup.enter.native="submit"
              style="width: 260px;"
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-search"
              ></i>
            </el-input>
            <!-- <div class="choose-title" v-if="memberList.length == 20">
            <span v-if="selectAll == false">已勾选本页 {{ memberList.length }} 个会员，</span>
            <span v-else>已勾选 {{ total }} 个会员，</span>
            <span @click="selectAllmultipleList" class="multiple-all pointer" v-if="selectAll == false">勾选全部 {{ total }} 个会员</span>
            <span @click="selectAllmultipleList" class="multiple-all pointer" v-else>取消勾选</span>
          </div> -->
            <div class="switch-member">
              <el-button
                v-for="(list, index) in memberType"
                :key="index"
                :class="{'active': index == currentIndex}"
                @click="changeType(index)"
              >
                {{list}}
              </el-button>
            </div>
          </div>

          <div class="table-list">
            <template>
              <el-table
                ref="multipleTable"
                :data="frozenList"
                v-loading="loading"
                tooltip-effect="dark"
                style="width: 100%"
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
                >
                  <template slot-scope="scope">
                    <div
                      class="basic-info-table"
                      @click="linkDetail(scope.row.memberId, scope.row.channel)"
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
                                  :title="singleInfo.status == 0 ? '未关注微信服务号' : singleInfo.status == 1 ? '已关注微信服务号' : ''"
                                  class="channelicon fr"
                                  :class="singleInfo.status == 0 ? 'xcxicongray' : singleInfo.status == 1 ? 'xcxicon' : ''"
                                ></span>
                                <span
                                  :title="singleInfo.wxStatus == 0 ? '未使用公众号' : singleInfo.wxStatus == 1 ? '未使用公众号' : ''"
                                  class="channelicon fr mr6"
                                  :class="singleInfo.wxStatus == 0 ? 'gzhicongray' : singleInfo.wxStatus == 1 ? 'gzhicon' : 'gzhiconcanclegray'"
                                ></span>
                              </span>
                              <p class="lheigth0">
                                <span class="evl-right">{{ singleInfo.sex }}</span><span class="evl-right">{{ singleInfo.age }}</span><span :title="singleInfo.cardNo">{{ singleInfo.cardNo | formatCardName }}</span></p>
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
                      <span class="fix-block">{{scope.row.memberName}}</span>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="cardNum"
                  label="会员卡号"
                >
                </el-table-column>

                <el-table-column
                  prop="crateCardDateString"
                  label="开卡时间"
                >
                  <template slot-scope="scope">
                    <div>{{ scope.row.crateCardDateString | formatTimeYMD }}</div>
                    <div>{{ scope.row.crateCardDateString | formatTimeHMS }}</div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>

          <div
            class="pager"
            v-if="total > 0"
          >
            <el-pagination
              :page-size="20"
              :currentPage="currentPage"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>

        <div
          class="choose-member"
          ref="forzenlist"
        >
          <div
            class="mem-list"
            ref="forzenMemberList"
          >
            <div class="al-members">
              已选择冻结会员
              <span class="per-num">{{middleList.length}}/人</span>
            </div>
            <ul class="member-list">
              <li
                class="list-item"
                v-for="(item, index) in middleList"
                :key="index"
              >
                <div class="basic-info">
                  <img
                    :src="item.thirdImgUrl ? item.thirdImgUrl : './static/img/default.png'"
                    class="list-img"
                  >
                  <span class="txt">{{item.memberName}}</span>
                </div>
                <i
                  class="el-icon-circle-close-outline icon-close"
                  @click="removeItem(index)"
                ></i>
              </li>
            </ul>
          </div>

          <p class="title"><b class="key">*</b>冻结原因</p>
          <el-select
            v-model="frozenReason"
            placeholder="请选择"
            @change="changeReason"
          >
            <el-option
              v-for="item in frozenOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <p class="remark-txt">备注</p>
          <gic-input
            v-model="remark"
            :max="20"
          ></gic-input>
          <div class="operator-btn">
            <el-button>
              <router-link to="/frozenList">返回</router-link>
            </el-button>
            <el-button
              type="primary"
              :disabled="reasonbtn"
              @click="frozenAll"
            >冻结选中会员</el-button>
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
import { doFetch } from "../../components/axios/api";
import { formatLongTime } from "@/utils/utils";
import { checkFalse } from "../../../static/js/checkStatus";
import url from "../../components/axios/url";
import { setTimeout } from "timers";
import { mapState } from "vuex";

export default {
  name: "forzenlist",
  components: {
    NavPath
  },
  data() {
    return {
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "冻结会员",
          path: "/frozenList"
        }
      ],
      loading: false,
      frozenOptions: [
        { label: "会员主动冻结", value: 102 },
        { label: "异常冻结", value: 101 }
      ],
      total: null,
      frozenReason: "",
      reasonbtn: true,
      keywords: "",
      currentPage: 1,
      remark: "", // 备注
      currentIndex: 0,
      memberList: [],
      frozenList: [], // 会员列表
      middleList: [], // 中间件数组 保存数据
      frozenMembers: [], // 冻结会员
      //  会员基本信息
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
    forzenShow() {
      return this.$store.state.forzenList;
    },
    ...mapState(["storeImageUrl"])
  },
  created() {
    if (!this.storeImageUrl) {
      this.$store.dispatch("getStorePicture");
    }
    this.$store.commit("mutations-slide", true);
    this.$store.commit("forzen-list", false);
    // 解决返回来的时候 布局错乱
    this.$nextTick(_ => {
      this.$store.commit("forzen-list", true);
    });
    this.memberType = ["微信会员", "POS会员"];
    this.midSelect = [];
  },
  beforeMount() {
    this.getList({
      pSize: 10,
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
    }
  },
  mounted() {
    setTimeout(() => {
      const memberHeight = this.$refs.memberlist.clientHeight;
      this.$refs.forzenlist.style.height = memberHeight + "px";
    }, 100);
  },
  methods: {
    selectAllmultipleList() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.memberData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    linkDetail(memberId, channel) {
      if (channel == 2) {
        this.$router.push({
          path: "/posmemberDetail",
          query: { memberId: memberId }
        });
      } else {
        this.$router.push({
          path: "/wechatmemberDetail",
          query: { memberId: memberId }
        });
      }
    },
    getList(options) {
      const datas = {
        pageSize: options.pSize,
        currentPage: options.cPage,
        frozenType: -1, // 冻结方式
        phoneNameCard: this.keywords, // 会员名称
        wxOrPos: this.currentIndex == 0 ? 1 : 2, // 微信或pos会员 -1 表示所有
        fieldNames:
          "name,nickName,photoUrl,cardNo,crateCardDateString,wxMember,posMember"
      };
      doFetch("/api-member/ajax-members-do-frozen", datas).then(res => {
        if (res.data.errorCode === 0) {
          if (res.data.result.result.length > 0) {
            this.frozenList = res.data.result.result.map(ele => ({
              ...ele,
              cardNum: ele.cardNum ? ele.cardNum : "--",
              crateCardDateString: !!ele.crateCardDateString
                ? formatLongTime(ele.crateCardDateString, 1)
                : "--",
              thirdImgUrl: ele.thirdImgUrl
                ? ele.thirdImgUrl
                : this.storeImageUrl
            }));
            this.total = res.data.result.totalCount;
          } else {
            this.frozenList = [];
          }
        } else {
          checkFalse(res.data.message);
        }
      });
    },
    submit() {
      this.getList({
        pSize: 10,
        cPage: 1
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList({
        pSize: 10,
        cPage: val
      });
    },
    // 删除列
    removeItem(i) {
      let memberId = this.middleList[i].memberId;
      // 切换
      if (this.memberList.length) {
        this.memberList.forEach(row => {
          if (memberId == row.memberId) {
            this.$refs.multipleTable.toggleRowSelection(row, false);
          }
        });
      }
      this.middleList.splice(i, 1);
    },
    showSingleInfo(memberId) {
      this.singleInfo = "";
      doFetch(url.singleInfo, {
        memberId: memberId
      }).then(res => {
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
      });
    },
    // 冻结所有
    frozenAll() {
      // 如果没有人不能冻结
      if (!this.middleList.length) {
        this.$alert("请先选择冻结选项", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (!this.frozenReason) {
        this.frozenReasonFlag = true;
        return;
      }

      this.$confirm("是否冻结所选会员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.frozenMethod();
      });
    },
    changeReason(val) {
      if (val) {
        this.reasonbtn = false;
      }
    },
    frozenMethod() {
      this.ids = [];
      this.middleList.forEach(ele => {
        this.ids.push(ele.memberId);
      });

      const datas = {
        memberIds: this.ids.join(","), // 会员id 多个拼接起来, 隔开
        remark: this.remark, // 备注暂留
        isCurrent: 0, // 所有会员是2 当前是1 其他是0
        status: 1, // 1 冻结 0 解冻
        frozenType: this.frozenReason // 101.异常冻结、102.会员主动冻结
      };
      doFetch("/api-member/members-batch-update-frozen", datas)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.frozenReason = "";
            this.remark = "";
            this.middleList.length = 0;
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$message({
                message: "冻结成功",
                type: "success"
              });
              this.$router.push({ path: "/frozenList" });
            }, 5000);
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkFalse(err);
        });
    },
    changeType(i) {
      this.currentIndex = i;
      this.getList({
        pSize: 10,
        cPage: 1
      });
    },
    // 勾选框
    handleSelectionChange(val) {
       if (val.length == 0) {
         this.middleList = val;
         return;
       }
      this.memberList = val;
      let idx = null;
      let ret = [];
      // 单独使用一个集合来区分 返回勾选的数据
      // middleList 右边渲染的数据
      // memberList 每次勾选的数据
      for (let i = 0, len = this.memberList.length; i < len; i++) {
        if (this.middleList.length == 0) {
          this.middleList.push(this.memberList[0]);
        }
        if (
          this.middleList.findIndex(
            v => v.memberId == this.memberList[i].memberId
          ) == -1
        ) {
          this.middleList.push(this.memberList[i]);
        }
      }
      // 循环对比 找到具体是那个元素
      // 复杂度 Ｎ*Ｍ
      if (this.midSelect.length > this.memberList.length) {
        for (let i = 0, lenI = this.midSelect.length; i < lenI; i++) {
          let mid = this.midSelect[i].memberId;
          for (let j = 0, lenJ = this.memberList.length; j < lenJ; j++) {
            if (mid == this.memberList[j].memberId) {
              ret[i] = i;
            }
          }
        }
      }

      // 取到不勾选的索引 获得memberId
      for (let i = 0; i < ret.length; i++) {
        if (ret[i] === void 0) {
          idx = i;
        }
      }
      // 拿到idx 就找对应的 memberId
      let mId = idx != null ? this.midSelect[idx].memberId : null;
      if (mId) {
        this.middleList = this.middleList.filter(v => {
          return v.memberId != mId;
        });
      }
      // 上一次勾选的数据 对比具体是哪一项不匹配
      this.midSelect = val;
    }
  }
};
</script>

<style lang="stylus" scoped>
.member-forzen-container {
  margin: 25px 24px 20px;
  display: flex;
  overflow: hidden;

  .list {
    flex: 1;
    margin-right: 16px;
    display: inline-block;
    vertical-align: middle;
    padding: 24px 25px 30px 23px;
    background-color: #fff;

    .pager {
      float: right;
    }
  }

  .choose-member {
    flex: 0 0 320px;
    width: 320px;
    min-height: 700px;
    border-radius: 2px;
    background-color: #fff;
  }

  .search-box {
    margin-top: 20px;
    margin-bottom: 20px;

    .switch-member {
      float: right;

      .active {
        background-color: #409EFF;
        color: #fff;
      }
    }

    .choose-title {
      display: inline-block;
      margin-left: 20px;
      font-size: 14px;
    }
  }

  .choose-member {
    padding: 20px;

    .title {
      padding: 5px 0;
      font-size: 14px;
      color: #909399;
    }

    .key {
      color: #FA5D5D;
    }

    .mem-list {
      border: 1px solid #DCDFE6;
      border-radius: 5px;

      .al-members {
        padding: 10px;
        height: 45px;
        line-height: 25px;
        font-size: 14px;
        color: #303133;
        background-color: #F5F7FA;
        box-sizing: border-box;

        .per-num {
          float: right;
          font-size: 14px;
          color: #8D8D8D;
        }
      }

      .member-list {
        height: 420px;
        overflow-y: auto;
      }
    }

    .operator-btn {
      margin-top: 20px;
      font-size: 0;

      .frozen-all {
        background-color: #409EFF;
        color: #fff;
      }

      .back-link {
        display: inline-block;
        margin-right: 10px;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #DCDFE6;
        color: #606266;
        font-size: 14px;
        border-radius: 4px;
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

  .list-item {
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 0 16px;

    .basic-info {
      display: inline-block;

      .list-img {
        display: inline-block;
        vertical-align: middle;
        border-radius: 5px;
        height: 40px;
        width: 40px;
      }
    }

    .icon-close {
      float: right;
      display: none;
      line-height: 40px;
      cursor: pointer;
      color: #f5222d;
    }

    &:hover {
      .icon-close {
        display: inline-block;
      }
    }
  }

  .frozen-reason {
    font-size: 14px;
    color: #f00;
  }

  .remark-txt {
    padding: 5px 0;
  }

  .frozen-list {
    height: 100%;
  }
}
</style>
