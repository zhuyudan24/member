import nav from '../../common/navbar/navbar.vue'
import { doFetch, doFetchqs } from "../../components/axios/api";
import url from '../../components/axios/url'
import {checkFalse, checkStatus, checkSuccess} from "../../../static/js/checkStatus";
import { fomatBirthday } from '../../utils/fomatBirthday'
import { formatLongTime } from '@/utils/utils';
import searchinput from 'common/searchinput'
export default {
  name: "posmemberDetail",
  data() {
    let validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入号码'));
      } else {
        if (!this.posForm.nationCode) {
          this.posForm.nationCode = '86';
          if(!(/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value))) {
            callback(new Error('请输入正确号码'));
          }
        }
        if (this.posForm.nationCode) {
          if(this.posForm.nationCode == '86') {
            if(!(/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value))) {
              callback(new Error('请输入正确号码'));
            }
          }else {
            if(!(/^(\d{1,11})$/.test(value))) {
              callback(new Error('请输入正确号码'));
            }
          }
        }
        callback();
      }
    };
    return {
      showClique: false,
      memberId: this.$route.query.memberId || '',
      navpath: [
        {
          name: '首页',
          path: ''
        },
        {
          name: 'POS会员',
          path: '/posmembers'
        },
        {
          name: '会员详情',
          path: ''
        }
      ],
      memberInfo: {
        costFee: 0,
        costTimes: 0,
        lastCostTime: '',
        avgCost: 0,
        relatedPercent: 0,
        avgGoodsCost: 0,
        highCost: 0,
        costCategoryCount: 0,
        avgDiscount: 0,
        highCostPaid: 0,
        costFeePaid: 0
      },
      orderType: -1,
      evaluateStatus: -1,
      searchInfo: '',
      page: {
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      },
      memberData: [],
      dialogOrderVisible: false,
      orderData: [],
      orderInfo: '',
      payInfo: [],
      posMemberInfo: {
        cardNum: '',
        gradeId: '',
        gradeName: '',
        limitTime: '',
        storeName: '',
        cardGivingTime: '',
        memberName: '',
        memberGender: '',
        memberBirthday: '',
        birthType: '',
        birthTypeStr: '',
        phoneNumber: '',
        unsubscribe: '',
        cliqueCardNo: '',
        cliqueGradeName: '',
        cliqueMemberIntegral: ''
      },
      dialogGradeVisible: false,
      gradeForm: {
        gradeId: '',
        remark: ''
      },
      graderules: {
        gradeId: [
          {required: true, message: '请选择等级', trigger: 'change'}
        ],
        remark: [
          {required: true, message: '请输入原因备注', trigger: 'change'}
        ]
      },
      memberGrade: [],
      dialogEidtVisible: false,
      updateStatus: null,
      updateTitle: '',
      posForm: {
        memberName: '',
        memberGender: '',
        memberBirthday: '',
        birthType: '',
        phoneNumber: '',
        nationCode: '',
        remark: ''
      },
      nationCodeList: [],
      posRules: {
        memberName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        memberGender: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        memberBirthday: [
          { required: true, message: '请输入出生日期', trigger: 'change' }
        ],
        phoneNumber: [
          {  required: true,validator: validateTel, trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入原因备注', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
    defaultImg: val => {
      if(!val) return './static/img/default.png';
    },
    formatColorSize: val => {
      let temp = '';
      if(val) {
        let oldval = JSON.parse(val);
        let nowval = oldval.map(item => {
          return `${item.key}: ${item.value}`
        })
        temp = nowval[0];
      } else {
        temp = '--';
      }
      return temp;
    },
    formatGender: val => {
      let temp = '';
      if(val) {
        temp = val == 0 ? '未知': val == 1 ? '男': val == 2 ? '女': '';
      }
      return temp
    }
  },
  methods: {
    // 集团配置
    getEnterpriseInfo() {
      doFetchqs(url.enterpriseInfo).then(res => {
        if (res.data.errorCode === 0) {
          this.showClique = res.data.result.enterpriseInfo.showClique;
            console.log(this.showClique);
        }
      });
    },
    submitGrade(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          doFetch(url.memberGrade,{
            memberId: this.memberId,
            remark: this.gradeForm.remark,
            gradeId: this.gradeForm.gradeId,
          }).then(res => {
            this.$refs[formName].resetFields();
            if(res.data.errorCode === 0) {
              checkSuccess('提交成功，结果处理中...');
              return true;
            }else {
              checkFalse(res.data.message);
              return false;
            }
          }).then(res => {
            this.dialogGradeVisible = false;
            if(res) {
              setTimeout(() => {
                this.getPosInfo();
              },2000);
            }
          }).catch(err => {
            checkStatus(err);
            this.dialogGradeVisible = false;
            this.$refs[formName].resetFields();
          })
        }else {
          return false;
        }
      });
    },
    getGradeList() {
      doFetch(url.gradeList).then(res => {
        if(res.data.errorCode === 0) {
          this.memberGrade = res.data.result;
        }else {
          checkFalse(res.data.message);
          return false;
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    cancleGrade() {
      this.$refs.gradeForm.resetFields();
    },
    handlerGrade() {
      this.getGradeList();
      this.gradeForm.gradeId = this.posMemberInfo.gradeId;
      this.dialogGradeVisible = true;
    },
    getcodeList() {
      doFetch(url.codeList).then(res => {
        if(res.data.errorCode === 0) {
          this.nationCodeList = res.data.result.nationCodeList;
        }else {
          checkFalse(res.data.message);
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    closePos(formName) {
      if(this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    submitPosBaseDetail(formName) {
      let params = '';
      if(this.updateStatus == 1) {
        if(!this.posForm.memberName) {
          checkFalse('会员名称不能为空');
          return false;
        }
        params = {
          memberId: this.memberId,
          updateStatus: this.updateStatus,
          memberName: this.posForm.memberName,
          remark: this.posForm.remark
        }
      }
      if(this.updateStatus == 2) {
        if(!this.posForm.memberGender) {
          checkFalse('请选择性别');
          return false;
        }
        params = {
          memberId: this.memberId,
          updateStatus: this.updateStatus,
          memberGender: this.posForm.memberGender,
          remark: this.posForm.remark
        }
      }
      if(this.updateStatus == 3) {
        if(!this.posForm.memberBirthday) {
          checkFalse('请选择出生日期');
          return false;
        }
        params = {
          memberId: this.memberId,
          updateStatus: this.updateStatus,
          memberBirthday: fomatBirthday(this.posForm.memberBirthday),
          birthType: this.posForm.birthType === '' ? 1 : this.posForm.birthType,
          remark: this.posForm.remark
        }
      }
      if(this.updateStatus == 4) {
        if(!this.posForm.phoneNumber) {
          checkFalse('请填写手机号');
          return false;
        }
        this.$refs[formName].validateField('phoneNumber',function (err) {
          if(err) {
            checkFalse('请填写正确手机号');
            return false;
          }
        });
        params = {
          memberId: this.memberId,
          updateStatus: this.updateStatus,
          phoneNumber: this.posForm.phoneNumber,
          nationCode: this.posForm.nationCode || '86',
          remark: this.posForm.remark
        }
      }
      if(!this.posForm.remark) {
        checkFalse('备注不能为空');
        return false;
      }
      doFetch(url.posBaseDetail,params).then(res => {
        if(res.data.errorCode == 0) {
          checkSuccess();
          return true;
        }else {
          checkFalse(res.data.message);
          return false;
        }
      }).then((res) => {
        if(res) {
          this.getPosInfo();
        }
        this.dialogEidtVisible = false;
        if(this.$refs[formName]) {
          this.$refs[formName].resetFields();
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    editGrade(updateStatus) {
      this.updateStatus = updateStatus;
      switch (updateStatus){
        case 1:
          this.posForm.memberName = this.posMemberInfo.memberName;
          this.updateTitle = '姓名';
          break;
        case 2:
          this.posForm.memberGender = this.posMemberInfo.memberGender;
          this.updateTitle = '性别';
          break;
        case 3:
          this.posForm.memberBirthday = this.posMemberInfo.memberBirthday;
          this.posForm.birthType = this.posMemberInfo.birthType;
          this.updateTitle = '出生日期';
          break;
        case 4:
          this.getcodeList();
          this.posForm.nationCode = this.posMemberInfo.nationCode || '86';
          this.posForm.phoneNumber = this.posMemberInfo.phoneNumber;
          this.updateTitle = '手机号码';
          break;
      }
      this.dialogEidtVisible = true;
    },
    getOrderDetail(orderId) {
      this.orderData = [];
      this.orderInfo = '';
      this.payInfo = [];
      doFetch(url.orderDetail,{
        memberId: this.memberId,
        orderId: orderId
      }).then(res => {
        if(res.data.errorCode === 0) {
          this.dialogOrderVisible = true;
          this.orderInfo = res.data.result.orderInfo;
          this.orderData = this.orderInfo.list;
          if(this.orderInfo.payInfo) {
            this.payInfo = JSON.parse(this.orderInfo.payInfo);
          }
        }else {
          checkFalse(res.data.message);
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    handleSearch() {
      this.page.currentPage = 1;
      this.getMemberOrderPage();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getMemberOrderPage();
    },
    handleSizeChange(val){
      this.page.pageSize = val;
      this.getMemberOrderPage();
    },
    getMemberOrderPage() {
      doFetch(url.memberOrderPage,{
        memberId: this.memberId,
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        orderType: this.orderType,
        evaluateStatus: this.evaluateStatus,
        searchInfo: this.searchInfo
      }).then(res => {
        if(res.data.errorCode === 0) {
          this.memberData = res.data.result.page.result && res.data.result.page.result.map(ele => ({
            ...ele,
            orderTime: ele.orderTime != -1 ? formatLongTime(ele.orderTime, 1) : '--'
          }));
          this.page.currentPage = res.data.result.page.currentPage;
          this.page.totalCount = res.data.result.page.totalCount;
        }else {
          checkFalse(res.data.message);
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    getAjaxMembersInfo() {
      doFetch(url.ajaxMembersInfo,{
        memberId: this.memberId
      }).then(res => {
        if(res.data.errorCode === 0) {
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
            avgDiscount: temp.avgDiscount,
            highCostPaid: temp.highCostPaid,
            costFeePaid: temp.costFeePaid
          }
        }else {
          checkFalse(res.data.message);
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    getPosInfo() {
      doFetch(url.posInfo,{
        memberId: this.memberId
      }).then(res => {
        if(res.data.errorCode === 0) {
          let temp = res.data.result.posMemberInfo;
          this.posMemberInfo = {
            cardNum: temp.cardNum,
            gradeId: temp.gradeId,
            gradeName: temp.gradeName,
            limitTime: temp.limitTime,
            storeName: temp.storeName,
            cardGivingTime: temp.cardGivingTime,
            memberName: temp.memberName,
            memberGender: temp.memberGender,
            memberBirthday: temp.memberBirthday,
            birthType: temp.birthType,
            phoneNumber: temp.phoneNumber,
            unsubscribe: temp.unsubscribe,
            storedValue: temp.storedValue,
            accumulatPoints: temp.accumulatPoints,
            cliqueCardNo: temp.cliqueCardNo,
            cliqueGradeName: temp.cliqueGradeName,
            cliqueMemberIntegral: temp.cliqueMemberIntegral
          }
          switch (this.posMemberInfo.birthType) {
            case 1:
              this.posMemberInfo.birthTypeStr = '(阳历)';
              break;
            case 0:
              this.posMemberInfo.birthTypeStr = '(农历)';
              break;
            default:
              this.posMemberInfo.birthTypeStr = '';
              break;
          }
        }else {
          checkFalse(res.data.message);
        }
      }).catch(err => {
        checkStatus(err);
      })
    },
    goback() {
      this.$router.push({ path: 'posmembers'})
    }
  },
  created() {
    if(this.memberId) {
      this.getAjaxMembersInfo();
      this.getMemberOrderPage();
      this.getPosInfo();
      this.$store.commit('mutations-slide',false);
      this.getEnterpriseInfo();
    }
    const fromPage = this.$route.query.fromPage;
    if (fromPage === 'memberGroup') {
      this.navpath[1].name = '会员标签分组';
    }
  },
  components: {
    'v-nav': nav,
    searchinput
  }
}
