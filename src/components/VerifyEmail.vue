<script setup>
  import { ref } from 'vue';

  const user = JSON.parse(localStorage.getItem('user'))
  const username = ref(user.email);
  console.log(username)

</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Verify Your Account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          We've sent a verification code to
          <span class="font-medium text-gray-900">{{ username }}</span>
        </p>
      </div>
    </div>
  </div>
</template>