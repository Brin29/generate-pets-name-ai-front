<script setup>
import { ref } from 'vue';

const passwordModal = ref(false);

const changePasswordToggle = () => {
  passwordModal.value = !passwordModal.value;
}

</script>

<template>
  <button @click="changePasswordToggle"
    class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    Change Password
  </button>

  <!-- Change Password Modal -->
  <div v-if="passwordModal" id="password-modal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <form onsubmit="handlePasswordChange(event)">
          <div class="space-y-4">
            <div>
              <label for="current-password" class="block text-sm font-medium text-gray-700">Current Password</label>
              <input type="password" id="current-password" name="current-password" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="new-password" class="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" id="new-password" name="new-password" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
            <div>
              <label for="confirm-new-password" class="block text-sm font-medium text-gray-700">Confirm New
                Password</label>
              <input type="password" id="confirm-new-password" name="confirm-new-password" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="changePasswordToggle"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>