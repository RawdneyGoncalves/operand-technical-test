<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    <div class="card">
      <button type="button" @click="count++">Count is {{ count }}</button>
      <p>
        Edit <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
const count = ref(0)
</script>

<style scoped>
.hello-world {
  text-align: center;
  margin: 20px 0;
}

.card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #ff385c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e03450;
}
</style>
