/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import { GridLayout, GridItem } from "grid-layout-plus";

const app = createApp(App);

const dev = process.env.NODE_ENV !== "production";
axios.defaults.baseURL = dev ? (import.meta.env.VITE_APP_AXIOS_BASE ?? "http://127.0.0.1:8000") : import.meta.env.VITE_APP_AXIOS_BASE ?? "https://unipi.it/";

// // add basic auth axios

// if (!dev) {
//   axios.defaults.auth = {
//     username: import.meta.env.VITE_APP_AXIOS_USERNAME ?? "",
//     password: import.meta.env.VITE_APP_AXIOS_PASSWORD ?? "",
//   };
// }

registerPlugins(app);

app
  .use(VueAxios, axios)
  .component("GridLayout", GridLayout)
  .component("GridItem", GridItem)
  .mount("#app");
