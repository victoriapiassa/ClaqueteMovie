<template>

  <div class="flex justify-center items-center bg-blue-200"> 
    <div class= "p-6 border rounded shadow w-full max-w-lg mx-auto bg-red-200">
      
      <h2 class="text-2xl font-bold mb-4  text-center">Login do Admin</h2>
      <form @submit.prevent="handleLogin" class="grid gap-4  w-full">

          <input v-model="email" 
          type="email" 
          placeholder="Email" required
          class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <input v-model="password"
          type="password"
          placeholder="Senha" required
          class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button type="submit" 
          class="bg-blue-600 text-white py-2 rounded">Entrar</button>

      </form>
      <p v-if="erro" class="text-red-600 mt-2">{{ erro }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'loginAdmin',
  data() {
    return {
      email: '',
      password: '',
      erro: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post('http://localhost:3000/admin/loginAdmin', {
          email: this.email,
          password: this.password
        }, { withCredentials: true });

        const user = res.data;
        if ( user.isAdmin) {
          this.$router.push('/registerFilm');

        } else {
          this.erro = 'Acesso negado. Você não é admin.';
          console.log(this.erro)
        }

      } catch (err) {
        console.error('Erro no login:', err); 
        this.erro = err.response?.data || 'Erro no login';
      }
    }
  }
};
</script>
