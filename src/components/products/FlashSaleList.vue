<script setup>
import { ref, onBeforeMount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { searchProductsApi } from '@/services/product.service';
import 'swiper/css'
const mySwiper = ref(null)

const onSwiper = (swiper) => {
  mySwiper.value = swiper
  console.log(swiper)
}
onBeforeMount(async () => {
  try {
    const res = await searchProductsApi()
    products.value = res.data.data
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
})
import ProductCard from './ProductCard.vue'
// render list product have properties: name, cost, image, discount, location, star, sold
const products = ref([
  {
    name: 'Long Product Name 1 You Might Forget the BeginningYou Might Forget the Beginning',
    cost: 29.99,
    image:
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 5,
    location: 'Location 1',
    star: 4.2,
    sold: 50,
  },
  {
    name: 'Very Long Product Name 2 with Many Words',
    cost: 39.99,
    image:
      'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 10,
    location: 'Location 2',
    star: 4.5,
    sold: 75,
  },
  {
    name: 'Product 3 with a Long Name That Goes On and On',
    cost: 49.99,
    image:
      'https://plus.unsplash.com/premium_photo-1677234148135-2bb4f10f6332?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 0,
    location: 'Location 3',
    star: 3.8,
    sold: 30,
  },
  {
    name: 'A Really Long Product Name 4 for Your Consideration',
    cost: 19.99,
    image:
      'https://plus.unsplash.com/premium_photo-1677451335829-c863209d463b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 8,
    location: 'Location 4',
    star: 4.0,
    sold: 40,
  },
  {
    name: "Product 5 with an Extremely Long Name that Doesn't End",
    cost: 59.99,
    image:
      'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 15,
    location: 'Location 5',
    star: 4.7,
    sold: 60,
  },
  {
    name: 'Product 6 with a Name So Long It Might Wrap to the Next Line',
    cost: 69.99,
    image:
      'https://plus.unsplash.com/premium_photo-1678218575597-5d0a2810825f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 12,
    location: 'Location 6',
    star: 4.3,
    sold: 90,
  },
  {
    name: 'Product 7 with a Name Long Enough to Fill the Space Provided',
    cost: 24.99,
    image:
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 3,
    location: 'Location 7',
    star: 4.1,
    sold: 25,
  },
  {
    name: 'Product 8 with a Really, Really Long Name That Keeps Going',
    cost: 79.99,
    image: 'https://via.placeholder.com/150',
    discount: 20,
    location: 'Location 8',
    star: 4.8,
    sold: 120,
  },
  {
    name: 'Product 9 with an Absurdly Long Name Just for Fun',
    cost: 44.99,
    image: 'https://via.placeholder.com/150',
    discount: 7,
    location: 'Location 9',
    star: 4.4,
    sold: 55,
  },
  {
    name: 'Product 10 with a Name So Long You Might Forget the Beginning',
    cost: 34.99,
    image: 'https://via.placeholder.com/150',
    discount: 9,
    location: 'Location 10',
    star: 4.6,
    sold: 80,
  },
])
</script>
<template>
  <div class="w-full h-fit bg-[#f9f9f9] rounded-md">
    <!-- title flash sale -->
    <div class="w-full flex justify-between p-4">
      <div class="flex">
        <h2 class="text-xl font-bold">Newest product</h2>
      </div>
      <div class="text-[#5a4098]">See more</div>
    </div>
    <!-- end title header -->
    <!-- list product -->
    <div class="w-full flex p-4 gap-4 relative">
      <div
        class="absolute z-10 flex justify-center items-center top-[45%] -right-5 w-[50px] h-[50px] cursor-pointer bg-white gb-shadow rounded-full"
        @click="mySwiper.slideNext()"
      >
        <i class="ri-arrow-right-s-line text-2xl"></i>
      </div>
      <div
        class="absolute z-10 flex justify-center items-center top-[45%] -left-5 w-[50px] h-[50px] cursor-pointer bg-white gb-shadow rounded-full"
        @click="mySwiper.slidePrev()"
      >
        <i class="ri-arrow-left-s-line text-2xl"></i>
      </div>
      <swiper
        style="padding: 0 8px 10px 8px"
        class="w-full pb-2"
        :slides-per-view="'auto'"
        :space-between="10"
        @swiper="onSwiper"
      >
        <swiper-slide v-for="product in products" :key="product.name" style="width: auto" class="w-fit">
          <RouterLink :to="`/products/${product.id}`">
            <ProductCard :product="product" />
          </RouterLink>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
