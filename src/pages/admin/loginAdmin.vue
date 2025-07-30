<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Login do Admin</h2>
    <form @submit.prevent="handleLogin" class="grid gap-4">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit" class="bg-blue-600 text-white py-2 rounded">Entrar</button>
    </form>
    <p v-if="erro" class="text-red-600 mt-2">{{ erro }}</p>
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
      this.$router.push('/admin/registerFilm');

        } else {
          this.erro = 'Acesso negado. Você não é admin.';
        }

      } catch (err) {
        this.erro = err.response?.data || 'Erro no login';
      }
    }
  }
};
</script>
