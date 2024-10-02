import { createStore } from 'vuex';
import { State, User, Task } from './types';
import { 
  loginUser, 
  getTasksByUser, 
  createTask, 
  deleteTask as apiDeleteTask,
  updateTask
} from '../services/apiService'; 

const store = createStore<State>({
  state: {
    user: null,
    tasks: [] as Task[],
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, { user, token }: { user: User; token: string }) {
      state.user = user;
      state.token = token; 
      localStorage.setItem('token', token); 
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId: string) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
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
        const { user, token } = await loginUser(email, password);
        commit('setUser', { ...user, token });
      } catch (error: any) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async createNewTask({ commit, dispatch }, task: Task) {
      try {
        const createdTask = await createTask(task);
        commit('addTask', createdTask);
        if (task.userId) {
          await dispatch('fetchTasks', task.userId);
        }
      } catch (error: any) {
        console.error('Failed to create task:', error);
        throw error;
      }
    },
    async deleteTask({ commit }, taskId: string) {
      try {
        await apiDeleteTask(taskId);
        commit('removeTask', taskId);
      } catch (error: any) {
        console.error('Failed to delete task:', error);
        throw error;
      }
    },
    async fetchTasks({ commit }, userId: string) {
      try {
        const tasks = await getTasksByUser(userId);
        commit('setTasks', tasks);
      } catch (error: any) {
        console.error('Failed to fetch tasks:', error);
        throw error;
      }
    },
    async updateTask({ commit }, { taskId, taskData }: { taskId: string; taskData: Partial<Task> }) {
      try {
        const updatedTask = await updateTask(taskId, taskData);
        commit('updateTask', updatedTask);
      } catch (error: any) {
        console.error('Failed to update task:', error);
        throw error;
      }
    },
  },
});

export { store };
