<template>
  <div v-if="shippingAddresses.length > 0" class="relative w-full">
    <div
      class="cursor-pointer hover:bg-slate-50 w-full border-[1px] rounded-lg p-5"
      @click.stop="isShowDropdown = !isShowDropdown"
    >
      <div>
        <p>{{ currentShippingAddress.phoneNumber }}</p>
        <p>{{ [currentShippingAddress.city, currentShippingAddress.district].join(', ') }}</p>
      </div>
      <!-- icon arrow down -->
      <div class="absolute right-5 top-5">
        <i v-show="!isShowDropdown" class="ri-arrow-down-s-line text-2xl"></i>
        <i v-show="isShowDropdown" class="ri-arrow-up-s-line text-2xl"></i>
      </div>
    </div>
    <!-- list option -->
    <div
      v-if="isShowDropdown"
      v-touch-outside="onCloseDropdown"
      class="absolute top-full left-0 w-full bg-white border-[1px] rounded-lg mt-2"
    >
      <div
        v-for="address in shippingAddresses"
        :key="address.id"
        class="cursor-pointer hover:bg-slate-50 w-full p-5"
        @click="onChooseShippingAddress(address)"
      >
        <div>
          <p>{{ address.phoneNumber }}</p>
          <p>{{ [address.city, address.district].join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getShippingAddressApi } from '@/services/order.service'
import { ref, onBeforeMount } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue'])
const shippingAddresses = ref([])
onBeforeMount(async () => {
  await getShippingAddress()
})

const currentShippingAddress = ref(null)
const getShippingAddress = async () => {
  try {
    const res = await getShippingAddressApi()
    shippingAddresses.value = res.data.reverse()
    console.log('shippingAddress', shippingAddresses.value)
    currentShippingAddress.value = shippingAddresses.value.find((address) => address.isMainAddress)
    emits('update:modelValue', currentShippingAddress.value.id)
  } catch (error) {
    console.log('error', error)
  }
}

const isShowDropdown = ref(false)
const onChooseShippingAddress = (address) => {
  currentShippingAddress.value = address
  isShowDropdown.value = false
  emits('update:modelValue', address.id)
}

const onCloseDropdown = () => {
  isShowDropdown.value = false
}
</script>
