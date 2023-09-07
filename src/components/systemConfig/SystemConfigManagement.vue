<script lang="ts" setup>
import { Button, message, Radio, RadioGroup } from "ant-design-vue";
import { reactive } from "vue";
import {
  SystemConfigType,
  SystemConfigExportMethod,
} from "@/models/systemConfig.model";
import UploadButton from "../common/UploadButton.vue";
import systemConfigController from "@/controllers/systemConfig.controller";
import { download } from "@/util";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const data = reactive({
  exportType: SystemConfigType.STARTUP_CONFIG,
  exportMethod: SystemConfigExportMethod.LOCAL,
  uploadLoading: false,
});

const handleFileChange = (files: FileList) => {
  data.uploadLoading = true;
  const params = new FormData();
  params.append("file", files[0]);
  systemConfigController
    .updataConfig(params)
    .then((res) => {
      if (res.errCode === "0") {
        message.success(t("uploadSuccessed"));
      } else {
        throw new Error("failed");
      }
    })
    .catch((err) => {
      message.error(t("uploadFailed"));
    })
    .finally(() => {
      data.uploadLoading = false;
    });
};

const handleExport = () => {
  systemConfigController
    .exportConfig()
    .then((res) => {
      download("config", res as string);
    })
    .catch((err) => {
      message.error("failed");
    });
};
</script>

<template>
  <div class="flex-start tab-title">
    <div class="primary-title-tab primary-bg"></div>
    <h2 class="h2">{{ $t("system.importConfig") }}</h2>
  </div>
  <UploadButton
    accept=".txt"
    :loading="data.uploadLoading"
    @file-change="handleFileChange"
    >{{ $t("system.import") }}</UploadButton
  >
  <div class="flex-start tab-title" style="margin-top: 24px">
    <div class="primary-title-tab primary-bg"></div>
    <h2 class="h2">{{ $t("system.exportConfig") }}</h2>
  </div>
  <!-- <div class="flex-start sys-config-radio-container">
    <div class="title1">{{ $t("type") }}</div>
    <RadioGroup v-model:value="data.exportType">
      <Radio :value="SystemConfigType.STARTUP_CONFIG">{{
        $t("system.STARTUP_CONFIG")
      }}</Radio>
      <Radio :value="SystemConfigType.RUNNING_CONFIG">{{
        $t("system.RUNNING_CONFIG")
      }}</Radio>
    </RadioGroup>
  </div> -->
  <div style="margin: 24px 0" class="flex-start sys-config-radio-container">
    <div class="title1">{{ $t("exportMethod") }}</div>
    <RadioGroup v-model:value="data.exportMethod">
      <Radio :value="SystemConfigExportMethod.LOCAL">{{
        $t("system.localExport")
      }}</Radio>
    </RadioGroup>
  </div>
  <Button @click="handleExport" type="primary">{{
    $t("system.export")
  }}</Button>
</template>

<style scoped lang="scss">
.sys-config-radio-container {
  .title1 {
    width: 120px;
  }
}
.tab-title {
  margin-bottom: 24px;
}
</style>
