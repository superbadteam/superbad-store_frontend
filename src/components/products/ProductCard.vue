<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: 'w-[200px]',
  },
})
</script>
<template>
  <div :class="`flex flex-col h-[330px] overflow-hidden product-card-shadow bg-white rounded-xl ${width}`">
    <LazyImg class-style="h-[180px] object-cover w-full" :src="product.imageUrl" alt="" />
    <div class="flex-auto p-3">
      <p class="text-sm font-semibold text-[#363636] truncate-2">{{ product.name }}</p>

      <!-- Price -->
      <p v-if="product.minPrice === product.maxPrice" class="mt-1 text-lg font-bold">
        ${{ product.minPrice?.toFixed(2) }}
      </p>
      <p v-else class="mt-1 text-lg font-bold">
        ${{ product.minPrice?.toFixed(2) }} - ${{ product.maxPrice?.toFixed(2) }}
      </p>

      <!-- Location (optional) -->
      <div v-if="product.location">
        <i class="ri-map-pin-2-fill text-primary-200"></i>
        <span class="ml-2 text-xs text-primary-200">{{ product.location }}</span>
      </div>

      <!-- Rating & Sold -->
      <div class="mt-1 text-xs text-primary-200">
        <i class="ri-star-fill text-[#ffaa28]"></i>
        <span class="ml-2 mr-1">{{ product.rating?.toFixed(1) }}</span>
        <span>|</span>
        <span class="ml-1">sold {{ product.sold }}</span>
      </div>
    </div>
  </div>
</template>
