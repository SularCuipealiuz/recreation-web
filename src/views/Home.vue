<template>
  <section
    class="fill-height px-3 d-flex flex-column justify-start align-center white"
  >
    <!--    輪播-->
    <Carousel></Carousel>

    <!--    公告-->
    <div class="bulletin-panel mt-2">
      <Bulletin></Bulletin>
    </div>

    <!--    功能界面區-->
    <v-container
      class="signed-panel my-2 pa-0 d-flex flex-row justify-space-between align-center"
    >
      <div
        v-if="!isLogin"
        no-gutters
        class="d-flex flex-column justify-space-between align-start"
      >
        <div class="text-h5 font-weight-bold">{{ $t("tip.plzLogin") }}</div>
        <div class="font-weight-bold" style="color: #a5a9b3;">
          {{ $t("tip.plzLoginSub") }}
        </div>
      </div>
      <div
        v-if="isLogin"
        no-gutters
        class="d-flex flex-column justify-space-evenly align-start"
      >
        <div class="d-flex flex-row justify-start align-center">
          <span class="user-name">{{ userInfo.name }}</span>
          <span class="vip-box ml-2">
            <img
              :src="require('../assets/icons/vip/' + userInfo.vip + '.png')"
              alt=""
            />
          </span>
        </div>
        <span class="balance">{{ userInfo.balance }}</span>
      </div>
      <v-row no-gutters class="d-flex flex-row justify-end align-center">
        <div class="btn btn-icons" @click="toTradingCenter">
          <span class="img-box"
            ><img src="../assets/icons/deposit.png" alt="" />
          </span>
          <span>{{ $t("button.deposit") }}</span>
        </div>
        <div class="btn btn-icons">
          <span class="img-box">
            <img src="../assets/icons/transfer.png" alt="" />
          </span>
          <span>{{ $t("button.transfer") }}</span>
        </div>
        <div class="btn btn-icons">
          <span class="img-box">
            <img src="../assets/icons/card.png" alt="" />
          </span>
          <span>{{ $t("button.card") }}</span>
        </div>
      </v-row>
    </v-container>

    <!--    遊戲清單-->
    <div class="game-panel d-flex flex-row flex pa-0">
      <div class="type-list d-flex flex-column justify-start align-center mr-2">
        <span
          class="type-list-item mb-2"
          v-for="{ def, active, id, label } in typeList"
          :key="id"
        >
          <img v-if="label === activePage" :src="active" alt="" />
          <img v-else :src="def" @click="activePage = label" alt="" />
        </span>
      </div>
      <v-row
        class="game-list d-flex flex-column flex-nowrap"
        :style="{ maxHeight: bodyHeight + 'px' }"
        no-gutters
      >
        <div
          class="mb-3 relative"
          style="width: 100%"
          v-for="(e, index) in getGameTypeListByName.platformList"
          :key="index"
        >
          <v-responsive
            @click="enterGame(e.id)"
            style="position: absolute;"
            :aspect-ratio="16 / 9"
          >
            <img width="100%" class="game-card" :src="e.image" alt="" />
          </v-responsive>
        </div>

        <div
          class="mb-3 relative"
          style="width: 100%"
          v-show="getGameTypeListByName.platformList.length === 0"
        >
          <v-responsive style="position: absolute;" :aspect-ratio="16 / 9">
            <img
              width="100%"
              class="game-card"
              src="../assets/banner/banner-empty.jpg"
              alt=""
            />
          </v-responsive>
        </div>
      </v-row>
    </div>
  </section>
</template>

<script>
import Carousel from "@/components/Carousel";
import Bulletin from "@/components/Bulletin";
import { mapGetters } from "vuex";
import { getToken } from "@/plugins/auth";
import { findGameTypeList, playGame } from "@/api/homePage";

export default {
  name: "Home",
  components: { Bulletin, Carousel },
  data() {
    return {
      activePage: "体育",
      typeList: [
        {
          id: 1,
          def: require("../assets/gameType/lottery.png"),
          active: require("../assets/gameType/a-lottery.png"),
          name: "lottery",
          label: "彩票"
        },
        {
          id: 2,
          def: require("../assets/gameType/poker.png"),
          active: require("../assets/gameType/a-poker.png"),
          name: "poker",
          label: "棋牌"
        },
        {
          id: 3,
          def: require("../assets/gameType/esport.png"),
          active: require("../assets/gameType/a-esport.png"),
          name: "esport",
          label: "电竞"
        },
        {
          id: 4,
          def: require("../assets/gameType/casino.png"),
          active: require("../assets/gameType/a-casino.png"),
          name: "casino",
          label: "真人"
        },
        {
          id: 5,
          def: require("../assets/gameType/sport.png"),
          active: require("../assets/gameType/a-sport.png"),
          name: "sport",
          label: "体育"
        },
        {
          id: 6,
          def: require("../assets/gameType/s-lot.png"),
          active: require("../assets/gameType/a-s-lot.png"),
          name: "s-lot",
          label: "电子"
        }
      ],
      gameTypeList: [],
      bodyHeight: 0
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "getIsLogin",
      userInfo: "getUserInfoState"
    }),
    getGameTypeListByName() {
      let element = this.gameTypeList.find(e => e.label === this.activePage);
      return element === undefined ? { platformList: [] } : element;
    }
  },
  mounted() {
    this.bodyHeight = window.innerHeight - 330;
    this.$store.dispatch("changeActivePage", "home");
    findGameTypeList().then(res => {
      this.$store.dispatch("setGameTypeList", res);
      this.gameTypeList = res;
    });
  },
  methods: {
    enterGame(platformId) {
      playGame({
        platformId: platformId
      }).then(e => {
        console.log(e);
      });
    },
    toTradingCenter() {
      location.href = "http://192.168.0.122:8081/?token=" + getToken();
    }
  }
};
</script>
<style lang="scss" scoped>
.bulletin-panel {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signed-panel {
  height: 50px;
  font-size: 12px;

  > * {
    height: 100%;
  }

  .user-name {
    color: #9aa4c2;
    font-size: 14px;
    line-height: 1;
  }

  .vip-box {
    height: 14px;

    img {
      height: 100%;
    }
  }

  .balance {
    font-size: 24px !important;
    font-family: "DIN Condensed Web" !important;
    line-height: 1;
  }
}

.btn {
  height: 100%;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $btn-color3;
  font-weight: 700;

  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 32px;
    width: 32px;
  }

  img {
    width: 100%;
  }
}

.game-panel {
  width: 100%;

  .type-list {
    width: 60px;

    > .type-list-item {
      width: 100%;
      height: 37px;
      filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));

      img {
        width: 100%;
      }
    }
  }

  .game-list {
    overflow: scroll;

    .game-card {
      border-radius: 12px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
      //overflow: hidden;
    }
  }
}
</style>