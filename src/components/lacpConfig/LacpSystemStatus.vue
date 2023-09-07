<script lang="ts" setup>
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns } from "@/models/base.model";
import { Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import { auToRefreshTime } from "@/util";
import lacpConfigController from "@/controllers/lacpConfig.controller";

const autoRefreshLocalStorageKey = "lacp_system_status_info_auto_refresh";
let timer = null;

const {
  loading,
  data: lacpSystemStatusList,
  refresh,
} = useDataFetch(lacpConfigController.getLacpSystemStatusList);

const data = reactive({
  autoRefresh:
    window.localStorage.getItem(autoRefreshLocalStorageKey) === "true",
});

watch(
  () => data.autoRefresh,
  () => {
    window.localStorage.setItem(
      autoRefreshLocalStorageKey,
      data.autoRefresh.toString()
    );
  }
);

const autoRefreshData = () => {
  if (timer) {
    clearTimeout(timer);
  }
  if (!data.autoRefresh) {
    return;
  }
  timer = setTimeout(() => {
    refresh(false).finally(() => {
      autoRefreshData();
    });
    autoRefreshData;
  }, auToRefreshTime);
};

watchEffect(() => {
  autoRefreshData();
});

onBeforeUnmount(() => {
  //   data.autoRefresh = false;
  timer && clearTimeout(timer);
});

const columns = [
  new TableColumns("lacp.group_id", "group_id"),
  new TableColumns("lacp.pair_id", "pair_id"),
  new TableColumns("lacp.pair_key", "pair_key"),
  new TableColumns("lacp.pair_priority", "pair_priority"),
  new TableColumns("lacp.change_time", "change_time"),
  new TableColumns("lacp.local_interface", "local_interface"),
];
</script>

<template>
  <div class="flex-start" style="margin-bottom: 24px">
    <p class="title1" style="margin-right: 16px">{{ $t("autoRefresh") }}</p>
    <Switch size="small" v-model:checked="data.autoRefresh"></Switch>
  </div>
  <CommonTable
    :loading="loading"
    :data-source="lacpSystemStatusList"
    :columns="columns"
  ></CommonTable>
</template>

<style scoped lang="scss"></style>
