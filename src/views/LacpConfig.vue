<script lang="ts" setup>
import ConfigureTabs from "@/components/common/ConfigureTabs.vue";
import { lacpConfigTabs } from "@/models/lacpConfig.model";
</script>

<template>
  <ConfigureTabs :tabs="lacpConfigTabs">
    <!-- <template #rightExtra>
      <slot name="rightExtra"></slot>
    </template>
    <slot></slot> -->
  </ConfigureTabs>
</template>

<style lang="scss"></style>
