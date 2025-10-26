<template>
  <header class="shadow-md bg-black text-white">
    <div class="flex mx-auto max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
      
      <!-- Logo -->
      <div>          
        <RouterLink to="/">
          <img class="h-12 border-2 border-white rounded" src="../assets/image/logo_ClaqueteMovie.png" alt="Claquete Movie" />
        </RouterLink>  
      </div>

      <!-- Área do usuário -->
      <div class="flex items-center space-x-4">
        <img src="../assets/image/user-circle-white.svg" alt="User Account" class="h-8 w-8" />

        <!-- Usuário logado -->
        <div v-if="user" class="flex items-center space-x-2">
          <RouterLink to="/profile" class="hover:underline">
            {{ user.name }}
          </RouterLink>
          <button 
            @click="logout" 
            class="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition text-white"
          >
            Sair
          </button>
        </div>

        <!-- Visitante -->
        <div v-else>
          <RouterLink to="/login" class="hover:underline">Fazer Login</RouterLink>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const user = computed(() => userStore.user);

    const logout = () => {
      userStore.logout();
      router.push('/login');
    };

    return { user, logout };
  }
};
</script>

<style scoped>
/* Pequenos ajustes visuais, se quiser */
</style>
