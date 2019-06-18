<template>
  <el-input
    ref="input"
    placeholder="输入会员姓名/昵称/手机号/卡号"
    clearable
    prefix-icon="el-icon-search"
    :style="stylelink"
    :value='value'
    @keyup.enter.native="handleSearch($event.target.value)"
  ></el-input>
</template>

<script>
export default {
  name: "searchinput",
  props: {
    value: {
      type: String
    },
    stylelink: {
      type: String,
      default: "width: 200px"
    }
  },
  methods: {
    handleSearch(value) {
      this.$emit("handleSearch", value);
    }
  }
};
</script>
