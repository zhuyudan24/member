webpackJsonp([23],{"2Pr6":function(e,t){},"2jN/":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),i=a.n(r),n=a("BO1k"),s=a.n(n),c=a("WSiR"),d=a("AKaA"),o=a("NTL1"),m=a("8V46"),l=a("lRwf"),h=a.n(l),v={name:"achievement",data:function(){return{prizeflag:!1,switchValue:!1,rewardPrize:"",rewardNameFlag:!1,disabledList:[],navpath:[{name:"首页",path:""},{name:"会员成就",path:"/achievement"},{name:"消费类",path:""}],activeitem:1,tableData:[],isEdit:null,achievememntTypeList:[],achievememntTypeOneList:[],achievememntTypeTwoList:[],dilogRewardVisible:!1,rewardForm:{achievementEnterpriseRankId:null,achievementRewardType:1,rewardValue:null,rewardName:"",rewardReferId:null},showCardDialog:!1,projectName:"member",cardLimit:1,cardType:null}},filters:{formatStart:function(e){return!(!e||-1===e.indexOf("XX"))&&e.split("XX")[0]},formatEnd:function(e){return!(!e||-1===e.indexOf("XX"))&&e.split("XX")[1]}},methods:{changeValue:function(e){var t=this,a=e,r=e.isOpen?1:0,i=!0,n=!1,c=void 0;try{for(var l,h=s()(a.subAchievementList);!(i=(l=h.next()).done);i=!0){var v=l.value;if(2==v.achievementRewardType){if(-1==v.rewardReferId||!v.rewardReferId)return this.$message.warning("卡券奖励不存在"),void(e.isOpen=!1)}else if(1==v.achievementRewardType&&v.rewardValue<=0)return this.$message.warning("积分奖励不能小于0！"),void(e.isOpen=!1)}}catch(e){n=!0,c=e}finally{try{!i&&h.return&&h.return()}finally{if(n)throw c}}Object(d.a)(o.a.achievementOpen,{achievementSystemId:e.achievementSystemId,openStatus:r}).then(function(e){if(0!==e.data.errorCode)return Object(m.a)(e.data.message),!1;Object(m.c)(),t.getAchievementList()}).catch(function(e){Object(m.b)(e)})},submitRewardType:function(){var e=this;if(1!==this.rewardForm.achievementRewardType&&2!==this.rewardForm.achievementRewardType)return Object(m.a)("请选择奖励类型"),!1;if(1===this.rewardForm.achievementRewardType&&this.rewardForm.rewardValue<1)return Object(m.a)("积分奖励要大于0"),!1;if(2===this.rewardForm.achievementRewardType){if(!this.rewardForm.rewardName.trim())return Object(m.a)("请选择卡券"),!1;if(!this.rewardForm.rewardReferId)return Object(m.a)("卡券id不能为空"),!1}var t=null;1===this.rewardForm.achievementRewardType&&(t={achievementEnterpriseRankId:this.rewardForm.achievementEnterpriseRankId,updateType:2,achievementRewardType:this.rewardForm.achievementRewardType,rewardValue:this.rewardForm.rewardValue,rewardName:"积分"+this.rewardForm.rewardValue}),2===this.rewardForm.achievementRewardType&&(t={achievementEnterpriseRankId:this.rewardForm.achievementEnterpriseRankId,updateType:2,achievementRewardType:this.rewardForm.achievementRewardType,rewardName:this.rewardForm.rewardName,rewardReferId:this.rewardForm.rewardReferId}),Object(d.a)(o.a.achievementUpdate,t).then(function(t){0===t.data.errorCode?(Object(m.c)(),e.getAchievementList()):Object(m.a)(t.data.message),e.dilogRewardVisible=!1}).catch(function(t){Object(m.b)(t),e.dilogRewardVisible=!1})},selectCard:function(e){this.rewardForm.rewardName=e&&e.cardName?e.cardName:"",this.rewardPrize="重新选择",this.showCardDialog=!1,this.rewardForm.rewardReferId=e.coupCardId},selectRewardType:function(e){1===e&&(this.prizeflag||(this.rewardPrize="重新选择"),this.prizeflag=!0,this.rewardForm.achievementRewardType=e),2===e&&(this.rewardForm.achievementRewardType=e,this.rewardNameFlag=!0,this.prizeflag||(this.rewardPrize="选择卡券",this.prizeflag=!0))},chooseCard:function(){this.showCardDialog=!0},closeDilog:function(){this.prizeflag=!1},eidtRewardValue:function(e){this.rewardForm.rewardValue=null,this.rewardForm.achievementRewardType=null,this.dilogRewardVisible=!0,this.rewardForm.achievementEnterpriseRankId=e.achievementEnterpriseRankId,this.rewardForm.rewardValue=e.rewardValue,this.rewardForm.rewardName=e.rewardName,this.integral=e.rewardName,this.rewardForm.achievementRewardType=e.achievementRewardType,this.rewardForm.rewardReferId=e.rewardReferId,1===this.rewardForm.achievementRewardType&&(this.rewardForm.rewardName="",this.rewardNameFlag=!1),2===this.rewardForm.achievementRewardType&&(this.rewardPrize="重新选择",this.rewardNameFlag=!0)},cancleAchievementTarget:function(e){e.achievementTarget=e.isCurAchievementTarget,e.isEdit=!1},editAchievementTarget:function(e){e.isEdit?e.isEdit=!0:h.a.set(e,"isEdit",!0),e.isCurAchievementTarget?e.isCurAchievementTarget=e.achievementTarget:h.a.set(e,"isCurAchievementTarget",e.achievementTarget)},submitAchievementTarget:function(e){var t={achievementEnterpriseRankId:e.achievementEnterpriseRankId,updateType:1,achievementTarget:e.achievementTarget};Object(d.a)(o.a.achievementUpdate,t).then(function(t){0===t.data.errorCode?(e.isEdit=!1,Object(m.c)()):Object(m.a)(t.data.message)}).catch(function(e){Object(m.b)(e)})},getAchievementList:function(){var e=this;Object(d.a)(o.a.achievementList).then(function(t){if(0===t.data.errorCode){e.isEdit=t.data.result.isEdit;var a=t.data.result.achievememntList;e.achievememntTypeOneList=a.filter(function(e){return 1==e.achievementType}),e.achievememntTypeTwoList=a.filter(function(e){return 2==e.achievementType}),e.achievememntTypeList=e.achievememntTypeOneList.map(function(e){return i()({},e,{isOpen:!!e.isOpen,disabled:!1})})}else Object(m.a)(t.data.message)}).catch(function(e){Object(m.b)(e)})},getCurTab:function(e){1===e&&(this.achievememntTypeList=this.achievememntTypeOneList),2===e&&(this.achievememntTypeList=this.achievememntTypeTwoList),this.activeitem=e},handleStatus:function(e,t){var a=this;if(e.isOpen===t)return!1;var r="";1===t&&(r="开启"),0===t&&(r="停用"),this.$confirm("确定"+r,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(d.a)(o.a.achievementOpen,{achievementSystemId:e.achievementSystemId,openStatus:t}).then(function(e){if(0!==e.data.errorCode)return Object(m.a)(e.data.message),!1;a.getAchievementList()}).catch(function(e){Object(m.b)(e)})})}},created:function(){var e=this;this.getAchievementList(),this.$store.commit("mutations-slide",!1),this.$nextTick(function(t){e.$store.commit("mutations-slide",!0)})},mounted:function(){var e=this;this.$store.commit("mutations-slide",!1),this.$nextTick(function(t){e.$store.commit("mutations-slide",!0)})},components:{"v-nav":c.a}},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-achievement"},[a("div",{staticClass:"member-achievement-container"},[a("div",[a("v-nav",{attrs:{navpath:e.navpath}})],1),e._v(" "),a("div",{staticClass:"achievement"},e._l(e.achievememntTypeList,function(t,r){return e.achievememntTypeList.length>0?a("div",{key:r,staticClass:"achievement-item"},[a("div",{staticClass:"achievement-top"},[a("span",{staticClass:"achievement-title"},[e._v(e._s(t.achievementName))]),e._v(" "),a("div",{staticClass:"achievement-handler tr"},[a("el-switch",{attrs:{disabled:t.disabled},on:{change:function(a){return e.changeValue(t)}},model:{value:t.isOpen,callback:function(a){e.$set(t,"isOpen",a)},expression:"item.isOpen"}})],1)]),e._v(" "),a("div",{staticClass:"achievement-editwrap"},[a("el-table",{attrs:{data:t.subAchievementList,"tooltip-effect":"dark","header-row-class-name":"curheader"}},[a("el-table-column",{attrs:{prop:"achievementTarget",label:"额度"},scopedSlots:e._u([{key:"default",fn:function(r){return[a("div",[a("span",[e._v(e._s(e._f("formatStart")(t.achievementDoc)))]),e._v(" "),a("el-input-number",{directives:[{name:"show",rawName:"v-show",value:1==r.row.isEdit,expression:"scope.row.isEdit == true"}],staticClass:"numberinput",attrs:{"controls-position":"right",min:0,max:999999},model:{value:r.row.achievementTarget,callback:function(t){e.$set(r.row,"achievementTarget",t)},expression:"scope.row.achievementTarget"}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!0!==r.row.isEdit,expression:"scope.row.isEdit !== true"}]},[e._v(e._s(r.row.achievementTarget)+" ")]),e._v(" "),a("span",[e._v(e._s(e._f("formatEnd")(t.achievementDoc)))]),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:1==e.isEdit&&!0!==r.row.isEdit,expression:"isEdit == 1 && scope.row.isEdit !== true"}],staticClass:"el-icon-edit pointer",on:{click:function(t){return e.editAchievementTarget(r.row)}}}),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==r.row.isEdit,expression:"scope.row.isEdit == true"}],attrs:{type:"text"},on:{click:function(t){return e.submitAchievementTarget(r.row)}}},[e._v("\n                    保存\n                  ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==r.row.isEdit,expression:"scope.row.isEdit == true"}],attrs:{type:"text"},on:{click:function(t){return e.cancleAchievementTarget(r.row)}}},[e._v("\n                    取消\n                  ")])],1)]}}],null,!0)}),e._v(" "),a("el-table-column",{attrs:{prop:"rewardValue",label:"奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("span",[e._v("奖励 ")]),e._v(" "),1===t.row.achievementRewardType?a("span",[e._v(e._s(t.row.rewardValue)+" "),a("span",[e._v(" 积分")])]):e._e(),e._v(" "),2===t.row.achievementRewardType?a("span",[e._v(e._s(t.row.rewardName))]):e._e(),e._v(" "),a("i",{directives:[{name:"show",rawName:"v-show",value:1==e.isEdit,expression:"isEdit == 1"}],staticClass:"el-icon-edit pointer",on:{click:function(a){return e.eidtRewardValue(t.row)}}})])]}}],null,!0)}),e._v(" "),a("el-table-column",{attrs:{prop:"couponStock",label:"库存",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.achievementRewardType?a("span",[e._v("--")]):e._e(),e._v(" "),2==t.row.achievementRewardType?a("span",[e._v(e._s(t.row.couponStock))]):e._e()]}}],null,!0)})],1)],1)]):e._e()}),0)]),e._v(" "),a("div",{staticClass:"footer-box"},[a("vue-gic-footer")],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑奖励",visible:e.dilogRewardVisible},on:{"update:visible":function(t){e.dilogRewardVisible=t},close:e.closeDilog}},[a("el-form",{attrs:{model:e.rewardForm}},[a("el-form-item",{attrs:{label:"奖励形式","label-width":"100px",prop:"achievementRewardType"}},[a("span",{staticClass:"el-radio__input",class:1==e.rewardForm.achievementRewardType?"is-checked":"",on:{click:function(t){return e.selectRewardType(1)}}},[a("span",{staticClass:"el-radio__inner"})]),a("span",{staticClass:"el-radio__label"},[e._v("奖励")]),e._v(" "),a("span",[a("el-input-number",{staticClass:"numberinput",attrs:{"controls-position":"right",min:0,max:1e5},model:{value:e.rewardForm.rewardValue,callback:function(t){e.$set(e.rewardForm,"rewardValue",t)},expression:"rewardForm.rewardValue"}}),e._v(" 积分\n        ")],1)]),e._v(" "),a("el-form-item",{attrs:{label:"","label-width":"100px",prop:"achievementRewardType"}},[a("div",{on:{click:function(t){return e.selectRewardType(2)}}},[a("span",{staticClass:"el-radio__input",class:2==e.rewardForm.achievementRewardType?"is-checked":""},[a("span",{staticClass:"el-radio__inner"})]),e._v(" "),a("span",{staticClass:"el-radio__label"},[e._v("奖励卡券")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.rewardNameFlag,expression:"rewardNameFlag"}],staticClass:"rewardname",staticStyle:{color:"#409EFF",cursor:"pointer"},on:{click:e.chooseCard}},[a("span",[e._v(e._s(e.rewardPrize))]),e._v("\n          "+e._s(e.rewardForm.rewardName)+"\n        ")])])],1),e._v(" "),a("div",{staticClass:"dilog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dilogRewardVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submitRewardType}},[e._v("确 定")])],1)],1),e._v(" "),a("vue-gic-card",{attrs:{projectName:e.projectName,cardLimit:e.cardLimit,cardType:e.cardType,showCardDialog:e.showCardDialog,disabledList:e.disabledList},on:{selectCard:e.selectCard}})],1)},staticRenderFns:[]};var u=a("VU/8")(v,w,!1,function(e){a("2Pr6")},"data-v-7002c6d4",null);t.default=u.exports}});