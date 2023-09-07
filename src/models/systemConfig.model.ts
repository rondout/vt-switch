import { ConfigTabs } from "@/components/common/ConfigureTabs.vue";
import { IntBool, pathLabelMap, Pathnames } from "./base.model";
import { PortLinkStat } from "./portConfig.model";

const systemConfigChildren = [
  Pathnames.SYSTEM_ADDRESS,
  Pathnames.SYSTEM_PING,
  Pathnames.SYSTEM_SSH,
  Pathnames.SYSTEM_TELNET,
  Pathnames.SYSTEM_CONFIG_MANAGEMENT,
  Pathnames.SYSTEM_SOFTWARE_UPGRADE,
];

export const systemConfigTabs: ConfigTabs[] = systemConfigChildren.map((v) => ({
  path: v,
  title: pathLabelMap.get(v),
}));

export enum IpManageType {
  PRIMARY_IP = 1,
  SECONDARY_IP = 2,
}

export interface ManageIpAddrInfo {
  interface: IpManageType;
  linkStat: PortLinkStat;
  primary_ip: string;
  secondary_ip: string;
}

export interface SSHStatusParams {
  ssh_state: IntBool;
}

export interface TelnetStatusParams {
  telnet_state: IntBool;
}

export enum SystemConfigType {
  STARTUP_CONFIG = "startup_config",
  RUNNING_CONFIG = "running_config",
}

export enum SystemConfigExportMethod {
  LOCAL,
}

export enum SystemSoftwareUpgradeMode {
  LOCAL,
}
