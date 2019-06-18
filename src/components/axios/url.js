const host = window.location.origin;
const baseUrl = host.indexOf('localhost') > -1 ? 'http://gicdev.demogic.com' : host;

const urlConfig = {
  doLogin: '/api-auth/dologin', // 登录
  enterprise: '/api-auth/list-login-enterprise',//企业列表
  clerkMenu: '/api-auth/login-clerk-menu',
  tagManageList:  '/api-member/tag-manage-list',//标签列表展示
  insertParentTag:  '/api-member/insert-parent-tag',//新建父级标签
  insertSonTag:  '/api-member/insert-son-tag',//新建子级标签
  deleteParentTag:  '/api-member/delete-parent-tag',//删除父级标签
  deleteSonTag:  '/api-member/delete-son-tag',//删除子级标签
  memberMissionList:  '/api-member/member-mission-list',//会员任务列表展示-商户
  memberMissionUpdate:  '/api-member/member-mission-update',//会员任务获取积分设置-商户
  memberMissionOpen:  '/api-member/member-mission-open',//会员任务开启关闭-商户
  achievementList:  '/api-member/achievement-list',//消费类/互动类 成就列表展示_商户
  achievementUpdate:  '/api-member/achievement-update',//成就额度、奖励积分修改_商户
  achievementOpen:  '/api-member/achievement-open',//成就开启关闭_商户
  findMemberGroups:  '/api-member/find-member-groups-page',//会员分组列表展示-分页
  insertMemberGroup:  '/api-member/insert-member-group',//新建会员分组
  updateMemberGroup:  '/api-member/update-member-group',//修改会员分组
  checkCard:  '/api-member/member-card-write-off-order-page',  //卡券手动核销_核销订单列表_new
  chooseDestory:  '/api-member/member-card-destroy', // 手动选取销毁
  ajaxMembers:  '/api-member/ajax-members',// 会员分组的会员列表
  deteleMemberGroup:  '/api-member/detele-member-group', //删除会员分组
  findMemberGroupInfo:  '/api-member/find-member-group-info',//查询单个会员分组信息
  findMemberFields:  '/api-member/find-member-fields',//列表自定义字段
  updateFields:  '/api-member/update-fields',//列表自定义字段选择保存
  memberCount:  '/api-member/ecommerce-member-count',//微信会员、POS会员、电商会员和电商买家 人数统计
  updateIntegrals:  '/api-member/members-batch-update-integrals',//批量修改会员积分
  storeCodeName:  '/api-plug/query-store-by-code-name',//查询门店(code和name)
  gradeList:  '/api-admin/grade-list',//获取会员等级列表
  updateGrade:  '/api-member/members-batch-update-grade',//批量修改会员等级
  updateStore:  '/api-member/members-batch-update-store',//批量修改会员主门店、协管门店
  batchProcess:  '/api-member/get-members-batch-process',//查看批量处理进度
  membersSubStoreList:  '/api-member/members-sub-store-list',//获取选中会员的协管门店
  singleInfo:  '/api-member/load-member-single-info',//会员简易信息(会员头像浮层显示)
  memberCardsPage:  '/api-member/member-cards-page', //会员卡券列表
  writeOff:  '/api-member/member-card-write-off',//卡券手动核销
  cardDestroy:  '/api-member/member-card-destroy',//卡券手动销毁
  cardChannelType:  '/api-member/card-channel-type',//发卡券渠道(字典列表)
  memberDetail:  '/api-member/member-load-member-detail',//微信 - 会员详情(头部+会员卡号+9宫格)
  baseDetail:  '/api-member/member-load-base-detail',//微信- 会员基本信息(可编辑修改)
  addressPage:  '/api-member/member-load-receiving-address-page',//收货地址
  extendInfo:  '/api-member/member-load-extend-info',//标准+扩展+类目
  logPage:  '/api-member/member-load-operate-log-page',//操作日志
  memberGrade:  '/api-member/member-load-update-member-grade',//修改会员等级
  updateBaseDetail:  '/api-member/member-load-update-base-detail',//修改微信会员基本信息
  updateImgUrl:  '/api-member/member-load-update-imgUrl',//修改头像
  ajaxMembersInfo:  '/api-member/ajax-members-info',//会员消费统计信息
  memberOrderPage:  '/api-member/member-order-page',///会员order列表
  orderDetail:  '/api-member/member-order-detail',//会员order-查看详情（订单详情+评价+回复）
  infoMall:  '/api-member/ajax-members-info-mall',//微信商城 - 会员消费统计信息
  ajaxWechatMembers: '/api-member/ajaxMembers',//会员微信商城order列表
  talkLogPage:  '/api-member/member-talk-log-page',//会员通话记录列表
  clerkTags:  '/api-member/member-load-find-clerk-tags',//获取导购标签列表
  updateClerkTags:  '/api-member/member-load-update-clerk-tags', //修改导购标签
  codeList:  '/api-member/get-naction-code-list',//手机号段 列表
  updateRemark:  '/api-member/member-load-update-remark',//修改导购备注信息
  integralDataPage:  '/api-member/member-integral-data-page',//积分列表(积分明细列表)
  integralOperateType:  '/api-member/member-integral-operate-type',//积分操作类型(字典列表)
  memberIntegralUpdate:  '/api-member/member-integral-update', //调整积分进行保存
  enterpriseInfo: '/api-member/enterprise-info',//获取企业配置信息
  posInfo: '/api-member/member-load-member-pos-info',//pos会员详情 会员信息
  posBaseDetail: '/api-member/member-load-update-pos-base-detail',//修改pos会员基本信息
  batchUpdateStore: '/api-member/batch-update-members-store', // 回收站修改主门店
  getStorePicture: '/api-member/enterprise-info', // 获取企业配置信息
  getReturnMember: '/api-member/query-members-page', // 回收站门店
  getSubStoreList: 'api-member/members-sub-store-list', // 获取选中会员的协管门店
  updateMemberStore: '/api-member/member-load-update-store', // 修改单个会员的服务门店和协管门店
}

const defaultUrl = Object.assign({}, urlConfig);

for (let k in defaultUrl) {
  defaultUrl[k] = `${baseUrl}${defaultUrl[k]}`;
}

export default defaultUrl;
