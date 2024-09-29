<template>
  <AuthForm :isLogin="true" @toggle="navigateToRegister" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { AuthForm },
  setup() {
    const router = useRouter();
    const navigateToRegister = () => {
      router.push('/register');
    };
    return { navigateToRegister };
  },
});
</script>

<style scoped>
/* Estilo similar ao AuthForm.vue */
</style>
