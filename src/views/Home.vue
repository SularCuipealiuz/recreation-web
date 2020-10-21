<template>
  <section class="body d-flex flex-column justify-start align-center">
    <Carousel></Carousel>
    <div class="tttt">
      公告
    </div>
    <div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "@/components/Carousel";
export default {
  name: "Home",
  components: {Carousel}
};
</script>

<style lang="scss" scoped>
.body {
  padding: 0 11.5px 0 14px;
}

.tttt {
  font-size: $font-size-root;
}
</style>
