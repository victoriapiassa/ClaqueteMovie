<template> 

<div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-6">

      <nav class="flex flex-col space-y-3">
        <RouterLink 
          to="/admin/dashboard"
          class="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          active-class="bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
           width="24" height="24"
           viewBox="0 0 24 24" 
           fill="none" stroke="#fcfcfc" 
           stroke-width="2" 
           stroke-linecap="round" 
           stroke-linejoin="round"
           class="icon icon-tabler icons-tabler-outline icon-tabler-chart-histogram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3v18h18" /><path d="M20 18v3" /><path d="M16 16v5" /><path d="M12 13v8" /><path d="M8 16v5" /><path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" /></svg>

           <p> Dashboard </p>

        </RouterLink>

        <RouterLink 
          to="/admin/registerFilm"
          class="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          active-class="bg-gray-700"
        >
        
        <svg xmlns="http://www.w3.org/2000/svg" 

            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#fcfcfc"
            stroke-width="2"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />

        </svg>

            <p> Cadastrar Filme </p>

        </RouterLink>

        <RouterLink 
          to="/admin/listFilm"
          class="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-700 transition"
          active-class="bg-gray-700"
        >
        <svg xmlns="http://www.w3.org/2000/svg"
         width="24" 
         height="24"
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="#fcfcfc"
         stroke-width="2" 
         stroke-linecap="round"
         stroke-linejoin="round" 
        class="icon icon-tabler icons-tabler-outline icon-tabler-movie"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 4l0 16" /><path d="M16 4l0 16" /><path d="M4 8l4 0" /><path d="M4 16l4 0" /><path d="M4 12l16 0" /><path d="M16 8l4 0" /><path d="M16 16l4 0" /></svg>

        <p> Lista de Filmes </p>

        </RouterLink>
      </nav>

      <div class="mt-auto">
        <RouterLink 
          to="/"
          class="block text-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          Sair
        </RouterLink>
      </div>
    </aside><!-- 🔥 Área onde as rotas filhas aparecem -->
    <main class="flex-1 p-10 ml-64">
      <router-view />
    </main>

  </div>

</template>