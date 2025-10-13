<script>

import Appheader from './components/Appheader.vue'; // Importando o componente Appheader
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import listFilm from './components/listFilm.vue';
import RegisterFilm from './pages/admin/registerFilm.vue';


axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Configurando a URL base do Axios
axios.defaults.withCredentials = true; //permite que o axios envie cookies com as requisicões de outro domoninio
 
export default {

  components: {
    Appheader,
    listFilm,
    RegisterFilm
    
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
</template>  