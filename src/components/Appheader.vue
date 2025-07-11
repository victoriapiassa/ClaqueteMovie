<template>
  <header class="mx-auto flex  max-w-7x1 items-center justify-between px-8 py-4 bg-blue-500 text-white">
      <div>
            <h1> LOGO </h1>
      </div>

      <div class="flex items-center justify-between gap-4">
        <input type="text" placeholder="Search..." />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
      </div>
       <div class="flex items-center p-4">
            <img src="@/assets/image/user-account.svg" alt="User Account" />
            <p> Minha Conta </p>     
      </div>
  </header>
</template>

<script>

export default {
  name: 'Appheader',
  
}

</script>