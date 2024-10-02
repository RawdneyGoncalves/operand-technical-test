import axiosInstance from '../utils/axios'; 

export const registerUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/register', { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

export const resetPassword = async (email: string) => {
  const response = await axiosInstance.post('/auth/reset-password', { email });
  return response.data;
};

export const createTask = async (taskData: any) => {
  const response = await axiosInstance.post('/tasks', taskData);
  return response.data;
};

export const getTasksByUser = async (userId: string) => {
  const response = await axiosInstance.get(`/tasks/${userId}`);
  return response.data;
};

export const updateTask = async (taskId: string, taskData: any) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`);
  return response.data;
};
