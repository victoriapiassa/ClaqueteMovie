<template>
  <div class="flex min-h-screen bg-blue-100">
    <!-- Sidebar só aparece se o usuário estiver logado -->
    <SidebarUser v-if="isLogged" />

    <!-- Área principal -->
    <div :class="isLogged ? ' w-full bg-blue-100' : 'w-full bg-blue-100'">
     
      <main class="p-1">
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
