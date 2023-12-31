<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import AFilePicker from '@/components/commons/atoms/AFilePicker.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
const types = ref([
  {
    name: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
  },
])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})
const emits = defineEmits(['update:modelValue'])
onBeforeMount(() => {
  types.value = props.modelValue
})
watch(
  () => types.value,
  (val) => {
    emits('update:modelValue', val)
  },
  { deep: true }
)

const addType = () => {
  types.value.push({
    name: '',
    image: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
  })
}

const isUploading = ref(false)
</script>
<template>
  <div class="w-full">
    <AButton title="New type" class="mt-6 w-fit text-white" @click="addType">
      <template #left>
        <i class="ri-add-line"></i>
      </template>
    </AButton>
    <div class="mt-5">
      <div
        v-for="(item, index) in types"
        :key="index"
        class="flex gap-5 border-[2px] h-fit rounded-md border-dashed p-2 mt-2"
      >
        <div
          class="flex justify-center items-center cursor-pointer bg-red-100 rounded-md w-[70px] min-w-[50px] h-[50px]"
          @click="() => types.splice(index, 1)"
        >
          <i class="ri-delete-bin-7-line text-rose-600"></i>
        </div>
        <div class="flex flex-col">
          <div class="flex gap-3">
            <div class="flex-1">
              <p>Name:</p>
              <input id="" v-model="item.name" class="inp-common" type="text" placeholder="Name type" name="" />
            </div>
            <div class="flex-1">
              <p>Quantity:</p>
              <input id="" v-model="item.quantity" class="inp-common" type="text" placeholder="Name type" name="" />
            </div>
            <div class="flex-1">
              <p>Price:</p>
              <input id="" v-model="item.price" class="inp-common" type="text" placeholder="Name type" name="" />
            </div>
          </div>
          <div class="mt-4 w-full cursor-pointer relative">
            <div
              v-if="!item.imageUrl"
              class="relative overflow-hidden w-full h-[120px] border-[1px] rounded-md flex justify-center items-center"
            >
              <div
                v-if="isUploading"
                class="absolute z-20 top-0 left-0 w-full flex justify-center items-center h-full bg-opacity-50"
              >
                <img src="@/assets/icons/loading.svg" alt="" />
              </div>
              <i class="ri-image-add-fill text-xl"></i>
              <AFilePicker
                v-model="item.imageUrl"
                class="absolute top-0 left-0 z-10"
                auto-upload="true"
                @start-upload="isUploading = true"
                @end-upload="isUploading = false"
              />
            </div>
            <div v-else class="w-full h-[120px] rounded-lg p-3 flex items-center gap-5 bg-slate-100">
              <img class="w-[90%] h-[100px] object-cover rounded-md" :src="item.imageUrl" alt="" />
              <i class="ri-delete-bin-7-line text-rose-600" @click="item.imageUrl = ''"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
