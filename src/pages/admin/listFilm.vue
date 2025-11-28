<template>
  <div class="  bg-[#14181c]  w-full ">
    
    <div class="grid gap-2 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div
        v-for="film in films"
        :key="film._id"
        class=" overflow-hidden transition-shadow duration-300 flex flex-col ">


        <router-link :to="`/detailedMovie/${film._id}`">

          <div  class="relative w-fit mx-auto"> 
            <img 
              :src="film.image || '/default-image.webp'"
              :alt="film.title"
              class="object-cover w-40 h-60  transform transition duration-300 hover:scale-120 flex justify-center mx-auto">

             <button>
                <svg xmlns="http://www.w3.org/2000/svg" 

                  class="absolute top-1 right-1 text-white size-8 flex items-center justify-center hover:cursor-pointe"
                  
                  width="24" 
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
             </button>
          </div>

            
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";


import { useUserStore } from "@/stores/user";

const films = ref([]);

const favoritesMovieHome = ref([])

const userStore = useUserStore()
const userData = computed(() => userStore.user || {});




onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/films/modelFilm");
    films.value = response.data;

    const responseFilmFavorite = await axios.get(
      `http://localhost:3000/users/${userData.value._id}/favorites`      
    );

    favoritesMovieHome.value = responseFilmFavorite.data.favorites || [];
     console.log('Filmes favoritos são:', favoritesMovieHome)

  } catch (error) {
    console.error("Erro ao carregar filmes:", error);
  }
});






</script>