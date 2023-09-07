import {
  PortAutoSpeedLmitItem,
  PortFlowStat,
  PortIsolateConfig,
  PortIsolateConfigParams,
  PortModule,
  PortSpeedItem,
  PortStormLimitItem,
} from "@/models/portConfig.model";
import HttpController from "./http.controller";

export class PortConfigController extends HttpController {
  getPortModuleList = () =>
    super.get<{ ports_modules: PortModule[] }>("/action/get_port_module_list");

  setPortModuleList = (data: { ports_modules: PortModule[] }) =>
    super.postAction("/action/set_port_module_list", data);

  getPortSpeedList = () =>
    super.get<{ config: PortSpeedItem[] }>("/action/get_port_ratelimits");

  setPortSpeedList = (data: { config: PortSpeedItem[] }) =>
    super.postAction("/action/set_port_ratelimits", data);

  getPortStormLimitList = () =>
    super.get<{ portSetting: PortStormLimitItem[] }>(
      "/action/get_port_strom_conf"
    );

  setPortStormLimitList = (data: { portSetting: PortStormLimitItem[] }) =>
    super.postAction("/action/set_port_strom_conf", data);

  getPortIsolateConfig = () =>
    super.get<PortIsolateConfig[]>("/action/get_port_isolation_list");

  setPortIsolateConfig = (data: PortIsolateConfig[]) =>
    super.postAction("/action/set_port_isolation_list", data);

  getPortFlowStatList = () =>
    super.get<{ statistics: PortFlowStat[] }>("/action/get_port_statistics");

  clearFlowStat = () => super.get("/action/clear_port_statistics");

  getPortAutoSpeedLimitList = () =>
    super.get<{ auto_limit: PortAutoSpeedLmitItem[] }>(
      "/action/get_port_auto_rate_limit"
    );

  setPortAutoSpeedLimitList = (data: { auto_limit: PortAutoSpeedLmitItem[] }) =>
    super.postAction("/action/set_port_auto_rate_limit", data);
}

const portConfigController = new PortConfigController();

export default portConfigController;
