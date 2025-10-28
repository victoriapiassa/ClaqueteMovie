<template>
  <div class="  bg-[#14181c]  w-full ">
    
    <div class="grid gap-2 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div
        v-for="film in films"
        :key="film._id"
        class=" overflow-hidden transition-shadow duration-300 flex flex-col "
      >
        <img
          :src="film.image || '/default-image.webp'"
          :alt="film.title"
          class="object-cover w-40 h-60   flex justify-center mx-auto  "
        />
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

<!--   <p class="text-gray-600 text-sm line-clamp-3 mb-2">
            {{ film.description }}
          </p> -->



 <!--
        <div class="p-3 mt-1 text-center flex flex-col flex-1">
          <h2 class="text-base font-semibold text-gray-800 mb-">
            {{ film.title }}
          </h2>
        
          <div class="text-gray-800 font-bold mt-1">
            <span class="text-gray-800 font-bold">
              {{ film.year }}
            </span>
        
      <div class="flex justify-center items-center mx-auto "> 
       <svg
          v-for="star in 5"
          :key="star"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          class="cursor-pointer transition-transform duration-200"
          :class="star <= rating ? 'text-yellow-400' : 'text-gray-400'"
          @click="setRating(star)"
        >
          
          <path 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            :fill="star <= rating ? 'currentColor' : 'none'"
            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          />
        </svg> 
      </div> --> 