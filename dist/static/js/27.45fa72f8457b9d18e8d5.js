webpackJsonp([27],{"1ciX":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("Dd8w"),a=s.n(n),i=s("WSiR"),o=s("AKaA"),r=s("oAV5"),l=s("NTL1"),c=s("SJI6"),u={name:"forzenlist",components:{NavPath:i.a},data:function(){return{navpath:[{name:"首页",path:""},{name:"冻结会员列表",path:""}],typeOptions:[{label:"全部",value:-1},{label:"异常解冻",value:101},{label:"会员主动冻结",value:102},{label:"erp操作",value:103}],selectAll:!1,frozenType:"",load:!1,keywords:"",currentPage:1,total:0,pageSize:20,frozenList:[],multipleList:[],singleInfo:{sex:0,age:0,cardNo:0,mainStoreName:"",costFee:0,costTimes:0,lastCost:0,numOfSale:0,numOfmarket:0,couponCount:0,status:0,wxStatus:0,phoneStatus:0,authStatus:0}}},computed:a()({},Object(c.mapState)(["storeImageUrl"])),created:function(){this.storeImageUrl||this.$store.dispatch("getStorePicture"),this.ids=[],this.keywords=sessionStorage.getItem("keywords")?sessionStorage.getItem("keywords"):"",this.frozenType=sessionStorage.getItem("frozenType")?sessionStorage.getItem("frozenType"):"",this.frozenType=this.frozenType?parseInt(this.frozenType,10):"",this.currentPage=sessionStorage.getItem("frozenlistcurrentPage")?Number(sessionStorage.getItem("frozenlistcurrentPage")):1,this.$store.commit("mutations-slide",!0)},beforeMount:function(){this.getList({pSize:20,cPage:1})},filters:{formatTimeYMD:function(e){return"--"!=e?e.split(" ")[0]:"--"},formatTimeHMS:function(e){return"--"!=e?e.split(" ")[1]:"--"},formatCardName:function(e){return e&&e.length>10&&(e=e.substr(0,10)+"..."),e},formatMember:function(e){return e&&e.length>3&&(e=e.substr(0,3)+"..."),e}},watch:{keywords:function(e){sessionStorage.setItem("keywords",e)},frozenType:function(e){sessionStorage.setItem("frozenType",e)}},methods:{linkDetail:function(e){this.$router.push({path:"/wechatmemberDetail",query:{memberId:e}})},getList:function(e){var t=this,s={pageSize:e.pSize,currentPage:e.cPage,phoneNameCard:this.keywords,wxOrPos:-1,fieldNames:"gradeName,name,nickName,pointsCurrent,photoUrl,cardNo,crateCardDateString,wxMember,posMember,frozenType,forzenLastTime,frozenCount"};s.frozenType=this.frozenType?this.frozenType:-1,this.sortType&&(s.sortType=this.sortType),this.sortColName&&(s.sortColName=this.sortColName),Object(o.a)("/api-member/ajax-frozen-members",s).then(function(e){t.load=!0,0===e.data.errorCode?(t.load=!1,e.data.result.result?(t.frozenList=e.data.result.result&&e.data.result.result.map(function(e){return a()({},e,{forzenLastTime:-1!=e.forzenLastTime?Object(r.a)(e.forzenLastTime,1):"--",thirdImgUrl:e.thirdImgUrl?e.thirdImgUrl:t.storeImageUrl})}),t.total=e.data.result.totalCount):(t.frozenList=[],t.total=0)):t.load=!1})},changeType:function(e){this.getList({pSize:20,cPage:1})},changeSort:function(e){this.sortType="ascending"==e.order?"asc":"desc",this.sortColName=e.prop,this.getList({pSize:20,cPage:1})},frozenMember:function(){this.frozenMethod({frozenType:1})},unFrozen:function(){var e=this;0!==this.multipleList.length?this.multipleList.length?this.$confirm("确定解冻?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.frozenMethod({frozenType:0})}):this.$message({message:"请先勾选选项",type:"warning"}):this.$message({message:"暂无数据，无法解冻",type:"warning"})},showSingleInfo:function(e){var t=this;this.singleInfo="",Object(o.a)(l.a.singleInfo,{memberId:e}).then(function(e){if(0===e.data.errorCode){var s=e.data.result.memberSingle;t.singleInfo=a()({},s,{sex:0==s.sex?"性别未知":1==s.sex?"男":"女",age:0!=s.age?s.age:"年龄未知",cardNo:s.cardNo?s.cardNo:"无会员卡",mainStoreName:s.mainStoreName?s.mainStoreName:"主门店未知"})}else checkFalse(e.data.message)}).catch(function(e){checkStatus(e)})},frozenMethod:function(e){var t=this;this.ids=[],e.idsIndex>=0?this.ids.push(this.frozenList[e.idsIndex].memberId):this.multipleList.forEach(function(e){t.ids.push(e.memberId)});var s={memberIds:this.ids.join(","),remark:"",isCurrent:this.selectAll?2:this.multipleList.length==this.pageSize?1:0,status:e.frozenType,phoneNameCard:this.keywords};Object(o.a)("/api-member/members-batch-update-frozen",s).then(function(e){0===e.data.errorCode&&(t.$message({message:"解冻成功",type:"success"}),t.getList({pSize:20,cPage:1}))})},handleSelectionChange:function(e){this.multipleList=e},unFrozenItem:function(e){var t=this;this.$confirm("确定解冻?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.frozenMethod({frozenType:0,idsIndex:e})})},submit:function(){this.getList({pSize:20,cPage:1})},JumpLink:function(e){var t=this.frozenList[e];1==t.channel?this.$router.push({path:"/wechatmemberDetail?memberId="+t.memberId+"&channel=wxMember"}):2==t.channel&&this.$router.push({path:"/posmemberDetail?memberId="+t.memberId+"&channel=posMember"})},handleSizeChange:function(e){this.currentPage=1,this.getList({pSize:e,cPage:1})},handleCurrentChange:function(e){this.currentPage=e,sessionStorage.setItem("frozenlistcurrentPage",Number(e)),this.getList({pSize:20,cPage:e})},selectAllmultipleList:function(){var e=this;this.selectAll=!this.selectAll,this.selectAll?this.frozenList.forEach(function(t){e.$refs.multipleTable.toggleRowSelection(t,!0)}):this.$refs.multipleTable.clearSelection()}}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"frozen-list"},[s("div",{staticClass:"min100"},[s("nav-path",{attrs:{navpath:e.navpath}}),e._v(" "),s("div",{staticClass:"forzen-container"},[s("div",{staticClass:"search"},[s("div",{staticClass:"search-item"},[e._v("\n          会员共"+e._s(e.total)+"人\n          "),s("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"请输入会员姓名/卡号/手机号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit(t)}},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[s("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),s("el-select",{staticStyle:{"margin-left":"5px"},attrs:{placeholder:"请选择冻结方式"},on:{change:e.changeType},model:{value:e.frozenType,callback:function(t){e.frozenType=t},expression:"frozenType"}},e._l(e.typeOptions,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),e.multipleList.length==e.pageSize?s("div",{staticClass:"choose-title"},[0==e.selectAll?s("span",[e._v("已勾选本页 "+e._s(e.multipleList.length)+" 个会员，")]):s("span",[e._v("已勾选 "+e._s(e.total)+" 个会员，")]),e._v(" "),0==e.selectAll?s("span",{staticClass:"multiple-all pointer",on:{click:e.selectAllmultipleList}},[e._v("勾选全部 "+e._s(e.total)+" 个会员")]):s("span",{staticClass:"multiple-all pointer",on:{click:e.selectAllmultipleList}},[e._v("取消勾选")])]):e._e(),e._v(" "),s("div",{staticClass:"right-btn"},[s("router-link",{staticClass:"inner-btn-link",attrs:{to:"/frozenList/frozenMember"}},[e._v("冻结会员")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.unFrozen}},[e._v("批量解冻")])],1)]),e._v(" "),s("div",{staticClass:"frozen-table"},[[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.load,expression:"load"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.frozenList,"tooltip-effect":"dark"},on:{"sort-change":e.changeSort,"selection-change":e.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{prop:"frozenMember",label:"基本信息",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",{staticClass:"basic-info-table",staticStyle:{cursor:"pointer"},on:{click:function(s){return e.linkDetail(t.row.memberId)}}},[s("el-popover",{attrs:{placement:"top-start",width:"400",height:"180",trigger:"hover"},on:{show:function(s){return e.showSingleInfo(t.row.memberId)}}},[s("div",{staticClass:"pointer"},[s("div",{staticClass:"singelinfo"},[s("div",{staticClass:"singelinfo-img"},[s("img",{attrs:{width:"100",height:"100",src:t.row.thirdImgUrl?t.row.thirdImgUrl:"./static/img/default.png",alt:""}})]),e._v(" "),s("div",{staticClass:"singelinfo-content pLeft10 pRight10"},[s("span",{staticClass:"lheigth0"},[e._v(e._s(t.row.memberName)+"\n                            "),s("span",{staticClass:"channelicon fr",class:0==e.singleInfo.status?"gzhiconcanclegray":1==e.singleInfo.status?"gzhicon":"gzhicongray",attrs:{title:0==e.singleInfo.status?"取消关注公众号":1==e.singleInfo.status?"已关注公众号":"未关注公众号"}}),e._v(" "),s("span",{staticClass:"channelicon fr mr6",class:0==e.singleInfo.wxStatus?"xcxicongray":1==e.singleInfo.wxStatus?"xcxicon":"",attrs:{title:0==e.singleInfo.wxStatus?"未使用小程序":1==e.singleInfo.wxStatus?"使用过小程序":""}})]),e._v(" "),s("p",{staticClass:"lheigth0"},[s("span",{staticClass:"evl-right"},[e._v(e._s(e.singleInfo.sex))]),s("span",{staticClass:"evl-right"},[e._v(e._s(e.singleInfo.age))]),s("span",[e._v(e._s(e._f("formatCardName")(e.singleInfo.cardNo)))])]),e._v(" "),s("p",{staticClass:"lheigth0"},[s("span",{staticClass:"fix-block"},[e._v(e._s(e.singleInfo.mainStoreName))])]),e._v(" "),s("div",{staticClass:"singelinfo-cost"},[s("div",{staticClass:"singelinfo-costitem"},[s("p",[e._v(e._s(e.singleInfo.costFee))]),e._v(" "),s("p",[e._v("消费总额")])]),e._v(" "),s("div",{staticClass:"singelinfo-costitem"},[s("p",[e._v(e._s(e.singleInfo.costTimes))]),e._v(" "),s("p",[e._v("消费次数")])]),e._v(" "),s("div",{staticClass:"singelinfo-costitem"},[s("p",[e._v(e._s(e.singleInfo.lastCost))]),e._v(" "),s("p",[e._v("最近消费")])])])])]),e._v(" "),s("div",{staticClass:"singelinfo-jl mBottom20 mTop20"},[s("a",{staticClass:"singelinfo-jlitem"},[e._v("消费记录 ("+e._s(e.singleInfo.numOfSale)+")")]),e._v(" "),s("a",{staticClass:"singelinfo-jlitem"},[e._v("营销记录 ("+e._s(e.singleInfo.numOfmarket)+")")]),e._v(" "),s("a",{staticClass:"singelinfo-jlitem"},[e._v("卡券记录 ("+e._s(e.singleInfo.couponCount)+")")])])]),e._v(" "),s("span",{staticClass:"member-span",attrs:{slot:"reference"},slot:"reference"},[s("img",{staticClass:"tablecontent-cellimg mr6",attrs:{width:"60",height:"60",src:t.row.thirdImgUrl?t.row.thirdImgUrl:"./static/img/default.png",alt:""}})])]),e._v(" "),s("span",{staticClass:"fix-block"},[e._v(e._s(e._f("formatMember")(t.row.memberName)))])],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"gradeName",label:"会员等级"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.gradeName?t.row.gradeName:"--")+"\n              ")]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"pointsCurrent",sortable:"",label:"积分余额"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(t.row.pointsCurrent.toFixed(2))+"\n              ")]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"frozenCount",sortable:"",label:"冻结次数"}}),e._v(" "),s("el-table-column",{attrs:{prop:"forzenLastReason",label:"最新冻结原因"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.forzenLastReason?s("div",[e._v(e._s(t.row.forzenLastReason))]):s("div",[e._v("暂无原因")])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"forzenLastTime",sortable:"",label:"最新冻结时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",[e._v(e._s(e._f("formatTimeYMD")(t.row.forzenLastTime)))]),e._v(" "),s("div",[e._v(e._s(e._f("formatTimeHMS")(t.row.forzenLastTime)))])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.channel?s("el-button",{attrs:{type:"text"},on:{click:function(s){return e.JumpLink(t.$index)}}},[e._v("查看")]):e._e(),e._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){return e.unFrozenItem(t.$index)}}},[e._v("解冻")])]}}])})],1)],e._v(" "),e.total>0?s("div",{staticClass:"pager"},[s("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-sizes":[20,50,75,100],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):e._e()],2)])],1),e._v(" "),s("div",{staticClass:"foot-add"},[s("vue-gic-footer")],1)])},staticRenderFns:[]};var f=s("VU/8")(u,m,!1,function(e){s("NgJW")},"data-v-623f74e0",null);t.default=f.exports},NgJW:function(e,t){}});