<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Cadastrar Filme</h2>
    <form @submit.prevent="cadastrarFilme" class="grid gap-4">
      <input v-model="title" placeholder="Título" required />
      <textarea v-model="description" placeholder="Descrição"></textarea>
      <input v-model="image" placeholder="URL da imagem" />
      <input type="date" v-model="releaseDate" />
      <input v-model="genre" placeholder="Gênero" />
      <button type="submit" class="bg-blue-600 text-white py-2 rounded">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      image: '',
      releaseDate: '',
      genre: ''
    };
  },
  methods: {
    async cadastrarFilme() {
      try {
        const res = await axios.post('http://localhost:3000/films', {
          title: this.title,
          description: this.description,
          image: this.image,
          releaseDate: this.releaseDate,
          genre: this.genre
        });
        alert('Filme cadastrado com sucesso!');
        this.title = this.description = this.image = this.releaseDate = this.genre = '';
      } catch (error) {
        console.error('Erro ao cadastrar filme:', error.response?.data || error.message);
      }
    }
  }
}
</script>