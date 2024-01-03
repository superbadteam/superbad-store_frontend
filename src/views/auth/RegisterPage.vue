<template>
  <div class="max-md:gap-3 max-md:flex-col min-h-screen h-screen flex">
    <div class="max-md:h-[250px] lg:flex-auto bg-[#191a24] flex items-center px-10">
      <img class="w-full h-full object-cover opacity-[60%]" src="@/assets/icons/travel.svg" alt="" />
    </div>
    <div class="max-md:w-full w-[45%] flex justify-start">
      <div class="max-md:w-full w-[80%] flex flex-col items-center justify-center h-full px-10">
        <div class="w-full flex flex-col items-center justify-center">
          <p class="text-3xl font-bold">Register</p>
          <p class="text-base font-medium mt-2">Register and explore the online market</p>
        </div>
        <div class="w-full flex flex-col items-center justify-center mt-10">
          <div class="w-full">
            <AInput
              v-model="email"
              label="Email"
              name="email"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Enter your email..."
              type="email"
            />
          </div>
          <div class="w-full mt-5">
            <AInput
              v-model="name"
              name="name"
              label="Name"
              style-custom="border-[#AFA2C3]"
              is-required
              placeholder="Enter your name..."
            />
          </div>
          <div class="w-full mt-5">
            <AInput
              v-model="password"
              name="password"
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
              name="confirmPassword"
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
            <button class="bg-[#3E334E] text-white flex-[1] w-full py-3 font-bold rounded-lg" @click="onRegister">
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
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { registerApi } from '@/services/auth.service'
import { toast } from 'vue3-toastify'
import AInput from '@/components/commons/atoms/AInput.vue'
const router = useRouter()

const submit = async (val) => {
  const { email, password, name, confirmPassword } = val
  try {
    await registerApi({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
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

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
        'Password must contain at least 8 characters, 1 number and 1 letter'
      ),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
})

const onRegister = () => {
  handleSubmit(submit)()
}
</script>
