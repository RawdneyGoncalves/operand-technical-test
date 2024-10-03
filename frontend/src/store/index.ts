import { createStore } from 'vuex';
import { State, User, Task } from './types';
import { loginUser, registerUser } from '../services/apiService';
import { createNewTask, deleteTask, updateTask } from '../services/taskService';
import axiosInstance from '../utils/axios';
const store = createStore<State>({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    tasks: [],
  },
  mutations: {
    setUser(state, payload: { user: User; token: string }) {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem('token', payload.token);
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId: string) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    updateTask(state, updatedTask: Task) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
  },
  actions: {
    async login({ commit }, { email, password }: { email: string; password: string }) {
      try {
        const response = await loginUser(email, password);
        if (response && response.user && response.token) {
          commit('setUser', { user: response.user, token: response.token });
        } else {
          throw new Error('Login falhou: Resposta inválida do servidor.');
        }
      } catch (error: any) {
        console.error('Erro no login:', error);
        throw error;
      }
    },
    async register({ dispatch }, { email, password }: { email: string; password: string }) {
      try {
        await registerUser({ email, password, role: 'user' });
    
        await dispatch('login', { email, password });
    
      } catch (error: any) {
        console.error('Erro no registro:', error);
        throw error;
      }
    },
    async createNewTask({ commit }, task: Task) {
      try {
        const newTask = await createNewTask(task);
        commit('addTask', newTask);
      } catch (error) {
        console.error('Falha ao criar tarefa:', error);
        throw error;
      }
    },
    async deleteTask({ commit }, taskId: string) {
      try {
        await deleteTask(taskId);
        commit('removeTask', taskId);
      } catch (error) {
        console.error('Falha ao remover tarefa:', error);
        throw error;
      }
    },
    async updateTask({ commit }, { taskId, taskData }: { taskId: string; taskData: Partial<Task> }) {
      try {
        const updatedTask = await updateTask(taskId, taskData);
        commit('updateTask', updatedTask);
      } catch (error) {
        console.error('Falha ao atualizar tarefa:', error);
        throw error;
      }
    },
    async fetchTasks({ commit }) {
      try {
        const response = await axiosInstance.get('/tasks');
        commit('setTasks', response.data);
      } catch (error) {
        console.error('Falha ao buscar tarefas:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getTasks: (state) => state.tasks,
    getUser: (state) => state.user,
  },
});

export default store;