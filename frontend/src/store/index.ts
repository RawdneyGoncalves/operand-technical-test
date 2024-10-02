
import { createStore } from 'vuex';
import { State, User, Task } from './types';
import { 
  registerUser, 
  loginUser, 
  getTasksByUser, 
  createTask, 
  deleteTask as apiDeleteTask, 
  updateTask as apiUpdateTask 
} from '../services/apiService'; 

const store = createStore<State>({
  state: {
    user: null,
    tasks: [] as Task[],
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
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
    async register({ commit }, { email, password }: { email: string; password: string }) {
      try {
        const user = await registerUser(email, password);
        commit('setUser', user);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
    async login({ commit }, { email, password }: { email: string; password: string }) {
      try {
        const user = await loginUser(email, password);
        commit('setUser', user);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async fetchTasks({ commit }, userId: string) {
      try {
        const tasks = await getTasksByUser(userId);
        commit('setTasks', tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    },
    async addTask({ commit }, taskData: Task) {
      try {
        const task = await createTask(taskData);
        commit('addTask', task);
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    },
    async removeTask({ commit }, taskId: string) {
      try {
        await apiDeleteTask(taskId);
        commit('removeTask', taskId);
      } catch (error) {
        console.error('Failed to remove task:', error);
      }
    },
    async updateTask({ commit }, { taskId, taskData }: { taskId: string; taskData: Task }) {
      try {
        const updatedTask = await apiUpdateTask(taskId, taskData);
        commit('updateTask', updatedTask);
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
  },
});

export default store;