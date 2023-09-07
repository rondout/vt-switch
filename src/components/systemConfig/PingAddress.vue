<script lang="ts" setup>
import systemConfigController from "@/controllers/systemConfig.controller";
import { domainRegExp, ipRegExp, isNull } from "@/util";
import { Button, Col, Input, message, Row } from "ant-design-vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
// import { Yup } from "@/util";

const { t } = useI18n();

const data = reactive({
  dest_ipaddr: "",
  pingResult: "",
  loading: false,
});

const handlePing = () => {
  if (isNull(data.dest_ipaddr)) {
    message.error(t("system.destIpRequired"));
    return;
  } else if (
    !ipRegExp.test(data.dest_ipaddr) &&
    !domainRegExp.test(data.dest_ipaddr)
  ) {
    message.error(t("system.destIpInValid"));
    return;
  }
  //   console.log(data.dest_ipaddr);
  data.pingResult = "";
  data.loading = true;
  systemConfigController
    .pingAddr(data.dest_ipaddr)
    .then((res) => {
      // @ts-ignore
      data.pingResult = res.result?.replaceAll("\n", "<br>");
      data.loading = false;
    })
    .catch(() => {
      data.loading = false;
    });
};
// import { Row, Col } from "ant-design-vue";

// const leftColSpan = {
//   xs: { span: 12 },
//   md: { span: 6 },
//   lg: { span: 4 },
// };
</script>

<template>
  <div class="ping-container">
    <div class="flex-start">
      <div class="title1 label">{{ $t("system.pingAddr") }}</div>
      <Input v-model:value="data.dest_ipaddr"></Input>
      <Button :loading="data.loading" @click="handlePing" type="primary"
        >PING</Button
      >
    </div>
    <div style="margin-top: 24px" class="flex-start items-start">
      <div class="title1 label">{{ $t("system.pingResult") }}</div>
      <Row>
        <Col :xs="{ span: 24 }" :md="{ span: 20 }" :lg="{ span: '16' }">
          <div class="info-content title1" v-html="data.pingResult"></div>
        </Col>
      </Row>
    </div>
  </div>
  <!-- <Row :gutter="24">
    <Col v-bind="leftColSpan">left</Col>
    <Col :span="20">right</Col>
  </Row> -->
</template>

<style scoped lang="scss">
.ping-container {
  .label {
    min-width: 64px;
    margin-right: 24px;
  }
  input {
    width: 240px;
    margin-right: 16px;
  }
  .ant-row {
    flex: 1;
  }
  .info-content {
    min-height: 400px;
    max-height: 600px;
    overflow: auto;
    padding: 16px;
    border: 1px solid #00000026;
  }
}
</style>
