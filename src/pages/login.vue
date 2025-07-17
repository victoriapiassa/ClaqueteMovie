
<script>

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
          senha: this.senha
        }); 

         if (typeof response.data === 'object') {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.$router.push('/'); // redireciona para home ou área logada
        } else {
          alert(response.data); // mostra erro do backend (ex: "Usuário não encontrado!")
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
    <div class="flex items-center justify-center bg-gray-500 text-white "> 

        <main class= " flex flex-col items-center w-100 h-50 max-w-7xl px-10 text-center">

            <h1 class="text-2xl  font-bold"> Faça seu Login </h1>

            <form  class="flex w-full flex-col gap-2" @submit.prevent="handleSubmit">

                <input type="text" placeholder="Digite seu e-mail" class="w-full rounded-full border border-gray-300 py-2 px-4  mt-4" v-model="email">

                <input  type="password" placeholder="Digite sua senha"  class="w-full rounded-full border border-gray-300 py-2 px-4"  v-model="senha">

                <button class="w-full py-2 px-4 cursor-pointer rounded-full bg-blue-400"> Login </button>

                <p>Ainda não tem uma conta? <RouterLink to="/register" class="underline font-sans"> Registre-se aqui  </RouterLink>
                </p>
                
            </form>
        </main>
    </div>
</template>