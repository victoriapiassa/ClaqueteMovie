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

                  class=" absolute top-1 right-1  transition duration-500 hover:cursor-pointer size-8 flex items-center justify-center z-20"

                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor">

                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>

                  <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                </svg>
             </button>
          </div>

            
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted } from 'vue'
  import axios from 'axios'


axios.defaults.withCredentials = true


const films = ref([])
const favoritesMovieHome = ref([])

onMounted(async () => {
  try {
    const filmsResponse = await axios.get(
      "http://localhost:3000/films/modelFilm"
    )
    films.value = filmsResponse.data

    const favoritesResponse = await axios.get(
      "http://localhost:3000/users/favorites", //tirei o me que tava dando erro não alterar
        
      { withCredentials: true }
        
    );

    console.log(favoritesResponse); //não ta funcionando

    favoritesMovieHome.value = favoritesResponse.data.favorites || []
    console.log('Filmes favoritos - Função frontend:', favoritesMovieHome.value)

  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
})






</script>