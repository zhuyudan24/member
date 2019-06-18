import nav from "../../common/navbar/navbar.vue";
import { doFetch, doFetchqs } from "../../components/axios/api";
import url from "../../components/axios/url";
import {
  checkFalse,
  checkStatus,
  checkSuccess
} from "../../../static/js/checkStatus";
import { fomatBirthday } from "../../utils/fomatBirthday";
import { formatLongTime } from "@/utils/utils";
import { mapState } from "vuex";

export default {
  name: "wechatmember-detail",
  data() {
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入号码"));
      } else {
        if (!this.baseForm.nationCode) {
          this.baseForm.nationCode = "86";
          if (!/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
            callback(new Error("请输入正确号码"));
          }
        }
        if (this.baseForm.nationCode) {
          if (this.baseForm.nationCode == "86") {
            if (!/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
              callback(new Error("请输入正确号码"));
            }
          } else {
            if (!/^(\d{1,11})$/.test(value)) {
              callback(new Error("请输入正确号码"));
            }
          }
        }
        callback();
      }
    };
    return {
      showClique: false,
      memberId: this.$route.query.memberId || "",
      navpath: [
        {
          name: "首页",
          path: ""
        },
        {
          name: '微信会员',
          path: "/wechatmembers"
        },
        {
          name: "会员详情",
          path: ""
        }
      ],
      pageName: 'wxOpenCarMember',
      addresspage: {
        currentPage: 1,
        pageSize: 3,
        totalCount: 0
      },
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      tabStatus: false,
      addressData: [],
      labelTagactive: 1,
      memberInfo: {
        memberId: "",
        thirdImgUrl: "",
        accumulatPoints: null,
        storedValue: "",
        couponCount: null,
        cardNum: "",
        cardNumOfClique: "",
        authTime: "",
        gradeName: "",
        gradeId: "",
        limitTime: "",
        cardGivingTime: "",
        openCardChannelDict: "",
        openCardChannel: "",
        numOfSale: 0,
        wechatMallNum: 0,
        numOfEcommerce: 0,
        collectionCount: 0,
        purchaseCount: 0,
        subscribeCount: 0,
        numOfChat: 0,
        numOfTel: 0,
        numOfMarket: 0
      },
      memberbaseinfo: {
        status: 1,
        wxStatus: 0,
        attentionTime: "",
        attentionChannelDict: "",
        cancelAttentionTime: "",
        createTime: "",
        wxCannel: "",
        thirdNickname: "",
        memberName: "",
        memberGender: "",
        memberBirthday: "",
        birthType: '',
        birthTypeStr: '',
        memberMainStoreArea: "",
        phoneNumber: "",
        unsubscribe: "",
        mainStoreName: "",
        mainClerkName: "",
        shopNames: "",
        storeId: "",
        storeName: ""
      },
      dilogGradeVisible: false,
      gradeForm: {
        gradeId: "",
        remark: ""
      },
      graderules: {
        gradeId: [{ required: true, message: "请选择等级", trigger: "change" }],
        remark: [
          { required: true, message: "请输入原因备注", trigger: "change" }
        ]
      },
      memberGrade: [],
      baseForm: {
        memberName: "",
        memberGender: 0,
        memberBirthday: "",
        birthType: '',
        memberMainStoreArea: "",
        remark: "",
        // mainStoreId: "",
        // mainStoreName: "",
        // storeIds: "",
        // subStoreIdsBak: "",
        phoneNumber: "",
        nationCode: 86
      },
      nationCodeList: [],
      // storeIds: [],
      storeList: [],
      dilogBaseVisible: false,
      mainstoreList: [],
      loading: false,
      // 修改会员服务门店相关
      updateMainStore: {
        show: false,
        mainStoreId: '',
        remark: ''
      },
      // 修改会员协管门店相关
      updateSubStores: {
        show: false,
        storeIds: [],
        remark: ''
      },
      // 这一块的数据真是乱七八糟 都搞不清谁是谁
      // 请以后写好注释 完全不想看
      systemTags: null,
      tagsList: [],
      fieldList: [],
      remarkList: [],
      isGrilClothes: 0,
      figureInfo: null,
      baseinfoheight: null,
      baseinfoweight: null,
      openChildrenField: null,
      openField: null,
      dictFigureList: null,
      dilogTagVisible: false,
      curTagsList: [],
      dilogRemarkVisible: false,
      formRemark: {
        remark: "",
        memberRemarkId: ""
      },
      rules2: {
        memberName: [{ required: true, message: "会员姓名不能为空" }],
        memberBirthday: [{ required: true, message: "生日日期不能为空" }],
        phoneNumber: [{ validator: validateTel, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["storeImageUrl"])
  },
  filters: {
    limitText: val => {
      if (val) {
        if (val.length > 4) {
          val = val.substring(0, 4) + "...";
        }
      }
      return val;
    },
    fomatNumber: val => {
      if (val != -1) {
        return val;
      } else {
        return "--";
      }
    }
  },
  methods: {
    // 修改主门店（修改服务门店）
    handleUpdateMainStore() {
      if (!this.updateMainStore.mainStoreId) {
        checkFalse("服务门店不能为空");
        return false;
      }
      if (!this.updateMainStore.remark) {
        checkFalse("备注不能为空");
        return false;
      }
      const shopNames = this.memberbaseinfo.shopNames || [];
      const params = {
        memberId: this.memberbaseinfo.memberId,
        optType: 1,
        mainStoreIdBak: this.memberbaseinfo.mainStoreId,
        mainStoreId: this.updateMainStore.mainStoreId,
        remark: this.updateMainStore.remark,
        storeIds: shopNames.map(item => item.storeId).join(',')
      }
      doFetch(url.updateMemberStore, params).then(res => {
        this.updateMainStore.show = false;
        this.updateMainStore.remark = '';
        this.updateMainStore.storeIds = '';
        setTimeout(this.getBaseDetail, 500)
      }).catch(err => {
        console.log(err);
      })
    },
    // 修改协管门店
    handleUpdateSubStore() {
      if (!this.updateSubStores.storeIds.length > 0) {
        checkFalse("协管门店不能为空");
        return false;
      }
      if (!this.updateSubStores.remark) {
        checkFalse("备注不能为空");
        return false;
      }
      const shopNames = this.memberbaseinfo.shopNames || [];
      const params = {
        memberId: this.memberbaseinfo.memberId,
        optType: 2,
        mainStoreId: this.memberbaseinfo.mainStoreId,
        // 修改之前的协管门店id
        subStoreIdsBak: shopNames.map(item => item.storeId).join(','),
        remark: this.updateSubStores.remark,
        storeIds: this.updateSubStores.storeIds.join(',')
      }
      doFetch(url.updateMemberStore, params).then(res => {
        this.updateSubStores.show = false;
        this.updateSubStores.remark = '';
        this.updateSubStores.storeIds = [];
        setTimeout(this.getBaseDetail, 500)
      }).catch(err => {
        console.log(err);
      })
    },
    // 集团配置
    getEnterpriseInfo() {
      doFetchqs(url.enterpriseInfo).then(res => {
        if (res.data.errorCode === 0) {
          this.showClique = res.data.result.enterpriseInfo.showClique;
        }
      });
    },
    handlerUpdateRemark() {
      doFetch(url.updateRemark, {
        memberId: this.memberId,
        remark: this.formRemark.remark,
        memberRemarkId: this.formRemark.memberRemarkId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            return true;
          } else {
            return false;
          }
        })
        .then(res => {
          if (res) {
            checkSuccess();
            this.getExtendInfo();
          } else {
            checkFalse();
          }
          this.dilogRemarkVisible = false;
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    // 切换选中
    changeCheck(list, item) {
       let count = 0;
       this.$nextTick(_ => {
         // 站位
       });
       for(let i = 0; i < list.checkBox.length; i++) {
         let val = list.checkBox[i];
         for (let j = 0; j < list.subTags.length; j++) {
           if (val == list.subTags[j].tagsName) {
             list.subTags[j].isCheck = 1;
             count++;
           }
         }
       }
       // 是否都选中了
       if (count == list.subTags.length) {
         list.isCheck = 1;
       }
    },
    // 提交编辑导购标签
    updateClerkTags() {
      let tagIds;
      tagIds = tagIds ? (tagIds.length ? (tagIds.length = 0) : tagIds) : [];

      // 循环对比tagsName 是否在勾选框内部
      this.curTagsList.forEach(ele => {
        ele.subTags.forEach(list => {
          if (ele.checkBox.indexOf(list.tagsName) > -1) {
            tagIds.push(list.tagsId);
          }
        });
      });

      let curtagIds = null;
      if (tagIds.length > 0) {
        curtagIds = tagIds.join(",");
      }

      if (!curtagIds) {
        this.$message.warning("至少选择一个手工标签！");
        return;
      }
      doFetch(url.updateClerkTags, {
        memberId: this.memberId,
        tagIds: curtagIds
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            checkSuccess();
            this.tagsList = res.data.result.tagsList;
          } else {
            checkFalse(res.data.message);
          }
        })
        .then(() => {
          this.dilogTagVisible = false;
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    editTags() {
      this.getTagList();
      this.dilogTagVisible = true;
    },
    getTagList() {
      doFetch(url.clerkTags, {
        memberId: this.memberId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            let tempList = res.data.result.tagsList;
            console.log(tempList);
            if (tempList) {
              let paranttag = tempList.filter(item => {
                return item.parentTagsId == null;
              });
              paranttag.forEach(item => {
                let subTags = [];
                tempList.forEach(list => {
                  if (item.tagsId == list.parentTagsId) {
                    subTags.push(list);
                  }
                });
                item.subTags = subTags;
              });
              // 编辑导购标签组
              this.curTagsList = paranttag.map(ele => ({
                ...ele,
                checkBox: ele.subTags.reduce((res, item) => {
                  if (item.isCheck) {
                    res.push(item.tagsName);
                  }
                  return res;
                }, [])
              }));
            }
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    closeRemark() {
      this.formRemark.remark = "";
      this.$refs.formRemark.resetFields();
    },
    editRemark(item) {
      this.formRemark.remark = item.remark;
      this.formRemark.memberRemarkId = item.memberRemarkId;
      this.dilogRemarkVisible = true;
    },
    linkRoute(route) {
      this.$router.push({ path: route, query: { memberId: this.memberId } });
    },
    // 更新头像
    updateImgUrl() {
      doFetch(url.updateImgUrl, {
        memberId: this.memberId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            checkSuccess();
            const ret = res.data.result;
            this.memberInfo.thirdImgUrl = !!ret.thirdImgUrl
              ? ret.thirdImgUrl
              : this.storeImageUrl;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    closeDilogBase() {
      this.$refs.baseForm.resetFields();
    },
    getcodeList() {
      doFetch(url.codeList)
        .then(res => {
          if (res.data.errorCode === 0) {
            this.nationCodeList = res.data.result.nationCodeList;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    submitBaseInfo(formName) {
      if (!this.baseForm.memberName) {
        checkFalse("姓名不能为空");
        return false;
      }
      if (!this.baseForm.memberBirthday) {
        checkFalse("生日不能为空");
        return false;
      }
      if (!this.baseForm.phoneNumber) {
        checkFalse("手机号码不能为空");
        return false;
      }
      if (!this.baseForm.remark) {
        checkFalse("备注不能为空");
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let storeIds = "";
          // if (this.storeIds && this.storeIds.length > 0) {
          //   storeIds = this.storeIds.join(",");
          // }
          // let subStoreIdsBak = "";
          // if (
          //   this.baseForm.subStoreIdsBak &&
          //   this.baseForm.subStoreIdsBak.length > 0
          // ) {
          //   subStoreIdsBak = this.baseForm.subStoreIdsBak.join(",");
          // }
          let params = {
            memberId: this.memberId,
            memberName: this.baseForm.memberName,
            memberGender: this.baseForm.memberGender,
            memberBirthday: fomatBirthday(this.baseForm.memberBirthday),
            birthType: this.baseForm.birthType === '' ? 1 : this.baseForm.birthType,
            //  memberMainStoreArea: this.baseForm.memberMainStoreArea,
            remark: this.baseForm.remark,
            // mainStoreId: this.baseForm.mainStoreId,
            // storeIds: storeIds,
            // subStoreIdsBak: subStoreIdsBak,
            phoneNumber: this.baseForm.phoneNumber,
            nationCode: this.baseForm.nationCode
          };
          doFetch(url.updateBaseDetail, params)
            .then(res => {
              this.$refs[formName].resetFields();
              if (res.data.errorCode === 0) {
                checkSuccess();
                this.dilogBaseVisible = false;
                return true;
              } else {
                checkFalse(res.data.message);
                return false;
              }
            })
            .then(res => {
              this.dilogBaseVisible = false;
              if (res) {
                setTimeout(() => {
                  this.getBaseDetail();
                }, 3000);
              }
            })
            .catch(err => {
              checkStatus(err);
              this.dialogSubStoreVisible = false;
              this.$refs[formName].resetFields();
            });
        } else {
          return false;
        }
      });
    },
     handleStoreKeyup(val) {
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
    handleKeyup(val) {
      this.getMainStoreCodeName(val);
    },
    getMainStoreCodeName(val) {
      doFetchqs(url.storeCodeName, {
        searchParam: val,
        flag: 1
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.mainstoreList = res.data.result;
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    // 删除导购备注
    deleteRemark(obj) {
      this.memberRemarkId = obj.memberRemarkId;
      doFetch("/api-member/member-load-delete-remark", {
        memberRemarkId: this.memberRemarkId
      }).then(res => {
        if (res.data.errorCode === 0) {
          checkSuccess();
          this.getExtendInfo();
        }
      });
    },
    eidtBaseInfo() {
      this.dilogBaseVisible = true;
      this.getcodeList();
      this.baseForm = {
        memberName: this.memberbaseinfo.memberName,
        memberGender: this.memberbaseinfo.memberGender,
        memberBirthday: this.memberbaseinfo.memberBirthday,
        birthType: this.memberbaseinfo.birthType,
        memberMainStoreArea: this.memberbaseinfo.memberMainStoreArea,
        remark: this.memberbaseinfo.remark,
        // mainStoreId: this.memberbaseinfo.mainStoreId,
        // mainStoreName: this.memberbaseinfo.mainStoreName,
        phoneNumber: this.memberbaseinfo.phoneNumber,
        nationCode: this.memberbaseinfo.nationCode
      };
      // if (this.memberbaseinfo.mainStoreId) {
      //   this.mainstoreList = [
      //     {
      //       storeId: this.memberbaseinfo.mainStoreId,
      //       storeName: this.memberbaseinfo.mainStoreName
      //     }
      //   ];
      // }
      // if (
      //   this.memberbaseinfo.shopNames &&
      //   this.memberbaseinfo.shopNames.length > 0
      // ) {
      //   this.storeList = this.memberbaseinfo.shopNames;
      //   let storeIds = this.memberbaseinfo.shopNames.map(item => {
      //     return item.storeId;
      //   });
      //   this.storeIds = storeIds;
      //   this.baseForm.subStoreIdsBak = JSON.parse(JSON.stringify(storeIds));
      // }
    },
    submitGrade(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          doFetch(url.memberGrade, {
            memberId: this.memberInfo.memberId,
            remark: this.gradeForm.remark,
            gradeId: this.gradeForm.gradeId
          })
            .then(res => {
              this.$refs[formName].resetFields();
              if (res.data.errorCode === 0) {
                this.getDetail(this.memberId);
                checkSuccess();
                return true;
              } else {
                checkFalse(res.data.message);
                return false;
              }
            })
            .then(res => {
              this.dilogGradeVisible = false;
              if (res) {
                setTimeout(() => {
                  this.getDetail();
                  this.getLogPage();
                }, 2000);
              }
            })
            .catch(err => {
              checkStatus(err);
              this.dilogGradeVisible = false;
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
    cancleGrade() {
      this.$refs.gradeForm.resetFields();
    },
    handlerGrade() {
      this.getGradeList();
      this.gradeForm.gradeId = this.memberInfo.gradeId;
      this.dilogGradeVisible = true;
    },
    cardDetail(memberId) {
      this.$router.push({
        path: "/cardvoucher",
        query: { memberId: memberId }
      });
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getLogPage();
    },
    handleAddressCurrentChange(val) {
      this.addresspage.currentPage = val;
      this.getAddressPage();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getLogPage();
    },
    getDetail() {
      doFetch(url.memberDetail, {
        memberId: this.memberId,
        pageName: this.pageName
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            const ret = res.data.result;
            this.memberInfo = ret.memberInfo;
            this.memberInfo.thirdImgUrl = ret.memberInfo.thirdImgUrl
              ? ret.memberInfo.thirdImgUrl
              : this.storeImageUrl;
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
      this.$router.push({ path: "/wechatmembers" });
    },
    getAddressPage() {
      doFetch(url.addressPage, {
        memberId: this.memberId,
        pageSize: this.addresspage.pageSize,
        currentPage: this.addresspage.currentPage
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.addressData = res.data.result.page.result;
            this.addresspage.currentPage = res.data.result.page.currentPage;
            this.addresspage.totalCount = res.data.result.page.totalCount;
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getExtendInfo() {
      doFetch(url.extendInfo, {
        memberId: this.memberId
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            const data = res.data.result;

            this.systemTags = res.data.result.systemTags || [];
            this.tagsList = res.data.result.tagsList || [];

            // 导购备注信息
            if (data.remarkList && data.remarkList.length) {
              this.remarkList = data.remarkList;
              this.remarkList = this.remarkList.map(ele => ({
                ...ele,
                createTime:
                  ele.createTime != -1
                    ? formatLongTime(ele.createTime, 1)
                    : "--"
              }));
            } else {
              this.remarkList = [];
            }

            this.openField = res.data.result.openField || [];
            this.fieldList = res.data.result.fieldList || [];
            this.isGrilClothes = res.data.result.isGrilClothes;
            this.figureInfo = res.data.result.figureInfo;

            if (data.figureInfo) {
              this.baseinfoheight = data.figureInfo.baseinfo[0] || "--";
              this.baseinfoweight = data.figureInfo.baseinfo[1] || "--";
            }

            this.dictFigureList = res.data.result.dictFigureList || [];
            this.openChildrenField = res.data.result.openChildrenField || [];
            this.openField = res.data.result.openField;
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getBaseDetail() {
      doFetch(url.baseDetail, {
        memberId: this.memberId,
        pageName: this.pageName
      })
        .then(res => {
          let { data } = res;
          data = data || {};
          let { errorCode, result } = data;
          result = result || {};
          let { member } = result;
          member = member || {};
          if (errorCode === 0) {
            this.memberbaseinfo = member;
            this.updateMainStore.mainStoreId = member.mainStoreId;
            this.mainstoreList = [
              {
                storeId: member.mainStoreId,
                storeName: member.mainStoreName
              }
            ]
            this.updateSubStores.storeIds = member.shopNames.map(item => item.storeId);
            this.storeList = member.shopNames.slice(0);
            switch (this.memberbaseinfo.birthType) {
              case 1:
                this.memberbaseinfo.birthTypeStr = '(阳历)';
                break;
              case 0:
                this.memberbaseinfo.birthTypeStr = '(农历)';
                break;
              default:
                this.memberbaseinfo.birthTypeStr = '';
                break;
            }
          } else {
            checkFalse(res.data.message);
            return false;
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    },
    getLogPage() {
      doFetch(url.logPage, {
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage
      })
        .then(res => {
          if (res.data.errorCode === 0) {
            this.memberData = res.data.result.page.result;
            this.page.currentPage = res.data.result.page.currentPage;
            this.page.totalCount = res.data.result.page.totalCount;
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
  created() {
    if (!this.storeImageUrl) {
      this.$store.dispatch("getStorePicture");
    }
    this.$store.commit("mutations-slide", false);
    const fromPage = this.$route.query.fromPage;
    if (fromPage === "memberGroup") {
      this.navpath[1].name = "会员标签分组";
    }
  },
  beforeMount() {
    if (this.memberId) {
      this.getDetail(this.memberId);
      this.getAddressPage();
      this.getExtendInfo();
      this.getBaseDetail();
      this.getLogPage();
      this.getEnterpriseInfo();
    }
  },
  components: {
    "v-nav": nav
  }
};
