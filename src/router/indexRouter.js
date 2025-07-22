
//

import { createRouter, createWebHistory } from 'vue-router';

import login from '../pages/login.vue';
import home from '../pages/home.vue';
import profile from '../pages/profile.vue';


const routes = [           

  { path: '/', component: home},
  { path: '/login', component: login },
  { path: '/home/:id', component: home},
  { path: '/profile', component: profile },

]

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router; 