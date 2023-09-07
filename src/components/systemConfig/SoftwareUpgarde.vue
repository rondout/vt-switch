<script lang="ts" setup>
import { SystemConfigType } from "@/models/systemConfig.model";
import { reactive, ref } from "vue";
import { SystemSoftwareUpgradeMode } from "@/models/systemConfig.model";
import { Button, message, Radio, RadioGroup } from "ant-design-vue";
import DragUpload from "../common/DragUpload.vue";
import EditFooter from "../common/EditFooter.vue";
import { autoParseFileSize } from "@/util";
import systemConfigController from "@/controllers/systemConfig.controller";
import { useI18n } from "vue-i18n";

const uploadRef = ref<{ handleClear(): void }>();

const { t } = useI18n();
const data = reactive({
  type: SystemConfigType.STARTUP_CONFIG,
  mode: SystemSoftwareUpgradeMode.LOCAL,
  file: null as File,
  fileName: "",
  uploadLoading: false,
});

const handleFileChange = (file: File) => {
  data.file = file;
  data.fileName = file.name;
};

const handleCancel = () => {
  uploadRef.value.handleClear();
};

const handleOk = () => {
  const params = new FormData();
  params.append("file", data.file);
  data.uploadLoading = true;
  systemConfigController
    .updateSoftWare(params)
    .then(() => {
      data.uploadLoading = false;
      data.file = null;
      uploadRef.value.handleClear();
      data.fileName = null;
      message.success(t("uploadSuccessed"));
    })
    .catch(() => {
      data.uploadLoading = false;
      message.error(t("uploadFailed"));
    });
};
</script>

<template>
  <div class="flex-start sys-config-radio-container">
    <div class="title1">{{ $t("type") }}</div>
    <RadioGroup v-model:value="data.type">
      <Radio :value="SystemConfigType.STARTUP_CONFIG">{{
        $t("system.STARTUP_CONFIG")
      }}</Radio>
    </RadioGroup>
  </div>
  <div style="margin: 24px 0" class="flex-start sys-config-radio-container">
    <div class="title1">{{ $t("system.upgradeMethod") }}</div>
    <RadioGroup v-model:value="data.mode">
      <Radio :value="SystemSoftwareUpgradeMode.LOCAL">{{
        $t("system.localUpgrade")
      }}</Radio>
    </RadioGroup>
  </div>
  <div
    style="margin: 24px 0"
    class="flex-start items-start sys-config-radio-container"
  >
    <div class="title1">{{ $t("system.upgradeMethod") }}</div>
    <DragUpload accept=".bin" ref="uploadRef" @file-change="handleFileChange">
      <template #hasFile>
        <div style="padding: 24px">
          <div class="flex-start items-start file-info">
            <img
              style="margin-right: 16px"
              src="@/assets/img/file.png"
              alt=""
            />
            <div>
              <div class="body1" style="margin-bottom: 16px">
                {{ data.fileName }}
              </div>
              <div class="body1">{{ autoParseFileSize(data.file?.size) }}</div>
            </div>
          </div>
          <div class="flex" :style="{ marginTop: '24px' }">
            <Button @click="handleCancel">{{ $t("reUpload") }}</Button>
            <Button
              :loading="data.uploadLoading"
              @click="handleOk"
              type="primary"
              style="margin-left: 24px"
              >{{ $t("upgrade") }}</Button
            >
          </div>
        </div>
      </template>
    </DragUpload>
  </div>
</template>

<style scoped lang="scss">
.sys-config-radio-container {
  .title1 {
    width: 120px;
  }
}
.tab-title {
  margin-bottom: 24px;
  .tab {
    width: 4px;
    height: 12px;
    margin-right: 8px;
  }
}
.file-info {
  border: 1px solid #00000026;
  background-color: #fff;
  padding: 24px 0 24px 44px;
}
</style>
