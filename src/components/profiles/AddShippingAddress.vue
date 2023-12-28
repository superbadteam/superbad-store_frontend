<template>
  <div class="w-full border-[1px] rounded-lg p-4">
    <div class="flex w-full justify-between">
      <div class="flex items-center gap-2">
        <input id="makeDefault" v-model="address.isMainAddress" type="checkbox" name="isMainAddress" />
        <label for="makeDefault" class="text-base block">Is default </label>
      </div>
      <div>
        <i class="ri-more-fill"></i>
      </div>
    </div>
    <div class="mt-2">
      <div class="text-base mt-2 flex items-center gap-2 font-medium">
        <i class="ri-user-fill text-2xl text-[#f25d18]"></i>
        <input
          id="name"
          v-model="address.name"
          type="text"
          name="name"
          placeholder="Enter your name..."
          class="w-full border-[2px] border-primary-300 rounded-md"
        />
      </div>
      <div class="text-base mt-2 flex items-center gap-2 font-medium">
        <i class="ri-phone-fill text-2xl text-[#f25d18]"></i>
        <input
          id="phoneNumber"
          v-model="address.phoneNumber"
          type="text"
          name="phoneNumber"
          placeholder="Enter your phone number..."
          class="w-full border-[2px] border-primary-300 rounded-md"
        />
      </div>
      <div class="mt-2">
        <div class="flex gap-2">
          <ADropdown
            v-model="address.cityId"
            class="w-full h-full"
            is-required="true"
            label="City"
            :options="city"
            placeholder="Select category..."
            required
          />
          <ADropdown
            v-model="address.districtId"
            class="w-full h-full"
            is-required="true"
            label="District"
            :options="district"
            placeholder="Select category..."
            required
          />
        </div>
      </div>
      <div class="text-base mt-2 flex items-center gap-2 font-medium">
        <i class="ri-map-pin-2-fill text-2xl text-[#f25d18]"></i>
        <input
          id="address"
          v-model="address.address"
          type="text"
          name="address"
          placeholder="Enter your address..."
          class="w-full border-[2px] border-primary-300 rounded-md"
        />
      </div>
    </div>
    <p class="text-rose-600 mt-2">{{ error }}</p>
    <div class="flex mt-3 gap-2 justify-end">
      <AButton title="Save" class="w-fit text-white" @click="onSave">
        <template #left>
          <i class="ri-save-2-fill"></i>
        </template>
      </AButton>
      <!-- cancel -->
      <AButton title="Cancel" type="cancel" class="w-fit text-white" @click="$emit('close')">
        <template #left>
          <i class="ri-close-fill"></i>
        </template>
      </AButton>
    </div>
  </div>
</template>
<script setup>
import AButton from '../commons/atoms/AButton.vue'
import ADropdown from '../commons/atoms/ADropdown.vue'
import { computed, ref } from 'vue'
import { addNewShippingAddressApi } from '@/services/order.service'
import { toast } from 'vue3-toastify'

const props = defineProps({
  locations: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['close', 'added'])

const address = ref({
  name: '',
  phoneNumber: '',
  address: '',
  cityId: '',
  districtId: '',
  isMainAddress: false,
})

const city = computed(() => {
  return props.locations.map((item) => {
    return {
      name: item.name,
      id: item.id,
    }
  })
})

const district = computed(() => {
  const citySelected = props.locations.find((item) => item.id === address.value.cityId)
  if (citySelected) {
    return citySelected.districts.map((item) => {
      return {
        name: item.name,
        id: item.id,
      }
    })
  }
  return []
})

const error = ref('')
const onSave = async () => {
  try {
    if (!address.value.cityId) {
      error.value = 'Please select city'
      return
    }
    if (!address.value.districtId) {
      error.value = 'Please select district'
      return
    }
    error.value = ''
    const body = {
      name: address.value.name,
      phoneNumber: {
        countryCode: '+84',
        nationalNumber: address.value.phoneNumber,
      },
      districtId: address.value.districtId,
      address: address.value.address,
      isMainAddress: address.value.isMainAddress,
    }
    const res = await addNewShippingAddressApi(body)
    console.log('res', res)
    toast.success('Add new shipping address successfully')
    emits('added', res.data)
  } catch (error) {
    console.log('error', error)
    toast.error('Add new shipping address failed')
  }
}
</script>
