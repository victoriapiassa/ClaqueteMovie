<template>
  <div class="flex min-h-screen bg-[#14181c]">
    <!-- CONTEÚDO PRINCIPAL -->
    <main class="flex-1 flex flex-col items-center overflow-y-auto p-6">
      <!-- Capa -->
      <div
        class="relative w-full max-w-5xl h-64 rounded-2xl overflow-hidden shadow">
        <div class="absolute  inset-0 bg-gradient-to-b "></div>






        <!-- Informações do usuário -->
        <div class="absolute  bottom-6 left-8 flex items-center mb-13 gap-4 text-white">
          <img
            :src="userPhoto"
            alt="User"
            class="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
          />
          <div class="flex gap-3">
            <h1 class="text-2xl font-bold">{{ userData.name || 'Usuário Claquete' }}</h1>
            
            <button
              @click="openModal=true"
               class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg"
                width="20" 
                height="20"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round" 
                stroke-linejoin="round">

                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
             </svg>
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

        <!-- DIV DE FILMES FAVORITOS  -->
        <div class="px-1 pb-8 pt-7 bg-[#14181c]">
          <h2 class="font-semibold text-gray-400 mb-4 border-b pb-2">
            Filmes Favoritos
          </h2>



          <!-- DIV DOS CARDS DE FILMES FAVORITADOS PELO USUÁIO -->

          <div class="grid gap-2 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div v-for="movie in favoriteMovies"
              :key="movie._id"
               class="group relative bg-gray-100 overflow-hidden shadow hover:shadow-lg transition">





                <img
                  :src="movie.image"
                  :alt="movie.title"
                  class="w-full h-64 object-cover group-hover:scale-105 transition duration-500"/>
                  
                  



                <!-- BOTÃO DE DELETE -->
                <button 
                  @click="DeleteFilmFavorite(movie._id)"
                  
                  class="bg-gray-900 text-white rounded-full absolute top-1 right-1 opacity-0 group-hover:opacity-60 hover:opacity-100 transition duration-500 hover:cursor-pointer size-8 flex items-center justify-center z-20">
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
                  class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-3">
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

      <div  v-if="openModal"
       class="fixed inset-0 bg-black/60 flex items-center justify-center z-50" >
       <div class="bg-white p-6 rounded-lg w-80">
        <h2 class="text-xl font-semibold mb-4">Editar Perfil</h2>

       <!-- FOTO -->
       <label class="block mb-3 text-black">
          <span>Nova foto:</span>
          <input type="file" @change="handlePhoto" class="mt-1 block w-full" />
       </label>

      <!-- BIO -->
      <label class="block mb-3 text-black">
        <span>Biografia:</span>
        <textarea
          v-model="tempBio"
          class="w-full border p-2 rounded"
        ></textarea>
      </label>

      <div class="flex justify-end gap-2 mt-4">
        <button @click="openModal = false" class="px-3 py-1 bg-gray-300 rounded">
          Cancelar
        </button>

        <button @click="saveChanges" class="px-3 py-1 bg-blue-600 text-white rounded">
          Salvar
        </button>
      </div>
    </div>
  </div>

 </div>
</template>

<script setup>

import { useUserStore } from "@/stores/user";

import axios from "axios";

import { ref, computed, onMounted } from "vue";  



/**
 * UseUserStore() instancia('pegando') o store para  usar neste componente 
 */
const userStore = useUserStore();




/**
 * a const userData(user dados) utiliza os dados do usuário
 * 
 * Computed() cria um valor reativo, que se atualiza sozinho sempre que userStore.user mudar. Caso não tivesse, o valor de userStore.User não mudaria. 
 * 
 * userStore.user() pega o estado atual do user no Pinia. Exemplo: 'se userStore existir, usa ele. Se não existir, ou seja, ser nulo. Use um objeto vazio'
 */
const userData = computed(() => userStore.user || {});


const userPhoto = computed(
  () => userStore.user?.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
);


/**
 * ref é  uma 'caixa' usada quando se quer que o Vue observe um valor e atualize a interface toda vez que esse valor mudar.
 */
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

  async function DeleteFilmFavorite(filmId) {

    
    const userStore = useUserStore();
    const userId = userStore.user._id;


    try {
      
      const response = await axios.delete(`http://localhost:3000/users/favorites/${userId}/${filmId}`, {
      method: 'DELETE'
    });

     const data = response.data

     // Atualiza os dados localmente 
     userStore.user.favorites = data.favorites;
     
      fetchFavorites()

    } catch (error) {
      console.error("Erro ao deletar favoritos:", error);
    } 
  }


const openModal = ref(false); 





// Carrega ao iniciar
onMounted(fetchFavorites);
</script>


