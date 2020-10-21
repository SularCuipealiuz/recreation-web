<template>
  <section class="header d-flex justify-space-between align-center">
    <img v-holder="{ img: '88x29' }" />

    <div class="login-panel">
      <v-btn class="btn" outlined depressed> {{ $t("sign-up") }}</v-btn>
      <v-btn class="btn btn-gold" depressed> {{ $t("sign-in") }}</v-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  padding: 0 11.5px 0 14px;

  .btn {
    width: 68.5px !important;
    height: 24px !important;
    margin: 0 2px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(172, 146, 120) !important;
    border-radius: 8px;
    border-color: rgb(172, 146, 120);
  }

  .btn-gold {
    background-image: $gradient1;
    color: white !important;
    border-width: 0;
  }
}
</style>
