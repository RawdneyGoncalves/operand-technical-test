import { createStore } from 'vuex';
import { registerUser, loginUser, getTasksByUser, createTask, deleteTask, updateTask } from '../apiService';

const store = createStore({
  state: {
    user: null,
    tasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
  },
  actions: {
    async register({ commit }, { email, password }) {
      const user = await registerUser(email, password);
      commit('setUser', user);
    },
    async login({ commit }, { email, password }) {
      const user = await loginUser(email, password);
      commit('setUser', user);
    },
    async fetchTasks({ commit }, userId) {
      const tasks = await getTasksByUser(userId);
      commit('setTasks', tasks);
    },
    async addTask({ commit }, taskData) {
      const task = await createTask(taskData);
      commit('addTask', task);
    },
    async removeTask({ commit }, taskId) {
      await deleteTask(taskId);
      commit('removeTask', taskId);
    },
    async updateTask({ commit }, { taskId, taskData }) {
      const updatedTask = await updateTask(taskId, taskData);
      commit('updateTask', updatedTask);
    },
  },
});

export default store;
