<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Cadastrar novo usuário</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="form.name" type="text" placeholder="Nome" class="w-full mb-3 p-2 border rounded" />
        <input v-model="form.email" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" />
        <input v-model="form.password" type="password" placeholder="Senha" class="w-full mb-3 p-2 border rounded" />
        <button class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/axios';



export default {
  name: 'register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      }
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await api.post('/users', this.form);
        alert('Usuário cadastrado com sucesso!');
        this.$router.push('/login'); // redireciona para login
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        
    
        alert('Erro ao cadastrar. Verifique os dados.');
      }
    }
  }
};
</script>

