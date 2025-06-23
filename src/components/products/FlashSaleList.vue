<script setup>
import { ref, onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { getRecommendedProducts, searchProductsApi } from '@/services/product.service'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import ProductCard from './ProductCard.vue'

const mySwiper = ref(null)
const products = ref([])

const authStore = useAuthStore()

const onSwiper = (swiper) => {
  mySwiper.value = swiper
}

onBeforeMount(async () => {
  try {
    let res
    if (authStore.state.isLoggedIn) {
      res = await getRecommendedProducts()
      products.value = res.data.products
    } else {
      res = await searchProductsApi()
      products.value = res.data.data
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<template>
  <div class="w-full h-fit bg-[#f9f9f9] rounded-md">
    <!-- Header -->
    <div class="w-full flex justify-between p-4">
      <h2 class="text-xl font-bold">Recommend For You</h2>
      <div class="text-[#5a4098] cursor-pointer">See more</div>
    </div>

    <!-- Product List -->
    <div class="w-full flex p-4 gap-4 relative">
      <!-- Arrow Buttons -->
      <div
        class="absolute z-10 flex justify-center items-center top-[45%] -right-5 w-[50px] h-[50px] cursor-pointer bg-white shadow-md rounded-full"
        @click="mySwiper.slideNext()"
      >
        <i class="ri-arrow-right-s-line text-2xl"></i>
      </div>
      <div
        class="absolute z-10 flex justify-center items-center top-[45%] -left-5 w-[50px] h-[50px] cursor-pointer bg-white shadow-md rounded-full"
        @click="mySwiper.slidePrev()"
      >
        <i class="ri-arrow-left-s-line text-2xl"></i>
      </div>

      <!-- Swiper -->
      <swiper
        style="padding: 0 8px 10px 8px"
        class="w-full pb-2"
        :slides-per-view="'auto'"
        :space-between="10"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="product in products"
          :key="product.id"
          style="width: auto"
          class="w-fit"
        >
          <RouterLink :to="`/products/${product.id}`">
            <ProductCard :product="product" />
          </RouterLink>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
