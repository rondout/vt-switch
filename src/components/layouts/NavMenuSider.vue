<script lang="ts" setup>
import { Menu } from "ant-design-vue";
import { reactive, watch } from "vue";
import { createNavItems, Pathnames } from "@/models/base.model";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { routes } from "@/router";

const router = useRouter();
const route = useRoute();

const { t } = useI18n();

let openKey = $ref(route.meta.parent);

onBeforeRouteUpdate((to) => {
  openKey = to.meta.parent;
});

// const matchedPath = $computed<Pathnames>(() => {
//   const matchedPathsLength = matchedPaths?.length;
//   if (matchedPathsLength) {
//     const matchedPath = matchedPaths[matchedPathsLength - 2];
//     return matchedPath?.path as Pathnames;
//   }
//   return null;
// });
const computeSelectedKey = (): string => {
  const matchedRoute = router.currentRoute.value;
  if (matchedRoute.meta.navPathMatch) {
    return matchedRoute.meta.navPathMatch as string;
  }
  return router.currentRoute.value.path;
};

const state = reactive({
  collapsed: false,
  selectedKeys: [computeSelectedKey()],
  openKeys: [openKey as string],
  preOpenKeys: ["sub1"],
});

const handleMenuSelect = (key: string) => {
  router.push(key);
};

watch(
  () => router.currentRoute.value,
  (val) => {
    state.selectedKeys = [computeSelectedKey()];
  }
);

watch(
  () => state.selectedKeys,
  (val) => {}
);
</script>

<template>
  <div class="flex" :style="{ height: '80px' }">
    <img :width="144" :height="48" src="@/assets/img/logo_white.svg" alt="" />
  </div>
  <div id="mav-menu-container">
    <Menu
      @click="(e) => handleMenuSelect(e.key as string)"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="createNavItems(t)"
    ></Menu>
  </div>
</template>

<style lang="scss">
#mav-menu-container {
  height: calc(100% - 80px);
  padding-bottom: 8px;
  overflow: auto;
  .iconfont {
    font-size: 24px !important;
  }

  .ant-menu-item {
    width: 100%;
    margin-inline: 0 !important;
    border-radius: 0;
    margin-block: 0 !important;
    height: 44px;
  }

  .ant-menu-submenu-title {
    height: 44px;
    border-radius: 0;
    width: 100%;
    margin: 0;
  }
}
</style>
