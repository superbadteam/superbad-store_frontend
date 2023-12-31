<template>
  <div class="max-md:gap-3 max-md:flex-col min-h-screen h-screen flex">
    <div class="max-md:h-[250px] lg:flex-auto bg-[#191a24] flex items-center px-10">
      <img class="w-full h-full object-cover opacity-[60%]" src="@/assets/icons/travel.svg" alt="" />
    </div>
    <div class="max-md:w-full w-[45%] flex justify-start">
      <div class="max-md:w-full w-[80%] flex flex-col items-center justify-center h-full px-10">
        <div class="w-full flex flex-col items-center justify-center">
          <p class="text-3xl font-bold">Login</p>
          <p class="text-base font-medium mt-2">Login to your account</p>
        </div>
        <div class="w-full flex flex-col items-center justify-center mt-10">
          <div class="w-full">
            <AInput
              v-model="email"
              label="Email"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Enter your email..."
              type="email"
            />
          </div>
          <div class="w-full mt-5">
            <AInput
              v-model="name"
              label="Name"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Enter your name..."
            />
          </div>
          <div class="w-full mt-5">
            <AInput
              v-model="password"
              label="Password"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Nhập mật khẩu..."
              type="password"
            />
          </div>
          <div class="w-full mt-5">
            <AInput
              v-model="confirmPassword"
              label="Confirm password"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Nhập mật khẩu..."
              type="password"
            />
          </div>
          <!-- forgot -->
          <div class="w-full flex justify-end mt-2">
            <RouterLink to="/forgot-password" class="text-[#3E334E] text-sm font-medium">Forgot password?</RouterLink>
          </div>
          <div class="w-full flex gap-3 mt-5">
            <button class="bg-[#3E334E] text-white flex-[1] w-full py-3 font-bold rounded-lg" @click="submit">
              Sign up
            </button>
            <RouterLink
              to="/login"
              class="block text-center border-[1px] border-[#3E334E] text-[#3E334E] flex-[1] w-full font-bold py-3 rounded-lg"
            >
              Login
            </RouterLink>
          </div>
          <!-- copyright -->
          <div class="w-full flex justify-center mt-5">
            <p class="text-[#3E334E] text-sm font-medium">© 2021 superbadstore</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerApi } from '@/services/auth.service'
import { toast } from 'vue3-toastify'
import AInput from '@/components/commons/atoms/AInput.vue'
const router = useRouter()
const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')

const submit = async () => {
  try {
    await registerApi({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      name: name.value,
    }).then((res) => {
      console.log(res)
      toast.success('Register success!')
      router.push('/login')
    })
  } catch (error) {
    console.log(error)
    toast.error('Register failed!')
  }
}
</script>
