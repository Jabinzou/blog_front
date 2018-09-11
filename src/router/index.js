import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/pages/articles/main')
    },
    {
      path: '/admin/bigbang/main',
      name: 'main',
      component: () => import('@/admin/publish/editor')
    }
  ]
});
