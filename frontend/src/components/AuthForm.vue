<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2>{{ isLogin ? 'Login' : 'Registrar' }}</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Senha" required />
    <BaseButton type="submit">{{ isLogin ? 'Login' : 'Registrar' }}</BaseButton>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p @click="toggleForm" class="toggle-link">
      {{ isLogin ? 'Criar uma conta' : 'Já tem uma conta?' }}
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from './BaseButton.vue';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'AuthForm',
  components: { BaseButton },
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = '';
      try {
        if (this.isLogin) {
          await this.$store.dispatch('login', { email: this.email, password: this.password });
          Swal.fire({
            title: 'Login bem-sucedido!',
            text: `Bem-vindo, ${this.$store.state.user?.email}`,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.$router.push('/dashboard');
          this.email = '';
          this.password = '';
        } else {
          await this.$store.dispatch('register', { email: this.email, password: this.password });
          alert('Registro bem-sucedido! Agora você pode fazer login.');
          this.$router.push('/login');
        }
      } catch (error: any) {
        this.errorMessage = 'Operação falhou: ' + (error.response?.data?.error || error.message);
      }
    },
    toggleForm() {
      this.$emit('toggle');
    },
  },
});
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background-color: var(--color-background);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.auth-form:hover {
  transform: scale(1.02);
}

.auth-form h2 {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.auth-form input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.error {
  color: var(--color-error);
  text-align: center;
  margin-top: 1rem;
}

.toggle-link {
  color: var(--color-primary);
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>
