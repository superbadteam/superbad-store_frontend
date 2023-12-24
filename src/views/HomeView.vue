<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex w-full max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <HomePage />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HomePage from '@/components/home/HomePage.vue'
const route = useRoute()
const layoutMeta = computed(() => {
  return route.meta
})

const layout = computed(() => {
  console.log(layoutMeta.value)
  return (layoutMeta.value.layout || 'default') + '-layout'
})
</script>
