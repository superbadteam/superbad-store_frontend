<script setup>
import { ref, computed } from 'vue'
import data from '@/utils/emoji.json'

const emit = defineEmits(['handleEmojiClick'])

const handleEmojiClick = (emoji) => {
  emit('handleEmojiClick', emoji)
}

const show_arrow = ref(false)

const categories = computed(() => Object.keys(data))

const category_emojis = (category) => {
  return Object.values(data[category])
}
</script>
<template>
  <div
    class="emoji_picker border-[1px] bg-[var(--bg-primary)] border-[var(--border-color)] absolute bottom-full w-[300px]"
  >
    <div class="picker_container">
      <div v-for="category in categories" :key="`category_${category}`" class="category">
        <span>{{ category }}</span>
        <div class="emojis_container">
          <button
            v-for="(emoji, index) in category_emojis(category)"
            :key="`emoji_${index}`"
            @click="handleEmojiClick(emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="show_arrow" class="bottom_arrow"></div>
  </div>
</template>

<style scoped>
.emoji_picker {
  display: flex;
  flex-direction: column;
  height: 20rem;
  padding: 5px;
}

.emoji_picker,
.bottom_arrow {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
}

.emoji_picker,
.picker_container {
  border-radius: 1.5rem;
  overflow: hidden;
}

.picker_container {
  position: relative;
  padding: 1rem;
  overflow: auto;
  padding-right: 0;
  z-index: 1;
}

.category {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  color: rgb(169, 169, 169);
}

.emojis_container {
  display: flex;
  flex-wrap: wrap;
}

.category button {
  margin: 0.5rem;
  margin-left: 0;
  background: inherit;
  border: none;
  font-size: 1.25rem;
  padding: 0;
}

.bottom_arrow {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0.75rem;
  height: 0.75rem;
  transform: translate(-50%, 50%) rotate(45deg);
  background: white;
}
</style>
