<template>
  <div class="bank-card-panel relative">
    <img class="bank-card-svg" src="../assets/svg/bank-card.svg" alt="" />
    <div class="content py-4">
      <div class="px-10 white--text text-h6">{{ obj.desc }}</div>
      <v-divider></v-divider>
      <div class="px-10 mt-1 white--text caption">
        {{ obj.account }}
      </div>
      <div class="px-10 white--text caption">{{ obj.branchItem }}</div>
      <div class="px-10 white--text text-h6">
        {{ obj.accountName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankCard",
  props:{
    obj: {
      type: Object,
      default: function() {
        return {};
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.bank-card-panel {
  display: flex;
  justify-content: center;
  align-items: center;

  .bank-card-svg {
    width: 92vw;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    width: 92vw;
    height: 100%;
    text-align: left;
  }
}
</style>
