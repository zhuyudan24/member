<template>
  <div
    class="labelmanage"
    :style="{ height: bodyHeight - 64 + 'px'}"
  >
    <!-- <div class="achievementwrap-left" :style="{height: (bodyHeight - 64) + 'px'}">
        <vue-gic-aside-menu :projectName="projectName" :leftModulesName="leftModulesName" :collapseFlag="$store.state.show"></vue-gic-aside-menu>
      </div> -->
    <div class="label-container min100">
      <v-nav :navpath="navpath"></v-nav>
      <div class="labelcontainer-wrap">
        <div class="labelcontainer">
          <div class="tr pad-b-24">
            <el-button
              type="primary"
              @click="AddTagType"
            >新增标签类型</el-button>
          </div>
          <div class="labelList marginAuto clear">
            <div
              class="labelitem"
              v-for="(item,index) in tagList"
              :key="index"
            >
              <div class="group">
                <el-button
                  class="grouptitle"
                  size="small"
                  type="text"
                >{{ item.tagName }}</el-button>
                <!--  <el-button type="text" class="grouptag tagcolor" @click="addLabel(item.pTagId)">添加标签</el-button><span class="labelsplit tagcolor">|</span> -->
                <!-- <el-button  type="text" class="grouptag tagcolor">删除标签分组</el-button> -->
                <el-button
                  class="grouptag fr"
                  size="small"
                  type="danger"
                  plain
                  @click="deleteGroup(item.pTagId,1)"
                >删除</el-button>
              </div>
              <div class="group-items">
                <!-- <div class="group-item"  v-for="(list,idx) in item.sonList" :key="idx"> -->
                <!-- <span class="group-itemtag">{{ list.tagName }} <i @click="deleteGroup(list.sTagId,2)" class="el-icon-close deletetag"></i></span> -->
                <el-tag
                  closable
                  v-for="(list, idx) in item.sonList"
                  :key="idx"
                  @close="deleteGroup(list.sTagId,2)"
                > {{list.tagName}} </el-tag>
                <!-- </div> -->
                <el-input
                  style="vertical-align: inherit;"
                  class="input-new-tag"
                  v-if="item.inputVisible"
                  v-model="item.inputVal"
                  :ref="'saveTag' + index"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(item, index, $event)"
                  @blur="handleInputConfirm(item, index, $event)"
                ></el-input>
                <el-button
                  size="small"
                  v-else
                  class="grouptag el-tag"
                  @click="showInput(item, index)"
                >+ 添加标签</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--新增标签类型-->
      <el-dialog
        title="新增标签类型"
        :visible.sync="dilogLabelFormVisible"
        width="574px"
      >
        <el-form
          :model="labelForm"
          class="dilogForm"
          ref="addForm"
        >
          <el-form-item
            label="类型名称"
            label-width="100px"
            prop="tagName"
            :rules="[{ required: true, message: '类型名称不能为空', trigger: ['blur']}]"
          >
            <el-input
              v-model="labelForm.tagName"
              v-show="false"
            ></el-input>
            <gic-input
              v-model="labelForm.tagName"
              :max="10"
            ></gic-input>
          </el-form-item>
          <el-form-item
            label="类型描述"
            label-width="100px"
            prop="tagDescribe"
            :rules="[{ required: true, message: '类型描述不能为空', trigger: ['blur']}]"
          >
            <el-input
              v-model="labelForm.tagDescribe"
              v-show="false"
            ></el-input>
            <gic-textarea
              v-model="labelForm.tagDescribe"
              :max="100"
            ></gic-textarea>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dilog-footer"
        >
          <el-button @click="dilogLabelFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="AddParentTag"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!--新增标签类型-end-->

      <!--新增标签-->
      <el-dialog
        title="新增标签"
        :visible.sync="dilogAddFormVisible"
        width="574px"
      >
        <el-form
          :model="addLabelForm"
          class="dilogForm"
          ref="addChildForm"
        >
          <el-form-item
            label="标签名称"
            label-width="100px"
            prop="tagName"
            :rules="[{ required: true,message: '类型描述不能为空', trigger: ['blur'] }]"
          >
            <el-input
              v-model="addLabelForm.tagName"
              v-show="false"
            ></el-input>
            <gic-input
              v-model="addLabelForm.tagName"
              :max="10"
            ></gic-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dilog-footer"
        >
          <el-button @click="dilogAddFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitAddLabel"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!--新增标签-end-->
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
  checkSuccess
} from "../../../static/js/checkStatus";
export default {
  name: "labelmanager",
  data() {
    return {
      addTagCount: 0,
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      collapseFlag: false,
      leftModulesName: "会员标签",
      projectName: "member",
      inputVisible: false, // 新加标签
      inputValue: "",
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: "会员标签",
          path: ""
        }
      ],
      dilogLabelFormVisible: false,
      dilogAddFormVisible: false,
      labelForm: {
        tagName: "",
        tagDescribe: ""
      },
      addLabelForm: {
        tagName: ""
      },
      tagList: [],
      curpTagId: null
    };
  },
  created() {
    this.$store.commit("mutations-slide", false);
    this.TimeFlag = false;
  },
  methods: {
    // 显示输入框新增标签
    showInput(item, index) {
      item.inputVisible = true;
      this.curpTagId = item.pTagId;
      this.$nextTick(_ => {
        let saveTag = `saveTag${index}`;
        this.$refs[saveTag][0].$refs.input.focus();
      });
    },
    // 新加标签
    handleInputConfirm(item, i, event) {
      let inputValue = item.inputVal;
      // 不能为空
      if (inputValue) {
         item.inputVal = '';
        // sy 不能重复输入
        let hasSonTag = true;
        if (!!this.tagList[i].sonList.length) {
          hasSonTag = this.tagList[i].sonList.every(el => {
            return inputValue !== el.tagName;
          });
        }

        if (!hasSonTag) {
          this.$message.warning("已存在该标签名，不能重复添加！");
          return;
        }
        doFetch(url.insertSonTag, {
          tagName: inputValue,
          pTagId: this.curpTagId
        })
          .then(res => {
            if (res.data.errorCode === 0) {
              checkSuccess();
              this.inputVisible = false;
              item.inputVal = "";
              this.getLabel();
              return false;
            } else {
              checkFalse(res.data.message);
            }
            this.dilogAddFormVisible = false;
          })
          .catch(err => {
            checkStatus(err);
            this.dilogAddFormVisible = false;
          });
      }
    },
    AddTagType() {
      this.labelForm.tagName = "";
      this.labelForm.tagDescribe = "";
      this.dilogLabelFormVisible = true;
    },
    AddParentTag() {
      var that = this;
      that.$refs["addForm"].validate(valid => {
        if (valid) {
          // sy 不允许标签类型名重复
          let hasTag = true;
          if (!!that.tagList.length) {
            hasTag = that.tagList.every(el => {
              return that.labelForm.tagName !== el.tagName;
            });
          }

          if (!hasTag) {
            that.$message.warning("已存在该标签类型");
            return;
          }
          if (
            that.labelForm.tagName.trim() &&
            that.labelForm.tagDescribe.trim()
          ) {
            doFetch(url.insertParentTag, {
              tagName: that.labelForm.tagName,
              tagDescribe: that.labelForm.tagDescribe
            })
              .then(res => {
                if (res.data.errorCode === 0) {
                  checkSuccess();
                  that.getLabel();
                } else {
                  checkFalse(res.data.message);
                }
                that.dilogLabelFormVisible = false;
              })
              .catch(err => {
                checkStatus(err);
                that.dilogLabelFormVisible = false;
              });
          } else {
             checkFalse('标签名称和描述都不能为空');
            return false;
          }
        }
      });
    },
    deleteGroup(TagId, type) {
      let params = "";
      let curdelurl = "";
      if (type === 1) {
        curdelurl = url.deleteParentTag;
        params = {
          pTagId: TagId
        };
      }
      if (type === 2) {
        curdelurl = url.deleteSonTag;
        params = {
          sTagId: TagId
        };
      }
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          doFetch(curdelurl, params)
            .then(res => {
              if (res.data.errorCode === 0) {
                this.getLabel();
                checkSuccess("删除成功");
              } else {
                checkFalse(res.data.message);
                return false;
              }
            })
            .catch(err => {
              //  console.log(err);
              checkStatus(err);
            });
        })
        .catch(err => {
          this.$message.info("已取消删除");
        });
    },
    submitAddLabel() {
      this.$refs["addChildForm"].validate(valid => {
        return !valid;
      });
      if (this.addLabelForm.tagName.trim()) {
        doFetch(url.insertSonTag, {
          tagName: this.addLabelForm.tagName,
          pTagId: this.curpTagId
        })
          .then(res => {
            if (res.data.errorCode === 0) {
              checkSuccess();
              this.getLabel();
            } else {
              checkFalse(res.data.message);
            }
            this.dilogAddFormVisible = false;
          })
          .catch(err => {
            checkStatus(err);
            this.dilogAddFormVisible = false;
          });
      } else {
         checkFalse('标签名称不能为空');
        return false;
      }
    },
    addLabel(pTagId) {
      this.dilogAddFormVisible = true;
      this.addLabelForm.tagName = "";
      this.curpTagId = pTagId;
    },
    getLabel() {
      doFetch(url.tagManageList)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.tagList =
              res.data.result.tagList &&
              res.data.result.tagList.length &&
              res.data.result.tagList.map(ele => ({
                ...ele,
                inputVisible: false,
                inputVal: ""
              }));
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    }
  },
  mounted() {
    this.getLabel();
    window.onresize = () => {
      return (() => {
        this.bodyHeight =
          document.body.clientHeight || document.documentElement.clientHeight;
      })();
    };
  },
  components: {
    "v-nav": nav
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../static/css/variables.styl';

.labelmanage {
  overflow-y: scroll;

  .dilogForm {
    width: 480px;
  }

  .achievementwrap-left {
    flex: 0 0 200px;
  }

  .labelcontainer-wrap {
    padding: 24px 24px 1px 24px;
  }

  .labelcontainer {
    padding: 24px 26px 59px 27px;
    background: #fff;

    .pad-b-24 {
      padding-bottom: 24px;
      border-bottom: 1px solid #e4e7ed;
    }

    .group {
      position: relative;
      padding: 11px 0 0 0;
      line-height: 32px;

      &-items {
        padding: 14px 0 18px 0;
        font-size: 0;
      }

      &-item {
        display: inline-block;
        font-size: 14px;
      }

      &-itemtag {
        display: inline-block;
        position: relative;
        padding: 5px 12px;
        color: #333;
        background-color: transparent;
        transition: all 0.2s;
        cursor: pointer;

        .deletetag {
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
          font-size: 10px;
          color: #fff;
          transition: all 0.5s;
        }

        &:hover {
          color: #fff;
          background-color: $labelbgcolor;
        }

        &:hover .deletetag {
          opacity: 1;
          transform: rotate(180deg);
        }
      }
    }

    .grouptitle {
      font-weight: bold;
      color: #303133;
      font-size: 14px;
    }

    .grouptag {
      font-size: 12px;
    }

    .tagcolor {
      color: $labecolor;
    }

    .labelsplit {
      padding: 10px;
      font-size: 14px;
    }

    .labelitem {
      border-bottom: 1px solid #e4e7ed;
    }

    .el-tag {
      margin-bottom: 10px;
    }
  }

  .el-form-item__content {
    width: 380px;

    .gic-form-item {
      width: 380px;

      .gic-form-input {
        line-height: 1;
      }
    }

    .gic-formarea-item {
      width: 380px;
    }
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
