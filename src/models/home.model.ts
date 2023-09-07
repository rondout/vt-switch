export interface SystemInfo {
  hostname: string;
  hwversion: string;
  sn: string;
  mac: string;
  productname: string;
  softwareversion: string;
  sys_time: string;
  run_time: string;
  timezone: string;
  mem_usage: string;
  cpu_usage: string;
}

export const systemInfoKeys: (keyof SystemInfo)[] = [
  "hostname",
  "hwversion",
  "sn",
  "mac",
  "productname",
  "softwareversion",
  "sys_time",
  "run_time",
  "timezone",
  "mem_usage",
  "cpu_usage",
];
