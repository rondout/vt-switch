<script lang="ts" setup>
const { title, mb = 0 } = defineProps<{ title: string; mb?: number }>();
</script>

<template>
  <div :style="{ marginBottom: mb + 'px' }" class="flex-start title-container">
    <div class="primary-title-tab"></div>
    <h2 class="h2">{{ $t(title) }}</h2>
  </div>
</template>

<style scoped lang="scss"></style>
