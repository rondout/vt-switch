<script lang="ts" setup>
import { emit } from "process";
import Iconfont from "../layouts/Iconfont.vue";

const emits = defineEmits<{ (e: "ok"): void; (e: "cancel"): void }>();

const handleOk = () => {
  emits("ok");
};
const handleCancel = () => {
  emits("cancel");
};
</script>

<template>
  <div class="flex-start flex-nowrap">
    <Iconfont color="#52C41A" @click="handleOk" icon="ic_ok"></Iconfont>
    <Iconfont color="#F5222D" @click="handleCancel" icon="ic_cancle"></Iconfont>
  </div>
</template>

<style scoped lang="scss"></style>
