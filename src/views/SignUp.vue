<template>
  <div class="sign-up-panel d-flex justify-start align-center flex-column">
    <v-col class="form pa-0 pb-8" cols="12">
      <span class="go-back ml-4 mt-6 ml-sm-5 mt-sm-9" @click="doCloseDialog">
        <img src="../assets/signIn/back.png" alt=""
      /></span>
      <div class="text-h5 white--text font-weight-bold my-6 my-sm-9">
        {{ $t("sign-up") }}
      </div>
      <div class="logo-panel my-4 my-sm-8">
        <img src="../assets/signIn/logo-vertical.png" alt="" />
      </div>
      <v-form
        ref="form"
        v-model="valid"
        style="position: relative;"
        class="pt-3 text-12"
      >
        <div class="hint subtitle-2">{{ $t("tip.required") }}</div>
        <v-text-field
          v-model="form.userName"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.account')"
          :rules="[rules.isRequired, rules.minmax]"
          maxlength="11"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fal fa-user-alt"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.password')"
          :rules="[rules.isRequired, rules.minmax]"
          maxlength="11"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fal fa-lock-alt"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="form.confirmPassword"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.confirm')"
          :rules="[rules.isRequired, rules.minmax, rules.passwordConfirm]"
          maxlength="11"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fal fa-lock-alt"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-text-field
          v-model="form.captcha"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2 captcha-box"
          :placeholder="$t('tip.captcha')"
          :rules="[rules.isRequired]"
          maxlength="6"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fal fa-shield-check"
        >
          <template v-slot:append>
            <div
              style="height: 30px"
              class="d-flex justify-center align-center"
            >
              <v-fade-transition leave-absolute>
                <img height="100%" :src="captchaImg" alt="" />
              </v-fade-transition>
              <v-btn
                x-small
                text
                rounded
                class="reload-btn pa-0 ml-2"
                :class="{ 'rotate-btn': rotate }"
                @click="startRotate"
              >
                <v-icon>
                  far fa-redo-alt
                </v-icon>
              </v-btn>
            </div>
          </template>
        </v-text-field>
        <v-text-field
          v-if="showQQ['isNullable'] === true"
          v-model="form.qq"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.qq')"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon=" "
          append-outer-icon=" "
          prepend-inner-icon="fab fa-qq"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="form.qq"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.qq')"
          :rules="[rules.isRequired]"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fab fa-qq"
        ></v-text-field>
        <v-text-field
          v-if="showWechat['isNullable'] === true"
          v-model="form.wechat"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.wechat')"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon=" "
          append-outer-icon=" "
          prepend-inner-icon="fab fa-weixin"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="form.wechat"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.wechat')"
          :rules="[rules.isRequired]"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fab fa-weixin"
        ></v-text-field>
        <v-text-field
          v-if="showEmail['isNullable'] === true"
          v-model="form.email"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.email')"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon=" "
          append-outer-icon=" "
          prepend-inner-icon="fal fa-envelope"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="form.email"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.email')"
          :rules="[rules.isRequired]"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fal fa-envelope"
        ></v-text-field>
        <v-text-field
          v-if="showPhone['isNullable'] === true"
          v-model="form.phone"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.mobile')"
          :rules="[rules.isRequired]"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon=" "
          append-outer-icon=" "
          prepend-inner-icon="fal fa-mobile-alt"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="form.phone"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.mobile')"
          :rules="[rules.isRequired]"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="fal fa-mobile-alt"
        ></v-text-field>
        <v-text-field
          v-if="showPhone['isNullable'] === true"
          v-model="form.phoneCaptcha"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.mobile-captcha')"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon=" "
          append-outer-icon=" "
          prepend-inner-icon="far fa-comment-alt-check"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="form.phoneCaptcha"
          background-color="rgba(255, 255, 255, 0.2)"
          class="input-box mb-2"
          :placeholder="$t('tip.mobile-captcha')"
          :rules="[rules.isRequired]"
          maxlength="25"
          hide-details="auto"
          solo
          rounded
          dark
          flat
          prepend-icon="*"
          append-outer-icon=" "
          prepend-inner-icon="far fa-comment-alt-check"
        ></v-text-field>
        <div class="d-flex justify-center align-center">
          <v-checkbox
            class="mt-0 pt-0 check-box"
            v-model="checkbox"
            required
            :rules="[v => !!v || $t('rules.checkbox')]"
          >
            <template v-slot:label>
              <div class="white--text caption">
                {{ $t("tip.userCheck") }}
                <span class="highlight text-decoration-underline">{{
                  $t("tip.ruleList")
                }}</span>
              </div>
            </template>
          </v-checkbox>
        </div>
      </v-form>

      <div style="padding: 0 33px;" class="my-4">
        <v-btn class="btn-bg" block rounded large dark @click="validate"
          >{{ $t("sign-up") }}
        </v-btn>
      </div>
      <v-row
        align-content="center"
        justify="center"
        class="mt-4 highlight text-caption font-weight-bold text-decoration-underline"
      >
        <span @click="doOpenLoginDialog">{{
          $t("button.alreadyHaveAnAccount")
        }}</span>
      </v-row>
      <v-row
        align-content="center"
        justify="center"
        class="mt-1 highlight text-caption font-weight-bold text-decoration-underline"
      >
        <span>{{ $t("button.askMC") }}</span>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { captcha, register } from "@/api/account";

