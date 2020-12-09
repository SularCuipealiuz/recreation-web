<template>
  <v-btn
    block
    text
    height="49"
    small
    class="mc-btn font-weight-bold text-subtitle-2 d-flex justify-start align-center"
    @click="callBack"
  >
    <slot name="icon"></slot>
    {{ label }}
    <span class="arrow-icon">
      <img src="../assets/svg/icon-menu-l-arrow.svg" alt="" />
    </span>
  </v-btn>
</template>

<script>
export default {
  name: "MemberCenterItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    method: {
      type: Function
    },
    target: {
      type: String,
      default: ""
    }
  },
  methods: {
    callBack() {
      if(this.target !== "function") {
        this.method(this.target);
      } else {
        this.method();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mc-btn {
  position: relative;

  .arrow-icon {
    position: absolute;
    right: 6px;
    margin: auto;

    height: 15px;

    > img {
      height: 100%;
      transform: rotateY(180deg);
      filter: inherit;
    }
  }
}
</style>
