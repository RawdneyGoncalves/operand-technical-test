<template>
  <form @submit.prevent="handleSubmit">
    <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
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
    };
  },
  methods: {
    handleSubmit() {
      if (this.isLogin) {
        this.$store.dispatch('login', { email: this.email, password: this.password });
      } else {
        this.$store.dispatch('register', { email: this.email, password: this.password });
      }
    },
    toggleForm() {
      this.$emit('toggle');
    },
  },
});
</script>

<style scoped>
form {
  max-width: 300px;
  margin: 50px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
}

button:hover {
  background-color: #e03450;
}

p {
  text-align: center;
  cursor: pointer;
  color: #007a87;
  margin-top: 1rem;
}
</style>
