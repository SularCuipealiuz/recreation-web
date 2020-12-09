<template>
  <section class="custom-input-panel">
    <div class="white mt-3 pt-2">
      <v-text-field
        class="mt-2 mb-1 input-panel caption sm-icon"
        label="选择银行"
        placeholder="请选择"
        prepend-icon="*"
        append-outer-icon="far fa-chevron-right"
        readonly
        hide-details
        v-model="bankItem"
        @click="$store.dispatch('toggleBankList', true)"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
        class="mt-4 mb-1 input-panel caption"
        label="真实姓名"
        placeholder="请确保姓名与开户行姓名一致，否则将无法提款"
        prepend-icon="*"
        hide-details
        v-model="bankForm.account"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
        class="mt-4 mb-1 input-panel caption"
        label="卡号"
        placeholder="请输入银行卡卡号"
        prepend-icon="*"
        hide-details
        v-model="bankForm.accountName"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
        class="mt-4 mb-1 input-panel caption sm-icon"
        label="开户支行"
        placeholder="请选择"
        prepend-icon="*"
        append-outer-icon="far fa-chevron-right"
        readonly
        hide-details
        v-model="bankItem"
        @click="$store.dispatch('toggleBankList', true)"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
      <v-text-field
        class="mt-4 mb-1 input-panel caption"
        label="取款密码"
        placeholder=" "
        prepend-icon="*"
        :append-outer-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        hide-details
        @click:append-outer="show1 = !show1"
      ></v-text-field>
      <v-divider class="mx-3"></v-divider>
    </div>

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
    <bottom-fixed-dialog>
      <template v-slot:content>
        <v-card color="#f4f4f4" tile>
          <v-toolbar class="header-panel">
            <v-btn icon dark @click="$store.dispatch('toggleBankList', false)">
              取消
            </v-btn>
            <v-toolbar-title class="subtitle-1">选择所属银行</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-0 pt-4">
            <div v-for="(e, index) in bankList" :key="index">
              <v-btn
                class="justify-start align-center py-6 white bank-btn"
                block
                tile
                elevation="0"
                @click="selectBankItem(e)"
              >
                {{ e.desc }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </bottom-fixed-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import BottomFixedDialog from "@/components/BottomFixedDialog";
import { bankList } from "@/api/memberCenter";

export default {
  name: "AddBankCardPage",
  components: { BottomFixedDialog },
  computed: {
    ...mapGetters({
      bankItem: "getBankItem"
    })
  },
  data() {
    return {
      show1: false,
      list: this.$route.params.channelInfo,
      channelItem: this.$route.params,
      bankForm: {
        uid: "",
        channelId: 0,
        bankName: "",
        account: "",
        accountName: "",
        memberNote: "",
        amount: 0
      },
      bankList: []
    };
  },
  mounted() {
    const _this = this;
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("bankCardManage.addNewBankCard")
    );

    bankList().then(res => {
      _this.bankList = res;
    });
  },
  methods: {
    selectBankItem(element) {
      this.$store.dispatch("selectBankItem", element.desc);
      this.$store.dispatch("toggleBankList", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  height: 40px !important;
}

.header-panel {
  flex: 0 0 auto !important;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
  border-bottom: 1px solid #eeeeee !important;
}

.bank-btn {
  border-bottom: 1px solid #eeeeee !important;
  background-color: white !important;
}
</style>

<style lang="scss">
.v-input__prepend-outer {
  margin-right: 0px !important;
}

.v-input__prepend-outer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 0 !important;
  margin-right: 4px !important;
}

.v-input__slot::after {
  border-color: transparent !important;
  background-color: transparent !important;
}

.v-input__icon--prepend {
  margin-left: 8px;
}

.v-input__slot::before {
  border-color: transparent !important;
  background-color: transparent !important;
}

.v-input__icon--append-outer {
  margin-top: -9px !important;
  margin-right: 8px !important;

  > * {
    font-size: 22px !important;
  }
}

.sm-icon .v-input__icon--append-outer {
  > * {
    font-size: 14px !important;
  }
}
</style>
