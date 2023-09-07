<script lang="ts" setup>
import lacpConfigController from "@/controllers/lacpConfig.controller";
import { StaticLacpInfo } from "@/models/lacpConfig.model";
import { deepClone, messageSaveSuccess } from "@/util";
import { InputNumber, message, Spin } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import EditFooter from "../common/EditFooter.vue";

const { t } = useI18n();

const data = reactive({
  data: {} as { lacp_priority: number },
  clonedData: {} as { lacp_priority: number },
  loading: false,
  confirmLoading: false,
});

const getDynamicLacpPiority = () => {
  data.loading = true;
  lacpConfigController
    .getDynamicLacpPiority()
    .then((res) => {
      data.loading = false;
      data.data = res;
      data.clonedData = deepClone(res);
    })
    .finally(() => {
      data.loading = false;
    });
};

getDynamicLacpPiority();

const handleCancel = () => {
  data.clonedData = deepClone(data.data);
};

const handleOk = () => {
  if (!data.clonedData.lacp_priority) {
    message.error(t("lacp.piorptyRequired"));
    return;
  }
  data.confirmLoading = true;
  lacpConfigController
    .setDynamicLacpPiority(data.clonedData)
    .then((res) => {
      //messageSaveSuccess();
      data.data = deepClone(data.clonedData);
    })
    .finally(() => {
      data.confirmLoading = false;
    });
};
</script>

<template>
 <Spin :spinning="data.loading">
  <div class="flex-start">
    <p class="title1" style="margin-right: 24px">
      {{ $t("lacp.systemPriority") }}
    </p>
    <InputNumber
      :min="1"
      :max="65535"
      v-model:value="data.clonedData.lacp_priority"
    />
  </div>
  <EditFooter
    :loading="data.confirmLoading"
    left
    @cancel="handleCancel"
    @ok="handleOk"
  />
 </Spin>
</template>

<style scoped lang="scss"></style>
