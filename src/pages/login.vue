
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
      if (dadosUsuario && dadosUsuario._id) {

         const userStore = useUserStore(); //Pini store que guarda o usuário
         console.log('Os dados do usuário:',dadosUsuario);

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
    <div class="flex justify-center items-center bg-black/90 "> 
        <main class="p-6 border rounded shadow w-full max-w-lg mx-auto bg-red-200">

            <h1 class=" flex justify-center my-2 text-2xl  font-bold "> Faça seu Login </h1>

            <form  class="flex w-full flex-col gap-4" @submit.prevent="handleSubmit">

                <input  type="text" 
                placeholder="Digite seu e-mail"
                class="p-2 border rounded w-full focus:outline-none focus:ring-2 mt-2 focus:ring-blue-500" v-model="email">

                <input  type="password"
                 placeholder="Digite sua senha"  
                 class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"  v-model="senha">

                <button class=" flex justify-center w-full py-2 px-4 cursor-pointer bg-blue-400"> Login </button>
                
                <div class="flex justify-center text-sm text-gray-700 mt-4"> 
                  <p>Ainda não tem uma conta? <RouterLink to="/register" class="underline font-sans"> Registre-se aqui  </RouterLink>
                  </p>
                </div>
                
            </form>
        </main>
    </div>
</template>