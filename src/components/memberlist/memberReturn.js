import searchinput from "common/searchinput";
import Navbar from "../../view/layout/components/Navbar.vue";
import { doFetch, doFetchqs } from "../../components/axios/api";
import NavPath from "@/common/navbar/navbar.vue";
import url from "../../components/axios/url";
import {
  checkFalse,
  checkStatus,
  checkSuccess
} from "../../../static/js/checkStatus";
import { formatLongTime, paddingBorth } from "@/utils/utils";
import { mapState } from "vuex";

let showFields = [];
export default {
  name: "wechatmembers",
  data() {
    return {
      load: false,
      phoneNameNick: "",
      isdot: false,
      bodyHeight:
        document.body.clientHeight || document.documentElement.clientHeight,
      storeId: this.$route.query.storeId || "",
      toggleTag: false,
      peopleVisible: false,
      memberSearchStr: -1,
      navpath: [
        { name: "首页", path: "" },
        { name: "会员列表", path: "/wechatmembers" },
        { name: "回收站门店会员", path: "" }
      ],
      sceneValue: "member",
      tableData: [],
      base: false,
      pageName: "wxMember",
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      memberFields: [],
      sortColName: "",
      sortType: "desc",
      fieldsStr: [],
      dialogFieldVisible: false,
      checkedFields: [],
      multipleList: [],
      selectAll: false,
      batchValue: "",
      dialogIntegralVisible: false,
      IntegralForm: {
        editType: 1,
        accumulatPoints: 0,
        remark: "",
        settlementStoreId: ""
      },
      storeList: [],
      loading: false,
      rules: {
        editType: [
          { required: true, message: "请选择调整方式", trigger: "change" }
        ],
        accumulatPoints: [
          { required: true, message: "请选择调整额度", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请输入原因备注", trigger: "change" }
        ]
      },
      dialogGradeVisible: false,
      gradeForm: {
        gradeId: "",
        remark: ""
      },
      memberGrade: [],
      graderules: {
        gradeId: [{ required: true, message: "请选择等级", trigger: "change" }],
        remark: [
          { required: true, message: "请输入原因备注", trigger: "change" }
        ]
      },
      mainstorerules: {
        remark: [
          { required: true, message: "请输入原因备注", trigger: "change" }
        ]
      },
      projectName: "member",
      showStoreDialog: false,
      dialogMainstoreVisible: false,
      mainstoreForm: {
        remark: "",
        optType: 1,
        mainOptType: 1,
        mainStoreId: ""
      },
      storeName: "",
      dialogProcessVisible: false,
      processList: [],
      timer: null,
      dialogSubStoreVisible: false,
      storeForm: {
        remark: "",
        optType: 2,
        subOptType: 1,
        fromSubStoreId: "",
        toSubStoreId: "",
        phoneNameCard: "",
        premodefiySubStoreId: "",
        modefiySubStoreId: "",
        deleteSubStoreId: "",
        addSubStoreId: "",
        modefiySubStoreName: "",
        addSubStoreName: ""
      },
      storerules: {
        remark: [
          { required: true, message: "请输入原因备注", trigger: "change" }
        ]
      },
      subStoreList: [],
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
      },
      integralFlag: ""
    };
  },
  computed: {
    ...mapState(["storeImageUrl"])
  },
  filters: {
    formatField: function(val) {
      let tempVal = val;
      let returnVal = "";
      if (tempVal == "name") {
        returnVal = "基本信息";
      }
      if (tempVal == "grade") {
        returnVal = "会员等级";
      }
      if (tempVal == "status") {
        returnVal = "状态";
      }
      if (tempVal == "channel") {
        returnVal = "关联渠道";
      }
      if (tempVal == "cardGivingTime") {
        returnVal = "开卡时间";
      }
      if (tempVal == "createTime") {
        returnVal = "新增时间";
      }
      if (tempVal == "attentionDate") {
        returnVal = "关注时间";
      }
      if (tempVal == "costAll") {
        returnVal = "消费总额";
      }
      if (tempVal == "costTimes") {
        returnVal = "消费次数";
      }
      if (tempVal == "lastCostTime") {
        returnVal = "最近消费";
      }
      if (tempVal == "avgCost") {
        returnVal = "客单价";
      }
      if (tempVal == "avgNumber") {
        returnVal = "连带率";
      }
      if (tempVal == "costCategory") {
        returnVal = "消费品类";
      }
      if (tempVal == "discountRate") {
        returnVal = "平均折扣";
      }
      if (tempVal == "cancelAttentionTime") {
        returnVal = "取关时间";
      }
      if (tempVal == "age") {
        returnVal = "年龄";
      }
      if (tempVal == "birthday") {
        returnVal = "生日";
      }
      if (tempVal == "storedValueAll") {
        returnVal = "储值总额";
      }
      if (tempVal == "storedValueCurrent") {
        returnVal = "储值余额";
      }
      if (tempVal == "pointsAll") {
        returnVal = "累计积分";
      }
      if (tempVal == "pointsCurrent") {
        returnVal = "积分余额";
      }
      if (tempVal == "mainStoreName") {
        returnVal = "主门店";
      }
      if (tempVal == "createCardStoreName") {
        returnVal = "开卡门店";
      }
      if (tempVal == "cardNo") {
        returnVal = "会员卡号";
      }
      if (tempVal == "frozenStatus") {
        returnVal = "会员冻结状态";
      }
      return returnVal;
    },
    formatFieldName: function(val) {
      let idx = showFields.findIndex(value => {
        return value.code == val;
      });
      return showFields[idx].name;
    },
    formatMember(val) {
      if (val) {
        if (val.length > 3) {
          val = val.substr(0, 3) + "...";
        }
      }
      return val;
    },
    formatCardName(val) {
      if (val) {
        if (val.length > 10) {
          val = val.substr(0, 10) + "...";
        }
      }
      return val;
    },
    formatTimeYMD(val) {
      return val != "--" ? val.split(" ")[0] : "--";
    },
    formatTimeHMS(val) {
      return val != "--" ? val.split(" ")[1] : "--";
    },
    formatProcess(val) {
      let a = (val.finishCount * 100) / val.taskCount;
      let f = parseFloat(a);
      if (isNaN(f)) {
        return;
      }
      f = Math.round(a * 100) / 100;
      return f;
    }
  },
  watch: {
     processList(newValue,oldValue) {
       if(newValue.length <= 0) {
         let self = this;
         clearInterval(self.timer);
         this.getAjaxMembers();
       }else {
         let self = this;
         clearInterval(self.timer);
         this.timer = setInterval(() => {
           this.getProcessList();
         },5000);
       }
     },
    phoneNameCard(newVal) {
      sessionStorage.setItem("phoneNameCard", newVal);
    }
  },
  methods: {
    // 父组件调用子组件方法,触发父组件事件
    getData() {
      this.$refs.peopleFilter.confirmSet();
    },
    // 子组件触发父组件事件,返回过滤条件数据
    findFilter(value) {
      this.memberSearchStr = value;
      this.getAjaxMembers();
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
      // console.log("hide");
    },
    // 保存当前模板,对接保存接口
    saveTempData() {
      // console.log("save");
    },
    formatTime(val) {
      var date = new Date(val);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let ret = Y + M + D + h + m + s;
      return ret;
    },
    linkDetail(memberId) {
      this.$router.push({
        path: "/wechatmemberDetail",
        query: { memberId: memberId }
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
    changeSubStore() {
      if (this.storeForm.subOptType == 1) {
        this.storeForm.modefiySubStoreName = "";
        this.storeForm.modefiySubStoreId = "";
        this.storeForm.deleteSubStoreId = "";
      }
      if (this.storeForm.subOptType == 2) {
        this.storeForm.addSubStoreName = "";
        this.storeForm.addSubStoreId = "";
        this.storeForm.deleteSubStoreId = "";
      }
      if (this.storeForm.subOptType == 3) {
        this.storeForm.addSubStoreName = "";
        this.storeForm.addSubStoreId = "";
        this.storeForm.modefiySubStoreName = "";
        this.storeForm.modefiySubStoreId = "";
      }
    },
    submitStore(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let memberIdsArr = [];
          if (this.multipleList.length > 0) {
            this.multipleList.forEach(item => {
              memberIdsArr.push(item.memberId);
            });
          } else {
            checkFalse("会员不能为空");
            return false;
          }
          if (this.storeForm.subOptType == 1) {
            if (this.storeForm.addSubStoreId == "") {
              checkFalse("请选择新增协管门店");
              return false;
            } else {
              this.storeForm.fromSubStoreId = this.storeForm.addSubStoreId;
            }
          }
          if (this.storeForm.subOptType == 2) {
            if (this.storeForm.premodefiySubStoreId == "") {
              checkFalse("请选择协管门店");
              return false;
            }
            if (this.storeForm.modefiySubStoreId == "") {
              checkFalse("请选择要修改后的协管门店");
              return false;
            }
            this.storeForm.fromSubStoreId = this.storeForm.premodefiySubStoreId;
            this.storeForm.toSubStoreId = this.storeForm.modefiySubStoreId;
          }
          if (this.storeForm.subOptType == 3) {
            this.storeForm.fromSubStoreId = this.storeForm.deleteSubStoreId;
          }

          doFetch(url.batchUpdateStore, {
            memberIds: memberIdsArr.join(","),
            remark: this.storeForm.remark,
            isCurrent: this.selectAll == true ? 2 : this.multipleList.length == this.page.pageSize ? 1 : 0,
            optType: this.storeForm.optType,
            subOptType: this.storeForm.subOptType,
            fromSubStoreId: this.storeForm.fromSubStoreId,
            toSubStoreId: this.storeForm.subOptType == 2 ? this.storeForm.toSubStoreId : "",
            phoneNameCard: this.phoneNameCard,
            listSign: "MemberProcessed",
            listSignId: this.storeId,
            sortField: "",
            phoneNameNick: this.phoneNameNick
          })
            .then(res => {
              this.$refs[formName].resetFields();
              if (res.data.errorCode === 0) {
                checkSuccess();
                this.dialogSubStoreVisible = false;
              } else {
                checkFalse(res.data.message);
                this.dialogSubStoreVisible = false;
                return false;
              }
            })
            .then(() => {
              setTimeout(() => {
                this.getProcessList();
              }, 30);
            })
            .catch(err => {
              checkStatus(err);
              this.dialogSubStoreVisible = false;
              this.$refs[formName].resetFields();
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },

    getSubStoreList() {
      let memberIdsArr = [];
      if (this.multipleList.length > 0) {
        this.multipleList.forEach(item => {
          memberIdsArr.push(item.memberId);
        });
      } else {
        checkFalse("会员不能为空");
        return false;
      }
      doFetch(url.membersSubStoreList, {
        memberIds: memberIdsArr.join(","),
        isCurrent: this.selectAll == true ? 2 : this.multipleList.length == this.page.pageSize ? 1 : 0,
        pageName: 'wxMember',
        phoneNameCard: this.phoneNameCard
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.subStoreList = res.data.result.storeList;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    closeProcess() {
      clearInterval(this.timer);
    },
    getBatchProcess() {
      this.dialogProcessVisible = true;
    },
    // 移动触发处理进度
    callProcess() {
      this.getProcessList();
    },
    getProcessList() {
      doFetch(url.batchProcess)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.isdot = res.data.result.list.length > 0 ? true : false;
            this.processList = res.data.result.list.map(ele => ({
              ...ele,
              name: ele.name ? ele.name : "未知"
            }));
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    // 修改主门店
    submitMainStore(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let memberIdsArr = [];
          if (this.multipleList.length > 0) {
            this.multipleList.forEach(item => {
              memberIdsArr.push(item.memberId);
            });
          } else {
            checkFalse("会员不能为空");
            return false;
          }
          if (this.mainstoreForm.mainOptType == 4) {
            if (this.mainstoreForm.mainStoreId == "") {
              checkFalse("自定义门店不能为空");
              return false;
            }
          }
          doFetch(url.batchUpdateStore, {
            memberIds: memberIdsArr.join(","),
            remark: this.mainstoreForm.remark,
            isCurrent: this.selectAll == true ? 2 : this.multipleList.length == this.page.pageSize ? 1 : 0,
            optType: this.mainstoreForm.optType,
            mainOptType: this.mainstoreForm.mainOptType,
            mainStoreId: this.mainstoreForm.mainStoreId,
            listSign: "MemberProcessed",
            listSignId: this.storeId,
            sortField: "",
            phoneNameNick: this.phoneNameNick,
            memberListType: 2
          })
            .then(res => {
              this.$refs[formName].resetFields();
              this.storeName = "";
              if (res.data.errorCode === 0) {
                checkSuccess();
                this.getAjaxMembers();
                this.dialogMainstoreVisible = false;
                this.sortColName = "";
                this.sortType = "desc";
                this.phoneNameCard = "";
              } else {
                checkFalse(res.data.message);
                this.dialogMainstoreVisible = false;
                return false;
              }
            })
            .then(() => {
              setTimeout(() => {
                this.getProcessList();
              }, 30);
            })
            .catch(err => {
              checkStatus(err);
              this.dialogMainstoreVisible = false;
              this.$refs[formName].resetFields();
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    handleStore() {
      if (this.mainstoreForm.mainOptType == 4) {
        this.showStoreDialog = true;
      }
      if (this.mainstoreForm.mainOptType !== 4) {
        this.mainstoreForm.mainStoreId = "";
        this.storeName = "";
      }
    },
    changeStore() {
      this.showStoreDialog = true;
    },
    selectStore(val) {
      if (Object.keys(val).length > 0) {
        // 主门店
        if (this.batchValue == "mainstore") {
          this.mainstoreForm.mainStoreId = val.storeId;
          this.storeName = val.storeName;
          this.mainstoreForm.mainOptType = 4;
        }
        // 协管门店
        if (this.batchValue == "store") {
          if (this.storeForm.subOptType === 1) {
            this.storeForm.addSubStoreId = val.storeId;
            this.storeForm.addSubStoreName = val.storeName;
          }
          if (this.storeForm.subOptType === 2) {
            this.storeForm.modefiySubStoreId = val.storeId;
            this.storeForm.modefiySubStoreName = val.storeName;
          }
        }
      }
      this.showStoreDialog = false;
    },
    // 会员等级批量修改
    submitGrade(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let memberIdsArr = [];
          if (this.multipleList.length > 0) {
            this.multipleList.forEach(item => {
              memberIdsArr.push(item.memberId);
            });
          } else {
            checkFalse("会员不能为空");
            return false;
          }
          doFetch(url.updateGrade, {
            memberIds: this.selectAll == true ? "-1" : memberIdsArr.join(","),
            remark: this.gradeForm.remark,
            gradeId: this.gradeForm.gradeId,
            isCurrent: this.selectAll == true ? 2 : this.multipleList.length == this.page.pageSize ? 1 : 0,
            memberSearchParamStr: this.selectAll == true ? this.memberSearchStr ? this.memberSearchStr : "-1" : "",
            phoneNameCard: this.phoneNameCard
          })
            .then(res => {
              this.$refs[formName].resetFields();
              if (res.data.errorCode === 0) {
                checkSuccess();
                this.dialogGradeVisible = false;
              } else {
                checkFalse(res.data.message);
                this.dialogGradeVisible = false;
                return false;
              }
            })
            .then(() => {
              setTimeout(() => {
                this.getProcessList();
              }, 30);
            })
            .catch(err => {
              checkStatus(err);
              this.dialogGradeVisible = false;
              this.$refs[formName].resetFields();
            });
        } else {
          return false;
        }
      });
    },
    getGradeList() {
      doFetch(url.gradeList)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.memberGrade = res.data.result;
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    closeGrade(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    getEnterpriseInfo() {
      doFetch(url.enterpriseInfo)
        .then(res => {
          if (res.data.errorCode == 0) {
            this.integralFlag = res.data.result.enterpriseInfo.integralFlag;
          } else {
            checkFalse();
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    closeIntegral(formName) {
      this.IntegralForm.settlementStoreId = "";
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    submitIntegral(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let memberIdsArr = [];
          if (this.multipleList.length > 0) {
            this.multipleList.forEach(item => {
              memberIdsArr.push(item.memberId);
            });
          } else {
            checkFalse("会员不能为空");
            return false;
          }
          doFetch(url.updateIntegrals, {
            memberIds: this.selectAll == true ? "-1" : memberIdsArr.join(","),
            remark: this.IntegralForm.remark,
            accumulatPoints: this.IntegralForm.accumulatPoints,
            editType: this.IntegralForm.editType,
            settlementStoreId: this.IntegralForm.settlementStoreId,
            isCurrent: this.selectAll == true ? 2 : this.multipleList.length == this.page.pageSize ? 1 : 0,
            memberSearchParamStr: this.selectAll == true ? this.memberSearchStr ? this.memberSearchStr : "-1" : "",
            phoneNameCard: this.phoneNameCard
          })
            .then(res => {
              if (this.$refs[formName]) {
                this.$refs[formName].resetFields();
              }
              if (res.data.errorCode === 0) {
                checkSuccess();
                return true;
              } else {
                checkFalse();
                return false;
              }
            })
            .then(res => {
              this.IntegralForm.settlementStoreId = "";
              this.dialogIntegralVisible = false;
              if (res) {
                setTimeout(() => {
                  this.getProcessList();
                }, 30);
              }
            })
            .catch(err => {
              checkStatus(err);
              this.dialogIntegralVisible = false;
              this.$refs[formName].resetFields();
            });
        } else {
          return false;
        }
      });
    },
    handleKeyup(val) {
      this.getStoreCodeName(val);
    },
    getStoreCodeName(val) {
      doFetchqs(url.storeCodeName, {
        searchParam: val,
        flag: 1
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.storeList = res.data.result;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    handleMainStore() {
      if (this.multipleList.length < 1) {
        this.batchValue = "";
        checkFalse("请勾选会员");
        return false;
      }
      this.dialogMainstoreVisible = true;
      if (this.$refs.mainstoreForm) {
        this.$refs.mainstoreForm.resetFields();
      }
      this.storeName = "";
    },

    handleVisibleBatch() {
      if (this.multipleList.length < 1) {
        this.batchValue = "";
        checkFalse("请勾选会员");
        return false;
      }
      // 批量处理修改主门店
      if (this.batchValue == "mainstore") {
        this.dialogMainstoreVisible = true;
        if (this.$refs.mainstoreForm) {
          this.$refs.mainstoreForm.resetFields();
        }
        this.storeName = "";
      }
      // 批量处理修改协管门店
      if (this.batchValue == "store") {
        this.dialogSubStoreVisible = true;
        if (this.$refs.storeForm) {
          this.$refs.storeForm.resetFields();
        }
        this.getSubStoreList();
      }
    },
    handleFocusBatch() {
      if (this.multipleList.length < 1) {
        this.batchValue = "";
        checkFalse("请勾选会员");
        return false;
      }
    },
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
    handleCurrentChange(val) {
      this.page.currentPage = val;
      sessionStorage.setItem("currentPage", val);
      this.getAjaxMembers();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getAjaxMembers();
    },
    sortChange(column, prop, order) {
      this.sortColName = column.prop;
      if (column.order === "descending") {
        this.sortType = "desc";
      }
      if (column.order === "ascending") {
        this.sortType = "asc";
      }
      this.getAjaxMembers();
    },
    submitFields() {
      let fields = "";
      if (this.checkedFields.length > 0) {
        fields = this.checkedFields.join(",");
      }
      doFetch(url.updateFields, {
        pageName: this.pageName,
        fields: fields
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            checkSuccess();
            this.memberData = [];
            this.fieldsStr = [];
            this.getAjaxMembers();
          } else {
            checkFalse(res.data.message);
          }
          this.dialogFieldVisible = false;
        })
        .catch(err => {
          checkStatus(err);
          this.dialogFieldVisible = false;
        });
    },
    handleMemberFields() {
      this.dialogFieldVisible = true;
      this.checkedFields = [];
      this.memberFields = [];
      showFields = [];
      this.getFindMemberFields();
    },
    getFindMemberFields() {
      doFetch(url.findMemberFields, {
        pageName: this.pageName
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            let tempArr = res.data.result;
            showFields = tempArr;
            tempArr.forEach(item => {
              if (item.check) {
                this.checkedFields.push(item.code);
              }
              this.memberFields.push(item.code);
            });
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getAjaxMembers() {
      doFetch(url.getReturnMember, {
        storeId: this.storeId,
        listSign: "MemberProcessed",
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        phoneNameNick: this.phoneNameNick,
        memberListType: 2
      })
        .then(res => {
          this.load = true;
          if (res.data.errorCode === 0) {
            this.load = false;
            if (res.data.result.page.result) {
              this.memberData = res.data.result.page.result.map(ele => ({
                ...ele,
                 avgNumber: ele.avgNumber.toFixed(2),
                lastCostTime:
                  ele.lastCostTime != -1
                    ? formatLongTime(ele.lastCostTime, 2)
                    : "--", // 最近消费时间
                createTime:
                  ele.createTime != -1
                    ? formatLongTime(ele.createTime, 2)
                    : "--", // 新增时间
                attentionDate:
                  ele.attentionDate != -1
                    ? formatLongTime(ele.attentionDate, 2)
                    : "--", // 关注时间
                cancelAttentionTime:
                  ele.cancelAttentionTime != -1
                    ? formatLongTime(ele.cancelAttentionTime, 2)
                    : "--", // 取关时间
                attentionTime:
                  ele.attentionTime != -1
                    ? formatLongTime(ele.attentionTime, 2)
                    : "--", // 关注时间
                crateCardDateString:
                  ele.crateCardDateString != -1
                    ? formatLongTime(ele.crateCardDateString, 1)
                    : "--", // 开卡
                birthdayMD:
                  ele.birthdayMD != 0 ? paddingBorth(ele.birthdayMD) : "--", // 生日补全
                sex: ele.sex == 0 ? "性别未知" : ele.sex == 1 ? "男" : "女",
                age: !!ele.age ? ele.age : "年龄未知",
                cardNo: !!ele.cardNo ? ele.cardNo : "无会员卡",
                mainStoreName: !!ele.mainStoreName
                  ? ele.mainStoreName
                  : "主门店未知",
                thirdImgUrl: ele.thirdImgUrl
                  ? ele.thirdImgUrl
                  : this.storeImageUrl
              }));
              this.page.currentPage = res.data.result.page.currentPage;
              this.page.totalCount = res.data.result.page.totalCount;
            } else {
              this.memberData = [];
              this.page.totalCount = 0;
              this.page.currentPage = 0;
            }
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleList = val;
    },
    handleSearch(event) {
      this.phoneNameCard = event.target.value;
      this.page.currentPage = 1;
      this.getAjaxMembers();
    },
    initialize() {
      this.phoneNameCard = !!sessionStorage.getItem("phoneNameCard")
        ? sessionStorage.getItem("phoneNameCard")
        : "";
      this.page.currentPage = !!sessionStorage.getItem("currentPage")
        ? sessionStorage.getItem("currentPage")
        : 1;
    }
  },
  created() {
    if (!this.storeImageUrl) {
      this.$store.dispatch("getStorePicture");
    }
    this.getProcessList();
    this.initialize();
    this.$store.commit("mutations-slide", false);
  },
  beforeMount() {
    this.getAjaxMembers();
  },
  mounted() {
    //  console.log(this.toggleTag);
  },
  components: {
    searchinput,
    Navbar,
    NavPath
  }
};
