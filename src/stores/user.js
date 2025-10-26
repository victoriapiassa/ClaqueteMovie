import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('user');
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    }
  }
});
