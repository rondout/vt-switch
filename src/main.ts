import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.variable.min.css";
// import "ant-design-vue/dist/antd.less";
import "@/assets/icon/iconfont.css";
import i18n from "./i18n";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(createPinia()).use(i18n);
// app.use(Antd);

app.mount("#app");
