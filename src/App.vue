<template>
  <v-app id="app" class="d-flex flex-column justify-start align-center">
    <v-alert dense dismissible type="info" class="alert-panel rounded-0">
      I'm a dense alert with a <strong>type</strong> of info
    </v-alert>
    <transition name="fade">
      <router-view name="head" />
    </transition>
    <div class="body-panel">
      <transition name="fade">
        <router-view class="fill-height" name="body" />
      </transition>
    </div>
    <router-view class="fix-foot" name="foot" />
    <router-view name="popModal"></router-view>
  </v-app>
</template>

<style lang="scss">
html {
  font-size: 16px;
  overflow-y: hidden;
  height: 100vh;
}

body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;

  .fix-foot {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
<script>
import { registerConfig } from "@/api/account";
import { getToken } from "@/plugins/auth";

export default {
  data() {
    return {};
  },
  created() {
    const _this = this;
    registerConfig().then(res => {
      _this.$store.dispatch("setSiteRegisterFields", res["siteRegistFields"]);
      _this.$store.dispatch(
        "setVerificationPattern",
        res["verificationPattern"]
      );
    });
  },
  mounted() {
    const _this = this;
    let token = getToken();
    if (token !== null && token !== undefined) {
      _this.$store.dispatch("checkLoginStatus", token).then(e => {
        console.log("e", e);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#app {
  position: relative;
  background-color: #f8f8f8;

  .alert-panel {
    position: absolute;
    top: -50px;
    left: 0;

    width: 100%;
    z-index: 900;
  }

  .body-panel {
    > * {
      width: 100%;
    }
  }
}
</style>
<style>
.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-enter {
  opacity: 0;
  transform: translateX(10px);
}
</style>