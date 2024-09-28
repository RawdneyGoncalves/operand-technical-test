import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Proxy definido no vite.config.ts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar interceptor para incluir token nas requisições
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
