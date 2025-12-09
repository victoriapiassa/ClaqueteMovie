<template>

  <div class="flex justify-center items-center  mt-20 "> 
    <div class="p-6  border rounded shadow w-full mx-auto bg-red-200">
     <main class="flex flex-col w-200 items-center">
       <h2 class="text-2xl font-bold mb-6 text-center">Cadastrar Filme</h2>

        <form @submit.prevent="cadastrarFilme" class="grid grid-cols-2 md:grid-cols-2 gap-5 w-full">
          <!-- Título -->
           <input 
            v-model="title" 
            placeholder="Título" 
            required
            class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>

             <!-- URL da imagem -->
             <input 
              v-model="image" 
              placeholder="URL da imagem"
              class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>

             <!-- Data de lançamento -->
             <input 
                type="number"
                v-model="year"
                placeholder="Ano de Lançamento"
                class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <!-- Gênero -->
            <input 
              v-model="genre" 
              placeholder="Gênero"
              class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input 
              v-model="director"
              placeholder="Diretor"
              class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input 
              v-model="cast"
              placeholder="Elenco (separar por vírgula)"
              class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input 
              v-model="duraction"
              placeholder="Duração do Filme"
              class="p-2 border h-10 resize-none rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

             <!-- Descrição -->
            <textarea 
              v-model="description" 
              placeholder="Descrição"
              class="p-2 border  h-32 resize-none rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <!-- Botão -->
            <div class="flex justify-center">
              <button 
                type="submit" 
                class="bg-blue-600 text-white p-2 py-2 h-15  mt-30 ml-80  rounded hover:bg-blue-700 transition">
                Salvar
              </button>
       </div>
     </form>
   </main>
 </div>
</div>

</template>

<script>
import axios from 'axios'; //importa a biblioteca axios para fazer requisições HTTP

export default {
  data() {
    return {
      title: '',
      description: '',
      image: '',
      releaseDate: '',
      genre: ''
    };
  },




  /**
   * Methods(métodos) são funções que podem ser chamadas dentro do componente.
   */
  methods: {
  
  /**
   * CadastrarFilme() é uma função assíncrona que envia os dados do filme para o servidor.
   */
    async cadastrarFilme() {


   /**
     * Try(tentar) tem uma variavel 'res' que aguarda (await) a resposta da requisição 'post' que foi enviado para o servidor 
     */
      try {
        const res = await axios.post('http://localhost:3000/films/modelFilm', {
          title: this.title,
          description: this.description,
          image: this.image,
          releaseDate: this.releaseDate,
          genre: this.genre
        });


        /** 
         * se a requisição der certo será exibido um alerta de sucesso
         */

        alert('Filme cadastrado com sucesso!');

        /**
         * Após o cadastro, os campos do formulário são limpos
         */
        this.title = this.description = this.image = this.releaseDate = this.genre = '';

        //teste
      } catch (error) {
        console.error('Erro ao cadastrar filme:', error.response?.data || error.message);
      }
    }
  }
}
</script>