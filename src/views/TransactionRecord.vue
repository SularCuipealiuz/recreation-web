<template>
  <section class="d-flex fill-height flex-column justify-center align-center">
    <div class="select-panel mt-2 px-3 d-flex white flex-column">
      <div class="fill-height d-flex py-3 relative">
        <div class="select-box rounded" @click="switchDialog = 'option'">
          {{ optionItem.label }}
          <v-icon class="arrow">fas fa-caret-down</v-icon>
          <div
            v-show="switchDialog === 'option'"
            class="select-dialog pa-4 white rounded-lg"
          >
            <div class="grid">
              <div
                v-for="(e, i) in optionList"
                class="flex-auto item"
                :class="{ active: transactionType === e.type }"
                @click="selectOptionItem(e)"
                :key="i"
              >
                {{ e.label }}
              </div>
            </div>
          </div>
        </div>
        <div class="select-box rounded ml-2" @click="switchDialog = 'date'">
          选择日期
          <v-icon class="arrow">fas fa-caret-down</v-icon>
          <div
            v-show="switchDialog === 'date'"
            class="select-dialog date pa-4 white rounded-lg"
          >
            <div class="text-left">
              当前系统支持查询最近30日的交易记录
            </div>
            <div class="grid">
              <div
                v-for="(e, i) in dateOptionList"
                class="flex-auto item"
                :class="{ active: dateItemType === e.type }"
                @click="dateItemType = e.type"
                :key="i"
              >
                {{ e.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
    <div class="d-flex flex-auto empty-panel flex-column relative">
      <div
        v-show="switchDialog !== ''"
        class="cover"
        @click="switchDialog = ''"
      ></div>
      <div class="flex-auto">
        <div></div>
      </div>
      <div class="empty-pic-panel">
        <div class="message">
          <div class="d-flex flex-column justify-start align-center relative">
            <img
              class="message-icon"
              src="../assets/svg/warning-icon.svg"
              alt=""
            />
            <span>目前尚无任何</span>
            <span>{{ $t("memberCenter.transactionHistory") }}</span>
          </div>
        </div>
        <img
          class="pic"
          width="100%"
          height="100%"
          src="../assets/svg/empty-pic.svg"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TransactionRecord",
  mounted() {
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("memberCenter.transactionHistory")
    );
  },
  computed: {
    optionItem() {
      return this.optionList.find(e => e.type === this.transactionType);
    }
  },
  data() {
    return {
      switchDialog: "",
      type: 0,
      dateStart: "",
      dateEnd: "",
      transactionType: 1,
      dateItemType: 1,
      optionList: [
        {
          label: "存款",
          type: 1
        },
        {
          label: "取款",
          type: 2
        },
        {
          label: "转账",
          type: 3
        },
        {
          label: "其它",
          type: 4
        }
      ],
      dateOptionList: [
        {
          label: "今日",
          type: 1
        },
        {
          label: "昨日",
          type: 2
        },
        {
          label: "本周",
          type: 3
        },
        {
          label: "上周",
          type: 4
        },
        {
          label: "近7日",
          type: 5
        },
        {
          label: "近30日",
          type: 6
        },
        {
          label: "自定义",
          type: 7
        }
      ]
    };
  },
  methods: {
    selectOptionItem(e) {
      this.transactionType = e.type;
      this.switchDialog = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.cover {
  height: 100%;
  width: 100%;
  background-color: black;
  position: absolute;
  z-index: 100;
  opacity: 0.6;
}

.select-panel {
  height: 58px;
  width: 100%;

  .select-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #97a4c5;
    color: #97a4c5;
    width: 100px;
    height: 35px;
    font-size: 14px;

    .arrow {
      font-size: 18px !important;
      color: #97a4c5;
      margin-left: 4px;
    }

    .select-dialog {
      position: absolute;
      top: 50px;
      left: 0;
      width: calc(100vw - 24px);
      box-shadow: 0 0 2px 0 rgba(151, 164, 197, 0.4);
      z-index: 300;

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 8px;

        .item {
          border: 1px solid #97a4c5;
          color: #97a4c5;
          border-radius: 4px;
          height: 35px;

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;

          &.active {
            border: 1px solid #d2b79c;
            background-color: #d2b79c;
            color: white;
          }
        }
      }

      &:after {
        border-color: transparent transparent #fff;
        border-style: solid solid solid solid;
        border-width: 0 8px 8px 8px;
        filter: drop-shadow(0px -1px 1px rgba(151, 164, 197, 0.4));
        top: -8px;

        content: "";
        height: 0;
        left: 50px;
        position: absolute;
        width: 0;
      }

      &.date:after {
        left: 150px;
      }
    }
  }
}

.empty-panel {
  width: 100%;

  .empty-pic-panel {
    position: relative;

    .message {
      position: absolute;
      left: 0;
      right: 0;
      top: 124px;
      margin: auto;
      color: #97a4c5;
      font-size: 14px;

      .message-icon {
        position: absolute;
        left: 125px;
        top: 3px;
      }
    }
  }
}
</style>
