import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Armazena os dados do usuário logado
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // true se estiver logado
  },
  actions: {
    login(userData) {
      this.user = userData
      localStorage.setItem('user', JSON.stringify(userData)) // mantém logado ao recarregar
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    loadUser() {
      const stored = localStorage.getItem('user')
      if (stored) this.user = JSON.parse(stored)
    },
  },
})
