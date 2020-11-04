<template>
  <section class="mc-header d-flex justify-center align-center">
    <span class="go-back" @click="goBack">
      <img src="../assets/svg/icon-menu-l-arrow.svg" alt="" />
    </span>
    <span class="text--black subtitle-1 font-weight-bold">{{ pageTitle }}</span>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "McHeader",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters({
      pageTitle: "getMcPageTitle"
    })
  }
};
</script>

<style lang="scss" scoped>
.mc-header {
  position: relative;
  height: 50px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);

  > .go-back {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-height: 20px;
    padding-left: 11px;

    > img {
      height: 100%;
    }
  }
}
</style>
