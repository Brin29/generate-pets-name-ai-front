<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <div class="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Cambiar contraseña
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-8">
          <form @submit.prevent="changePassword" class="space-y-6"> 
            <div>
              <label class="block text-sm font-medium text-gray-700">
              Contraseña actual </label>
                <div class="mt-1 relative">
                  <input
                  id="current-password"
                  v-model="currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': currentPasswordError }"
                  placeholder="Ingresa tu contraseña actual"
                  @input="currentPasswordError = ''"/>
                  
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  ></button>
                </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">
              Contraseña actual </label>
                <div class="mt-1 relative">
                  <input
                  id="current-password"
                  v-model="currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': currentPasswordError }"
                  placeholder="Ingresa tu contraseña actual"
                  @input="currentPasswordError = ''"/>
                  
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  ></button>
                </div>
            </div>
          <div class="mt-4 bg-gray-50 rounded-lg p-4">
            <p class="text-sm font-medium text-gray-700 mb-3">Requisitos de contraseña:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="flex items-center space-x-2">
                <span class="text-sm">
                  Mínimo 8 caracteres
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm">
                   Una mayúscula (A-Z)
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm">
                   Una minúscula (a-z)
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm">
                   Una numero (0-9)
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm">
                   Carácter especial (!@#$...)
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm">
                  Diferente a la actual
                </span>
              </div>
            </div>
                        <div class="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                type="button"
                @click="cancelChange"
                class="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="!isFormValid || isLoading"
                class="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Cambiando contraseña...' : 'Cambiar contraseña' }}
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>