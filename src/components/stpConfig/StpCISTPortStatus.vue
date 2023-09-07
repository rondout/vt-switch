<script lang="ts" setup>
import stpConfigController from "@/controllers/stpConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns } from "@/models/base.model";
import { Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import { auToRefreshTime } from "@/util";

const autoRefreshLocalStorageKey = "stp_cist_port_info_auto_refresh";
let timer = null;

const {
  loading,
  data: cistPortInfoList,
  refresh,
} = useDataFetch(stpConfigController.getStpCISTPortStatus);

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
  new TableColumns("stp.cist_role", "cist_role"),
  new TableColumns("stp.cist_state", "cist_state"),
  new TableColumns("stp.runtime", "run_time"),
];
</script>

<template>
  <div class="flex-start" style="margin-bottom: 24px">
    <p class="title1" style="margin-right: 16px">{{ $t("autoRefresh") }}</p>
    <Switch size="small" v-model:checked="data.autoRefresh"></Switch>
  </div>
  <CommonTable
    :loading="loading"
    :data-source="cistPortInfoList"
    :columns="columns"
  ></CommonTable>
</template>

<style scoped lang="scss"></style>
