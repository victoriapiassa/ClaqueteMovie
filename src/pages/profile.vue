<script>

export default {
    name: 'profile'
}


</script>




<template>

<main class="flex flex-col items-center pt-12 bg-gray-500 text-white min-h-screen px-8 py-4" > 


    <div class="flex flex-col bg-white text-gray-800 rounded-lg shadow-lg h-60 p-6 w-200 m-3"> 

        <div class="flex justify-around items-center ">
             <img src="/src/assets/image/R.jpg" alt="Foto de Profile" class="  w-40 h-40 rounded-full "/> 
            <div class="bg-blue-200 w-90 h-40 rounded-lg p-4 flex flex-col justify-between">
                <div class="flex justify-center gap-6 items-center ">
                        <div class="text-center" >
                            <span class="font-bold text-lg">180</span>
                            <p class="text-sm text-gray-500 text-center">Seguidores</p>
                        </div>
                        <div class="text-center">
                            <span class="font-bold text-lg">180</span>
                            <p class="text-sm text-gray-500 text-center">Seguindo</p>
                        </div>
                        <div class="text-center">
                            <span class="font-bold text-lg">180</span>
                            <p class="text-sm text-gray-500 text-center">Albuns Curtidos</p>
                        </div>
                </div>
                <div> 
                    <h1> Victoria Piassa </h1>
                    <p>@victoriapiassa</p>
                </div>
                
            </div>              
        </div>
        
    </div>
    <div class="flex bg-white text-gray-800 rounded-lg shadow-lg h-60 p-6 w-200 m-3">
        <p>Favoritos</p>
    </div>
    <div class="flex bg-white text-gray-800 rounded-lg shadow-lg h-60 p-6 w-200 m-3">
        <p>Atividade recente</p>
    </div>
    
</main>

</template>