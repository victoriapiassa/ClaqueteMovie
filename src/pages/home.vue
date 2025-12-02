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
    <div class="flex justify-center text-white px-4"> 
        <main class="grid gap-4 sm:gap-6
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            w-full max-w-7xl text-center">
            <listFilm/>
        </main>
    </div>

</template>



