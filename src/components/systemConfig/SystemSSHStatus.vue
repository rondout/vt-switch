<script lang="ts" setup>
import systemConfigController from "@/controllers/systemConfig.controller";
import { IntBool } from "@/models/base.model";
import { message, Spin } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import EditFooter from "../common/EditFooter.vue";
import IntSwitch from "../common/IntSwitch.vue";

const { t } = useI18n();

const data = reactive({
  sshStatus: IntBool.FALSE,
  clonedSshStatus: IntBool.FALSE,
  loading: false,
});

const getSshStatus = () => {
  data.loading = true;
  systemConfigController
    .getSshStatus()
    .then((res) => {
      data.sshStatus = res.ssh_state;
      data.clonedSshStatus = res.ssh_state;
    })
    .finally(() => {
      data.loading = false;
    });
};

getSshStatus();

const handleCancel = () => {
  data.clonedSshStatus = data.sshStatus;
};

const handleOk = () => {
  systemConfigController
    .setSshStatus({ ssh_state: data.clonedSshStatus })
    .then((res) => {
      data.sshStatus = data.clonedSshStatus;
      message.success(t("system.sshStatusSetSuccessed"));
    })
    .catch((err) => {
      message.error(t("system.sshStatusSetError"));
      data.clonedSshStatus = data.sshStatus;
    });
};
</script>

<template>
  <Spin :spinning="data.loading">
    <div class="flex-start flex-nowrap">
      <div class="title1" :style="{ marginRight: '32px' }">
        {{ $t("system.sshStatus") }}
      </div>
      <IntSwitch v-model:checked="data.clonedSshStatus"></IntSwitch>
    </div>
    <EditFooter @cancel="handleCancel" @ok="handleOk" left />
  </Spin>
</template>

<style scoped lang="scss"></style>
