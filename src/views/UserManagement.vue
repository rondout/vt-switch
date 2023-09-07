<script lang="ts" setup>
import CommonTable from "@/components/common/CommonTable.vue";
import Iconfont from "@/components/layouts/Iconfont.vue";
import ConfigUser from "@/components/userManage/ConfigUser.vue";
import userController from "@/controllers/user.controller";
import { NoPaddingTableColumns, TableColumns } from "@/models/base.model";
import { UserInfo, UserRole } from "@/models/user.model";
import { $deleteConfirm } from "@/util";
import { Button, Input, InputPassword, message } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const data = reactive({
  users: [] as UserInfo[],
  loading: false,
  selectedUsers: [] as string[],
  onConfigUser: null as UserInfo,
  modifyPwdOpen: false,
  addUserOpen: false,
});

const getUsers = () => {
  data.loading = true;
  userController
    .getUsers()
    .then((res) => {
      data.loading = false;
      data.users = res.users;
    })
    .catch((err) => {
      data.loading = false;
    });
};

getUsers();

const columns = [
  new TableColumns("user.username", "username"),
  //   new TableColumns("user.password", "password"),
  new NoPaddingTableColumns("", "operation", [], 280),
];

const handleUserSelectChange = (keys: string[]) => {
  data.selectedUsers = keys;
};

const multiDeleteUser = () => {
  $deleteConfirm({
    title: t("user.multiDeleteTitle", { count: data.selectedUsers.length }),
    onOk() {
      const result = userController.multiDeleteUser(data.selectedUsers);
      result
        .then(() => {
          data.selectedUsers = [];
          message.success(t("user.deleteUserSuccess"));
          getUsers();
        })
        .catch((err) => {});
      return result;
    },
  });
};

const deleteUser = (user: UserInfo) => {
  data.onConfigUser = user;
  $deleteConfirm({
    title: t("user.deleteUserTitle", { name: data.onConfigUser?.username }),
    onOk() {
      const result = userController.deleteUser(data.onConfigUser?.username);
      result
        .then(() => {
          data.onConfigUser = null;
          message.success(t("user.deleteUserSuccess"));
          getUsers();
        })
        .catch((err) => {});
      return result;
    },
  });
};

const handleModifyPwdClick = (user: UserInfo) => {
  data.onConfigUser = user;
  data.modifyPwdOpen = true;
};

const handleModifyPwdOk = () => {
  getUsers();
};

const handleModifyPwdCancel = () => {
  data.modifyPwdOpen = false;
};

const handleAddUserOk = () => {
  getUsers();
};

const handleAddUserCancel = () => {
  data.addUserOpen = false;
};
</script>

<template>
  <div class="user-manage-container">
    <div class="flex-btw user-mangae-header">
      <p class="title111">{{ $t("user.list") }}</p>
      <div class="flex">
        <Button
          @click="multiDeleteUser"
          :disabled="data.selectedUsers.length <= 0"
          type="primary"
          danger
          style="margin-right: 16px"
          >{{ $t("user.deleteUser") }}</Button
        >
        <Button @click="() => (data.addUserOpen = true)" type="primary">{{
          $t("user.addUser")
        }}</Button>
      </div>
    </div>
    <CommonTable
      :loading="data.loading"
      :slots="['password', 'operation']"
      pagination
      row-key="username"
      :row-selection="{
        selectedRowKeys: data.selectedUsers,
        onChange: handleUserSelectChange,
        getCheckboxProps(record:UserInfo) {
            return {disabled:record.roles === UserRole.ADMINISTRATOR} 
        }
      }"
      :data-source="data.users"
      :columns="columns"
    >
      <!-- <template #password="{ record }">
        <InputPassword
          class="pwd-displayer"
          type="password"
          readonly
          :value="record.password + 'dadwqd'"
        ></InputPassword>
      </template> -->
      <template #operation="{ record }">
        <div class="flex-start flex-nowrap">
          <a
            @click="handleModifyPwdClick(record as UserInfo)"
            class="flex-start flex-nowrap"
            style="margin-right: 24px"
          >
            <Iconfont primary icon="ic_password" />
            <span>{{ $t("user.modifyPwd") }}</span>
          </a>
          <a
            @click="() => deleteUser(record as UserInfo)"
            v-if="record.roles !== UserRole.ADMINISTRATOR"
            class="flex-start flex-nowrap"
          >
            <Iconfont primary icon="ic_password" />
            <span>{{ $t("delete") }}</span>
          </a>
        </div>
      </template>
    </CommonTable>
  </div>
  <ConfigUser
    type="reset_pwd"
    :user="data.onConfigUser"
    :open="data.modifyPwdOpen"
    @ok="handleModifyPwdOk"
    @cancel="handleModifyPwdCancel"
  />
  <ConfigUser
    type="add_user"
    :open="data.addUserOpen"
    @ok="handleAddUserOk"
    @cancel="handleAddUserCancel"
  />
</template>

<style scoped lang="scss">
.user-manage-container {
  background-color: #fff;
  height: 100%;
  padding: 16px;
  overflow: auto;
  .user-mangae-header {
    margin-bottom: 16px;
  }
  //   .input[type="password"] {
  .pwd-displayer {
    border: none;
    outline: none;
    padding-left: 0;
    box-shadow: none;
    background: transparent;
    width: 240px;
  }
}
</style>
