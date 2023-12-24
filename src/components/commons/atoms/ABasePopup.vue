<template>
  <div class="p-7 h-fit bg-white gb-shadow rounded-3xl flex flex-col justify-center items-center">
    <p class="text-lg font-semibold">Please confirm your email to create product</p>
    <p class="text-sm text-primary-200">We have sent you an email to confirm your email</p>
    <p class="text-sm text-primary-200">If you don't see the email, please check your spam folder</p>
    <p class="text-sm text-primary-200">If you still don't see the email, please contact us</p>
    <!-- button -->
    <AButton title="Resend email" class="mt-5 w-fit text-white bg-blue-500">
      <template #left>
        <i class="ri-mail-send-line mr-2"></i>
      </template>
    </AButton>
  </div>
</template>
