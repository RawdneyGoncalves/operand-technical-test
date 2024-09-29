<!-- src/views/Dashboard.vue -->
<template>
  <div>
    <h2>Suas Tarefas</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <button @click="removeTask(task.id)">Remover</button>
        <button @click="updateTask(task)">Atualizar</button>
      </li>
    </ul>
    <button @click="addNewTask">Adicionar Nova Tarefa</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    async addNewTask() {
      const newTask = {
        title: 'Nova Tarefa',
        description: 'Descrição da nova tarefa',
        status: 'pending',
      };
      await this.$store.dispatch('addTask', newTask);
    },
    async removeTask(taskId: string) {
      await this.$store.dispatch('removeTask', taskId);
    },
    async updateTask(task: any) {
      // Adicione a lógica de atualização da tarefa
      const updatedTask = { ...task, status: 'completed' }; // Exemplo
      await this.$store.dispatch('updateTask', { taskId: task.id, taskData: updatedTask });
    },
  },
});
</script>

<style scoped>
</style>
