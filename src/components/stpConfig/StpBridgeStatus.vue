<script lang="ts" setup>
import stpConfigController from "@/controllers/stpConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns } from "@/models/base.model";
import { Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import { auToRefreshTime } from "@/util";

const autoRefreshLocalStorageKey = "stp_bridge_info_auto_refresh";
let timer = null;

const {
  loading,
  data: bridgeInfoList,
  refresh,
} = useDataFetch(stpConfigController.getStpBridgeStatus);

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
  new TableColumns("MSTI", "msti"),
  new TableColumns("stp.bridgeId", "bridege_id"),
  new TableColumns("stp.root", "root", [
    new TableColumns("ID", "root_id"),
    new TableColumns("stp.root_port", "root_port"),
    new TableColumns("stp.root_path", "root_path"),
  ]),
  new TableColumns("stp.topo_flag", "topo_flag"),
  new TableColumns("stp.topo_change_time", "topo_change_time"),
];
</script>

<template>
  <div class="flex-start" style="margin-bottom: 24px">
    <p class="title1" style="margin-right: 16px">{{ $t("autoRefresh") }}</p>
    <Switch size="small" v-model:checked="data.autoRefresh"></Switch>
  </div>
  <CommonTable
    :loading="loading"
    :data-source="bridgeInfoList"
    :columns="columns"
  ></CommonTable>
</template>

<style scoped lang="scss"></style>
