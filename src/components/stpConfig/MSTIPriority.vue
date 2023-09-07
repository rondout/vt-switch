<script lang="ts" setup>
import {
  MSTIPriorityInfo,
  stpBridgePriorityOptions,
  MSTIPriorityInfoKeys,
} from "@/models/stpConfig.model";
import { deepClone, messageSaveSuccess } from "@/util";
import { Form, FormItem, Select, Spin } from "ant-design-vue";
import { reactive } from "vue";
import stpConfigController from "@/controllers/stpConfig.controller";

const data = reactive({
  confirmLoading: false,
  mstiPriorityInfo: {} as MSTIPriorityInfo,
  clonedMstiPriorityInfo: {} as MSTIPriorityInfo,
  loading: false,
});

const getMSTIPriorityInfo = () => {
  data.loading = true;
  stpConfigController
    .getMSTIPriorityInfo()
    .then((res) => {
      data.mstiPriorityInfo = res;
      data.clonedMstiPriorityInfo = deepClone(res);
    })
    .finally(() => {
      data.loading = false;
    });
};

getMSTIPriorityInfo();

const handleOk = () => {
  data.confirmLoading = true;
  stpConfigController
    .setMSTIPriorityInfo(data.clonedMstiPriorityInfo)
    .then((res) => {
      //messageSaveSuccess();
      data.mstiPriorityInfo = deepClone(data.clonedMstiPriorityInfo);
    })
    .finally(() => {
      data.confirmLoading = false;
    });
};

const handleCancel = () => {
  data.clonedMstiPriorityInfo = deepClone(data.mstiPriorityInfo);
};
</script>

<template>
  <Spin :spinning="data.loading">
    <Form
      :label-col="{
        style: { width: '100px', textAlign: 'left' },
        class: 'title1-important',
      }"
    >
      <FormItem v-for="item of MSTIPriorityInfoKeys" :key="item" :label="item">
        <Select
          :options="stpBridgePriorityOptions"
          v-model:value="data.clonedMstiPriorityInfo[item]"
          style="width: 200px"
        />
        <!-- <InputNumber
        v-if="item.type === FormItemTypes.NUMBER"
        v-model:value="data.clonedMstiPriorityInfo[item]"
        style="width: 200px"
        :min="item.min"
        :max="item.max"
      ></InputNumber> -->
      </FormItem>
    </Form>
    <EditFooter
      :loading="data.confirmLoading"
      left
      @ok="handleOk"
      @cancel="handleCancel"
  /></Spin>
</template>

<style scoped lang="scss"></style>
