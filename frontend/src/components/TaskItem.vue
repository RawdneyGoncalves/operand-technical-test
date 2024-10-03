<template>
  <li class="task-item">
    <div class="task-info">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      <p>Status: <span :class="statusClass">{{ task.status }}</span></p>
    </div>
    <div class="task-actions">
      <button @click="update">Atualizar</button>
      <button @click="remove">Remover</button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '../store/types';

export default defineComponent({
  name: 'TaskItem',
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  computed: {
    statusClass() {
      return {
        'pendente': this.task.status === 'pendente',
        'em-progresso': this.task.status === 'em-progresso',
        'concluida': this.task.status === 'concluida',
      };
    },
  },
  methods: {
    remove() {
      this.$emit('remove', this.task.id);
    },
    update() {
      this.$emit('update', this.task);
    },
  },
});
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  background-color: #fff;
}

.task-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.task-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--color-primary);
}

.task-info p {
  margin: 0.25rem 0;
}

.task-actions button {
  margin-left: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-actions button:hover {
  background-color: var(--color-primary-dark);
}

.pendente {
  color: orange;
}

.em-progresso {
  color: blue;
}

.concluida {
  color: green;
}
</style>
