<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import ModalProfile from '@/components/profiles/ModalProfile.vue'
import SearchWrapper from '@/components/layouts/SearchModal/SearchWrapper.vue'
const authStore = useAuthStore().state

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
<template>
  <div class="fixed top-0 left-0 z-50 border-b-[1px] w-full h-[90px] bg-white gb-shadow flex flex-col">
    <!-- top line -->
    <div class="h-[35px] w-full bg-[#f9f9f9] flex justify-between px-3 items-center">
      <div>Call us: 094619309</div>
      <div><strong>Sale 50%</strong> to day only when you apply code <strong>superbad.store</strong></div>
      <div>About us | help</div>
    </div>
    <!-- end top line -->

    <!-- bottom line -->
    <div class="flex justify-between w-full items-center px-3" style="flex: 1 1 auto">
      <!-- flex-auto -->
      <div>SUPERBAD.<span class="underlined underline-mask">STORE</span></div>
      <SearchWrapper />
      <div class="flex">
        <div v-if="!authStore.isLoggedIn" class="flex gap-3">
          <router-link to="/login">
            <button class="border-[#5a4098] border-[1px] h-[30px] px-3 rounded-[4px] font-base text-sm">Sign in</button>
          </router-link>
          <router-link to="/register">
            <button
              class="bg-[#5a4098] border-[#5a4098] text-white border-[1px] h-[30px] px-3 rounded-[4px] font-base text-sm"
            >
              Sign up
            </button>
          </router-link>
        </div>
        <div v-else class="flex gap-5 items-center">
          <!-- tool left -->
          <router-link
            to="/create-product"
            class="border-[1px] bg-[#5a4098] text-white cursor-pointer hover:shadow-lg border-[#5a4098] py-1 px-2 rounded-md"
          >
            <i class="ri-add-line"></i>
            <span>New post</span>
          </router-link>
          <div class="cursor-pointer">
            <i class="ri-shopping-cart-line text-xl"></i>
          </div>
          <div class="cursor-pointer">
            <i class="ri-heart-line text-xl"></i>
          </div>
          <ModalProfile />
          <!-- end tool left -->
        </div>
      </div>
    </div>
  </div>
</template>
