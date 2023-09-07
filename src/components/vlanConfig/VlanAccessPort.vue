<script lang="ts" setup>
import vlanonfigController, {
  SetVlanError,
  handleSetVlanError,
} from "@/controllers/vlanConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns, NoPaddingTableColumns } from "@/models/base.model";
import { messageSaveSuccess } from "@/util";
import { InputNumber } from "ant-design-vue";
import { reactive } from "vue";
import CommonTable from "../common/CommonTable.vue";
import EditFooter from "../common/EditFooter.vue";

const data = useDataFetch(vlanonfigController.getVlanAccessPortList);

const state = reactive({
  confirmLoading: false,
});

const columns = [
  new TableColumns("port.potName", "port"),
  new NoPaddingTableColumns("PVID", "pvid"),
];

const handleOk = () => {
  state.confirmLoading = true;
  vlanonfigController
    .setVlanAccessPortList({ access_cfg: data.clonedData.value })
    .then((res) => {
      if (res?.errCode === SetVlanError.SUCCESS) {
        data.setEditDataToOriginData();
      } else {
        handleSetVlanError(res);
      }
      //messageSaveSuccess();
    })
    .finally(() => {
      state.confirmLoading = false;
    });
};

const handleCancel = () => {
  data.resetData();
};
</script>

<template>
  <CommonTable
    :data-source="data.clonedData.value"
    :columns="columns"
    :slots="['pvid']"
  >
    <template #pvid="{ record }">
      <InputNumber
        :min="1"
        :max="4093"
        v-model:value="record.pvid"
      ></InputNumber>
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
