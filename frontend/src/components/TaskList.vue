<template>
  <div class="task-list">
    <h2>Suas Tarefas</h2>
    <form @submit.prevent="addTask" class="task-form">
      <input v-model="newTaskTitle" placeholder="Título da Tarefa" required />
      <input v-model="newTaskDescription" placeholder="Descrição da Tarefa" />
      <button type="submit">Adicionar Tarefa</button>
    </form>
    <ul class="tasks">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @remove="removeTask"
        @update="updateTask"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';
import { Task } from '../store/types';

export default defineComponent({
  name: 'TaskList',
  components: { TaskItem },
  setup() {
    const store = useStore();
    const newTaskTitle = ref('');
    const newTaskDescription = ref('');

    const addTask = async () => {
      if (!store.state.user) {
        alert('Usuário não autenticado');
        return;
      }

      const task: Task = {
        id: '',
        title: newTaskTitle.value,
        description: newTaskDescription.value || '',
        status: 'pendente',
        userId: store.state.user.id,
      };

      try {
        await store.dispatch('createNewTask', task);
        newTaskTitle.value = '';
        newTaskDescription.value = '';
        alert('Tarefa adicionada com sucesso');
      } catch (error) {
        console.error('Falha ao adicionar tarefa:', error);
        alert('Falha ao adicionar tarefa');
      }
    };

    const removeTask = async (taskId: string) => {
      const confirmed = confirm('Tem certeza de que deseja remover esta tarefa?');
      if (confirmed) {
        try {
          await store.dispatch('deleteTask', taskId);
          alert('Tarefa removida com sucesso');
        } catch (error) {
          console.error('Falha ao remover tarefa:', error);
          alert('Falha ao remover tarefa');
        }
      }
    };

    const updateTask = async (updatedTask: Task) => {
      const newTitle = prompt('Digite o novo título:', updatedTask.title);
      if (newTitle) {
        const taskData: Partial<Task> = { ...updatedTask, title: newTitle };
        try {
          await store.dispatch('updateTask', { taskId: updatedTask.id, taskData });
          alert('Tarefa atualizada com sucesso');
        } catch (error) {
          console.error('Falha ao atualizar tarefa:', error);
          alert('Falha ao atualizar tarefa');
        }
      }
    };

    const tasks = store.getters.getTasks;

    onMounted(() => {
      // Opcional: Buscar tarefas ao montar o componente
      // store.dispatch('fetchTasks');
    });

    return { newTaskTitle, newTaskDescription, addTask, removeTask, updateTask, tasks };
  },
});
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--color-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.task-list h2 {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.task-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-form button {
  padding: 0.75rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-form button:hover {
  background-color: var(--color-primary-dark);
}

.tasks {
  list-style-type: none;
  padding: 0;
}
</style>
