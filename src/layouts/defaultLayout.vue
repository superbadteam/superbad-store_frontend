<template>
  <div class="flex w-full justify-center">
    <NavBar />

    <div class="mb-auto flex h-[calc(100vh-72px)] overflow-y-auto w-full mt-[72px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/layouts/NavBar.vue'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  console.log('default')
})
</script>
