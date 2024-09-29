<template>
  <div class="home">
    <header class="header">
      <h1>Bem-vindo ao Task Manager</h1>
      <p>Gerencie suas tarefas de forma fácil e rápida!</p>
    </header>
    <section class="hero">
      <h2>Organize sua vida</h2>
      <p>Crie, atualize e remova tarefas facilmente.</p>
      <button @click="navigateToTasks">Começar</button>
    </section>
    <section class="task-list-section">
      <h2>Suas Tarefas</h2>
      <TaskList />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from './TaskList.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { TaskList },
  setup() {
    const router = useRouter();
    const navigateToTasks = () => {
      router.push('/tasks'); 
    };
    return { navigateToTasks };
  },
});
</script>

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  color: #333;
}

.header {
  text-align: center;
  background-color: #ff385c;
  color: white;
  padding: 3rem 0;
  border-bottom: 5px solid #e03450;
}

.hero {
  text-align: center;
  margin: 3rem 0;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.hero button {
  background-color: #fff;
  color: #ff385c;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hero button:hover {
  background-color: #f2f2f2;
}

.task-list-section {
  max-width: 600px;
  margin: 50px auto;
  padding: 1rem;
}

h2 {
  text-align: center;
  color: #ff385c;
}
</style>
