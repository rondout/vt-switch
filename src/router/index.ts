import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/components/layouts/MainLayout.vue";
import { Pathnames, StringBool } from "@/models/base.model";
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Login from "@/views/Login.vue";
// Users
import UserManagement from "@/views/UserManagement.vue";
// system config
import SystemConfig from "@/views/SystemConfig.vue";
import SystemAddressManage from "@/components/systemConfig/SystemAddressManage.vue";
import PingAddress from "@/components/systemConfig/PingAddress.vue";
import SystemSSHStatus from "@/components/systemConfig/SystemSSHStatus.vue";
import SystemTelnetStatus from "@/components/systemConfig/SystemTelnetStatus.vue";
import SystemConfigManagement from "@/components/systemConfig/SystemConfigManagement.vue";
import SoftwareUpgarde from "@/components/systemConfig/SoftwareUpgarde.vue";
// port config
import PortConfig from "@/views/PortConfig.vue";
import PortModel from "@/components/portConfig/PortModel.vue";
import PortSpeedLimit from "@/components/portConfig/PortSpeedLimit.vue";
import PortStormLimit from "@/components/portConfig/PortStormLimit.vue";
import PortIsolate from "@/components/portConfig/PortIsolate.vue";
import PortFlowStatistics from "@/components/portConfig/PortFlowStatistics.vue";
import PortFlowDetail from "@/components/portConfig/PortFlowDetail.vue";
import PortAutoSpeedLimit from "@/components/portConfig/PortAutoSpeedLimit.vue";
// Vlan config
import VlanConfig from "@/views/VlanConfig.vue";
import VlanLinkMode from "@/components/vlanConfig/VlanLinkMode.vue";
import VlanManagement from "@/components/vlanConfig/VlanManagement.vue";
import VlanAccessPort from "@/components/vlanConfig/VlanAccessPort.vue";
import VlanTrunkPort from "@/components/vlanConfig/VlanTrunkPort.vue";
import VlanHybridPort from "@/components/vlanConfig/VlanHybridPort.vue";
// StpConfig
import StpConfig from "@/views/StpConfig.vue";
import StpBridgeSettings from "@/components/stpConfig/StpBridgeSettings.vue";
import MSTIMap from "@/components/stpConfig/MSTIMap.vue";
import MSTIPriority from "@/components/stpConfig/MSTIPriority.vue";
import CISTPortConfig from "@/components/stpConfig/CISTPortConfig.vue";
import MSTIPortConfig from "@/components/stpConfig/MSTIPortConfig.vue";
import StpBridgeStatus from "@/components/stpConfig/StpBridgeStatus.vue";
import StpCISTPortStatus from "@/components/stpConfig/StpCISTPortStatus.vue";
import StpPortStatistics from "@/components/stpConfig/StpPortStatistics.vue";
// LacpConfig
import LacpConfig from "@/views/LacpConfig.vue";
import LacpSettings from "@/components/lacpConfig/LacpSettings.vue";
import LacpPortConfig from "@/components/lacpConfig/LacpPortConfig.vue";
import LacpSystemStatus from "@/components/lacpConfig/LacpSystemStatus.vue";
import LacpPortStatus from "@/components/lacpConfig/LacpPortStatus.vue";
import LacpPortStatistscs from "@/components/lacpConfig/LacpPortStatistscs.vue";
// IGMP config
import IgmpConfig from "@/views/IgmpConfig.vue";

import { useMainStore } from "@/stores";
import { UserRole } from "@/models/user.model";

