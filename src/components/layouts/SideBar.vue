<template>
  <div class="w-[270px] min-w-[270px]">
    <div class="fixed flex flex-col top-[90px] left-0 h-[calc(100vh-90px)] w-[270px] bg-white border-r-2 z-[60]">
      <!-- header info -->
      <div class="flex p-4 border-b-[1px]">
        <img class="w-[40px] h-[40px] rounded-full" src="@/assets/images/avatar-default.jpg" alt="" />
        <div class="flex flex-col ml-3">
          <span class="text-base font-bold">John Doe</span>
          <span class="text-xs text-secondary">
            <i class="ri-map-pin-2-fill"></i>
            <span class="ml-1">Hanoi, Vietnam</span>
          </span>
        </div>
      </div>
      <!-- end header info -->
      <!-- menu -->
      <div class="flex flex-col justify-between flex-auto gap-3 px-5 py-5 pb-1">
        <!-- <span class="font-semibold text-lg text-[#5a4098]"><i class="ri-home-line"></i> Dashboard</span> -->
        <div class="flex flex-col gap-2 text-base text-secondary">
          <RouterLink to="/dashboard/create-product" class="bg-[#f1f1f1] px-2 py-1 rounded-md text-[#535964]"
            ><i class="ri-shopping-bag-3-fill text-2xl mr-3"></i>Create new product</RouterLink
          >
          <span class="px-2 py-1 rounded-md"><i class="ri-handbag-fill text-2xl mr-3"></i>Manage products</span>
          <RouterLink to="/dashboard/profile-settings" class="px-2 py-1 rounded-md"><i class="ri-user-fill text-2xl mr-3"></i>Your profile</RouterLink>
          <span class="px-2 py-1 rounded-md"><i class="ri-settings-2-fill text-2xl mr-3"></i>Setting account</span>
        </div>
        <div class="cursor-pointer pb-1">
          <div class="border-b-[1px] mb-1"></div>
          <span class="flex items-center py-2 rounded-md hover:bg-[#f1f1f1] px-2 font-semibold text-base text-secondary"
            >Logout <i class="ri-logout-box-r-line"></i
          ></span>
        </div>
      </div>
      <!-- end menu -->
    </div>
  </div>
</template>
