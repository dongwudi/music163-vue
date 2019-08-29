import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./filter";
import "./style/reset.scss";

Vue.config.productionTip = false;

import fastclick from 'fastclick';
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
