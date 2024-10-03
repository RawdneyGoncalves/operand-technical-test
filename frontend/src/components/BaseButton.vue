<template>
    <button :class="['base-button', variant]" @click="$emit('click')" :disabled="disabled">
      <slot />
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'BaseButton',
    props: {
      variant: {
        type: String as PropType<'primary' | 'secondary'>,
        default: 'primary',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  });
  </script>
  
  <style scoped>
  .base-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    font-size: 1rem;
    color: white;
  }
  
  .base-button:hover {
    transform: scale(1.05);
  }
  
  .primary {
    background-color: var(--color-primary);
  }
  
  .primary:hover {
    background-color: var(--color-primary-dark);
  }
  
  .secondary {
    background-color: #ccc;
    color: #333;
  }
  
  .secondary:hover {
    background-color: #bbb;
  }
  
  button:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  </style>
  