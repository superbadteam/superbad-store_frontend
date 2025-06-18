<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: 'w-[280px]',
  },
})
</script>

<template>
  <div :class="`flex flex-col h-[380px] overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${width}`">
    <div class="relative h-[200px] overflow-hidden">
      <LazyImg 
        class-style="h-full w-full object-cover hover:scale-105 transition-transform duration-300" 
        :src="product.imageUrl" 
        :alt="product.name" 
      />
    </div>

    <div class="flex-auto p-4 pt-4"> 
      <h3 class="text-base font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[40px]">
        {{ product.name }}
      </h3>

      <div class="mb-3">
        <span class="text-lg font-bold text-primary-600">
          💲{{ product.minPrice }} - 💲{{product.maxPrice }}
        </span>
      </div>

      <div class="flex items-center justify-between text-sm text-gray-600">
        <div class="flex items-center">
          <i class="ri-star-fill text-yellow-400"></i>
          <span class="ml-1">{{ product.rating.toFixed(1) }}</span>
        </div>
        <div>
          <span>Sold {{ product.sold }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
