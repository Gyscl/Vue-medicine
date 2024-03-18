import "./assets/css/main.css"; //引入公共样式
import "./assets/css/color-dark.scss"; //引入scss样式
import "./assets/css/icon.css"; //引入图标样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/dist/index.css"; // 引入elementui-plus样式
import { usePermissStore } from "./stores/permiss"; //权限控制相关
import * as echarts from "echarts";  //引入ecahrt

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 全局挂载 echarts
app.config.globalProperties.$echarts = echarts
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 自定义权限指令
const permiss = usePermissStore();
app.directive("permiss", {
  mounted(el, binding) {
    if (!permiss.key.includes(String(binding.value))) {
      el["hidden"] = true;
    }
  },
});

app.mount("#app");
