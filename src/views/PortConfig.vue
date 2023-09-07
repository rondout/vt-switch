<script lang="ts" setup>
import { portConfigTabs } from "@/models/portConfig.model";
import ConfigureTabs from "@/components/common/ConfigureTabs.vue";
</script>

<template>
  <ConfigureTabs :tabs="portConfigTabs" />
</template>

<style lang="scss"></style>
