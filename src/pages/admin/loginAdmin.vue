<template>
  <div class="flex justify-center items-center min-h-screen bg-black/90">
    <!-- Claquete -->
    <div class="relative w-full max-w-lg mx-auto shadow-2xl overflow-hidden border-4 border-white bg-black/90 rounded-lg">
      
      <!-- Parte superior (tampa da claquete) -->
      <div
        class="bg-[repeating-linear-gradient(40deg,white,white_20px,black_20px,black_40px)] 
               h-16 flex items-center justify-center text-black font-bold text-lg shadow-md border-b-4 border-white">
      </div>

      <!-- Corpo principal -->
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 text-center text-white">Bem-vindo!</h2>
        
        <form @submit.prevent="handleLogin" class="grid gap-4 w-full">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            required
            class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
            :disabled="loading"
          >
            <span v-if="!loading">Entrar</span>
            
            <!-- Spinner quando loading -->
            <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </button>
        </form>

        <p v-if="erro" class="text-red-600 mt-2 text-center">{{ erro }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";

export default {
  name: "loginAdmin",
  data() {
    return {
      email: "",
      password: "",
      erro: "",
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      const userStore = useUserStore();
      this.loading = true;

      try {
        const res = await axios.post(
          "http://localhost:3000/admin/loginAdmin",
          { email: this.email, password: this.password },
          { withCredentials: true }
        );

        const adminData = res.data;

        if (adminData.isAdmin) {
          // salva no Pinia
          userStore.setUser(adminData);

          // salva no localStorage
          localStorage.setItem("user", JSON.stringify(adminData));

          // redireciona para a homeAdmin
          this.$router.push("/admin/homeAdmin");
        } else {
          this.erro = "Acesso negado. Você não é admin.";
        }

      } catch (err) {
        console.error("Erro no login:", err);
        this.erro = err.response?.data?.message || "Erro no login";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
