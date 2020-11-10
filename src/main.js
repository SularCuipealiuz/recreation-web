import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import VueI18n from "vue-i18n";
import { languages, defaultLocale } from "@/lang/index";
import VueHolder from "vue-holderjs";
import animated from "animate.css";

Vue.use(animated);
Vue.use(VueI18n);
Vue.use(VueHolder);

Vue.config.productionTip = false;

const messages = Object.assign(languages);

const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: "en",
  messages
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
