<template>
  <v-app id="app" class="d-flex flex-column justify-start align-center">
    <router-view name="head" />
    <router-view class="fill-height" name="body" />
    <router-view class="fix-foot" name="foot" />
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
