<script lang="ts" setup>
import { TableColumns } from "@/models/base.model";
import { onMounted, reactive } from "vue";
import CommonTable from "../common/CommonTable.vue";
import {
  portSpeedUnitsOptions,
  PortStormLimitItem,
} from "@/models/portConfig.model";
import portConfigController from "@/controllers/portConfig.controller";
import { InputNumber, Select } from "ant-design-vue";
import { SelectValue } from "ant-design-vue/es/select";
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
    dataIndex: "ucast_value",
    title: "port.ucast_value",
    key: "ucast_value",
    width: 380,
    customCell() {
      return { style: { padding: "0 0 0 16px" } };
    },
  },
  {
    dataIndex: "bcast_value",
    title: "port.bcast_value",
    key: "bcast_value",
    width: 380,
    customCell() {
      return { style: { padding: "0 0 0 16px" } };
    },
  },
  {
    dataIndex: "mcast_value",
    title: "port.mcast_value",
    key: "mcast_value",
    width: 380,
    customCell() {
      return { style: { padding: "0 0 0 16px" } };
    },
  },

  // {
  //   dataIndex: "bcast_unit",
  //   title: "port.bcast_unit",
  //   key: "bcast_unit",
  // },
];

const slots = ["bcast_value", "mcast_value", "ucast_value"];

const state = reactive({
  confirmLoading: false,
});

const data = useDataFetch(portConfigController.getPortStormLimitList);

const handleOk = () => {
  state.confirmLoading = true;
  portConfigController
    .setPortStormLimitList({ portSetting: data.clonedData.value })
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
    <template #bcast_value="{ record }">
      <div class="flex-start flex-nowrap">
        <InputNumber
          v-model:value="(record as PortStormLimitItem).bcast_value"
          :style="{ marginRight: '16px' }"
        ></InputNumber>
        <Select
          v-model:value="(record as PortStormLimitItem).bcast_unit"
          :style="{ width: '80px' }"
          :options="portSpeedUnitsOptions"
        ></Select>
      </div>
    </template>
    <template #ucast_value="{ record }">
      <div class="flex-start flex-nowrap">
        <InputNumber
          v-model:value="(record as PortStormLimitItem).ucast_value"
          :style="{ marginRight: '16px' }"
        ></InputNumber>
        <Select
          v-model:value="(record as PortStormLimitItem).ucast_unit"
          :style="{ width: '80px' }"
          :options="portSpeedUnitsOptions"
        ></Select>
      </div>
    </template>
    <template #mcast_value="{ record }">
      <div class="flex-start flex-nowrap">
        <InputNumber
          v-model:value="(record as PortStormLimitItem).mcast_value"
          :style="{ marginRight: '16px' }"
        ></InputNumber>
        <Select
          v-model:value="(record as PortStormLimitItem).mcast_unit"
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
