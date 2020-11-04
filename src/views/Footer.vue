<template>
  <section>
    <div class="footer-panel">
      <img class="tab-bg" src="../assets/svg/footer-tab.svg" alt="" />
      <div class="btn-panel d-flex flex-row justify-center align-center">
        <div class="icon-btn btn-home" @click="clickFooterBarItem('home')">
          <div
            class="d-flex flex-column justify-center align-center animate__animated"
            :class="{ animate__heartBeat_custom: active === 'home' }"
          >
            <img
              v-show="active !== 'home'"
              src="../assets/icons/footer-tab/iconMHome.png"
              alt=""
            />
            <img
              v-show="active === 'home'"
              src="../assets/icons/footer-tab/iconMHomeActive.png"
              alt=""
            />
            <span>{{ $t("footer-tab.home") }}</span>
          </div>
          <i
            class="animate__animated"
            :class="{ animate__bounceLight_custom: active === 'home' }"
          ></i>
        </div>
        <div class="icon-btn btn-promo" @click="clickFooterBarItem('promo')">
          <div
            class="d-flex flex-column justify-center align-center animate__animated"
            :class="{ animate__heartBeat_custom: active === 'promo' }"
          >
            <img
              v-show="active !== 'promo'"
              src="../assets/icons/footer-tab/iconMPromo.png"
              alt=""
            />
            <img
              v-show="active === 'promo'"
              src="../assets/icons/footer-tab/iconMPromoActive.png"
              alt=""
            />
            <span>{{ $t("footer-tab.promo") }}</span>
          </div>
          <i
            class="animate__animated"
            :class="{ animate__bounceLight_custom: active === 'promo' }"
          ></i>
        </div>
        <div
          class="icon-btn big btn-diamond"
          @click="clickFooterBarItem('diamond')"
        >
          <div
            class="d-flex flex-column justify-center align-center animate__animated"
            :class="{ animate__heartBeat_custom: active === 'diamond' }"
          >
            <img src="../assets/icons/footer-tab/icon-diamond.png" alt="" />
            <span>{{ $t("footer-tab.diamond") }}</span>
          </div>
          <i
            class="animate__animated"
            :class="{ animate__bounceLight_custom: active === 'diamond' }"
          ></i>
        </div>
        <div class="icon-btn btn-mc" @click="clickFooterBarItem('mc')">
          <div
            class="d-flex flex-column justify-center align-center animate__animated"
            :class="{ animate__heartBeat_custom: active === 'mc' }"
          >
            <img
              v-show="active !== 'mc'"
              src="../assets/icons/footer-tab/iconMCs.png"
              alt=""
            />
            <img
              v-show="active === 'mc'"
              src="../assets/icons/footer-tab/iconMCsActive.png"
              alt=""
            />
            <span>{{ $t("footer-tab.mc") }}</span>
          </div>
          <i
            class="animate__animated"
            :class="{ animate__bounceLight_custom: active === 'mc' }"
          ></i>
        </div>
        <div
          class="icon-btn btn-profile"
          @click="clickFooterBarItem('profile')"
        >
          <div
            class="d-flex flex-column justify-center align-center animate__animated"
            :class="{ animate__heartBeat_custom: active === 'profile' }"
          >
            <img
              v-show="active !== 'profile'"
              src="../assets/icons/footer-tab/iconMProfile.png"
              alt=""
            />
            <img
              v-show="active === 'profile'"
              src="../assets/icons/footer-tab/iconMProfileActive.png"
              alt=""
            />
            <span>{{ $t("footer-tab.profile") }}</span>
          </div>
          <i
            class="animate__animated"
            :class="{ animate__bounceLight_custom: active === 'profile' }"
          ></i>
        </div>
        <div class="white-cover"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      active: "getActivePage"
    })
  },
  methods: {
    clickFooterBarItem(target) {
      this.$store.dispatch("changeActivePage", target);
      this.routerPush(target);
    },
    routerPush(target) {
      let name = "Home";
      switch (target) {
        case "home": {
          name = "Home";
          break;
        }
        case "promo": {
          name = "Promo";
          break;
        }
        case "diamond": {
          break;
        }
        case "mc": {
          break;
        }
        case "profile": {
          name = "MemberCenter";
          break;
        }
      }
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="scss" scoped>
.footer-panel {
  position: relative;

  > .tab-bg {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 100;
  }

  .btn-panel {
    height: 85px;
    width: 100%;
    position: relative;
    color: rgb(151, 164, 197) !important;
    font-size: 10px !important;

    .icon-btn {
      width: 70px;
      z-index: 300;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      position: absolute;
      bottom: 3px;

      &.big {
        img {
          height: 33px !important;
        }
      }

      img {
        height: 20px;
        width: auto;
      }

      span {
        transform: scale(0.9);
      }

      > .animate__heartBeat_custom {
        color: #b1987f;
      }

      > i {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #dcbe9e;
        opacity: 0;
        z-index: -1;
        margin: auto;
      }
    }

    .btn-home {
      left: 10px;
    }

    .btn-promo {
      left: 80px;
    }

    .btn-diamond {
      left: 0;
      right: 0;
      bottom: 24px;
      margin: auto;
      color: #b1987f;
    }

    .btn-mc {
      right: 80px;
    }

    .btn-profile {
      right: 10px;
    }

    .white-cover {
      position: absolute;
      bottom: 0;
      height: 70px;
      width: 100%;
    }
  }
}

.animate__bounceLight_custom {
  animation-name: bounceLight;
  animation-duration: calc(500ms);
}

.animate__heartBeat_custom {
  animation-name: heartBeat;
  animation-duration: calc(500ms);
  animation-timing-function: ease-in-out;
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  20% {
    transform: scale(0.6);
  }

  40% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1);
  }

  80% {
    transform: scale(1.2);
  }
}

@keyframes bounceLight {
  0% {
    opacity: 0.7;
    transform: scale(0.1);
  }
  100% {
    opacity: 0;
    transform: scale(7);
  }
}
</style>
