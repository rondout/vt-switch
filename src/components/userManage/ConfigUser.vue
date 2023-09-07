<script lang="ts" setup>
import userController from "@/controllers/user.controller";
import { Languages } from "@/models/base.model";
import {
  AddUserParam,
  ResetUserPasswordParam,
  UserInfo,
} from "@/models/user.model";
import { useMainStore } from "@/stores";
import {
  Form,
  FormInstance,
  FormItem,
  InputPassword,
  message,
  Modal,
  Input,
} from "ant-design-vue";
import { RuleObject } from "ant-design-vue/es/form";
import { reactive, watchEffect, ref } from "vue";
import { useI18n } from "vue-i18n";

interface ModifyPwdProps {
  open: boolean;
  type: "reset_pwd" | "add_user";
  user?: UserInfo;
}

interface ModifyPwdEmits {
  (e: "ok"): void;
  (e: "cancel"): void;
}

const { t } = useI18n();

const { $state } = useMainStore();

const formRef = ref<FormInstance>();

const emits = defineEmits<ModifyPwdEmits>();

const { user, open, type } = defineProps<ModifyPwdProps>();

const data = reactive({
  username: "",
  password: "",
  new_password: "",
  confirm_password: "",
});

// watchEffect(() => {
//   data.password = user?.password
// });
const handleCancel = () => {
  formRef.value.resetFields();
  emits("cancel");
};

const resetPwdFormItems: {
  name: string;
  rules: RuleObject[];
  type?: "input" | "password";
}[] = ["password", "new_password", "confirm_password"].map((key) => {
  const rules: RuleObject[] = [
    {
      required: true,
      trigger: "change",
      message: t("user.requiredTips." + key),
    },
    { max: 20, min: 5, message: t("user.pwdMaxMinRule") },
  ];

  const confirmRule: RuleObject = {
    validator(rule, value) {
      if (
        value !== data.new_password &&
        value?.length <= 20 &&
        value?.length >= 5
      ) {
        return Promise.reject(t("user.passwordNotSame"));
      }
      return Promise.resolve();
    },
  };

  if (key === "confirm_password") {
    rules.push(confirmRule);
  }

  return { name: key, rules };
});

const addUserFormItems: {
  name: string;
  rules: RuleObject[];
  type?: "input" | "password";
}[] = [
  {
    type: "input",
    name: "username",
    rules: [
      {
        required: true,
        trigger: "change",
        message: t("user.requiredTips.username"),
      },
      { max: 20, min: 5, message: t("user.usernameMaxMinRule") },
    ],
  },
  {
    name: "password",
    rules: [
      {
        required: true,
        trigger: "change",
        message: t("user.requiredTips.password"),
      },
      { max: 20, min: 5, message: t("user.pwdMaxMinRule") },
    ],
  },
  {
    name: "confirm_password",
    rules: [
      {
        required: true,
        trigger: "change",
        message: t("user.requiredTips.confirm_password"),
      },
      { max: 20, min: 5, message: t("user.pwdMaxMinRule") },
      {
        validator(rule, value) {
          if (
            value !== data.password &&
            value?.length <= 20 &&
            value?.length >= 5
          ) {
            return Promise.reject(t("user.passwordNotSame"));
          }
          return Promise.resolve();
        },
      },
    ],
  },
];

const formItems = type === "add_user" ? addUserFormItems : resetPwdFormItems;

const handleResetPwd = (params: ResetUserPasswordParam) => {
  userController
    .resetPassword(params)
    .then((res) => {
      if (res.errCode === 0) {
        message.success(t("user.resetPwdSuccess"));
        emits("ok");
        handleCancel();
      } else if (res.errCode === -1) {
        message.error(t("user.oldPasswordError"));
      } else {
        message.error(t("user.resetPwdFailed"));
      }
    })
    .catch((err) => {});
};

const handleAddUser = (params: AddUserParam) => {
  userController
    .addUser(params)
    .then((res) => {
      if (res.errCode == 0) {
        message.success(t("user.addUserSeccess"));
        emits("ok");
        handleCancel();
      } else if (res.errCode == 3) {
        message.error(t("user.userExisted"));
      } else {
        message.error(t("user.addUserFailed"));
      }
    })
    .catch((err) => {});
};

const handleOk = () => {
  formRef.value
    .validate()
    .then((value) => {
      if (type === "reset_pwd") {
        const { password, new_password } = value;
        handleResetPwd({ password, new_password, username: user?.username });
      }
      if (type === "add_user") {
        const { username, password } = value;
        handleAddUser({ username, password });
      }
    })
    .catch(() => {
      message.error(t("user.pwdInvalid"));
    });
};

const labelWidth = $computed(() => {
  if ($state.language === Languages.en) {
    return "150px";
  }
  return "120px";
});
</script>

<template>
  <Modal
    centered
    :title="$t('user.configTitles.' + type)"
    :open="open"
    :width="400"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <Form
      style="margin-top: 16px"
      :label-col="{ style: { width: labelWidth, textAlign: 'left' } }"
      :model="data"
      ref="formRef"
    >
      <FormItem
        v-for="item of formItems"
        :key="item.name"
        :name="item.name"
        :label="$t('user.' + item.name)"
        :rules="item.rules"
      >
      <Input v-if="item.type === 'input'" v-model:value="data[item.name]"></Input>
      <InputPassword v-else v-model:value="data[item.name]"></InputPassword>
      </FormItem>
    </Form>
  </Modal>
</template>

<style scoped lang="scss"></style>
