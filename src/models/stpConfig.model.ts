import { ConfigTabs } from "@/components/common/ConfigureTabs.vue";
import { DefaultOptionType } from "ant-design-vue/es/select";
import { IntBool, pathLabelMap, Pathnames } from "./base.model";

const stpConfigChildren = [
  Pathnames.STP_BRIDGE_SETTING,
  Pathnames.STP_MSTI_MAP,
  Pathnames.STP_MSTI_PRIORITY,
  Pathnames.STP_CIST_PORT,
  Pathnames.STP_MSTI_PORT,
  Pathnames.STP_BRIDGE_STATUS,
  Pathnames.STP_PORT_STATUS,
  Pathnames.STP_PORT_STATISTICS,
];

export const stpConfigTabs: ConfigTabs[] = stpConfigChildren.map((v) => ({
  path: v,
  title: pathLabelMap.get(v),
}));

// 桥设置
export enum StpBridgeProtocol {
  MSTP = "MSTP",
  RSTP = "RSTP",
  STP = "STP",
}

export const stpBridgeProtocolOptions: DefaultOptionType[] = [
  { label: StpBridgeProtocol.MSTP, value: StpBridgeProtocol.MSTP },
  { label: StpBridgeProtocol.RSTP, value: StpBridgeProtocol.RSTP },
  { label: StpBridgeProtocol.STP, value: StpBridgeProtocol.STP },
];

const createStpBridgePriorityOptions = (): DefaultOptionType[] => {
  let i = 4096;
  const numbers = [];
  while (i <= 61440) {
    numbers.push({ label: i.toString(), value: i });
    i += 4096;
  }
  return numbers;
};

export const stpBridgePriorityOptions: DefaultOptionType[] =
  createStpBridgePriorityOptions();

export const stpHelloKeepOptions: DefaultOptionType[] = Array.from({
  length: 10,
}).map((v, i) => ({ label: (i + 1).toString(), value: i + 1 }));

export const forwardDealyOptions: DefaultOptionType[] = Array.from({
  length: 27,
}).map((v, i) => ({ label: (i + 4).toString(), value: i + 4 }));

export const maxAgeJumpTimeOptions: DefaultOptionType[] = Array.from({
  length: 35,
}).map((v, i) => ({ label: (i + 6).toString(), value: i + 6 }));

export interface StpBridgeInfo {
  enable: IntBool;
  protocol: StpBridgeProtocol;
  priority: number;
  hello: number;
  forward_delay: number;
  max_age_time: number;
  mstp_max_jump_time: number;
  keep: number;
  edge_port_bpdu_enable: IntBool;
  port_err_recovery_enable: IntBool;
  port_err_recovery_time: number;
}

export interface MSTIMapInfo {
  config_name: string;
  config_number: number;
  MSTI1: string;
  MSTI2: string;
  MSTI3: string;
  MSTI4: string;
  MSTI5: string;
  MSTI6: string;
  MSTI7: string;
}

export const MSTI1list = [
  "MSTI1",
  "MSTI2",
  "MSTI3",
  "MSTI4",
  "MSTI5",
  "MSTI6",
  "MSTI7",
];

export interface MSTIPriorityInfo {
  CIST: number;
  MSTI1: number;
  MSTI2: number;
  MSTI3: number;
  MSTI4: number;
  MSTI5: number;
  MSTI6: number;
  MSTI7: number;
}

export const MSTIPriorityInfoKeys = [
  "CIST",
  "MSTI1",
  "MSTI2",
  "MSTI3",
  "MSTI4",
  "MSTI5",
  "MSTI6",
  "MSTI7",
];

export enum CISTP2pEnum {
  AUTO = 0,
  FORCE_P2P = 1,
  FORCE_SHARE = 2,
}

export interface CISTportInfo {
  port: number | "*";
  stp_enable: IntBool;
  auto_path_cost_enable: IntBool;
  path_cost: number;
  port_priority: number;
  manage_edge: IntBool;
  auto_edge: IntBool;
  limit_role_enable: IntBool;
  limit_tcn_enable: IntBool;
  bpdu_protect: IntBool;
  p2p: CISTP2pEnum;
}

// export enum MSTIPortType {

// }

//
const createStpPriorityOptions = (): DefaultOptionType[] => {
  let i = 0;
  const numbers = [];
  while (i <= 240) {
    numbers.push({ label: i.toString(), value: i });
    i += 16;
  }
  return numbers;
};

export const stpPriorityOptions: DefaultOptionType[] =
  createStpPriorityOptions();

export const CISTEdgeOptions: DefaultOptionType[] = [
  { label: "stp.notEdge", value: IntBool.FALSE },
  { label: "stp.edge", value: IntBool.TRUE },
];

export const CISTP2pOptions: DefaultOptionType[] = [
  { label: "auto", value: CISTP2pEnum.AUTO },
  { label: "stp.forceP2p", value: CISTP2pEnum.FORCE_P2P },
  { label: "stp.forceShare", value: CISTP2pEnum.FORCE_SHARE },
];

// MSTI 端口配置
export interface MSTIPortInfo {
  port: number | "*";
  auto_cost_enable: IntBool;
  cost: number;
  // type:MSTIPortType;
  priority: number;
}

// 桥状态
export interface StpBridgeStatusInfo {
  msti: string;
  bridege_id: string;
  root_id: string;
  root_port: number;
  root_path: number;
  topo_flag: string;
  topo_change_time: string;
}

// CIST端口状态
export interface StpBridgeStatusInfo {
  port: number;
  cist_role: string;
  cist_state: string;
  run_time: string;
}

// STP 端口统计
export interface STPPortStatisticInfo {
  port: number;
  recv: {
    MSTP: number;
    RSTP: number;
    STP: number;
    TCN: number;
  };
  send: {
    MSTP: number;
    RSTP: number;
    STP: number;
    TCN: number;
  };
  discard: {
    unknow: number;
    illegal: number;
  };
}
