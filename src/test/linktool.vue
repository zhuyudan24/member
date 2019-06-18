<template>
  <div class="linktools">
    <el-button type="primary" @click="open" @linkSelect="linkSelect">链接工具</el-button>
    <linktools :showType="showType" :linkVisible.sync="linkToolsVisible" />
  </div>
</template>

<script>
import Linktools from './linktools.vue';
export default {
  name: 'linktool',

  components: {
    Linktools
  },

  data() {
    return {
      projectName: 'member', // 当前项目
      linkToolsVisible: false,
      showType: 0
    };
  },

  methods: {
    open() {
      this.linkToolsVisible = true;
    },
  },
};
</script>
