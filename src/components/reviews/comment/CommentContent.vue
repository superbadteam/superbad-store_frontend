<template>
  <div class="flex gap-3">
    <div>
      <LazyImg
        class-style="w-[50px] min-w-[50px] h-[50px] rounded-full object-cover"
        src="https://picsum.photos/200/300"
      />
    </div>
    <div class="flex-auto flex-col">
      <div class="flex justify-between">
        <p class="font-semibold">Nguyen Van A</p>
        <p class="text-gray-400">2 days ago</p>
      </div>
      <div class="flex items-center gap-1">
        <i class="ri-star-fill text-yellow-500"></i>
        <i class="ri-star-fill text-yellow-500"></i>
        <i class="ri-star-fill text-yellow-500"></i>
        <i class="ri-star-fill text-yellow-500"></i>
        <i class="ri-star-fill text-yellow-500"></i>
        <span class="text-gray-400">(5/5)</span>
      </div>
      <p class="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
      </p>
    </div>
  </div>
</template>
