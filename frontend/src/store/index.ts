import { createStore } from 'vuex';
import { State, User, Task } from './types';
import { 
  loginUser, 
  createTask, 
  deleteTask as apiDeleteTask 
} from '../services/apiService'; // Removendo getTasksByUser

const store = createStore<State>({
  state: {
    user: null,
    tasks: [] as Task[],
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
      localStorage.setItem('token', user.token);
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId: string) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
  },
  actions: {
    async login({ commit }, { email, password }: { email: string; password: string }) {
      try {
        const user = await loginUser(email, password);
        commit('setUser', user);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async createNewTask({ commit, dispatch }, task: Task) {
      try {
        const createdTask = await createTask(task);
        commit('addTask', createdTask);
        dispatch('fetchTasks', task.userId); // Você pode precisar ajustar essa chamada
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    },
    async deleteTask({ commit }, taskId: string) { // Removendo dispatch aqui, se não estiver usando
      try {
        await apiDeleteTask(taskId);
        commit('removeTask', taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
  },
});

export { store };
