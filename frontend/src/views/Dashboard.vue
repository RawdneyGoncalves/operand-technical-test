<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </header>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '../components/TaskList.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Dashboard',
  components: { TaskList },
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleLogout = () => {
      store.dispatch('logout');
      router.push('/login');
    };

    return { handleLogout };
  },
});
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--color-secondary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.dashboard:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}


.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: var(--color-primary-dark);
}
</style>
