import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: null,
    adminData: null,
  }),
  actions: {
    login(adminData) {
      this.adminData = adminData
      this.token = adminData.token
      localStorage.setItem('adminToken', this.token)
    },
    logout() {
      this.adminData = null
      this.token = null
      localStorage.removeItem('adminToken')
    },
  },
})