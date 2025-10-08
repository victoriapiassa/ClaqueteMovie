
<script>

  import { useUserStore } from '@/stores/user'
  import api from  '@/axios';

    export default {
    name:'login',
    data() {
    return {
      email: '',
      senha: ''
    }
  },
  
  methods: {
   async handleSubmit() {

      if (!this.email || !this.senha) {
    alert('Por favor, preencha todos os campos.');
    return;
      }
      try {
        const response = await api.post('http://localhost:3000/users/login', {
          email: this.email,
          password: this.senha
        }); 

         if (typeof response.data === 'object') {
          const userStore = useUserStore();
           userStore.setUser(response.data);
           localStorage.setItem('user', JSON.stringify(response.data));
           this.$router.push('/home/:id');
        } else {
          alert(response.data); 
         }

      } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        alert('Erro ao fazer login. Verifique seu e-mail e senha.');
    
     } 
    }
   }
 }

</script>

<template>
    <div class="flex justify-center items-center bg-blue-200 "> 
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