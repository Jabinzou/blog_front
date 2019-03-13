// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import { CreateRouter } from './router';
import createStore from '../store';
import { sync } from 'vuex-router-sync';
import MuseUI from 'muse-ui';
import '@asset/font/iconfont.css';
import 'muse-ui/dist/muse-ui.css';
import '@asset/css/reset.scss';
import '@asset/css/animate.scss';
import Toast from 'muse-ui-toast';

Vue.use(Toast);
Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.silent = process.env.NODE_ENV !== 'development';

Vue.use(MuseUI);
export function createApp () {
  const router = new CreateRouter();
  const store = createStore();
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
}
