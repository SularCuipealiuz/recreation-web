<template>
  <router-link
    :to="{ path: '/promo/' + id }"
    class="promo-item-panel d-flex flex-column rounded-lg overflow-hidden mb-3"
  >
    <div class="promo-img-panel" style="background-color: #0FCF51">
      <span class="badge">
        <img :src="badgeImg[imgType]" alt="" />
      </span>
    </div>
    <div
      class="promo-info-panel text-left px-4 py-0 d-flex justify-center align-start flex-column"
    >
      <div class="title subtitle-2">title</div>
      <div class="time subtitle-2">{{ $t("promo.promoDate") }}：123</div>
      <span class="arrow-icon">
        <img src="../assets/svg/icon-menu-l-arrow.svg" alt="" />
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PromoItem",
  data() {
    return {
      badgeImg: {
        fire: require("../assets/icons/badge/fire.png"),
        hot: require("../assets/icons/badge/hot.png"),
        recommend: require("../assets/icons/badge/recommend.png")
      }
    };
  },
  props: {
    imgType: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.promo-item-panel {
  height: 150px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  > .promo-img-panel {
    flex: 0 0 110px;
    position: relative;

    > .badge {
      position: absolute;
      top: 0;
      right: 0;
      height: 29px;

      > img {
        height: 100%;
      }
    }
  }

  > .promo-info-panel {
    position: relative;
    flex: 1 1 auto;

    > * {
      line-height: 1.1rem;
    }

    > .title {
      color: #b8936d;
    }

    > .time {
      color: #9aa4c2;
    }

    > .arrow-icon {
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
}
</style>
