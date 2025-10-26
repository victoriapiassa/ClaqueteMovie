import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAdminStore } from '@/stores/admin' // 🧩 Import do store de admin

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

//  Guarda de navegação global
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const adminStore = useAdminStore()

  const isUserLogged = !!userStore.token
  const isAdminLogged = !!adminStore.token

  //  Se admin estiver logado e tentar acessar área de usuário
  if (isAdminLogged && (to.path === '/login' || to.path === '/register')) {
    return next('/admin/homeAdmin')
  }

  // Bloqueia rotas admin se admin não estiver logado
  if (to.meta.requiresAdmin && !isAdminLogged) {
    return next('/loginAdmin')
  }

  //  Bloqueia rotas de usuário comum se não estiver logado (se quiser)
  if (to.meta.requiresAuth && !isUserLogged) {
    return next('/login')
  }

  next()
})

export default router
