// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import animate from 'animate.css';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.silent = process.env.NODE_ENV !== 'development';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
