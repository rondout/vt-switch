<script lang="ts" setup>
import userController from "@/controllers/user.controller";
import { Pathnames } from "@/models/base.model";
import {
  Button,
  Divider,
  Form,
  FormInstance,
  FormItem,
  Input,
  InputPassword,
  message,
  Modal,
} from "ant-design-vue";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const formRef = ref<FormInstance>();

const router = useRouter();

const { t } = useI18n();

const data = reactive({
  loading: false,
  values: {
    username: "",
    password: "",
  },
});

const handleLogin = () => {
  formRef.value
    .validate()
    .then((values) => {
      const { username, password } = values;
      data.loading = true;
      userController
        .login({ username, password })
        .then((res) => {
          if (res?.includes("failed")) {
            message.error(t("user.loginFailed"));
          } else {
            message.success(t("user.loginSuccessed"));
            router.push(Pathnames.HOME);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(t("user.loginFailed"));
        })
        .finally(() => {
          data.loading = false;
        });
      //   formRef.value.resetFields();
    })
    .catch();
};

const handleResetPwd = () => {
  Modal.info({
    centered: true,
    title: t("user.forgotPwdTitile"),
    content: t("user.forgotPwdContent"),
  });
};
</script>

<template>
  <div class="login-container flex">
    <div>
      <div class="flex">
        <img
          src="@/assets/img/logo_primary.svg"
          :width="192"
          :height="64"
          alt=""
        />
      </div>
      <div class="login-content border-box">
        <Divider>
          <span class="h2">{{ $t("loginTitle") }}</span>
        </Divider>
        <Form ref="formRef" :model="data.values">
          <FormItem
            name="username"
            :rules="[
              { required: true, message: $t('user.requiredTips.username') },
              { min: 5, max: 20, message: $t('user.usernameMaxMinRule') },
            ]"
          >
            <p class="input-label">{{ $t("user.account") }}</p>
            <Input
              :placeholder="$t('user.accountTip')"
              style="height: 42px; border-radius: 6px"
              height="42px"
              v-model:value="data.values.username"
            ></Input>
          </FormItem>
          <FormItem
            name="password"
            :rules="[
              { required: true, message: $t('user.requiredTips.password') },
              { min: 5, max: 20, message: $t('user.pwdMaxMinRule') },
            ]"
          >
            <p class="input-label">{{ $t("user.password") }}</p>
            <InputPassword
              @press-enter="handleLogin"
              :placeholder="$t('user.pwdTip')"
              style="height: 42px; border-radius: 6px"
              height="42px"
              v-model:value="data.values.password"
            ></InputPassword>
          </FormItem>
        </Form>
        <div class="flex-end forgot-pwd">
          <Button @click="handleResetPwd" type="text">
            <span class="primary-color">{{ $t("user.forgotPwd") }}</span>
          </Button>
        </div>
        <Button
          :loading="data.loading"
          @click="handleLogin"
          size="large"
          class="fullwidth login-btn"
          type="primary"
          >{{ $t("login") }}</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ant-input-password,
.ant-input {
  border-color: #0000000f;
  //   border-color: #0000000f;
}
.login-container {
  background-color: #f0f3f5;
  background-image: url(@/assets/img/bg.svg);
  background-size: cover;
  height: 100%;
  .login-content {
    margin-top: 32px;
    width: 464px;
    background-color: #fff;
    padding: 64px 32px;
    .input-label {
      margin-bottom: 8px;
    }
    .forgot-pwd {
      margin-top: 16px;
      margin-bottom: 40px;
    }
    .login-btn {
      border-radius: 4px;
      //   margin-bottom: 16px;
    }
  }
}
</style>
