<template>
  <div class="w-full h-full flex pt-20 justify-center items-center">
    <div class="relative md:w-[500px] md:h-fit pb-10">
      <div class="flex w-full justify-between">
        <p class="text-xl font-bold">Tracking order</p>
        <p>Delivered</p>
      </div>
      <!-- shipper detail -->
      <div class="w-full rounded-md overflow-hidden mt-5 border-[1px]">
        <div class="w-full flex justify-between p-5">
          <p class="font-bold">#{{ tracking[0]?.code }}</p>
          <i class="ri-file-copy-line"></i>
        </div>
        <div class="w-full flex justify-between border-t-[1px] bg-primary-300 p-5">
          <div>
            <p class="text-base font-semibold">{{ tracking[0]?.shipper }}</p>
            <p class="text-sm">Shipper</p>
          </div>
          <img src="" alt="" />
        </div>
      </div>
      <!-- processing -->
      <div v-if="tracking" class="w-full rounded-md overflow-hidden flex flex-col gap-2 mt-5 border-[1px] p-5">
        <div v-for="(item, index) in tracking" :key="item.id" class="flex min-h-[80px]">
          <div class="w-[200px] min-w-[200px]">
            {{
              new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
            }}
          </div>
          <div class="flex flex-col items-center gap-1">
            <!-- dot -->
            <div
              :class="index === 0 ? 'bg-third-100' : 'bg-primary-400'"
              class="w-[20px] min-h-[20px] h-[20px] rounded-full border-[4px]"
            ></div>
            <div
              v-if="index != tracking.length - 1"
              class="flex-auto h-full border-l-[2px] border-dashed border-third-100"
            ></div>
          </div>
          <div class="flex-auto ml-4">
            <p class="font-bold">{{ item.title }}</p>
            <p class="text-sm">{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AButton from '@/components/commons/atoms/AButton.vue'
import { ref, onBeforeMount, computed } from 'vue'
import { getTrackingApi } from '@/services/order.service'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tracking = ref([])
onBeforeMount(async () => {
  await getTracking()
})

const getTracking = async () => {
  try {
    const res = await getTrackingApi(route.params.id)
    tracking.value = res.data
    console.log(tracking.value)
  } catch (error) {
    console.log(error)
    router.push({ name: 'not-found' })
  }
}
</script>
