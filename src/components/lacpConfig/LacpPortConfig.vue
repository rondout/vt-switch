<script lang="ts" setup>
import lacpConfigController from "@/controllers/lacpConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import {
  IntBool,
  NoPaddingTableColumns,
  TableColumns,
} from "@/models/base.model";
import { messageSaveSuccess } from "@/util";
import { InputNumber, Radio, RadioGroup } from "ant-design-vue";
import { reactive } from "vue";
import CommonTable from "../common/CommonTable.vue";
import EditFooter from "../common/EditFooter.vue";
import IntCheckbox from "../common/IntCheckbox.vue";

const data = useDataFetch(lacpConfigController.getLacpPortConfigList);

const state = reactive({
  confirmLoading: false,
});

const columns: TableColumns[] = [
  new TableColumns("port.potName", "port"),
  new NoPaddingTableColumns("lacp.lacpEnable", "lacp_enable"),
  new NoPaddingTableColumns("lacp.key", "lacp_key"),
  new NoPaddingTableColumns("lacp.role", "role"),
  new NoPaddingTableColumns("lacp.timeout", "timeout"),
  new NoPaddingTableColumns("lacp.priority", "priority"),
];

const slots = ["lacp_enable", "lacp_key", "role", "timeout", "priority"];

const handleCancel = () => {
  data.resetData();
};

const handleOk = () => {
  state.confirmLoading = true;
  lacpConfigController
    .setLacpPortConfigList({ config_list: data.clonedData.value })
    .then(() => {
      //messageSaveSuccess();
      data.setEditDataToOriginData();
    })
    .finally(() => {
      state.confirmLoading = false;
    });
};
</script>

<template>
  <CommonTable
    :slots="slots"
    :loading="data.loading.value"
    :data-source="data.clonedData.value"
    :columns="columns"
  >
    <template #lacp_enable="{ record }">
      <IntCheckbox v-model:checked="record.lacp_enable" />
    </template>
    <template #lacp_key="{ record }">
      <div class="flex-start">
        <RadioGroup v-model:value="record.lacp_auto_key_enable">
          <Radio :value="IntBool.TRUE">{{ $t("auto") }}</Radio>
          <Radio :value="IntBool.FALSE">{{ $t("lacp.custom") }}</Radio>
        </RadioGroup>
        <InputNumber
          style="min-width: 100px"
          v-model:value="record.lacp_key"
          :min="1"
          :max="65535"
          :disabled="record.lacp_auto_key_enable === IntBool.TRUE"
        />
      </div>
    </template>
    <template #role="{ record }">
      <RadioGroup v-model:value="record.role">
        <Radio :value="IntBool.TRUE">{{ $t("active") }}</Radio>
        <Radio :value="IntBool.FALSE">{{ $t("passive") }}</Radio>
      </RadioGroup></template
    >
    <template #timeout="{ record }">
      <RadioGroup v-model:value="record.timeout">
        <Radio :value="IntBool.TRUE">{{ $t("fast") }}</Radio>
        <Radio :value="IntBool.FALSE">{{ $t("slow") }}</Radio>
      </RadioGroup></template
    >
    <template #priority="{ record }">
      <InputNumber
        style="min-width: 100px"
        v-model:value="record.priority"
        :min="1"
        :max="65535"
    /></template>
  </CommonTable>
  <EditFooter
    v-if="!data.loading.value"
    @cancel="handleCancel"
    :loading="state.confirmLoading"
    @ok="handleOk"
  />
</template>

<style scoped lang="scss"></style>
