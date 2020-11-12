<template>
  <div class="mb-3 py-2 px-8 message-panel">
    <div class="expand-btn" @click="click">
      <div
        class="arrow-icon"
        :class="{ expand: obj.showExpand, collapse: !obj.showExpand }"
      >
        <img src="../assets/svg/icon-menu-l-arrow.svg" alt="" />
        {{ obj.showExpand ? $t("button.collapse") : $t("button.expand") }}
      </div>
    </div>
    <div class="m-date text-left caption">
      <div class="select-btn">
        <input v-if="mcSelect" type="checkbox" />
      </div>
      <div>{{ obj["createTime"] }}</div>
    </div>
    <div class="m-title text-left subtitle-2">
      <img
        v-if="obj['readTime'] === null"
        src="../assets/svg/list-close.svg"
        alt=""
      />
      <img v-else src="../assets/svg/list-close-2.svg" alt="" />
      {{ obj["title"] }}
    </div>
    <div
      class="m-content text-left caption mb-2"
      :class="{ overflow: !obj.showExpand }"
    >
      {{ obj["content"] }}
    </div>
    <v-divider v-if="obj.showExpand" class="mx-8 in-divider"></v-divider>
    <div class="m-content text-right caption mb-1" v-if="obj.showExpand">
      {{ obj["createUser"] }}
    </div>
    <v-divider class="mx-8 divider"></v-divider>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageCenterItem",
  props: {
    obj: {
      type: Object,
      default: function() {
        return {};
      }
    },
    callBack: {
      type: Function
    }
  },
  computed: {
    ...mapGetters({
      mcSelect: "getMcEditPanel"
    })
  },
  methods: {
    click() {
      if (this.obj.showExpand === true) {
        this.callBack();
      } else {
        this.callBack();
        this.obj.showExpand = !this.obj.showExpand;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.message-panel {
  min-height: 93px;
  background-color: white;
  position: relative;

  > .expand-btn {
    position: absolute;
    top: 0;
    right: 15px;
    height: 24px;
    font-size: 12px;
    padding: 0 5px 0 4px;
    box-sizing: inherit;
    cursor: pointer;
    z-index: 500;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #9aa4c2;

    border-left: 2px solid rgba(0, 0, 0, 0.12);
    border-right: 2px solid rgba(0, 0, 0, 0.12);
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .arrow-icon {
      display: flex;
      justify-content: center;
      align-items: center;

      &.expand {
        img {
          transform: rotate(90deg) !important;
        }
      }

      &.collapse {
        img {
          transform: rotate(270deg) !important;
        }
      }

      > img {
        width: 18px;
        filter: invert(1);
        margin-right: 2px;
        transition: all 0.3s ease;
      }
    }
  }

  > .m-date {
    color: #9aa4c2;
    position: relative;

    .select-btn {
      position: absolute;
      left: -19px;
      top: 2px;
    }
  }

  > .m-title {
    position: relative;

    img {
      position: absolute;
      left: -24px;
    }
  }

  > .m-content {
    &.overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-height: 50px;
    }

    max-height: 500px;
    width: 100%;
    color: #9aa4c2;
    transition: max-height 0.5s ease;
  }

  > .divider {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    margin: auto;
  }

  > .in-divider {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
