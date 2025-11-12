import { defineStore } from 'pinia'; // Pinia é uma biblioteca do Vue que armazena dados para serem usados por outros componentes

export const useUserStore = defineStore('user', { 
  state: () => ({ //armazena dados que se alteram rapidamente 
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


// Uma store é um local central onde você guarda dados que precisam ser acessados por vários componentes diferentes do seu aplicativo.

//defineStore() é do Pinia define o store (dados a serem usados por outros componentes) que no caso é user 
