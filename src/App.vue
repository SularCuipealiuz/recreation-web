<template>
  <v-app id="app" class="d-flex flex-column justify-start align-center">
    <router-view name="head" />
    <router-view class="fill-height" name="body" />
    <router-view class="fix-foot" name="foot" />
    <sign-up v-if="signupDialogState"></sign-up>
    <login v-if="loginDialogState"></login>
  </v-app>
</template>

<style lang="scss">
html {
  font-size: 16px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .fix-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
<script>
import SignUp from "@/views/SignUp";
import Login from "@/views/Login";
import { mapGetters } from "vuex";
import { registerConfig, verify } from "@/api/account";
import { getToken } from "@/plugins/auth";

export default {
  components: { SignUp, Login },
  data() {
    return {};
  },
  mounted() {
    const _this = this;
    let token = getToken();
    console.log("token", token);

    if (token !== null && token !== undefined) {
      verify({
        token: "Bearer " + token
      }).then(res => {
        _this.$store.dispatch("setUserUid", res["userId"]);
      });

      this.$store.dispatch("setUserToken", token);
    }

    registerConfig().then(res => {
      _this.$store.dispatch("setSiteRegisterFields", res.siteRegistFields);
      _this.$store.dispatch("setVerificationPattern", res.verificationPattern);
    });
  },
  computed: {
    ...mapGetters({
      loginDialogState: "getLoginDialog",
      signupDialogState: "getSignupDialog"
    })
  }
};
</script>
