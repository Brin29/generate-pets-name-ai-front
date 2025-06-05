<script setup lang="ts">
import FooterComponent from './FooterComponent.vue';
import HeaderComponent from './HeaderComponent.vue';

</script>

<template>
  <HeaderComponent />
  <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Pet Name Generator</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Find the perfect name for your furry, feathered, or scaled friend!
        Tell us about your pet and we'll generate amazing name suggestions.
      </p>
    </div>

    <!-- Generator Form -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
      <form id="name-generator-form" onsubmit="generateNames(event)">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Pet Type -->
          <div>
            <label for="petType" class="block text-sm font-medium text-gray-700 mb-2">
              What type of pet do you have?
            </label>
            <select id="petType" name="petType" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="hamster">Hamster</option>
              <option value="fish">Fish</option>
              <option value="reptile">Reptile</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Pet Gender -->
          <div>
            <label for="petGender" class="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select id="petGender" name="petGender"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <!-- Pet Size -->
          <div>
            <label for="petSize" class="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select id="petSize" name="petSize"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Any size</option>
              <option value="tiny">Tiny</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="giant">Giant</option>
            </select>
          </div>

          <!-- Name Style -->
          <div>
            <label for="nameStyle" class="block text-sm font-medium text-gray-700 mb-2">
              Name Style
            </label>
            <select id="nameStyle" name="nameStyle"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Any style</option>
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="unique">Unique</option>
              <option value="funny">Funny</option>
              <option value="elegant">Elegant</option>
              <option value="strong">Strong</option>
              <option value="cute">Cute</option>
            </select>
          </div>
        </div>

        <!-- Pet Description -->
        <div class="mb-6">
          <label for="petDescription" class="block text-sm font-medium text-gray-700 mb-2">
            Describe your pet (optional)
          </label>
          <textarea id="petDescription" name="petDescription" rows="3"
            placeholder="Tell us about your pet's personality, appearance, or any special traits..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"></textarea>
        </div>

        <!-- Name Preferences -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Name Preferences (check all that apply)
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="short"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Short names</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="long"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Long names</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="human"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Human names</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="nature"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Nature-inspired</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="food"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Food names</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="mythology"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Mythology</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="celebrity"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">Celebrity names</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="preferences" value="international"
                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700">International</span>
            </label>
          </div>
        </div>

        <!-- Generate Button -->
        <div class="text-center">
          <button type="submit" id="generate-btn"
            class="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <span id="generate-text">Generate Names</span>
            <svg id="loading-spinner" class="hidden animate-spin ml-2 h-5 w-5 text-white inline"
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

    <!-- Results Section -->
    <div id="results-section" class="hidden">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Generated Names</h3>
          <button onclick="generateNames(event)"
            class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
            Generate More
          </button>
        </div>

        <div id="names-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Generated names will be inserted here -->
        </div>

        <!-- Regenerate Section -->
        <div class="mt-8 text-center">
          <p class="text-gray-600 mb-4">Not finding the perfect name? Try adjusting your preferences or generating more
            options!</p>
          <div class="flex justify-center space-x-4">
            <button onclick="clearResults()"
              class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
              Clear Results
            </button>
            <button onclick="generateNames(event)"
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors">
              Generate Different Names
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Favorites Section -->
    <div id="favorites-section" class="hidden mt-8">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Your Favorite Names</h3>
        <div id="favorites-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Favorite names will be inserted here -->
        </div>
      </div>
    </div>
  </main>

  <FooterComponent/>
</template>