// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import 'animate.css';
import MuseUI from 'muse-ui';
import '@asset/font/iconfont.css';
import 'muse-ui/dist/muse-ui.css';
import '@asset/css/reset.scss';
import 'material-icons/iconfont/material-icons.scss';
import Toast from 'muse-ui-toast';

Vue.use(Toast);
Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.silent = process.env.NODE_ENV !== 'development';

Vue.use(MuseUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
