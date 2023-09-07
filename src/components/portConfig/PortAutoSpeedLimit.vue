<script lang="ts" setup>
import portConfigController from "@/controllers/portConfig.controller";
import { TableColumns } from "@/models/base.model";
import { reactive } from "vue";
import { PortAutoSpeedLmitItem } from "@/models/portConfig.model";
import CommonTable from "../common/CommonTable.vue";
import { deepClone, messageSaveSuccess } from "@/util";
import EditFooter from "../common/EditFooter.vue";
import IntCheckbox from "../common/IntCheckbox.vue";
import useDataFetch from "@/hooks/useDataFetch";

const data = useDataFetch(portConfigController.getPortAutoSpeedLimitList);

const state = reactive({
  confirmLoading: false,
});

const columns = [
  new TableColumns("port.potName", "port"),
  new TableColumns("port.enable", "enable"),
];

const slots = ["enable"];

const handleCancel = () => {
  data.clonedData = deepClone(data.data);
};

const handleOk = () => {
  state.confirmLoading = true;
  portConfigController
    .setPortAutoSpeedLimitList({ auto_limit: data.clonedData.value })
    .then(() => {
      data.setEditDataToOriginData();
      //messageSaveSuccess();
    })
    .finally(() => {
      state.confirmLoading = false;
    });
};
</script>

<template>
  <CommonTable
    :pagination="false"
    :data-source="data.clonedData.value"
    :columns="columns"
    :slots="slots"
    :loading="data.loading.value"
  >
    <template #enable="{ record }">
      <IntCheckbox v-model:checked="record.enable"></IntCheckbox>
    </template>
  </CommonTable>
  <EditFooter
    v-if="!data.loading.value"
    :loading="state.confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
  ></EditFooter>
</template>

<style scoped lang="scss"></style>
