<template>
  <section>
    <div class="user-info-panel rounded-xl d-flex justify-center align-center">
      User Info Panel
    </div>
    <v-container>
      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 d-flex justify-start align-center"
        >
          {{ $t("memberCenter.bankCard") }}
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center "
          @click="goPage('PasswordManage')"
        >
          {{ $t("memberCenter.passwordManage") }}
        </v-btn>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center"
        >
          {{ $t("memberCenter.bettingHistory") }}
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center"
        >
          {{ $t("memberCenter.transactionHistory") }}
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center"
        >
          {{ $t("memberCenter.promoHistory") }}
        </v-btn>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center"
        >
          {{ $t("memberCenter.bonus") }}
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center"
        >
          {{ $t("memberCenter.massageCenter") }}
        </v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center "
        >
          {{ $t("memberCenter.helpCenter") }}
        </v-btn>
      </v-row>
      <v-divider class="mb-3"></v-divider>

      <v-row>
        <v-btn
          block
          text
          class="mc-btn font-weight-bold text-subtitle-2 justify-start align-center"
        >
          {{ $t("memberCenter.wallet") }}
        </v-btn>
      </v-row>
      <v-divider></v-divider>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "MemberCenter",
  mounted() {
    this.$store.dispatch("changeActivePage", "profile");
  },
  methods: {
    goPage(target) {
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

.mc-btn {
}
</style>
