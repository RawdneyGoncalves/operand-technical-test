<template>
  <div class="task-list">
    <h2>Suas Tarefas</h2>
    <form @submit.prevent="addTask" class="task-form">
      <input v-model="newTaskTitle" placeholder="Título da Tarefa" required />
      <input v-model="newTaskDescription" placeholder="Descrição da Tarefa" />
      <button type="submit">Adicionar Tarefa</button>
    </form>
    <ul class="tasks">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @remove="removeTask" @update="updateTask" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';
import { Task } from '../store/types';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'TaskList',
  components: { TaskItem },
  setup() {
    const store = useStore();
    const newTaskTitle = ref('');
    const newTaskDescription = ref('');

    const addTask = async () => {
      if (!store.state.user) {
        Swal.fire({
          icon: 'warning',
          title: 'Atenção!',
          text: 'Usuário não autenticado. Por favor, faça login.',
          background: '#fff',
          color: '#333',
          confirmButtonText: 'OK',
        });
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
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Tarefa adicionada com sucesso!',
          background: '#fff',
          color: '#333',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Falha ao adicionar tarefa:', error);
        alert('Falha ao adicionar tarefa');
      }
    };

    const removeTask = async (taskId: string) => {
      const confirmed = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sim, remova!',
        cancelButtonText: 'Cancelar',
        background: '#fff',
        color: '#333',
      });

      if (confirmed.isConfirmed) {
        try {
          await store.dispatch('deleteTask', taskId);
          Swal.fire('Removido!', 'A tarefa foi removida.', 'success');
        } catch (error) {
          console.error('Falha ao remover tarefa:', error);
          Swal.fire('Erro!', 'Falha ao remover tarefa', 'error');
        }
      }
    };

    const updateTask = async (updatedTask: Task) => {
      const taskData: Partial<Task> = {
        ...updatedTask,
      };

      const newTitle = await Swal.fire({
        title: 'Digite o novo título:',
        input: 'text',
        inputValue: updatedTask.title,
        showCancelButton: true,
        confirmButtonText: 'Atualizar',
        cancelButtonText: 'Cancelar',
        background: '#fff',
        color: '#333',
        inputAttributes: {
          'aria-label': 'Digite o novo título da tarefa',
        },
        customClass: {
          input: 'swal-input',
        },
      }).then((result) => result.value);

      if (newTitle) {
        taskData.title = newTitle;
      }

      const newStatus = await Swal.fire({
        title: 'Selecione o novo status:',
        input: 'select',
        inputOptions: {
          pending: 'Pendente',
          completed: 'Completo',
          'in-progress': 'Em Progresso',
        },
        inputPlaceholder: 'Selecione o status',
        showCancelButton: true,
        background: '#fff',
        color: '#333',
      }).then((result) => result.value);

      if (newStatus) {
        taskData.status = newStatus;
      }

      try {
        await store.dispatch('updateTask', { taskId: updatedTask.id, taskData });
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Tarefa atualizada com sucesso!',
          background: '#fff',
          color: '#333',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Falha ao atualizar tarefa:', error);
        alert('Falha ao atualizar tarefa');
      }
    };

    const tasks = store.getters.getTasks;

    onMounted(() => {
      store.dispatch('fetchTasks');
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.task-list:hover {
  background-color: rgba(255, 255, 255, 0.1);
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

.swal-input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
