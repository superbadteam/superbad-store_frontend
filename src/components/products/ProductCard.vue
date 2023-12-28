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
      <p v-if="product.cost" class="mt-1 font-bold text-lg">${{ product.cost }}</p>
      <p v-if="product?.maxPrice != undefined && product?.minPrice != undefined" class="mt-1 font-bold text-lg">
        ${{ product?.minPrice }} - ${{ product?.maxPrice }}
      </p>
      <!-- <span class="bg-[#fff1f1] text-[#ff5353] text-xs font-bold px-1 py-1">{{ product.discount }}%</span>
      <span class="text-primary-200 text-xs px-1 py-1">$100.00</span> -->
      <div>
        <i class="ri-map-pin-2-fill text-primary-200"></i>
        <span class="ml-2 text-xs text-primary-200">{{ product.location }}</span>
      </div>
      <div class="text-primary-200 text-xs">
        <span>
          <i class="ri-star-fill text-[#ffaa28]"></i>
          <span class="ml-2 mr-1">{{ product.star }}</span>
          <span>|</span>
          <span class="ml-1">sold {{ product.sold }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
