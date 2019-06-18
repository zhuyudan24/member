<template>
  <div>
    <div>
      <vue-gic-group-people
      :projectName="projectName"
      :useId="useId"
      :hasSearchData="hasSearchData"
      :sceneValue="sceneValue"
      ref="peopleFilter"
      :isAdd="operateType"
      @findFilter="findFilter"
      @getBackData="getBackData"
      @editHide="editHide"
      @editShow="editShow"
      @hideBtn="hideBtn"
    ></vue-gic-group-people>
    <div class="people-button">
      <el-button size="small" type="primary" @click="getData">确定</el-button>
      <el-button size="small" @click="cancelFilter">取消</el-button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'people',

  data() {
    return {
      //  可传参数
      projectName: "",  // 当前项目名
      sceneValue: "member", // 场景值
      useId: "", // 模板id
      hasSearchData: "", // 当前页回显的数据(接口返回)
      operateType: true, // 编辑的时候是false 新增是true 例如列表筛选是开始true 编辑改成false
      toggleTag: false, // 控制(确认取消)按钮显示的参数,仅供参考,可自行修改
      saveTag: false // 控制(保存)按钮显示的参数,仅供参考,可自行修改
    };
  },
  beforeMount() {
    //  (如果需要传递数据)请求的数据最好在这里写
  },
  methods: {
    //  父组件调用子组件方法,触发父组件事件
    getData() {
      this.$refs.peopleFilter.confirmSet();
    },
    //  子组件触发父组件事件,返回过滤条件数据
    findFilter(value) {
      var that = this;
    },
    //  取消
    cancelFilter() {
      this.$refs.peopleFilter.cancelSet();
    },
    //  获取需要回显的数据, 供保存时候使用
    getBackData(val) {
      this.getSaveData = val;
    },
    //  显示编辑,保存按钮隐藏,确认按钮显示 (子组件会调用)
    editShow() {
      var that = this;
      that.toggleTag = true;
      that.saveTag = false;
    },
    //  显示保存按钮,隐藏确认按钮显示  (子组件会调用)
    editHide() {
      var that = this;
      that.toggleTag = false;
      that.saveTag = true;
    },
    //  隐藏保存按钮和确认按钮  (子组件会调用)
    //  传个参数给父组件 来查数据
    hideBtn(refresh) {
      if (refresh === 0) {
        this.memberSearchStr = -1;
        this.toggleTag = false;
      }
    },
    //  保存当前模板,对接保存接口
    saveTempData() {
      var that = this;
    }
  }
};
</script>
