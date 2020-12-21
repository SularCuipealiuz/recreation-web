<template>
  <section class="custom-input-panel fill-height">
    <div v-if="page === 1" class="fill-height">
      <div class="white pt-2">
        <v-text-field
          class="mt-2 mb-1 input-panel caption sm-icon"
          label="选择银行"
          placeholder="请选择"
          prepend-icon="*"
          append-outer-icon="far fa-chevron-right"
          readonly
          hide-details
          v-model="bankItem"
          @click="openBankDialog"
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
          v-model="branchItem"
          @click="openBranchDialog"
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
          v-model="bankForm.withdrawPassword"
          @click:append-outer="show1 = !show1"
        ></v-text-field>
        <v-divider class="mx-3"></v-divider>
      </div>
      <v-col cols="12">
        <v-btn
          block
          depressed
          class="btn btn-bg rounded-lg text--white"
          @click="nextPage"
        >
          {{ $t("button.next") }}
        </v-btn>
      </v-col>
    </div>
    <div v-if="page === 2" class="fill-height">
      <bank-card :obj="bankFormObj"></bank-card>
      <div class="white subtitle-1 hint-color py-2 mt-3">
        请确认银行卡资料是否正确,点击确认提交送出
      </div>
      <v-col cols="12">
        <v-btn
          block
          depressed
          class="btn btn-bg rounded-lg text--white"
          @click="submit"
        >
          {{ $t("button.submit") }}
        </v-btn>
      </v-col>
    </div>
    <bottom-fixed-dialog>
      <template v-slot:content>
        <v-card color="#f4f4f4" tile>
          <v-toolbar class="header-panel">
            <v-btn
              icon
              dark
              @click="$store.dispatch('toggleBottomDialogList', false)"
            >
              取消
            </v-btn>
            <v-toolbar-title class="subtitle-1">选择所属银行</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-0 pt-4">
            <div v-for="(e, index) in dialogList" :key="index">
              <v-btn
                v-if="dialogType === 'bank'"
                class="justify-start align-center py-6 white bank-btn"
                block
                tile
                elevation="0"
                @click="selectBankItem(e)"
              >
                {{ e.desc }}
              </v-btn>
              <v-btn
                v-if="dialogType === 'branch'"
                class="justify-start align-center py-6 white bank-btn"
                block
                tile
                elevation="0"
                @click="selectBranchItem(e)"
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
import BottomFixedDialog from "@/components/BottomFixedDialog";
import { addMemberBank, bankList, branchList } from "@/api/memberCenter";
import BankCard from "@/components/BankCard";

export default {
  name: "AddBankCardPage",
  components: { BankCard, BottomFixedDialog },
  data() {
    return {
      bankFormObj: {},
      page: 1,
      dialogType: "",
      bankItem: null,
      bankObj: null,
      branchItem: null,
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
        amount: 0,
        withdrawPassword: ""
      },
      bankList: [],
      branchList: [],
      dialogList: []
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
    nextPage() {
      this.bankFormObj = {
        desc: this.bankObj.desc,
        account: this.bankForm.account,
        branchItem: this.branchItem,
        accountName: this.bankForm.accountName
      };
      this.page = 2;
    },
    submit() {
      addMemberBank({
        account: this.bankForm.accountName,
        bankBranch: this.branchItem,
        bankCode: this.bankObj.code,
        realName: this.bankForm.account,
        withdrawPassword: this.bankForm.withdrawPassword
      }).then(res => {
        if (res.code === 0) {
          this.$router.push({
            path: "/bank-card-manage"
          });
        }
      });
    },
    openBankDialog() {
      this.$store.dispatch("toggleBottomDialogList", true);
      this.dialogType = "bank";
      this.dialogList = this.bankList;
    },
    openBranchDialog() {
      const _this = this;
      if (_this.branchList.length === 0) {
        branchList({
          bankId: Number(_this.bankObj.code),
          branchName: _this.bankObj.desc
        }).then(res => {
          _this.branchList = res;
          _this.$store.dispatch("toggleBottomDialogList", true);
          _this.dialogType = "branch";
          _this.dialogList = this.branchList;
        });
      } else {
        _this.$store.dispatch("toggleBottomDialogList", true);
        _this.dialogType = "branch";
        _this.dialogList = this.branchList;
      }
    },
    selectBankItem(element) {
      this.bankObj = element;
      this.bankItem = element.desc;
      this.$store.dispatch("toggleBottomDialogList", false);
      this.dialogType = "";
    },
    selectBranchItem(element) {
      this.branchItem = element.desc;
      this.$store.dispatch("toggleBottomDialogList", false);
      this.dialogType = "";
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

.hint-color {
  color: #97a4c5;
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
