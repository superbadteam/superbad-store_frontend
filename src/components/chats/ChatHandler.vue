<script setup>
import ChatHeader from './ChatHeader.vue'
import ChatBody from './ChatBody.vue'
</script>
<template>
  <div class="w-[400px] h-[80vh] bg-[#121213] rounded-[8px] overflow-hidden">
    <div class="flex h-full">
      <ChatBody />
      <ChatHeader />
    </div>
    <ChatFooter />
  </div>
</template>
