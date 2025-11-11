<script>

import Appheader from './components/Appheader.vue'; // Importando o componente Appheader
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import listFilm from './pages/admin/listFilm.vue';
import RegisterFilm from './pages/admin/registerFilm.vue';
import { useRoute } from 'vue-router';  
import loginAdmin from './pages/admin/loginAdmin.vue';

import AdminHeader from './components/AdminHeader.vue';
import LoginHeader from './components/LoginHeader.vue';
import homeAdmin from './pages/admin/homeAdmin.vue';
import ProfilePage from './pages/profile.vue';
import MovieDescription from '@/pages/detailedMovie.vue';



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
    homeAdmin,
    ProfilePage,
    MovieDescription
    
  },

  setup() { // setup() é uma função do Vue que  permite executar os dados antes do componente renderiza-los
    const route = useRoute() //acessa a informação da rota devolvendo um obj cm infos da rota atual
    return { route }
   },

     /*  mounted() { // mounted() é executado depois que o componente é carregado
      const userStore = useUserStore();
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        userStore.setUser(JSON.parse(savedUser));
    }
  },   */
}
</script>

<template> 
  <LoginHeader v-if="['/loginAdmin', '/register'].includes(route.path)" />
  <AdminHeader v-else-if="route.path.startsWith('/admin') || route.path === '/loginAdmin'" />
  <Appheader v-else />
  <router-view />
</template>