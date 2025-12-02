
<script>

  import { useUserStore } from '@/stores/user'
  import api from  '@/axios'; //importa a instância do axios configurada
  

  export default {
    name:'login',
    data() {
    return {
      email: '',
      senha: ''
    }
  },
  
  methods: {
    async handleSubmit() {  //formulário de login
  
      if (!this.email || !this.senha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      try {
        const response = await api.post('http://localhost:3000/users/login', {
          email: this.email,
          password: this.senha
        }); 

        const dadosUsuario = response.data;
        const userStore = useUserStore(); //Pinia store que guarda o usuário

      if (dadosUsuario && dadosUsuario._id) {
        
        userStore.setUser(dadosUsuario); //salva o usuário logado na store
        this.$router.push('/home/:id}');        
      };
        

        /* if (typeof response.data === 'object') { // typeof revifica se se a resposta é um obj de string
            const userStore = useUserStore(); //Pinia store que guarda o usuário
            userStore.setUser(response.data); //salva o usuário logado na store
            this.$router.push('/home/:id');
        } else {
          alert(response.data); 

        } */

      } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        alert('Erro ao fazer login. Verifique seu e-mail e senha.');
      } 
    }
  }
}

</script>

<template>
    <div class="min-h-screen flex justify-center items-center bg-black/90  p-4 "> 
        <main class="w-full max-w-md bg-red-200 p-6 rounded-2xl shadow-lg">

          <h1 class=" flex justify-center my-2 text-2xl  font-bold "> Faça seu Login </h1>

            <form  class="flex w-full flex-col gap-4" @submit.prevent="handleSubmit">

              <input  type="text" 
                placeholder="Digite seu e-mail"
                class="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="email">

              <input  type="password"
                 placeholder="Digite sua senha"  
                 class="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"  v-model="senha">

              <button class="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"> Login </button>
                
              <div class="text-center text-sm text-gray-700 mt-2"> 
                  <p>Ainda não tem uma conta? <RouterLink to="/register" class="underline font-sans"> Registre-se aqui  </RouterLink>
                  </p>
              </div>
                
            </form>
        </main>

        <footer class=''>

        </footer>
    </div>
</template>