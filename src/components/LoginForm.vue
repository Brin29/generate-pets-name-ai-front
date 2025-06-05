<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import router from '..';
import googleAuth from '../utils/GoogleAuth';
import AuthServices from '../service/authService';

const authLogin = new AuthServices();
const data = ref({});
const err = ref("");
const loader = ref(false);

const loginUser = reactive({
  email: '',
  password: ''
})

const login = async () => {
  loader.value = true;
  try {
    const response = await authLogin.loginService(loginUser)
    data.value = response;
    router.push({ name: 'Profile' })
  }
  catch (error) {
    err.value = error;
  }
  finally {
    loader.value = false;
  }
}

const handleSignInWithGoogle = async response => {
  if (response.error) {
    // Set Error
  }

  else {
    const payload = response.credential
    const server_res = await axios.post('http://localhost:8000/auth/v1/google-login/', { 'access_token': payload })
    const user_res = server_res.data;
    const user = {
      'email': user_res.email,
      'full_name': user_res.full_name
    }
    if (server_res.status === 200) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('access', JSON.stringify(user_res.access_token))
      localStorage.setItem('refresh', JSON.stringify(user_res.refresh_token))
      router.push({ name: 'Profile' })
    }
  }
}

onMounted(() => {
  googleAuth(handleSignInWithGoogle)
})

</script>

<template>
  <div class="max-w-md w-full space-y-8 m-auto">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <RouterLink to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          create a new account
        </RouterLink>
      </p>
    </div>

    <div class="flex items-center justify-center">
      <div id="signInDiv"></div>
    </div>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
      </div>
    </div>

    <!-- Login Form -->
    <form class="mt-8 space-y-6" @submit.prevent="login">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input id="email" name="email" v-model="loginUser.email" type="email" autocomplete="email" required
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Enter your email address">
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="relative">
            <input id="password" name="password" v-model="loginUser.password" type="password"
              autocomplete="current-password" required
              class="mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password">
            <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg id="eye-icon" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button type="submit" id="login-btn"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
          <span id="login-text">Sign in</span>
          <svg id="loading-spinner" class="hidden animate-spin ml-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 100-16 8 8 0 000 16zm3.707-9.293A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </button>
      </div>
    </form>
  </div>

</template>