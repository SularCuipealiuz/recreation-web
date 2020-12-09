<template>
  <section
    class="mc-header d-flex justify-center align-center white"
    :class="{ shadow: showBack }"
  >
    <span v-if="showBack" class="go-back" @click="goBack">
      <img src="../assets/svg/icon-menu-l-arrow.svg" alt="" />
    </span>
    <span class="text--black subtitle-1 font-weight-bold">{{ pageTitle }}</span>
    <span v-if="option" class="ellipsis-btn" @click="toggleMcOption">
      <v-icon>fal fa-ellipsis-h</v-icon>
    </span>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "McHeader",
  computed: {
    ...mapGetters({
      pageTitle: "getMcPageTitle",
      option: "getMcHeaderOption",
      showBack: "getMcBackBtn"
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggleMcOption() {
      this.$store.dispatch("doToggleMcOption", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.mc-header {
  position: relative;
  height: 44px;
  min-height: 44px;

  &.shadow {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  }

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

  .ellipsis-btn {
    position: absolute;
    right: 14px;
  }
}
</style>