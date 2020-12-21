<template>
  <section class="custom-input-panel">
    <div>
      <div class="bank-card-panel pt-2 relative">
        <img class="bank-card-svg" src="../assets/svg/bank-card.svg" alt="" />
        <div class="content">
          <div class="ml-2">{{ bankObj.desc }}</div>
          <v-divider></v-divider>
          <div>{{ bankForm.account }}</div>
          <div>{{ bankForm.branchItem }}</div>
          <div>{{ bankForm.accountName }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { bankList, branchList } from "@/api/memberCenter";
import {mapGetters} from "vuex";

export default {
  name: "WithdrawalPage",
  computed: {
    ...mapGetters({
      userInfo: "getUserInfoObj"
    })
  },
  data() {
    return {
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
      this.$t("button.card")
    );

    bankList().then(res => {
      _this.bankList = res;
    });
  },
  methods: {
    submit() {
      this.page = 2;
      // addMemberBank({
      //   account: this.bankForm.accountName,
      //   bankBranch: this.branchItem,
      //   bankCode: this.bankObj.code,
      //   realName: this.bankForm.account,
      //   withdrawPassword: this.bankForm.withdrawPassword
      // }).then(res => {
      //   console.log("res", res);
      // });
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

.bank-card-panel {
  .bank-card-svg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 90vw;
  }

  .content {
    position: absolute;
    width: 90vw;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    text-align: left;
    padding-left: 20px;
  }
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
