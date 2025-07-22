import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // esta variável deve estar no seu .env
  

});

export default api;