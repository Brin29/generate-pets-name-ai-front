<script setup>
  import { ref } from 'vue'
import AuthServices from '../service/authService'

  const authService = new AuthServices();
  const email = ref('');
  const isLoading = ref(false);

  const handleForm = async () => {
    isLoading.value = true;
    try {
      const res = await authService.forgetPassword({'email': email.value});
      console.log(res);
    }
    catch(error){
      console.error(error);
    }
    finally{
      email.value = '';
      isLoading.value = false;
    }
  }
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
          <svg class="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
        </div>  
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Recover Password
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your email address to receive instructions
          </p>
      </div>

      <div class="bg-white py-8 px-6 shadow rounded-lg">
        <form @submit.prevent="handleForm">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1 relative">
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              placeholder="test@ejemptlo.com"
            />
          </div>

          <div class="mt-6">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Enviando...' : 'Enviar' }}
              </button>
          </div>
        </form>
        
      </div>
        <div class="text-center">
          <div class="space-y-2">
            <p class="text-sm text-gray-600">
              ¿Do you remember your password?
              <RouterLink to="/login" class="font-medium text-rose-600 hover:text-rose-500">
                Sign In
              </RouterLink>
            </p>
          </div>
        </div>
    </div>
  </div>
</template>