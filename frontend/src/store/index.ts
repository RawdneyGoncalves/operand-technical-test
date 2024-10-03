import { createStore } from 'vuex';
import { State, User, Task } from './types';
import { loginUser } from '../services/apiService'; 
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const store = createStore<State>({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    tasks: [] as Task[]
  },
  mutations: {
    setUser(state, { user, token }: { user: User; token: string }) {
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token); 
    },
  },
  actions: {
    async login({ commit }, { email, password }: { email: string; password: string }) {
      try {
        const response = await loginUser(email, password);
        console.log('Login response:', response);
        if (!response || !response.user || !response.token) {
          throw new Error('Login failed: Missing user or token');
        }
        commit('setUser', { user: response?.user, token: response?.token });
        router.push('/create-task');
      } catch (error: any) {
        console.error('Login failed:', error);
        throw error;
      }
    },
  },
});

export { store, router };