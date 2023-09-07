import IconfontVue from "@/components/layouts/Iconfont.vue";
import { ColumnType } from "ant-design-vue/es/table";
import {
  DefaultRecordType,
  GetComponentProps,
} from "ant-design-vue/es/vc-table/interface";
import { h, Raw, RendererElement, RendererNode, VNode } from "vue";

export enum IntBool {
  TRUE = 1,
  FALSE = 0,
}

export enum StringBool {
  TRUE = "1",
  FALSE = "0",
}

// 语言
export enum Languages {
  zh = "zh_CN",
  en = "en_US",
}

export enum Pathnames {
  MAIN_LAYOUT = "/",
  HOME = "/",
  LOGIN = "/login",
  // 用户
  USERS = "/users",
  // 系统配置
  SYSTEM_CONFIG = "/system-config",
  SYSTEM_ADDRESS = "/system-config/address",
  SYSTEM_PING = "/system-config/ping",
  SYSTEM_SSH = "/system-config/ssh",
  SYSTEM_TELNET = "/system-config/telnet",
  SYSTEM_CONFIG_MANAGEMENT = "/system-config/config-management",
  SYSTEM_SOFTWARE_UPGRADE = "/system-config/software-upgrade",
  // 端口配置
  PORT_CONFIG = "/port-config",
  PORT_MODEL = "/port-config/port-model",
  PORT_SPEED_LIMIT = "/port-config/port-speed-limit",
  PORT_STORM_LIMIT = "/port-config/port-storm-limit",
  PORT_ISOLATE = "/port-config/port-isolate",
  PORT_FLOW_STATISTICS = "/port-config/port-flow-statistics",
  PORT_FLOW_STATISTICS_DETIAIL = "/port-config/port-flow-statistics/:id",
  PORT_AUTO_SPEED_LIMIT = "/port-config/port-auto-speed-limit",
  // Vlan配置
  VLAN_CONFIG = "/vlan-config",
  VLAN_LINK_MODE = "/vlan-config/link-mode",
  VLAN_MANAGEMENT = "/vlan-config/management",
  VLAN_ACCESS_PORT = "/vlan-config/access-port",
  VLAN_TRUNK = "/vlan-config/trunk",
  VLAN_HYBRID = "/vlan-config/hybrid",
  // stp_config
  STP_CONFIG = "/stp-config",
  STP_BRIDGE_SETTING = "/stp-config/bridge-settings",
  STP_MSTI_MAP = "/stp-config/msti_map",
  STP_MSTI_PRIORITY = "/stp-config/msti-priority",
  STP_CIST_PORT = "/stp-config/cist-port",
  STP_MSTI_PORT = "/stp-config/msti-port",
  STP_BRIDGE_STATUS = "/stp-config/bridge-status",
  STP_PORT_STATUS = "/stp-config/port-status",
  STP_PORT_STATISTICS = "/stp-config/port-statistics",
  // LACP
  LACP_CONFIG = "/lacp-config",
  LACP_LACP = "/lacp-config/lacp",
  LACP_PORT_CONFIG = "/lacp-config/port_config",
  LACP_SYSTEM_STATUS = "/lacp-config/system_status",
  LACP_PORT_STATUS = "/lacp-config/port_status",
  LACP_PORT_STATISTICS = "/lacp-config/port_statistics",
  // IGMP
  IGMP_CONFIG = "/igmp-config",
  IGMP_GLOBAL = "/igmp-config/global",
  IGMP_PORT_CONFIG = "/igmp-config/port",
  IGMP_VLAN_CONFIG = "/igmp-config/vlan",
  IGMP_QUERIER_CONFIG = "/igmp-config/querier",
  IGMP_MESSAGE = "/igmp-config/message",
}

