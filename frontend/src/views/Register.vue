<template>
  <AuthForm :isLogin="false" @toggle="navigateToLogin" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { AuthForm },
  setup() {
    const router = useRouter();
    const navigateToLogin = () => {
      router.push('/login');
    };
    return { navigateToLogin };
  },
});
</script>

<style scoped>
/* Estilo similar ao AuthForm.vue */
</style>
