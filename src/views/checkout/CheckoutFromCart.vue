<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex w-full flex-col gap-5 max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <div class="w-full">
        <BreadCrumb :routes="routes" />
      </div>
      <div class="w-full flex flex-col gap-10">
        <p class="text-3xl font-bold">Checkout({{ masterStore.state.cart.items.length }})</p>
        <div class="flex flex-row-reverse gap-20">
          <div>
            <ShippingAddressDropdown v-model="shippingAddressId" />
            <div class="mt-5 shadow-d-20 w-[370px] h-fit rounded-lg border-[1px]">
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
              <p class="text-rose-600 px-5">{{ errValidate }}</p>
              <div class="p-5 pt-2">
                <AButton
                  title="checkout"
                  class="text-white text-lg font-medium flex justify-center py-3"
                  @click="checkout"
                />
              </div>
            </div>
          </div>
          <div class="flex-auto flex flex-col gap-7">
            <div v-for="item in listCheckout" :key="item.id">
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
                    <RouterLink :to="`/products/${item.productType.product.id}`" class="font-medium text-base">{{
                      item.productType.product.name
                    }}</RouterLink>
                    <p>{{ item.productType.name }}</p>
                    <!-- <ANumberInput @update:modelValue="onAddQuantity" v-model="item.quantity" /> -->
                  </div>
                  <p class="ml-auto text-base font-semibold">${{ item.productType.price * item.quantity }}</p>
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
import AButton from '@/components/commons/atoms/AButton.vue'
import ShippingAddressDropdown from '@/components/commons/atoms/ShippingAddressDropdown.vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
// services
import { orderApi, addTrackingApi } from '@/services/order.service'
// stores
import { useMasterStore } from '@/stores/master.store'
const masterStore = useMasterStore()
import { usePopupStore } from '@/stores/common.store'
const popupStore = usePopupStore()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
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

onBeforeMount(async () => {
  // await getProduct()
  // shopDetail.value = await userStore.addUser(product.value.userId)
  listCheckout.value = masterStore.state.cart.items
})
const errValidate = computed(() => {
  if (selectItems.value.length === 0) {
    return "You haven't selected any product"
  }
  return ''
})

const selectItems = ref([])
const totalSubPrice = computed(() => {
  let total = 0
  // selectItems is array of id
  selectItems.value.forEach((item) => {
    const product = listCheckout.value.find((product) => product.id === item)
    total += product.productType.price * product.quantity
  })
  return total
})

const shippingAddressId = ref('')
const checkout = async () => {
  if (errValidate.value) {
    return
  }
  popupStore.showPopup({
    content: 'Do you want to checkout now?',
    type: 'confirm',
    isAsync: true,
    onConfirm: async () => {
      try {
        const method = 'TakeFromCart'
        await orderApi(
          {
            shippingAddressId: shippingAddressId.value,
            cartItemIds: selectItems.value,
          },
          method
        )
        await addTracking(route.params.id)
        router.push({ name: 'checkout-success', params: { id: route.params.id } })
      } catch (error) {
        console.log(error)
      }
    },
  })
}

const addTracking = async (productId) => {
  const data = {
    createdAt: '2023-12-27T00:30:11.512Z',
    code: productId,
    title: 'Picking up your item',
    content: 'Your item is being picked up by the courier',
    time: '2048-09-23T18:43:01.829Z',
    shipper: 'Computers',
  }
  return await addTrackingApi(data)
}
const listCheckout = ref([])
</script>
<style scoped></style>
