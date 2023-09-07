<script lang="ts" setup>
import useDataFetch from "@/hooks/useDataFetch";
import { IntBool, TableColumns } from "@/models/base.model";
import { Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import { auToRefreshTime } from "@/util";
import lacpConfigController from "@/controllers/lacpConfig.controller";

const autoRefreshLocalStorageKey = "lacp_port_statistics_info_auto_refresh";
let timer = null;

const {
  loading,
  data: lacpPortStatisticsList,
  refresh,
} = useDataFetch(lacpConfigController.getLacpPortStatisticsList);

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
  new TableColumns("lacp.lacp_recv", "lacp_recv"),
  new TableColumns("lacp.lacp_send", "lacp_send"),
  new TableColumns("stp.discard", "discard_key", [
    new TableColumns("lacp.unknow", "unknow"),
    new TableColumns("lacp.discard", "discard"),
  ]),
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
    :data-source="lacpPortStatisticsList"
    :columns="columns"
  >
    <template #lacp_enable="{ record }">
      <span>{{ record.lacp_enable === IntBool.TRUE ? "Yes" : "No" }}</span>
    </template>
  </CommonTable>
</template>

<style scoped lang="scss"></style>
