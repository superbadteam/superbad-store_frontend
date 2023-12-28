<template>
  <div class="w-full max-w-[1440px] flex flex-col items-center px-5 pt-10">
    <ShopProfile type="view" :user="authStore.user" />
    <div class="max-lg:flex-col flex gap-5 w-full mt-10">
      <!-- information -->
      <div class="w-[300px] min-w-[300px] bg-slate-50 rounded-md p-5">
        <p class="text-xl font-medium">information</p>
      </div>
      <!-- product list -->
      <div class="flex-auto">
        <p class="text-xl font-bold"><i class="ri-store-2-line text-green-700"></i> Shop's product</p>
        <div class="w-full flex">
          <div class="max-md:grid max-md:grid-cols-2 max-md:gap-2 w-full flex flex-wrap gap-5 mt-5">
            <ProductCard
              v-for="product in products"
              :key="product.name"
              width="w-[200px] max-md:w-full"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
import ShopProfile from '@/components/profiles/ShopProfile.vue'
import ProductCard from '@/components/products/ProductCard.vue'
const authStore = useAuthStore().state
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
