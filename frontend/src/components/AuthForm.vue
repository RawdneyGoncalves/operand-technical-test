<template>
  <form @submit.prevent="handleSubmit">
    <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p @click="toggleForm">{{ isLogin ? 'Create an account' : 'Already have an account?' }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
          const user = await this.$store.dispatch('login', { email: this.email, password: this.password });
          alert(`Login successful! Welcome, ${user.email}`);
        } else {
          await this.$store.dispatch('register', { email: this.email, password: this.password });
          alert('Registration successful! You can now login.');
        }
        this.email = '';
        this.password = '';
      } catch (error: any) {
        this.errorMessage = 'Operation failed: ' + error.message;
        alert(this.errorMessage);
      }
    },
    toggleForm() {
      this.$emit('toggle');
    },
  },
});
</script>

<style scoped>
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
