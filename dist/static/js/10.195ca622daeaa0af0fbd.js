webpackJsonp([10],{"1OM8":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=a("WSiR"),o=a("AKaA"),n=a("NTL1"),c=a("8V46"),l=a("EOvX"),v={name:"infoMall",data:function(){return{memberId:this.$route.query.memberId||"",navpath:[{name:"首页",path:""},{name:"微信会员",path:"/wechatmembers"},{name:"会员详情",path:"/wechatmemberDetail?memberId="+this.$route.query.memberId||""},{name:"微信商城消费",path:""}],memberInfo:{costFee:0,costTimes:0,lastCostTime:"",avgCost:0,relatedPercent:0,avgGoodsCost:0,highCost:0,costCategoryCount:0,avgDiscount:0},page:{currentPage:1,pageSize:20,totalCount:0},memberData:[]}},filters:{formatColorSize:function(t){var e="";t&&(e=JSON.parse(t).map(function(t){return t.key+": "+t.value})[0]);return e},mallname:function(t){var e="";t&&JSON.parse(t).forEach(function(t){e+=t.propName+":"+t.valueName+" "});return e}},methods:{handleCurrentChange:function(t){this.page.currentPage=t,this.getMemberOrderPage()},handleSizeChange:function(t){this.page.pageSize=t,this.getMemberOrderPage()},getMemberOrderPage:function(){var t=this;Object(o.a)(n.a.ajaxWechatMembers,{memberId:this.memberId,pageSize:this.page.pageSize,currentPage:this.page.currentPage}).then(function(e){0===e.data.errorCode?(t.memberData=e.data.result.page.result.map(function(t){return i()({},t,{createTime:t.createTime?Object(l.a)(new Date(t.createTime),"yyyy-MM-dd hh:mm:ss"):"--"})}),console.log(t.memberData),t.page.currentPage=e.data.result.page.currentPage,t.page.totalCount=e.data.result.page.totalCount):Object(c.a)(e.data.message)}).catch(function(t){Object(c.b)(t)})},getAjaxMembersInfo:function(){var t=this;Object(o.a)(n.a.infoMall,{memberId:this.memberId}).then(function(e){if(0===e.data.errorCode){var a=e.data.result.memberInfo;t.memberInfo={costFee:a.costFee,costTimes:a.costTimes,lastCostTime:a.lastCostTime,avgCost:a.avgCost,relatedPercent:a.relatedPercent,avgGoodsCost:a.avgGoodsCost,highCost:a.highCost,costCategoryCount:a.costCategoryCount,avgDiscount:a.avgDiscount}}else Object(c.a)(e.data.message)}).catch(function(t){Object(c.b)(t)})},goback:function(){this.$router.push({path:"wechatmemberDetail",query:{memberId:this.memberId}})}},created:function(){this.memberId&&(this.getAjaxMembersInfo(),this.getMemberOrderPage()),this.$store.commit("mutations-slide",!1)},components:{"v-nav":r.a}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mall-container"},[a("div",{staticClass:"min100"},[a("v-nav",{attrs:{navpath:t.navpath}}),t._v(" "),a("div",{staticClass:"record-nav"},[a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("消费总额")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v("￥"+t._s(t._f("fomatFloat")(t.memberInfo.costFee)))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("消费次数")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v(t._s(t.memberInfo.costTimes))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("最近消费")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v(t._s(t._f("formatYMD")(t.memberInfo.lastCostTime)))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("客单价")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v("￥"+t._s(t._f("fomatFloat")(t.memberInfo.avgCost)))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("连带率")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v(t._s(t._f("fomatFloat")(t.memberInfo.relatedPercent)))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("件单价")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v("￥"+t._s(t._f("fomatFloat")(t.memberInfo.avgGoodsCost)))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("最高单笔")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v(t._s(t._f("fomatFloat")(t.memberInfo.highCost)))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("消费品类")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v(t._s(t.memberInfo.costCategoryCount))])]),t._v(" "),a("div",{staticClass:"record-navitem"},[a("p",{staticClass:"lheigth40"},[t._v("平均折扣")]),t._v(" "),a("p",{staticClass:"cost-txt"},[t._v(t._s(t._f("fomatFloat")(t.memberInfo.avgDiscount)))])])]),t._v(" "),a("div",{staticClass:"record"},[a("div",{staticClass:"mTop20 pBottom100"},[a("div",{staticClass:"groupmember mBottom40"},[a("div",{},[t._m(0),t._v(" "),t._l(t.memberData,function(e,s){return t.memberData&&t.memberData.length>0?a("div",{key:s,staticClass:"mTop20 member-table-txt"},[a("div",{staticClass:"orderheader"},[a("div",{staticClass:"headerinfo"},[t._v("订单编号: "+t._s(e.orderNumber))]),t._v(" "),a("div",{staticClass:"headerinfo"},[t._v("下单时间："+t._s(e.createTime))]),t._v(" "),a("div",{staticClass:"headerinfo"},[t._v("收件人： "+t._s(e.buyerName))]),t._v(" "),a("div",{staticClass:"headerinfo"},[t._v("手机号码："+t._s(e.buyerPhone))]),t._v(" "),a("div",{staticClass:"headerinfo"},[t._v("收货地址："+t._s(e.addressInfo))])]),t._v(" "),a("div",{staticClass:"record-table",style:{height:e.orderItemList?80*e.orderItemList.length+"px":""}},[a("div",{staticClass:"record-flex70"},t._l(e.orderItemList,function(e,s){return a("div",{key:s,staticClass:"record-tablecontent"},[a("div",{staticClass:"w-43"},[a("div",{staticStyle:{display:"flex","flex-wrap":"wrap","align-items":"center"}},[a("div",{staticStyle:{flex:"0 0 60px"}},[a("img",{attrs:{width:"60",height:"60",src:e.mallProImageUrl,alt:""}})]),t._v(" "),a("div",{staticStyle:{flex:"1","margin-left":"5px"}},[a("div",{staticClass:"font14 break"},[t._v(t._s(e.mallProName))]),t._v(" "),a("div",{staticClass:"mTop10 font14 member-goods-txt"},[t._v(t._s(t._f("mallname")(e.mallProSkuAttr)))])])])]),t._v(" "),a("div",{staticClass:"w-14"},[t._v(t._s(e.mallProPrice))]),t._v(" "),a("div",{staticClass:"w-21"},[t._v(t._s(e.mallProNumber))]),t._v(" "),a("div",{staticClass:"w-21"},[t._v(t._s(e.refundPrice))])])}),0),t._v(" "),a("div",{staticClass:"width15 talign font14 borderight",style:{lineHeight:e.orderItemList?80*e.orderItemList.length+"px":""}},[a("div",{staticClass:"posrelative"},[t._v(t._s(e.payAmount)+"\n                    "),a("div",{staticClass:"posabsolute"},[t._v("（含快递￥"+t._s(e.orderItemFreight)+"）")])])]),t._v(" "),a("div",{staticClass:"width15 font14 talign",style:{lineHeight:e.orderItemList?80*e.orderItemList.length+"px":""}},[0==e.orderStep?a("div",[t._v("交易关闭")]):t._e(),t._v(" "),1==e.orderStep?a("div",[t._v("等待买家付款")]):t._e(),t._v(" "),2==e.orderStep?a("div",[t._v("买家已付款")]):t._e(),t._v(" "),3==e.orderStep?a("div",[t._v("已发货")]):t._e(),t._v(" "),4==e.orderStep?a("div",[t._v("交易完成")]):t._e()])])]):t._e()}),t._v(" "),t.memberData&&0==t.memberData.length?a("div",{staticStyle:{"text-align":"center","font-size":"14px"}},[a("span",{staticClass:"el-table__empty-text"},[t._v("暂无数据")])]):t._e(),t._v(" "),t.page.totalCount>0?a("div",{staticClass:"page mTop20"},[a("el-pagination",{attrs:{background:"","current-page":t.page.currentPage,"page-sizes":[20,40,60,80],"page-size":t.page.pageSize,layout:"total, sizes, prev, pager, next",total:t.page.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()],2)])])])],1),t._v(" "),a("div",{staticClass:"foot-add"},[a("vue-gic-footer")],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"record-header"},[a("div",{staticClass:"w-30"},[t._v("商品信息")]),t._v(" "),a("div",{staticClass:"w-10"},[t._v("单价")]),t._v(" "),a("div",{staticClass:"w-15"},[t._v("数量")]),t._v(" "),a("div",{staticClass:"w-15"},[t._v("退款金额")]),t._v(" "),a("div",{staticClass:"w-15"},[t._v("实付款")]),t._v(" "),a("div",{staticClass:"w-15"},[t._v("交易状态")])])}]};var d=a("VU/8")(v,m,!1,function(t){a("VIyp")},null,null);e.default=d.exports},EOvX:function(t,e,a){"use strict";e.a=function(t,e){var a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var s in a)new RegExp("("+s+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[s]:("00"+a[s]).substr((""+a[s]).length)));return e}},VIyp:function(t,e){}});