<script>
import listFilm from '@/components/listFilm.vue';

export default {
    name:'home',
    components: {
        listFilm,
        
    }
}
</script>


<template>
    <div class="flex justify-center bg-white text-white px-4 py-9"> 
        <main class= "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-3 w-full max-w-7xl px-10 text-center">
            <listFilm/>
            
        </main>
    </div>

</template>



