<template>
  <div class="wechat-details">
    <v-nav :navpath="navpath"></v-nav>
    <div class="sup-box">
    <div class="wechat width1200">
      <div class="wechat-left bordercustom">
        <div class="wechat-portraitwrap">
         <div  class="wechat-portrait"  @click="updateImgUrl">
           <div class="wechat-portraitmask">
            <div class="wechat-maskposition">
              <i class="el-icon-refresh wechat-refresh"></i>
              <p style="color: #fff;">更新头像</p>
            </div>
           </div>
           <img width="202px" height="202px" v-if="memberInfo.thirdImgUrl" class="wechat-portraitimg" :src="memberInfo.thirdImgUrl ? memberInfo.thirdImgUrl : storeImageUrl" alt="">
         </div>
        </div>
        <div class="wechat-baseitems">
          <div class="wechat-baseitem pointer"  @click="linkRoute('/integralDataPage')">
            <p class="font14">积分</p>
            <p class="color555">{{ memberInfo.accumulatPoints | fomatNumber }}</p>
          </div>
          <div class="wechat-baseitem">
            <p class="font14">储值</p>
            <p class="color555">{{ memberInfo.storedValue | fomatNumber }}</p>
          </div>
          <div class="wechat-baseitem pointer" @click="cardDetail(memberInfo.memberId)">
            <p class="font14">卡券</p>
            <p class="color555">{{ memberInfo.couponCount | fomatNumber }}</p>
          </div>
        </div>
        <div class="borderBottom">
          <div class="wechat-tabwrap">
            <div class="wechat-tab pointer" :class="{'wechat-tabactive': !tabStatus}" @click="tabStatus = false">
              <div v-if="memberbaseinfo.status == 1" class="channelicon gzhicon mTop10"></div>
              <div v-if="memberbaseinfo.status == 2" class="channelicon gzhicongray mTop10"></div>
              <div v-if="memberbaseinfo.status == 0" class="channelicon gzhiconcanclegray mTop10"></div>
            </div>
            <div class="wechat-tab pointer" :class="{'wechat-tabactive': tabStatus}" @click="tabStatus = true">
              <div v-if="memberbaseinfo.wxStatus == 1" class="channelicon xcxicon mTop10"></div>
              <div v-if="memberbaseinfo.wxStatus == 0" class="channelicon xcxicongray mTop10"></div>
            </div>
          </div>
          <div class="height160">
            <div class="font14" v-show="!tabStatus">
              <div class="wechat-tabcontent pLR20">
                <p><span>首次关注</span> <span class="ml15 color555">{{ memberbaseinfo.attentionTime | formatTime }}</span></p>
                <p><span>关注来源</span> <span class="ml15 color555">{{ memberbaseinfo.attentionChannelDict  | fomatText  }}</span></p>
                <p><span>取关时间</span> <span class="ml15 color555">{{ memberbaseinfo.cancelAttentionTime | formatTime }}</span></p>
              </div>
            </div>
            <div class="font14" v-show="tabStatus">
              <div class="wechat-tabcontent pLR20">
                <p><span>首次访问</span> <span class="ml15 color555">{{ memberbaseinfo.createTime | formatTime }}</span></p>
                <p><span>来源途径</span> <span class="ml15 color555">{{ memberbaseinfo.wxCannel  | fomatText  }}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="font14">
              <div class="wechat-tabcontent pLR20">
                <p><span class="label-span">昵称</span> <span class="ml15 color555">{{ memberbaseinfo.thirdNickname | fomatText }}</span></p>
                <p><span class="label-span">姓名</span> <span class="ml15 color555">{{ memberbaseinfo.memberName | fomatText }}</span></p>
                <p><span class="label-span">性别</span> <span class="ml15 color555">{{ memberbaseinfo.memberGender == 1 ? '男' : memberbaseinfo.memberGender == 2 ? '女': '未知'  }}</span></p>
                <p>
                  <span class="label-span">出生日期 {{memberbaseinfo.birthTypeStr}}</span>
                  <span class="ml15 color555">{{ memberbaseinfo.memberBirthday | formatYMD }}</span>
                </p>
                <p><span class="label-span">常驻城市</span> <span class="ml15 color555">{{ memberbaseinfo.memberMainStoreArea  | fomatText  }}</span></p>
                <p><span class="label-span">手机号码</span> <span class="ml15 color555">{{ memberbaseinfo.phoneNumber  | fomatText  }}</span></p>
                <p><span class="label-span">退订状态</span> <span class="ml15 color555">{{ memberbaseinfo.unsubscribe == 1 ? '退订': memberbaseinfo.unsubscribe == 0 ? '未退订': '--'  }}</span></p>
                <p>
                  <span class="label-span">服务门店</span>
                  <span>
                    <el-tooltip v-if="memberbaseinfo.mainStoreName">
                      <div slot="content" style="max-width: 300px">{{ memberbaseinfo.mainStoreName | fomatText  }}</div>
                      <span class="ml15 color555 shop-name">{{ memberbaseinfo.mainStoreName | fomatText  }}</span>
                    </el-tooltip>
                    <i class="iconfont icon-bianji pointer" @click="updateMainStore.show = true"></i>
                  </span>
                </p>
                <p><span class="label-span">专属导购</span> <span class="ml15 color555">{{ memberbaseinfo.mainClerkName | fomatText  }}</span></p>
                <p><span class="label-span">协管门店</span>
                  <el-tooltip placement="bottom" v-if="memberbaseinfo.shopNames">
                    <div slot="content" style="max-width: 300px">
                      <div v-if="memberbaseinfo.shopNames" v-for="(item, index) in memberbaseinfo.shopNames" :key="index">{{ item.storeName }}</div>
                    </div>
                    <span class="ml15 color555">
                      <span class="shop-name">{{ memberbaseinfo.shopNames ? memberbaseinfo.shopNames[0].storeName : ''}}</span>
                    </span>
                  </el-tooltip>
                  <i class="iconfont icon-bianji pointer" @click="updateSubStores.show = true"></i>
                 </p>
                <div class="mBottom20 talign"><el-button @click="eidtBaseInfo">编辑基本信息</el-button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wechat-right ml15">
        <div class="wechat-content">
          <div class="wechat-partone">
            <div class="wechat-cardinfowrap">
              <div class="wechat-cardinfo">
                <div class="wechat-cardtitle">会员卡信息</div>
                <div class="wechat-cardcontent">
                    <div class="wechat-carditem">
                      <span>商户会员卡号</span><span class="ml15 w135 ell disinline-txt" :title="memberInfo.cardNum">{{ memberInfo.cardNum | fomatNumber }}</span>
                    </div>
                    <div class="wechat-carditem" v-if="showClique">
                      <span>集团会员卡号</span><span class="ml15 w135 ell disinline-txt" :title="memberInfo.cardNumOfClique">{{ memberInfo.cardNumOfClique | fomatText }}</span>
                    </div>
                    <div class="wechat-carditem">
                      <span>商户会员等级</span><span class="ml15 color555">{{ memberInfo.gradeName | fomatText  }}</span>
                      <span class="ml15" @click="handlerGrade"><i class="el-icon-edit pointer"></i></span>
                    </div>
                    <div class="wechat-carditem" v-if="showClique">
                      <span>集团会员等级</span><span class="ml15 color555">{{ memberInfo.cliqueGradeName | fomatText }}</span>
                    </div>

                    <div class="wechat-carditem" v-if="showClique">
                      <span>集团会员积分</span><span class="ml15 color555">{{ memberInfo.cliqueMemberIntegral | fomatText  }}</span>
                    </div>
                    <div class="wechat-carditem">
                      <span>认证时间</span><span class="ml15 color555">{{ memberInfo.authTime | formatTime }}</span>
                    </div>

                    <div class="wechat-carditem">
                      <span>开卡时间</span><span class="ml15 color555">{{ memberInfo.cardGivingTime | formatTime }}</span>
                    </div>
                    <div class="wechat-carditem">
                      <span>到期时间</span><span class="ml15 color555">{{ memberInfo.limitTime | formatTime }}</span>
                    </div>

                    <div class="wechat-carditem lheigth40">
                      <span>开卡渠道</span><span class="ml15 w100 ell disinline-txt" :title="memberInfo.openCardChannel">{{ memberInfo.openCardChannel | fomatText  }}</span>
                    </div>
                    <div class="wechat-carditem lheigth40">
                      <span>开卡方式</span><span class="ml15 color555">{{ memberInfo.openCardChannelDict | fomatText  }}</span>
                    </div>
                </div>
              </div>
            </div>
            <div class="wechat-chanel">
              <div class="wechat-cardtitle">关联渠道</div>
              <div style="display: flex">
                <table class="relevance-table">
                  <tbody id="channelListTable"><tr><td class="relevance-name-content">
                    <img src="../../../static/img/channel_default_icon.png">
                    <div class="relevance-name">
                      <p>--</p>
                      <p class="gray-color">--<span>--</span></p>
                    </div>
                  </td>
                    <td class="relevance-num">--</td>
                  </tr><tr><td class="relevance-name-content">
                    <img src="../../../static/img/channel_default_icon.png">
                    <div class="relevance-name">
                      <p>--</p>
                      <p class="gray-color">--<span>--</span></p>
                    </div>
                  </td>
                    <td class="relevance-num">--</td>
                  </tr><tr><td class="relevance-name-content">
                    <img src="../../../static/img/channel_default_icon.png">
                    <div class="relevance-name">
                      <p>--</p>
                      <p class="gray-color">--<span>--</span></p>
                    </div>
                  </td>
                    <td class="relevance-num">--</td>
                  </tr></tbody>
                </table>
              </div>
              <div class="tRight">
                <el-pagination
                  layout="prev, pager, next">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="wechat-partthree wechat-record mTop20">
            <div class="wechat-recorditem bordercustom">
              <div class="wechat-cardtitle mBottom10 font14">消费记录</div>
              <div class="recodlist">
                <div class="recodlist-item itemhover pointer" @click="linkRoute('/ajaxmembersinfo')">
                  <p class="font14">门店消费</p>
                  <p>{{ memberInfo.numOfSale | fomatNumber }}</p>
                </div>
                <div class="recodlist-item itemhover pointer" @click="linkRoute('/infoMall')">
                  <p class="font14">微信商城</p>
                  <p>{{ memberInfo.wechatMallNum | fomatNumber }}</p>
                </div>
                <div class="recodlist-item">
                  <p class="font14">电商平台</p>
                  <p>{{ memberInfo.numOfEcommerce | fomatNumber }}</p>
                </div>
              </div>
            </div>
            <div class="wechat-recorditem ml15 bordercustom">
              <div class="wechat-cardtitle mBottom10 font14">商品信息</div>
              <div class="recodlist">
                <div class="recodlist-item">
                  <p class="font14">收藏商品</p>
                  <p>{{ memberInfo.collectionCount | fomatNumber }}</p>
                </div>
                <div class="recodlist-item">
                  <p class="font14">加购商品</p>
                  <p>{{ memberInfo.purchaseCount | fomatNumber }}</p>
                </div>
                <div class="recodlist-item">
                  <p class="font14">订阅商品</p>
                  <p>{{ memberInfo.subscribeCount | fomatNumber }}</p>
                </div>
              </div>
            </div>
            <div class="wechat-recorditem ml15 bordercustom">
              <div class="wechat-cardtitle mBottom10 font14">交互信息</div>
              <div class="recodlist">
                <div class="recodlist-item">
                  <p class="font14">聊天记录</p>
                  <p>{{ memberInfo.numOfChat | fomatNumber }}</p>
                </div>
                <div class="recodlist-item itemhover pointer" @click="linkRoute('/talkLogPage')">
                  <p class="font14">通话记录</p>
                  <p>{{ memberInfo.numOfTel | fomatNumber }}</p>
                </div>
                <div class="recodlist-item">
                  <p class="font14">营销记录</p>
                  <p>{{ memberInfo.numOfMarket | fomatNumber }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="wechat-partfour bordercustom mTop20 bordercustom">
            <div class="labeltag borderBottom">
              <span class="labeltag-tab font14 pointer" :class="{'labeltag-tabactive': labelTagactive === 1}" @click="labelTagactive=1">标签及备注</span>
              <span class="labeltag-tab font14 pointer" :class="{'labeltag-tabactive': labelTagactive === 2}" @click="labelTagactive=2">会员拓展信息</span>
              <span class="labeltag-tab font14 pointer" :class="{'labeltag-tabactive': labelTagactive === 3}" @click="labelTagactive=3">类目相关资料</span>
            </div>
            <div v-show="labelTagactive == 1" class="content">
              <div class="tag-container">
                <div class="system-title">
                  <div class="line"></div>
                  <h3>系统标签</h3>
                  <div class="line"></div>
                </div>
                <div class="tag-list-content">
                  <div class="member-tag-list">
                    <span class="member-tag-item" v-for="(item, index) in systemTags" :key="index">{{ item.tagsName }}</span>
                  </div>
                  <!-- 标签为空-->
                  <div class="tag-null" v-show="!systemTags">
                    <i class="el-icon-tickets"></i>
                    <p>暂无系统标签</p>
                  </div>
                </div>
              </div>
              <!--导购手工标签-->
              <div class="tag-container">
                <div class="system-title">
                  <div class="line"></div>
                  <h3>导购手工标签</h3>
                  <div class="line"></div>
                  <span class="tag-edit"><i class="el-icon-edit pointer" @click="editTags"></i></span>
                </div>
                <div class="tag-list-content">
                  <div class="member-tag-list">
                    <span v-for="(item, index) in tagsList" :key="index" class="member-tag-item" >{{ item.tagsName }}</span>
                  </div>
                  <!-- 标签为空 -->
                  <div class="tag-null" v-if="!tagsList.length">
                    <i class="el-icon-tickets"></i>
                    <p>暂无导购手工标签</p>
                  </div>
                </div>
              </div>

              <!--导购备注-->
              <div class="tag-container">
                <div class="system-title">
                  <div class="line"></div>
                  <h3>导购备注</h3>
                  <div class="line"></div>
                </div>
                <div id="dd" class="tag-reply" v-show="remarkList.length">
                  <el-row class="tag-item" v-for="(item, index) in remarkList" :key="index">
                    <el-col :span="20">{{ item.storeName }} {{item.clerkName}} <span class="ml15">{{ item.createTime }}</span></el-col>
                    <el-col class="tr" :span="4" >
                      <i class="el-icon-edit pointer" @click="editRemark(item)"></i>
                      <i class="el-icon-delete ml15 pointer" @click="deleteRemark(item)"></i></el-col>
                    <el-col :span="24" class="mTop10">{{ item.remark }}</el-col>
                  </el-row>
                </div>
                <!-- 标签为空 -->
                <div class="tag-null" v-show="!remarkList.length">
                  <i class="el-icon-tickets"></i>
                  <p>暂无导购备注</p>
                </div>
              </div>

            </div>
            <div v-show="labelTagactive == 2" class="content">
              <div class="tag-container">
                <div class="system-title">
                  <div class="line"></div>
                  <h3>开卡字段</h3>
                  <div class="line"></div>
                </div>
                <div class="tag-list-content">
                  <div class="tag-fieldlist">
                   <div class="tag-fielditem" v-for="(item, index) in openField" :key="index"><span class="tag-fieldtext">{{ item.fieldName }}</span><span>{{ item.fieldValue }}</span></div>
                  </div>
                  <div class="openchild">
                    <div class="openchild-item" v-for="(item, index) in openChildrenField" :key="index">
                      <div class="openchild-left ml15">
                        {{ item.bName }}
                      </div>
                      <div class="openchild-right">
                        <p v-for="(list, index) in item.sonFields" :key="index">{{ list.fieldName }}: {{ list.fieldValue }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="tag-null" v-if="!openField || !openChildrenField">
                    <i class="el-icon-tickets"></i>
                    <p>暂无开卡字段</p>
                  </div>
                </div>
              </div>
              <!--拓展字段-->
              <div class="tag-container">
                <div class="system-title">
                  <div class="line"></div>
                  <h3>拓展字段</h3>
                  <div class="line"></div>
                </div>
                <div class="tag-list-content">
                  <div class="tag-fieldlist">
                    <div class="tag-fielditem" v-for="(item, index) in fieldList" :key="index"><span class="tag-fieldtext">{{ item.fieldName }}</span><span>{{ item.fieldValue }}</span></div>
                  </div>
                  <div class="tag-null" v-show="!fieldList.length">
                    <i class="el-icon-tickets"></i>
                    <p>暂无拓展字段</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="labelTagactive == 3" class="content">
              <div class="tag-container">
                <div class="system-title">
                  <div class="line"></div>
                  <h3>身型字段</h3>
                  <div class="line"></div>
                </div>
                <div class="tag-figure">
                  <div style="border-bottom: 1px dashed #e3e5e9;height: 40px;line-height: 40px;">
                   <span class="fl ml15">身高: {{ baseinfoheight }} cm</span> <span class="fr mr15">体重:  {{ baseinfoweight }} kg</span>
                  </div>
                  <div class="tag-figureinfo">
                    <div class="tag-figurelist" v-for="(item, index) in dictFigureList" :key="index" >
                      <img style="max-width: 100%;" height="100" :src="'./static/img/body-shape-woman/' + item.imageUrl" alt="" v-if="item.imageUrl">
                      <p>{{ item.dictName }}</p>
                    </div>
                  </div>
                  <div class="tag-null" v-show="isGrilClothes == null || !dictFigureList">
                    <i class="el-icon-tickets"></i>
                    <p>暂无身型字段数据</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="wechat-parttwo mTop20">
            <el-table :data="addressData" border>
              <el-table-column prop="addressInfo" label="收货地址"></el-table-column>
              <el-table-column prop="addressee" label="收件人"></el-table-column>
              <el-table-column prop="mobile" label="手机号码"></el-table-column>
              <el-table-column prop="unsubscribe" label="退订状态">
                <template slot-scope="scope">
                  {{ scope.row.unsubscribe === 0 ? '否' : '是'}}
                </template>
              </el-table-column>
            </el-table>
            <div class="addresspage tRight" v-if="addresspage.totalCount > 0">
              <el-pagination
                @current-change="handleAddressCurrentChange"
                :current-page="addresspage.currentPage"
                :page-sizes="[20, 40, 60, 80]"
                :page-size="addresspage.pageSize"
                layout="prev, pager, next"
                :total="addresspage.totalCount">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="width1200 marginAuto pBottom100">
      <div class="table-content">
        <el-table :data="memberData" tooltip-effect="dark"  ref="multipleTable" >
          <el-table-column prop="createTime" label="时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | formatTime }}
            </template>
          </el-table-column>
          <el-table-column prop="operType" label="日志类型"> </el-table-column>
          <el-table-column prop="operContent" label="日志详情"> </el-table-column>
          <el-table-column prop="operReason" label="事由"> </el-table-column>
          <el-table-column prop="operRemark" label="备注"> </el-table-column>
        </el-table>
        <div class="page mTop20" v-if="page.totalCount > 0">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[20, 40, 60, 80]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="page.totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
      </div>
    <!-- <div class="footwrap">
      <el-button plain @click="goback">返回</el-button>
    </div> -->

    <!--会员等级修改-弹框-->
    <el-dialog title="会员等级修改" :visible.sync="dilogGradeVisible" width="600px" @close="cancleGrade">
      <el-form ref="gradeForm" :model="gradeForm" :rules="graderules" label-width="120px">
        <el-form-item label="调整后等级" prop="gradeId">
          <el-select v-model="gradeForm.gradeId" placeholder="请选择">
            <el-option v-for="item in memberGrade" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因备注"  prop="remark">
          <el-input type="textarea" v-model="gradeForm.remark"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogGradeVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitGrade('gradeForm')">确 定</el-button>
        </span>
    </el-dialog>
    <!--会员等级修改-弹框-end-->

    <!--编辑基本信息-弹框-->
    <el-dialog title="编辑基本信息" :visible.sync="dilogBaseVisible" width="920px"  @close="closeDilogBase">
      <el-form ref="baseForm" :model="baseForm" :rules="rules2"  label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="姓名" label-width="100px" prop="memberName">
              <gic-input v-model="baseForm.memberName" :max="10" :rules="[{required: true,message: '姓名不能为空'}]"></gic-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="height: 40px;"></el-col>
          <el-col :span="10">
            <el-form-item label="性别" prop="memberGender">
              <el-select style="width: 100%" v-model="baseForm.memberGender" placeholder="请选择">
                <el-option :key=0  :value=0 label="未知"></el-option>
                <el-option :key=1  :value=1 label="男"></el-option>
                <el-option :key=2  :value=2 label="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="出生日期" label-width="100px" prop="memberBirthday">
              <el-row>
                <el-col :span="8">
                  <el-select style="width: 100%" v-model="baseForm.birthType" placeholder="阳历">
                    <el-option :key="'农历'" :value="0" :label="'农历'"></el-option>
                    <el-option :key="'阳历'" :value="1" :label="'阳历'"></el-option>
                  </el-select>
                </el-col>
                <span class="inline-space"></span>
                <el-col :span="15">
                  <el-date-picker :clearable="false" value-format="timestamp" style="width: 100%;" v-model="baseForm.memberBirthday" type="date" placeholder="出生日期"></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="height: 40px;"></el-col>
          <el-col :span="10">
            <el-form-item label="手机号码" label-width="119px" prop="phoneNumber">
               <el-row>
                 <el-col :span="7">
                   <span>
                      <el-select style="width: 100%" v-model="baseForm.nationCode" placeholder="86">
                        <el-option :key="86" :value="86" :label="86"></el-option>
                        <el-option v-for="item in nationCodeList" :key="item.dictCode"  :value="item.dictCode" :label="item.dictName"></el-option>
                      </el-select>
                  </span></el-col>
                  <span class="inline-space"></span>
                 <!-- <el-col :span="1">&nbsp;</el-col> -->
                 <el-col :span="16"><span> <el-input v-model="baseForm.phoneNumber"></el-input></span></el-col>
               </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
        <el-col :span="22">
            <el-form-item label-width="100px" label="常驻城市" prop="memberMainStoreArea">
              <el-input :disabled="true" v-model="baseForm.memberMainStoreArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

<!--        <el-row>-->
<!--          <el-col :span="22">-->
<!--            <el-form-item label-width="100px" label="服务门店" prop="mainStoreName">-->
<!--              <el-select style="width: 100%" v-model="baseForm.mainStoreId"  filterable remote reserve-keyword placeholder="请输入关键词"-->
<!--                          :remote-method="handleKeyup" :loading="loading">-->
<!--                <el-option v-for="item in mainstoreList" :key="item.storeId" :label="item.storeName" :value="item.storeId"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row>-->
<!--          <el-col :span="22">-->
<!--            <el-form-item label-width="100px" label="协管门店">-->
<!--              <el-select style="width: 100%;" v-model="storeIds" multiple filterable remote reserve-keyword placeholder="请输入关键词"-->
<!--                          :remote-method="handleStoreKeyup" :loading="loading">-->
<!--                <el-option v-for="item in storeList" :key="item.storeId" :label="item.storeName" :value="item.storeId"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <el-row>
          <el-col :span="22">
            <el-form-item label-width="100px" label="原因备注"  prop="remark" :rules="[{ required: true}]">
              <gic-textarea :max="100" v-model="baseForm.remark"></gic-textarea>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <div class="foot-btn">
            <el-button @click="dilogBaseVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitBaseInfo('baseForm')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑基本信息-弹框-end-->

    <!--编辑导购手工标签-->
    <el-dialog title="编辑导购手工标签" :visible.sync="dilogTagVisible">
      <div class="tag-content">
        <ul>
          <li v-for="(item,index) in curTagsList" :key="index">
            <div class="lheigth40" v-if="item.subTags && item.subTags.length">{{ item.tagsName }}</div>
            <div class="tag-style">
              <el-checkbox-group v-model="item.checkBox" v-if="item.tagsName && item.subTags && item.subTags.length">
                <el-checkbox v-for="(list, idx) in item.subTags" class="member-checkout" :key="idx" :label="list.tagsName"  @change="changeCheck(list, item)"></el-checkbox>
              </el-checkbox-group>
            </div>
          </li>
        </ul>
      </div>
      <div class="tr mTop20">
        <el-button @click="dilogTagVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClerkTags">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑导购手工标签-end-->

    <!--修改导购备注-->
    <el-dialog title="修改导购备注" :visible.sync="dilogRemarkVisible" @close="closeRemark">
      <el-form :model="formRemark" ref="formRemark">
        <el-form-item prop="remark">
          <gic-textarea v-model="formRemark.remark" :max="400"></gic-textarea>
        </el-form-item>
      </el-form>
      <div class="tr">
        <el-button @click="dilogRemarkVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerUpdateRemark('formRemark')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="会员服务门店修改" :visible.sync="updateMainStore.show">
      <el-form>
        <el-form-item label-width="100px" label="服务门店" :rules="[{ required: true }]">
          <el-select
            style="width: 100%"
            v-model="updateMainStore.mainStoreId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="handleKeyup"
            :loading="loading"
          >
            <el-option
              v-for="item in mainstoreList"
              :key="item.storeId"
              :label="item.storeName"
              :value="item.storeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="备注" :rules="[{ required: true }]">
          <gic-textarea :max="100" v-model="updateMainStore.remark"></gic-textarea>
        </el-form-item>
        <el-form-item>
          <div class="foot-btn">
            <el-button @click="updateMainStore.show = false">取 消</el-button>
            <el-button type="primary" @click="handleUpdateMainStore">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="会员协管门店修改" :visible.sync="updateSubStores.show">
      <el-form>
        <el-form-item label-width="100px" label="协管门店" :rules="[{ required: true }]">
          <el-select
            style="width: 100%;"
            v-model="updateSubStores.storeIds"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="handleStoreKeyup"
            :loading="loading"
          >
            <el-option
              v-for="item in storeList"
              :key="item.storeId"
              :label="item.storeName"
              :value="item.storeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="备注" :rules="[{ required: true }]">
          <gic-textarea :max="100" v-model="updateSubStores.remark"></gic-textarea>
        </el-form-item>
        <el-form-item>
          <div class="foot-btn">
            <el-button @click="updateSubStores.show = false">取 消</el-button>
            <el-button type="primary" @click="handleUpdateSubStore">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--修改导购备注-end-->
    <vue-gic-footer></vue-gic-footer>
  </div>
</template>

<script>
import wechatmemberDetail from './wechatmemberDetail'
export default { ...wechatmemberDetail }
</script>

<style lang="stylus">
  @import "../../../static/css/variables.styl"
  .wechat
    margin 0 auto
    display flex
    padding 20px
    margin-top 20px
    background-color #fff
    &-left
      flex 0 0 260px
      width 260px
      .shop-name
        display inline-block
        vertical-align middle
        padding-bottom 3px
        max-width 75px
        line-height normal
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    &-right
      flex 1
    &-content
      height:100%
      display:flex
      flex-direction column
    &-partfour
      flex:1
    &-portraitwrap
      padding 20px 20px 0 20px
      text-align center
    &-portrait
      position relative
      width: 220px
      height: 220px
      background: #fff
      cursor: pointer
      box-shadow: rgba(0,0,0,0.25) 0 0px 20px
    &-portraitmask
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      opacity 0
      transition opacity .5s
      &:hover
        opacity 1
        background rgba(3,3,3,.5)
      &:hover .wechat-refresh
        transform rotate(180deg)
    &-maskposition
      margin-top 50%
      transform translateY(-50%)
      color #fff
    &-refresh
      font-size 50px
      transition transform .8s
    &-portraitimg
      padding 8px
      object-fit cover
    &-baseitems
      display flex
    &-baseitem
      flex 1
      padding 10px
      text-align center
    &-tabwrap
      display flex
    &-tab
      flex 1
      height 40px
      line-height 40px
      text-align center
      border-top 1px solid $wechatbordercolor
      border-bottom  1px solid $wechatbordercolor
      box-sizing border-box
      &:first-child
        border-right 1px solid $wechatbordercolor
    &-tabactive
      border-top none
      border-bottom  none
      background #f3f5f9
    &-tabcontent
      line-height 40px
    &-partone
      display flex
    &-chanel
      flex 0 0 400px
      width: 400px;
      height: 260px;
      border: 1px solid $wechattagcolor;
      vertical-align: top;
      font-size: 14px;
    &-cardinfowrap
      flex 1
    &-cardinfo
      width 500px
      height 260px
      border 1px solid $wechattagcolor
      vertical-align top
      font-size 14px
    &-cardtitle
      height 40px
      line-height 40px
      background $wechatbgcolor
      border-bottom 1px solid $wechattagcolor
      padding-left 10px
    &-cardcontent
      padding 10px
    &-carditems
      display flex
    &-carditem
      display inline-block
      width 230px
      height 40px
      line-height 40px
    &-record
      display flex
    &-recorditem
      flex 1
      height 150px
    &-parttwo
      min-height 160px
      border-bottom: 1px solid $wechattagcolor
    .recodlist
      display flex
      &-item
        flex 1
        text-align center
      .itemhover
        &:hover
          color #5092e1
    .labeltag
      display flex
      height: 40px;
      line-height: 40px
      &-tab
        flex 1
        text-align center
        box-sizing border-box
        &:first-child
           border-right 1px solid $wechattagcolor
        &:last-child
          border-left 1px solid $wechattagcolor
      &-tabactive
        background  $wechatbgcolor
    .addresspage
       padding 5px 0
       border-left 1px solid $wechattagcolor
       border-right 1px solid $wechattagcolor
       border-bottom 1px solid $wechattagcolor
  .tag-container
    padding 0 60px
    margin-top 20px
    margin-bottom 20px
    font-size 14px
  .tag-edit
    position absolute
    right -25px
  .system-title
    height 30px
    line-height 30px
    display flex
    position relative
  .line
    flex 4
    height 2px
    border-bottom 1px solid #e3e5e9
    margin-top 15px
  .system-title h3
    line-height 0px
    font-weight normal
    padding 0 30px
    background #fff
    text-align center
  .member-tag-list
    padding-top 10px
    text-align center
    display flex
    flex-wrap wrap
    justify-content center
  .member-tag-item
    padding 10px 20px
    background-color $tagcolor
    margin 5px 5px
  .tag-null
    text-align center
    margin-top 20px
  .tag-null p
    margin-top 10px
    color #888
  .tag-reply
    min-height 80px
  .tag-content
    height 300px
    overflow-y auto
  .tag-style
    display flex
    flex-wrap wrap
  .tag-style-item
    display inline-block
    flex 0 0 100px
    height 32px
    line-height 32px
    text-align center
    border 1px solid #e3e5e9
    border-radius 2px
    cursor pointer
    margin-bottom  5px;
    margin-right 5px
    /*&:hover*/
      /*border-color transparent*/
      /*background-color #fede29*/
  .tag-active
    border-color transparent
    background-color #fede29
  .content
    height 450px
    overflow-y auto
  .tag-figurelist
    width: 20%;
    font-size: 14px;
    display: inline-block;
    text-align: center;
    margin: 20px 0;
  .tag-fieldlist
    margin: 20px 0
    margin-left: 75px;
  .tag-fielditem
    padding: 20px 0
  .tag-fieldtext
    width: 140px;
    display: inline-block;
  .openchild
    background-color: #f3f5f9
  .openchild-item
    display: flex;align-items: center
  .openchild-left
    flex: 0 0 142px
  .openchild-right
    flex:1
  table {
    width 100%
    border-collapse: collapse;
    border-spacing: 0;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  .relevance-table
  .relevance-table tr {
    line-height 0
    box-sizing border-box
    border-bottom: 1px solid #e3e5e9;
  }
  .relevance-name-content {
    border-right: 1px solid #e3e5e9;
    width: 60%;
    padding: 5px 12px;
  }
  .relevance-name-content img {
    width: 30px;
    height: 30px;
    margin-right: 7px;
  }
  .relevance-name {
    display: inline-block;
  }
  .relevance-num {
    width: 40%;
    text-align: center;
  }
  .inline-space{
    float: left;
    height: 40px;
    width: 10px;
  }
  .label-span {
    display: inline-block;
    width: 105px;
    text-align: right;
  }

.tag-item
  padding 10px 15px
  margin-top 10px
  margin-bottom 10px
  background-color #f5f6f9

.wechat-details
  height 100%
  overflow auto

.sup-box
  margin-left: 24px
  margin-right: 24px
  background: #fff
</style>
