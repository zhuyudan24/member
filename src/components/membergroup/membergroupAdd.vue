<template>
  <div
    class="member-add"
    :style="{ height: bodyHeight - 64 + 'px'}"
  >
    <div class="container">
      <v-nav :navpath="navpath"></v-nav>
      <div class="wrap">
        <div class="wrap-cell">
          <h1 class="wrap-title">分组内容设置</h1>
          <el-form
            class="groupform ml32 "
            ref="groupForm"
            :rules="rules"
            :model="groupForm"
            label-position="right"
            label-width="80px"
          >
            <el-form-item
              label="分组名称"
              prop="memberGroupName"
            >
              <gic-input
                v-model="groupForm.memberGroupName"
                :max="20"
                :changeBColor="changeBColor"
              ></gic-input>
            </el-form-item>
            <el-form-item label="分组描述">
              <gic-textarea
                v-model="groupForm.memberGroupDescribe"
                :max="20"
              ></gic-textarea>
            </el-form-item>
          </el-form>
        </div>
        <div class="wrap-cell mTop20">
          <h1 class="wrap-title">人群筛选器</h1>
          <div class="gic-people">
            <vue-gic-people
              :sceneValue="sceneValue"
              :useId="userId"
              :hasSearchData="hasSearchData"
              ref="peopleFilter"
              @findFilter="findFilter"
              @getBackData="getBackData"
              @editHide="editHide"
              @editShow="editShow"
              @hideBtn="hideBtn"
            >
            </vue-gic-people>
            <!-- <vue-gic-group-people
              :projectName="projectName"
              :sceneValue="sceneValue"
              :useId="userId"
              :hasSearchData="hasSearchData"
              ref="peopleFilter"
              @findFilter="findFilter"
              @getBackData="getBackData"
              @editHide= "editHide"
              @editShow="editShow"
              @hideBtn="hideBtn">
            </vue-gic-group-people> -->
            <!-- <div class="btn-filter"> -->
            <!-- <el-button type="primary" @click="getData">确认</el-button>  -->
            <!-- </div> -->
            <div class="gic-people-button">
              <div v-if="toggleTag">
                <el-button
                  type="primary"
                  @click="getData"
                >确定</el-button>
                <el-button @click="cancelFilter">取消</el-button>
              </div>
              <div v-if="saveTag">
                <el-button @click="saveTempData">保存</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-gic-footer></vue-gic-footer>
    <div class="footwrap">
      <el-button
        type="primary"
        size="small"
        @click="submitMemberGroup('groupForm')"
      >保存</el-button>
      <el-button
        plain
        size="small"
        @click="goback"
      >返回</el-button>
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
import { setTimeout } from "timers";
export default {
  name: "membergrop-detail",
  data() {
    return {
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      hasSearchData: "",
      userId: this.$route.query.memberGroupId
        ? "memberGroup" + this.$route.query.memberGroupId
        : "",
      memberGroupId: this.$route.query.memberGroupId,
      isAddtext: "",
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
          name: "",
          path: ""
        }
      ],
      sceneValue: "member",
      projectName: "member",
      groupForm: {
        memberGroupName: "",
        memberGroupDescribe: "",
        memberSearchStr: "",
        indexSearchStr: "" // 所有数据
      },
      changeBColor: false,
      page: {
        currentPage: 1,
        pageSize: 20,
        totalPage: 0
      },
      memberData: [],
      sortColName: "",
      sortType: "desc",
      rules: {
        memberGroupName: [
          { required: true, message: "分组名不能为空", trigger: "blur" }
        ]
      },
      ruleForm: [
        {
          required: true,
          message: "分组名称不能为空"
        }
      ],
      toggleTag: false,
      saveTag: false
    };
  },
  methods: {
    // 父组件调用子组件方法,触发父组件事件
    getData() {
      this.$refs.peopleFilter.confirmSet();
    },
    // 子组件触发父组件事件,返回过滤条件数据
    findFilter(value) {
      this.groupForm.memberSearchStr = value;
    },
    // 取消
    cancelFilter() {
      this.$refs.peopleFilter.cancelSet();
    },
    // 获取需要回显的数据, 供保存时候使用
    getBackData(val) {
      this.groupForm.indexSearchStr = val;
    },
    // 编辑时候显示确定 取消按钮
    editShow() {
      this.toggleTag = true;
    },
    // 确认好选择条件之后 隐藏按钮
    editHide() {
      this.toggleTag = false;
    },
    // 隐藏保存按钮和确认按钮  (子组件会调用)
    hideBtn() {
      this.toggleTag = false;
    },
    // 保存当前模板,对接保存接口
    saveTempData() {
     // 占位
    },
    async submitMemberGroup(groupForm) {
      await this.$refs.peopleFilter.confirmSet();
      this.$refs[groupForm].validate(valid => {
        if (valid) {
          this.changeBColor = false;
          // 这里是去拿人群筛选器的hasSearch
          let curUrl = null;
          let params = null;
          // 定时器先拿到人群筛选器的hasSearch
           setTimeout(_ => {
          if (this.memberGroupId) {
            curUrl = url.updateMemberGroup;
            params = {
              memberGroupName: this.groupForm.memberGroupName,
              memberGroupDescribe: this.groupForm.memberGroupDescribe,
              memberSearchStr: this.groupForm.memberSearchStr || "-1",
              indexSearchStr: this.groupForm.indexSearchStr,
              memberGroupId: this.memberGroupId
            };
          } else {
            curUrl = url.insertMemberGroup;
            params = {
              memberGroupName: this.groupForm.memberGroupName,
              memberGroupDescribe: this.groupForm.memberGroupDescribe,
              indexSearchStr: this.groupForm.indexSearchStr,
              memberSearchStr: this.groupForm.memberSearchStr || "-1"
            };
          }
          doFetch(curUrl, params)
            .then(res => {
              if (res.data.errorCode === 0) {
                checkSuccess();
                setTimeout(() => {
                  this.goback();
                }, 1000);
              } else {
                checkFalse(res.data.message);
              }
            })
            .catch(err => {
              checkStatus(err);
            });
           }, 200);
        } else {
          this.changeBColor = true;
          return false;
        }
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
            this.groupForm.memberSearchStr = this.hasSearchData =
              res.data.result.memberGroup.memberSearchStr;
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    goback() {
      this.$router.push({ path: "/membergroup" });
    }
  },
  created() {
    if (this.memberGroupId) {
      this.getDetail(this.memberGroupId);
      this.isAddtext = "编辑";
    } else {
      this.isAddtext = "新增";
    }
    this.navpath[this.navpath.length - 1].name = this.isAddtext;
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="stylus" scoped>
.member-add {
  background: #f0f2f5;
  overflow: auto;
}

.wrap {
  padding: 24px;
  background: #f0f2f5;

  .wrap-cell {
    background: #fff;

    .wrap-title {
      margin: 0;
      padding: 0 32px;
      line-height: 56px;
      border-bottom: 1px solid #dcdfe6;
    }

    .groupform {
      padding: 20px 32px;
    }

    .gic-form-area {
      resize: none;
    }
  }
}

.gic-people {
  position: relative;
  padding: 20px 32px;
  z-index: 0;
  min-height: 100px;
  background-color: #fff;
}

.btn-filter {
  padding-left: 150px;
  margin-top: 10px;
  background-color: #fff;
}

.gic-form-item {
  border-color: #f00;
}

.el-form-item {
  .gic-form-area {
    resize: none;
  }
}

.footwrap {
  .el-button+.el-button {
    margin-left: 5px;
  }
}

.gic-people-button {
  background-color: #f2f3f4;
}
</style>
