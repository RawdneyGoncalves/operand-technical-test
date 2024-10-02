<template>
  <div>
    <h1>Lista de Tarefas</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTaskTitle" placeholder="Título da tarefa" />
      <input v-model="newTaskDescription" placeholder="Descrição da tarefa" />
      <button type="submit">Adicionar Tarefa</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.description }}
        <button @click="deleteTask(task.id)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'; // Importando ref aqui
import { useStore } from 'vuex';
import { Task } from '../store/types';

export default defineComponent({
  setup() {
    const store = useStore();
    const newTaskTitle = ref('');
    const newTaskDescription = ref('');

    const addTask = async () => {
      const task: Task = {
        id: 'generated-id', // Substitua isso por um ID gerado pelo servidor
        title: newTaskTitle.value,
        description: newTaskDescription.value,
        completed: false,
        userId: store.state.user.id, // Certifique-se de que o usuário esteja autenticado
      };
      await store.dispatch('createNewTask', task);
      newTaskTitle.value = '';
      newTaskDescription.value = '';
    };

    const deleteTask = async (taskId: string) => {
      await store.dispatch('deleteTask', taskId);
    };

    return {
      newTaskTitle,
      newTaskDescription,
      addTask,
      deleteTask,
      tasks: store.state.tasks, // Acesse as tarefas do estado
    };
  },
});
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
