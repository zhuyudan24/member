webpackJsonp([19],{"34RI":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),n=a("WSiR"),r=a("AKaA"),o=a("NTL1"),u=a("8V46"),c=a("lRwf"),d=a.n(c),l={name:"membertask",data:function(){return{bodyHeight:document.body.clientHeight||document.documentElement.clientHeight,navpath:[{name:"首页",path:""},{name:"会员",path:"/wechatmembers"},{name:"会员任务",path:""}],isEdit:null,missionList:[]}},methods:{changeVal:function(e){val=val.length>6?val.substr(0,6):val},getMemberMissionList:function(){var e=this;Object(r.a)(o.a.memberMissionList).then(function(t){0===t.data.errorCode?(e.isEdit=t.data.result.isEdit,e.missionList=t.data.result.missionList.map(function(e){return s()({},e,{item:e.item.map(function(e){return s()({},e,{statusEdit:1==e.status})})})})):Object(u.a)(t.data.message)}).catch(function(e){Object(u.b)(e)})},editRewardValue:function(e){e.isEdit?e.isEdit=!0:d.a.set(e,"isEdit",!0),e.isCurValue?e.isCurValue=e.rewardValue:d.a.set(e,"isCurValue",e.rewardValue)},submitRewardValue:function(e){Object(r.a)(o.a.memberMissionUpdate,{missionItemEnterpriseId:e.missionItemEnterpriseId,usedRule:e.usedRule,rewardRule:e.rewardRule,rewardValue:e.rewardValue}).then(function(t){0===t.data.errorCode?(e.isEdit=!1,Object(u.c)()):Object(u.a)(t.data.message)}).catch(function(e){Object(u.b)(e)})},cancleRewardValue:function(e){e.rewardValue=e.isCurValue,e.isEdit=!1},changeValue:function(e){var t=e.statusEdit?1:0;return 1==t&&0===e.rewardValue?(Object(u.a)("请完善积分奖励"),e.statusEdit=!1,!1):e.status===t?(e.statusEdit=!1,!1):void Object(r.a)(o.a.memberMissionOpen,{missionItemEnterpriseId:e.missionItemEnterpriseId,status:t}).then(function(a){0===a.data.errorCode?(e.status=t,Object(u.c)()):Object(u.a)(a.data.message)}).catch(function(e){Object(u.b)(e)})}},created:function(){this.getMemberMissionList(),this.$store.commit("mutations-slide",!1)},components:{"v-nav":n.a}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-task",style:{height:e.bodyHeight-64+"px"}},[a("div",{staticClass:"min100"},[a("v-nav",{attrs:{navpath:e.navpath}}),e._v(" "),a("div",{staticClass:"achievement"},e._l(e.missionList,function(t,i){return a("div",{key:i,staticClass:"achievement-item"},[a("div",{staticClass:"achievement-top"},[a("span",{staticClass:"achievement-title"},[e._v(e._s(t.missionName))])]),e._v(" "),a("div",{staticClass:"achievement-editwrap"},[a("el-table",{attrs:{data:t.item,"tooltip-effect":"dark","header-row-class-name":"curheader"}},[a("el-table-column",{attrs:{prop:"missionItemName",label:"字段名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rewardValue",label:"奖励积分额"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v("奖励\n                  "),a("el-input-number",{directives:[{name:"show",rawName:"v-show",value:1==t.row.isEdit,expression:"scope.row.isEdit == true"}],attrs:{maxlength:"6","controls-position":"right",min:0,max:1e5},model:{value:t.row.rewardValue,callback:function(a){e.$set(t.row,"rewardValue",a)},expression:"scope.row.rewardValue"}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!0!==t.row.isEdit,expression:"scope.row.isEdit !== true"}]},[e._v(" "+e._s(t.row.rewardValue)+" ")]),e._v(" 积分\n                  "),a("i",{directives:[{name:"show",rawName:"v-show",value:1==e.isEdit&&!0!==t.row.isEdit,expression:"isEdit == 1 && scope.row.isEdit !== true"}],staticClass:"el-icon-edit pointer",on:{click:function(a){return e.editRewardValue(t.row)}}}),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.isEdit&&1==t.row.isEdit,expression:"isEdit == 1 && scope.row.isEdit == true"}],attrs:{type:"text"},on:{click:function(a){return e.submitRewardValue(t.row)}}},[e._v("\n                    保存\n                  ")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.isEdit&&1==t.row.isEdit,expression:"isEdit == 1 && scope.row.isEdit == true"}],attrs:{type:"text"},on:{click:function(a){return e.cancleRewardValue(t.row)}}},[e._v("\n                    取消\n                  ")])],1)]}}],null,!0)}),e._v(" "),1==e.isEdit?a("el-table-column",{attrs:{prop:"status",label:"开关",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"achievement-handler"},[a("el-switch",{attrs:{"active-text":"启用","inactive-text":"停用"},on:{change:function(a){return e.changeValue(t.row)}},model:{value:t.row.statusEdit,callback:function(a){e.$set(t.row,"statusEdit",a)},expression:"scope.row.statusEdit"}})],1)]}}],null,!0)}):e._e()],1)],1)])}),0)],1),e._v(" "),a("div",{staticClass:"footer-box foot-add"},[a("vue-gic-footer")],1)])},staticRenderFns:[]};var v=a("VU/8")(l,m,!1,function(e){a("gUWv")},null,null);t.default=v.exports},gUWv:function(e,t){}});