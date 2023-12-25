<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex w-full flex-col gap-5 max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <div class="w-full">
        <BreadCrumb :routes="routes" />
      </div>
      <div class="w-full flex flex-col gap-10">
        <!-- thumbnail -->
        <p class="text-3xl font-bold">Checkout({{ masterStore.state.cart.items.length }})</p>
        <div class="flex flex-row-reverse gap-20">
          <div class="shadow-d-20 w-[370px] h-fit rounded-lg border-[1px]">
            <div class="p-5 flex justify-between items-center border-b-[1px]">
              <p class="text-base font-semibold">Order Summary</p>
            </div>
            <div class="p-5 flex flex-col gap-5 mt-3">
              <div class="flex justify-between items-center">
                <p class="text-base font-medium">Subtotal</p>
                <p class="text-base font-semibold">${{ totalSubPrice }}</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-base font-medium">Shipping</p>
                <p class="text-base font-semibold">$0</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-base font-medium">Tax</p>
                <p class="text-base font-semibold">$0</p>
              </div>
            </div>
            <div class="p-5 py-3 border-t-[1px] flex justify-between items-center mt-3">
              <p class="text-base font-medium">Total</p>
              <p class="text-xl font-bold">${{ totalSubPrice }}</p>
            </div>
            <div class="p-5 pt-2">
              <AButton title="checkout" class="text-white text-lg font-medium flex justify-center py-3" />
            </div>
          </div>
          <div class="flex-auto flex flex-col gap-7">
            <div v-for="item in masterStore.state.cart.items" :key="item.id">
              <div>
                <div class="flex gap-4">
                  <input
                    :id="item.id"
                    v-model="selectItems"
                    class="mt-3 rounded-sm w-5 h-5 text-[#ff7050]"
                    type="checkbox"
                    :value="item.id"
                    name=""
                  />
                  <img class="w-[80px] h-[80px] rounded-md" :src="item.productType.product.imageUrl" alt="" />
                  <div>
                    <p class="font-medium text-base">{{ item.productType.product.name }}</p>
                    <p>{{ item.productType.name }}</p>
                    <ANumberInput v-model="item.quantity" />
                  </div>
                  <p class="ml-auto text-base font-semibold">${{ item.totalPrice }}</p>
                </div>
                <div class="flex justify-between items-center mt-3 pl-7">
                  <p class="text-third-100 font-medium">
                    <i class="ri-add-line font-bold"></i>
                    Add notes
                  </p>
                  <div class="flex items-center gap-4 text-base">
                    <p>
                      <i class="ri-heart-line"></i>
                      Add to white list
                    </p>
                    <span class="h-[20px] border-r-[1px]"></span>
                    <i class="ri-delete-bin-6-line"></i>
                  </div>
                </div>
                <!-- line -->
                <div class="border-b-[1px] mt-7"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from 'vue'
// components
import ANumberInput from '@/components/commons/atoms/ANumberInput.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import ThumbnailsProduct from '@/components/products/ThumbnailsProduct.vue'
import ShopDetail from '@/components/profiles/ShopDetail.vue'
// services
import { getProductApi } from '@/services/product.service'
import { addToCartApi } from '@/services/cart.service'
// stores
import { useMasterStore } from '@/stores/master.store'
import { useUserStore } from '@/stores/user.store'
const masterStore = useMasterStore()
const userStore = useUserStore()

import { useRoute } from 'vue-router'
const route = useRoute()
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Checkout',
    path: '/checkout',
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
  const routeCategory = masterStore.state.categories.find((category) =>
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

onBeforeMount(async () => {
  // await getProduct()
  // shopDetail.value = await userStore.addUser(product.value.userId)
})
const errValidate = ref({
  cart: '',
})

const selectItems = ref([])
const totalSubPrice = computed(() => {
  let total = 0
  selectItems.value.forEach((item) => {
    const product = masterStore.state.cart.items.find((product) => product.id === item)
    total += product.totalPrice
  })
  return total
})
</script>
<style scoped></style>
