<template>
  <div v-if="!authStore.isLoggedIn">
    <slot></slot>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
</script>
