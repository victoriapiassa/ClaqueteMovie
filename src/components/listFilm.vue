<template>
  <div class="min-h-screen bg-gray-100 py-10 px-6">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
      🎬 Lista de Filmes
    </h1>

    <div v-if="films.length === 0" class="text-center text-gray-500 text-lg">
      Nenhum filme encontrado 😔
    </div>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="film in films"
        :key="film._id"
        class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          :src="film.image || '/default-image.webp'"
          :alt="film.title"
          class="w-full h-56 object-cover"
        />
        <div class="p-4 flex flex-col h-full justify-between">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {{ film.title }}
          </h2>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
            {{ film.description }}
          </p>
          <div class="flex justify-between items-center mt-auto">
            <span class="text-gray-800 font-bold">
              {{ film.year }}
            </span>
            <button
              class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const films = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/films/modelFilm");
    films.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar filmes:", error);
  }
});
</script>

<style scoped>
/* Controla o número de linhas no texto da descrição */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>