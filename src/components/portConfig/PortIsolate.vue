<script lang="ts" setup>
import portConfigController from "@/controllers/portConfig.controller";
import { PortIsolateConfig, PortModule } from "@/models/portConfig.model";
import { deepClone, themeColor } from "@/util";
import { Checkbox, Spin } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import EditFooter from "../common/EditFooter.vue";

const data = reactive({
  allPorts: [] as PortModule[],
  data: [] as PortIsolateConfig[],
  clonedData: [] as PortIsolateConfig[],
  loading: false,
  confirmLoading: false,
});

const getPorts = () => {
  data.loading = true;
  portConfigController
    .getPortModuleList()
    .then((res) => {
      data.allPorts = res.ports_modules;
    })
    .catch()
    .finally(() => {
      data.loading = false;
    });
};

const getPortIsolateConfigList = () => {
  portConfigController.getPortIsolateConfig().then((res) => {
    data.data = res;
    data.clonedData = deepClone(res) as PortIsolateConfig[];
  });
};

onMounted(() => {
  getPorts();
  getPortIsolateConfigList();
});

const handleCheckboxChange = (
  checked: boolean,
  item: PortIsolateConfig,
  port: number
) => {
  const originPorts = data.clonedData.find((v) => v.group === item.group).ports;
  if (checked) {
    // 如果是选中，则往之前的ports里面添加进去
    originPorts.push(port);
  } else {
    // 如果是取消选中，就从相应的ports列表中删除这个port
    originPorts.splice(
      originPorts.findIndex((v) => v === port),
      1
    );
  }
};

const handleCancel = () => {
  data.clonedData = deepClone(data.data);
};

const handleOk = () => {
  portConfigController
    .setPortIsolateConfig(data.clonedData)
    .then((res) => {
      data.confirmLoading = false;
      data.data = deepClone(data.clonedData);
    })
    .catch(() => {
      data.confirmLoading = false;
    });
};
</script>

<template>
  <Spin :spinning="data.loading">
    <div
      v-for="(item, index) of data.clonedData"
      :key="index"
      style="margin-bottom: 16px"
    >
      <div class="flex-start">
        <div class="primary-title-tab primary-bg"></div>
        <h2 class="h2">
          {{ $t("port.isolatedGroup", { group: item.group }) }}
        </h2>
      </div>
      <div class="flex-start" :style="{}">
        <div class="title1" :style="{ marginRight: '24px' }">
          {{ $t("port.selectPort") }}
        </div>
        <Checkbox
          :style="{ margin: '16px 32px 16px 0' }"
          v-for="port of data.allPorts"
          :key="port.port"
          :checked="item.ports.includes(port.port)"
          @change="
            (e) => handleCheckboxChange(e.target.checked, item, port.port)
          "
          >{{ port.port }}</Checkbox
        >
      </div>
    </div>
  </Spin>
  <div class="flex-start">
    <EditFooter
      v-if="!data.loading"
      :loading="data.confirmLoading"
      @cancel="handleCancel"
      @ok="handleOk"
    ></EditFooter>
  </div>
</template>

<style scoped lang="scss"></style>
