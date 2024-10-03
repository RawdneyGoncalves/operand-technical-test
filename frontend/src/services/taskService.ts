import axiosInstance from '../utils/axios';
import { Task } from '../store/types';

export const createNewTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axiosInstance.post('/tasks', task);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar tarefa:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
  } catch (error: any) {
    console.error('Erro ao remover tarefa:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateTask = async (taskId: string, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar tarefa:', error.response ? error.response.data : error.message);
    throw error;
  }
};