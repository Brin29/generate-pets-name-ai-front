<script setup>
  import { ref, computed, nextTick, onMounted, reactive } from 'vue';
import AuthServices from '../service/authService';

  const authService = new AuthServices()
  const otpDigits = ref(Array(6).fill(''))
  const hasError = ref(false)
  const errorMessage = ref('')
  const otpInputs = ref([])
  const timeLeft = ref(1200)
  const initialTime = ref(1200)
  const canResend = ref(false)
  const attemptCount = ref(0)
  const maxAttempts = ref(5)
  const isLoading = ref(false)
  const isResending = ref(false)
  const resendCount = ref(0)

  let timer = null

  const user_data = JSON.parse(localStorage.getItem('user'))
  const email = user_data.email
  
  const isOTPComplete = computed(() => {
    return otpDigits.value.every(digit => digit !== '' && /^\d$/.test(digit))
  })

  const handleInput = (index, event) => {
    const value = event.target.value
    
    // Only Allow digits
    if (!/^\d*$/.test(value)) {
      event.target.value = otpDigits.value[index]
      return
    }

    otpDigits.value[index] = value

    if (value && index < 6 - 1) {
      nextTick(() => {
        otpInputs.value[index + 1]?.focus()
      })
    }

    if (isOTPComplete.value) {
      setTimeout(() => {
        verifyOTP()
      }, 100)
    }
  }

  const handleKeydown = (index, event) => {
    if (event.key === 'Backspace'){
      if (!otpDigits.value[index] && index > 0){
        otpInputs.value[index - 1]?.focus()
        otpDigits.value[index - 1] = ''
      }
      else {
        otpDigits.value[index] = ''
      }
    }

    // Handle arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      otpInputs.value[index - 1]?.focus()
    }
    if (event.key === 'ArrowRight' && index < 6 - 1) {
      otpInputs.value[index + 1]?.focus()
    }

    // Handle Enter key
    if (event.key === 'Enter' && isOTPComplete.value) {
      verifyOTP()
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pastedData = event.clipboardData.getData('text').replace(/\D/g, '')
    
    if (pastedData.length === 6) {
      for (let i = 0; i < 6; i++) {
        otpDigits.value[i] = pastedData[i] || ''
      }
      
      // Focus last input
      nextTick(() => {
        otpInputs.value[6 - 1]?.focus()
      })

      // Auto-verify if complete
      if (isOTPComplete.value) {
        setTimeout(() => {
          verifyOTP()
        }, 100)
      }
    }
  }

  const verifyOTP = async () => {
    if (!isOTPComplete.value || isLoading.value || timeLeft.value === 0) return
    
    const oneTimePassword = otpDigits.value.join("")
    isLoading.value = true;
    clearError()

    try {
      await authService.otpService({ otp:oneTimePassword })
      localStorage.removeItem('user')
    }
    catch (error) {
      attemptCount.value++
      hasError.value = true

      if (attemptCount.value >= maxAttempts.value){
        errorMessage.value = 'Too many failed attempts. Account temporarily locked.'
      }
      else {
        errorMessage.value = error.message || 'Invalid verification code. Please try again.'
      }

      otpDigits.value = Array(6).fill('')
      nextTick(() => {
        otpInputs.value[0]?.focus()
      })
    }
    finally {
      isLoading.value = false;
    }
  }

  const resend = async () => {
    if (isResending.value) return
    isResending.value = true

    try {
      await authService.registerService(user_data)
      timeLeft.value = initialTime.value
      resendCount.value++
      canResend.value = false
      clearError()

      otpDigits.value = Array(6).fill('')
      nextTick(() => {
        otpInputs.value[0]?.focus()
      })

      startTimer()
    }
    catch (error) {
      errorMessage.value = error.message || 'Invalid verification code. Please try again.'
    }
    finally {
      isResending.value = false
    }
  }

  const clearError = () => {
    hasError.value = false
    errorMessage.value = ''
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        stopTimer()
        canResend.value = true
      }
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(() => {
    startTimer()
    nextTick(() => {
      otpInputs.value[0]?.focus()
    })
  })

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
          <span class="font-medium text-gray-900">{{ email }}</span>
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-lg rounded-lg">
        <form @submit.prevent="verifyOTP" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter 6-digit verification code
            </label>
            <div class="flex justify-center space-x-3">
              <input
                v-for="(digit, index) in otpDigits"
                :key="index"
                :ref="el => otpInputs[index] = el"
                v-model="otpDigits[index]"
                @input="handleInput(index, $event)"
                @keydown="handleKeydown(index, $event)"
                @paste="handlePaste($event)"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                :class="{
                  'border-red-500 focus:ring-red-500 focus:border-red-500': hasError,
                  'border-green-500 focus:ring-green-500 focus:border-green-500': isVerified,
                  'bg-gray-100': isLoading
                }"
                :disabled="isLoading || isVerified"
                autocomplete="off"
              />
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="errorMessage" class="text-center">
            <div class="bg-red-50 border border-red-200 rounded-lg p-3">
              <div class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="isVerified" class="text-center">
            <div class="bg-green-50 border border-green-200 rounded-lg p-3">
              <div class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-sm text-green-700">Verification successful!</p>
              </div>
            </div>
          </div>

          <!-- Timer and Resend -->
          <div class="text-center">
            <div v-if="timeLeft > 0" class="text-sm text-gray-600 mb-3">
              <div class="flex items-center justify-center space-x-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Code expires in {{ formatTime(timeLeft) }}</span>
              </div>
              <div class="mt-2 bg-gray-200 rounded-full h-1">
                <div 
                  class="bg-indigo-600 h-1 rounded-full transition-all duration-1000"
                  :style="{ width: `${(timeLeft / initialTime) * 100}%` }"
                ></div>
              </div>
            </div>

            <div v-else class="text-sm text-red-600 mb-3">
              <div class="flex items-center justify-center space-x-2">
                <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Code has expired</span>
              </div>
            </div>

            <button
              v-if="timeLeft === 0 || canResend"
              @click="resend"
              :disabled="isResending"
              type="button"
              class="text-indigo-600 hover:text-indigo-500 font-medium text-sm focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isResending" class="flex items-center space-x-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Sending...</span>
              </span>
              <span v-else>Resend Code</span>
            </button>

            <p v-if="resendCount > 0" class="text-xs text-gray-500 mt-1">
              Code resent {{ resendCount }} time{{ resendCount > 1 ? 's' : '' }}
            </p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="!isOTPComplete || isLoading || isVerified || timeLeft === 0"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              {{ isLoading ? 'Verifying...' : isVerified ? 'Verified!' : 'Verify Code' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>