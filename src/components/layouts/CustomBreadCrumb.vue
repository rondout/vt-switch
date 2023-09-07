<script lang="ts" setup>
import { pathLabelMap, Pathnames } from "@/models/base.model";
import { Breadcrumb, BreadcrumbItem } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const route = useRoute();
const { t } = useI18n();

const pathItems = $computed(() => {
  const matchedPath = [...route.matched].reverse()[0]?.path;
  if (!matchedPath) {
    return [];
  }
  const paths: Pathnames[] = matchedPath.split("/").map((v, index, arr) => {
    // return arr.reduce;
    let result = "";
    for (let i = 1; i <= index; i++) {
      result += "/" + arr[i];
    }
    return result;
  }) as Pathnames[];
  paths.shift();
  return paths;
});

const parseTitle = (path: string) => {
  try {
    return t(pathLabelMap.get(path as Pathnames));
  } catch (error) {
    return "";
  }
};
</script>

<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="path of pathItems" :key="path">
      <span class="body1">{{ parseTitle(path) }}</span>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<style scoped lang="scss"></style>
