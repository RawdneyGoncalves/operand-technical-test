<template>
  <li>
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>Status: {{ task.status }}</p>
    <button @click="remove">Remove</button>
  </li>
</template>

<script>
export default {
  props: ['task'],
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
li {
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 10px;
}
button {
  background-color: #ff385c;
  color: white;
  border: none;
  padding: 5px;
}
</style>
