import axios from 'axios';

const api = axios.create({  //cria uma instancia do axios que pode ser configurada 
  baseURL: import.meta.env.VITE_API_URL // esta variável deve estar no seu .env
  

});

export default api;


//instância(bolo) é um objeto que deriva de uma classe(receita de boloto), 