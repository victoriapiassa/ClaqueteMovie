<script>

    export default {
    name:'login',

    }

</script>

<template>
    <div class="flex items-center justify-center bg-gray-500 text-white "> 
        <main class= " flex flex-col items-center w-100 h-50 max-w-7xl px-10 text-center">
            <h1 class="text-2xl  font-bold"> Faça seu Login </h1>
            <form class="flex w-full flex-col gap-2" action="">
                <input type="text" placeholder="Digite seu e-mail" class="w-full rounded-full border border-gray-300 py-2 px-4  mt-4">
                <input type="text" placeholder="Digite sua senha" class="w-full rounded-full border border-gray-300 py-2 px-4 ">
                <button class="w-full py-2 px-4 cursor-pointer rounded-full bg-blue-400"> Login </button>
                <p>Ainda não tem uma conta? <RouterLink to="/register" class="underline font-sans"> Registre-se aqui  </RouterLink>
                </p>
            </form>
        </main>
    </div>
</template>