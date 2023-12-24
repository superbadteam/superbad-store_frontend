<script setup>
import { ref, onBeforeMount, computed } from 'vue'
// components
import ANumberInput from '@/components/commons/atoms/ANumberInput.vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import ThumbnailsProduct from '@/components/products/ThumbnailsProduct.vue'
import ShopDetail from '@/components/profiles/ShopDetail.vue'
// services
import { getProductApi } from '@/services/product.service'
// stores
import { useMasterStore } from '@/stores/master.store'
import { useUserStore } from '@/stores/user.store'
const masterStore = useMasterStore().state
const userStore = useUserStore()

import { useRoute } from 'vue-router'
const route = useRoute()
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
])

const product = ref({
  id: '',
  name: '',
  userId: '',
  description: '',
  categoryId: '',
  sold: 0,
  condition: '',
  types: [],
  images: [],
})

const typeSelected = ref(null)

const priceComputed = computed(() => {
  return typeSelected.value
    ? {
        price: typeSelected.value.price,
      }
    : {
        min: product.value.types[0]?.price,
        max: product.value.types[product.value.types.length - 1]?.price,
      }
})

const getProduct = async () => {
  const res = await getProductApi(route.params.id)
  product.value = res.data
  console.log(product.value)

  let routeSubCategory = {}
  const routeCategory = masterStore.categories.find((category) =>
    category.subCategories.find((subCategory) => {
      if (subCategory.id === product.value.categoryId) {
        routeSubCategory = subCategory
        return true
      }
      return false
    })
  )
  routes.value.push(
    {
      name: routeCategory.name,
      path: `/category/${routeCategory.id}`,
    },
    {
      name: routeSubCategory.name,
      path: `/category/${routeCategory.id}/sub-category/${routeSubCategory.id}`,
    },
    {
      name: product.value.name,
      path: `/product/${product.value.id}`,
    }
  )
}

const chooseType = (type) => {
  if (typeSelected.value === type) {
    typeSelected.value = null
    return
  }
  typeSelected.value = type
}

const cart = ref({
  id: '',
  quantity: 1,
})

const shopDetail = ref({
  id: '',
  name: '',
  description: '',
  address: '',
  phone: '',
  email: '',
  images: [],
})

onBeforeMount(async () => {
  await getProduct()
  shopDetail.value = await userStore.addUser(product.value.userId)
})
</script>
<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex w-full flex-col gap-5 max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <div class="w-full">
        <BreadCrumb :routes="routes" />
      </div>
      <!-- detail -->
      <div class="w-full flex gap-10">
        <!-- thumbnail -->
        <ThumbnailsProduct :current-type="typeSelected" :product="product" />
        <div class="flex-auto">
          <h1 class="text-xl font-bold mb-2">{{ product.name }}</h1>
          <span class="text-primary-200">
            <i class="ri-star-fill text-[#ffaa28]"></i>
            <span class="ml-2 mr-1">4.5</span>
            <span>|</span>
            <span class="ml-1">sold {{ product.sold }}</span>
          </span>
          <div class="text-xl font-semibold mt-3">
            <span v-if="priceComputed.price">
              {{ '$' + priceComputed.price }}
            </span>
            <span v-else>
              {{ '$' + priceComputed.min + '- $' + priceComputed.max }}
            </span>
          </div>
          <div class="border-b-[1px] pb-4"></div>
          <div class="mt-4">
            <p class="text-lg text-gray-800 font-medium">
              Type: <span class="text-base font-light">{{ typeSelected?.name }}</span>
            </p>
            <div class="flex gap-2 mt-2">
              <div
                v-for="productType in product.types"
                :key="productType.id"
                :class="{ 'bg-primary-300': typeSelected === productType }"
                class="flex px-4 py-1 border-[1px] rounded-md cursor-pointer hover:bg-primary-300"
                @click="chooseType(productType)"
              >
                {{ productType.name }}
              </div>
            </div>
          </div>
          <!-- detail -->
          <div class="border-b-[1px] pb-4"></div>
          <p class="text-lg text-gray-800 font-medium mt-4">Details</p>
          <div v-html="product.description"></div>
        </div>
        <!-- add to card -->
        <div class="min-w-[300px] w-[300px] h-[350px] p-5 border-[1px] rounded-lg">
          <div class="w-full flex justify-between items-center">
            <div class="flex items-center gap-3">
              <img
                class="h-[40px] w-[40px] rounded-md"
                :src="typeSelected?.imageUrl ?? product.images[0]?.url"
                alt=""
              />
              <p>(choose type)</p>
            </div>
            <p>In stock</p>
          </div>
          <div class="border-b-[1px] pb-4"></div>
          <div class="mt-4 flex justify-between items-center">
            <p>Quantity</p>
            <div class="">
              <ANumberInput v-model="cart.quantity" />
            </div>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <p>Sub total</p>
            <p class="font-bold text-lg">${{ typeSelected?.price ? typeSelected?.price * cart.quantity : 0 }}</p>
          </div>
          <div class="text-third-100 border-third-100 border-[2px] py-2 flex gap-3 justify-center rounded-md mt-5"><i class="ri-shopping-cart-2-line"></i> Add to cart</div>
          <div class="text-white bg-third-100 py-3 flex gap-3 justify-center rounded-md mt-4">Buy now</div>
          <div class="flex justify-center mt-4 items-center gap-5 font-medium">
            <p><i class="ri-heart-line"></i> Wish list</p>
            <div class="w-[1px] h-7 bg-slate-200"></div>
            <p><i class="ri-share-line"></i> Share</p>
          </div>
        </div>
      </div>
      <!-- end detail -->
      <!-- detail shop -->
      <div class="w-full">
        <div class="border-b-[1px] pb-4"></div>
          <ShopDetail :shop="shopDetail" />
        <div class="border-b-[1px] pb-4"></div>
      </div>
    </div>
  </div>
</template>