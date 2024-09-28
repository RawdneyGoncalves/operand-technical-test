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
      return this.$store.state.tasks;
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
        id: Date.now().toString(),
        title: 'New Task',
        description: 'Description of the task',
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
  margin: 50px auto;
  padding: 1rem;
}

h2 {
  text-align: center;
  color: #333;
}

ul {
  padding: 0;
}

button {
  background-color: #ff385c;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 1rem auto 0;
  font-size: 1rem;
}

button:hover {
  background-color: #e03450;
}
</style>
