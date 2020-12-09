<template>
  <div class="caption">
    {{ $t("helpLink.message")
    }}<span class="text-decoration-underline highlight">{{
      $t("helpLink.contact")
    }}</span>
  </div>
</template>

<script>
export default {
  name: "HelpLink"
};
</script>

<style lang="scss" scoped>
.highlight {
  color: #c09267;
  cursor: pointer;
}
</style>
