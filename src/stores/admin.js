import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {

 /** 
  * State: Armazena o estado da store 
  */
  state: () => ({
    token: null,
    adminData: null,
  }),

  /**
   * 
   * Actions é um método que pode alterar o estado da store
   * 
   */
  actions: {

    /**
     * Login() é uma action usada para logar o admin 
     */
    login(adminData)  {


      this.adminData = adminData // altera adminData para o valor do parametro
      this.token = adminData.token // altera token para o valor do parametro 
      localStorage.setItem('adminToken', this.token) //SetItem(defina usuário)  define o token do admin no localStorage
    },

    
    logout() {

      /**
       * Logout() também é uma action usada para deslogar
       * Em this.adminData e this.token é atribuido o valor null que é ausencia de valor
       * Sendo assim removendo o token do  LocalStorage
       */
      this.adminData = null;
      this.token = null;
      localStorage.removeItem('adminToken');
    },
  },
})