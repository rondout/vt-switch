<script lang="ts" setup>
import { Dropdown, Menu, MenuItem, MenuProps } from "ant-design-vue";
import Iconfont from "./Iconfont.vue";
import { useMainStore } from "@/stores";
import { Languages, Pathnames } from "@/models/base.model";
import { useRouter } from "vue-router";
import userController from "@/controllers/user.controller";
import CustomBreadCrumb from "@/components/layouts/CustomBreadCrumb.vue";
// import { storeToRefs } from "pinia";
// const store = useMainStore();
enum UserOperations {
  USER_MANAGEMENT,
  LOGOUT,
}

const router = useRouter();

const { $state, changeLanguage } = useMainStore();

const icon = $computed(() => {
  if ($state.language === Languages.en) {
    return "ic_zn";
  }
  return "ic_en";
});
// const { $state.language } = storeToRefs(store);
const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
  switch (key) {
    case UserOperations.USER_MANAGEMENT:
      router.push(Pathnames.USERS);
      break;
    case UserOperations.LOGOUT:
      userController.logout().then(() => {
        router.push(Pathnames.LOGIN);
      });
      break;
  }
};

const store = useMainStore();
</script>

<template>
  <div class="flex-btw top-header">
    <div class="flex"></div>
    <div class="flex right-items">
      <Dropdown placement="bottom">
        <div class="flex pointer">
          <div class="body1">{{ $state.userInfo?.username }}</div>
        </div>
        <template #overlay>
          <Menu @click="handleUserMenuClick">
            <MenuItem
              v-if="store.isAdmin"
              :key="UserOperations.USER_MANAGEMENT"
            >
              <div class="flex-start flex-nowrap">
                <Iconfont :size="16" icon="ic_user" />
                <span style="white-space: nowrap">{{
                  $t("userManagement")
                }}</span>
              </div>
            </MenuItem>
            <MenuItem :key="UserOperations.LOGOUT">
              <div class="flex-start flex-nowrap">
                <Iconfont :size="16" icon="ic_logout" />
                <span style="white-space: nowrap">{{ $t("logout") }}</span>
              </div>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Iconfont @click="changeLanguage()" :icon="icon" />
    </div>
  </div>
  <div class="flex-start" :style="{ height: '64px', paddingLeft: '24px' }">
    <CustomBreadCrumb />
  </div>
</template>

<style scoped lang="scss">
.top-header {
  height: 48px;
  box-shadow: 0px 1px 4px rgba(0, 44, 82, 0.12);
  padding: 0 16px;
  // .right-items {

  // }
  .right-items {
    .body1 {
      margin-right: 24px;
      margin-left: 8px;
    }
  }
}
</style>
