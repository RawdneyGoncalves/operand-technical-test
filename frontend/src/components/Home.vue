<!-- src/components/Home.vue -->
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
        router.push('/tasks'); // Altere para a rota que leva à sua lista de tarefas
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
    padding: 2rem 0;
  }
  
  .hero {
    text-align: center;
    margin: 2rem 0;
  }
  
  .hero h2 {
    font-size: 2rem;
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
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
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
  