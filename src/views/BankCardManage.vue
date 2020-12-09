<template>
  <section class="relative pt-2 fill-height">
    <div class="mb-2">
      <img
        class="place-holder"
        src="../assets/icons/default-bankcard.png"
        alt=""
      />
    </div>
    <div
      class="add-bankcard-panel py-7 d-flex justify-center align-center mx-4 white rounded-lg"
      @click="doAppendBankCard"
    >
      <v-icon>
        fal fa-plus
      </v-icon>
      <div class="ml-4">{{ $t("bankCardManage.addNewBankCard") }}</div>
    </div>
    <div class="bottom-fixed">
      <span class="caption"> 您还没有绑钉银行卡，请绑钉银行卡相关信息！ </span>
      <help-link></help-link>
    </div>
  </section>
</template>

<script>
import HelpLink from "@/components/HelpLink";

export default {
  name: "BankCardManage",
  components: { HelpLink },
  mounted() {
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("memberCenter.bankCardManage")
    );
  },
  methods: {
    doAppendBankCard() {
      this.$router.push({
        path: "/add-bankcard-page"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.place-holder {
  width: 44%;
}

.add-bankcard-panel {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}

.bottom-fixed {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
}
</style>
