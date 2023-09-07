<script lang="ts">
export interface ConfigTabs {
  path: Pathnames;
  title: string;
}
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { TabPane, Tabs } from "ant-design-vue";
import { Pathnames } from "@/models/base.model";
import { useRoute, useRouter } from "vue-router";
// import { portConfigTabs } from "@/models/portConfig.model";
const route = useRoute();
const router = useRouter();

let matchedPath = $ref(route.path);

watch(
  () => router.currentRoute.value.path,
  (val) => (matchedPath = val)
);

const { tabs } = defineProps<{ tabs: ConfigTabs[] }>();

const handleTabClick = (path: string | number) => {
  //   console.log(a);
  router.push(path as string);
};
</script>

<template>
  <Tabs
    @tabClick="handleTabClick"
    class="port-config-tabs"
    v-model:activeKey="matchedPath"
    type="card"
  >
    <template #rightExtra>
      <slot name="rightExtra"></slot>
    </template>
    <TabPane v-for="tab of tabs" :key="tab.path" :tab="$t(tab.title)">
    </TabPane>
    <div :style="{ padding: '24px' }">
      <RouterView></RouterView>
      <slot></slot>
    </div>
  </Tabs>
</template>

<style lang="scss">
.port-config-tabs {
  .ant-tabs-tab {
    background-color: unset;
    border: none !important;
    background-color: unset !important;
    padding: 10px 40px !important;
  }
  .ant-tabs-tab-active {
    background-color: #fff !important;
  }
  .ant-tabs-nav {
    margin: 0 !important;
  }
  .ant-tabs-nav::before {
    display: none;
  }
  .ant-tabs-content {
    height: 100%;
    background-color: #fff;
    overflow: auto;
  }
  height: 100%;
}
</style>
