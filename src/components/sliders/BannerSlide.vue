<template>
  <div class="w-full">
    <swiper
      style="padding: 0 8px 10px 8px"
      class="w-full pb-2"
      :slides-per-view="1"
      :space-between="10"
      :loop="true"
      :autoplay="{
        delay: 2500,
      }"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="item in banners" :key="item.id" class="w-full">
        <img class="w-full h-[380px] object-cover rounded-md" :src="item.image" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const mySwiper = ref(null)

const onSwiper = (swiper) => {
  mySwiper.value = swiper
  console.log(swiper)
}

const banners = [
  {
    id: 1,
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-9db9afa9dc48742dd1f63f4b3e970eb1_screen.jpg?ts=1605628683',
  },
  {
    id: 2,
    image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2019/BannerTong.png',
  },
  {
    id: 3,
    image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2019/BannerTong.png',
  },
  {
    id: 4,
    image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2019/BannerTong.png',
  },
  {
    id: 5,
    image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2019/BannerTong.png',
  },
  {
    id: 6,
    image: 'https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2019/BannerTong.png',
  },
]
</script>
