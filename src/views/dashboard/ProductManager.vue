<script setup>
import { ref, onBeforeMount } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import { useAuthStore } from '@/stores/auth.store'
// services
import { getMyProductsApi } from '@/services/product.service'
const authStore = useAuthStore().state

// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Profile setting',
    path: '/',
  },
])

const userData = ref(null)
onBeforeMount(async () => {
  console.log('authStore', authStore)
  userData.value = { ...authStore?.user }
  await getMyProducts()
})

const products = ref([])
const getMyProducts = async () => {
  const res = await getMyProductsApi()
  products.value = res.data.data
  console.log('products', products.value)
}
</script>

<template>
  <div class="relative flex flex-col w-full h-fit p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="flex gap-2 justify-between w-full pb-5">
      <div>
        <h1 class="text-2xl font-semibold">Profile settings</h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="flex gap-2 sticky top-0">
        <AButton title="Cancel" class="w-fit h-fit py-2 px-3 bg-slate-200 text-primary-200" @click="onCreate">
          <template #left>
            <i class="ri-close-line"></i>
          </template>
        </AButton>
        <AButton title="Create" class="w-fit h-fit py-2 px-3 text-white bg-blue-500" @click="onCreate">
          <template #left>
            <i class="ri-save-line"></i>
          </template>
        </AButton>
      </div>
    </header>
    <div class="w-full flex gap-5">
      <RouterLink :to="`/products/${product.id}`" v-for="product in products" :key="product.id" >
        <ProductCard :product="product" />
      </RouterLink>
    </div>
  </div>
</template>
