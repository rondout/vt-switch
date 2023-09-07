<script lang="ts" setup>
import { reactive } from "vue";
import { MSTIMapInfo, MSTI1list } from "@/models/stpConfig.model";
import stpConfigController from "@/controllers/stpConfig.controller";
import { deepClone, messageSaveSuccess } from "@/util";
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Spin,
  Textarea,
} from "ant-design-vue";
import Iconfont from "../layouts/Iconfont.vue";
import EditFooter from "../common/EditFooter.vue";
import TitleTab from "@/components/common/TitleTab.vue";
import MessageTip from "../common/MessageTip.vue";

const data = reactive({
  mstiMapInfo: {} as MSTIMapInfo,
  clonedMstiMapInfo: {} as MSTIMapInfo,
  confirmLoading: false,
  loading: false,
});

const getData = () => {
  data.loading = true;
  stpConfigController
    .getMSTIMapInfo()
    .then((res) => {
      data.mstiMapInfo = res;
      data.clonedMstiMapInfo = deepClone(res);
    })
    .finally(() => {
      data.loading = false;
    });
};

getData();

const handleCancel = () => {
  data.clonedMstiMapInfo = deepClone(data.mstiMapInfo);
};

const handleOk = () => {
  data.confirmLoading = true;
  stpConfigController
    .setMSTIMapInfo(data.clonedMstiMapInfo)
    .then(() => {
      //messageSaveSuccess();
      data.mstiMapInfo = deepClone(data.clonedMstiMapInfo);
    })
    .finally(() => {
      data.confirmLoading = false;
    });
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
      <TitleTab title="stp.configIdentifierInfo"></TitleTab>
      <FormItem :label="$t('stp.config_name')">
        <Input
          style="width: 200px"
          v-model:value="data.clonedMstiMapInfo.config_name"
        />
      </FormItem>
      <FormItem :label="$t('stp.config_number')">
        <InputNumber
          :min="0"
          :max="65535"
          v-model:value="data.clonedMstiMapInfo.config_number"
        />
      </FormItem>
      <TitleTab title="stp.mstiMapConfig"></TitleTab>
      <FormItem v-for="item of MSTI1list" :key="item" :label="item">
        <Textarea
          :rows="1"
          style="width: 200px"
          v-model:value="data.clonedMstiMapInfo[item]"
        />
      </FormItem>
    </Form>
    <MessageTip title="stp.mstiMapTip"></MessageTip>
    <EditFooter
      :loading="data.confirmLoading"
      left
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </Spin>
</template>

<style scoped lang="scss">
.title-container {
  margin-bottom: 24px;
}
</style>
