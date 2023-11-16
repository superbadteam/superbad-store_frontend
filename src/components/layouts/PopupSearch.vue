<template>
  <div class="fixed top-0 left-[50%] transform translate-x-[-50%] flex justify-center z-50">
    <div
      class="max-[500px]:w-[90%] w-[500px] h-fit min-h-6 mt-3 bg-[#161616] rounded-lg p-2 relative shadow-lg"
      @click.stop=""
    >
      <input
        v-model="searchKey"
        type="text"
        placeholder="Enter youtube link, ex: https://youtube.com..."
        class="text-sm h-[30px] w-full bg-transparent rounded-md pl-[30px]"
        @input="search"
      />
      <svg
        class="absolute top-[14px] left-4"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 36 36"
      >
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

      <!-- metadata -->
      <div v-if="metaData" class="flex mt-5 gap-2">
        <img class="w-[80px] h-[80px] rounded-sm object-cover" :src="metaData.images[0]" alt="" />
        <div class="flex flex-col">
          <p class="text-sm text-[#fff]">{{ metaData.description }}</p>
          <p class="text-xs text-[#fff]">{{ metaData.author_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, ref } from 'vue'

defineEmits(['closePopup'])
const searchKey = ref('')
const timeOutSearch = ref(null)
const search = async () => {
  clearTimeout(timeOutSearch.value)
  timeOutSearch.value = setTimeout(() => {
    getMetaData()
  }, 500)
}
const metaData = ref(null)
const getMetaData = async () => {
  const url = `https://jsonlink.io/api/extract?url=${searchKey.value}`
  const res = await fetch(url)
  const data = await res.json()
  metaData.value = data
}
</script>
