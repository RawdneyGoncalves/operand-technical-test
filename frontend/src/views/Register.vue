<template>
  <div>
    <AuthForm :isLogin="false" @toggle="toggleForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/AuthForm.vue';

export default defineComponent({
  name: 'Register',
  components: { AuthForm },
  methods: {
    toggleForm() {
      this.$router.push('/login');
    },
  },
});
</script>
