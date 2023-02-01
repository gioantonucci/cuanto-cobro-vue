import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueSweetalert2 from 'vue-sweetalert2';

createApp(App).use(router).use(VueSweetalert2).mount("#app");

