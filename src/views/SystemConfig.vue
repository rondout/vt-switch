<script lang="ts" setup>
import ConfigureTabs from "@/components/common/ConfigureTabs.vue";
import { systemConfigTabs } from "@/models/systemConfig.model";
</script>

<template>
  <ConfigureTabs :tabs="systemConfigTabs">
    <template #rightExtra>
      <slot name="rightExtra"></slot>
    </template>
    <slot></slot>
  </ConfigureTabs>
</template>

<style lang="scss"></style>
