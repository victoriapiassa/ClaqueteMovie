import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/indexRouter.js'
import { useUserStore } from './stores/user'

const app = createApp(App);

const pinia = createPinia()
app.use(pinia)
app.use(router);

// Forçar carregamento do usuário do localStorage
const userStore = useUserStore(pinia);
userStore.user = JSON.parse(localStorage.getItem('user'));

app.mount('#app');
