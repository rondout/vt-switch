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
  telnetStatus: IntBool.FALSE,
  clonedTelnetStatus: IntBool.FALSE,
  loading: false,
});

const getTelnetStatus = () => {
  data.loading = true;
  systemConfigController
    .getTelnetStatus()
    .then((res) => {
      data.telnetStatus = res.telnet_state;
      data.clonedTelnetStatus = res.telnet_state;
    })
    .finally(() => {
      data.loading = false;
    });
};

getTelnetStatus();

const handleCancel = () => {
  data.clonedTelnetStatus = data.telnetStatus;
};

const handleOk = () => {
  systemConfigController
    .setTelnetStatus({ telnet_state: data.clonedTelnetStatus })
    .then((res) => {
      data.telnetStatus = data.clonedTelnetStatus;
      message.success(t("system.telnetStatusSetSuccessed"));
    })
    .catch((err) => {
      message.error(t("system.telnetStatusSetError"));
      data.clonedTelnetStatus = data.telnetStatus;
    });
};
</script>

<template>
  <Spin :spinning="data.loading">
    <div class="flex-start flex-nowrap">
      <div class="title1" :style="{ marginRight: '32px' }">
        {{ $t("system.telnetStatus") }}
      </div>
      <IntSwitch v-model:checked="data.clonedTelnetStatus"></IntSwitch>
    </div>
    <EditFooter @cancel="handleCancel" @ok="handleOk" left />
  </Spin>
</template>

<style scoped lang="scss"></style>
