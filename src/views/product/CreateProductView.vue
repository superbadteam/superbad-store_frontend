<script setup>
import { ref, onMounted } from 'vue';
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import Quill from 'quill'
import '@/assets/css/quill.snow.css'
const editor = ref(null)

onMounted(() => {
  editor.value = new Quill('.editor', {
    theme: 'snow',
    placeholder: 'Write description...',
  })
})
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Create product',
    path: '/create-product',
  },
]);
</script>
<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex flex-col w-full max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <!-- header -->
      <header class="flex flex-col gap-2 w-full">
        <h1 class="text-2xl font-semibold">Create new product</h1>
        <BreadCrumb :routes="routes" />
      </header>
      <!-- body -->
      <div class="flex w-full mt-12 gap-10">
        <!-- image upload -->
        <div class="h-[400px] flex-1 shadow-sm border-[1px] rounded-xl"></div>
        <!-- information -->
        <div class="flex-[2] h-[400px]">
          <div class="flex w-full gap-6">
            <div class="w-[60%]">
              <p class="font-semibold mb-3">Product name:</p>
              <input placeholder="Enter name..." class="w-full rounded-md border-[1px] border-[#ebebeb]" type="text">
            </div>
            <div class="flex-auto">
              <p class="font-semibold mb-3">Category:</p>
              <input class="w-full rounded-md border-[1px] border-[#ebebeb]" type="text">
            </div>
          </div>
          <!-- description -->
          <div class="flex w-full gap-6 mt-6">
            <div class="w-full">
              <p class="font-semibold mb-3">Description:</p>
              <div class="border-[1px] min-h-[200px] rounded-md">
                <div class="editor"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.ql-toolbar.ql-snow) {
  border: none !important;
  border-bottom: 1px solid #ebebeb !important;
  border-radius: 0 !important;
}
:deep(.ql-container.ql-snow) {
  border: none !important;
}
</style>
