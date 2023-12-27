<template>
  <div class="flex w-full px-5 pt-7 justify-center gap-5">
    <div class="flex w-full max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <div class="w-full">
        <div class="px-2 pb-5 max-md:block hidden">
          <SearchWrapper class="w-full" />
        </div>
        <HomePage />
        <ShopList />
        <PromotionList />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchWrapper from '@/components/search/SearchWrapper.vue'
import HomePage from '@/components/home/HomePage.vue'
import ShopList from '@/components/home/ShopList.vue'
import PromotionList from '@/components/home/PromotionList.vue'
</script>
