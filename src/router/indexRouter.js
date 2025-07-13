

import { createRouter, createWebHistory } from 'vue-router';

import login from '../pages/login.vue';
import home from '../pages/home.vue';

const routes = [           

  { path: '/', component: home},
  { path: '/login', component: login },
  { path: '/home/:id', component: home},
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;