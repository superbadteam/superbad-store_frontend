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
              name="email"
              label="Email"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Nhập email..."
            />
          </div>
          <div class="w-full mt-5">
            <AInput
              name="password"
              label="Mật khẩu"
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
            <button class="bg-[#3E334E] text-white flex-[1] w-full py-3 font-bold rounded-lg" @click="onLogin">
              Login
            </button>
            <RouterLink
              to="/register"
              class="block text-center border-[1px] border-[#3E334E] text-[#3E334E] flex-[1] w-full font-bold py-3 rounded-lg"
            >
              Sign up
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
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { initAuthStore } from '@/stores'
import { loginApi } from '@/services/auth.service'
import AInput from '@/components/commons/atoms/AInput.vue'
import { toast } from 'vue3-toastify'
const router = useRouter()

const submit = async (val) => {
  console.log(val)
  const { email, password } = val
  try {
    await loginApi({ email, password }).then((res) => {
      const data = res['data']
      console.log(data)
      localStorage.setItem('access_token', data.token.accessToken)
      localStorage.setItem('refresh_token', data.token.refreshToken)
    })
    await initAuthStore()
    const redirect = localStorage.getItem('redirect')
    if (redirect) {
      router.push(redirect)
    } else {
      router.push('/')
      localStorage.removeItem('redirect')
    }
  } catch (error) {
    console.log(error)
    toast.error('Login failed, please check your login information')
  }
}

// validate password have min 8, have number vs uppercase
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
        'Password must contain at least 8 characters, 1 number and 1 letter'
      ),
  }),
})

const onLogin = () => {
  handleSubmit(submit)()
}
</script>
