<script setup>
import { ref, computed } from 'vue'
import EmojiPicker from './EmojiPicker.vue'
const heightInput = ref('40px')
const message = ref('')
const handleBlur = () => {
  if (message.value === '') {
    heightInput.value = '40px'
  }
}
const isDisableScroll = computed(() => {
  return heightInput.value == '20px'
})
const isShowEmojiPicker = ref(false)
const closeEmojiPicker = () => {
  isShowEmojiPicker.value = false
}
const handleEmojiClick = (emoji) => {
  message.value += emoji
}
</script>
<template>
  <div class="w-full flex gap-2 items-end">
    <div class="bg-[#1b1b1d] rounded-[24px] relative flex items-end">
      <textarea
        id=""
        v-model="message"
        :style="{ height: heightInput }"
        name=""
        class="h-fit w-full resize-animation py-2 px-3 bg-transparent"
        :class="{ 'overflow-y-hidden': isDisableScroll }"
        placeholder="Message..."
        style="outline: none"
        @focus="heightInput = '100px'"
        @blur="handleBlur"
      ></textarea>
      <p class="text-xl mr-2 mb-[8px] cursor-pointer" @click="isShowEmojiPicker = true">😃</p>
      <EmojiPicker v-if="isShowEmojiPicker" v-touch-outside="closeEmojiPicker" @handleEmojiClick="handleEmojiClick" />
    </div>
    <div
      class="cursor-pointer hover:bg-[var(--bg-hover)] h-[40px] w-[40px] min-w-[40px] flex justify-center items-center rounded-full"
    >
      <img src="@/assets/icons/send.svg" class="w-[30px] h-[30px]" alt="" />
    </div>
  </div>
</template>
<style scoped></style>
