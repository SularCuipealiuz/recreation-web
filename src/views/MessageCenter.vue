<template>
  <section>
    <v-btn-toggle class="switch-button my-3 mx-3" v-model="toggleExclusive">
      <v-btn class="switch-item" :class="{ 'btn-bg': toggleExclusive === 0 }">
        {{ $t("passwordManage.signInPassword") }}
      </v-btn>
      <v-btn class="switch-item" :class="{ 'btn-bg': toggleExclusive === 1 }">
        {{ $t("passwordManage.withdrawalPassword") }}
      </v-btn>
      <v-btn class="switch-item" :class="{ 'btn-bg': toggleExclusive === 2 }">
        333
      </v-btn>
    </v-btn-toggle>
  </section>
</template>

<script>
export default {
  name: "MessageCenter",
  data() {
    return {
      toggleExclusive: 0
    };
  },
  mounted() {
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("memberCenter.massageCenter")
    );
  }
};
</script>

<style scoped></style>
