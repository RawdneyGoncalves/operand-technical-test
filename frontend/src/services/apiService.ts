import axiosInstance from '../utils/axios';
import { User, Task } from '../store/types';


export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error; 
  }
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


export const updateTask = async (taskId: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
  return response.data;
};
