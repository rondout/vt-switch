import { LocaleFile } from ".";

const en_US: LocaleFile = {
  title: "Chinese",
  cancel: "Cancel",
  saveChange: "Save Changes",
  detailInfo: "Detailed Information",
  nav: {
    titles: {
      HOME: "Home Page",
      SYSTEM_CONFIG: "System Configuration",
      PORT_CONFIG: "Port Configuration",
      PORT_MODEL: "Port Mode",
      PORT_SPEED_LIMIT: "Port Speed Limit",
      VLAN_CONFIG: "VLAN Configuration",
      PORT_STORM_LIMIT: "Port Storm Limitation",
      PORT_ISOLATE: "Port Isolation",
      PORT_FLOW_STATISTICS: "Port Flow Statistics",
      PORT_FLOW_STATISTICS_DETIAIL: "Port Flow Statistics Details",
      PORT_AUTO_SPEED_LIMIT: "Port Automatic Speed Limit",
      VLAN_LINK_MODE: "Link Mode",
      VLAN_MANAGEMENT: "VLAN Management",
      VLAN_ACCESS_PORT: "Access Port Configuration",
      VLAN_TRUNK: "Trunk Port Configuration",
      VLAN_HYBRID: "Hybrid Port Configuration",
      SYSTEM_ADDRESS: "Management Address",
      SYSTEM_PING: "Ping",
      SYSTEM_SSH: "SSH Status",
      SYSTEM_TELNET: "Telnet Status",
      SYSTEM_CONFIG_MANAGEMENT: "Configuration Management",
      SYSTEM_SOFTWARE_UPGRADE: "Software Upgrade",
      STP_CONFIG: "STP Configuration",
      STP_BRIDGE_SETTING: "Bridge Settings",
      STP_MSTI_MAP: "MSTI Mapping",
      STP_MSTI_PRIORITY: "MSTI Priority",
      STP_CIST_PORT: "CIST Port",
      STP_MSTI_PORT: "MSTI Port",
      STP_BRIDGE_STATUS: "Bridge Status",
      STP_PORT_STATUS: "Port Status",
      STP_PORT_STATISTICS: "Port Statistics",
      LACP_CONFIG: "LACP Configuration",
      LACP_LACP: "LACP",
      LACP_PORT_CONFIG: "LACP Port Configuration",
      LACP_SYSTEM_STATUS: "System Status",
      LACP_PORT_STATUS: "Port Status",
      LACP_PORT_STATISTICS: "Port Statistics",
      IGMP_Configuration: "Multicast Management>IGMP",
      IGMP_GLOBAL: "Global Configuration",
      IGMP_PORT_Configuration: "Port Configuration",
      IGMP_VLAN_Configuration: "VLAN Configuration",
      IGMP_QUERIER_Configuration: "Query Configuration",
      IGMP_MESSAGE: "Message Statistics",
    },
  },
  home: {
    productInfo: "Product Information",
    hostname: "device name",
    hwversion: "Hardware Version",
    sn: "Serial Number",
    mac: "MAC address",
    productname: "Device model",
    softwareversion: "Software Version",
    sys_time: "System Time",
    run_time: "Device running time",
    timezone: "Time Zone",
    mem_usage: "Memory usage",
    cpu_usage: "CPU usage",
  },
  system: {
    ipRequired: "Please enter a valid IP address",
    noIpToModify: "Currently no changes",
    primary_ip: "Primary management address",
    secondary_ip: "secondary management address",
    pingAddr: "Ping Address",
    pingResult: "Ping Result",
    destIpRequired: "Please enter the Ping address",
    destIpInValid: "Please enter a valid Ping address",
    sshStatus: "SSH Status",
    sshStatusSetSuccessed: "SSH status set successfully",
    sshStatusSetError: "Failed to set SSH status",
    telnetStatus: "Telnet Status",
    telnetStatusSetSuccessed: "Telnet status set successfully",
    telnetStatusSetError: "Telnet status setting failed",
    importConfig: "Import Configuration",
    import: "import",
    exportConfig: "Export Configuration",
    export: "Export",
    STARTUP_CONFIG: "Startup Configuration",
    RUNNING_CONFIG: "Running Configuration",
    localExport: "Export to local",
    upgradeMethod: "Upgrade Method",
    localUpgrade: "Local Upgrade",
  },
  port: {
    clearSuccess: "Clear successfully",
    clearFailed: "Clear failed",
    flowDetailTitles: {
      send: "Send",
      length: "Send Length Statistics",
      qos: "Send Queue Statistics",
    },
    portStatTitle: "Traffic Statistics: Port {port}",
    potName: "Port",
    linkStat: "Link Status",
    speed: "speed",
    duplex: "full duplex",
    flow: "flow control",
    port: "port",
    type: "Type",
    bandwith_value: "Receive Rate",
    manage_state: "Manage state",
    auto_speed: "Auto Negotiation",
    alias: "alias",
    bcast_value: "Broadcast message",
    mcast_value: "Multicast message",
    ucast_value: "Unicast message",
    isolatedGroup: "Isolated group ID: {group}",
    selectPort: "Select Port",
    customThead: "Custom Header",
    send: "Send",
    recv: "Receive",
    bytes: "Number of bytes",
    packs: "Number of packs",
    ucast: "Number of Unicast Packets",
    mcast: "Number of multicast packets",
    bcast: "Number of broadcast packets",
    drops: "Number of dropped packets",
    crc: "CRC packet number",
    pause: "Flow Control Frames",
    enable: "Enable",
  },
  vlan: {
    addFailed: "add VLAN failed",
    allowedVlanError:
      "The allowed VLAN configuration must meet the rules of xx-xx,xx-xx, or pure numbers greater than 0",
    linkMode: "Link Mode",
    ACCESS: "Access",
    TRUNK: "Trunk",
    HYBRID: "Hybrid",
    deleteVlan: "Delete VLAN",
    addVlan: "Add VLAN",
    vlanId: "VLAN Id",
    vlanName: "VLAN name",
    deleteVlanTitle: 'Are you sure to delete VLAN "{name}"? ',
    addError: "VLAN name cannot be empty, and VLAN Id must be between 1~4093",
    allowed_vlan: "Allowed VLAN",
    pvidRequired: "PVID is required and must be within the range of 1~4039",
    allowed_tagged: "Allowed Tag VLAN",
    allowed_untaged: "Allowed Untagged VLAN",
    deleteTitle: "Are you sure to delete the selected {count} VLANs?",
    SetErrors: {
      "-1": "Parameter error",
      "-2": "Parameter parsing failed",
      "101": "VLAN does not exist",
      "102": "Cannot select PVID that exists in Tagged Vlan",
      "103": "VLAN cannot exist in both Tagged VLAN and Untagged VLAN",
      "508": "Input error",
    },
  },
  stp: {
    enable: "Enable",
    stpEnable: "STP enable",
    protocol: "protocol version",
    priority: "Bridge Priority",
    hello: "Hello Interval",
    forward_delay: "Forward delay",
    max_age_time: "Maximum time to live",
    mstp_max_jump_time: "Maximum Jump Time",
    Keep: "Transfer keep number",
    edge_port_bpdu_enable: "Edge port BPDU filtering",
    port_err_recovery_enable: "Port Error Recovery",
    port_err_recovery_time: "Port error recovery timeout",
    configIdentifierInfo: "Configuration identification information",
    mstiMapConfig: "MSTI Mapping Configuration",
    config_name: "Configuration Name",
    config_number: "Configuration revision number",
    mstiMapTip: `Note: Please enter a VLAN value between 1-4093. Use half-width symbols ",", and hyphens "-" to separate (M-N, M must be less than N), such as 2, 33, 34-77, Unconfigured VLANs will be mapped to the CIST (default bridge instance).`,
    combinePortConfig: "Aggregate Port Configuration",
    commonPortConfig: "Common Port Configuration",
    auto_path_cost_enable: "Auto Path Cost",
    path_cost: "Path cost",
    port_priority: "Priority",
    manage_edge: "Edge Management",
    auto_edge: "Auto Edge",
    limit_role_enable: "Limit Role",
    limit_tcn_enable: "Limit TCN",
    bpdu_protect: "BPDU protection",
    p2p: "point to point",
    restriction: "Restriction",
    edge: "Edge",
    notEdge: "Not Edge",
    forceP2p: "Force point to point",
    forceShare: "Force Share",
    bridgeId: "Bridge ID",
    root: "root",
    root_port: "Port",
    root_path: "Overhead",
    topo_flag: "topology flag",
    topo_change_time: "Duration after topology change",
    cist_role: "CIST role",
    cist_state: "CIST state",
    runtime: "Runtime",
    send: "Send",
    recv: "Receive",
    discard: "Discard",
    unknown: "Unknown",
    illegal: "illegal",
  },
  lacp: {
    piorptyRequired: "Please enter the system priority",
    systemPriority: "System priority (1-65535)",
    lacpEnable: "LACP enable",
    key: "Key",
    role: "Role",
    timeout: "timeout",

    priority: "Priority",
    custom: "Specify",
    group_id: "Aggregation Group ID",
    pair_id: "Peer Device ID",
    pair_key: "Peer Key",
    pair_priority: "Pair Priority",
    change_time: "Last change time",
    local_interface: "Local Interface",
    pair_port: "Peer port",
    lacp_recv: "LACP Receive",
    lacp_send: "LACP send",
    unknown: "Unknown",
    discard: "Illegal",
  },
  user: {
    username: "Username",
    password: "password",
    deleteUser: "Delete User",
    addUser: "Add User",
    list: "User List",
    showPwd: "Show password",
    hidePwd: "Hide password",
    modifyPwd: "Modify password",
    multiDeleteTitle: "Are you sure to delete the selected {count} users?",
    deleteUserTitle: `Are you sure you want to delete user "{name}"?`,
    deleteUserSuccess: "User deleted successfully!",
    new_password: "New Password",
    confirm_password: "Confirm Password",
    requiredTips: {
      new_password: "The new password cannot be empty",
      confirm_password: "Confirm password cannot be empty",
      password: "Password cannot be empty",
      username: "Username cannot be empty",
    },
    passwordNotSame: "The passwords entered twice are inconsistent",
    pwdMaxMinRule: "Password length must be between 5-20 characters",
    usernameMaxMinRule: "Username length must be between 5-20 characters",
    pwdInvalid: "Please enter the information correctly as required",
    configTitles: {
      reset_pwd: "Change password",
      add_user: "Add user",
    },
    resetPwdSuccess: "Password changed successfully",
    addUserSeccess: "User added successfully",
    account: "Account",
    accountTip: "Please enter account number",
    pwdTip: "Please enter a password",
    forgotPwd: "Forgot your password?",
    loginFailed:
      "Login failed, please check if the username and password are correct",
    loginSuccessed: "Login successful",
    forgotPwdTitile: "Forgot password",
    forgotPwdContent:
      "Please reset the switch and then use the default password to login. ",
    oldPasswordError: "current password is wrong",
    resetPwdFailed: "modify password failed",
    userExisted: "this username is already existed",
    addUserFailed: "add user failed",
  },
  login: "login",
  loginTitle: "Please log in to your account",
  active: "Active",
  passive: "Passive",
  fast: "fast",
  slow: "slow",
  auto: "auto",
  clear: "Clear",
  deleteContent:
    "It cannot be restored after deletion, please operate with caution!",
  refresh: "Refresh",
  autoRefresh: "Auto Refresh",
  edit: "Edit",
  delete: "Delete",
  type: "Type",
  back: "return",
  exportMethod: "Export Method",
  dragUploadTip:
    "Please drag and drop the file here or click the Upload button",
  upload: "upload file",
  reUpload: "Reupload",
  upgrade: "Upgrade",
  ERROR_WITH_CANT_PARSE_JSON: "Execution failed, JSON parsing error",
  ERROR_WITH_NO_ARGS: "Execution failed, parameter parsing error",
  saveSuccess: "Saved successfully!",
  userManagement: "User Management",
  logout: "logout",
  uploadSuccessed: "Uploaded successfully",
  deleteSuccessed: "Deleted successfully",
  uploadFailed: "Upload failed",
};
export default en_US;
