<template>
  <div class="w-[80%] lg:w-[500px] h-[35px] border-[1px] flex rounded-md">
    <input
      v-model="keyword"
      type="text"
      placeholder="Enter product..."
      style="outline: none; border: none !important"
      class="h-full w-full border-0 bg-transparent rounded-md"
      @keyup.enter="onSearch"
    />
    <div
      class="h-full w-[50px] bg-[#5a4098] cursor-pointer flex justify-center items-center rounded-tr rounded-br"
      @click="onSearch"
    >
      <i class="ri-search-line text-white"></i>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const keyword = ref(route.query.keyword || '')
const onSearch = () => {
  const newQuery = { ...route.query, keyword: keyword.value }
  router.push({ name: 'search', query: newQuery })
  console.log('search', newQuery)
}
</script>
