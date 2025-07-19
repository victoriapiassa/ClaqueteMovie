<script>

import Appheader from './components/Appheader.vue'; // Importando o componente Appheader
import item from '../src/components/item.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';


axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL; // Configurando a URL base do Axios
console.log(import.meta.env);
 
export default {

  components: {
    Appheader,
    item,
    
  },

   mounted() {
    const userStore = useUserStore();
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      userStore.setUser(JSON.parse(savedUser));
    }
   },
}
</script>

<template> 
  <Appheader />   
  <router-view/>


   <!--  <div class="flex" >
      
   <nav id="menu"> 
      <ul class="flex-col h-screen w-70 bg-gray-200 p-4">
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Home</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Álbuns</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Artistas</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Gêneros</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">?</a></li>
      </ul>
    </nav>
  </div>
  -->
  
 
</template>  