<template>
  <div class="flex min-h-screen">
    <div class="flex flex-col flex-grow">
      <the-header />

      <div class="mb-auto flex">
        <div class="w-full pt-[72px]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '@/components/layouts/TheHeader.vue'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  console.log('default')
})
</script>
