import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // plugin Vue obrigatório
import vueDevTools from 'vite-plugin-vue-devtools' // plugin de dev tools (opcional)
import tailwindcss from '@tailwindcss/vite' // plugin Tailwind CSS


export default defineConfig({
  plugins: [
    vue(), // plugin Vue primeiro
    vueDevTools(), // plugin de dev tools (opcional)
    tailwindcss(), // plugin Tailwind CSS

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
