<template>
  <section class="grey lighten-4 password-manage">
    <v-btn-toggle class="switch-button my-3" v-model="toggleExclusive">
      <v-btn class="switch-item" :class="{ 'btn-bg': toggleExclusive === 0 }">
        {{ $t("passwordManage.signInPassword") }}
      </v-btn>
      <v-btn class="switch-item" :class="{ 'btn-bg': toggleExclusive === 1 }">
        {{ $t("passwordManage.withdrawalPassword") }}
      </v-btn>
    </v-btn-toggle>

    <v-col
      cols="12"
      class="px-3 pb-2 pt-6 white"
      v-show="toggleExclusive === 0"
    >
      <v-text-field
        v-model="form.oriPassword"
        class="mt-2 input-panel"
        :label="$t('passwordManage.oriPassword')"
        :placeholder="$t('tip.oriPassword')"
        prepend-icon="*"
        :append-outer-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        hide-details
        @click:append-outer="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="form.newPassword"
        class="mt-2 input-panel"
        :label="$t('passwordManage.newPassword')"
        :placeholder="$t('tip.password')"
        prepend-icon="*"
        :append-outer-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        hide-details
        @click:append-outer="show2 = !show2"
      ></v-text-field>
      <v-text-field
        v-model="form.confirmPassword"
        class="mt-2 input-panel"
        :label="$t('passwordManage.confirmPassword')"
        :placeholder="$t('tip.confirm')"
        prepend-icon="*"
        :append-outer-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show3 ? 'text' : 'password'"
        hide-details
        @click:append-outer="show3 = !show3"
      ></v-text-field>
    </v-col>

    <v-col
      cols="12"
      class="px-3 pb-2 pt-6 white"
      v-show="toggleExclusive === 1"
    >
      <v-text-field
        v-model="form.newPassword"
        class="mt-2 input-panel"
        :label="$t('passwordManage.withdrawalNewPassword')"
        :placeholder="$t('tip.withdrawalNewPassword')"
        prepend-icon="*"
        :append-outer-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        hide-details
        maxlength="6"
        @click:append-outer="show2 = !show2"
      ></v-text-field>
      <v-text-field
        v-model="form.confirmPassword"
        class="mt-2 input-panel"
        :label="$t('passwordManage.confirmPassword')"
        :placeholder="$t('tip.withdrawalConfirmPassword')"
        prepend-icon="*"
        :append-outer-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show3 ? 'text' : 'password'"
        hide-details
        maxlength="6"
        @click:append-outer="show3 = !show3"
      ></v-text-field>
    </v-col>

    <v-col cols="12" class="mt-3">
      <v-btn
        block
        depressed
        class="btn btn-bg rounded-lg text--white"
        :disabled="validate"
        @click="submit(toggleExclusive)"
      >
        {{ $t("button.submit") }}
      </v-btn>
    </v-col>
  </section>
</template>

<script>
import { changePassword, changeWithdrawPassword } from "@/api/memberCenter";
import { mapGetters } from "vuex";

export default {
  name: "PasswordManage",
  mounted() {
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("memberCenter.passwordManage")
    );
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: true,
      form: {
        oriPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      tab: "password",
      toggleExclusive: 0
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    }),
    validate() {
      if (this.toggleExclusive === 0) {
        return (
          this.form.oriPassword === "" ||
          this.form.newPassword === "" ||
          this.form.confirmPassword === ""
        );
      } else if (this.toggleExclusive === 1) {
        return this.form.newPassword === "" || this.form.confirmPassword === "";
      } else {
        return false;
      }
    }
  },
  methods: {
    submit() {
      if (this.toggleExclusive === 0) {
        changePassword({
          id: this.userInfo.uid,
          oriPassword: this.form.oriPassword,
          newPassword: this.form.newPassword,
          confirmPassword: this.form.confirmPassword
        });
      } else if (this.toggleExclusive === 1) {
        changeWithdrawPassword({
          id: this.uid,
          newPassword: this.form.newPassword,
          confirmPassword: this.form.confirmPassword
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-panel {
  height: 60px;
  margin-bottom: -10px;
}

.switch-button {
  width: 95%;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  .switch-item {
    width: 50%;
    height: 36px !important;
    border-width: inherit !important;
  }
}

.btn {
  height: 40px !important;
}
</style>

<style lang="scss">
.password-manage fieldset {
  border-width: 0px !important;
}

.password-manage .v-input__prepend-outer {
  margin-right: 0px !important;
}

.password-manage .v-input__prepend-outer {
  margin-top: 9px !important;
}

.password-manage .btn-bg {
  color: white;
  background: linear-gradient(
    to right,
    rgba(220, 202, 184, 1) 0%,
    rgba(210, 180, 150, 1) 100%
  ) !important;
}

.password-manage .btn-bg span {
  color: white;
}
</style>
