<template>
    <div class="min-h-screen bg-[#14181c] p-4"> 
      <div class=" h-screen  w-230 p-6  flex md:flex-row gap-6 mx-auto mt-10 bg-white">
        
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
          <div class=" w-70 p-2 h-30 mt-2 border border-black">
            <div class="flex gap-1 justify-between mb-3  "> 
              <div class="flex flex-col items-center cursor-pointer"
               @click="toggleAssistido"> 
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
                assistido ? 'text-green-500' : 'text-black'
              ]" 
                class="icon h-9 w-9 icon-tabler icons-tabler-outline icon-tabler-eye">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                <p class="text-center text-xs"> Assistido </p>
              </div>
              
              <div class="flex flex-col items-center  cursor-pointer"
              @click="toggleFavorito">
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                :class="[
                'icon h-9 w-9 icon-tabler icons-tabler-outline icon-tabler-eye transition-colors duration-200',
                favorito ? 'text-red-500' : 'text-black'
              ]">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                <p class="text-center text-xs"> Favorito </p>
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
               :class="[
                'icon h-9 w-9 icon-tabler icons-tabler-outline icon-tabler-eye transition-colors duration-200',
                verDepois ? 'text-blue-500' : 'text-black'
              ]">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M20.984 12.535a9 9 0 1 0 -8.468 8.45" />
              <path d="M16 19h6" /><path d="M19 16v6" /><path d="M12 7v5l3 3" /></svg>  
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
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "MovieDescription", //define o nome do componente 
  props: ["id"], // 
  data() {
    return {
      movie: {},   // obj que armazena os dados do filme
      rating: 0,  //
      loading: true,
      error: null,
      assistido: false, 
      favorito: false, // Novo estado
      verDepois: false
    }
  },
  methods: { // faz parte de export e executa o metodo 
    setRating(value) {
      this.rating = value
    },
    toggleAssistido() { // metodo 'interruptor' para alternar o estado de assistido
      this.assistido = !this.assistido // inverte o valor booleano
      localStorage.setItem(`assistido_${this.id}`, this.assistido) // salva o estado no localStorage
    },
    toggleFavorito() {
      this.favorito = !this.favorito
      localStorage.setItem(`favorito_${this.id}`, this.favorito)
    },
    toggleverDepois() {
      this.verDepois = !this.verDepois
      localStorage.setItem(`verDepois_${this.id}`, this.verDepois)
    }
  },
  async created() { //roda automaticamente logo depois que o componente é criado na memória (antes de ser exibido na tela)
    try {
      const response = await axios.get(`http://localhost:3000/films/modelFilm/${this.id}`)
      this.movie = response.data //Quando a resposta chega, ele guarda os dados dentro de this.movie, que está no data()

      // recupera o estado salvo do "assistido" quando o componente é carregado
      const salvo = localStorage.getItem(`assistido_${this.id}`)
      if (salvo !== null) {
        this.assistido = salvo === "true"
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