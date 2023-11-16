<script setup>
defineProps(['message'])
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore().state
</script>
<template>
  <div class="flex items-end gap-3">
    <img
      v-if="authStore?.user?.id !== message.sender_id"
      class="w-[35px] h-[35px] rounded-full object-cover"
      src="https://avatars.githubusercontent.com/u/38585889?v=4"
      alt=""
    />
    <div class="flex flex-col gap-1 w-full justify-end">
      <p v-if="authStore.user.id != message.sender_id" class="text-xs">{{ message.name }}</p>
      <p
        class="bg-[var(--bg-primary)] p-3 rounded-[20px] w-fit max-w-[90%]"
        :class="{
          'bg-[var(--green-primary)]': authStore.user.id == message.sender_id,
          'ml-auto': authStore.user.id == message.sender_id,
        }"
      >
        {{ message.content }}
      </p>
    </div>
  </div>
</template>
