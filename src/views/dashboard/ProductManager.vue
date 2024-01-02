<script setup>
import { ref, onBeforeMount } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import { useAuthStore } from '@/stores/auth.store'
import AButton from '@/components/commons/atoms/AButton.vue'
// services
import { getMyProductsApi } from '@/services/product.service'
const authStore = useAuthStore().state
import { useRouter } from 'vue-router'
const router = useRouter()
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'My products',
    path: '/dashboard/manage-product',
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

const onEdit = (id) => {
  console.log('onEdit')
  router.push({
    name: 'update-product',
    params: {
      id,
    },
  })
}
</script>

<template>
  <div class="relative flex flex-col w-full h-full p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="flex gap-2 justify-between w-full pb-5">
      <div>
        <h1 class="text-2xl font-semibold">My products</h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="flex gap-2 sticky top-0"></div>
    </header>
    <div class="w-full flex gap-5">
      <div class="relative w-full overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" class="px-6 py-3">Product name</th>
              <th scope="col" class="px-6 py-3">Sold</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="bg-white border-b">
              <th scope="row" class="max-w-[300px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <RouterLink :to="`/products/${product.id}`" class="flex gap-2 items-center">
                  <LazyImg :src="product.imageUrl" alt="" class-style="w-10 h-10 rounded-lg mr-4 object-cover" />
                  <p class="truncate">
                    {{ product.name }}
                  </p>
                </RouterLink>
              </th>
              <td class="px-6 py-4">{{ product.sold }}</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <AButton title="Edit" type="edit" class="w-fit h-fit py-2 px-3" @click="onEdit(product.id)">
                    <template #left>
                      <i class="ri-pencil-line mr-2"></i>
                    </template>
                  </AButton>
                  <AButton
                    title="Delete"
                    type="delete"
                    class="w-fit h-fit py-2 px-3 bg-rose-700 text-primary-200"
                    @click="onCreate"
                  >
                    <template #left>
                      <i class="ri-delete-bin-line mr-2"></i>
                    </template>
                  </AButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
