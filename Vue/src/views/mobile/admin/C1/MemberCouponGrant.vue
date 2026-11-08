<template>
  <div class="MemberCouponGrant">
    <div class="top">
      <div class="title">会员发券</div>
      <div class="sub">按卡券分别设置数量，可一次发放上千上万张</div>
    </div>
    <MemberCouponBatchGrant
      :uid="uid"
      :cid="cid"
      :sid="sid"
      :show="false"
      @success="grantSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { kxyk } from "smkj";
import MemberCouponBatchGrant from "@/views/com/coupon/MemberCouponBatchGrant.vue";

const route = useRoute();

const cid = computed(() => Number(route.params.cid || route.query.cid || 0));
const uid = computed(() => Number(route.params.uid || route.query.uid || 0));
const sid = computed(() => Number(route.query.sid || 0));

const grantSuccess = () => {
  kxyk.msg.success("已提交批量发放");
};
</script>

<style lang="stylus" scoped>
.MemberCouponGrant
  min-height 100vh
  background #f5f7fb
  .top
    padding 16px 14px 8px
    background #fff
    border-bottom 1px solid #e9edf3
    .title
      font-size 18px
      font-weight 700
      color #20242a
    .sub
      margin-top 4px
      color #7a8494
      font-size 12px
</style>
