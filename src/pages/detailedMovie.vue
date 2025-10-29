<template>
  <div class="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 flex flex-col md:flex-row gap-6 mx-auto mt-10">
    
    <!-- Imagem do Filme -->
    <div class="flex-shrink-0">
      <img :src="movie.cover" :alt="`Capa do ${movie.title}`" class="rounded-lg w-full md:w-64 object-cover shadow-md">
    </div>
    
    <!-- Informações do Filme -->
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ movie.title }}</h1>
        <p class="text-gray-600 mb-1"><strong>Ano:</strong> {{ movie.year }}</p>
        <p class="text-gray-600 mb-1"><strong>Diretor:</strong> {{ movie.director }}</p>
        <p class="text-gray-600 mb-4"><strong>Elenco:</strong> {{ movie.cast.join(', ') }}</p>
        <p class="text-gray-700">{{ movie.description }}</p>
      </div>

      <!-- Avaliação -->
      <div class="mt-6">
        <p class="font-semibold mb-2">Avalie este filme:</p>
        <div class="flex gap-1 text-yellow-400 cursor-pointer">
          <svg 
            v-for="index in 5" 
            :key="index" 
            @click="setRating(index)"
            xmlns="http://www.w3.org/2000/svg" 
            class="h-8 w-8" 
            :class="{'fill-current': index <= rating}" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "MovieDescription",
  data() {
    return {
      movie: {
        title: "Nome do Filme",
        year: 2025,
        director: "Jane Doe",
        cast: ["Ator 1", "Ator 2", "Ator 3"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        cover: "https://via.placeholder.com/250x350.png?text=Capa+do+Filme"
      },
      rating: 0
    };
  },
  methods: {
    setRating(value) {
      this.rating = value;
    }
  }
};
</script>

<style scoped>
/* Pode adicionar hover ou animações aqui se quiser */
</style>
