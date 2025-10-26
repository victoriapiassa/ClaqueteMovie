<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- SIDEBAR -->
   

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="flex-1 flex flex-col items-center overflow-y-auto p-6">
      <!-- Capa -->
      <div
        class="relative w-full max-w-5xl h-64 rounded-2xl overflow-hidden shadow"
        style="background-image: url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80'); background-size: cover; background-position: center;"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>

        <!-- Informações do usuário -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-center">
          <img
            :src="userPhoto"
            alt="User"
            class="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <h1 class="text-white text-2xl font-bold mt-3">{{ userData.name || 'Usuário Claquete' }}</h1>
          <p class="text-gray-200 text-sm">{{ userData.email || 'usuario@claquete.com' }}</p>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="w-full max-w-5xl bg-white rounded-2xl shadow-md -mt-12 p-8 z-10">
        <!-- Estatísticas -->
        <div class="flex flex-col md:flex-row justify-around text-center mb-8">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ favoriteMovies.length }}</h3>
            <p class="text-gray-500 text-sm">Filmes Favoritos</p>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">12</h3>
            <p class="text-gray-500 text-sm">Avaliações</p>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">8</h3>
            <p class="text-gray-500 text-sm">Listas Criadas</p>
          </div>
        </div>

        <!-- Bio -->
        <div class="text-center mb-8">
          <p class="text-gray-600 max-w-2xl mx-auto">
            {{ userData.bio || 'Amante do cinema, apaixonado por boas histórias e trilhas sonoras. 🎬' }}
          </p>
        </div>

        <!-- Filmes Favoritos -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">🎞️ Meus Filmes</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <div
              v-for="movie in favoriteMovies"
              :key="movie.id"
              class="group relative bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                :src="movie.poster"
                :alt="movie.title"
                class="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-3">
                <p class="text-white text-center text-sm font-medium">{{ movie.title }}</p>
              </div>
            </div>
          </div>
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
/* Animação sutil */
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
