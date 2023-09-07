<script lang="ts" setup>
import vlanonfigController, { handleSetVlanError, SetVlanError } from "@/controllers/vlanConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns, NoPaddingTableColumns } from "@/models/base.model";
import { allowedVlanRegExp, messageSaveSuccess } from "@/util";
import { Input, InputNumber, message } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import CommonTable from "../common/CommonTable.vue";
import EditFooter from "../common/EditFooter.vue";

const data = useDataFetch(vlanonfigController.getVlanHybridPortList);
const { t } = useI18n();

const state = reactive({
  confirmLoading: false,
});

const columns = [
  new TableColumns("port.potName", "port"),
  new NoPaddingTableColumns("PVID", "pvid"),
  new NoPaddingTableColumns("vlan.allowed_untaged", "allowed_untaged"),
  new NoPaddingTableColumns("vlan.allowed_taged", "allowed_taged"),
];

const handleOk = () => {
  if (data.clonedData.value.some((v) => !v.pvid)) {
    message.error(t("vlan.pvidRequired"));
    return;
  }
  if (
    data.clonedData.value.some(
      (v) =>
        !(
          allowedVlanRegExp.test(v.allowed_taged) &&
          allowedVlanRegExp.test(v.allowed_untaged)
        )
    )
  ) {
    message.error(t("vlan.allowedVlanError"));
    return;
  }
  state.confirmLoading = true;
  vlanonfigController
    .setVlanHybridPortList({ hybrid_cfg: data.clonedData.value })
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
    :slots="['pvid', 'allowed_untaged', 'allowed_taged']"
  >
    <template #pvid="{ record }">
      <InputNumber
        :min="1"
        :max="4093"
        v-model:value="record.pvid"
      ></InputNumber>
    </template>
    <template #allowed_untaged="{ record }">
      <Input
        :style="{ width: '240px' }"
        v-model:value="record.allowed_untaged"
      ></Input>
    </template>
    <template #allowed_taged="{ record }">
      <Input
        :style="{ width: '240px' }"
        v-model:value="record.allowed_taged"
      ></Input>
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
