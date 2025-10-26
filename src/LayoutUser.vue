<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar só aparece se o usuário estiver logado -->
    <SidebarUser v-if="isLogged" />

    <!-- Área principal -->
    <div :class="isLogged ? 'ml-64 flex-1' : 'flex-1'">
     
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import SidebarUser from '@/components/sideBarUser.vue'

const userStore = useUserStore()
const isLogged = computed(() => !!userStore.user)
</script>

<style scoped>
/* Opcional: evita quebra de layout */
html, body {
  margin: 0;
  padding: 0;
}
</style>
