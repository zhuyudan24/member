<template>
  <div class="memebr-count">
    <span v-if="memberType == 1">会员共{{wxMember}}人</span>
    <span v-if="memberType == 2">会员共{{posMember}}人</span>
    <span v-if="memberType == 3">会员共{{ecommerceMember}}人</span>
    <span v-if="memberType == 4">会员共{{ecommerceBuyer}}人</span>
  </div>
</template>

<script>
import { doFetch } from "../../../components/axios/api";
import url from "../../../components/axios/url";
import {
  checkFalse,
  checkStatus
} from "../../../../static/js/checkStatus";
export default {
  props: {
    memberType: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      wxMember: 0,
      posMember: 0,
      ecommerceMember: 0,
      ecommerceBuyer: 0
    };
  },
  methods: {
    getMemberCount() {
      doFetch(url.memberCount)
        .then(res => {
          if (res.data.errorCode === 0) {
            let temp = res.data.result;
            this.wxMember = temp.wxMember;  微信会员
            this.posMember = temp.posMember;  pos会员
            this.ecommerceMember = temp.ecommerceMember;  电商会员
            this.ecommerceBuyer = temp.ecommerceBuyer;  电商买家
          } else {
            checkFalse(res.data.message);
          }
        })
        .catch(err => {
          checkStatus(err);
        });
    }
  },
  created() {
    this.getMemberCount();
  }
};
</script>

<style lang="stylus">
.memebr-count {
  display: inline-block;
  height: 40px;
  line-height: 40px;

  span {
    margin-right: 10px;
  }
}
</style>
