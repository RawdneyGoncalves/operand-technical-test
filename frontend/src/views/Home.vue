<template>
  <div class="home">
    <h1>Welcome to Task Manager</h1>
    <div class="links">
      <router-link to="/login" class="link-button">Login</router-link>
      <router-link to="/register" class="link-button">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 5rem 0;
  background-color: #fff;
}

.links {
  margin-top: 2rem;
}

.link-button {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.7rem 1.5rem;
  background-color: #ff385c;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.link-button:hover {
  background-color: #e03450;
}
</style>
