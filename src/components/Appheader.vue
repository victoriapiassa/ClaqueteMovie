<template>
  <header class="shadow-md">
      <div class="flex mx-auto max-w-7x1 items-center justify-between  px-4  py-4 sm:px-8 bg-black text-white">  
          <div>          
                <RouterLink to="/"> <img  class="h-12 border-2 border-white rounded" src="../assets/image/logo_ClaqueteMovie.png" alt=""> </RouterLink>  
          </div>

          <div v-if="user" class="flex items-center p-3">
                <img src="../assets/image/user-circle-white.svg"  alt="User Account" />
                <RouterLink to="/profile" class="ml-2 text-white">  {{ user.name }} </RouterLink>
          <button @click="logout" class="ml-4 px-2 py-1 bg-red-500 rounded text-white">Sair</button>
          </div>
          <div v-else class="flex items-center p-3">
                <img src="../assets/image/user-circle-white.svg"  alt="User Account" />
                <RouterLink to="/login" class="ml-2 text-white"> Fazer Login </RouterLink>
          </div>
        </div>
  </header>
  
</template>

<script>

import { useUserStore } from '@/stores/user';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'Appheader',
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useUserStore, ['setUser']),
    logout() {
    localStorage.removeItem('user');
    this.setUser(null);
    this.$router.push('/login');
   
    },

  }

}

</script>