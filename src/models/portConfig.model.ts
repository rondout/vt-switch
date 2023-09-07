import { IntBool, pathLabelMap, Pathnames, TableColumns } from "./base.model";
import { ConfigTabs } from "@/components/common/ConfigureTabs.vue";
import { DefaultOptionType } from "ant-design-vue/es/select";

const portConfigChildren = [
  Pathnames.PORT_MODEL,
  Pathnames.PORT_SPEED_LIMIT,
  Pathnames.PORT_STORM_LIMIT,
  Pathnames.PORT_ISOLATE,
  Pathnames.PORT_FLOW_STATISTICS,
  Pathnames.PORT_AUTO_SPEED_LIMIT,
];

export const portConfigTabs: ConfigTabs[] = portConfigChildren.map((v) => ({
  path: v,
  title: pathLabelMap.get(v),
}));

export enum PortLinkStat {
  UP = "Up",
  DOWN = "Down",
}

export enum PortSpeed {
  TEN_M = "10M",
  HUNDRED_M = "100M",
  THOUSAND_M = "1000M",
}

export enum PortType {
  GE = "GE",
  SA = "SA",
  GX = "GX",
}
// 端口模式
export interface PortModule {
  port: number;
  type: PortType;
  linkStat: PortLinkStat;
  auto_speed: IntBool;
  speed: PortSpeed;
  duplex: IntBool;
  flow: IntBool;
  manage_state: IntBool;
  description: string;
}

// 端口限速
export enum PortSpeedUnits {
  kbps = "kbps",
  mbps = "mbps",
}

export const portSpeedUnitsOptions: DefaultOptionType[] = [
  { label: "kbps", value: PortSpeedUnits.kbps },
  { label: "mbps", value: PortSpeedUnits.mbps },
];

export interface PortSpeedItem {
  port: string;
  type: PortType;
  bandwith_value: number;
  bandwith_unit: PortSpeedUnits;
}

// 端口风暴抑制
export interface PortStormLimitItem {
  port: string;
  type: PortType;
  bcast_value: number;
  bcast_unit: PortSpeedUnits;
  mcast_value: number;
  mcast_unit: PortSpeedUnits;
  ucast_value: number;
  ucast_unit: PortSpeedUnits;
  // JavaScript的作用域和作用域链 作用域链是一个变量可以使用的范围  主要分为全局作用域和函数作用域
  // 函数作用域就是JS中最外层的作用域，在哪里都可以访问  函数作用域是JS通过函数创建的一个独立作用域，只能在函数内部访问  函数可以嵌套 作用域也可以嵌套 ES6新增了块级作用域，
  // 只能在函数内部访问，防抖节流，所谓防抖就是指触发事件后在n秒内函数只能执行一次，如果在n秒内又触发了事件，则会重新计算函数执行时间。
  // 所谓节流，就是指连续触发事件但是在n秒钟内只执行一次函数，两种方式可以实现，分别是时间戳版本和定时器版本
}

// 端口隔离
export interface PortIsolateConfig {
  group: number;
  ports: number[];
}

export interface PortIsolateConfigParams {
  action?: "add" | "del";
  group: number[] | number;
  ports: number[];
}

// 端口流量统计
export interface PortFlowSendAndReceiveData {
  // 接收/发送比特数
  bytes: number | string;
  // 接收/发送包数
  packs: number | string;
  // 接收/发送单播包数
  ucast: number | string;
  // 接收/发送组播包数
  mcast: number | string;
  // 接收/发送广播包数
  bcast: number | string;
  // 接收/发送丢弃包数
  drops: number | string;
  // 接收CRC包数
  crc?: number | string;
  // 接收/发送流控帧数
  pause?: number | string;
}

export interface PortFlowLengthInfo {
  "64 Bytes": string;
  "65~127 Bytes": string;
  "128~255 Bytes": string;
  "256~511 Bytes": string;
  "512~1023 Bytes": string;
  "1024~1517 Bytes": string;
  ">= 1519": string;
}

export interface PortFloeQOS {
  Q0: string;
  Q1: string;
  Q2: string;
  Q3: string;
  Q4: string;
  Q5: string;
  Q6: string;
  Q7: string;
}

export interface PortFlowStat {
  port: number;
  type: PortType | string;
  recv: PortFlowSendAndReceiveData;
  send: PortFlowSendAndReceiveData;
  length: PortFlowLengthInfo;
  qos: PortFloeQOS;
  [propName: string]: any;
}

export const portFlowStatColumns: TableColumns[] = [
  new TableColumns("port.potName", "port"),
  new TableColumns("port.type", "type"),
  new TableColumns("port.send", "send", [
    new TableColumns("port.bytes", "send.bytes"),
    new TableColumns("port.packs", "send.packs"),
    new TableColumns("port.ucast", "send.ucast"),
    new TableColumns("port.mcast", "send.mcast"),
    new TableColumns("port.bcast", "send.bcast"),
    new TableColumns("port.drops", "send.drops"),
    // new TableColumns("port.crc", "send.crc"),
    new TableColumns("port.pause", "send.pause"),
  ]),
  new TableColumns("port.recv", "recv", [
    new TableColumns("port.bytes", "recv.bytes"),
    new TableColumns("port.packs", "recv.packs"),
    new TableColumns("port.ucast", "recv.ucast"),
    new TableColumns("port.mcast", "recv.mcast"),
    new TableColumns("port.bcast", "recv.bcast"),
    new TableColumns("port.drops", "recv.drops"),
    new TableColumns("port.crc", "recv.crc"),
    new TableColumns("port.pause", "recv.pause"),
  ]),
];

const sendColumnDataIndexs = portFlowStatColumns[2].children.map(
  (v) => v.dataIndex
);
const recvColumnDataIndexs = portFlowStatColumns[3].children.map(
  (v) => v.dataIndex
);

export interface CustomPortFlowThs {
  recv: string[];
  send: string[];
}

export const portFlowStatLocalStorageKey = "port_flow_statistic_ths";

export const defaultPortFlowThs: CustomPortFlowThs = {
  recv: recvColumnDataIndexs,
  send: sendColumnDataIndexs,
};

// 端口自动限速
export interface PortAutoSpeedLmitItem {
  port: number;
  enable: IntBool;
}
