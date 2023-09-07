<template>
  <Form
    class="system-addr-config-form"
    ref="formRef"
    name="dynamic_form_item"
    :model="data.clonedFormValues"
    v-bind="formItemLayoutWithOutLabel"
  >
    <FormItem
      :label="$t('system.primary_ip')"
      v-bind="formItemLayout"
      :rules="[
        {
          required: true,
          message: $t('system.ipRequired'),
          trigger: 'change',
          pattern: ipRegExp,
        },
      ]"
      name="primary_ip"
    >
      <Input
        v-model:value="data.clonedFormValues.primary_ip"
        placeholder="please input secondary_ip"
        style="width: 240px; margin-right: 8px"
      />
    </FormItem>
    <FormItem
      :label="$t('system.secondary_ip')"
      v-bind="formItemLayout"
      :rules="[
        {
          required: true,
          message: $t('system.ipRequired'),
          pattern: ipRegExp,
          trigger: 'change',
        },
      ]"
      name="secondary_ip"
    >
      <Input
        v-model:value="data.clonedFormValues.secondary_ip"
        placeholder="please input secondary_ip"
        style="width: 240px; margin-right: 8px"
      />
    </FormItem>
  </Form>
  <EditFooter
    :loading="data.confirmLoading"
    left
    @ok="submitForm"
    @cancel="resetForm"
  ></EditFooter>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Form, FormInstance, FormItem, Input, message } from "ant-design-vue";
import EditFooter from "../common/EditFooter.vue";
import systemConfigController, {
  SystemIpConfigType,
} from "@/controllers/systemConfig.controller";
import { deepClone, ipRegExp, messageSaveSuccess } from "@/util";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const formRef = ref<FormInstance>();
const formItemLayout = {
  labelCol: {
    style: {
      width: "120px",
    },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const data = reactive({
  formValues: { primary_ip: "", secondary_ip: "" },
  clonedFormValues: { primary_ip: "", secondary_ip: "" },
  confirmLoading: false,
});

const getManageIpInfo = () => {
  systemConfigController.getManageIpInfo().then((res) => {
    const { primary_ip, secondary_ip } = res;
    data.formValues = { primary_ip, secondary_ip };
    data.clonedFormValues = { primary_ip, secondary_ip };
  });
};

getManageIpInfo();

const submitForm = () => {
  formRef.value
    .validate()
    .then(() => {
      const promises = [];
      const { primary_ip, secondary_ip } = data.clonedFormValues;
      if (primary_ip !== data.formValues.primary_ip) {
        promises.push(
          systemConfigController.setIpAddr({
            interface: SystemIpConfigType.PRIMARY,
            ip: primary_ip,
            mask: primary_ip?.length,
          })
        );
      }
      if (secondary_ip !== data.formValues.secondary_ip) {
        promises.push(
          systemConfigController.setIpAddr({
            interface: SystemIpConfigType.SECONDARY,
            ip: secondary_ip,
            mask: secondary_ip?.length,
          })
        );
      }
      if (!promises.length) {
        message.error(t("system.noIpToModify"));
        return;
      }
      data.confirmLoading = true;
      Promise.all(promises)
        .then(() => {
          //messageSaveSuccess();
          data.formValues = { primary_ip, secondary_ip };
        })
        .catch((err) => {})
        .finally(() => {
          data.confirmLoading = false;
        });
    })
    .catch((error) => {});
};
const resetForm = () => {
  // formRef.value;
  data.clonedFormValues = deepClone(data.formValues);
};
</script>
<style lang="scss">
.system-addr-config-form {
  .ant-form-item-control-input-content {
    display: flex;
  }
}
</style>
