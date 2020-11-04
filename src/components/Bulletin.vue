<template>
  <div class="bulletin fill-height d-flex justify-center align-center">
    <img style="height: 15px" src="../assets/svg/icon.svg" alt="" />
    <div class="message-panel mx-1 flex d-flex justify-start align-center">
      <div class="msg" :style="style">
        <span v-for="e in info" :key="e.id">{{ e.content }}</span>
      </div>
    </div>
    <img style="height: 19px" src="../assets/svg/info-label.svg" alt="" />
  </div>
</template>

<script>
import { bulletins } from "@/api/homePage";

export default {
  name: "Bulletin",
  data() {
    return {
      px: window.innerWidth * 0.8,
      info: [
        {
          id: 0,
          content: "123"
        }
      ]
    };
  },
  computed: {
    style() {
      return { transform: "translateX(" + this.px + "px)" };
    }
  },
  mounted() {
    const _this = this;
    bulletins().then(res => {
      _this.info = res;
      _this.px = window.innerWidth * 0.8;

      let sum = 0;

      for (let i = 0; i < _this.info.length; i++) {
        sum += _this.info[i].content.length;
      }

      setInterval(function() {
        if (0 - _this.px > sum * 3 + window.innerWidth) {
          _this.px = window.innerWidth * 0.8;
        }
        _this.px -= 2;
      }, 50);
    });
  }
};
</script>

<style lang="scss" scoped>
.bulletin {
  width: 100%;

  > * {
    height: 100%;
  }

  .message-panel {
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;

    > .msg {
      color: #9aa4c2;

      > span {
        margin-right: 20px;
      }
    }
  }
}
</style>