export const pathLabelMap = new Map<Pathnames, string>([
  [Pathnames.HOME, "nav.titles.HOME"],
  // system config
  [Pathnames.SYSTEM_CONFIG, "nav.titles.SYSTEM_CONFIG"],
  [Pathnames.SYSTEM_ADDRESS, "nav.titles.SYSTEM_ADDRESS"],
  [Pathnames.SYSTEM_PING, "nav.titles.SYSTEM_PING"],
  [Pathnames.SYSTEM_SSH, "nav.titles.SYSTEM_SSH"],
  [Pathnames.SYSTEM_TELNET, "nav.titles.SYSTEM_TELNET"],
  [Pathnames.SYSTEM_CONFIG_MANAGEMENT, "nav.titles.SYSTEM_CONFIG_MANAGEMENT"],
  [Pathnames.SYSTEM_SOFTWARE_UPGRADE, "nav.titles.SYSTEM_SOFTWARE_UPGRADE"],
  // port
  [Pathnames.PORT_CONFIG, "nav.titles.PORT_CONFIG"],
  [Pathnames.PORT_MODEL, "nav.titles.PORT_MODEL"],
  [Pathnames.PORT_SPEED_LIMIT, "nav.titles.PORT_SPEED_LIMIT"],
  [Pathnames.PORT_STORM_LIMIT, "nav.titles.PORT_STORM_LIMIT"],
  [Pathnames.PORT_ISOLATE, "nav.titles.PORT_ISOLATE"],
  [Pathnames.PORT_FLOW_STATISTICS, "nav.titles.PORT_FLOW_STATISTICS"],
  [
    Pathnames.PORT_FLOW_STATISTICS_DETIAIL,
    "nav.titles.PORT_FLOW_STATISTICS_DETIAIL",
  ],
  [Pathnames.PORT_AUTO_SPEED_LIMIT, "nav.titles.PORT_AUTO_SPEED_LIMIT"],
  // Vlan
  [Pathnames.VLAN_CONFIG, "nav.titles.VLAN_CONFIG"],
  [Pathnames.VLAN_LINK_MODE, "nav.titles.VLAN_LINK_MODE"],
  [Pathnames.VLAN_MANAGEMENT, "nav.titles.VLAN_MANAGEMENT"],
  [Pathnames.VLAN_ACCESS_PORT, "nav.titles.VLAN_ACCESS_PORT"],
  [Pathnames.VLAN_TRUNK, "nav.titles.VLAN_TRUNK"],
  [Pathnames.VLAN_HYBRID, "nav.titles.VLAN_HYBRID"],
  // STP
  [Pathnames.STP_CONFIG, "nav.titles.STP_CONFIG"],
  [Pathnames.STP_BRIDGE_SETTING, "nav.titles.STP_BRIDGE_SETTING"],
  [Pathnames.STP_MSTI_MAP, "nav.titles.STP_MSTI_MAP"],
  [Pathnames.STP_MSTI_PRIORITY, "nav.titles.STP_MSTI_PRIORITY"],
  [Pathnames.STP_CIST_PORT, "nav.titles.STP_CIST_PORT"],
  [Pathnames.STP_MSTI_PORT, "nav.titles.STP_MSTI_PORT"],
  [Pathnames.STP_BRIDGE_STATUS, "nav.titles.STP_BRIDGE_STATUS"],
  [Pathnames.STP_PORT_STATUS, "nav.titles.STP_PORT_STATUS"],
  [Pathnames.STP_PORT_STATISTICS, "nav.titles.STP_PORT_STATISTICS"],
  // LACP
  [Pathnames.LACP_CONFIG, "nav.titles.LACP_CONFIG"],
  [Pathnames.LACP_LACP, "nav.titles.LACP_LACP"],
  [Pathnames.LACP_PORT_CONFIG, "nav.titles.LACP_PORT_CONFIG"],
  [Pathnames.LACP_SYSTEM_STATUS, "nav.titles.LACP_SYSTEM_STATUS"],
  [Pathnames.LACP_PORT_STATUS, "nav.titles.LACP_PORT_STATUS"],
  [Pathnames.LACP_PORT_STATISTICS, "nav.titles.LACP_PORT_STATISTICS"],
  //
  [Pathnames.IGMP_CONFIG, "nav.titles.IGMP_CONFIG"],
  [Pathnames.IGMP_GLOBAL, "nav.titles.IGMP_GLOBAL"],
  [Pathnames.IGMP_PORT_CONFIG, "nav.titles.IGMP_PORT_CONFIG"],
  [Pathnames.IGMP_VLAN_CONFIG, "nav.titles.IGMP_VLAN_CONFIG"],
  [Pathnames.IGMP_QUERIER_CONFIG, "nav.titles.IGMP_QUERIER_CONFIG"],
  [Pathnames.IGMP_MESSAGE, "nav.titles.IGMP_MESSAGE"],
]);

export class NavItemFactory {
  public key: string;
  public label: string;
  public title: string;
  public icon?: () => VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
  >;

  constructor(
    private t: (str: string) => string,
    public path: Pathnames,
    _icon: string = "ic_",
    public children?: NavItemFactory[]
  ) {
    this.icon =
      _icon &&
      (() => h(IconfontVue, { icon: _icon, color: null, mr: 0 - 0.3, ml: -1 }));
    this.key = path;
    // this.label = path;
    this.label = t(pathLabelMap.get(path));
    this.title = t(pathLabelMap.get(path));
  }
}

