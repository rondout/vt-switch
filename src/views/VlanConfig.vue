<script lang="ts" setup>
import ConfigureTabs from "@/components/common/ConfigureTabs.vue";
import { vlanConfigTabs } from "@/models/vlanConfig.model";
</script>

<template>
  <ConfigureTabs :tabs="vlanConfigTabs">
    <template #rightExtra>
      <slot name="rightExtra"></slot>
    </template>
    <slot></slot>
  </ConfigureTabs>
</template>

<style lang="scss"></style>
