<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { useToast } from 'vue-toastification'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import LoaderVue from '@/components/Loader/LoaderVue.vue'

const toast = useToast()
const form = ref({
  email: '',
  password: ''
})
const loading = ref(false) // Loader state

const formReset = () => {
  form.value = {
    email: '',
    password: ''
  }
}

const handlesubmit = async () => {
  console.log(form.value)
  loading.value = true // Start loading
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_ENDPOINT}login`, form.value)

    const userData = response.data.user
    const token = response.data.token

    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)

    toast.success('Login Successfully', {
      timeout: 1500
    })

    formReset()
    router.push('/')
    useAuthStore().userName = response.data.user.name
    console.log(response.data.user.name.slice(1))
  } catch (error) {
    toast.error('Error in signing in', {
      timeout: 3000
    })
    console.error(error)
  } finally {
    loading.value = false // Stop loading
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen p-6 bg-gradient-to-r to-[#f29f67] from-[#F4F5F7]"
  >
    <DefaultAuthCard title="Sign In to BOK">
      <form>
        <InputGroup label="Email" type="email" placeholder="Enter your email" v-model="form.email">
          <!-- SVG Icon here -->
        </InputGroup>

        <InputGroup
          label="Password"
          type="password"
          placeholder="6+ Characters, 1 Capital letter"
          v-model="form.password"
        >
          <!-- SVG Icon here -->
        </InputGroup>

        <div class="mb-5 mt-6">
          <button
            type="submit"
            @click.prevent="handlesubmit"
            :disabled="loading"
            class="w-full flex items-center justify-center cursor-pointer rounded-lg bg-[#1e1e2c] p-2 font-medium text-[#f29f67] transition hover:bg-[#f29f67] hover:text-[#1e1e2c]"
          >
            <LoaderVue v-if="loading" class="mr-2" />
            <span v-if="!loading">Sign In</span>
            <span v-else>Processing...</span>
          </button>
        </div>

        <div class="mt-6 text-center">
          <p class="font-medium">
            Don’t have any account?
            <router-link to="/auth/signup" class="text-[#1e1e2c] hover:text-[#f29f67] font-bold"
              >Sign up</router-link
            >
          </p>
        </div>
      </form>
    </DefaultAuthCard>
  </div>
</template>
