import axiosInstance from '../utils/axios';
import { User, Task } from '../store/types';


axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await axiosInstance.post('/login', { email, password });
  return response.data; 
};

export const getTasksByUser = async (userId: string): Promise<Task[]> => {
  const response = await axiosInstance.get(`/users/${userId}/tasks`);
  return response.data; 
};


export const createTask = async (task: Task): Promise<Task> => {
  const response = await axiosInstance.post('/tasks', task);
  return response.data; 
};


export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${taskId}`);
};
