<template>
  <section class="message-center">
    <v-btn-toggle
      class="switch-button my-3 mx-3"
      v-model="toggleExclusive"
      @change="doToggleMcHeaderOption"
    >
      <v-btn
        class="switch-item white"
        :class="{ 'btn-bg': toggleExclusive === 0 }"
      >
        {{ $t("messageCenter.notice") }}
      </v-btn>
      <v-divider
        v-show="toggleExclusive === 2"
        class="my-2"
        vertical
      ></v-divider>
      <v-btn
        class="switch-item white"
        :class="{ 'btn-bg': toggleExclusive === 1 }"
      >
        {{ $t("messageCenter.announcement") }}
      </v-btn>
      <v-divider
        v-show="toggleExclusive === 0"
        class="my-2"
        vertical
      ></v-divider>
      <v-btn
        class="switch-item white"
        :class="{ 'btn-bg': toggleExclusive === 2 }"
      >
        {{ $t("messageCenter.opinion") }}
      </v-btn>
    </v-btn-toggle>
    <div v-if="toggleExclusive === 0">
      <message-center-item
        v-for="e in messageList"
        :obj="e"
        :key="e.id"
        :call-back="closeMessageListExpand"
      >
      </message-center-item>
    </div>
    <div v-if="toggleExclusive === 1">
      <message-center-item
        v-for="e in bulletinList"
        :obj="e"
        :key="e.id"
        :call-back="closeBulletinListExpand"
      >
      </message-center-item>
    </div>
    <v-dialog
      v-model="mcDialog"
      content-class="bottom-panel"
      transition="dialog-bottom-transition"
      fullscreen
      scrollable
      @click:outside="toggleMcOption"
    >
      <v-card>
        <v-btn
          color="white"
          class="subtitle-2 btn mt-4"
          height="50"
          elevation="0"
          @click="toggleEditPanel"
          >{{ $t("button.edit") }}
        </v-btn>
        <v-divider></v-divider>
        <v-btn class="subtitle-2" color="white" height="50" elevation="0"
          >{{ $t("button.read") }}
        </v-btn>
        <v-divider></v-divider>
        <div
          class="subtitle-2 btn pt-3 white"
          style="background-color: #f8f8f8 !important;"
        ></div>
        <v-btn
          class="btn"
          color="white"
          height="50"
          elevation="0"
          @click="toggleMcOption"
          >{{ $t("button.cancel") }}
        </v-btn>
      </v-card>
    </v-dialog>
    <v-overlay :value="mcDialog"></v-overlay>

    <div
      v-if="mcEditPanel"
      class="edit-panel d-flex justify-start align-center"
    >
      <div class="select-all-btn pl-3 py-1 d-flex justify-center align-center">
        <input type="checkbox" class="mr-1" />
        {{ $t("button.selectAll") }}
        <v-divider
          class="mx-5"
          style="background-color: #d2b79c"
          vertical
        ></v-divider>
      </div>
      <v-btn
        color="#c09267"
        tile
        elevation="0"
        class="select-all-read white--text px-0 text-left"
      >
        {{ $t("button.read") }}
      </v-btn>
      <v-icon class="trash-icon">
        far fa-trash-alt
      </v-icon>
    </div>
  </section>
</template>

<script>
import { siteBulletin, siteMessage } from "@/api/messageCenter";
import MessageCenterItem from "@/components/MessageCenterItem";
import { mapGetters } from "vuex";

export default {
  name: "MessageCenter",
  components: { MessageCenterItem },
  computed: {
    ...mapGetters({
      mcDialog: "getMcOptionDialog",
      mcEditPanel: "getMcEditPanel"
    })
  },
  data() {
    return {
      toggleExclusive: 0,
      messageList: [],
      bulletinList: [],
      checkAll: false
    };
  },
  mounted() {
    const _this = this;
    this.$store.dispatch(
      "setMcPageTitle",
      this.$t("memberCenter.massageCenter")
    );
    siteMessage().then(res => {
      _this.messageList = res.map(e => {
        e["showExpand"] = false;
        return e;
      });
    });
    siteBulletin().then(res => {
      _this.bulletinList = res.map(e => {
        e["showExpand"] = false;
        return e;
      });
    });

    this.doToggleMcHeaderOption();
  },
  methods: {
    toggleEditPanel() {
      this.$store.dispatch("doToggleEditPanel", true);
      this.$store.dispatch("doToggleMcOption", false);
    },
    closeMessageListExpand() {
      this.messageList.forEach(e => {
        e.showExpand = false;
      });
    },
    closeBulletinListExpand() {
      this.bulletinList.forEach(e => {
        e.showExpand = false;
      });
    },
    doToggleMcHeaderOption() {
      this.$store.dispatch("doToggleMcOption", false);
      this.$store.dispatch("doToggleEditPanel", false);

      if (this.toggleExclusive !== 2) {
        this.$store.dispatch("doToggleMcHeaderOption", true);
      } else {
        this.$store.dispatch("doToggleMcHeaderOption", false);
      }
    },
    toggleMcOption() {
      this.$store.dispatch("doToggleMcOption", false);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("doToggleMcHeaderOption", false);
    this.$store.dispatch("doToggleMcOption", false);
    this.$store.dispatch("doToggleEditPanel", false);
    next();
  }
};
</script>

<style lang="scss" scoped>
.switch-button .btn-bg {
  color: white;
  background: linear-gradient(
    to right,
    rgba(220, 202, 184, 1) 0%,
    rgba(210, 180, 150, 1) 100%
  ) !important;
}

.edit-panel {
  height: 40px;
  width: 100%;
  background-color: #c09267;
  position: fixed;
  bottom: 0;

  .trash-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 12px;
    margin: auto;
    font-size: 20px;
    color: white;
  }

  .select-all-btn {
    font-size: 12px;
    color: white;
  }

  .select-all-read {
    height: 100%;
  }
}
</style>

<style>
.bottom-panel {
  height: 180px !important;
  top: auto !important;
  bottom: 0 !important;
  border-top-right-radius: 15px !important;
  border-top-left-radius: 15px !important;
}
</style>