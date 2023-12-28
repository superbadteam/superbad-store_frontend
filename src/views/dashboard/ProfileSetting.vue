<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import ADropdown from '@/components/commons/atoms/ADropdown.vue'
import ModalChangeAvatar from '@/components/profiles/ModalChangeAvatar.vue'
import AInput from '@/components/commons/atoms/AInput.vue'
import AddShippingAddress from '@/components/profiles/AddShippingAddress.vue'
import { fileToBase64 } from '@/utils/file'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore().state
// services
import { getLocationApi, getShippingAddressApi } from '@/services/order.service'
defineProps({
  type: {
    type: String,
    default: 'VIEW',
  },
})
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
const locations = ref([])
const userData = ref(null)
onBeforeMount(() => {
  getLocation()
  getShippingAddress()
  console.log('authStore', authStore)
  userData.value = { ...authStore?.user }
})

const getLocation = async () => {
  const res = await getLocationApi()
  locations.value = res.data
  console.log('locations', locations.value)
}

const cities = computed(() => {
  return locations.value.map((location) => ({
    id: location.id,
    name: location.name,
    code: location.code,
  }))
})

const districts = computed(() => {
  const city = locations.value.find((location) => location.id === userData.value.cityId)
  return city?.districts.map((district) => ({
    id: district.id,
    name: district.name,
    code: district.code,
  }))
})
const modal = ref({
  changeAvatar: false,
})
const inputFileElement = ref(null)
const openChooseFile = () => {
  inputFileElement.value.click()
}
const imgBase64 = ref(null)
const onChooseFile = async (e) => {
  const file = e.target.files[0]
  const base64 = await fileToBase64(file)
  imgBase64.value = base64
  modal.value.changeAvatar = true
  console.log('base64', base64)
  inputFileElement.value.value = ''
}

const onUpdateAvatar = (file) => {
  authStore.user.avatar = file
  modal.value.changeAvatar = false
}

// handle shipping address
const shippingAddress = ref([])
const getShippingAddress = async () => {
  try {
    const res = await getShippingAddressApi()
    shippingAddress.value = res.data.reverse()
    console.log('shippingAddress', shippingAddress.value)
  } catch (error) {
    console.log('error', error)
  }
}

const onAddNewShippingAddress = (val) => {
  shippingAddress.value.unshift(val)
  isShowAddShippingAddress.value = false
  console.log('onAddNewShippingAddress')
}
const isShowAddShippingAddress = ref(false)
</script>

<template>
  <ModalChangeAvatar
    v-if="modal.changeAvatar"
    :img="imgBase64"
    @cropped="onUpdateAvatar"
    @close="modal.changeAvatar = false"
  />
  <div class="max-lg:p-5 relative flex flex-col w-full h-fit p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="max-lg:flex-col flex gap-2 justify-between w-full pb-5">
      <!-- breadcrumb -->
      <div>
        <h1 class="text-2xl font-semibold">Profile settings</h1>
        <BreadCrumb :routes="routes" />
      </div>
      <!-- action -->
      <div class="flex gap-2 sticky top-0">
        <AButton title="Cancel" type="close" class="w-fit h-fit py-2 px-3 bg-slate-200 text-gray-700" @click="onCreate">
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
    <!-- avatar, bg -->
    <div>
      <div class="relative">
        <!-- cover -->
        <img
          class="w-full h-[200px] object-cover rounded-md"
          src="https://images.unsplash.com/photo-1679678691006-3afa56204979?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div
          class="absolute flex items-center justify-center backdrop-blur-md top-2 left-2 rounded-lg bg-slate-100 h-8 px-3"
        >
          <i class="ri-image-edit-line text-primary-200 text-base"></i>
          <span class="ml-1 text-primary-200">Change</span>
        </div>
        <div class="w-[120px] h-[120px] overflow-hidden rounded-full absolute -bottom-[70px] left-10 object-cover">
          <div
            class="absolute bottom-0 h-[40px] w-full flex justify-center items-center bg-[#a3a3a38a]"
            @click="openChooseFile"
          >
            <i class="ri-image-edit-line text-white text-base"></i>
          </div>
          <img
            v-if="!authStore.user.avatar"
            class="w-full h-full rounded-full object-cover"
            src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <img v-else class="w-full h-full rounded-full object-cover" :src="authStore.user.avatar" alt="" />
          <input ref="inputFileElement" type="file" accept="image/*" style="display: none" @change="onChooseFile" />
        </div>
      </div>
      <div class="pl-[180px] pt-3">
        <div></div>
        <p class="font-bold text-base">John Doe</p>
        <span class="text-xs text-primary-200">
          <i class="ri-map-pin-2-fill"></i>
          <span class="ml-1">Hanoi, Vietnam</span>
        </span>
      </div>
    </div>
    <!-- information -->
    <div class="max-lg:flex-col w-full flex lg:flex-row-reverse gap-5 mt-10">
      <!-- position for shipping -->
      <div class="max-lg:w-full max-lg:min-w-[unset] w-[300px] min-w-[400px] bg-white rounded-2xl p-5">
        <div class="flex justify-between items-center">
          <p class="text-lg font-semibold">Shipping address</p>
          <div
            class="w-10 h-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-slate-200"
            @click="isShowAddShippingAddress = !isShowAddShippingAddress"
          >
            <i class="ri-add-fill text-xl"></i>
          </div>
        </div>
        <div class="w-full flex flex-col mt-4 gap-3">
          <AddShippingAddress
            v-if="isShowAddShippingAddress"
            :locations="locations"
            @added="onAddNewShippingAddress"
            @close="isShowAddShippingAddress = false"
          />
          <!-- shipping address item -->
          <div v-for="item in shippingAddress" :key="item.id" class="w-full border-[1px] rounded-lg p-4">
            <div class="flex w-full justify-between">
              <p class="font-semibold text-primary-200">{{ item.isMainAddress ? 'Default' : '' }}</p>
              <div>
                <i class="ri-more-fill"></i>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-base flex items-center gap-2 font-medium">
                <i class="ri-map-pin-2-fill text-xl text-secondary-100"></i> {{ [item.city, item.district].join(', ') }}
              </p>
              <p class="text-base mt-2 flex items-center gap-2 font-medium">
                <i class="ri-user-fill text-xl text-secondary-100"></i> {{ item.name }}
              </p>
              <p class="text-base mt-2 flex items-center gap-2 font-medium">
                <i class="ri-phone-fill text-xl text-secondary-100"></i> {{ item.phoneNumber }}
              </p>
            </div>
          </div>
          <!--end shipping address item -->
        </div>
      </div>
      <!-- information -->
      <div class="flex-auto bg-white rounded-2xl p-5 flex flex-col gap-5">
        <h2 class="text-lg font-semibold">Information</h2>
        <AInput v-model="userData.name" label="Full name" placeholder="Enter your full name..." />
        <AInput v-model="userData.email" label="Email" placeholder="Enter your email..." />
        <AInput v-model="userData.phoneNumber" label="Phone number" placeholder="Enter your phone number..." />
        <div class="w-full flex gap-5">
          <ADropdown
            v-if="cities"
            v-model="userData.cityId"
            class="w-full h-full"
            is-required="true"
            label="City"
            :options="cities"
            placeholder="Select category..."
            required
          />
          <ADropdown
            v-model="userData.districtId"
            class="w-full h-full"
            is-required="true"
            label="District"
            :options="districts"
            placeholder="Select category..."
            required
          />
        </div>
        <AInput label="Address detail" placeholder="Enter your address..." />
      </div>
    </div>
  </div>
</template>
