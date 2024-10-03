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
  padding: 5rem 2rem;
  background-color: var(--color-secondary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.link-button {
  display: inline-block;
  padding: 0.7rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s;
  min-width: 150px;
  text-align: center;
}

.link-button:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 600px) {
  .home {
    padding: 3rem 1rem;
  }

  .link-button {
    min-width: 120px;
    padding: 0.5rem 1rem;
  }
}
</style>
