<script lang="ts" setup>
import portConfigController from "@/controllers/portConfig.controller";
import { Button, Checkbox, message, Switch } from "ant-design-vue";
import { onBeforeUnmount, reactive, watch, watchEffect } from "vue";
import CommonTable from "../common/CommonTable.vue";
import {
  portFlowStatColumns,
  defaultPortFlowThs,
  portFlowStatLocalStorageKey,
  CustomPortFlowThs,
  PortFlowStat,
} from "@/models/portConfig.model";
import { auToRefreshTime, deepClone } from "@/util";
import {
  BaseResponseError,
  Pathnames,
  TableColumns,
} from "@/models/base.model";
import Iconfont from "../layouts/Iconfont.vue";
import router from "@/router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const autoRefreshLocalStorageKey = "port_flow_statistics_auto_refresh";
let timer = null;

const data = reactive({
  autoRefresh: false,
  statistics: [],
  customThOpen: false,
  loading: false,
  customThs: deepClone(defaultPortFlowThs),
});

try {
  const storageCustomThs: CustomPortFlowThs = JSON.parse(
    window.localStorage.getItem(portFlowStatLocalStorageKey)
  );
  if (storageCustomThs.recv instanceof Array) {
    data.customThs = storageCustomThs;
  }
} catch (error) {}

const computedTableColumns = $computed(() => {
  return portFlowStatColumns
    .map((item) => {
      if (item.dataIndex === "send") {
        return {
          ...item,
          children: item.children?.filter((child) => {
            return data.customThs.send?.includes(child.dataIndex);
          }),
        };
      } else if (item.dataIndex === "recv") {
        return {
          ...item,
          children: item.children?.filter((child) => {
            return data.customThs.recv?.includes(child.dataIndex);
          }),
        };
      }
      return item;
    })
    .concat(new TableColumns("", "operation"));
});

const getStatisticList = (setLoading = true) => {
  setLoading && (data.loading = true);
  const result = portConfigController.getPortFlowStatList();
  result
    .then((res) => {
      data.statistics = res.statistics;
    })
    .catch()
    .finally(() => {
      data.loading = false;
    });
  return result;
};

getStatisticList();

const slots = ["port", "send", "operation"];

watch(
  () => data.autoRefresh,
  () => {
    window.localStorage.setItem(
      autoRefreshLocalStorageKey,
      data.autoRefresh.toString()
    );
  }
);

const autoRefreshData = () => {
  if (timer) {
    clearTimeout(timer);
  }
  if (!data.autoRefresh) {
    return;
  }
  timer = setTimeout(() => {
    getStatisticList(false).finally(() => {
      autoRefreshData();
    });
    autoRefreshData;
  }, auToRefreshTime);
};

watchEffect(() => {
  autoRefreshData();
});

onBeforeUnmount(() => {
  //   data.autoRefresh = false;
  timer && clearTimeout(timer);
});

const checkChcked = (type: "send" | "recv", key: string) => {
  if (type === "send") {
    return data.customThs.send?.includes(key);
  } else {
    return data.customThs.recv?.includes(key);
  }
};

const toggleCustomThOpen = () => {
  data.customThOpen = !data.customThOpen;
};

const handleCustomThChange = (
  type: "send" | "recv",
  checked: boolean,
  key: string
) => {
  if (checked) {
    data.customThs[type].push(key);
  } else {
    if (data.customThs[type].length > 1) {
      data.customThs[type] = data.customThs[type].filter(
        (item) => item !== key
      );
    }
  }
  window.localStorage.setItem(
    portFlowStatLocalStorageKey,
    JSON.stringify(data.customThs)
  );
};

const viewDetail = (flow: PortFlowStat) => {
  router.push({
    name: Pathnames.PORT_FLOW_STATISTICS_DETIAIL,
    params: { id: flow.port.toString() },
  });
};

const handleClear = () => {
  portConfigController
    .clearFlowStat()
    .then((res) => {
      if (res.errCode?.trim() === BaseResponseError.SUCCESS) {
        message.success(t("port.clearSuccess"));
        getStatisticList();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      message.success(t("port.clearFailed"));
    });
};
</script>

<template>
  <Box class="flex-btw">
    <Box class="flex-start">
      <!-- <label @click="onSwitch" class="pointer" for="flow-statistics-auto-refresh"> -->
      <span class="title1" style="padding-right: 8px">{{
        $t("autoRefresh")
      }}</span>
      <Switch
        v-model:checked="data.autoRefresh"
        id="flow-statistics-auto-refresh"
        size="small"
      ></Switch>
      <!-- </label> -->
      <Button
        @click="toggleCustomThOpen"
        :style="{ marginLeft: '24px' }"
        type="text"
        class="flex"
      >
        <Iconfont style="line-height: 1" icon="ic_edit"></Iconfont>
        <span>
          {{ $t("port.customThead") }}
        </span>
        <Iconfont
          style="line-height: 1"
          :mr="0"
          :ml="1"
          icon="ic_edit"
        ></Iconfont>
      </Button>
    </Box>
    <Box class="flex-start">
      <Button @click="handleClear">{{ $t("clear") }}</Button>
      <Button
        @click="getStatisticList()"
        :style="{ marginLeft: '16px' }"
        type="primary"
        >{{ $t("refresh") }}</Button
      >
    </Box>
  </Box>
  <div
    :class="{
      'custom-th-container': true,
      'custom-th-opened': data.customThOpen,
    }"
  >
    <div class="custom-th-content">
      <div class="flex-start">
        <div class="title1">{{ $t("port.send") }}</div>
        <Checkbox
          v-for="item of defaultPortFlowThs.send"
          :key="item"
          @change="
            (ev) => handleCustomThChange('send', ev.target.checked, item)
          "
          :checked="checkChcked('send', item)"
          >{{ $t("port." + item.split(".")[1]) }}</Checkbox
        >
      </div>
      <div :style="{ marginTop: '16px' }" class="flex-start">
        <div class="title1">{{ $t("port.recv") }}</div>
        <Checkbox
          v-for="item of defaultPortFlowThs.recv"
          :key="item"
          @change="
            (ev) => handleCustomThChange('recv', ev.target.checked, item)
          "
          :checked="checkChcked('recv', item)"
          >{{ $t("port." + item.split(".")[1]) }}</Checkbox
        >
      </div>
    </div>
  </div>
  <div style="background-color: #fff; position: relative" z-index:1>
    <CommonTable
      :loading="data.loading"
      :slots="slots"
      :columns="computedTableColumns"
      :data-source="data.statistics"
    >
      <template #operation="{ record }">
        <a
          class="flex-start flex-nowrap"
          @click="viewDetail(record as PortFlowStat)"
        >
          <span>
            {{ $t("detailInfo") }}
          </span>
          <Iconfont primary :size="16" icon="ic_arrowright" :mr="0" :ml="0.5" />
        </a>
      </template>
    </CommonTable>
  </div>
</template>

<style scoped lang="scss">
.custom-th-container {
  transition: 0.2s;
  max-height: 0px;
  // overflow: hidden;
  margin-bottom: 24px;
  .custom-th-content {
    overflow: auto;
    padding: 24px;
    max-height: 160px;
    padding-bottom: 0;
  }
  .title1 {
    margin-right: 24px;
  }
}
.custom-th-opened {
  max-height: 160px;
}
</style>
