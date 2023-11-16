<script setup>
import MessageList from './ChatModules/MessageList.vue'
import MessageInput from './ChatModules/MessageInput.vue'
</script>
<template>
  <div class="w-full h-full p-3 pr-0">
    <div class="w-full h-full rounded-[18px] flex flex-col justify-between gap-2">
      <MessageList />
      <MessageInput />
    </div>
  </div>
</template>
