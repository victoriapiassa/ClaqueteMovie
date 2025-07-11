 <script> 
    
import Appheader from './components/Appheader.vue' // Importando o componente Appheader

export default {
  components: {
    Appheader
  }
}
 </script>



<template> 
  <Appheader />   

  <div class="flex" >
      
    <nav id="menu"> 
      <ul class="flex-col h-screen w-70 bg-gray-200 p-4">
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Home</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Álbuns</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Artistas</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">Gêneros</a></li>
        <li class="mt-4 m-4"><a href="#" class="text-blue-500">?</a></li>
      </ul>
    </nav>

  <div class="flex m-5 h-100 bg-gray-100" id="div_banner">
    <img class="w-150 " src="./assets/image/banner-principal.jpeg"> 
    <p class="text-3xl text-center m-5 p-25 w-200 ">
      Avalie álbuns, descubra novos ritmos e compartilhe sua paixão por música
    </p>

  </div>
  </div>
    <main>
    </main>
</template>  