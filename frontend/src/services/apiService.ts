import axiosInstance from '../utils/axios';
import Cookies from 'js-cookie';
import { User } from '../store/types';

export const registerUser = async (userData: { email: string; password: string; role: string }): Promise<void> => {
  try {
    await axiosInstance.post('/register', userData);
  } catch (error: any) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });

    if (!response.data.user || !response.data.token) {
      throw new Error('Login response is missing user or token');
    }

    Cookies.set('token', response.data.token); 
    return response.data; 
  } catch (error: any) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error; 
  }
};