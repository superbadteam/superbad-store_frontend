<template>
  <div class="w-full mt-20">
    <div class="w-full flex justify-between">
      <h4 class="text-2xl font-bold">
        <i class="ri-shield-check-fill text-green-500"></i>
        Offical Store</h4>
      <h4 class="text-third-100">See All</h4>
    </div>
    <div class="w-full flex max-md:grid max-md:grid-cols-2 gap-5 max-md:gap-3 mt-5 flex-wrap">
      <RouterLink
        v-for="(item, index) in shops"
        :key="index"
        class="h-[220px] shadow-d-30 block bg-white rounded-md w-[183px] max-md:w-full"
        to="/"
      >
        <div class="w-full h-[140px] flex justify-center items-center bg-primary-400">
          <img class="w-[70%] object-contain" :src="item.logo" alt="">
        </div>
        <div class="flex py-3 flex-col items-center">
          <p class="font-medium">{{ item.name }}</p>
          <p class="font-base text-gray-400"><i class="ri-shield-check-fill text-green-500 mr-1"></i>Official store</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// create list shop have logo, name, link
const shops = ref([
  {
    logo: 'https://i0.wp.com/www.swafol.fr/wp-content/uploads/2017/09/Aukey_Logo.png?resize=825%2C363&ssl=1',
    name: 'Aukey Official Store',
    link: 'https://shopee.vn/mall',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Samsung_wordmark.svg/7051px-Samsung_wordmark.svg.png',
    name: 'Samsung Official',
    link: 'https://shopee.vn/mall',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Philips_logo_new.svg/2560px-Philips_logo_new.svg.png',
    name: 'Philips',
    link: 'https://shopee.vn/mall',
  },
  {
    logo: 'https://asset-3s.3second.co.id/p/logo.png',
    name: '#3Second Global',
    link: 'https://shopee.vn/mall',
  },
  {
    logo: 'https://inansaigon.vn/ckfinder/userfiles/images/logo-xiaomi-3.png',
    name: 'Xiaomi global ',
    link: 'https://shopee.vn/mall',
  },
  {
    logo: 'https://1000logos.net/wp-content/uploads/2016/09/Acer-Logo.png',
    name: 'Acer',
    link: 'https://shope',
  },
])
</script>
