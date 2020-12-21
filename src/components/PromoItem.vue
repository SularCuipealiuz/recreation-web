<template>
  <router-link
    :to="{ path: '/promo/' + id }"
    class="promo-item-panel d-flex flex-column rounded-lg overflow-hidden mb-3"
  >
    <div class="promo-img-panel">
      <img :src="img" class="img-box" alt="" />
      <span class="badge">
        <img :src="getCornerIcon(imgType)" alt="" />
      </span>
    </div>
    <div
      class="promo-info-panel text-left px-4 py-0 d-flex justify-center align-start flex-column"
    >
      <div class="title subtitle-2">{{ title }}</div>
      <div class="time caption">
        {{ $t("promo.promoDate") }}：{{ getDate(dateSt) }}~{{ getDate(dateEd) }}
      </div>
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
        fire: require("../assets/icons/badge/corner-fire.svg"),
        hot: require("../assets/icons/badge/corner-hot.svg"),
        recommend: require("../assets/icons/badge/corner-recommend.svg"),
        safe: require("../assets/icons/badge/corner-safe.svg"),
        save: require("../assets/icons/badge/corner-save.svg")
      }
    };
  },
  props: {
    imgType: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    dateSt: {
      type: String,
      default: ""
    },
    dateEd: {
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
  },
  methods: {
    getCornerIcon(num) {
      let img = null;
      switch (num) {
        case 1: {
          img = this.badgeImg["hot"];
          break;
        }
        case 2: {
          img = this.badgeImg["fire"];
          break;
        }
        case 3: {
          img = this.badgeImg["safe"];
          break;
        }
        case 4: {
          img = this.badgeImg["save"];
          break;
        }
        case 5: {
          img = this.badgeImg["recommend"];
          break;
        }
        case 6: {
          img = this.badgeImg["hot"];
          break;
        }
      }

      return img;
    },
    getDate(date) {
      let str = new Date(date);
      return (
        str.getFullYear() + "年" + str.getMonth() + "月" + str.getDate() + "日"
      );
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

    > .img-box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

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