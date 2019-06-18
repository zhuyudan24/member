<template>
  <div class="min-container">
    <div class="min100">
      <v-nav style="border-bottom: none;" :class="'nav-bottom'" :navpath="navpath"></v-nav>
        <div class="record-nav">
          <div class="record-navitem">
            <!-- 跑数据的时候取反了  -->
            <p class="lheigth40">消费总额(实付)</p>
            <p class="meduimtxt">￥{{ memberInfo.costFeePaid | fomatFloat }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">消费总额(应收)</p>
            <p class="meduimtxt">{{ memberInfo.costFee | fomatFloat }}</p>
          </div> 
          <div class="record-navitem">
            <p class="lheigth40">消费次数</p>
            <p class="meduimtxt">{{ memberInfo.costTimes }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">最近消费</p>
            <p class="meduimtxt">{{ memberInfo.lastCostTime | formatYMD }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">客单价</p>
            <p class="meduimtxt">￥{{ memberInfo.avgCost  | fomatFloat }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">连带率</p>
            <p class="meduimtxt">{{ memberInfo.relatedPercent  | fomatFloat }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">件单价</p>
            <p class="meduimtxt">￥{{ memberInfo.avgGoodsCost  | fomatFloat }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">最高单笔(实付)</p>
            <p class="meduimtxt">{{ memberInfo.highCostPaid  | fomatFloat }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">最高单笔(应收)</p>
            <p class="meduimtxt">{{ memberInfo.highCost | fomatFloat }}</p>
          </div>          
          <div class="record-navitem">
            <p class="lheigth40">消费品类</p>
            <p class="meduimtxt">{{ memberInfo.costCategoryCount }}</p>
          </div>
          <div class="record-navitem">
            <p class="lheigth40">平均折扣</p>
            <p class="meduimtxt">{{ memberInfo.avgDiscount  | fomatFloat }}</p>
          </div>
        </div>
      <div class="record">
        <div class="pos">
          <div class="pos-title">会员卡信息</div>
          <div class="pos-content">
            <div class="pos-flex">
            <div class="pos-leftcontent">
              <div class="pos-item"><span class="pos-leftitem">商户会员卡号 <span class="pos-color"> {{ posMemberInfo.cardNum }} </span></span></div>
              <div class="pos-item"><span class="pos-leftitem">商户会员等级 <span class="pos-color">  {{ posMemberInfo.gradeName }}
                <i class="el-icon-edit pointer" @click="handlerGrade"></i></span></span></div>
              <div class="pos-item"><span class="pos-leftitem">到期时间 <span class="pos-color"> {{ posMemberInfo.limitTime | formatTime }} </span></span></div>
              <div class="pos-item"><span class="pos-leftitem">开卡门店<span class="pos-color"> {{ posMemberInfo.storeName }} </span></span></div>
              <div class="pos-item"><span class="pos-leftitem">开卡时间 <span class="pos-color"> {{ posMemberInfo.cardGivingTime | formatTime  }} </span></span></div>
              <div class="pos-item"><span class="pos-leftitem">姓名 <span class="pos-color"> {{ posMemberInfo.memberName }}
                <i class="el-icon-edit pointer" @click="editGrade(1)"></i></span></span></div>
              <div class="pos-item"><span class="pos-leftitem" >性别 <span class="pos-color"> {{ posMemberInfo.memberGender | formatGender }}
                <i class="el-icon-edit pointer" @click="editGrade(2)"></i></span></span></div>
              <div class="pos-item">
                <span class="pos-leftitem">
                  出生日期 {{posMemberInfo.birthTypeStr}}
                  <span class="pos-color"> {{ posMemberInfo.memberBirthday | formatYMD }}
                    <i class="el-icon-edit pointer" @click="editGrade(3)"></i>
                  </span>
                </span>
              </div>
              <div class="pos-item"><span class="pos-leftitem">手机号码 <span class="pos-color"> {{ posMemberInfo.phoneNumber }}
                <i class="el-icon-edit pointer" @click="editGrade(4)"></i></span></span></div>
              <div class="pos-item"><span class="pos-leftitem">退订状态 <span class="pos-color"> {{ posMemberInfo.unsubscribe == 1 ? '退订' : '未退订' }} </span></span></div>

              <div class="pos-item" v-if="showClique"><span class="pos-leftitem">集团会员卡号 <span class="pos-color"> {{ posMemberInfo.cliqueCardNo | fomatText }} </span></span></div>
              <div class="pos-item" v-if="showClique"><span class="pos-leftitem">集团会员等级 <span class="pos-color"> {{ posMemberInfo.cliqueGradeName | fomatText }} </span></span></div>
              <div class="pos-item" v-if="showClique"><span class="pos-leftitem">集团会员积分 <span class="pos-color"> {{ posMemberInfo.cliqueMemberIntegral | fomatText }} </span></span></div>

            </div>
            </div>
            <div class="pos-rightcontent">
              <div class="pos-num pointer">{{posMemberInfo.accumulatPoints}}</div>
              <div class="pos-text pointer">
                <router-link :to="{path: '/integralDataPage',query: {'memberId': memberId}}" class="point-recharge">积分余额</router-link>
              </div>
              <div class="mTop10 pos-num">{{posMemberInfo.storedValue}}</div>
              <div class="pos-text">储值余额</div>
            </div>
          </div>
        </div>

        <div>
          <div class="paddmo">
            <div class="table-content">
              <el-table :data="memberData" tooltip-effect="dark"  ref="multipleTable" >
                <el-table-column prop="putOnTime" label="操作时间" width="200px">
                  <template slot-scope="scope">
                    {{ scope.row.orderTime }}
                  </template>
                </el-table-column>
                <el-table-column prop="orderNumber" label="单据流水号"  width="160px"></el-table-column>
                <el-table-column prop="storeName" label="消费门店"></el-table-column>
                <el-table-column prop="clerkImageUrl" label="导购信息" width="260px">
                  <template slot-scope="scope">
                    <div  class="record-clerk">
                      <span class="record-clerkimg"><img style="vertical-align: middle" width="60" height="60" :src="scope.row.clerkImageUrl | defaultImg" alt=""></span>
                      <span class="record-clerkname">{{ scope.row.clerkName }}<br>{{ scope.row.clerkCode }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="orderStatus" label="订单类型">
                  <template  slot-scope="scope">
                    <span v-if="scope.row.orderStatus == 1">销售</span>
                    <span v-if="scope.row.orderStatus == 2">退货</span>
                    <span v-if="scope.row.orderStatus == 4">退换货</span>
                  </template>
                </el-table-column>
                <el-table-column prop="paidAmount" label="成交金额"> </el-table-column>
                <el-table-column prop="evaluateStatus" label="评价状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.evaluateStatus == 0">未评价</span>
                    <span v-if="scope.row.evaluateStatus == 1">好评</span>
                    <span v-if="scope.row.evaluateStatus == 2">不良评价</span>
                    <span v-if="scope.row.evaluateStatus == 3">未评价-已过期</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="operate">
                      <span class="pointer" @click="getOrderDetail(scope.row.orderId)">查看详情</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page mTop20" v-if="page.totalCount > 0">
                <el-pagination background @size-change="handleSizeChange"
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
      </div>
    </div>

    <!--订单详情-->
    <el-dialog  title="订单详情"  :visible.sync="dialogOrderVisible"  width="600px">
      <div class="record-dialog" style="width: 560px;">
        <div class="table-content">
          <el-table :data="orderData" tooltip-effect="dark"  ref="orderTable">
            <el-table-column prop="productName" label="商品信息" width="200px">
              <template slot-scope="scope">
                <div class="record-info">
                  <div class="record-infoimg"><img width="60" height="60" src="/static/img/default.png" alt=""></div>
                  <div class="record-infocontent">
                    <div>{{ scope.row.productName }}</div>
                    <div>{{ scope.row.productCode }}</div>
                    <div>{{ scope.row.attrColorSize | formatColorSize }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="数量" width="120px"></el-table-column>
            <el-table-column prop="payPrice" label="成交价">
              <template slot-scope="scope">
                <p>{{ scope.row.unitPrice }}</p>
                <p>{{ scope.row.payPrice }}</p>
              </template>
            </el-table-column>
          </el-table>

          <div class="record-border">
            <div class="record-countwrap">
              <p><span class="record-count">商品总价</span><span class="record-countvalue">{{ orderInfo.totalAmount }}</span></p>
              <p><span class="record-count">优惠活动</span><span class="record-countvalue">{{ orderInfo.promotionAmount }}</span></p>
              <p><span class="record-count">应付金额</span><span class="record-countvalue">{{ orderInfo.paidAmount }}</span></p>
            </div>
          </div>

          <div class="record-border">
            <div class="record-countwrap">
              <p v-for="(item, index) in payInfo" :key="index"><span class="record-count">{{ item.name }}</span><span class="record-countvalue">{{ item.value }}</span></p>
            </div>
          </div>
          <div class="record-border">
            <div class="record-countwrap">
              <p><span class="record-count">订单总额</span><span class="record-countvalue">{{ orderInfo.paidAmount }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer talign">
        <el-button type="primary" @click="dialogOrderVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--订单详情-end-->
    <el-dialog :title="'调整POS会员' + updateTitle" :visible.sync="dialogEidtVisible" width="500px" @close="closePos('posForm')">
      <el-form :model="posForm" ref="posForm" label-width="100px" :rules="posRules">
        <el-form-item label="姓名" prop="memberName" v-show="updateStatus == 1">
          <el-input v-model="posForm.memberName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="memberGender" v-show="updateStatus == 2">
          <el-select style="width: 100%" v-model="posForm.memberGender" placeholder="请选择">
            <el-option :key=1  :value=1 label="男"></el-option>
            <el-option :key=2  :value=2 label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期"  prop="memberBirthday" v-show="updateStatus == 3">
          <el-row>
            <el-col :span="6">
              <el-select style="width: 100%" v-model="posForm.birthType" placeholder="阳历">
                <el-option key="农历" :value="0" label="农历"></el-option>
                <el-option key="阳历" :value="1" label="阳历"></el-option>
              </el-select>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="17">
              <el-date-picker :clearable="false" value-format="timestamp" style="width: 100%;" v-model="posForm.memberBirthday" type="date" placeholder="出生日期"></el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item ref="phoneNumber" label="手机号码" prop="phoneNumber" v-show="updateStatus == 4">
          <el-row>
            <el-col :span="6">
               <span>
                  <el-select style="width: 100%" v-model="posForm.nationCode " placeholder="请选择">
                    <el-option key="86"  value="86" label="86"></el-option>
                    <el-option v-for="item in nationCodeList" :key="item.dictCode"  :value="item.dictCode" :label="item.dictName"></el-option>
                  </el-select>
               </span></el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="17"><span> <el-input v-model="posForm.phoneNumber"></el-input></span></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="原因备注" prop="remark">
          <gic-textarea :max="100" v-model="posForm.remark"></gic-textarea>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEidtVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPosBaseDetail('posForm')">确 定</el-button>
        </span>
    </el-dialog>

    <!--会员等级修改-弹框-->
    <el-dialog title="会员等级修改" :visible.sync="dialogGradeVisible" width="600px" @close="cancleGrade">
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
    <div class="foot-add">
      <vue-gic-footer></vue-gic-footer>
    </div>
  </div>
</template>

<script>
import posmemberDetail from './posmemberDetail.js'
export default { ...posmemberDetail }
</script>
<style lang="stylus">
  $bgcolor=#fbfcfd
  $bordercolor=#e3e5e9
  $posbg=#f5f5f9
  .min-container
    min-width: 1500px
  .record
    padding 20px 25px
    height 100%
    &-nav
      display flex
    &-navitem
      flex 1
      height 100px
      line-height 0
      padding-left 27px
      background #fff
      &:last-child
        border-right 0
    &-search
      display flex
    &-searchitem
      flex 1
    &-searchitemtwo
      flex 0 0 200px
      width 200px
    &-clerk
      display flex
      align-items center
      justify-content center
    &-clerkimg
      flex 0 0 60px
      width 60px
    &-clerkname
      flex 1
      margin-left 5px
    &-clerkpopover
      display flex
    &-popovercontent
      flex 1
      margin-left 15px
      line-height 0
    &-popoverimg
      flex 0 0 150px
      width 150px
    &-infodetail
      display inline-block
      width 80px
      font-size 12px
      line-height 16px
    &-dialog
      height 400px
      overflow auto
    &-info
      display flex
    &-infoimg
      flex 0 0 60px
      width 60px
    &-infocontent
      flex 0 0 120px
      width 120px
      margin-left 10px
      line-height 18px
    &-countwrap
      margin-left 200px
    &-count
      display inline-block
      width 100px
      padding 0 10px
    &-countvalue
      display inline-block
      width 180px
      padding 0 10px
    &-border
      border-bottom: 1px solid #ebeef5
  .pos
    background-color #fff
    &-content
      display flex
    &-flex
      flex 1
    &-title
      padding 24px 20px 4px 20px
      font-weight bold
      font-size 16px
    &-leftcontent
      display flex
      flex-wrap wrap
    &-item
      flex 0 0 20%
      padding 20px 0
      font-size 14px
    &-leftitem
      padding-left 20px
      color  #909399
    &-rightcontent
      margin-right 20px
      width 150px
      border-left 1px solid $bordercolor
      font-size 14px;
      text-align center
    &-num
      font-size 24px
      color #888
    &-text
      line-height 24px
    &-color
      margin-left 6px
      color: #555
.point-recharge
  &:hover
    color: #007fff

.meduimtxt
  padding-top 10px
  font-size 20px

.footer-box
  margin-top -100px

.el-table th>.cell
  &:first-child
    padding-left 10px

.paddmo
  padding 20px 20px 30px
  background-color #fff
</style>
