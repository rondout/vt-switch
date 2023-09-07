import {
  CISTportInfo,
  MSTIMapInfo,
  MSTIPriorityInfo,
  MSTIPortInfo,
  StpBridgeInfo,
  StpBridgeStatusInfo,
  STPPortStatisticInfo,
} from "@/models/stpConfig.model";
import HttpController from "./http.controller";

export class StpConfigController extends HttpController {
  getBridgeInfo = () => super.get<StpBridgeInfo>("/action/get_stp_port_state");

  setBridgeInfo = (data: StpBridgeInfo) =>
    super.postAction("/action/set_stp_port_state", data);

  getMSTIMapInfo = () => super.get<MSTIMapInfo>("/action/get_msti_mapping");

  setMSTIMapInfo = (data: MSTIMapInfo) =>
    super.postAction("/action/set_msti_mapping", data);

  getMSTIPriorityInfo = () =>
    super.get<MSTIPriorityInfo>("/action/get_msti_priority");

  setMSTIPriorityInfo = (data: MSTIPriorityInfo) =>
    super.postAction("/action/set_msti_priority", data);

  getCISTportList = () =>
    super.get<{ config_list: CISTportInfo[] }>("/action/get_cist_port_conf");

  setCISTportList = (data: { config_list: CISTportInfo[] }) =>
    super.postAction("/action/set_cist_port_conf", data);

  getMSTIportList = () =>
    super.get<{ config_list: MSTIPortInfo[] }>("/action/get_msti_port_conf");

  setMSTIportList = (data: { config_list: MSTIPortInfo[] }) =>
    super.postAction("/action/set_msti_port_conf", data);

  getStpBridgeStatus = () =>
    super.get<{ config_list: StpBridgeStatusInfo[] }>(
      "/action/get_bridge_state"
    );

  getStpCISTPortStatus = () =>
    super.get<{ config_list: StpBridgeStatusInfo[] }>(
      "/action/get_cist_port_state"
    );

  getStpPortStatistics = () =>
    super.get<{ config_list: STPPortStatisticInfo[] }>(
      "/action/get_stp_port_statistics"
    );
}

const stpConfigController = new StpConfigController();

export default stpConfigController;
