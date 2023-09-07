import { ConfigTabs } from "@/components/common/ConfigureTabs.vue";
import { IntBool, pathLabelMap, Pathnames } from "./base.model";

const lacpConfigChildren = [
  Pathnames.LACP_LACP,
  Pathnames.LACP_PORT_CONFIG,
  Pathnames.LACP_SYSTEM_STATUS,
  Pathnames.LACP_PORT_STATUS,
  Pathnames.LACP_PORT_STATISTICS,
];

export const lacpConfigTabs: ConfigTabs[] = lacpConfigChildren.map((v) => ({
  path: v,
  title: pathLabelMap.get(v),
}));

export interface StaticLacpInfo {
  source_mac_enable: IntBool;
  dest_mac_enable: IntBool;
  ip_addr: IntBool;
  tcp_udp_port_number: IntBool;
  lacp_group: [
    {
      group_id: string;
      src_port: string;
    },
    {
      group_id: string;
      src_port: string;
    },
    {
      group_id: string;
      src_port: string;
    }
  ];
}

export interface LacpPortConfigInfo {
  port: number;
  lacp_enable: IntBool;
  lacp_auto_key_enable: IntBool;
  lacp_key: number;
  role: IntBool;
  timeout: IntBool;
  priority: number;
}

export interface LacpSystemStatusInfo {
  group_id: string;
  pair_id: string;
  pair_key: number;
  pair_priority: number;
  change_time: string;
  local_interface: string;
}

export interface LacpPortStatusInfo {
  port: number;
  lacp_enable: number;
  key: string;
  group_id: string;
  pair_id: string;
  pair_port: string;
  priority: string;
}

export interface LacpPortStatistscsInfo {
  port: number;
  lacp_recv: number;
  lacp_send: number;
  unknow: number;
  discard: number;
}
