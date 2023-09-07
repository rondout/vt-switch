<script lang="ts" setup>
import vlanonfigController from "@/controllers/vlanConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import { TableColumns } from "@/models/base.model";
import { VlanLinkModeEnum } from "@/models/vlanConfig.model";
import { messageSaveSuccess } from "@/util";
import { Radio, RadioGroup } from "ant-design-vue";
import { reactive } from "vue";
import CommonTable from "../common/CommonTable.vue";
import EditFooter from "../common/EditFooter.vue";

const data = useDataFetch(vlanonfigController.getLinkModeList);

const state = reactive({
  confirmLoading: false,
});

const columns = [
  new TableColumns("port.potName", "port"),
  new TableColumns("vlan.linkMode", "mode"),
];

const handleCancel = () => {
  data.resetData();
};

const handleOk = () => {
  state.confirmLoading = true;
  vlanonfigController
    .setLinkModeList({ link_mode: data.clonedData.value })
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
    :loading="data.loading.value"
    :slots="['mode']"
    :columns="columns"
    :data-source="data.clonedData.value"
  >
    <template #mode="{ record }">
      <RadioGroup v-model:value="record.mode">
        <Radio :value="VlanLinkModeEnum.ACCESS">{{ $t("vlan.ACCESS") }}</Radio>
        <Radio :value="VlanLinkModeEnum.TRUNK">{{ $t("vlan.TRUNK") }}</Radio>
        <Radio :value="VlanLinkModeEnum.HYBRID">{{ $t("vlan.HYBRID") }}</Radio>
      </RadioGroup>
      <!-- <div class="flex-start flex-nowrap">
      </div> -->
    </template>
  </CommonTable>
  <EditFooter
    :loading="state.confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
  ></EditFooter>
</template>

<style scoped lang="scss"></style>
