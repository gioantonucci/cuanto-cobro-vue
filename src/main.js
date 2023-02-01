import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';

createApp(App).use(router).use(VueSweetalert2).mount("#app");

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
new Vue({
  el: '#app',
  render: h => h(App)

});