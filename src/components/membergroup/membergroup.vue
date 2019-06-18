<template>
  <div
    class="member-group"
    :style="{height: (bodyHeight - 64) + 'px'}"
  >
    <div class="container">
      <v-nav :navpath="navpath"></v-nav>
      <div class="group-wrap">
        <div
          class="group"
          style=""
        >
          <div class="add-wrap">
            <el-button
              type="primary"
              @click="addMemberGroup"
              class="add-btn"
            >新增分组</el-button>
          </div>
          <div class="groupwrap clear" v-if="page.totalCount > 0">
            <div
              class="groupwrap-item"
              v-for="(item,index) in memberGroupList"
              :key="index">
              <div class="groupwrap-content">
                <div class="groupwrap-title">
                  <el-popover
                    placement="top"
                    width="200"
                    trigger="hover"
                    :content="'备注： ' + item.memberGroupDescribe"
                  >
                    <div
                      class="member-group-name"
                      slot="reference"
                    >{{ item.memberGroupName }}</div>
                  </el-popover>
                </div>
                <div class="groupwrap-total borderbmdashed">
                  <p class="groupwrap-text">{{ item.memberCount }} 人</p>
                </div>
                <div class="groupwrap-condition">筛选条件： {{ item.memberSearchCount }}项
                  <!--<p class="groupwrap-conditiontext" style="display:none;">-->
                  <!--{{ item.memberSearchStr | formatCondition }}-->
                  <!--</p>-->
                </div>
              </div>
              <div class="groupwrap-handler">
                <router-link
                  :to="{path: '/membergroupAdd',query: {'memberGroupId': item.memberGroupId}}"
                  class="mr6 pointer ml15 opt-icon"
                  title="编辑"
                ><i class="el-icon-edit"></i></router-link>
                <span
                  class="mr6 pointer opt-icon"
                  title="详情"
                  @click="handleDetailGrop(item.memberGroupId)"
                ><i class="el-icon-document"></i></span>
                <span
                  class="pointer opt-icon"
                  title="删除"
                  @click="handleDeleteGroup(item.memberGroupId, index)"
                ><i class="el-icon-delete"></i></span>
              </div>
            </div>
            <div
              class="page mTop20"
              v-if="memberGroupList.length > 0"
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
            <!-- 空图标 -->
            <div
              class="el-table__body-wrapper is-scrolling-none"
              v-if="memberGroupList.length == 0"
            >
              <table
                cellspacing="0"
                cellpadding="0"
                border="0"
                class="el-table__body"
                style="width: 1077px;"
              >
                <colgroup>
                  <col
                    name="el-table_3_column_9"
                    width="359"
                  >
                  <col
                    name="el-table_3_column_10"
                    width="359"
                  >
                  <col
                    name="el-table_3_column_11"
                    width="359"
                  >
                </colgroup>
                <tbody>
                  <!---->
                </tbody>
              </table>
              <div
                class="el-table__empty-block"
                style="width: 100%; height: 256px;"
              >
                <span class="el-table__empty-text">暂无数据</span>
              </div>
              <!---->
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
import { normalizePeople } from "@/utils/utils";
import {
  checkFalse,
  checkStatus,
  checkSuccess
} from "../../../static/js/checkStatus";
export default {
  name: "membergroup",
  data() {
    return {
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "会员分组",
          path: ""
        }
      ],
      page: {
        pageSize: 20,
        currentPage: 1,
        totalCount: 0
      },
      memberGroupList: []
    };
  },
  filters: {
    formatCondition: function(val) {
      let tempObj = JSON.parse(val);
      return val;
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getFindMemberGroups({ pageSize: 20, currentPage: val });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getFindMemberGroups({ pageSize: val, currentPage: 1 });
    },
    addMemberGroup() {
      this.$router.push({ path: "/membergroupAdd" });
    },
    handleDetailGrop(memberGroupId) {
      this.$router.push({
        path: "/membergroupDetail",
        query: { memberGroupId: memberGroupId }
      });
    },
    getFindMemberGroups(opt) {
      doFetch(url.findMemberGroups, {
        pageSize: opt.pageSize || 20,
        currentPage: opt.currentPage || 1,
        shareStatus: 0
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            // 返回筛选条件的数据
            this.memberGroupList = res.data.result.page.result.map(
              (ele, index) => ({
                ...ele,
                memberSearchCount: normalizePeople(ele.memberSearchStr)
              })
            );
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
    handleDeleteGroup(memberGroupId, i) {
      this.$confirm(`确定删除该会员分组`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          doFetch(url.deteleMemberGroup, {
            memberGroupId: memberGroupId
          })
            .then(res => {
              if (res.data.errorCode === 0) {
                this.page.currentPage = 1;
                this.getFindMemberGroups({});
                // this.memberGroupList.splice(i, 1);
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
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
    this.getFindMemberGroups({});
    this.$store.commit("mutations-slide", false);
    // this.$nextTick(_ => {
    //   this.$store.commit('mutations-slide',true);
    // })
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="less" scoped>
.member-group {
  background: #f0f2f5;
  overflow-y: auto;
}

.group-wrap {
  background-color: #f0f2f5;
  padding: 24px;
  min-height: 560px;
}

.group {
  padding: 24px;
  background: #fff;

  .add-wrap {
    margin-bottom: 23px;
    padding-right: 14px;
    overflow: hidden;
  }

  .groupwrap-title {
    border-color: #dcdfe6;
    border-radius: 4px 4px 0 0;
    background-color: #f5f7fa;
    padding: 10px 15px;
  }

  .groupwrap-handler {
    border-radius: 0 0 4px 4px;
    background-color: #f5f7fa;
  }

  .member-group-name {
    max-width: 100%;
    white-space: nowrap;
    font-size: 16px;
    overflow: hidden;
  }

  .groupwrap {
    .borderbmdashed {
      border-color: #dcdfe6;
    }
  }

  .opt-icon {
    color: #909399;
    font-size: 16px;

    &:hover {
      .el-icon-edit {
        color: #409eff;
      }

      .el-icon-document {
        color: #409eff;
      }

      .el-icon-delete {
        color: #F56C6C;
      }
    }
  }
}

.groupwrap-item {
  display: inline-block;
  vertical-align: middle;
  margin: 0 10px 10px 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  max-width: 24%;
  min-width: 290px;
}

.add-btn {
  float: right;
}

.member-group {
  .container {
    min-height: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;
  }

  .foot-add {
    margin-top: -100px;
  }
}
</style>
