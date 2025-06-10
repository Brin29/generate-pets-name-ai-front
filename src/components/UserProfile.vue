<script setup>
import { onMounted, reactive, ref } from "vue";
import UserServices from "../service/userService";
import HeaderComponent from "./HeaderComponent.vue";
import ChangePasswordComponent from "./ChangePasswordComponent.vue";

const userService = new UserServices();
const editEnabled = ref(false);
const data = ref({});
const err = ref("");

onMounted(async () => {
  try {
    const response = await userService.myUserService();
    console.log(response)
    data.value = response;
  } catch (error) {
    err.value = error;
  }
});


const editToggle = () => {
  editEnabled.value = !editEnabled.value
}

const editUser = async () => {
  try{
    await userService.editUserService(data);
  }
  catch(error){
    console.log(error)
  }
}
 
</script>

<template>
  <HeaderComponent />
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Profile Header -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-8">
        <div class="flex items-center space-x-6">
          <div class="relative">
          </div>
          <div class="flex-1">
            <h2 id="profile-name" class="text-2xl font-bold text-gray-900">
              John Doe
            </h2>
            <p id="profile-email" class="text-gray-600">john.doe@example.com</p>
            <p class="text-sm text-gray-500 mt-1">Member since March 2024</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="editToggle"
              id="edit-btn"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Profile Information -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Personal Information
            </h3>
          </div>
          <div class="px-6 py-6">
            <form id="profile-form" @submit.prevent="editUser">
              <div v-if="!editEnabled" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700"
                    >First Name</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    v-model="data.first_name"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    v-model="data.last_name"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div class="md:col-span-2">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="data.email"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
              
              <!-- Enabled -->
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700"
                    >First Name</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    v-model="data.first_name"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    v-model="data.last_name"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div class="md:col-span-2">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="data.email"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div id="form-actions" class="mt-6 flex gap-4">
                  <button type="button" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    Cancel
                  </button>
                  <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Save Changes
                  </button>
                </div>
              </div>    
            </form>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white shadow rounded-lg mt-8">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Security Settings</h3>
          </div>
          <div class="px-6 py-6 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Password</h4>
                <p class="text-sm text-gray-500">Change your password</p>
              </div>
              <div v-if="data.auth_provider !== 'google'">
                <ChangePasswordComponent />
              </div>
              <div v-else>
                <div
                  class="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 cursor-not-allowed focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Change Password
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <!-- Account Stats -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Account Statistics
            </h3>
          </div>
          <div class="px-6 py-6 space-y-4">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Account Status</span>
              <div v-if="data.is_active">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Active
                </span>
              </div>
              <div v-else>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  Unactive
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Connected Accounts -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              Connected Accounts
            </h3>
          </div>
          <div class="px-6 py-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span class="text-sm font-medium text-gray-900">Google</span>
              </div>
              <div v-if="data.auth_provider == 'google'">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Connected
                </span>
              </div>
              <div v-else>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  Unconnected
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div class="px-6 py-6 space-y-3">
            <button
              onclick="deleteAccount()"
              class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>