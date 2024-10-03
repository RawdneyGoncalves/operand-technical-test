import axiosInstance from '../utils/axios';  
import Cookies from 'js-cookie'; 
import { User } from '../store/types';

interface LoginResponse {
  user: User;
  token: string;
}



export const registerUser = async (userData: { email: string; password: string; role: string }): Promise<{ user: User }> => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error: any) {
    console.error('Erro no registro:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });

    if (!response.data.user || !response.data.token) {
      throw new Error('Login response is missing user or token');
    }

    Cookies.set('token', response.data.token); 
    return response.data;
  } catch (error: any) {
    console.error('Erro no login:', error.response ? error.response.data : error.message);
    throw error;
  }
};
