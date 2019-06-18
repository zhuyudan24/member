<template>
  <div class="talk-container">
    <div class="min100">
      <v-nav :navpath="navpath"></v-nav>
      <div class="padding-container">
        <div class="mBottom20">
          <el-row>
            <el-col :span="19">
              <el-select
                v-model="telType"
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
                  label="不良评价回访"
                  :value=1
                ></el-option>
                <el-option
                  :key=2
                  label="ECM计划"
                  :value=2
                ></el-option>
              </el-select>
              <el-select
                v-model="tekStatys"
                style="margin-left: 5px"
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
                  label="未接通"
                  :value=1
                ></el-option>
                <el-option
                  :key=2
                  label="接通"
                  :value=2
                ></el-option>
              </el-select>
            </el-col>
            <el-col
              :span='5'
              class="tr"
            >
              <searchinput
                v-model="searchStr"
                stylelink="width: 280px"
                @handleSearch="handleSearch"
              ></searchinput>
            </el-col>
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
                label="呼叫时间"
              >
                <template slot-scope="scope">
                  {{ scope.row.callBeginTime | formatTime }}
                </template>
              </el-table-column>
              <el-table-column
                prop="clerkName"
                label="主叫信息"
              >
                <template slot-scope="scope">
                  <div class="clerk">
                    <span class="clerkimg"><img
                        style="vertical-align: middle"
                        width="60"
                        height="60"
                        :src="scope.row.clerkImage"
                        alt=""
                      ></span>
                    <span class="clerkname">{{ scope.row.clerkName }}<br>{{ scope.row.clerkType == 1 ? '店长': scope.row.clerkType == 0 ? '店员': '' }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="callType"
                label="类型"
              >
                <!-- <template slot-scope="scope">
                  <span v-if="scope.row.callType == -1">所有类型</span>
                  <span v-if="scope.row.typeName == 1">不良评价回访</span>
                  <span v-if="scope.row.typeName == 2">ECM计划</span>
                </template> -->
              </el-table-column>
              <el-table-column
                prop="callStatus"
                label="通话状态"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.callStatus == 1">未接通</span>
                  <span v-if="scope.row.callStatus == 2">接通</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="callTime"
                label="通话时长(秒)"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.callTime">{{ scope.row.callTime }}</span>
                  <span v-else>--</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="recordUrl"
                label="录音"
              >
                <template slot-scope="scope">
                  <span
                    class="pointer"
                    v-if="scope.row.recordUrl"
                    @click="playRecord(scope.row.recordUrl)"
                  >播放</span>
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

    <div class="foot-add">
      <vue-gic-footer></vue-gic-footer>
    </div>

    <!-- <div class="footwrap">
      <el-button plain @click="goback">返回</el-button>
    </div> -->
    <el-dialog
      title="播放"
      :visible.sync="dialogPlayVisible"
      width="500px"
      @close="closePlayer"
    >
      <div>
        <audio
          controls
          id="audioplayer"
        >
          <source
            :src="curRecordUrl"
            type="audio/mpeg"
          >
          <source
            :src="curRecordUrl"
            type="audio/ogg"
          >
          Your browser does not support this audio format.
        </audio>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPlayVisible = false"
        >关 闭</el-button>
      </span>
    </el-dialog>
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
export default {
  name: "talkLogPage",
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
          path: "/wechatmemberDetail?memberId=" + this.$route.query.memberId
        },
        {
          name: "通话记录",
          path: ""
        }
      ],
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      telType: -1,
      tekStatys: -1,
      searchStr: "",
      dialogPlayVisible: false,
      curRecordUrl: ""
    };
  },
  methods: {
    closePlayer() {
      var myAuto = document.getElementById("audioplayer");
      myAuto.pause();
      myAuto.load();
    },
    playRecord(recordUrl) {
      this.dilogPlayVisible = true;
      this.curRecordUrl = recordUrl;
    },
    handleSearch() {
      this.page.currentPage = 1;
      this.getMemberCardsPage();
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
      doFetch(url.talkLogPage, {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        telType: this.telType,
        tekStatys: this.tekStatys,
        searchStr: this.searchStr
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
    }
  },
  created() {
    if (this.memberId) {
      this.getMemberCardsPage();
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

.talk-container {
  height: 100%;
}
</style>
