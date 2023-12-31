<script setup>
defineProps({
  routes: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <div class="flex flex-wrap">
    <div v-for="(item, index) in routes" :key="index" class="breadcrumbs-item">
      <i v-if="index !== 0" class="ri-arrow-right-s-line mx-2"></i>
      <RouterLink :class="{ 'text-[#5a4098]': index !== routes.length - 1 }" :to="item.path">{{
        item.name
      }}</RouterLink>
    </div>
  </div>
</template>
