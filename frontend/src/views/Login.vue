<template>
  <div>
    <AuthForm :isLogin="true" @toggle="toggleForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/AuthForm.vue';

export default defineComponent({
  name: 'Login',
  components: { AuthForm },
  methods: {
    toggleForm() {
      this.$router.push('/register');
    },
  },
});
</script>
