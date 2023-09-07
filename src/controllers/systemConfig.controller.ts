import {
  ManageIpAddrInfo,
  SSHStatusParams,
  TelnetStatusParams,
} from "@/models/systemConfig.model";
import HttpController from "./http.controller";

export enum SystemIpConfigType {
  PRIMARY = 1,
  SECONDARY = 2,
}

export class SystemConfigController extends HttpController {
  getManageIpInfo = () =>
    super.get<ManageIpAddrInfo>("/action/get_manage_ipaddress");

  setIpAddr = (params: {
    interface: SystemIpConfigType;
    ip: string;
    mask: number;
  }) => super.get("/action/set_manage_ipaddress", { params });

  pingAddr = (dest_ipaddr: string) =>
    super.get<{ result: string }>("/action/set_ping_address", {
      params: { dest_ipaddr },
    });

  getSshStatus = () => super.get<SSHStatusParams>("/action/get_ssh_state");

  setSshStatus = (params: SSHStatusParams) =>
    super.getAction("/action/set_ssh_state", { params });

  getTelnetStatus = () =>
    super.get<TelnetStatusParams>("/action/get_telnet_state");

  setTelnetStatus = (params: TelnetStatusParams) =>
    super.getAction("/action/set_telnet_state", { params });

  updataConfig = (data: FormData) => super.post("/action/config_upload", data);

  updateSoftWare = (data: FormData) => super.post("/action/upgrade", data);

  exportConfig = () => super.get("/action/downloadConfigFile");
}

const systemConfigController = new SystemConfigController();

export default systemConfigController;
