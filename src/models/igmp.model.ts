import { ConfigTabs } from "@/components/common/ConfigureTabs.vue";
import { pathLabelMap, Pathnames } from "./base.model";

const igmpConfigChildren = [
  Pathnames.IGMP_GLOBAL,
  Pathnames.IGMP_PORT_CONFIG,
  Pathnames.IGMP_VLAN_CONFIG,
  Pathnames.IGMP_QUERIER_CONFIG,
  Pathnames.IGMP_MESSAGE,
];

export const igmpConfigTabs: ConfigTabs[] = igmpConfigChildren.map((v) => ({
  path: v,
  title: pathLabelMap.get(v),
}));
