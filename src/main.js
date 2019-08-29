import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./filter";
import "./style/reset.scss";
import VueLazyload from "vue-lazyload";
import fastclick from "fastclick";

Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: require('@/assets/default_album.jpg'),
  attempt: 1
});
fastclick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
