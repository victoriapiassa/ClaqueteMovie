// Pinia é uma biblioteca do Vue que armazena dados para serem usados por outros componentes
import { defineStore } from 'pinia';

/**
 * 
 * Store para armazenar dados do usuário um 'mini banco de dados' local
 * 
 */
export const useUserStore = defineStore('user', { 

  /**
   * 
   *State: Estado da store, armazena dados que se alteram rapidamente 
   * Parse: converte a string JSON armazenada no localStorage 
   * getItem: pega o item 'user'
   *  
   */
   state: () => ({ 
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  /**
   * 
   * Actions são métodos que podem alterar o estado da store.
   * 
   * É onde define a função principal que altera o estado.
   * 
   */
  actions: {   
    /**
     * 
     * SetUser (definir usuário) define o usuário na store e no localStorage.
     * Aqui altera o estado user com o valor do parametro 'userData' 
     * 
     */
    setUser(userData) {  

      this.user = userData; // Altera o estado 'user' com o valor do parametro 'userData'

      
      if (userData) {  // Se userData tiver valor 

        //Salvar no localStorage o userData convertido in string
        localStorage.setItem('user', JSON.stringify(userData));

      } else {

        //Se userData for null, remove o item 'user' do localStorage
        localStorage.removeItem('user'); //
      }
    },

    /**
     * 
     * Remove o usuário da store e do localStorage.
     * 
     */
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    }

  },
});

// Uma store é um local central onde você guarda dados que precisam ser acessados por vários componentes diferentes do seu aplicativo.

//defineStore() é do Pinia define o store (dados a serem usados por outros componentes) que no caso é user 
