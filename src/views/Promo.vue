<template>
  <section>
    <v-tabs center-active color="black" class="mb-1 tab-bar" v-model="tab">
      <v-tabs-slider color="custom-color"></v-tabs-slider>
      <v-tab v-for="e in tabList" :key="e" :ripple="false">{{ e }}</v-tab>
    </v-tabs>
    <v-tabs-items class="fill-height px-3 promo-list-panel pt-2" v-model="tab">
      <v-tab-item v-for="i in 3" :key="i">
        <promo-item
          :img-type="e.type"
          :date="e.date"
          :title="e.title"
          :id="e.id"
          :img="e.img"
          v-for="e in promoList"
          :key="e.id"
        ></promo-item>
      </v-tab-item>
    </v-tabs-items>
  </section>
</template>

<script>
import PromoItem from "@/components/PromoItem";

export default {
  name: "Promo",
  components: { PromoItem },
  mounted() {
    this.$store.dispatch("setMcPageTitle", this.$t("promo.promoCenter"));
  },
  data() {
    return {
      tab: "",
      tabList: ["全部优惠", "彩票", "电子", "体育", "真人", "测试"],
      promoList: [
        {
          id: "1",
          title: "標題001",
          time: "2020年10月25日~xxx",
          type: "hot",
          img: "xxx"
        },
        {
          id: "2",
          title: "標題002",
          time: "2020年10月25日~xxx",
          type: "fire",
          img: "xxx"
        },
        {
          id: "3",
          title: "標題003",
          time: "2020年10月25日~xxx",
          type: "recommend",
          img: "xxx"
        },
        {
          id: "4",
          title: "標題004",
          time: "2020年10月25日~xxx",
          type: "recommend",
          img: "xxx"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.tab-bar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.custom-color {
  background-image: linear-gradient(to right, #dccab8, #d2b496, #d2b496);
}

.promo-list-panel {
  max-height: calc(100% - 48px);
  overflow-y: scroll;
}
</style>
<style>
.v-tab {
  color: rgba(0, 0, 0, 0.24) !important;
}

.v-tab.v-tab--active {
  color: black !important;
}

.v-slide-group__prev.v-slide-group__prev--disabled {
  min-width: 12px !important;
  flex: 0 1 12px !important;
}
</style>
