<template>

  <div class="flex justify-center items-center bg-blue-200 "> 
    <div class="p-6 border rounded shadow w-full max-w-lg mx-auto bg-red-200">
     <main class="flex flex-col items-center">
       <h2 class="text-2xl font-bold mb-6 text-center">Cadastrar Filme</h2>

      <form @submit.prevent="cadastrarFilme" class="grid gap-4 w-full">
      <!-- Título -->
      <input 
        v-model="title" 
        placeholder="Título" 
        required
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Descrição -->
      <textarea 
        v-model="description" 
        placeholder="Descrição"
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <!-- URL da imagem -->
      <input 
        v-model="image" 
        placeholder="URL da imagem"
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Data de lançamento -->
      <input 
        type="number"
        v-model="year"
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Gênero -->
      <input 
        v-model="genre" 
        placeholder="Gênero"
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Botão -->
      <div class="flex justify-center">
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </div>
    </form>
  </main>
</div>
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
        const res = await axios.post('http://localhost:3000/films/modelFilm', {
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