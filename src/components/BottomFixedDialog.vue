<template>
  <v-dialog
    v-model="showBottomDialog"
    content-class="bottom-panel"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
    @click:outside="$store.dispatch('toggleBottomDialogList', false)"
  >
    <slot name="content"></slot>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BottomFixedDialog",
  computed: {
    ...mapGetters({
      showBottomDialog: "getDialogVisible"
    })
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
