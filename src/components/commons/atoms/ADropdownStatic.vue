<template>
  <div class="w-full">
    <div
      class="cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-md flex justify-between items-center text-lg font-bold"
      @click="isShow = !isShow"
    >
      <p>{{ title }}</p>
      <i v-show="!isShow" class="ri-arrow-down-s-line font-bold"></i>
      <i v-show="isShow" class="ri-arrow-up-s-line font-bold"></i>
    </div>
    <!-- checkbox options -->
    <div v-show="isShow" class="flex flex-col gap-2 mt-1 px-4 max-h-[300px] overflow-y-auto">
      <div v-for="(item, index) in data" :key="index" class="flex items-center font-medium text-base">
        <input
          v-model="listSelected"
          :type="type"
          :class="
            type === 'radio'
              ? 'w-5 h-5 rounded-full border-[1px] border-third-100'
              : 'w-5 h-5 rounded-[2px] border-[1px] border-third-100'
          "
          :value="item?.id"
          @change="onChange"
        />
        <p class="ml-3">{{ item?.name }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref, watch } from 'vue'
onBeforeMount(() => {
  listSelected.value = props.currentSelected
  isShow.value = props.isOpen
})

const emits = defineEmits(['change'])
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: 'checkbox',
  },
  data: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array || String,
    default: () => [] || '',
  },
  currentSelected: {
    type: Array,
    default: () => [],
  },
})

const listSelected = ref()

watch(
  () => props.currentSelected,
  (value) => {
    console.log('value current selected', value)
    listSelected.value = props.currentSelected
  }
)

const isShow = ref(false)
const onChange = () => {
  console.log('value----------<', listSelected.value)
  emits('change', listSelected.value)
}
</script>
<style lang="scss" scoped></style>
