<template>
    <div class="min-h-screen bg-[#14181c] p-4"> 
      <div class=" h-130  w-230 p-6  flex md:flex-row gap-6 mx-auto mt-10 bg-gray-100">
        <!-- Imagem do Filme -->
          <div class="flex-shrink-0">
            <img :src="movie.image" :alt="`Capa do ${movie.title}`" class="w-full md:w-64 object-cover shadow-md">
          </div>    
        <!-- Informações do Filme -->
        <div class="flex-1 flex gap-5">
          <div>
            <h1 class="text-3xl text-black font-bold ">{{ movie.title }}</h1>
            <p class="text-gray-600 mb-1"><strong>Ano:</strong> {{ movie.year }}</p>
            <p class="text-gray-600 mb-1"><strong>Diretor:</strong> {{ movie.director }}</p>
            <p class="text-gray-600 mb-1"><strong>Duração:</strong> {{ movie.duraction }}</p>
            <p class="text-gray-600 mb-4"><strong>Elenco:</strong> {{ movie.cast.join(', ') }}</p>
            <p class="text-gray-700 text-justify">{{ movie.description }}</p>
          </div>
          <!-- Avaliação -->
          <div class=" w-70 p-2 h-30 mt-2 ">
            <div class="flex gap-1 justify-between mb-3  "> 
              <div class="flex flex-col items-center cursor-pointer"
               @click="togglewatched"> 
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    :class="[
                    'icon h-9 w-9 icon-tabler icons-tabler-outline icon-tabler-eye transition-colors duration-200',
                    watched ? 'text-green-500' : 'text-black' ]">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
                  <p class="text-center text-xs"> Assistido </p>
              </div>
              
              <div class="flex flex-col items-center  cursor-pointer"
                @click="toggleFavorites">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    :class="['icon h-9 w-9 icon-tabler icons-tabler-outline icon-tabler-eye transition-colors duration-200',
                    favorites ? 'text-red-500' : 'text-black']">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
                  <p class="text-center text-xs">Favorito</p>
              </div>

              <div class="flex flex-col items-center cursor-pointer"
               @click="toggleverDepois"> 
                 <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" 
                    stroke-width="2" stroke-linecap="round" 
                    stroke-linejoin="round" 
                    :class="[ 'icon h-9 w-9 icon-tabler icons-tabler-outline icon-tabler-eye transition-colors duration-200', verDepois ? 'text-blue-500' : 'text-black']">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M20.984 12.535a9 9 0 1 0 -8.468 8.45" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                      <path d="M12 7v5l3 3" />
                  </svg>  
                <p class="text-center text-xs"> Ver Depois </p>
             </div>
            </div>

            <div class="flex gap-1 justify-center text-yellow-400 cursor-pointer">
              <svg 
                v-for="index in 5" 
                :key="index" 
                @click="setRating(index)"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-8 w-8" 
                :class="{'fill-current': index <= rating}" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comentários -->
    <div>
      
  </div>
</template>

<script>
import axios from "axios"
import { useUserStore} from "@/stores/user.js"

export default {
  name: "MovieDescription", //define o nome do componente 
  props: ["id"], // 
  data() {
    return {
      movie: {},   // obj que armazena os dados do filme
      rating: 0,  //
      loading: true,
      error: null,
      watched: false, 
      favorites: false, // Novo estado
      verDepois: false
    }
  },
  methods: { // faz parte de export e executa o metodo 
    setRating(value) {
      this.rating = value
    },
  async togglewatched() { // metodo 'interruptor' para alternar o estado de assistido
      const userStore = useUserStore();
      const userId = userStore.user
      this.watched = !this.watched // inverte o valor booleano
      localStorage.setItem(`watched_${this.id}`, this.watched); // salva o estado no localStorage
    try {
      await axios.post(`http://localhost:3000/users/watched`, {
        userId: userId,
        movieId: this.id,
        watched: this.watched
      });
       console.log("Estado de assistido atualizado com sucesso!");
    } catch (err) {
       console.error("Erro ao salvar estado de assistido no banco:", err);
  }
},

   async toggleFavorites() {
    const userStore = useUserStore();
    const userId = userStore.user._id;
    this.favorites = !this.favorites;

    try {
      await axios.post(`http://localhost:3000/users/favorites`, {
        userId: userId,
        movieId: this.id,
        favorites: this.favorites
      });
      console.log("Favorito atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar favorito no banco:", err);
    }  
  },  
   async toggleverDepois() {

      const userStore = useUserStore();
      const userId = userStore.user._id;

      this.verDepois = !this.verDepois;
    try {
         await axios.post(`http://localhost:3000/users/verDepois`, {
         userId: userId,
         movieId: this.id,
         verDepois: this.verDepois
      });
        console.log("Filme adicionado na lista de assistir depois!");

      } catch (err) {
        console.error("Erro ao salvar no banco de dados:", err);
      }   
    },
  },
  
 async created() { 
    try {
      const response = await axios.get(`http://localhost:3000/films/modelFilm/${this.id}`)
      this.movie = response.data.film //Quando a resposta chega, ele guarda os dados dentro de this.movie, que está no data()

      // recupera o estado salvo do "assistido" quando o componente é carregado
      const salvo = localStorage.getItem(`watched_${this.id}`);

      const favoritoSalvo = response.data.is_favorited ? true : false

      const verDepoisSalvo = localStorage.getItem(`verDepois_${this.id}`);
      if (salvo !== null) {
        this.watched = salvo === "true";
        this.favorites = favoritoSalvo === "true";
        this.verDepois = verDepoisSalvo === "true";
      }
    } catch (err) {
      this.error = "Erro ao carregar o filme. Tente novamente."
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>