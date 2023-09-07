<script lang="ts" setup>
import useDataFetch from "@/hooks/useDataFetch";
import { IntBool, TableColumns } from "@/models/base.model";
import { Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import { auToRefreshTime } from "@/util";
import lacpConfigController from "@/controllers/lacpConfig.controller";

const autoRefreshLocalStorageKey = "lacp_port_status_info_auto_refresh";
let timer = null;

const {
  loading,
  data: lacpPortStatusList,
  refresh,
} = useDataFetch(lacpConfigController.getLacpPortStatusList);

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
  new TableColumns("port.potName", "port"),
  new TableColumns("lacp.lacpEnable", "lacp_enable"),
  new TableColumns("lacp.key", "key"),
  new TableColumns("lacp.group_id", "group_id"),
  new TableColumns("lacp.pair_id", "pair_id"),
  new TableColumns("lacp.pair_port", "pair_port"),
  new TableColumns("lacp.pair_priority", "priority"),
];
</script>

<template>
  <div class="flex-start" style="margin-bottom: 24px">
    <p class="title1" style="margin-right: 16px">{{ $t("autoRefresh") }}</p>
    <Switch size="small" v-model:checked="data.autoRefresh"></Switch>
  </div>
  <CommonTable
    :slots="['lacp_enable']"
    :loading="loading"
    :data-source="lacpPortStatusList"
    :columns="columns"
  >
    <template #lacp_enable="{ record }">
      <span>{{ record.lacp_enable === IntBool.TRUE ? "Yes" : "No" }}</span>
    </template>
  </CommonTable>
</template>

<style scoped lang="scss"></style>
