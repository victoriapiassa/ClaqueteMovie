
//

import { createRouter, createWebHistory } from 'vue-router';

import login from '../pages/login.vue';
import home from '../pages/home.vue';
import register from '../pages/register.vue';
import Admin from '@/pages/admin/registerFilm.vue';
import loginAdmin from '@/pages/admin/loginAdmin.vue';

import AreaAdmin from '@/pages/admin/areaAdmin.vue';


const routes = [           

  { path: '/', component: home},
  { path: '/login', component: login },
  { path: '/register', component: register},
  { path: '/home/:id', component: home},
  { path: '/registerFilm', component: Admin},
  { path: '/loginAdmin', component: loginAdmin},
  { path: '/areaAdmin', component : AreaAdmin}
  
]

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router; 