<script setup lang="ts">
import { Pathnames } from "@/models/base.model";
import { Button, ConfigProvider } from "ant-design-vue";
import { useRouter } from "vue-router";
const { push } = useRouter();

// const changeTheme = () => ConfigProvider.config({ theme: { primaryColor: "#3f51b5" } })

const handleBackToHome = () => {
  push(Pathnames.MAIN_LAYOUT);
};

// ConfigProvider.config({
//   theme: {
//     primaryColor: "#375d81"
//   },
// })
</script>

<template>
  <h1>404 NOT FOUND</h1>
  <Button @click="handleBackToHome" type="primary">Back To Homepage</Button>
</template>
