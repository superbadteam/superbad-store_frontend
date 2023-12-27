<template>
  <div class="min-h-screen h-screen relative">
    <!-- <div ref="googleLoginBtn" class=""></div> -->
    <!-- <div ref="googleLoginBtn" /> -->
    <div class="h-full flex flex-col w-full">
      <div class="flex-1 bg-[#0089ED] w-full h-full"></div>
      <div class="flex-1"></div>
    </div>

    <div class="absolute top-0 left-0 w-full h-full flex justify-between items-center p-7 px-12 overflow-y-auto">
      <div></div>
      <div class="w-[500px] bg-white rounded-[30px] gb-shadow p-7 h-fit">
        <!-- header -->
        <div class="flex justify-between">
          <div class="">
            <p class="text-xl">Welcome to our shop</p>
            <p class="text-[50px] font-medium">Sign Up</p>
          </div>
          <div class="text-[#0089ED] text-sm font-bold cursor-pointer">Login</div>
        </div>
        <!-- end header -->

        <!-- form -->
        <div class="mt-10">
          <form class="mt-7" @submit.prevent="submit">
            <div class="flex flex-col gap-7">
              <div>
                <label for="email" class="text-sm">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="text"
                  class="w-full border border-[#E5E5E5] rounded-[8px] p-3 mt-2"
                />
              </div>
              <div>
                <label for="name" class="text-sm">Name</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  class="w-full border border-[#E5E5E5] rounded-[8px] p-3 mt-2"
                />
              </div>
              <div>
                <label for="email" class="text-sm">Password</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="w-full border border-[#E5E5E5] rounded-[8px] p-3 mt-2"
                />
              </div>
            </div>
            <p>
              <a href="" class="text-[#0089ED] text-sm font-bold mt-3 block">Forgot password?</a>
            </p>
            <div class="mt-7">
              <button
                type="button"
                class="w-full bg-[#0089ED] text-white rounded-[8px] p-3 font-bold text-lg"
                @click="submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <router-link class="text-center pt-4 block" to="/login">
            <p>Have account yet? <span class="text-[#0089ED] font-bold">Sign in</span></p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { initAuthStore } from '@/stores'
import { registerApi } from '@/services/auth.service'
// import { useNotification } from '@kyvg/vue3-notification'
// const notification = useNotification()
const router = useRouter()
const email = ref('')
const password = ref('')
const name = ref('')

const submit = async () => {
  try {
    await registerApi({ email: email.value, password: password.value, name: name.value }).then((res) => {
      // const data = res['data']
      // localStorage.setItem('access_token', data.tokens.access.token)
      // localStorage.setItem('refresh_token', data.tokens.refresh.token)
    })
    // await initAuthStore()
    // router.push('/')
  } catch (error) {
    console.log(error)
    // notification.notify({
    //   type: 'error',
    //   title: 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập',
    //   text: error.response.data.message,
    // })
    console.log(error)
  }
}
</script>
