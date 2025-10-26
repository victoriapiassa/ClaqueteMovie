<template> 

 <aside class="w-64 bg-black text-white flex flex-col p-6 space-y-8">

      <nav class="flex flex-col space-y-4 text-gray-300 font-medium">
        <RouterLink
          to="/"
          class="hover:text-white transition"
          :class="{ 'text-white font-semibold': $route.path === '/' }"
        >
           Home
        </RouterLink>
        <RouterLink
          to="/filmes"
          class="hover:text-white transition"
          :class="{ 'text-white font-semibold': $route.path === '/filmes' }"
        >
          Filmes
        </RouterLink>
        <RouterLink
          to="/profile"
          class="hover:text-white transition"
          :class="{ 'text-white font-semibold': $route.path === '/profile' }"
        >
           Meu Perfil
        </RouterLink>
      </nav>

      <div class="mt-auto text-sm text-gray-500 border-t border-gray-700 pt-4">
        <p>© 2025 Claquete Movie</p>
      </div>
    </aside>
</template>

<script>
export default {
  name: "SidebarUser"
};
</script>