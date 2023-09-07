<script lang="ts" setup>
import ConfigureTabs from "@/components/common/ConfigureTabs.vue";
import { stpConfigTabs } from "@/models/stpConfig.model";
</script>

<template>
  <ConfigureTabs :tabs="stpConfigTabs">
    <!-- <template #rightExtra>
      <slot name="rightExtra"></slot>
    </template>
    <slot></slot> -->
  </ConfigureTabs>
</template>

<style lang="scss"></style>
