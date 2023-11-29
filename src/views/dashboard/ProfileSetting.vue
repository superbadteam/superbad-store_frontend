<script setup>
import { ref } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import ModalChangeAvatar from '@/components/profiles/ModalChangeAvatar.vue'
import { fileToBase64 } from '@/utils/file'
import { uploadApi } from '@/services/product.service'
import { useAuthStore } from '@/stores/auth.store'
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
  <div class="relative flex flex-col w-full h-full p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="flex gap-2 justify-between w-full pb-5">
      <div>
        <h1 class="text-2xl font-semibold">Profile settings</h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="flex gap-2 sticky top-0">
        <AButton title="Cancel" class="w-fit h-fit py-2 px-3 bg-slate-200 text-secondary" @click="onCreate">
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
        <img
          class="w-full h-[200px] object-cover rounded-md"
          src="https://images.unsplash.com/photo-1679678691006-3afa56204979?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
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
        <span class="text-xs text-secondary">
          <i class="ri-map-pin-2-fill"></i>
          <span class="ml-1">Hanoi, Vietnam</span>
        </span>
      </div>
    </div>
    <!-- information -->
    <div class="w-full flex gap-5">
      <div>
        
      </div>
      <div></div>
    </div>
  </div>
</template>
