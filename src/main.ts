import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import "reflect-metadata";
import Vue from "vue";
import VueTypeScriptInject from "vue-typescript-inject";
import App from "./App.vue";

class Application {
  private readonly instance: Vue;

  constructor() {
    this.init();

    this.instance = new Vue({
      render: (h) => h(App),
    });
    this.instance.$mount("#app");
  }

  private init(): void {
    Vue.config.productionTip = false;
    Vue.use(BootstrapVue);
    Vue.use(VueTypeScriptInject);
  }
}

export default new Application();
