<script lang="ts" setup>
import stpConfigController from "@/controllers/stpConfig.controller";
import useDataFetch from "@/hooks/useDataFetch";
import IntCheckbox from "../common/IntCheckbox.vue";
import TitleTab from "@/components/common/TitleTab.vue";
import { MSTIPortInfo, stpPriorityOptions } from "@/models/stpConfig.model";
import CommonTable from "../common/CommonTable.vue";
import {
  IntBool,
  NoPaddingTableColumns,
  TableColumns,
} from "@/models/base.model";
import EditFooter from "../common/EditFooter.vue";
import { InputNumber, Select } from "ant-design-vue";
import { messageSaveSuccess } from "@/util";
import { reactive } from "vue";

const data = useDataFetch(stpConfigController.getMSTIportList);

const state = reactive({
  confirmLoading: false,
});

const tableList = $computed(() => {
  const combinePortConfig: MSTIPortInfo[] = [];
  const commonPortConfig: MSTIPortInfo[] = [];
  data.clonedData?.value?.forEach((item) => {
    if (item.port === "*") {
      combinePortConfig.push(item);
    } else {
      commonPortConfig.push(item);
    }
  });
  return { combinePortConfig, commonPortConfig };
});

const columns = [
  new TableColumns("port.potName", "port"),
  new NoPaddingTableColumns("stp.path_cost", "path_cost"),
  new NoPaddingTableColumns("stp.port_priority", "port_priority"),
];

const slots = ["stp_enable", "path_cost", "port_priority"];

const handleCancel = () => {
  data.resetData();
};

const handleOk = () => {
  state.confirmLoading = true;
  stpConfigController
    .setMSTIportList({ config_list: data.clonedData.value })
    .then((res) => {
      //messageSaveSuccess();
      data.setEditDataToOriginData();
    })
    .finally(() => {
      state.confirmLoading = false;
    });
};
</script>

<template>
  <template v-for="configType of ['combinePortConfig', 'commonPortConfig']">
    <div>
      <TitleTab :mb="16" :title="'stp.' + configType"></TitleTab>
      <CommonTable
        :loading="data.loading.value"
        :slots="slots"
        :data-source="tableList[configType]"
        :columns="columns"
      >
        <template #stp_enable="{ record }">
          <IntCheckbox v-model:checked="record.stp_enable" />
        </template>
        <template #path_cost="{ record }">
          <div class="flex-start flex-nowrap">
            <IntCheckbox v-model:checked="record.auto_path_cost_enable">{{
              $t("auto")
            }}</IntCheckbox>
            <InputNumber
              :min="1"
              :disabled="record.auto_path_cost_enable === IntBool.TRUE"
              style="width: 120px"
              :max="200000000"
              v-model:value="record.path_cost"
            ></InputNumber>
          </div>
        </template>

        <template #port_priority="{ record }">
          <Select
            style="width: 80px"
            :options="stpPriorityOptions"
            v-model:value="record.port_priority"
          ></Select>
        </template>
      </CommonTable>
    </div>
  </template>
  <EditFooter
    :loading="state.confirmLoading"
    v-if="!data.loading.value"
    @cancel="handleCancel"
    @ok="handleOk"
  />
  <!-- <div v-if="tableList.commonPortConfig.length > 0">
    <TitleTab :mb="16" title="stp.commonPortConfig"></TitleTab> -->
  <!-- </div> -->
</template>

<style scoped lang="scss"></style>
