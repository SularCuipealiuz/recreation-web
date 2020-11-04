<template>
  <v-carousel
    class="carousel-height"
    :height="getWidth"
    cycle
    hide-delimiter-background
    :show-arrows="false"
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <div class="fill-height" align="center" justify="center">
          <img class="image" src="../assets/banner/banner.png" alt="" />
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      windowWidth: window.innerWidth,
      colors: ["indigo", "warning", "pink darken-2", "red lighten-1"],
      slides: [1, 2, 3, 4, 5]
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    getWidth: function() {
      return this.windowWidth * 0.385;
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel-height {
  height: 145px;
}

.image {
  width: 100%;
}
</style>
<style>
.carousel-height .v-btn.v-btn--active .v-btn__content .v-icon {
  color: #ac9278;
  opacity: 1;
}

.carousel-height .v-btn .v-btn__content .v-icon {
  color: #ac9278;
  opacity: 0.2;
}

.v-btn:before {
  background-color: transparent !important;
}

.v-carousel__controls {
  z-index: 0 !important;
}
</style>