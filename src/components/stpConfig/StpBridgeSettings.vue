<script lang="ts" setup>
import { Form, FormItem, InputNumber, Select, Spin } from "ant-design-vue";
import { reactive } from "vue";
import IntSwitch from "../common/IntSwitch.vue";
import {
  StpBridgeInfo,
  stpBridgeProtocolOptions,
  stpBridgePriorityOptions,
  stpHelloKeepOptions,
  forwardDealyOptions,
  maxAgeJumpTimeOptions,
} from "@/models/stpConfig.model";
import stpConfigController from "@/controllers/stpConfig.controller";
import { deepClone } from "@/util";
import { FormItemTypes, IntBool } from "@/models/base.model";
import EditFooter from "../common/EditFooter.vue";

const data = reactive({
  bridgeInfo: {} as StpBridgeInfo,
  clonedSridgeInfo: {} as StpBridgeInfo,
  confirmLoading: false,
  loading: false,
});

const getBridgeInfo = () => {
  data.loading = true;
  stpConfigController
    .getBridgeInfo()
    .then((res) => {
      data.bridgeInfo = res;
      data.clonedSridgeInfo = deepClone(res);
    })
    .finally(() => {
      data.loading = false;
    });
};

getBridgeInfo();

const formItems = $computed(() => [
  { type: FormItemTypes.INT_SWITCH, key: "enable" },
  {
    type: FormItemTypes.SELECT,
    key: "protocol",
    options: stpBridgeProtocolOptions,
  },
  {
    type: FormItemTypes.SELECT,
    key: "priority",
    options: stpBridgePriorityOptions,
  },
  {
    type: FormItemTypes.SELECT,
    key: "hello",
    options: stpHelloKeepOptions,
  },
  {
    type: FormItemTypes.SELECT,
    key: "forward_delay",
    options: forwardDealyOptions,
  },
  {
    type: FormItemTypes.SELECT,
    key: "max_age_time",
    options: maxAgeJumpTimeOptions,
  },
  {
    type: FormItemTypes.SELECT,
    key: "mstp_max_jump_time",
    options: maxAgeJumpTimeOptions,
  },
  { type: FormItemTypes.SELECT, key: "keep", options: stpHelloKeepOptions },
  { type: FormItemTypes.INT_SWITCH, key: "edge_port_bpdu_enable" },
  { type: FormItemTypes.INT_SWITCH, key: "port_err_recovery_enable" },
  {
    type: FormItemTypes.NUMBER,
    key: "port_err_recovery_time",
    min: 30,
    max: 86400,
    disabled: data.clonedSridgeInfo.port_err_recovery_enable !== IntBool.TRUE,
  },
]);

const handleOk = () => {
  data.confirmLoading = true;
  stpConfigController
    .setBridgeInfo(data.clonedSridgeInfo)
    .then((res) => {
      //messageSaveSuccess();
      data.bridgeInfo = deepClone(data.clonedSridgeInfo);
      // })
      // .catch((err) => {
      //   // handleResponseError(err);
      //   console.log(err);
    })
    .finally(() => {
      data.confirmLoading = false;
    });
};

const handleCancel = () => {
  data.clonedSridgeInfo = deepClone(data.bridgeInfo);
};
</script>

<template>
  <Spin :spinning="data.loading">
    <Form
      :label-col="{
        style: { width: '180px', textAlign: 'left' },
        class: 'title1-important',
      }"
    >
      <FormItem
        v-for="item of formItems"
        :key="item.key"
        :label="$t('stp.' + item.key)"
      >
        <IntSwitch
          v-model:checked="data.clonedSridgeInfo[item.key]"
          v-if="item.type === FormItemTypes.INT_SWITCH"
        />
        <Select
          v-if="item.type === FormItemTypes.SELECT"
          v-model:value="data.clonedSridgeInfo[item.key]"
          :options="item.options"
          style="width: 200px"
        />
        <InputNumber
          v-if="item.type === FormItemTypes.NUMBER"
          v-model:value="data.clonedSridgeInfo[item.key]"
          :disabled="item.disabled"
          style="width: 200px"
          :min="item.min"
          :max="item.max"
        ></InputNumber>
      </FormItem>
    </Form>
    <EditFooter
      :loading="data.confirmLoading"
      left
      @ok="handleOk"
      @cancel="handleCancel"
    />
  </Spin>
</template>

<style scoped lang="scss"></style>
