<script lang="ts" setup>
import vlanonfigController, {
  handleSetVlanError,
  SetVlanError,
} from "@/controllers/vlanConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns, NoPaddingTableColumns } from "@/models/base.model";
import { allowedVlanRegExp, messageSaveSuccess } from "@/util";
import { Input, InputNumber, message } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import CommonTable from "../common/CommonTable.vue";
import EditFooter from "../common/EditFooter.vue";

const data = useDataFetch(vlanonfigController.getVlanTrunkPortList);
const { t } = useI18n();

const state = reactive({
  confirmLoading: false,
});

const columns = [
  new TableColumns("port.potName", "port"),
  new NoPaddingTableColumns("PVID", "pvid"),
  new NoPaddingTableColumns("vlan.allowed_vlan", "allowed_vlan"),
];

const handleOk = () => {
  if (data.clonedData.value.some((v) => !v.pvid)) {
    message.error(t("vlan.pvidRequired"));
    return;
  }
  if (
    data.clonedData.value.some((v) => v.allowed_vlan && !allowedVlanRegExp.test(v.allowed_vlan))
  ) {
    message.error(t("vlan.allowedVlanError"));
    return;
  }
  state.confirmLoading = true;
  vlanonfigController
    .setVlanTrunkPortList({ trunk_cfg: data.clonedData.value })
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
    :loading="data.loading.value"
    :data-source="data.clonedData.value"
    :columns="columns"
    :slots="['pvid', 'allowed_vlan']"
  >
    <template #pvid="{ record }">
      <InputNumber
        :min="1"
        :max="4093"
        v-model:value="record.pvid"
      ></InputNumber>
    </template>
    <template #allowed_vlan="{ record }">
      <Input
        :style="{ width: '240px' }"
        v-model:value="record.allowed_vlan"
      ></Input>
    </template>
  </CommonTable>
  <EditFooter
    :loading="state.confirmLoading"
    v-if="!data.loading.value"
    @ok="handleOk"
    @cancel="handleCancel"
  ></EditFooter>
</template>

<style scoped lang="scss"></style>
