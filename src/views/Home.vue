<script setup lang="ts">
import TitleTab from "@/components/common/TitleTab.vue";
import { Col, Row, Spin } from "ant-design-vue";
import { reactive } from "vue";
import homeController from "@/controllers/home.controller";
import { SystemInfo, systemInfoKeys } from "@/models/home.model";

const colSpan = { xs: 24, xxl: 10 };

const data = reactive({
  systemInfo: {} as SystemInfo,
  loading: false,
});

const getSystemInfo = () => {
  data.loading = true;
  homeController
    .getSysInfo()
    .then((res) => {
      data.systemInfo = res;
    })
    .catch()
    .finally(() => {
      data.loading = false;
    });
};

getSystemInfo();
</script>

<template>
  <div class="home-container">
    <div class="tab-container">
      <TitleTab title="home.productInfo"></TitleTab>
    </div>
    <Spin :spinning="data.loading">
      <div class="row-container">
        <Row :gutter="[36, 36]">
          <Col v-for="key of systemInfoKeys" :key="key" v-bind="colSpan">
            <div class="flex-start">
              <p class="title1">{{ $t("home." + key) }}</p>
              <h2 class="h2">{{ data.systemInfo[key] }}</h2>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  background-color: #fff;
  height: 100%;
  padding: 24px;
  overflow: auto;
  .tab-container {
    padding: 12px 16px;
    background-color: #009ceb0f;
  }
  .row-container {
    padding: 24px;
    .title1 {
      width: 150px;
    }
  }
}
</style>
