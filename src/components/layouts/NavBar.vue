<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useMasterStore } from '@/stores/master.store'
import ModalProfile from '@/components/profiles/ModalProfile.vue'
import SearchWrapper from '@/components/search/SearchWrapper.vue'
import CartModal from '../products/CartModal.vue'
const authStore = useAuthStore().state
const masterStore = useMasterStore().state

const modal = ref({
  changeAvatar: false,
  showCart: false,
})
const closeModalCart = () => {
  console.log('closeModalCart')
  modal.value.showCart = false
}
</script>
<template>
  <div class="fixed top-0 left-0 z-50 border-b-[1px] w-full bg-white gb-shadow flex flex-col">
    <!-- top line -->
    <div class="max-md:h-[45px] h-[35px] w-full bg-[#f9f9f9] flex justify-between px-3 items-center">
      <div class="max-md:hidden">Call us: 094619309</div>
      <div class="text-center">
        <strong>Sale 50%</strong> to day only when you apply code <strong>superbad.store</strong>
      </div>
      <div class="max-md:hidden">About us | help</div>
    </div>
    <!-- end top line -->

    <!-- bottom line -->
    <div class="py-3 flex justify-between w-full items-center px-10" style="flex: 1 1 auto">
      <!-- flex-auto -->
      <RouterLink to="/" class="font-bold text-lg mr-5"
        >SUPERBAD.<span class="underlined underline-mask">STORE</span></RouterLink
      >
      <SearchWrapper class="max-md:hidden" />
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
        <div v-else class="ml-3 flex gap-5 items-center">
          <!-- tool left -->
          <router-link
            to="/dashboard/create-product"
            class="max-md:hidden border-[1px] bg-[#5a4098] text-white cursor-pointer hover:shadow-lg border-[#5a4098] py-1 px-2 rounded-md"
          >
            <i class="ri-add-line"></i>
            <span class="whitespace-nowrap">New post</span>
          </router-link>
          <div class="relative">
            <div
              v-if="masterStore.cart.items.length > 0"
              class="absolute -right-3 -top-2 bg-rose-600 text-white w-5 h-5 rounded-full flex justify-center items-center"
            >
              {{ masterStore.cart.items.length }}
            </div>
            <i class="cursor-pointer ri-shopping-cart-line text-xl" @click.stop="modal.showCart = true"></i>
            <CartModal v-show="modal.showCart" v-touch-outside="closeModalCart" @close="closeModalCart" />
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