export const routes: RouteRecordRaw[] = [
  {
    path: Pathnames.LOGIN,
    component: Login,
  },
  {
    meta: {
      auth: "TEST_AUTH",
    },
    path: Pathnames.MAIN_LAYOUT,
    name: Pathnames.MAIN_LAYOUT,
    component: MainLayout,
    children: [
      // 主页
      {
        path: Pathnames.HOME,
        name: Pathnames.HOME,
        component: Home,
      },
      // 用户
      {
        path: Pathnames.USERS,
        component: UserManagement,
        beforeEnter(_, __, next) {
          const mainStore = useMainStore();
          if (mainStore.userInfo?.roles !== UserRole.ADMINISTRATOR) {
            next(Pathnames.HOME);
            return false;
          }
          next();
          return true;
        },
      },
      // 系统配置
      {
        path: Pathnames.SYSTEM_CONFIG,
        name: Pathnames.SYSTEM_CONFIG,
        component: SystemConfig,
        children: [
          {
            path: Pathnames.SYSTEM_ADDRESS,
            name: Pathnames.SYSTEM_ADDRESS,
            meta: {
              parent: Pathnames.SYSTEM_CONFIG,
            },
            component: SystemAddressManage,
          },
          {
            path: Pathnames.SYSTEM_PING,
            name: Pathnames.SYSTEM_PING,
            meta: {
              parent: Pathnames.SYSTEM_CONFIG,
            },
            component: PingAddress,
          },
          {
            path: Pathnames.SYSTEM_SSH,
            name: Pathnames.SYSTEM_SSH,
            meta: {
              parent: Pathnames.SYSTEM_CONFIG,
            },
            component: SystemSSHStatus,
          },
          {
            path: Pathnames.SYSTEM_TELNET,
            name: Pathnames.SYSTEM_TELNET,
            meta: {
              parent: Pathnames.SYSTEM_CONFIG,
            },
            component: SystemTelnetStatus,
          },
          {
            path: Pathnames.SYSTEM_CONFIG_MANAGEMENT,
            name: Pathnames.SYSTEM_CONFIG_MANAGEMENT,
            meta: {
              parent: Pathnames.SYSTEM_CONFIG,
            },
            component: SystemConfigManagement,
          },
          {
            path: Pathnames.SYSTEM_SOFTWARE_UPGRADE,
            name: Pathnames.SYSTEM_SOFTWARE_UPGRADE,
            meta: {
              parent: Pathnames.SYSTEM_CONFIG,
            },
            component: SoftwareUpgarde,
          },
        ],
      },
      // 特殊处理这个组件，因为这个组件需要给父组件传按钮组件
      {
        path: Pathnames.VLAN_MANAGEMENT,
        name: Pathnames.VLAN_MANAGEMENT,
        meta: {
          parent: Pathnames.VLAN_CONFIG,
        },
        component: VlanManagement,
      },
      // Vlan配置
      {
        path: Pathnames.VLAN_CONFIG,
        name: Pathnames.VLAN_CONFIG,
        component: VlanConfig,
        children: [
          {
            path: Pathnames.VLAN_LINK_MODE,
            name: Pathnames.VLAN_LINK_MODE,
            meta: {
              parent: Pathnames.VLAN_CONFIG,
            },
            component: VlanLinkMode,
          },

          {
            path: Pathnames.VLAN_ACCESS_PORT,
            name: Pathnames.VLAN_ACCESS_PORT,
            meta: {
              parent: Pathnames.VLAN_CONFIG,
            },
            component: VlanAccessPort,
          },
          {
            path: Pathnames.VLAN_TRUNK,
            name: Pathnames.VLAN_TRUNK,
            meta: {
              parent: Pathnames.VLAN_CONFIG,
            },
            component: VlanTrunkPort,
          },
          {
            path: Pathnames.VLAN_HYBRID,
            name: Pathnames.VLAN_HYBRID,
            meta: {
              parent: Pathnames.VLAN_CONFIG,
            },
            component: VlanHybridPort,
          },
        ],
      },
      {
        path: Pathnames.PORT_FLOW_STATISTICS_DETIAIL,
        name: Pathnames.PORT_FLOW_STATISTICS_DETIAIL,
        component: PortFlowDetail,
        meta: {
          parent: Pathnames.PORT_CONFIG,
          navPathMatch: Pathnames.PORT_FLOW_STATISTICS,
        },
      },
      // 端口配置
      {
        path: Pathnames.PORT_CONFIG,
        name: Pathnames.PORT_CONFIG,
        component: PortConfig,
        children: [
          {
            path: Pathnames.PORT_MODEL,
            name: Pathnames.PORT_MODEL,
            meta: {
              parent: Pathnames.PORT_CONFIG,
            },
            component: PortModel,
          },
          {
            path: Pathnames.PORT_SPEED_LIMIT,
            name: Pathnames.PORT_SPEED_LIMIT,
            meta: {
              parent: Pathnames.PORT_CONFIG,
            },
            component: PortSpeedLimit,
          },
          {
            path: Pathnames.PORT_STORM_LIMIT,
            name: Pathnames.PORT_STORM_LIMIT,
            meta: {
              parent: Pathnames.PORT_CONFIG,
            },
            component: PortStormLimit,
          },
          {
            path: Pathnames.PORT_ISOLATE,
            name: Pathnames.PORT_ISOLATE,
            meta: {
              parent: Pathnames.PORT_CONFIG,
            },
            component: PortIsolate,
          },
          {
            path: Pathnames.PORT_FLOW_STATISTICS,
            name: Pathnames.PORT_FLOW_STATISTICS,
            meta: {
              parent: Pathnames.PORT_CONFIG,
            },
            component: PortFlowStatistics,
          },
          {
            path: Pathnames.PORT_AUTO_SPEED_LIMIT,
            name: Pathnames.PORT_AUTO_SPEED_LIMIT,
            meta: {
              parent: Pathnames.PORT_CONFIG,
            },
            component: PortAutoSpeedLimit,
          },
        ],
      },
      // STP 配置
      {
        path: Pathnames.STP_CONFIG,
        name: Pathnames.STP_CONFIG,
        component: StpConfig,
        children: [
          {
            path: Pathnames.STP_BRIDGE_SETTING,
            name: Pathnames.STP_BRIDGE_SETTING,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: StpBridgeSettings,
          },
          {
            path: Pathnames.STP_MSTI_MAP,
            name: Pathnames.STP_MSTI_MAP,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: MSTIMap,
          },
          {
            path: Pathnames.STP_MSTI_PRIORITY,
            name: Pathnames.STP_MSTI_PRIORITY,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: MSTIPriority,
          },
          {
            path: Pathnames.STP_CIST_PORT,
            name: Pathnames.STP_CIST_PORT,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: CISTPortConfig,
          },
          {
            path: Pathnames.STP_MSTI_PORT,
            name: Pathnames.STP_MSTI_PORT,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: MSTIPortConfig,
          },
          {
            path: Pathnames.STP_BRIDGE_STATUS,
            name: Pathnames.STP_BRIDGE_STATUS,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: StpBridgeStatus,
          },
          {
            path: Pathnames.STP_PORT_STATUS,
            name: Pathnames.STP_PORT_STATUS,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: StpCISTPortStatus,
          },
          {
            path: Pathnames.STP_PORT_STATISTICS,
            name: Pathnames.STP_PORT_STATISTICS,
            meta: {
              parent: Pathnames.STP_CONFIG,
            },
            component: StpPortStatistics,
          },
        ],
      },
      // LACP 配置
      {
        path: Pathnames.LACP_CONFIG,
        name: Pathnames.LACP_CONFIG,
        component: LacpConfig,
        children: [
          {
            path: Pathnames.LACP_LACP,
            name: Pathnames.LACP_LACP,
            meta: {
              parent: Pathnames.LACP_CONFIG,
            },
            component: LacpSettings,
          },
          {
            path: Pathnames.LACP_PORT_CONFIG,
            name: Pathnames.LACP_PORT_CONFIG,
            meta: {
              parent: Pathnames.LACP_CONFIG,
            },
            component: LacpPortConfig,
          },
          {
            path: Pathnames.LACP_SYSTEM_STATUS,
            name: Pathnames.LACP_SYSTEM_STATUS,
            meta: {
              parent: Pathnames.LACP_CONFIG,
            },
            component: LacpSystemStatus,
          },
          {
            path: Pathnames.LACP_PORT_STATUS,
            name: Pathnames.LACP_PORT_STATUS,
            meta: {
              parent: Pathnames.LACP_CONFIG,
            },
            component: LacpPortStatus,
          },
          {
            path: Pathnames.LACP_PORT_STATISTICS,
            name: Pathnames.LACP_PORT_STATISTICS,
            meta: {
              parent: Pathnames.LACP_CONFIG,
            },
            component: LacpPortStatistscs,
          },
        ],
      },
      // IGMP 配置
      {
        path: Pathnames.IGMP_CONFIG,
        name: Pathnames.IGMP_CONFIG,
        component: IgmpConfig,
        children: [
          {
            path: Pathnames.IGMP_GLOBAL,
            name: Pathnames.IGMP_GLOBAL,
            meta: {
              parent: Pathnames.IGMP_CONFIG,
            },
            component: LacpSettings,
          },
          {
            path: Pathnames.IGMP_PORT_CONFIG,
            name: Pathnames.IGMP_PORT_CONFIG,
            meta: {
              parent: Pathnames.IGMP_CONFIG,
            },
            component: LacpPortConfig,
          },
          {
            path: Pathnames.IGMP_VLAN_CONFIG,
            name: Pathnames.IGMP_VLAN_CONFIG,
            meta: {
              parent: Pathnames.IGMP_CONFIG,
            },
            component: LacpSystemStatus,
          },
          {
            path: Pathnames.IGMP_QUERIER_CONFIG,
            name: Pathnames.IGMP_QUERIER_CONFIG,
            meta: {
              parent: Pathnames.IGMP_CONFIG,
            },
            component: LacpPortStatus,
          },
          {
            path: Pathnames.IGMP_MESSAGE,
            name: Pathnames.IGMP_MESSAGE,
            meta: {
              parent: Pathnames.IGMP_CONFIG,
            },
            component: LacpPortStatistscs,
          },
        ],
      },
      // 404
      {
        path: "/:pathMatch(.*)*",
        component: NotFound,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: '/about,
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

const ignoredPaths = [Pathnames.LOGIN];

router.beforeEach((to, from, next) => {
  const store = useMainStore();
  if (
    !store.getUserInfoFinish ||
    ignoredPaths.includes(to.path as Pathnames) ||
    from.path === Pathnames.LOGIN
  ) {
    next();
  } else {
    if (store.userInfo?.login_status === StringBool.TRUE) {
      next();
    } else {
      next("/login");
      // next();
    }
  }
});

export default router;
