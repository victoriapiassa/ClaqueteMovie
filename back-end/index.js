import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import LoginAdmin from '../pages/admin/LoginAdmin.vue'
import HomeAdmin from '../pages/admin/HomeAdmin.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginAdmin },
  {
    path: '/admin',
    component: HomeAdmin,
    meta: { requiresAuth: true }, // 🔒 rota protegida
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  store.loadUser() // garante que o estado do login seja carregado

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/login') // redireciona se não estiver logado
  } else {
    next()
  }
})

export default router