<template>
  <div class="py-4 mb-3 panel rounded-lg">
    <div class="pb-1 d-flex justify-center align-center">
      <span>
        <img src="../assets/svg/title-decoration-left.svg" alt="" />
      </span>
      <div class="subtitle-1 panel-title font-weight-bold">
        <slot name="title"></slot>
      </div>
      <span>
        <img src="../assets/svg/title-decoration-right.svg" alt="" />
      </span>
    </div>
    <div>
      <slot name="content-text"></slot>
      <slot name="content-img"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromoDetailPanel"
};
</script>

<style lang="scss" scoped>
.panel {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  .panel-title {
    min-width: 80px;
    line-height: 1.2;
    color: $main-color;
  }
}
</style>
