<template>
  <img v-show="src && isLoaded" :class="classStyle" :src="src" alt="img" @load="onLoaded" />
  <img v-show="!src || !isLoaded" :class="classStyle" src="@/assets/images/image-default.jpg" alt="" />
</template>
<script setup>
import { ref } from 'vue'
const isLoaded = ref(false)
defineProps({
  src: {
    type: String,
    required: false,
    default: '',
  },
  classStyle: {
    type: String,
    required: false,
    default: '',
  },
})
const onLoaded = () => {
  console.log('loaded')
  isLoaded.value = true
}
</script>
