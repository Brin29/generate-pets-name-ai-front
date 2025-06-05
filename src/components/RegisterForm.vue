<script setup>
  import axios from 'axios';
  import { onMounted, reactive, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import router from '..';
  import googleAuth from '../utils/GoogleAuth';
  import AuthServices from '../service/authService';

  const authRegister = new AuthServices();
  const data = ref({});
  const err = ref("");
  const loader = ref(false);

  const registerUser = reactive({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''    
  })

  const register = async () => {
    loader.value = true;

    try {
      const response = await authRegister.registerService(registerUser)
      data.value = response;
      router.push({ name: 'Login' })
    }
    catch(error){
      err.value = error;
    }
    finally {
      loader.value = false;
    }
  }

  const handleSignInWithGoogle = async (response) => {
    if (response.error) {
      // Set Error
    }

    else {
      const payload = response.credential
      const server_res = await axios.post('http://localhost:8000/auth/v1/google-register/', { 'access_token':payload })
      const user_res = server_res.data;
      const user = {
        'email': user_res.email,
        'full_name': user_res.full_name
      }
      if (server_res.status === 200){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('access', JSON.stringify(user_res.access_token))
        localStorage.setItem('refresh',  JSON.stringify(user_res.refresh_token))
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
          Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <RouterLink  to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          sign in to your existing account
        </RouterLink>
      </p>
    </div>
    
    <form class="mt-8 space-y-6" @submit.prevent="register">
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input 
              id="firstName" 
              name="firstName"
              v-model="registerUser.first_name"
              type="text" 
              required 
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="First Name"
            >
        </div>
            
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text"
            v-model="registerUser.last_name"
            required 
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="Last Name"
          >
        </div>
            
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email"
              v-model="registerUser.email"
              required 
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Email address"
            >
        </div>
            
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="new-password"
              v-model="registerUser.password"
              required 
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Password"
            >
        </div>

        <div>
          <label for="password2" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input 
            id="password2" 
            name="password2" 
            type="password" 
            autocomplete="new-password"
            v-model="registerUser.password2"
            required 
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
            placeholder="Confirm Password"
          >
        </div>
      </div>

      <div class="flex items-center">
        <input 
          id="terms" 
          name="terms" 
          type="checkbox" 
          required 
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        >
        <label for="terms" class="ml-2 block text-sm text-gray-900">
          I agree to the 
          <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
          and 
          <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
        </label>
      </div>

      <div>
        <button 
          type="submit" 
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Account
        </button>
      </div>
    </form>

    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div class="flex items-center justify-center">
        <div id="signInDiv"></div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div id="message" class="hidden mt-4 p-4 rounded-md"></div>
</div>
</template>