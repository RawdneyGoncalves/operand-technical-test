<template>
  <div class="register-page">
    <AuthForm :isLogin="false" @toggle="navigateToLogin" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Register',
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
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: var(--color-secondary);
  min-height: 100vh;
}
</style>
