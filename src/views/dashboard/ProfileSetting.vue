<script setup>
import { ref, onBeforeMount } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import ModalChangeAvatar from '@/components/profiles/ModalChangeAvatar.vue'
import AInput from '@/components/commons/atoms/AInput.vue'
import { fileToBase64 } from '@/utils/file'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore().state
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

const userData = ref(null)
onBeforeMount(() => {
  console.log('authStore', authStore)
  userData.value = { ...authStore?.user }
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
</script>

<template>
  <ModalChangeAvatar
    v-if="modal.changeAvatar"
    :img="imgBase64"
    @cropped="onUpdateAvatar"
    @close="modal.changeAvatar = false"
  />
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
    <div class="w-full flex gap-5 mt-10">
      <div class="w-[300px] bg-white h-[300px] rounded-2xl"></div>
      <div class="flex-auto bg-white rounded-2xl p-5 flex flex-col gap-5">
        <h2 class="text-base font-semibold">Information</h2>
        <AInput v-model="userData.name" label="Full name" placeholder="Enter your full name..." />
        <AInput v-model="userData.email" label="Email" placeholder="Enter your email..." />
        <AInput v-model="userData.phoneNumber" label="Phone number" placeholder="Enter your phone number..." />
        <AInput label="Address" placeholder="Enter your address..." />
      </div>
    </div>
  </div>
</template>
