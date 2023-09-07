<script lang="ts" setup>
import { Button } from "ant-design-vue";

const { left = false, loading = false } = defineProps<{
  left?: boolean;
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: "ok"): void;
  (e: "cancel"): void;
}>();

const handleOk = () => {
  emits("ok");
};

const handleCancel = () => {
  emits("cancel");
};
</script>

<template>
  <div style="margin-top: 24px" class="flex-btw">
    <div v-if="!left">
      <slot></slot>
    </div>
    <div class="flex">
      <Button
        :disabled="loading"
        @click="handleCancel"
        style="margin-right: 16px"
        >{{ $t("cancel") }}</Button
      >
      <Button
        :disabled="loading"
        :loading="loading"
        @click="handleOk"
        type="primary"
        >{{ $t("saveChange") }}</Button
      >
    </div>
    <div v-if="left">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
