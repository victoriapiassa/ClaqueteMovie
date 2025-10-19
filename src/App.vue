<script>

import Appheader from './components/Appheader.vue'; // Importando o componente Appheader
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import listFilm from './components/listFilm.vue';
import RegisterFilm from './pages/admin/registerFilm.vue';
import { useRoute } from 'vue-router';  
import loginAdmin from './pages/admin/loginAdmin.vue';

import AdminHeader from './components/AdminHeader.vue';
import LoginHeader from './components/LoginHeader.vue';
import AreaAdmin from './pages/admin/areaAdmin.vue';


axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Configurando a URL base do Axios
axios.defaults.withCredentials = true; //permite que o axios envie cookies com as requisicões de outro domoninio
 
export default {

  components: {
    Appheader,
    AdminHeader,
    LoginHeader,
    listFilm,
    RegisterFilm,
    loginAdmin,
    
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
  <LoginHeader v-if="['/login', '/register'].includes(route.path)" />
  <AdminHeader v-else-if="['/loginAdmin', '/registerFilm', '/areaAdmin'].includes(route.path)" />
  <Appheader v-else />

  <router-view />
</template>