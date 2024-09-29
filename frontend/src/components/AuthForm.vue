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
  max-width: 400px;
  margin: 50px auto;
  padding: 2rem;
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

h2 {
  text-align: center;
  color: #ff385c;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border 0.3s;
}

input:focus {
  border-color: #ff385c;
  outline: none;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e03450;
}

p {
  text-align: center;
  cursor: pointer;
  color: #007a87;
  margin-top: 1rem;
  transition: color 0.3s;
}

p:hover {
  color: #ff385c;
}
</style>
