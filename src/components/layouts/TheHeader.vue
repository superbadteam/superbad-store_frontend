<template>
  <div class="fixed top-0 left-0 h-[72px] w-full z-50 flex justify-between items-center px-5">
    <p class="font-bold text-xl mr-3">W2GH</p>
    <div
      class="max-[400px]:w-[200px] cursor-pointer justify-center w-[350px] h-[34px] border-[1px] rounded-[10px] border-[#363636] flex items-center px-2 gap-2 hover:bg-[#121213] relative"
      @click="isShowPopupSearch = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36">
        <path
          fill="currentColor"
          d="M16.33 5.05A10.95 10.95 0 1 1 5.39 16A11 11 0 0 1 16.33 5.05m0-2.05a13 13 0 1 0 13 13a13 13 0 0 0-13-13Z"
          class="clr-i-outline clr-i-outline-path-1"
        />
        <path
          fill="currentColor"
          d="m35 33.29l-7.37-7.42l-1.42 1.41l7.37 7.42A1 1 0 1 0 35 33.29Z"
          class="clr-i-outline clr-i-outline-path-2"
        />
        <path fill="none" d="M0 0h36v36H0z" />
      </svg>
      <p>Seach</p>
    </div>
    <div class="flex items-center gap-2">
      <img class="w-[25px] h-[25px] cursor-pointer mx-2" src="@/assets/icons/noti.svg" alt="" />
      <div class="flex items-center gap-2 relative">
        <PopupProfile v-if="isShowPopupProfile" v-touch-outside="closePopupProfile" @close="closePopupProfile" />
        <img
          v-if="!authStore.isLoggedIn || (authStore.isLoggedIn && !authStore.user.avatar)"
          class="rounded-full w-[35px] h-[35px] cursor-pointer"
          src="https://cdn.dribbble.com/users/928891/avatars/normal/7a2a6e31d4cfce50c74b4b9454d05225.jpg?1573597143&resize=40x40"
          alt=""
          @click="isShowPopupProfile = true"
        />
        <img
          v-if="authStore.isLoggedIn && authStore.user.avatar"
          class="rounded-full w-[35px] h-[35px] min-w-[30px] cursor-pointer"
          :src="authStore.user.avatar"
          alt=""
          @click="isShowPopupProfile = true"
        />
        <div
          v-if="authStore.isLoggedIn || (authStore.isLoggedIn && authStore.value.user)"
          class="flex relative max-[500px]:hidden"
        >
          <div class="flex cursor-pointer" @click="isShowPopupProfile = true">
            <p>{{ authStore.user.name }}</p>
            <img src="@/assets/icons/drop-down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- popup -->
  <PopupSearch v-if="isShowPopupSearch" v-touch-outside="closePopupSearch" />
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
import PopupSearch from './PopupSearch.vue'
import PopupProfile from './PopupProfile.vue'

const isShowPopupSearch = ref(false)
const isShowPopupProfile = ref(false)

const closePopupSearch = () => {
  isShowPopupSearch.value = false
}

const closePopupProfile = () => {
  console.log('close')
  isShowPopupProfile.value = false
}
</script>
