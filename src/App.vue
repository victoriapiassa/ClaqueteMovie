<script>

import Appheader from './components/Appheader.vue'; // Importando o componente Appheader
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import listFilm from './components/listFilm.vue';
import RegisterFilm from './pages/admin/registerFilm.vue';
import { useRoute } from 'vue-router';  

import AdminHeader from './components/AdminHeader.vue';
import LoginAdmin from './pages/admin/loginAdmin.vue';


axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Configurando a URL base do Axios
axios.defaults.withCredentials = true; //permite que o axios envie cookies com as requisicões de outro domoninio
 
export default {

  components: {
    Appheader,
    AdminHeader,
    listFilm,
    RegisterFilm
    
  },

  setup() {
    const route = useRoute()
    return { route }
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
  
  
  <AdminHeader v-if="route.path === '/loginAdmin'" />
  <Appheader v-else />

  <router-view />

  
</template>  