import { createStore } from 'vuex';
import axios from './utils/axios'; 

interface User {
  uid: string;
  email: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

const store = createStore({
  state: {
    user: null as User | null,
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
    updateTask(state, updatedTask: Task) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    removeTask(state, taskId: string) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    logout(state) {
      state.user = null;
      state.tasks = [];
    },
  },
  actions: {
    async login({ commit }, payload: { email: string; password: string }) {
      try {
        const response = await axios.post('/api/auth/login', payload);
        commit('setUser', { uid: response.data.uid, email: payload.email });
        localStorage.setItem('token', response.data.token); // Salvar token
        // Redirecionar para o Dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        alert('Login failed!');
      }
    },
    async register({ commit }, payload: { email: string; password: string }) {
      try {
        const response = await axios.post('/api/auth/register', payload);
        commit('setUser', { uid: response.data.uid, email: payload.email });
        localStorage.setItem('token', response.data.token); // Salvar token
        // Redirecionar para o Dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        alert('Registration failed!');
      }
    },
    async fetchTasks({ commit, state }) {
      if (state.user) {
        try {
          const response = await axios.get('/api/tasks', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          commit('setTasks', response.data);
        } catch (error) {
          alert('Failed to fetch tasks!');
        }
      }
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
  },
});

export default store;
