<script>

import Appheader from './components/Appheader.vue'; // Importando o componente Appheader
import item from '../src/components/item.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';


axios.defaults.baseURL = import.meta.env.VUE_APP_API_URL; // Configurando a URL base do Axios
axios.defaults.withCredentials = true; //permite que o axios envie cookies com as requisicões de outro domoninio
 
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
</template>  