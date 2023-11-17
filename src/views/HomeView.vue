<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex w-[70vw] h-fit bg-[#121213] rounded-[8px] justify-center py-5">
    </div>
  </div> {{ layout }}
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
const layoutMeta = computed(() => {
  return route.meta
})
const layout = computed(() => {
  console.log(layoutMeta.value)
  return (layoutMeta.value.layout || 'default') + '-layout'
})
</script>
