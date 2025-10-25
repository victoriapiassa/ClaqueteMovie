import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// Páginas gerais
import login from '../pages/login.vue'
import home from '../pages/home.vue'
import registerUser from '../pages/register.vue'

// Admin
import loginAdmin from '@/pages/admin/loginAdmin.vue'
import AreaAdmin from '@/pages/admin/areaAdmin.vue'
import listFilm from '@/pages/admin/listFilm.vue'
import registerFilm from '@/pages/admin/registerFilm.vue'
import homeAdmin from '@/pages/admin/homeAdmin.vue'

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login, meta: { requiresGuest: true } },
  { path: '/register', component: registerUser, meta: { requiresGuest: true } },
  { path: '/home/:id', component: home },

  // Login do admin
  { path: '/loginAdmin', component: loginAdmin, meta: { requiresGuest: true } },

  // Área admin (rotas protegidas)
  {
    path: '/admin',
    component: AreaAdmin,
    meta: { requiresAdmin: true }, // 🔒 rota protegida
    children: [
      { path: 'listFilm', component: listFilm },
      { path: 'registerFilm', component: registerFilm },
      { path: 'homeAdmin', component: homeAdmin },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guarda de navegação
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const isAdminLogged = !!store.user

  //  Se estiver logado e tentar acessar loginAdmin → redireciona
  if (to.path === '/loginAdmin' && isAdminLogged) {
    return next('/admin/homeAdmin')
  }

  //  Se a rota exigir login e o admin não estiver logado → redireciona pro loginAdmin
  if (to.meta.requiresAdmin && !isAdminLogged) {
    return next('/loginAdmin')
  }

  next()
})

export default router
