<template>
  <div class="login-page">
    <AuthForm :isLogin="true" @toggle="navigateToRegister" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/AuthForm.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
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
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: var(--color-secondary);
  min-height: 100vh;
}
</style>
