import { NanoidData, pathLabelMap, Pathnames } from "./base.model";
import { ConfigTabs } from "@/components/common/ConfigureTabs.vue";

const vlanConfigChildren = [
  Pathnames.VLAN_LINK_MODE,
  Pathnames.VLAN_MANAGEMENT,
  Pathnames.VLAN_ACCESS_PORT,
  Pathnames.VLAN_TRUNK,
  Pathnames.VLAN_HYBRID,
];

export const vlanConfigTabs: ConfigTabs[] = vlanConfigChildren.map((v) => ({
  path: v,
  title: pathLabelMap.get(v),
}));

// 链路模式枚举
export enum VlanLinkModeEnum {
  ACCESS = 0,
  TRUNK = 1,
  HYBRID = 2,
}

export interface VlanLinkModeItem {
  port: number;
  mode: VlanLinkModeEnum[];
}

export const mockVlanLinkModeList = {
  link_mode: [
    {
      port: 1,
      mode: 0,
    },
    {
      port: 2,
      mode: 1,
    },
    {
      port: 3,
      mode: 2,
    },
    {
      port: 4,
      mode: 1,
    },
    {
      port: 5,
      mode: 1,
    },
    {
      port: 6,
      mode: 1,
    },
    {
      port: 7,
      mode: 1,
    },
    {
      port: 8,
      mode: 1,
    },
    {
      port: 9,
      mode: 1,
    },
    {
      port: 10,
      mode: 1,
    },
    {
      port: 11,
      mode: 1,
    },
    {
      port: 12,
      mode: 1,
    },
  ],
};

// Vlan
export interface VlanInfo extends NanoidData {
  vlan_id: number;
  vlan_name: string;
}

// Vlan Access 端口配置
export interface VlanAccessPortInfo {
  port: number;
  pvid: number;
}

// Vlan Trunk 端口配置
export interface VlanTrunkPortInfo extends VlanAccessPortInfo {
  allowed_vlan: string;
}

// Vlan Hybrid 端口配置
export interface VlanHybridPortInfo extends VlanAccessPortInfo {
  allowed_taged: string;
  allowed_untaged: string;
}
