<template>
  <div class="wechat-gic">
    <div class="min100">
      <nav-path :navpath="navpath">
        <router-link
          to="/wechatmembers/memberSetting"
          tag="span"
          class="wechat-setting member-wechat-set-primary"
          slot="member"
        >设 置</router-link>
      </nav-path>
      <div class="wechat-part">
        <div class="gic-people">
          <h2 class="adpot-container">
            适用人群
          </h2>
          <div class="people-box">
            <vue-gic-people
              :sceneValue="sceneValue"
              ref="peopleFilter"
              :isAdd="true"
              @findFilter="findFilter"
              @editHide="editHide"
              @editShow="editShow"
              @hideBtn="hideBtn"
            >
            </vue-gic-people>
            <div
              class="people-button"
              v-if="toggleTag"
            >
              <el-button
                size="small"
                type="primary"
                @click="getData"
              >确定</el-button>
              <el-button
                size="small"
                @click="cancelFilter"
              >取消</el-button>
            </div>
          </div>
        </div>
        <div class="handler">
          <p
            class="multiple"
            v-if="multipleList.length == page.pageSize">
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
              v-model="phoneNameCard"
              placeholder="输入会员姓名/昵称/手机号码"
              @keyup.native.enter="handleSearch"
              style="width: 249px;"
              maxlength="32"
              clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <div class="handler-setting">
              <el-select
                v-model="batchValue"
                placeholder="批量操作"
                @change="handleFocusBatch"
                style="width: 130px"
                @visible-change="handleVisibleBatch">
                <el-option
                  key="integral"
                  label="调整积分"
                  value="integral"
                ></el-option>
                <el-option
                  key="grade"
                  label="调整会员等级"
                  value="grade"
                ></el-option>
                <el-option
                  key="mainstore"
                  label="修改主门店"
                  value="mainstore"
                ></el-option>
                <el-option
                  key="store"
                  label="修改协管门店"
                  value="store"
                ></el-option>
              </el-select>
              <el-button
                type="primary"
                class="member-wechat-setting"
                icon="el-icon-setting"
                @click="handleMemberFields"
              ></el-button>
              <el-popover
                placement="top-start"
                :width="popWidth"
                trigger="hover"
                v-model="visible"
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
                    class="member-wechat-timer"
                    icon="el-icon-time"
                  ></el-button>
                </el-badge>
              </el-popover>
            </div>
          </div>

          <div class="tablecontent">
            <el-table
              v-loading="load"
              :data="memberData"
              tooltip-effect="dark"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              @sort-change='sortChange'>
              <el-table-column
                type="selection"
                width="50"
                fixed></el-table-column>

              <div
                v-for="(item, index) in fieldsStr"
                :key="index">
                <el-table-column
                  :fixed="item === 'name'"
                  v-if="item == 'name' || item == 'grade' || item == 'status' || item == 'channel' || item == 'createCardStoreName' || item == 'cardNo' || item == 'forzenStatus' ||  item == 'mainStoreName'"
                  :prop="item"
                  :label="item | formatField"
                  width="160"
                >
                  <template slot-scope="scope">
                    <div
                      v-if="item == 'name'"
                      @click="linkDetail(scope.row.memberId)"
                      style="cursor: pointer;"
                      class="tablecontent-cell">
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
                    <span v-else-if="item == 'grade'">{{ scope.row.gradeName ? scope.row.gradeName : '-' }}</span>
                    <span v-else-if="item == 'status'">
                      <span
                        :title="scope.row.wxStatus == 0 ? '未使用小程序' : scope.row.wxStatus == 1 ? '已使用小程序' : ''"
                        class="channelicon"
                        :class="scope.row.wxStatus == 0 ? 'xcxicongray' : scope.row.wxStatus == 1 ? 'xcxicon' : ''"
                      ></span>
                      <span
                        :title="scope.row.status == 0 ? '取消关注公众号' : scope.row.status == 1 ? '已关注公众号' : '未关注公众号'"
                        class="channelicon"
                        :class="scope.row.status == 0 ? 'gzhiconcanclegray' : scope.row.status == 1 ? 'gzhicon' : 'gzhicongray'"
                      ></span>
                    </span>
                    <span v-else-if="item == 'channel'">
                      <span
                        class="channelicon"
                        :class="scope.row.channelTaobao == 0 ? 'taobaoicongray' : scope.row.channelTaobao == 1 ? 'taobaoicon' : ''"
                      ></span>
                      <span
                        class="channelicon"
                        :class="scope.row.channelJd == 0 ? 'jdicongray' : scope.row.channelJd == 1 ? 'jdicon' : ''"
                      ></span>
                      <span
                        class="channelicon"
                        :class="scope.row.channelWei == 0 ? 'vipicongray' : scope.row.channelWei == 1 ? 'vipicon' : ''"
                      ></span>
                    </span>
                    <div v-if="item == 'crateCardDateString'">
                      <div> {{ scope.row.crateCardDateString | formatTimeYMD }} </div>
                      <div> {{ scope.row.crateCardDateString | formatTimeHMS }} </div>
                    </div>
                    <div v-else-if="item == 'createTime'">
                      <div> {{ scope.row.createTime | formatTimeYMD }} </div>
                      <div> {{ scope.row.createTime | formatTimeHMS }} </div>
                    </div>
                    <div v-else-if="item == 'attentionDate'">
                      <div>{{ scope.row.attentionTime | formatTimeYMD }}</div>
                      <div>{{ scope.row.attentionTime | formatTimeHMS }}</div>
                    </div>
                    <!-- 消费总额 实际是应收 -->
                    <span v-else-if="item == 'costAll'">
                      {{ scope.row.costFee }}
                    </span>
                    <div v-else-if="item == 'costTimes'">
                      <div>{{ scope.row.costTimes | formatTimeYMD }}</div>
                      <div>{{ scope.row.costTimes | formatTimeHMS }}</div>
                    </div>
                    <span v-else-if="item == 'lastCostTime'">
                      {{ scope.row.lastCostTime }}
                    </span>
                    <span v-else-if="item == 'lastCost'">
                      {{ scope.row.lastCost }}
                    </span>
                    <span v-else-if="item == 'avgCost'">
                      {{ scope.row.avgCost }}
                    </span>
                    <span v-else-if="item == 'avgNumber'">
                      {{ scope.row.avgNumber }}
                    </span>
                    <span v-else-if="item == 'costCategory'">
                      {{ scope.row.costCategory }}
                    </span>
                    <span v-else-if="item == 'discountRate'">
                      {{ scope.row.discountRate }}
                    </span>
                    <div v-else-if="item == 'cancelAttentionTime'">
                      <div> {{ scope.row.cancelAttentionTime | formatTimeYMD }} </div>
                      <div> {{ scope.row.cancelAttentionTime | formatTimeHMS }} </div>
                    </div>
                    <span v-else-if="item == 'age'">
                      {{ scope.row.age }}
                    </span>
                    <span v-else-if="item == 'birthday'">
                      {{ scope.row.birthdayMD }}
                    </span>
                    <span v-else-if="item == 'storedValueAll'">
                      {{ scope.row.storedValueAll }}
                    </span>
                    <span v-else-if="item == 'storedValueCurrent'">
                      {{ scope.row.storedValueCurrent }}
                    </span>
                    <span v-else-if="item == 'pointsAll'">
                      {{ scope.row.pointsAll }}
                    </span>
                    <span v-else-if="item == 'pointsCurrent'">
                      {{ scope.row.pointsCurrent }}
                    </span>
                    <span v-else-if="item == 'mainStoreName'">
                      {{ scope.row.mainStoreName }}
                    </span>
                    <span v-else-if="item == 'createCardStoreName'">
                      {{ scope.row.openStoreName }}
                    </span>
                    <span v-else-if="item == 'cardNo'">
                      {{ scope.row.cardNo }}
                    </span>
                    <span v-else-if="item == 'highCost'">
                      {{ scope.row.highCost }}
                    </span>
                    <div v-else-if="item == 'frozenStatus'">
                      <span
                        class="dm-status--success"
                        v-if="scope.row.frozenStatus == 0"
                      >正常</span>
                      <span
                        class="dm-status--warning"
                        v-if="scope.row.frozenStatus == 1"
                      >冻结</span>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  v-else
                  :prop="item"
                  :label="item | formatField"
                  sortable='custom'
                  width="200px"
                >
                  <template slot-scope="scope">
                    <div
                      v-if="item == 'name'"
                      class="tablecontent-cell"
                      @click="linkDetail(scope.row.memberId)">
                      <el-popover
                        placement="top-start"
                        width="400"
                        height="180"
                        trigger="hover"
                        @show="showSingleInfo(scope.row.memberId)">
                        <div class="pointer">
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
                                <span class="evl-right">{{ singleInfo.sex }} </span><span class="evl-right">{{ singleInfo.age }} </span><span :title="singleInfo.cardNo">{{ singleInfo.cardNo | formatCardName }}</span></p>
                              <p class="lheigth0"><span>{{ singleInfo.mainStoreName }}</span></p>
                              <div class="singelinfo-cost">
                                <div class="singelinfo-costitem">
                                  <!-- 调整 跑数据的时候取错了 这里调换一下 -->
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
                            :src="scope.row.thirdImgUrl ? scope.row.thirdImgUrl : ''"
                            alt=""
                          ></span>
                      </el-popover>
                      <span class="fix-block">{{ scope.row.memberName | formatMember }}</span>
                    </div>
                    <span v-else-if="item == 'grade'">{{ scope.row.gradeName }}</span>
                    <span v-else-if="item == 'status'">
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
                    <span v-else-if="item == 'channel'">
                      <span
                        class="channelicon"
                        :class="scope.row.channelTaobao == 0 ? 'taobaoicongray' : scope.row.channelTaobao == 1 ? 'taobaoicon' : ''"
                      ></span>
                      <span
                        class="channelicon"
                        :class="scope.row.channelJd == 0 ? 'jdicongray' : scope.row.channelJd == 1 ? 'jdicon' : ''"
                      ></span>
                      <span
                        class="channelicon"
                        :class="scope.row.channelWei == 0 ? 'vipicongray' : scope.row.channelWei == 1 ? 'vipicon' : ''"
                      ></span>
                    </span>
                    <div v-if="item == 'crateCardDateString'">
                      <div> {{ scope.row.crateCardDateString | formatTimeYMD }} </div>
                      <div> {{ scope.row.crateCardDateString | formatTimeHMS }} </div>
                    </div>
                    <div v-else-if="item == 'createTime'">
                      <div> {{ scope.row.createTime | formatTimeYMD }} </div>
                      <div> {{ scope.row.createTime | formatTimeHMS }} </div>
                    </div>
                    <div v-else-if="item == 'attentionDate'">
                      <div>{{ scope.row.attentionTime | formatTimeYMD }}</div>
                      <div>{{ scope.row.attentionTime | formatTimeHMS }}</div>
                    </div>
                    <span v-else-if="item == 'costAll'">
                      {{ scope.row.costFee }}
                    </span>
                    <span v-else-if="item == 'costTimes'">
                      {{ scope.row.costTimes }}
                    </span>
                    <span v-else-if="item == 'lastCostTime'">
                      {{ scope.row.lastCostTime }}
                    </span>
                    <span v-else-if="item == 'lastCost'">
                      {{ scope.row.lastCost }}
                    </span>
                    <span v-else-if="item == 'avgCost'">
                      {{ scope.row.avgCost }}
                    </span>
                    <span v-else-if="item == 'avgNumber'">
                      {{ scope.row.avgNumber }}
                    </span>
                    <span v-else-if="item == 'costCategory'">
                      {{ scope.row.costCategory }}
                    </span>
                    <span v-else-if="item == 'discountRate'">
                      {{ scope.row.discountRate }}
                    </span>
                    <div v-else-if="item == 'cancelAttentionTime'">
                      <div> {{ scope.row.cancelAttentionTime | formatTimeYMD }} </div>
                      <div> {{ scope.row.cancelAttentionTime | formatTimeHMS }} </div>
                    </div>
                    <span v-else-if="item == 'age'">
                      {{ scope.row.age }}
                    </span>
                    <span v-else-if="item == 'birthday'">
                      {{ scope.row.birthdayMD }}
                    </span>
                    <span v-else-if="item == 'storedValueAll'">
                      {{ scope.row.storedValueAll }}
                    </span>
                    <span v-else-if="item == 'storedValueCurrent'">
                      {{ scope.row.storedValueCurrent }}
                    </span>
                    <span v-else-if="item == 'pointsAll'">
                      {{ scope.row.pointsAll }}
                    </span>
                    <span v-else-if="item == 'pointsCurrent'">
                      {{ scope.row.pointsCurrent }}
                    </span>
                    <span v-else-if="item == 'mainStoreName'">
                      {{ scope.row.mainStoreName }}
                    </span>
                    <span v-else-if="item == 'createCardStoreName'">
                      {{ scope.row.openStoreName }}
                    </span>
                    <span v-else-if="item == 'cardNo'">
                      {{ scope.row.cardNo }}
                    </span>
                    <span v-else-if="item == 'costFeePaid'">
                      {{ scope.row.costFeePaid }}
                    </span>
                    <span v-else-if="item == 'lastCostPaid'">
                      {{ scope.row.lastCostPaid }}
                    </span>
                    <span v-else-if="item == 'highCost'">
                      {{ scope.row.highCost }}
                    </span>
                    <span v-else-if="item == 'highCostPaid'">
                      {{ scope.row.highCostPaid }}
                    </span>
                    <div v-else-if="item == 'frozenStatus'">
                      <span
                        class="dm-status--success"
                        v-if="scope.row.frozenStatus == 0"
                      >正常</span>
                      <span
                        class="dm-status--warning"
                        v-if="scope.row.frozenStatus == 1"
                      >冻结</span>
                    </div>
                    <!-- <span v-else>--</span> -->
                  </template>
                </el-table-column>
              </div>

              <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                  <div class="operate">
                    <el-button type="text" @click="linkDetail(scope.row.memberId)">查看</el-button>
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
          :visible.sync="dilogFieldVisible"
          width="600px">
          <div class="checkwtip mBottom10">请选择您想显示的列表详细信息，最多勾选8个选项，已经勾选了 <span class="curcheck">{{ checkedFields.length }}</span> 个</div>
          <el-checkbox-group
            v-model="checkedFields"
            :min="0"
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
            class="dilog-footer"
          >
            <el-button @click="dilogFieldVisible = false">取 消</el-button>
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
          :visible.sync="dilogIntegralVisible"
          width="600px"
          @close="closeIntegral('IntegralForm')">
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
                style="width: 400px;"
                controls-position="right"
                :min="1"
                :max="999999"
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
              label="原始成本主体"
              prop="settlementStoreId"
              v-if="integralFlag == 'gic' && IntegralForm.editType == 1"
            >
              <el-select
                prop="settlementStoreId"
                style="width: 400px;"
                v-model="IntegralForm.settlementStoreId"
                filterable
                remote
                reserve-keyword
                placeholder="请输入原始成本主体"
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
              <p style="color: ; font-size: 12px;">注：除输入选择具体门店选择外，还可输入总部，记总部名下。</p>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dilog-footer"
          >
            <el-button @click="dilogIntegralVisible = false">取 消</el-button>
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
          :visible.sync="dilogGradeVisible"
          width="600px">
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
                style="width: 400px;"
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
                style="width: 400px;"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dilog-footer"
          >
            <el-button @click="dilogGradeVisible = false">取 消</el-button>
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
          :visible.sync="dilogMainstoreVisible"
          width="600px">
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
                  <span
                    class="member-store-name"
                    v-if="storeName"
                    @click="changeStore">
                    {{storeName}}
                  </span>
                </p>
              </el-radio-group>

            </el-form-item>
            <el-form-item
              label="原因备注"
              prop="remark"
            >
              <el-input
                type="textarea"
                v-model="mainstoreForm.remark"
                style="width: 400px;"
              ></el-input>
            </el-form-item>
          </el-form>

          <div
            slot="footer"
            class="dilog-footer"
          >
            <el-button @click="dilogMainstoreVisible = false">取 消</el-button>
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
          :visible.sync="dilogSubStoreVisible"
          width="800px">
          <el-form
            ref="storeForm"
            :model="storeForm"
            :rules="storerules"
            label-width="120px"
          >
            <p class="ml15">当前选择{{multipleList.length}}个会员</p>
            <el-form-item
              label="选择协管门店"
              prop="subOptType"
            >
              <el-radio
                @change="changeSubStore"
                :label=1
                v-model="storeForm.subOptType"
              >增加协管门店
                <span style="color: #000;">{{ storeForm.addSubStoreName }}</span>
                <span
                  style="color: #000;"
                  v-if="storeForm.subOptType == 1"
                  class="pointer"
                  @click="changeStore"
                >选择门店</span>
              </el-radio>
              <p>
                <el-radio
                  @change="changeSubStore"
                  :label=2
                  v-model="storeForm.subOptType"
                >将协管门店</el-radio>
                <el-select
                  v-model="storeForm.premodefiySubStoreId"
                  placeholder="请选择"
                  :disabled="storeForm.subOptType == 2 ? false : true"
                >
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
              </p>
              <el-radio
                @change="changeSubStore"
                :label=3
                v-model="storeForm.subOptType"
              >将协管门店
                <el-select
                  v-model="storeForm.deleteSubStoreId"
                  placeholder="请选择"
                  :disabled="storeForm.subOptType == 3 ? false : true"
                >
                  <el-option
                    v-for="item in subStoreList"
                    :key="item.storeId"
                    :label="item.storeName"
                    :value="item.storeId"
                  ></el-option>
                </el-select><span style="color: #000;cursor: default;"> 删除</span></el-radio>
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
            class="dilog-footer"
          >
            <el-button @click="dilogSubStoreVisible = false">取 消</el-button>
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
          :visible.sync="dilogProcessVisible"
          width="600px"
          @close="closeProcess">
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
            class="dilog-footer"
          >
            <el-button @click="dilogProcessVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dilogProcessVisible = false"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!--查看批量处理进度-弹框-end-->

        <vue-gic-store
          :projectName="projectName"
          :showStoreDialog="showStoreDialog"
          @selectStore="selectStore"
          :selectId="selectId"
        ></vue-gic-store>
      </div>
    </div>
    <div class="foot-add">
      <vue-gic-footer></vue-gic-footer>
    </div>
  </div>
