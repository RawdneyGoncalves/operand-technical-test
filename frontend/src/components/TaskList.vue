<template>
  <div class="task-list">
    <h2>Your Tasks</h2>
    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @remove="removeTask"
        @update="updateTask"
      />
    </ul>
    <button @click="addTask">Add Task</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskItem from './TaskItem.vue';

// Definindo a interface Task
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

export default defineComponent({
  components: { TaskItem },
  computed: {
    tasks(): Task[] {
      return this.$store.state.tasks as Task[]; // Cast para Task[]
    },
  },
  methods: {
    removeTask(taskId: string) {
      this.$store.commit('removeTask', taskId);
    },
    updateTask(updatedTask: Task) {
      this.$store.commit('updateTask', updatedTask);
    },
    addTask() {
      const newTask: Task = {
        id: Date.now().toString(), // Gerar ID único
        title: 'New Task',
        description: 'Task description',
        status: 'pending',
        createdAt: new Date(),
      };
      this.$store.commit('addTask', newTask);
    },
  },
});
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #ff385c;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e03450;
}
</style>
