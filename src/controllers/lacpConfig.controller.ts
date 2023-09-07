import {
  LacpPortConfigInfo,
  LacpPortStatistscsInfo,
  LacpPortStatusInfo,
  LacpSystemStatusInfo,
  StaticLacpInfo,
} from "@/models/lacpConfig.model";
import HttpController from "./http.controller";

export class LacpConfigController extends HttpController {
  getStaticLacpInfo = () =>
    super.get<StaticLacpInfo>("/action/get_static_lacp");

  getDynamicLacpPiority = () =>
    super.get<{ lacp_priority: number }>("/action/get_dynamic_lacp_priority");

  setDynamicLacpPiority = (data: { lacp_priority: number }) =>
    super.postAction("/action/set_dynamic_lacp_priority", data);

  getLacpPortConfigList = () =>
    super.get<{ config_list: LacpPortConfigInfo[] }>(
      "/action/get_lacp_port_cfg"
    );

  setLacpPortConfigList = (data: { config_list: LacpPortConfigInfo[] }) =>
    super.postAction("/action/set_lacp_port_cfg", data);

  getLacpSystemStatusList = () =>
    super.get<{ config_list: LacpSystemStatusInfo[] }>(
      "/action/get_lacp_state"
    );

  getLacpPortStatusList = () =>
    super.get<{ config_list: LacpPortStatusInfo[] }>(
      "/action/get_lacp_port_state"
    );

  getLacpPortStatisticsList = () =>
    super.get<{ config_list: LacpPortStatistscsInfo[] }>(
      "/action/get_lacp_port_statistics"
    );
}

const lacpConfigController = new LacpConfigController();

export default lacpConfigController;
