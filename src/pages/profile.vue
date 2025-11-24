<template>
  <div class="flex min-h-screen bg-[#14181c]">
    <!-- CONTEÚDO PRINCIPAL -->
    <main class="flex-1 flex flex-col items-center overflow-y-auto p-6">
      <!-- Capa -->
      <div
        class="relative w-full max-w-5xl h-64 rounded-2xl overflow-hidden shadow"
      
      >
        <div class="absolute  inset-0 bg-gradient-to-b "></div>

        <!-- Informações do usuário (agora à esquerda) -->
        <div class="absolute  bottom-6 left-8 flex items-center mb-13 gap-4 text-white">
          <img
            :src="userPhoto"
            alt="User"
            class="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <div class="flex gap-3">
            <h1 class="text-2xl font-bold">{{ userData.name || 'Usuário Claquete' }}</h1>
            
            <button
              class=" p-1 text-sm border border-gray-400 rounded hover:bg-white/10 transition"
            >
              Editar Perfil
            </button>
          </div>
          <div class="flex gap-8 ml-90"> 
            <div>
              <p class="text-center"> 10 </p>
              <h1> Filmes </h1>
            </div>
            <div>
              <p class="text-center">5</p>
              <h1>Seguidores</h1>
            </div>
            <div>
              <p class="text-center">8</p>
              <h1>Seguindo</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="w-full max-w-5xl bg-white shadow-md -mt-6 z-10 rounded-b-2xl bg-[#14181c]">
        <!-- Estatísticas -->
        <div class="flex flex-col md:flex-row justify-around text-center p-4 border border border-gray-400  bg-[#14181c]">
          <div>
            <p class="text-gray-400 text-sm">Filmes Avaliados</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm">Opiniões</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm">Listas</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm">Quero Assistir</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm">Favoritos</p>
          </div>
        </div>

        <!-- Filmes Favoritos -->
        <div class="px-1 pb-8 pt-7 bg-[#14181c]">
          <h2 class="font-semibold text-gray-400 mb-4 border-b pb-2">
            Filmes Favoritos
          </h2>


          <div class="grid gap-2 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div
              v-for="movie in favoriteMovies"
              :key="movie._id"
              class="group relative bg-gray-100 overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                :src="movie.image"
                :alt="movie.title"
                class="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              <button class="bg-gray-900 text-white rounded-full absolute top-1 right-1 opacity-0 group-hover:opacity-60 hover:opacity-100 transition duration-500 hover:cursor-pointer size-8 flex items-center justify-center z-20">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor" 
                    stroke-width="2"
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    class="">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
              </button>
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-3"
              >
                <p class="text-white text-center text-sm font-medium">{{ movie.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Comentários -->
        <div class="px-1 pb-8 bg-[#14181c]">
          <h2 class="font-semibold text-gray-400 mb-4 border-b pb-2">Comentários</h2>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>

import { useUserStore } from "@/stores/user";

import axios from "axios";

import { ref, computed, onMounted } from "vue";  

const userStore = useUserStore();
const userData = computed(() => userStore.user || {});
const userPhoto = computed(
  () => userStore.user?.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
);

const favoriteMovies = ref([]);

// Função para buscar  os favoritos no backend e renderizar no profile
const fetchFavorites = async () => {

  /**
   * Se não tiver o id do usuário retorna 
   */
  try {
    if (!userData.value._id) return;
    
    /**
     *  requisição para os favoritos do usuário
     */
    const response = await axios.get(
      `http://localhost:3000/users/${userData.value._id}/favorites`
    );
    
    
    /**
     * O valor de favoriteMovie passa a ser de response
     */

    favoriteMovies.value = response.data.favorites || [];
    
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
  }

};

// Carrega ao iniciar
onMounted(fetchFavorites);
</script>


