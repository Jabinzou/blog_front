import Vue from 'vue';
import Router from 'vue-router';
import { getCookie } from '../utils/normal';
import { verifyToken } from '../api/index';

Vue.use(Router);

const router = new Router({
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
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/admin/signin/login')
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  if (to.path === '/admin/bigbang/main') {
    try {
      const res = await verifyToken(getCookie('token'));
      if (res.data.code === 1000) {
        next();
      } else {
        next({
          path: '/login'
        });
      }
    } catch (err) {
      console.log(err);
      next({
        path: '/login'
      });
    }
  } else {
    next();
  }
});
export default router;
