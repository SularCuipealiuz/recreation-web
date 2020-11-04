<template>
  <section class="header px-3 d-flex justify-space-between align-center">
    <!--    <img v-holder="{ img: '88x29' }" />-->

    <div class="login-panel">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="login-panel" v-show="!isLogin">
      <v-btn class="btn" outlined depressed @click="doOpenSignupDialog">
        {{ $t("sign-up") }}
      </v-btn>
      <v-btn class="btn btn-gold" depressed @click="doOpenLoginDialog">
        {{ $t("sign-in") }}
      </v-btn>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Header",
  computed:{
    ...mapGetters({
      isLogin: "getIsLogin"
    })
  },
  methods: {
    doOpenSignupDialog() {
      this.$store.dispatch("openSignupDialog");
    },
    doOpenLoginDialog() {
      this.$store.dispatch("openLoginDialog");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 44px;

  .btn {
    width: 68.5px !important;
    height: 24px !important;
    margin: 0 2px;
    font-size: 14px;
    font-weight: 600;
    color: $btn-color3 !important;
    border-radius: 8px;
    border-color: $btn-color3;
  }

  .btn-gold {
    background-image: $gradient1;
    color: white !important;
    border-width: 0;
  }

  .login-panel {
    height: 29px;

    > img {
      height: 100%;
    }
  }
}
</style>
