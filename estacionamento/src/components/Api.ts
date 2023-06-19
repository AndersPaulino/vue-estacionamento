import axios from 'axios';

const api = axios.create({
  baseURL: 'http://estacionamento.uniamerica.com.br', // substitua pela URL da sua API
});

export default api;
