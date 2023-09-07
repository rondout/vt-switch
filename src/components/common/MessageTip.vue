<script lang="ts" setup>
import Iconfont from "../layouts/Iconfont.vue";

const { title } = defineProps<{ title: string }>();
</script>

<template>
  <div class="flex-start flex-nowrap items-start">
    <Iconfont :size="16" color="#FA8C16" icon="ic_toast_alert"></Iconfont>
    <span class="title2">{{ $t(title) }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
