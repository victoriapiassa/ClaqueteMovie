<script>

import item from '../components/item.vue'

export default {
    name:'home',
    components: {
        item
    }
}
</script>


<template>
    <div class="flex justify-center bg-gray-500 text-white px-8 py-4"> 
        <main class= "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-4 w-full max-w-7xl px-10 text-center">
            <item/>
            <item/>
            <item/> 
            <item/>
            <item/>
            <item/>   
            <item/>
            <item/> 
            <item/> 
            <item/>
        </main>
    </div>

</template>



