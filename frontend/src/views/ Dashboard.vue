<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '../components/TaskList.vue';

export default defineComponent({
  components: { TaskList },
});
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #ff385c;
}
</style>
