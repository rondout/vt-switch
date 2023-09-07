<script lang="ts" setup>
import { TableColumns } from "@/models/base.model";
import { onMounted, reactive } from "vue";
import CommonTable from "../common/CommonTable.vue";
import {
  PortSpeedItem,
  portSpeedUnitsOptions,
} from "@/models/portConfig.model";
import portConfigController from "@/controllers/portConfig.controller";
import { InputNumber, Select } from "ant-design-vue";
import EditFooter from "../common/EditFooter.vue";
import { deepClone, messageSaveSuccess } from "@/util";
import useDataFetch from "@/hooks/useDataFetch";

const columns: TableColumns[] = [
  {
    dataIndex: "port",
    title: "port.port",
    key: "port",
  },
  {
    dataIndex: "type",
    title: "port.type",
    key: "type",
  },
  {
    dataIndex: "bandwith_value",
    title: "port.bandwith_value",
    key: "bandwith_value",
    customCell() {
      return { style: { padding: "0 0 0 16px" } };
    },
  },
];

const slots = ["bandwith_value"];

const state = reactive({
  confirmLoading: false,
});

const data = useDataFetch(portConfigController.getPortSpeedList);

const handleOk = () => {
  state.confirmLoading = true;
  portConfigController
    .setPortSpeedList({ config: data.clonedData.value })
    .then(() => {
      data.setEditDataToOriginData();
      //messageSaveSuccess();
    })
    .finally(() => {
      state.confirmLoading = false;
    });
};

const handleCancel = () => {
  // data.clonedData = deepClone(data.data);
  data.resetData();
};
</script>

<template>
  <CommonTable
    :loading="data.loading.value"
    :pagination="false"
    :columns="columns"
    :slots="slots"
    :data-source="data.clonedData.value"
  >
    <template #bandwith_value="{ record }">
      <div class="flex-start">
        <InputNumber
          v-model:value="(record as PortSpeedItem).bandwith_value"
          :style="{ marginRight: '16px' }"
        ></InputNumber>
        <Select
          v-model:value="(record as PortSpeedItem).bandwith_unit"
          :style="{ width: '80px' }"
          :options="portSpeedUnitsOptions"
        ></Select>
      </div>
    </template>
  </CommonTable>
  <EditFooter
    v-if="!data.loading.value"
    :loading="state.confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  ></EditFooter>
</template>

<style scoped lang="scss"></style>
