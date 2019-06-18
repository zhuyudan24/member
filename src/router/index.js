import Vue from "vue";
import Router from "vue-router";
import _import from "./_import.js";
import Layout from "view/layout/Layout.vue";
// import AppMain from 'view/layout/components/AppMain.vue';
Vue.use(Router);

export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("view/login/login"),
    name: "login"
  },
  {
    path: "/404",
    component: () => import("view/errorPage/404"),
    name: "error404"
  },
  {
    path: "/403",
    component: () => import("view/errorPage/403"),
    name: "error403"
  },
  {
    path: "/500",
    component: () => import("view/errorPage/500"),
    name: "error500"
  },
  { path: '/selector', component: () => import('../test/selector'), name: 'selector' },
  { path: '/linktool', component: () => import('../test/linktool'), name: 'linktools' },
  {
    path: "/",
    name: "Layout",
    redirect: "/wechattotal",
    component: Layout,
    children: [
      {
        path: "/wechatmembers",
        component: _import("wechatmembers", "wechatmembers"),
        meta: {
          title: "微信会员",
          keepAlive: true
        }
      },
      {
        path: "/wechattotal",
        component: _import("wechatmembers", "wechat-total"),
        meta: {
          title: "微信总量",
          keepAlive: true
        }
      },
      {
        path: "/talkLogPage",
        component: _import("wechatmembers", "talkLogPage"),
        meta: {
          title: "微信会员-通话记录"
        }
      },
      {
        path: "/infoMall",
        component: _import("wechatmembers", "infoMall"),
        meta: {
          title: "微信会员-微信商城消费"
        }
      },
      {
        path: "/posmembers",
        component: _import("posmembers", "posmembers"),
        meta: {
          title: "pos会员",
          keepAlive: true
        }
      },
      {
        path: "/onlinemembers",
        component: _import("onlinemembers", "onlinemembers"),
        meta: {
          title: "电商会员"
        }
      },
      {
        path: "/buyermembers",
        component: _import("buyermembers", "buyermembers"),
        meta: {
          title: "电商买家"
        }
      },
      {
        path: "/frozenList",
        component: _import("wechatmembers", "frozenList"),
        meta: {
          title: "冻结会员列表"
        }
      },
      {
        path: "/frozenList/frozenMember",
        component: _import("wechatmembers", "frozenMember"),
        meta: {
          title: "冻结会员"
        }
      },
      {
        path: "/wechatmembers/memberSetting",
        component: _import("wechatmembers", "memberSetting"),
        meta: {
          title: "微信会员-设置"
        }
      },
      {
        path: "/labelmanager",
        component: _import("labelmanager", "labelmanager"),
        meta: {
          title: "会员标签"
        }
      },
      {
        path: "/achievement",
        component: _import("achievement", "achievement_sale"),
        meta: {
          title: "会员成就-消费类"
        }
      },
      {
        path: "/achievement_interaction",
        component: _import("achievement", "achievement_interaction"),
        meta: {
          title: "会员成就-互动类"
        }
      },
      {
        // 微信会员回收站数据页面
        path: "/memberReturn",
        component: _import("memberlist", "memberReturn"),
        meta: {
          title: "微信会员回收站"
        }
      },
      {
        // POS会员回收站数据页面
        path: "/posRecycle", 
        component: _import("memberlist", "pos-recycle"),
        meta: {
          title: "POS会员回收站"
        }
      },
      {
        path: "/membergroupAdd",
        component: _import("membergroup", "membergroupAdd"),
        meta: {
          title: "会员分组-新增"
        }
      },
      {
        path: "/membergroup",
        component: _import("membergroup", "membergroup"),
        meta: {
          title: "会员分组"
        }
      },
      {
        path: "/cardvoucher",
        component: _import("wechatmembers", "cardvoucher"),
        meta: {
          title: "微信会员-卡券"
        }
      },
      {
        path: "/membergroupDetail",
        component: _import("membergroup", "membergroupDetail"),
        meta: {
          title: "会员分组-详情"
        }
      },
      {
        path: "/membertask",
        component: _import("membertask", "membertask"),
        meta: {
          title: "会员任务"
        }
      },
      {
        path: "/posmemberDetail",
        component: _import("posmembers", "posmemberDetail"),
        meta: {
          title: "pos会员-详情"
        }
      },
      {
        path: "/wechatmemberDetail",
        component: _import("wechatmembers", "wechatmemberDetail"),
        meta: {
          title: "微信会员-详情"
        }
      },
      {
        path: "/wechatTotalDetail",
        component: _import("wechatmembers", "wechatTotalDetail"),
        meta: {
          title: "微信总量-详情"
        }
      },
      {
        path: "/integralDataPage",
        component: _import("wechatmembers", "integralDataPage"),
        meta: {
          title: "微信会员-积分明细"
        }
      },
      {
        path: "/modifyintegral",
        component: _import("wechatmembers", "modifyintegral"),
        meta: {
          title: "微信会员-积分调整"
        }
      },
      {
        path: "/ajaxmembersinfo",
        component: _import("wechatmembers", "ajaxmembersinfo"),
        meta: {
          title: "微信会员-会员门店消费"
        }
      }
    ]
  }
];

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export default router;
