import Router from "@/router/router";
import "@/utils/array-helpers";
import "@/utils/random-helpers";
import "@/utils/string-helpers";
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import _ from "lodash";
import "reflect-metadata";
import Vue from "vue";
import Moment from "vue-moment";
import VueTypeScriptInject from "vue-typescript-inject";
import App from "./App.vue";

class Application {
  private readonly instance: Vue;

  constructor() {
    this.init();

    this.instance = new Vue({
      router: Router,
      render: (h) => h(App),
    });
    this.instance.$mount("#app");
  }

  private init(): void {
    Vue.config.productionTip = false;
    Vue.use(BootstrapVue);
    Vue.use(VueTypeScriptInject);
    Vue.use(Moment);
    Vue.prototype._ = _;
  }
}

export default new Application();
