<template>
  <div>
    <div class="flex items-center gap-1">
      <i :class="{ 'text-yellow-500': stars >= 1, 'text-gray-400': stars < 1 }" class="ri-star-fill"></i>
      <i :class="{ 'text-yellow-500': stars >= 2, 'text-gray-400': stars < 2 }" class="ri-star-fill"></i>
      <i :class="{ 'text-yellow-500': stars >= 3, 'text-gray-400': stars < 3 }" class="ri-star-fill"></i>
      <i :class="{ 'text-yellow-500': stars >= 4, 'text-gray-400': stars < 4 }" class="ri-star-fill"></i>
      <i :class="{ 'text-yellow-500': stars >= 5, 'text-gray-400': stars < 5 }" class="ri-star-fill"></i>
      <span class="text-gray-400">(5/5)</span>
    </div>
  </div>
</template>
<script setup>
defineProps({
  stars: {
    type: Number,
    required: true,
    default: 0,
  },
})
</script>
