
//

import { createRouter, createWebHistory } from 'vue-router';

import login from '../pages/login.vue';
import home from '../pages/home.vue';
import profile from '../pages/profile.vue';
import register from '../pages/register.vue';
import Admin from '@/pages/admin/registerFilm.vue';
import loginAdmin from '@/pages/admin/loginAdmin.vue';


const routes = [           

  { path: '/', component: home},
  { path: '/login', component: login },
  { path: '/register', component: register},
  { path: '/home/:id', component: home},
  { path: '/profile', component: profile },
  { path: '/registerFilm', component: Admin},
  { path: '/loginAdmin', component: loginAdmin}
  
]

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router; 