webpackJsonp([32],{AUf2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),n=a.n(r),s=a("WSiR"),i=a("AKaA"),o=a("NTL1"),c=a("oAV5"),u=a("8V46"),l={name:"membergroup",data:function(){return{bodyHeight:document.body.clientHeight||document.documentElement.clientHeight,navpath:[{name:"首页",path:""},{name:"会员分组",path:""}],page:{pageSize:20,currentPage:1,totalCount:0},memberGroupList:[]}},filters:{formatCondition:function(e){JSON.parse(e);return e}},methods:{handleCurrentChange:function(e){this.page.currentPage=e,this.getFindMemberGroups({pageSize:20,currentPage:e})},handleSizeChange:function(e){this.page.pageSize=e,this.getFindMemberGroups({pageSize:e,currentPage:1})},addMemberGroup:function(){this.$router.push({path:"/membergroupAdd"})},handleDetailGrop:function(e){this.$router.push({path:"/membergroupDetail",query:{memberGroupId:e}})},getFindMemberGroups:function(e){var t=this;Object(i.a)(o.a.findMemberGroups,{pageSize:e.pageSize||20,currentPage:e.currentPage||1,shareStatus:0}).then(function(e){0===e.data.errorCode?(t.memberGroupList=e.data.result.page.result.map(function(e,t){return n()({},e,{memberSearchCount:Object(c.b)(e.memberSearchStr)})}),t.page.currentPage=e.data.result.page.currentPage,t.page.totalCount=e.data.result.page.totalCount):Object(u.a)(e.data.message)}).catch(function(e){Object(u.b)(e)})},handleDeleteGroup:function(e,t){var a=this;this.$confirm("确定删除该会员分组","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.a)(o.a.deteleMemberGroup,{memberGroupId:e}).then(function(e){if(0!==e.data.errorCode)return Object(u.a)(e.data.message),!1;a.page.currentPage=1,a.getFindMemberGroups({}),a.$message({message:"删除成功",type:"success"})}).catch(function(e){Object(u.b)(e)})}).catch(function(e){Object(u.b)(e)})}},created:function(){this.getFindMemberGroups({}),this.$store.commit("mutations-slide",!1)},components:{"v-nav":s.a}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"member-group",style:{height:e.bodyHeight-64+"px"}},[a("div",{staticClass:"container"},[a("v-nav",{attrs:{navpath:e.navpath}}),e._v(" "),a("div",{staticClass:"group-wrap"},[a("div",{staticClass:"group"},[a("div",{staticClass:"add-wrap"},[a("el-button",{staticClass:"add-btn",attrs:{type:"primary"},on:{click:e.addMemberGroup}},[e._v("新增分组")])],1),e._v(" "),e.page.totalCount>0?a("div",{staticClass:"groupwrap clear"},[e._l(e.memberGroupList,function(t,r){return a("div",{key:r,staticClass:"groupwrap-item"},[a("div",{staticClass:"groupwrap-content"},[a("div",{staticClass:"groupwrap-title"},[a("el-popover",{attrs:{placement:"top",width:"200",trigger:"hover",content:"备注： "+t.memberGroupDescribe}},[a("div",{staticClass:"member-group-name",attrs:{slot:"reference"},slot:"reference"},[e._v(e._s(t.memberGroupName))])])],1),e._v(" "),a("div",{staticClass:"groupwrap-total borderbmdashed"},[a("p",{staticClass:"groupwrap-text"},[e._v(e._s(t.memberCount)+" 人")])]),e._v(" "),a("div",{staticClass:"groupwrap-condition"},[e._v("筛选条件： "+e._s(t.memberSearchCount)+"项\n                ")])]),e._v(" "),a("div",{staticClass:"groupwrap-handler"},[a("router-link",{staticClass:"mr6 pointer ml15 opt-icon",attrs:{to:{path:"/membergroupAdd",query:{memberGroupId:t.memberGroupId}},title:"编辑"}},[a("i",{staticClass:"el-icon-edit"})]),e._v(" "),a("span",{staticClass:"mr6 pointer opt-icon",attrs:{title:"详情"},on:{click:function(a){return e.handleDetailGrop(t.memberGroupId)}}},[a("i",{staticClass:"el-icon-document"})]),e._v(" "),a("span",{staticClass:"pointer opt-icon",attrs:{title:"删除"},on:{click:function(a){return e.handleDeleteGroup(t.memberGroupId,r)}}},[a("i",{staticClass:"el-icon-delete"})])],1)])}),e._v(" "),e.memberGroupList.length>0?a("div",{staticClass:"page mTop20"},[a("el-pagination",{attrs:{background:"","current-page":e.page.currentPage,"page-sizes":[20,40,60,80],"page-size":e.page.pageSize,layout:"total, sizes, prev, pager, next",total:e.page.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):e._e(),e._v(" "),0==e.memberGroupList.length?a("div",{staticClass:"el-table__body-wrapper is-scrolling-none"},[e._m(0),e._v(" "),e._m(1)]):e._e()],2):e._e()])])],1),e._v(" "),a("div",{staticClass:"foot-add"},[a("vue-gic-footer")],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("table",{staticClass:"el-table__body",staticStyle:{width:"1077px"},attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[t("colgroup",[t("col",{attrs:{name:"el-table_3_column_9",width:"359"}}),this._v(" "),t("col",{attrs:{name:"el-table_3_column_10",width:"359"}}),this._v(" "),t("col",{attrs:{name:"el-table_3_column_11",width:"359"}})]),this._v(" "),t("tbody")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"el-table__empty-block",staticStyle:{width:"100%",height:"256px"}},[t("span",{staticClass:"el-table__empty-text"},[this._v("暂无数据")])])}]};var d=a("VU/8")(l,p,!1,function(e){a("sdr0")},"data-v-1d4feb54",null);t.default=d.exports},sdr0:function(e,t){}});