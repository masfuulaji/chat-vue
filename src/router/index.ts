import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import { checkAuth } from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        middleware: checkAuth  
      },
      component: HomeView
    },
    {
      path: '/chat/:room',
      name: 'chat',
      component: () => import('../views/chat/Chat.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/login/Register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { to, from, next };
    middleware.forEach(fn => fn(context));
  } else {
    next();
  }
});

export default router