export default {
  name: "SignUp",
  data() {
    return {
      rotate: false,
      captchaImg: "",
      max: 11,
      min: 6,
      show1: false,
      show2: false,
      checkbox: null,
      showQQ: false,
      showWechat: false,
      showPhone: false,
      showEmail: false,
      valid: false,
      form: {
        userName: "",
        password: "",
        confirmPassword: "",
        captchaKey: "",
        captcha: "",
        qq: "",
        wechat: "",
        email: "",
        phone: "",
        phoneCaptcha: ""
      },
      rules: {
        isRequired: v => !!v || this.$t("rules.required"),
        textCount: v => !!v || this.$t("rules.textCount"),
        phoneCount: v => v.length <= 11 || this.$t("rules.phoneCount"),
        minmax: v =>
          (v && v.length <= this.max && v.length >= this.min) ||
          this.$t("rules.minmax"),
        passwordConfirm: () =>
          this.form.confirmPassword === this.form.password ||
          this.$t("rules.passwordConfirm")
      }
    };
  },
  computed: {
    ...mapGetters(["getRegisterFields", "getVerificationPattern"])
  },
  mounted() {
    this.getCaptchaImg();

    this.showQQ = this.getRegisterFields.find(e => e["fieldDesc"] === "qq");
    this.showWechat = this.getRegisterFields.find(
      e => e["fieldDesc"] === "wechat"
    );
    this.showPhone = this.getRegisterFields.find(
      e => e["fieldDesc"] === "phone"
    );
    this.showEmail = this.getRegisterFields.find(
      e => e["fieldDesc"] === "email"
    );
  },
  methods: {
    doCloseDialog() {
      // const path = this.$route.query.goBack !== undefined ? this.$route.query.goBack : "";
      const path = "/";
      this.$router.push(path);
    },
    doOpenLoginDialog() {
      this.$router.push({
        path: "/sign-in",
        query: { redirect: "/", goBack: "/" }
      });
    },
    validate() {
      const _this = this;
      if (this.$refs.form.validate()) {
        register(_this.form)
          .then(res => {
            _this.$store.dispatch("setUserToken", "Bearer " + res["token"]);
            _this.$store.dispatch("setUserUid", res["userId"]);
            const path =
              _this.$route.query.redirect !== undefined
                ? _this.$route.query.redirect
                : "";
            _this.$router.push(path);
          })
          .catch(() => {
            _this.getCaptchaImg();
          });
      }
    },
    startRotate() {
      const _this = this;
      if (!this.rotate) {
        this.rotate = true;
        _this.getCaptchaImg();
      }
      setTimeout(function() {
        _this.rotate = false;
      }, 1000);
    },
    getCaptchaImg() {
      const _this = this;
      this.form.captchaKey = Math.floor(
        Math.random() * Number(new Date())
      ).toString();
      const formData = new FormData();
      formData.append("key", this.form.captchaKey.toString());
      formData.append("type", "png");
      formData.append("rule", this.getVerificationPattern);

      captcha(formData).then(res => {
        _this.captchaImg =
          "data:image/png;base64," +
          new Buffer(res, "binary").toString("base64");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.rotate-btn {
  animation: rotate 0.3s linear 1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.sign-up-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  background-image: url("../assets/signIn/bg.png");
  background-position: 50%;
  background-size: cover;

  .go-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;

    > img {
      width: 100%;
    }
  }

  .logo-panel {
    margin: auto;
    width: 70px;

    > img {
      width: 100%;
    }
  }
}

.btn-bg {
  background: linear-gradient(
    to left,
    rgba(#eaddd6, 0.5) 0%,
    rgba(#db8b72, 0.5) 100%
  ) !important;
}

.hint {
  position: absolute;
  right: 30px;
  top: -12px;
  color: #fd7e7e !important;
}

.highlight {
  color: #fd7e7e;
}
</style>
<style lang="scss">
.sign-up-panel {
  .input-box {
    .v-input__slot {
      padding: 0 18px !important;
    }

    &.captcha-box {
      .v-text-field__slot {
        padding: 0 5px 0 0 !important;
      }
    }
  }

  .v-input__prepend-inner {
    padding-right: 12px !important;
  }

  .input-box {
    position: relative;

    .v-input__prepend-outer {
      margin-top: 15px !important;

      .v-icon {
        color: #fd7e7e !important;
      }
    }
  }

  .btn-bg {
    .v-btn__content {
      opacity: 1 !important;
      font-weight: 700;
    }
  }

  .check-box {
    .v-icon.notranslate {
      color: #fd7e7e !important;
    }

    .v-input--selection-controls__ripple {
      display: none;
    }
  }

  .reload-btn {
    max-width: 1.5rem !important;
    min-width: 1.5rem !important;

    .v-btn__content {
      max-width: 1.5rem !important;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
}
</style>