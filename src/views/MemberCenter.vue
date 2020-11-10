<template>
  <section class="pb-16">
    <div
      class="user-info-panel rounded-xl d-flex justify-center align-center white"
    >
      User Info Panel
    </div>
    <v-container>
      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.bankCard')">
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-bank-card.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.passwordManage')" @click="goPage('PasswordManage')">
          <template slot="icon">
            <img class="mr-2" src="../assets/svg/icon-s-lock.svg" alt="" />
          </template>
        </member-center-item>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.bettingHistory')">
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
      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.transactionHistory')">
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
      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.promoHistory')">
          <template slot="icon">
            <img
                class="mr-2"
                src="../assets/svg/icon-s-coupon.svg"
                alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.bonus')">
          <template slot="icon">
            <img
                class="mr-2"
                src="../assets/svg/icon-s-rebate.svg"
                alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.massageCenter')">
          <template slot="icon">
            <img
                class="mr-2"
                src="../assets/svg/icon-s-news.svg"
                alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.helpCenter')">
          <template slot="icon">
            <img
                class="mr-2"
                src="../assets/svg/icon-s-help.svg"
                alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row class="white py-1">
        <member-center-item :label="$t('memberCenter.logout')">
          <template slot="icon">
            <img
                class="mr-2"
                src="../assets/svg/icon-deposit.svg"
                alt=""
            />
          </template>
        </member-center-item>
      </v-row>
      <v-divider></v-divider>
    </v-container>
  </section>
</template>

<script>
import MemberCenterItem from "@/components/MemberCenterItem";

export default {
  name: "MemberCenter",
  components: { MemberCenterItem },
  mounted() {
    this.$store.dispatch("changeActivePage", "profile");
  },
  methods: {
    goPage(target) {
      console.log("target", target);
      this.$router.push({ name: target });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info-panel {
  height: 190px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
}
</style>