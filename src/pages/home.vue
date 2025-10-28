<script>
import listFilm from '@/pages/admin/listFilm.vue';

export default {
    name:'home',
    components: {
        listFilm,
        
    }
}
</script>


<template>
    <div class="flex justify-center text-white "> 
        <main class= "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))]  w-full max-w-7xl  text-center">
            <listFilm/>
            
        </main>
    </div>

</template>



