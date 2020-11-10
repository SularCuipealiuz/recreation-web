<template>
  <section class="overflow-y-auto pb-16">
    <div class="banner">
      <img src="../assets/banner/place-holder-banner.png" alt="" />
    </div>
    <div class="px-3">
      <promo-detail-panel>
        <template v-slot:title>
          活动条件
        </template>
        <template v-slot:content-text>
          <div class="px-4" style="color: #97a4c5;">
            <v-row no-gutters class="caption">
              <div class="font-weight-bold text-left">活动时间：</div>
              <v-col cols="9" class="text-left">
                2020年10月25日-2020年10月31日
              </v-col>
            </v-row>
            <v-row no-gutters class="caption">
              <div class="font-weight-bold text-left">活动对象：</div>
              <v-col cols="9" class="text-left">
                2020年10月25日-2020年10月31日
              </v-col>
            </v-row>
            <v-row no-gutters class="caption">
              <div class="font-weight-bold text-left">活动内容：</div>
              <v-col cols="9" class="text-left">
                活动期间内，无论您是存款还是投注，只要达到一
                定额度，都可以获得隆源国际为您准备的双节红包
                机会有限不容错过哦！
              </v-col>
            </v-row>
          </div>
        </template>
      </promo-detail-panel>
      <promo-detail-panel>
        <template v-slot:title>
          活动
        </template>
        <template v-slot:content-text>
          <div class="px-4" style="color: #97a4c5;">
            <v-row no-gutters class="caption">
              <v-col cols="12" class="text-left">
                活动期间内累计存款达到相对应金额
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-slot:content-img>
          <v-row no-gutters class="caption">
            <v-col cols="12">
              <img v-holder="{ img: '100p' + 'x140' }" />
            </v-col>
          </v-row>
        </template>
      </promo-detail-panel>
      <promo-detail-panel>
        <template v-slot:title>
          活动规则
        </template>
        <template v-slot:content-text>
          <div class="px-4" style="color: #97a4c5;">
            <v-row no-gutters class="caption">
              <v-col cols="12" class="text-left">
                ・活动一与活动二的红包金额兼中兼得<br />
                ・单独活动中的红包金额无法重复领取<br />
                ・此活动无需申请,活动时间结束后系统将以红包优患券的形式发至您的站内信中;<br />
                ・此项优惠活动只针对娱乐性质的会员<br />
                ・隆源国际保留对本次活动的修改,修订和最终解释权,以及在无通知情況下修改本次活动的权利<br />
              </v-col>
            </v-row>
          </div>
        </template>
      </promo-detail-panel>
    </div>
  </section>
</template>

<script>
import PromoDetailPanel from "@/components/PromoDetailPanel";

export default {
  name: "PromoDetail",
  components: { PromoDetailPanel },
  mounted() {
    this.$store.dispatch("setMcPageTitle", "抽出您的专属福利");
  }
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;

  > img {
    width: 100%;
  }
}
</style>
