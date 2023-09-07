<script lang="ts" setup>
import stpConfigController from "@/controllers/stpConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns } from "@/models/base.model";
import { Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import { auToRefreshTime } from "@/util";

const autoRefreshLocalStorageKey = "stp_port_statistics_auto_refresh";
let timer = null;

const {
  loading,
  data: stpPortStatisticsList,
  refresh,
} = useDataFetch(stpConfigController.getStpPortStatistics);

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
  new TableColumns("stp.send", "send", [
    new TableColumns("MSTP", "send.MSTP"),
    new TableColumns("RSTP", "send.RSTP"),
    new TableColumns("STP", "send.STP"),
    new TableColumns("TCN", "send.TCN"),
  ]),
  new TableColumns("stp.recv", "recv", [
    new TableColumns("MSTP", "recv.MSTP"),
    new TableColumns("RSTP", "recv.RSTP"),
    new TableColumns("STP", "recv.STP"),
    new TableColumns("TCN", "recv.TCN"),
  ]),
  new TableColumns("stp.discard", "discard", [
    new TableColumns("stp.unknow", "discard.unknow"),
    new TableColumns("stp.illegal", "discard.illegal"),
  ]),
];
</script>

<template>
  <div class="flex-start" style="margin-bottom: 24px">
    <p class="title1" style="margin-right: 16px">{{ $t("autoRefresh") }}</p>
    <Switch size="small" v-model:checked="data.autoRefresh"></Switch>
  </div>
  <CommonTable
    :loading="loading"
    :data-source="stpPortStatisticsList"
    :columns="columns"
  ></CommonTable>
</template>

<style scoped lang="scss"></style>
