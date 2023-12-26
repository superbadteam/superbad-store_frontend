<template>
  <div class="w-full flex flex-col">
    <div class="flex justify-between text-lg items-center">
      <p class="font-bold">Filter</p>
      <p class="text-third-100" @click="onReset">Reset all</p>
    </div>
    <div class="mt-5 flex flex-col gap-5">
      <div></div>
      <ADropdownStatic
        :data="listCategory"
        title="By category"
        :current-selected="currentCategory"
        @change="onSelectCategory"
      />
      <ADropdownStatic
        :data="condition"
        type="radio"
        title="Condition"
        :current-selected="currentCondition"
        @change="onSelectCondition"
      />
    </div>
  </div>
</template>
<script setup>
import ADropdownStatic from '@/components/commons/atoms/ADropdownStatic.vue'
import { computed, ref, watch, onBeforeMount } from 'vue'
import { useMasterStore } from '@/stores/master.store'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const routeQuery = computed(() => route.query)
const masterStore = useMasterStore()
const currentCategory = ref([])
const currentCondition = ref(null)

watch(
  () => routeQuery.value,
  () => {
    try {
      handleRoute()
    } catch (error) {
      console.log('error', error)
    }
  }
)

const handleRoute = () => {
  const { category, condition } = routeQuery.value
  currentCategory.value = category && Array.isArray(category) ? category : category ? [category] : []
  currentCondition.value = condition
}
onBeforeMount(() => {
  handleRoute()
})

defineEmits(['update:modelValue'])
const listCategory = computed(() => masterStore.state.categories)
const condition = ref([
  {
    id: 1,
    name: 'New',
  },
  {
    id: 2,
    name: 'Used',
  },
  {
    id: 3,
    name: 'Like new',
  },
])

const onSelectCategory = (value) => {
  const newQuery = { ...route.query, category: value }
  router.push({ name: 'search', query: newQuery })
}

const onReset = () => {
  const keyword = route.query.keyword
  router.push({ name: 'search', query: { keyword } })
}

const onSelectCondition = (value) => {
  const newQuery = { ...route.query, condition: value }
  router.push({ name: 'search', query: newQuery })
}
</script>
