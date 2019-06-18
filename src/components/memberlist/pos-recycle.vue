<template>
  <div
    class="member-return"
    :style="{ height: bodyHeight - 64 + 'px'}"
  >
    <div class="member-container">
      <nav-path :navpath="navpath"></nav-path>
      <div class="return-container">
        <div class="handler">
          <p
            class="multiple"
            v-if="multipleList.length == page.pageSize"
          >
            <span v-if="selectAll == false">已勾选本页 {{ multipleList.length }} 个会员，</span>
            <span v-else>已勾选 {{ page.totalCount }} 个会员，</span>
            <span
              @click="selectAllmultipleList"
              class="multiple-all pointer"
              v-if="selectAll == false"
            >勾选全部 {{ page.totalCount }} 个会员</span>
            <span
              @click="selectAllmultipleList"
              class="multiple-all pointer"
              v-else
            >取消勾选</span>
          </p>
          <div class="handler-search">
            会员共{{page.totalCount}}人
            <!-- <Navbar :memberType="1"></Navbar> -->
            <el-input
              v-model="phoneNameNick"
              maxlength="32"
              placeholder="输入手机号码"
              @keyup.native.enter="handleSearch"
              style="width: 249px;"
              clearable
            >
              <i
                slot="prefix"
                class="el-input__icon el-icon-search"
              ></i>
            </el-input>

            <div class="handler-setting">
              <el-select
                v-model="batchValue"
                placeholder="批量操作"
                @change="handleFocusBatch"
                style="width: 130px"
                @visible-change="handleVisibleBatch"
              >
                <el-option
                  key="mainstore"
                  label="修改主门店"
                  value="mainstore"
                ></el-option>
                <!-- <el-option
                  key="store"
                  label="修改协管门店"
                  value="store"
                ></el-option> -->
              </el-select>
              <el-popover
                placement="top-start"
                title=""
                width="450"
                trigger="hover"
                @show="callProcess"
              >
                <div v-if="processList.length > 0">
                  <div
                    v-for="(item, index) in processList"
                    :key="index"
                  >
                    <span class="process-span">{{item.name}}</span>
                    <div style="display: inline-block; width: 300px">
                      <el-progress :percentage="item.taskCount == 0 ? 100 : (+((item.finishCount*100/item.taskCount).toFixed(2)))"></el-progress>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  style="text-align: center;"
                >
                  暂无批量处理数据
                </div>
                <el-badge
                  slot="reference"
                  :is-dot="isdot"
                  class="item"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-time"
                    style="width: 32px; line-height: 30px; padding: 0px;"
                  ></el-button>
                </el-badge>
              </el-popover>

            </div>
          </div>

          <div class="tablecontent">
            <el-table
              :data="memberData"
              v-loading="load"
              tooltip-effect="dark"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              @sort-change='sortChange'
            >
              <el-table-column
                type="selection"
                width="50"
              > </el-table-column>
              <el-table-column
                label="基本信息"
                prop="name"
              >
                <template slot-scope="scope">
                  <div
                    @click="linkDetail(scope.row.memberId)"
                    style="cursor: pointer;"
                    class="tablecontent-cell"
                  >
                    <el-popover
                      placement="top-start"
                      width="400"
                      height="180"
                      trigger="hover"
                      @show="showSingleInfo(scope.row.memberId)">
                      <div
                        class="pointer"
                        @click="linkDetail(scope.row.memberId)"
                      >
                        <div class="singelinfo">
                          <div class="singelinfo-img"><img
                              width="100"
                              height="100"
                              :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : './static/img/default.png'"
                              alt=""
                            ></div>
                          <div class="singelinfo-content pLeft10 pRight10">
                            <span class="lheigth0">{{ scope.row.memberName }}
                              <span
                                :title="singleInfo.status == 0 ? '取消关注公众号' : singleInfo.status == 1 ? '已关注公众号' : '未关注公众号'"
                                class="channelicon fr"
                                :class="singleInfo.status == 0 ? 'gzhiconcanclegray' : singleInfo.status == 1 ? 'gzhicon' : 'gzhicongray'"
                              ></span>
                              <span
                                :title="singleInfo.wxStatus == 0 ? '未使用小程序' : singleInfo.wxStatus == 1 ? '使用过小程序' : ''"
                                class="channelicon fr mr6"
                                :class="singleInfo.wxStatus == 0 ? 'xcxicongray' : singleInfo.wxStatus == 1 ? 'xcxicon' : ''"
                              ></span>
                            </span>
                            <p class="lheigth0">
                              <span class="evl-right">{{ singleInfo.sex}}</span>
                              <span class="evl-right">{{ singleInfo.age }}</span>
                              <span :title="singleInfo.cardNo">{{ singleInfo.cardNo | formatCardName }}</span></p>
                            <p class="lheigth0"><span>{{ singleInfo.mainStoreName }}</span></p>
                            <div class="singelinfo-cost">
                              <div class="singelinfo-costitem">
                                <p>{{ singleInfo.costFee }}</p>
                                <p>消费总额</p>
                              </div>
                              <div class="singelinfo-costitem">
                                <p>{{ singleInfo.costTimes }}</p>
                                <p>消费次数</p>
                              </div>
                              <div class="singelinfo-costitem">
                                <p>{{ singleInfo.lastCost }}</p>
                                <p>最近消费</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="singelinfo-jl mBottom20 mTop20">
                          <a class="singelinfo-jlitem">消费记录 ({{ singleInfo.numOfSale }})</a>
                          <a class="singelinfo-jlitem">营销记录 ({{ singleInfo.numOfmarket }})</a>
                          <a class="singelinfo-jlitem">卡券记录 ({{ singleInfo.couponCount }})</a>
                        </div>
                      </div>
                      <span slot="reference" class="member-span"><img
                          class="tablecontent-cellimg mr6"
                          width="60"
                          height="60"
                          :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : './static/img/default.png'"
                          alt=""
                        ></span>
                    </el-popover>
                    <span class="fix-block">{{ scope.row.memberName | formatMember }}</span>
                  </div>
                </template>
              </el-table-column>

              <!-- 等级 -->
              <el-table-column
                label="会员等级"
                prop="grade"
              >
                <template slot-scope="scope">
                  <div>{{ scope.row.gradeName ? scope.row.gradeName : '--' }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
              >
                <template slot-scope="scope">
                  <span>
                    <span
                      :title="scope.row.wxStatus == 0 ? '未使用小程序' : scope.row.wxStatus == 1 ? '已使用小程序' : ''"
                      class="channelicon"
                      :class="scope.row.wxStatus == 0 ? 'xcxicongray' : scope.row.wxStatus == 1 ? 'xcxicon' : ''"
                    ></span>
                    <span
                      :title="scope.row.status == 0 ? '取消关注公众号' : scope.row.status == 1 ? '已关注公众号' : '未关注公众号'"
                      class="channelicon"
                      :class="scope.row.status == 0 ? 'gzhiconcanclegray' : scope.row.Status == 1 ? 'gzhicon' : 'gzhicongray'"
                    ></span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="消费总额"
                prop="costFee">
                <template slot-scope="scope">
                  <div>{{ scope.row.costFee !== null ? scope.row.costFee : '--' }}</div>
                </template>              
              </el-table-column>
              <el-table-column
                label="消费次数"
                prop="costTimes"
              >
                <template slot-scope="scope">
                  {{scope.row.costTimes}}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="operate">
                    <router-link
                      :to="{path:'/posmemberDetail',query:{memberId: scope.row.memberId , channel: 'wxMember'}}"
                      class="operate-btn"
                    >查看</router-link>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div
              class="page mTop20 mBottom40"
              v-if="memberData.length > 0"
            >
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[20, 40, 60, 80]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="page.totalCount"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <!--自定义字段列表-弹框-->
        <el-dialog
          title="自定义字段列表"
          :visible.sync="dialogFieldVisible"
          width="600px"
        >
          <div class="checkwtip mBottom10">请选择您想显示的列表详细信息，最多勾选8个选项，已经勾选了 <span class="curcheck">{{ checkedFields.length }}</span> 个</div>
          <el-checkbox-group
            v-model="checkedFields"
            :min="3"
            :max="8"
          >
            <div class="checkwrap">
              <div
                class="checkwrap-item lheigth30"
                v-for="(item, index) in memberFields"
                :key="index"
              >
                <el-checkbox
                  :label="item"
                  :key="item"
                >{{item | formatFieldName }}</el-checkbox>
              </div>
            </div>
          </el-checkbox-group>

          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogFieldVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitFields"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!--自定义字段列表-弹框-end-->

        <!--批量调整积分-弹框-->
        <el-dialog
          title="批量调整积分"
          :visible.sync="dialogIntegralVisible"
          width="600px"
          @close="closeIntegral('IntegralForm')"
        >
          <el-form
            ref="IntegralForm"
            :model="IntegralForm"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item
              label="调整积分"
              prop="editType"
            >
              <el-radio-group v-model="IntegralForm.editType">
                <el-radio :label=1>增加积分</el-radio>
                <el-radio :label=2>扣除积分</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="调整额度"
              prop="accumulatPoints"
            >
              <el-input-number
                v-model="IntegralForm.accumulatPoints"
                controls-position="right"
                :min="1"
                :max="100000"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              label="原因备注"
              prop="remark"
            >
              <el-input
                type="textarea"
                v-model="IntegralForm.remark"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="原始成本主题"
              v-if="integralFlag == 'gic'"
            >
              <el-select
                prop="settlementStoreId"
                v-model="IntegralForm.settlementStoreId"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="handleKeyup"
                :loading="loading"
              >
                <el-option
                  v-for="item in storeList"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogIntegralVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitIntegral('IntegralForm')"
            >确 定</el-button>
          </div>
        </el-dialog>
        <!--批量调整积分-弹框-end-->

        <!--批量调整会员等级-弹框-->
        <el-dialog
          title="批量调整会员等级"
          :visible.sync="dialogGradeVisible"
          width="600px"
        >
          <el-form
            ref="gradeForm"
            :model="gradeForm"
            :rules="graderules"
            label-width="120px"
          >
            <el-form-item
              label="调整后等级"
              prop="gradeId"
            >
              <el-select
                v-model="gradeForm.gradeId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in memberGrade"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="原因备注"
              prop="remark"
            >
              <el-input
                type="textarea"
                v-model="gradeForm.remark"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogGradeVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitGrade('gradeForm')"
            >确 定</el-button>
          </div>
        </el-dialog>
        <!--批量调整会员等级-弹框-end-->

        <!--修改主门店-弹框-->
        <el-dialog
          title="修改主门店"
          :visible.sync="dialogMainstoreVisible"
          width="600px"
        >
          <el-form
            ref="mainstoreForm"
            :model="mainstoreForm"
            :rules="mainstorerules"
            label-width="120px"
          >
            <el-form-item
              label="选择主门店"
              prop="mainOptType"
            >
              <el-radio-group
                v-model="mainstoreForm.mainOptType"
                @change="handleStore"
              >
                <p class="lheigth40">
                  <el-radio :label=1>替换为最新协管的门店 </el-radio>
                </p>
                <p class="lheigth40">
                  <el-radio :label=2>替换为最新协管的自营门店</el-radio>
                </p>
                <p class="lheigth40">
                  <el-radio :label=3>替换为最新协管的自营/联营门店</el-radio>
                </p>
                <p class="lheigth40">
                  <el-radio :label=4>自定义主门店</el-radio>
                </p>
              </el-radio-group>
              <p
                style="line-height: 0;margin-left: 22px;"
                v-if="storeName !== ''"
              >{{ storeName }}<span
                  class="ml15 pointer"
                  @click="changeStore"
                >修改</span></p>
              <p
                style="line-height: 0;margin-left: 22px;"
                v-else
              ><span
                  class="pointer"
                  @click="changeStore"
                >点击选择主门店</span></p>
            </el-form-item>
            <el-form-item
              label="原因备注"
              prop="remark"
            >
              <el-input
                type="textarea"
                v-model="mainstoreForm.remark"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogMainstoreVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitMainStore('mainstoreForm')"
            >确 定</el-button>
          </div>
        </el-dialog>
        <!--修改主门店-弹框-end-->

        <!--批量修改协管门店-弹框-->
        <el-dialog
          title="批量修改协管门店"
          :visible.sync="dialogSubStoreVisible"
          width="800px"
        >
          <el-form
            ref="storeForm"
            :model="storeForm"
            :rules="storerules"
            label-width="120px">
            <p class="ml15">当前选择{{multipleList.length}}个会员</p>

            <el-form-item
              label="选择协管门店"
              prop="subOptType">
              <el-radio
                @change="changeSubStore"
                :label=1
                v-model="storeForm.subOptType">
                增加协管门店
                <span style="color: #000;">{{ storeForm.addSubStoreName }}</span>
                <span
                  style="color: #000;"
                  v-if="storeForm.subOptType == 1"
                  class="pointer"
                  @click="changeStore"
                >选择门店</span>
              </el-radio>

              <!-- 修改协管门店 -->
              <!-- <p class="lheigth40">
                <el-radio
                  @change="changeSubStore"
                  :label=2
                  v-model="storeForm.subOptType">
                  将协管门店
                </el-radio>
                <el-select
                  v-model="storeForm.premodefiySubStoreId"
                  placeholder="请选择"
                  :disabled="storeForm.subOptType == 2 ? false : true">
                  <el-option
                    v-for="item in subStoreList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId"
                  ></el-option>
                </el-select>
                修改为 {{ storeForm.modefiySubStoreName }}<span
                  v-if="storeForm.subOptType == 2"
                  class="pointer"
                  @click="changeStore"
                >选择门店</span>
              </p> -->

              <!-- 删除协管门店 -->
              <!-- <p class="lheigth40">
                <el-radio
                  @change="changeSubStore"
                  :label=3
                  v-model="storeForm.subOptType">
                    将协管门店
                  <el-select
                    v-model="storeForm.deleteSubStoreId"
                    placeholder="请选择"
                    :disabled="storeForm.subOptType == 3 ? false : true">
                    <el-option
                      v-for="item in subStoreList"
                      :key="item.storeId"
                      :label="item.storeName"
                      :value="item.storeId">
                    </el-option>
                </el-select>
                  <span style="color: #000;cursor: default;"> 删除</span>
                </el-radio>
              </p> -->
            
            </el-form-item>

            <el-form-item
              label="原因备注"
              prop="remark"
            >
              <el-input
                type="textarea"
                v-model="storeForm.remark"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogSubStoreVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitStore('storeForm')"
            >确 定</el-button>
          </div>
        </el-dialog>
        <!--批量修改协管门店-弹框-end-->

        <!--查看批量处理进度-弹框-->
        <el-dialog
          title="查看批量处理进度"
          :visible.sync="dialogProcessVisible"
          width="600px"
          @close="closeProcess"
        >
          <div
            class="process"
            v-for="(item, index) in processList"
            :key="index"
          >
            <span class="process-name">{{ item.name }}</span><span class="process-status">
              <el-progress :percentage="item | formatProcess"></el-progress>
            </span>
          </div>
          <p v-if="processList.length <= 0">暂无批量处理</p>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogProcessVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogProcessVisible = false"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!--查看批量处理进度-弹框-end-->

        <vue-gic-store
          :projectName="projectName"
          :showStoreDialog="showStoreDialog"
          @selectStore="selectStore"
        ></vue-gic-store>
      </div>
    </div>
    <div class="foot-add">
      <vue-gic-footer></vue-gic-footer>
    </div>
  </div>
</template>

<script>
import PosReturn from "./pos-recycle";
export default { ...PosReturn };
</script>

<style lang="stylus">
.return-container {
  margin: 24px;
  padding: 20px;
  background-color: #fff;

  .handler-setting {
    float: right;
  }

  .tablecontent {
    margin-top: 20px;
  }

  .foot-add {
    margin-top: -100px;
  }
}

p {
  margin: 0;
}

.member-container {
  min-height: 100%;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.foot-add {
  margin-top: -100px;
}
</style>
