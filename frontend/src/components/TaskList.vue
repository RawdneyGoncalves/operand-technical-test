<template>
  <div class="task-list">
    <h2>Your Tasks</h2>
    <form @submit.prevent="addTask" class="task-form">
      <input v-model="newTaskTitle" placeholder="Task Title" required />
      <input v-model="newTaskDescription" placeholder="Task Description" />
      <button type="submit">Add Task</button>
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

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import TaskItem from './TaskItem.vue';
import { Task } from '../store/types';

const newTaskTitle = ref('');
const newTaskDescription = ref('');
const store = useStore();

const addTask = async () => {
  // Check if user is authenticated
  if (!store.state.user) {
    alert('User not authenticated');
    return;
  }

  const task: Task = {
    id: Date.now().toString(),
    title: newTaskTitle.value,
    description: newTaskDescription.value || '',
    completed: false,
    userId: store.state.user.id,
  };

  try {
    await store.dispatch('createNewTask', task);
    newTaskTitle.value = '';
    newTaskDescription.value = '';
    alert('Task added successfully');
  } catch (error) {
    console.error('Failed to create task:', error);
    alert('Failed to add task');
  }
};

const removeTask = async (taskId: string) => {
  const confirmed = confirm('Are you sure you want to remove this task?');
  if (confirmed) {
    try {
      await store.dispatch('deleteTask', taskId);
      alert('Task removed successfully');
    } catch (error) {
      console.error('Failed to remove task:', error);
      alert('Failed to remove task');
    }
  }
};

const updateTask = async (updatedTask: Task) => {
  const newTitle = prompt('Enter new title:', updatedTask.title);
  if (newTitle) {
    const taskData: Partial<Task> = { ...updatedTask, title: newTitle };
    try {
      await store.dispatch('updateTask', { taskId: updatedTask.id, taskData });
      alert('Task updated successfully');
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task');
    }
  }
};

const tasks = store.state.tasks;
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #ff385c;
  margin-bottom: 1rem;
}

.task-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 12px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e03450;
}

.tasks {
  list-style-type: none;
  padding: 0;
}

.task-item {
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.task-item h3 {
  margin-bottom: 0.5rem;
}

.task-item button {
  background-color: #ff385c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item button:hover {
  background-color: #e03450;
}

.pending {
  color: orange;
}

.in-progress {
  color: blue;
}

.completed {
  color: green;
}
</style>
