import i18n from "@/i18n";
import { BaseResponse } from "@/models/base.model";
import {
  VlanAccessPortInfo,
  VlanHybridPortInfo,
  VlanInfo,
  VlanLinkModeEnum,
  VlanTrunkPortInfo,
} from "@/models/vlanConfig.model";
import { message } from "ant-design-vue";
import HttpController from "./http.controller";

export enum SetVlanError {
  SUCCESS = "0",
  ERROR_WITH_NO_ARGS = "-1",
  ERROR_WITH_CANT_PARSE_JSON = "-2",
  VLAN_NOT_EXIST = "101",
  PVID_CANT_BE_TAGGED = "102",
  VLAN_CANNOT_BE_BOTH_TAGGED_AND_UNTAGGED = "103",
  INVALID_INPUT = "508",
}

export const handleSetVlanError = (err: BaseResponse<SetVlanError>) => {
  const { t } = i18n.global;
  const title = t("vlan.setErrors." + err?.errCode);
  message.error(title);
};

export class VlanonfigController extends HttpController {
  getLinkModeList = () =>
    super.get<{ link_mode: VlanLinkModeEnum[] }>("/action/get_vlan_port_mode");

  setLinkModeList = (data: { link_mode: VlanLinkModeEnum[] }) =>
    super.postAction("/action/set_vlan_port_mode", data);

  addVlan = (data: VlanInfo) =>
    super.post("/action/set_vlan_list", { ...data, action: "add" });

  modifyVlan = (data: VlanInfo) =>
    super.postAction("/action/set_vlan_list", { ...data, action: "alter" });

  deleteVlans = (vlan_id: number[]) =>
    super.post("/action/set_vlan_list", { action: "del", vlan_id });

  getVlanList = () => super.get<{ vlans: VlanInfo[] }>("/action/get_vlan_list");

  setVlanList = (data: { vlans: VlanInfo[] }) =>
    super.post("/action/set_vlan_list", data);

  getVlanAccessPortList = () =>
    super.get<{ access_cfg: VlanAccessPortInfo[] }>("/action/get_vlan_access");

  setVlanAccessPortList = (data: { access_cfg: VlanAccessPortInfo[] }) =>
    super.post<BaseResponse<SetVlanError>>(
      "/action/set_vlan_access",
      data
    );

  getVlanTrunkPortList = () =>
    super.get<{ trunk_cfg: VlanTrunkPortInfo[] }>("/action/get_vlan_trunk");

  setVlanTrunkPortList = (data: { trunk_cfg: VlanTrunkPortInfo[] }) =>
    super.post<BaseResponse<SetVlanError>>(
      "/action/set_vlan_trunk",
      data
    );

  getVlanHybridPortList = () =>
    super.get<{ hybrid_cfg: VlanHybridPortInfo[] }>("/action/get_vlan_hybrid");

  setVlanHybridPortList = (data: { hybrid_cfg: VlanHybridPortInfo[] }) =>
    super.post<BaseResponse<SetVlanError>>(
      "/action/set_vlan_hybrid",
      data
    );
}

const vlanonfigController = new VlanonfigController();

export default vlanonfigController;