export const createNavItems = (t: (str: string) => string) => [
  new NavItemFactory(t, Pathnames.HOME, "ic_home"),
  new NavItemFactory(t, Pathnames.SYSTEM_CONFIG, "ic_system", [
    new NavItemFactory(t, Pathnames.SYSTEM_ADDRESS, null),
    new NavItemFactory(t, Pathnames.SYSTEM_PING, null),
    new NavItemFactory(t, Pathnames.SYSTEM_SSH, null),
    new NavItemFactory(t, Pathnames.SYSTEM_TELNET, null),
    new NavItemFactory(t, Pathnames.SYSTEM_CONFIG_MANAGEMENT, null),
    new NavItemFactory(t, Pathnames.SYSTEM_SOFTWARE_UPGRADE, null),
  ]),
  new NavItemFactory(t, Pathnames.PORT_CONFIG, "ic_port", [
    new NavItemFactory(t, Pathnames.PORT_MODEL, null),
    new NavItemFactory(t, Pathnames.PORT_SPEED_LIMIT, null),
    new NavItemFactory(t, Pathnames.PORT_STORM_LIMIT, null),
    new NavItemFactory(t, Pathnames.PORT_ISOLATE, null),
    new NavItemFactory(t, Pathnames.PORT_FLOW_STATISTICS, null),
    new NavItemFactory(t, Pathnames.PORT_AUTO_SPEED_LIMIT, null),
  ]),
  new NavItemFactory(t, Pathnames.VLAN_CONFIG, "ic_vlan", [
    new NavItemFactory(t, Pathnames.VLAN_LINK_MODE, null),
    new NavItemFactory(t, Pathnames.VLAN_MANAGEMENT, null),
    new NavItemFactory(t, Pathnames.VLAN_ACCESS_PORT, null),
    new NavItemFactory(t, Pathnames.VLAN_TRUNK, null),
    new NavItemFactory(t, Pathnames.VLAN_HYBRID, null),
  ]),
  new NavItemFactory(t, Pathnames.STP_CONFIG, "ic_lacp", [
    new NavItemFactory(t, Pathnames.STP_BRIDGE_SETTING, null),
    new NavItemFactory(t, Pathnames.STP_MSTI_MAP, null),
    new NavItemFactory(t, Pathnames.STP_MSTI_PRIORITY, null),
    new NavItemFactory(t, Pathnames.STP_CIST_PORT, null),
    new NavItemFactory(t, Pathnames.STP_MSTI_PORT, null),
    new NavItemFactory(t, Pathnames.STP_BRIDGE_STATUS, null),
    new NavItemFactory(t, Pathnames.STP_PORT_STATUS, null),
    new NavItemFactory(t, Pathnames.STP_PORT_STATISTICS, null),
  ]),
  new NavItemFactory(t, Pathnames.LACP_CONFIG, "ic_stp", [
    new NavItemFactory(t, Pathnames.LACP_LACP, null),
    new NavItemFactory(t, Pathnames.LACP_PORT_CONFIG, null),
    new NavItemFactory(t, Pathnames.LACP_SYSTEM_STATUS, null),
    new NavItemFactory(t, Pathnames.LACP_PORT_STATUS, null),
    new NavItemFactory(t, Pathnames.LACP_PORT_STATISTICS, null),
  ]),
  new NavItemFactory(t, Pathnames.IGMP_CONFIG, "ic_igmp", [
    new NavItemFactory(t, Pathnames.IGMP_GLOBAL, null),
    new NavItemFactory(t, Pathnames.IGMP_PORT_CONFIG, null),
    new NavItemFactory(t, Pathnames.IGMP_VLAN_CONFIG, null),
    new NavItemFactory(t, Pathnames.IGMP_QUERIER_CONFIG, null),
    new NavItemFactory(t, Pathnames.IGMP_MESSAGE, null),
  ]),
];

export interface TableColumnsType extends ColumnType {
  children?: TableColumns[];
  customCellRender?: Raw<
    VNode<
      RendererNode,
      RendererElement,
      {
        [key: string]: any;
      }
    >
  >;
}

export class TableColumns implements TableColumnsType {
  public key: string;
  constructor(
    public title: string,
    public dataIndex: string,
    public children?: TableColumns[],
    public width?: number,
    public customCell?: GetComponentProps<DefaultRecordType>
  ) {
    this.key = dataIndex;
  }
}

export class NoPaddingTableColumns extends TableColumns {
  constructor(
    title: string,
    dataIndex: string,
    children?: TableColumns[],
    width?: number,
    customCell?: GetComponentProps<DefaultRecordType>
  ) {
    super(
      title,
      dataIndex,
      children,
      width,
      customCell ||
        (() => ({
          style: {
            padding: "0 0 0 16px",
          },
        }))
    );
  }
}

export enum BaseResponseError {
  SUCCESS = "0",
  ERROR_WITH_NO_ARGS = "-1",
  ERROR_WITH_CANT_PARSE_JSON = "-2",
}

// http请求的返回值
export interface BaseResponse<T = BaseResponseError> {
  // success?: boolean;
  // respCode?: number;
  errCode?: T;
  // errMsg?: string;
}

export interface NanoidData {
  nanoid?: string;
}

export enum FormItemTypes {
  INPUT,
  SELECT,
  CHECKBOX,
  INT_CHECKNOX,
  SWITCH,
  INT_SWITCH,
  NUMBER,
  TEXTAREA,
  RADIO_GROUP,
  RADIO,
}
