<template>
  <div class="dashboard">
    <h1>Your Dashboard</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '../components/TaskList.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { TaskList },
});
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
}
</style>
