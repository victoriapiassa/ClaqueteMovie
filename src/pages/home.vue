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
    <div class="flex justify-center bg-white-500 text-white px-8 py-15"> 
        <main class= "grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-3 w-full max-w-7xl px-8 text-center">
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