</template>

<script>
import wechatmembers from './wechatmembers.js';
export default { ...wechatmembers };
</script>

<style lang="stylus">
.wechat-gic {
  height: 100%;

  .member-wechat-set-primary {
    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}

.wechat-part {
  padding: 24px 24px 0;

  .member-wechat-setting {
    position: relative;
    top: 2px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    padding: 0;
  }

  .member-wechat-timer {
    width: 32px;
    height: 32px;
    line-height: 32px;
    padding: 0;
  }
}

.handler {
  background-color: #fff;
  padding: 20px;

  .handler-search {
    margin-bottom: 20px;
  }

  .handler-setting {
    float: right;
    text-align: right;
  }

  .el-button+.el-button {
    margin-left: 0px;
  }
}

.operate-btn {
  color: #409eff;
}

.gic-people {
  position: relative;
  margin-bottom: 16px;
  min-height: 100px;
  background-color: #fff;

  .adpot-container {
    padding: 20px 0 20px 20px;
    font-size: 16px;
    line-height: 15px;
    font-weight: bold;
    border-bottom: 1px solid #dcdfe6;
  }

  .people-box {
    padding: 24px;
    background-color: #fff;
  }
}

.btn-filter {
  text-align: right;
  padding-right: 100px;
  margin-top: 10px;
  background-color: #fff;
}

.wechat-gic {
  .el-dialog {
    overflow: scroll;
  }
}

@media screen and (max-width: 1366px) {
  .wechat-gic {
    width: 1166px;
  }
}

.member-store-name {
  display: inline-block;
  vertical-align: middle;
  margin-left: 40px;
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
}
</style>
