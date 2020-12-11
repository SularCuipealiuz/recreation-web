<template>
  <section class="member-center pb-16">
    <div class="user-info-panel d-flex justify-center align-center white">
      <div class="profile-panel px-3 d-flex justify-start align-center">
        <div class="photo">
          <v-avatar size="70">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
        <div class="profile px-3 d-flex justify-center align-start flex-column">
          <div class="d-flex flex-row justify-start align-center">
            <div class="user-name">{{ userInfo.name }}</div>
            <span class="vip-box ml-2">
              <img
                :src="require('../assets/icons/vip/' + userInfo.vip + '.png')"
                alt=""
              />
            </span>
          </div>
          <div class="caption ">中心钱包：{{ userInfo.balance }}</div>
        </div>
        <div class="edit"></div>
      </div>
      <div class="option-panel">
        <v-row
          no-gutters
          class="d-flex flex-row justify-space-evenly align-center"
        >
          <div class="btn btn-icons">
            <span class="img-box"
              ><img src="../assets/icons/deposit.png" alt="" />
            </span>
            <span>{{ $t("button.deposit") }}</span>
          </div>
          <div class="btn btn-icons">
            <span class="img-box">
              <img src="../assets/icons/card.png" alt="" />
            </span>
            <span>{{ $t("button.card") }}</span>
          </div>
          <div class="btn btn-icons">
            <span class="img-box">
              <img src="../assets/icons/transfer.png" alt="" />
            </span>
            <span>{{ $t("button.transfer") }}</span>
          </div>
          <div class="btn btn-icons">
            <span class="img-box">
              <img src="../assets/icons/vip.png" alt="" />
            </span>
            <span>VIP</span>
          </div>
        </v-row>
      </div>
    </div>
    <v-container>
      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.bankCard')"
          :method="goPage"
          :target="'BankCardManage'"
        >
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-bank-card.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.passwordManage')"
          :method="goPage"
          :target="'PasswordManage'"
        >
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-lock.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.bettingHistory')"
          :method="goPage"
          :target="'BettingRecord'"
        >
          <template slot="icon">
            <img
              class="mr-2"
              src="../assets/svg/icon-s-bet-record.svg"
              alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.transactionHistory')"
          :method="goPage"
          :target="'TransactionRecord'"
        >
          <template slot="icon">
            <img
              class="mr-2"
              src="../assets/svg/icon-s-bet-bet-record.svg"
              alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.discountHistory')"
          :method="goPage"
          :target="'DiscountRecord'"
        >
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-coupon.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row class="white">
        <member-center-item :label="$t('memberCenter.bonus')">
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-rebate.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.massageCenter')"
          :method="goPage"
          :target="'MessageCenter'"
        >
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-news.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white">
        <member-center-item :label="$t('memberCenter.helpCenter')">
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-help.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row class="white">
        <member-center-item
          :label="$t('memberCenter.logout')"
          :method="confirmDialog"
          :target="'self'"
        >
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-deposit.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>

      <div class="my-3 font-weight-bold caption grey--text lighten-4">
        版本号：1.0
      </div>
    </v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      content-class="confirm-dialog rounded-lg"
    >
      <v-card>
        <v-card-title
          class="headline justify-center subtitle-1 font-weight-bold"
        >
          贴心提醒
        </v-card-title>
        <v-card-text>
          是否确认要登出此装置？
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="px-0 pb-0">
          <div class="member-center-btn-panel">
            <v-btn
              height="50"
              color="black darken-1"
              tile
              text
              @click="dialog = false"
            >
              {{ $t("button.cancel") }}
            </v-btn>
            <v-divider vertical style="border-color: #eeeeee;"></v-divider>
            <v-btn
              height="50"
              color="green darken-1"
              tile
              text
              @click="doLogOut"
            >
              {{ $t("button.confirm") }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import MemberCenterItem from "@/components/MemberCenterItem";
import { mapGetters } from "vuex";

export default {
  name: "MemberCenter",
  components: { MemberCenterItem },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfoState"
    })
  },
  mounted() {
    this.$store.dispatch("setMcPageToMain", this.$t("footer-tab.profile"));
    this.$store.dispatch("changeActivePage", "profile");
  },
  methods: {
    goPage(target) {
      this.$router.push({ name: target });
    },
    confirmDialog() {
      this.dialog = true;
    },
    doLogOut() {
      this.dialog = false;
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info-panel {
  height: 180px;
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.05);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  .profile-panel {
    height: 60%;
  }

  .option-panel {
    height: 40%;
  }

  .profile-panel,
  .option-panel {
    width: 100%;

    .user-name {
      font-size: 24px !important;
      font-family: "DIN Condensed Web" !important;
      line-height: 1;
    }

    .vip-box {
      height: 18px;

      img {
        height: 100%;
      }
    }

    .btn {
      height: 100%;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: black;
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
  }
}

.confirm-dialog {
  overflow-x: hidden;
}
</style>

<style lang="scss">
.member-center-btn-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
  overflow: hidden;

  > * {
    width: calc(50% - 0.5px) !important;
    height: 100%;
  }
}
</style>