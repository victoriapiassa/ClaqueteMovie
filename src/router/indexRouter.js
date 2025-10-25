
//

import { createRouter, createWebHistory } from 'vue-router';


import login from '../pages/login.vue';
import home from '../pages/home.vue';
import registerUser from '../pages/register.vue';
import { useUserStore } from '@/stores/user'

import loginAdmin from '@/pages/admin/loginAdmin.vue';


// Admin 
import AreaAdmin from '@/pages/admin/areaAdmin.vue';
import listFilm from '@/pages/admin/listFilm.vue';
import registerFilm from '@/pages/admin/registerFilm.vue';
import homeAdmin from '@/pages/admin/homeAdmin.vue';



const routes = [           

  { path: '/', component: home },
  { path: '/login', component: login, meta: { requiresGuest: true } },
  { path: '/register', component: registerUser, meta: { requiresGuest: true }},
  { path: '/home/:id', component: home},
  { path: '/loginAdmin', component: loginAdmin, meta: { requiresGuest: true }},
  { path: '/areaAdmin', component : AreaAdmin},

  { path: '/areaAdmin', 
    component: AreaAdmin, 
    meta: { requiresAdmin: true } 
  },

  {
  path: '/admin',
  component: AreaAdmin, // todas as rotas dentro do admin usarão este layout
  children: [
    // { path: 'dashboard', component: Dashboard },
    { path: 'listFilm', component: listFilm },
    { path: 'registerFilm', component: registerFilm },
    { path: 'homeAdmin', component: homeAdmin},
  ]
 }
]

const router = createRouter({
  history: createWebHistory(), 
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAdminLogged = !!userStore.user

   
   if (to.path === '/loginAdmin' && isAdminLogged) {
         return next('/admin/homeAdmin')

  }

  if (to.path === '/login' && store.isAuthenticated) {
    next('/admin') // redireciona pra área protegida
    return
  }

    next();
  });

export default router; 