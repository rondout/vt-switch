<template>
  <Space
    direction="vertical"
    :style="{ width: '100%', height: '100%', display: 'block' }"
    :size="[0, 48]"
  >
    <Layout v-if="$state.getUserInfoFinish" class="main-layout">
      <LayoutSider width="240px" :style="siderStyle">
        <NavMenuSider />
      </LayoutSider>
      <Layout>
        <LayoutHeader :style="headerStyle">
          <CustomLayoutHeader></CustomLayoutHeader>
        </LayoutHeader>
        <LayoutContent :style="contentStyle">
          <div :style="{ height: '100%', padding: '24px' }">
            <RouterView></RouterView>
          </div>
        </LayoutContent>
      </Layout>
    </Layout>
    <div v-else class="flex" style="height: 100%">
      <Spin></Spin>
    </div>
  </Space>
</template>
<script lang="ts" setup>
import { CSSProperties, reactive } from "vue";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  Space,
  Spin,
} from "ant-design-vue";
import NavMenuSider from "./NavMenuSider.vue";
import CustomLayoutHeader from "./CustomLayoutHeader.vue";
import { RouterView, useRouter } from "vue-router";
import userController from "@/controllers/user.controller";
import { useMainStore } from "@/stores";
import { Pathnames, StringBool } from "@/models/base.model";
import { isProd } from "@/util";
import { UserRole } from "@/models/user.model";
const headerStyle: CSSProperties = {
  height: "112px",
  backgroundColor: "#fff",
  lineHeight: "unset",
  paddingInline: "unset",
};

const contentStyle: CSSProperties = {
  minHeight: "120px",
  overflow: "auto",
  background: "#F0F3F5",
};

const siderStyle: CSSProperties = {
  // lineHeight: '120px',
  color: "#fff",
  background: "#001529",
};

// const data = reactive({
//   getUserInfoFinish
// })

const { $state, setUserInfo } = useMainStore();
const router = useRouter();

const getUserInfo = () => {
  $state.getUserInfoFinish = false;
  userController
    .getUserInfo()
    .then((res) => {
      // res.login_status = StringBool.TRUE;
      if (!isProd) {
        // @ts-ignore
        res = { username: "admin", roles: "administrator", login_status: "1" };
      }
      $state.getUserInfoFinish = true;
      setUserInfo(res);
      if (res?.login_status !== StringBool.TRUE) {
        router.push(Pathnames.LOGIN);
      }
    })
    .catch(() => {
      if (!isProd) {
        // @ts-ignore
        const res = {
          username: "admin",
          roles: UserRole.ADMINISTRATOR,
          login_status: StringBool.TRUE,
        };
        $state.getUserInfoFinish = true;
        setUserInfo(res);
        if (res?.login_status !== StringBool.TRUE) {
          router.push(Pathnames.LOGIN);
        }
      } else {
        $state.getUserInfoFinish = true;
        router.push(Pathnames.LOGIN);
      }
    });
};

getUserInfo();
</script>

<style>
.ant-space-item,
.main-layout {
  height: 100%;
}

.ant-layout-sider {
  transition: all 0.3s;
  flex: unset !important;
  overflow: hidden;
}
</style>
