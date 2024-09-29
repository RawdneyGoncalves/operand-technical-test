<template>
  <li class="task-item">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>Status: <span :class="statusClass">{{ task.status }}</span></p>
    <button @click="remove">Remove</button>
  </li>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    statusClass() {
      return {
        'pending': this.task.status === 'pending',
        'in-progress': this.task.status === 'in-progress',
        'completed': this.task.status === 'completed'
      };
    }
  },
  methods: {
    remove() {
      this.$emit('remove', this.task.id);
    },
    update() {
      this.$emit('update', this.task);
    },
  },
};
</script>

<style scoped>
.task-item {
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s;
}

.task-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #ff385c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
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
