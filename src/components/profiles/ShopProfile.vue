<template>
  <div v-if="user" class="w-full">
    <div class="relative">
      <!-- cover -->
      <div>
        <LazyImg
          class-style="w-full h-[200px] object-cover rounded-md"
          :src="user.coverUrl"
        />
      </div>
      <div
        v-if="type === 'edit'"
        class="absolute flex items-center justify-center backdrop-blur-md top-2 left-2 rounded-lg bg-slate-100 h-8 px-3"
      >
        <i class="ri-image-edit-line text-primary-200 text-base"></i>
        <span class="ml-1 text-primary-200">Change</span>
      </div>
      <div class="w-[120px] h-[120px] overflow-hidden rounded-full absolute -bottom-[70px] left-10 object-cover">
        <div
          v-if="type === 'edit'"
          class="absolute bottom-0 h-[40px] w-full flex justify-center items-center bg-[#a3a3a38a]"
          @click="openChooseFile"
        >
          <i class="ri-image-edit-line text-white text-base"></i>
        </div>
        <!-- <img
          v-if="!user?.avatar"
          class="w-full h-full rounded-full object-cover"
          src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        /> -->
        <LazyImg class-style="w-full h-full object-cover" :src="user?.avatar" />
        <!-- <img v-else class="w-full h-full rounded-full object-cover" :src="user?.avatar" alt="" /> -->
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
</template>
<script setup>
import LazyImg from '../commons/atoms/LazyImg.vue'

defineProps({
  user: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>
