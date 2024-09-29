<!-- src/views/Register.vue -->
<template>
  <form @submit.prevent="handleRegister">
    <h2>Criar Conta</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button type="submit">Registrar</button>
    <p @click="navigateToLogin">Já tem uma conta? Faça login</p>
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

    const handleRegister = async () => {
      await store.dispatch('register', { email: this.email, password: this.password });
      router.push('/dashboard');
    };

    const navigateToLogin = () => {
      router.push('/login');
    };

    return { handleRegister, navigateToLogin };
  },
});
</script>

<style scoped>
</style>
