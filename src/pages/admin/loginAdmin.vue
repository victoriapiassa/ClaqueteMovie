<template>
  <div class="flex justify-center items-center min-h-screen bg-black/90">
    <div class="relative w-full max-w-lg mx-auto shadow-2xl overflow-hidden border-4 border-white bg-black/90 rounded-lg">
      <div
        class="bg-[repeating-linear-gradient(40deg,white,white_20px,black_20px,black_40px)] 
               h-16 flex items-center justify-center text-black font-bold text-lg shadow-md border-b-4 border-white">
      </div>

      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-center text-white">Bem-vindo!</h2>
        
        <form @submit.prevent="handleLogin" class="grid gap-4 w-full">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            autocomplete="username"
            class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            required
            autocomplete="current-password"
            class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="!loading">Entrar</span>
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </button>
        </form>

        <p v-if="erro" class="text-red-600 mt-2 text-center">{{ erro }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // importa a biblioteca axios que é para fazer as requisições HTTP
import { useAdminStore } from "@/stores/admin";

export default {
  name: "loginAdmin",
  data() {
    return {
      email: "",
      password: "",
      erro: "",
      loading: false
    };
  },
  

  /**
   * Methods(método) contem as funções que podem ser chamadas no componente 
   * tratar eventos de clique, enviar formulários, atualizar dados, etc..
   */
  methods: { 

    /**
     * HandleLogin (tratar login) é uma função assíncrona usada para gerenciar o login do admin
     */
    async handleLogin() { 




    /**
     * Foi criado uma váriavel constante para armazenar a função useAdminStore que é a store do admin,
     * 
     */
      const adminStore = useAdminStore(); // guarda os dados do admin na store
      this.loading = true; 
      this.erro = "";



    
    /**
     * Bloco try...catch é usado para lidar com operações assíncronas que podem falhar, como requisições HTTP,
     * 
     * try(tentar) tenta esperar(await) a resposta da requisição POST para o endpoint de login do admin
     * 
     * post é usado para enviar dados ao servidor, neste caso o email e a senha do admin
     * 
     */
      try {
        const response = await axios.post("http://localhost:3000/admin/loginAdmin",
          { email: this.email, 
            password: this.password,
            withCredentials: true },
        );

    /**
     * Após a resposta(response) da requisição, os dados do admin são armazenados na váriavel adminData
     */
        const adminData = response.data; //aqui os dados do admin vindo do back-end
  



    /**
     * o "?" significa evitar erros caso adminData não exista,
     * if(se) verifica se adminData existe e se a propriedade isAdmin é verdadeira
     */
        if (adminData?.isAdmin) { 


    /**
     * adminStore é usado para chamar a action 'login' da store do admin,
     */
          adminStore.login(adminData);  


    /**
     * $router é um objeto que fornece métodos para navegar entre rotas no Vue.js
     */
          this.$router.push("/admin/homeAdmin");

    /** 
     * else(senão) o admin será notificado que o acesso foi negado
     */
        } else {
          this.erro = "Acesso negado. Você não é admin.";
        }

      } catch (err) {
        console.error("Erro no login:", err);
        this.erro = err.response?.data?.message || "Erro no login";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
