<script lang="ts" setup>
import portConfigController from "@/controllers/portConfig.controller";
import { PortFlowStat } from "@/models/portConfig.model";
import { isNull } from "@/util";
import { Button, Col, Row, Spin } from "ant-design-vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import TitleTab from "../common/TitleTab.vue";

const colSpan = { xs: 24, md: 10, xxl: 7 };

const {
  params: { id },
} = useRoute();

const data = reactive({
  detail: {} as PortFlowStat,
  loading: false,
});

const getFlowDetail = () => {
  data.loading = true;
  portConfigController
    .getPortFlowStatList()
    .then((res) => {
      const matchedFlow = res.statistics.find(
        (v) => v.port === parseInt(id as string)
      );
      data.detail = matchedFlow;
      data.loading = false;
    })
    .catch(() => {
      data.loading = false;
    });
};

getFlowDetail();

const handleRefresh = () => {
  getFlowDetail();
};

const handleBack = () => {
  history.back();
};

const items = [
  {
    name: "send",
    keys: [
      "bytes",
      "packs",
      "ucast",
      "mcast",
      "bcast",
      "drops",
      "crc",
      "pause",
    ],
  },
  {
    name: "length",
    keys: [
      "64 Bytes",
      "65~127 Bytes",
      "128~255 Bytes",
      "256~511 Bytes",
      "512~1023 Bytes",
      "1024~1517 Bytes",
      ">= 1519",
    ],
  },
  { name: "qos", keys: ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];

const parseValue = (name: string, key: string) => {
  const result = data.detail[name] && data.detail[name][key];
  if (isNull(result)) {
    return "-";
  }
  return result;
};
</script>

<template>
  <div class="flow-detail-container">
    <Spin :spinning="data.loading"
      ><div class="flex-btw" style="margin-bottom: 16px">
        <p class="title1" style="color: #000">
          {{ $t("port.portStatTitle", { port: data.detail?.port }) }}
        </p>
        <div class="flex">
          <Button @click="handleBack" style="margin-right: 16px">{{
            $t("back")
          }}</Button>
          <Button @click="handleRefresh" type="primary">{{
            $t("refresh")
          }}</Button>
        </div>
      </div>
      <div v-for="item of items" :key="item.name">
        <div class="tab-container">
          <TitleTab :title="'port.flowDetailTitles.' + item.name"></TitleTab>
        </div>
        <div class="row-container">
          <Row :gutter="[36, 36]">
            <Col v-for="key of item.keys" :key="key" v-bind="colSpan">
              <div class="flex-start">
                <p class="title1">
                  {{ item.name === "send" ? $t("port." + key) : key }}
                </p>
                <h2 class="h2">
                  {{ parseValue(item.name, key) }}
                </h2>
              </div>
            </Col>
          </Row>
        </div>
      </div></Spin
    >
  </div>
</template>

<style scoped lang="scss">
.flow-detail-container {
  background-color: #fff;
  height: 100%;
  overflow: auto;
  padding: 16px 24px;
  .tab-container {
    // margin-top: 16px;
    background-color: #009ceb0f;
    padding: 10px 16px;
  }
  .row-container {
    padding: 24px;
    .title1 {
      width: 150px;
    }
  }
}
</style>
