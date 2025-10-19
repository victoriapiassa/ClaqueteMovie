
//

import { createRouter, createWebHistory } from 'vue-router';

import login from '../pages/login.vue';
import home from '../pages/home.vue';
import registerUser from '../pages/register.vue';

import loginAdmin from '@/pages/admin/loginAdmin.vue';


// Admin 
import AreaAdmin from '@/pages/admin/areaAdmin.vue';
import listFilm from '@/pages/admin/listFilm.vue';
import registerFilm from '@/pages/admin/registerFilm.vue';



const routes = [           

  { path: '/', component: home},
  { path: '/login', component: login },
  { path: '/register', component: registerUser},
  { path: '/home/:id', component: home},
  { path: '/loginAdmin', component: loginAdmin},
  { path: '/areaAdmin', component : AreaAdmin},

  {
  path: '/admin',
  component: AreaAdmin, // todas as rotas dentro do admin usarão este layout
  children: [
    // { path: 'dashboard', component: Dashboard },
    { path: 'listFilm', component: listFilm },
    { path: 'registerFilm', component: registerFilm },
  ]
}
]



const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router; 