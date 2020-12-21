<template>
  <section class="d-flex fill-height flex-column justify-center align-center">
    <div class="select-panel mt-2 px-3 d-flex white flex-column">
      <div class="fill-height d-flex py-3 relative">
        <div class="select-box rounded" @click.self="switchDialog = 'option'">
          {{ gameTypeItem.label }}
          <v-icon class="arrow" @click.self="switchDialog = 'option'">
            fas fa-caret-down
          </v-icon>
          <div
            v-show="switchDialog === 'option'"
            class="select-dialog pa-4 white rounded-lg"
          >
            <div class="grid">
              <div
                v-for="(e, i) in gameTypeList"
                class="flex-auto item"
                :class="{ active: rebateType === e.typeId }"
                @click="selectOptionItem(e)"
                :key="i"
              >
                {{ e.label }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="select-box rounded ml-2"
          @click.self="switchDialog = 'date'"
        >
          {{ dateOptionItem.label }}
          <v-icon class="arrow" @click.self="switchDialog = 'date'">
            fas fa-caret-down
          </v-icon>
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
                @click="selectDateOptionItem(e)"
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
    <div class="d-flex flex-auto main-panel flex-column relative">
      <div
        v-show="switchDialog !== ''"
        class="cover"
        @click="switchDialog = ''"
      ></div>
      <div class="flex-auto">
        <div v-if="recordList.length > 0" class="scroll-panel">
          <div
            class="item-panel my-3 white"
            v-for="e in recordList"
            :key="e.orderNo"
          >
            <div class="head d-flex justify-space-between align-center px-4">
              <div class="highlight caption">·{{ gameTypeItem.label }}·</div>
              <div class="date">{{ e.time }}</div>
            </div>
            <div class="content d-flex flex-column text-left py-3 px-4">
              <div class="subtitle-1 black--text">{{ e.activityName }}</div>
              <v-divider class="mb-1"></v-divider>
              <div class="d-flex align-center justify-space-between">
                <span class="caption"> 活动标题：{{ e.activityTitle }} </span>
                <span class="caption" style="color: #c09267"
                  >{{ e.approveStatus }}
                </span>
              </div>
              <span class="caption"> 优惠：{{ e.promoteAmount }}元 </span>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-pic-panel" v-if="recordList.length === 0">
        <div class="message">
          <div class="d-flex flex-column justify-start align-center relative">
            <img
              class="message-icon"
              src="../assets/svg/warning-icon.svg"
              alt=""
            />
            <span>目前尚无任何</span>
            <span>{{ $t("memberCenter.bonus") }}</span>
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
import { rebateRecord } from "@/api/report";
import { mapGetters } from "vuex";

export default {
  name: "RebateRecord",
  mounted() {
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("memberCenter.bonus")
    );

    this.fetchList();
  },
  computed: {
    ...mapGetters({
      gameTypeList: "getGameTypeList"
    }),
    gameTypeItem() {
      return this.gameTypeList.find(e => e.typeId === this.rebateType);
    },
    dateOptionItem() {
      return this.dateOptionList.find(e => e.type === this.dateItemType);
    }
  },
  data() {
    return {
      recordList: [],
      switchDialog: "",
      type: 0,
      dateStart: "",
      dateEnd: "",
      rebateType: "1",
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
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    fetchList() {
      this.recordList = [];

      let now = new Date();
      let startDate = "";
      let endDate = "";
      let test = 0;
      switch (this.dateItemType) {
        case 1: {
          test = 0;
          break;
        }
        case 2: {
          test = 1;
          break;
        }
        case 3: {
          test = now.getDay();
          break;
        }
        case 4: {
          test = now.getDay() + 7;
          break;
        }
        case 5: {
          test = 7;
          break;
        }
        case 6: {
          test = 30;
          break;
        }
        case 7: {
          test = 1;
          break;
        }
      }
      this.dateItemType !== 7 ? (endDate = this.formatDate(now)) : "";
      this.dateItemType !== 7
        ? (startDate = this.formatDate(now.setDate(now.getDate() - test)))
        : "";

      rebateRecord({
        current: 1,
        model: {
          endDate: endDate,
          startDate: "2020-10-10",
          gameTypeId: Number(this.rebateType)
        },
        size: 10
      }).then(res => {
        this.recordList = res.records;
      });
      console.log(startDate);
    },
    selectOptionItem(e) {
      this.rebateType = e.typeId;
      this.switchDialog = "";
      this.fetchList();
    },
    selectDateOptionItem(e) {
      this.dateItemType = e.type;
      this.switchDialog = "";
      this.fetchList();
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

.main-panel {
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

.scroll-panel {
  position: absolute;
  width: 100%;
  max-height: 100%;
  overflow-y: scroll;
}

.item-panel {
  border-top: 1px solid rgba(203, 206, 216, 0.7) !important;
  border-bottom: 1px solid rgba(203, 206, 216, 0.7) !important;

  .head {
    background-color: rgba(203, 206, 216, 0.3);
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    height: 32px;

    .highlight {
      color: #c09267;
    }

    .date {
      color: #9aa4c2;
      font-size: 12px;
    }
  }

  .content {
    color: #97a4c5;
  }

  .blue-font {
    color: #6aaaf5;
  }
}
</style>
