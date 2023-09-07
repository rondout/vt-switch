<script lang="ts" setup>
import { Button, Input, Radio, RadioGroup } from "ant-design-vue";
import CommonTable from "@/components/common/CommonTable.vue";
import { h, markRaw, onMounted, reactive } from "vue";
import portConfigController from "@/controllers/portConfig.controller";
import { PortLinkStat, PortModule, PortSpeed } from "@/models/portConfig.model";
import { IntBool, TableColumns } from "@/models/base.model";
import EditFooter from "../common/EditFooter.vue";
import { deepClone, messageSaveSuccess } from "@/util";
import IntCheckbox from "../common/IntCheckbox.vue";
import useDataFetch from "@/hooks/useDataFetch";

const state = reactive({
  confirmLoading: false,
});

const data = useDataFetch(portConfigController.getPortModuleList);

// import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
const columns: TableColumns[] = [
  {
    title: "port.potName",
    dataIndex: "port",
    key: "port",
  },
  {
    title: "port.type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "port.alias",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "port.manage_state",
    dataIndex: "manage_state",
    key: "manage_state",
  },
  {
    title: "port.linkStat",
    dataIndex: "linkStat",
    key: "linkStat",
  },
  {
    title: "port.auto_speed",
    dataIndex: "auto_speed",
    key: "auto_speed",
  },
  {
    title: "port.speed",
    dataIndex: "speed",
    key: "speed",
    // width: 500,
  },
  {
    title: "port.duplex",
    key: "duplex",
    dataIndex: "duplex",
  },
  {
    title: "port.flow",
    key: "flow",
    dataIndex: "flow",
  },
];

const slots = [
  "port",
  "linkStat",
  "description",
  "speed",
  "duplex",
  "flow",
  "manage_state",
  "auto_speed",
];

const handleOk = () => {
  state.confirmLoading = true;
  portConfigController
    .setPortModuleList({ ports_modules: data.clonedData.value })
    .then(() => {
      data.setEditDataToOriginData();
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
    :pagination="false"
    :slots="slots"
    :columns="columns"
    :loading="data.loading.value"
    :data-source="data.clonedData.value"
  >
    <template #linkStat="{ record }">
      <div class="flex-start flex-nowrap">
        <div
          :class="{
            'status-point': true,
            'is-online': (record as PortModule).linkStat === PortLinkStat.UP,
          }"
        ></div>
        <span>{{ record.linkStat }}</span>
      </div>
    </template>
    <template #speed="{ record }">
      <RadioGroup
        :disabled="record.auto_speed === IntBool.TRUE"
        v-model:value="record.speed"
      >
        <Radio :value="PortSpeed.TEN_M">{{ PortSpeed.TEN_M }}</Radio>
        <Radio :value="PortSpeed.HUNDRED_M">{{ PortSpeed.HUNDRED_M }}</Radio>
        <Radio :value="PortSpeed.THOUSAND_M">{{ PortSpeed.THOUSAND_M }}</Radio>
      </RadioGroup>
    </template>
    <template #duplex="{ record }">
      <IntCheckbox v-model:checked="record.duplex"></IntCheckbox>
    </template>
    <template #description="{ record }">
      <Input style="width:200px" v-model:value="record.description"></Input>
    </template>
    <template #manage_state="{ record }">
      <IntCheckbox v-model:checked="record.manage_state"></IntCheckbox>
    </template>
    <template #auto_speed="{ record }">
      <IntCheckbox v-model:checked="record.auto_speed"></IntCheckbox>
    </template>
    <template #flow="{ record }">
      <IntCheckbox v-model:checked="record.flow"></IntCheckbox>
    </template>
  </CommonTable>
  <EditFooter
    v-if="!data.loading.value"
    :loading="state.confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  ></EditFooter>
</template>

<style scoped lang="scss">
.status-point {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #f5222d;
  margin-right: 8px;
}
.is-online {
  background-color: #52c41a;
}
</style>
