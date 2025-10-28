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
              :key="movie.id"
              class="group relative bg-gray-100 overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                :src="movie.poster"
                :alt="movie.title"
                class="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
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

<script>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

export default {
  name: "ProfilePage",
  setup() {
    const userStore = useUserStore();
    const userData = computed(() => userStore.user || {});
    const userPhoto = computed(
      () => userStore.user?.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    );

    const favoriteMovies = [
      {
        id: 1,
        title: "Oppenheimer",
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2Zt.jpg",
      },
      {
        id: 2,
        title: "Barbie",
        poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      },
      {
        id: 3,
        title: "Duna: Parte 2",
        poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      },
      {
        id: 4,
        title: "Inside Out 2",
        poster: "https://image.tmdb.org/t/p/w500/zu5O8mJ9dW6n4hFzv7b8gRrBtCz.jpg",
      },
    ];

    return { userData, userPhoto, favoriteMovies };
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
div {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
