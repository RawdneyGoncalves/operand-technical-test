<!-- src/views/Login.vue -->
<template>
  <form @submit.prevent="handleLogin">
    <h2>Login</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <p @click="navigateToRegister">Criar uma conta</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleLogin = async () => {
      await store.dispatch('login', { email: this.email, password: this.password });
      router.push('/dashboard');
    };

    const navigateToRegister = () => {
      router.push('/register');
    };

    return { handleLogin, navigateToRegister };
  },
});
</script>

<style scoped>
</style>
