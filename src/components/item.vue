<template> 
<div class=" rounded-lg shadow-md p-4 h-80 bg-blue-200 text-gray-800">
  <img src="https://th.bing.com/th/id/OIP.NwFkL28B2EyItuJGbypY3wHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3" alt="Álbum Maré Viva">
  <div class="flex flex-col mt-2">
    <h3> Fresno </h3>
    <p> Maré Viva </p>
  <div class="flex justify-center items-center mt-2"> 
   <svg
          v-for="star in 5"
          :key="star"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          class="cursor-pointer transition-transform duration-200"
          :class="star <= rating ? 'text-yellow-400' : 'text-gray-400'"
          @click="setRating(star)"
        >
          <!-- Preenchimento condicional -->
          <path 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            :fill="star <= rating ? 'currentColor' : 'none'"
            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      rating: 0 // nota atual (0 a 5)
    }
  },
  methods: {
    setRating(star) {
      this.rating = star;
    }
  }
}
</script>

<style scoped>
svg:hover {
  transform: scale(1.1);
}
</style>

    
