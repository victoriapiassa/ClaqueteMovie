import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    setUser(userData) {
      this.user = userData
    },
    clearUser() {
      this.user = null
    },
    loadUser() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
      }
    },
  },
})