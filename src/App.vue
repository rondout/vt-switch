<script setup lang="ts">
import { RouterView } from "vue-router";
import { ConfigProvider, Button } from "ant-design-vue";
import { ref } from "vue";
import { themeColor } from "@/util";
import { useMainStore } from "./stores";
import { Locale } from "ant-design-vue/es/locale";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUs from "ant-design-vue/es/locale/en_US";
import { Languages } from "./models/base.model";

let colorPrimary = ref("#3f51b5");

const { $state } = useMainStore();

const changeTheme = (color: string) => {
  colorPrimary.value = color;
};

const localeMap = new Map<Languages, Locale>([
  [Languages.zh, zhCN],
  [Languages.en, enUs],
]);

changeTheme(themeColor);
</script>

<template>
  <ConfigProvider
    :theme="{
      token: { colorPrimary, borderRadius: 2 },
    }"
    :locale="localeMap.get($state.language)"
  >
    <!-- <Button type="primary" @click="changeTheme('#009CEB')">Change Theme</Button> -->
    <RouterView />
  </ConfigProvider>
</template>

<style scoped></style>
