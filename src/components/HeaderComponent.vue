<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const user = ref({})
const showDropdown = ref(false)
const signOutModal = ref(false);

user.value = JSON.parse(localStorage.getItem('user'))

const toggleDropdwon = () => {
  showDropdown.value = !showDropdown.value;
}

const signOutToggle = () => {
  signOutModal.value = !signOutModal.value
}

const signOut = () => {
}


</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-4">
          <RouterLink to="/home" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <!-- Pet Icon -->
            <div class="bg-indigo-600 p-2 rounded-lg">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Pets Name</h1>
              <p class="text-xs text-gray-500 hidden sm:block">Find the perfect name for your pet</p>
            </div>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink to="/home"
            class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            Home
          </RouterLink>
          <RouterLink to="/generate-name"
            class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            Name Generator
          </RouterLink>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">

          <!-- User Profile Dropdown -->
          <div @click="toggleDropdwon" class="relative">
            <button
              class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span class="hidden md:block text-gray-700 font-medium">{{ user.full_name || user.first_name +
                user.last_name }}</span>
              <svg class="hidden md:block w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- User Dropdown Menu -->
            <div id="user-dropdown" v-if="showDropdown"
              class="absolute right-0 mt-2 w-68 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div class="py-1">
                <div class="px-4 py-2 border-b border-gray-200">
                  <p class="text-sm font-medium text-gray-900">{{ user.full_name }}</p>
                  <p class="text-xs text-gray-500">{{ user.email }}</p>
                </div>
                <RouterLink to="/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="mr-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </RouterLink>
                <div class="border-t border-gray-200"></div>
                <button @click="signOutToggle"
                  class="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg class="mr-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button onclick="toggleMobileMenu()"
            class="md:hidden p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md">
            <svg id="mobile-menu-icon" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Search Bar (Hidden by default) -->
      <div id="search-bar" class="hidden border-t border-gray-200 py-4">
        <div class="relative">
          <input type="text" placeholder="Search pet names..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="index.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
            Home
          </a>
          <a href="browse.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
            Browse Names
          </a>
          <a href="generator.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
            Name Generator
          </a>
          <a href="favorites.html"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
            My Favorites
          </a>
          <div class="border-t border-gray-200 pt-2">
            <a href="profile.html"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              View Profile
            </a>
            <a href="settings.html"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              Settings
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <div v-if="!signOutModal" id="exit-modal"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Are you sure you want to leave?</h3>
        <p class="text-sm text-gray-600 mb-6">
          If you leave now, any unsaved information will be lost. Do you want to continue?
        </p>
        <div class="flex justify-center space-x-4">
          <button @click="signOutToggle"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Cancel
          </button>
          <button @click="confirmExit"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Leave
          </button>
        </div>
      </div>
    </div>
  </div>
</template>