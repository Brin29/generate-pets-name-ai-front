<template>
  <HeaderComponent/>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search names..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Sort -->
          <select
            v-model="sortBy"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="name">Sort by Name</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="style">Sort by Style</option>
          </select>

          <!-- Filter -->
          <select
            v-model="filterBy"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Styles</option>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="unique">Unique</option>
            <option value="strong">Strong</option>
            <option value="cute">Cute</option>
            <option value="elegant">Elegant</option>
            <option value="nature">Nature</option>
            <option value="mythology">Mythology</option>
          </select>

          <!-- Results count -->
          <div class="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
            <span class="text-sm text-gray-600">
              {{ filteredNames.length }} of {{ responseData.totalGenerated }} names
            </span>
          </div>
        </div>
      </div>

      <!-- Names Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="nameData in filteredNames"
          :key="nameData.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <!-- Name Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ nameData.pet_name }}</h3>
              <p v-if="nameData.small_meaning" class="text-sm text-gray-600 italic">"{{ nameData.small_meaning }}"</p>
            </div>
          </div>

          <!-- Origin and Popularity -->
          <div class="space-y-2 mb-4">
            <div v-if="nameData.origin" class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Origin:</span>
              <span class="font-medium text-gray-700">{{ nameData.origin }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Popularity:</span>
              <span :class="['px-2 py-1 rounded-full text-xs font-medium', getPopularityColor(nameData.popularity_percentage_number)]">
                {{ nameData.popularity_percentage_number }}%
              </span>
            </div>
          </div>

          <!-- Style Tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="(style, index) in nameData.style.slice(0, 2)"
              :key="index"
              :class="['px-2 py-1 rounded-full text-xs font-medium', getStyleBadgeColor(style)]"
            >
              {{ style }}
            </span>
            <span
              v-if="nameData.style.length > 2"
              class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
            >
              +{{ nameData.style.length - 2 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredNames.length === 0" class="text-center py-12">
        <div class="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No names found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search or filter criteria to see more results.</p>
        <button
          @click="clearFilters"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderComponent from './HeaderComponent.vue'

// Reactive data
const responseData = ref({
  petType: 'dog',
  petGender: 'male',
  petSize: 'medium',
  nameStyle: 'classic',
  totalGenerated: 24,
  generatedAt: new Date().toISOString(),
  names: []
})

const searchTerm = ref('')
const sortBy = ref('name')
const filterBy = ref('all')
const favorites = ref([])
const petsNames = JSON.parse(localStorage.getItem('petsName'))

// const mockNames = 
const mockNames = petsNames

// Computed properties
const filteredNames = computed(() => {
  let filtered = [...responseData.value.names]

  // Apply search filter
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(
      (name) =>
        name.name.toLowerCase().includes(search) ||
        name.meaning?.toLowerCase().includes(search) ||
        name.origin?.toLowerCase().includes(search)
    )
  }

  // Apply style filter
  if (filterBy.value !== 'all') {
    filtered = filtered.filter((name) => name.style.includes(filterBy.value))
  }

  // Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'popularity':
        return b.popularity - a.popularity
      case 'style':
        return a.style[0].localeCompare(b.style[0])
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

const clearFilters = () => {
  searchTerm.value = ''
  filterBy.value = 'all'
}

const getPopularityColor = (popularity) => {
  if (popularity >= 90) return 'bg-green-100 text-green-800'
  if (popularity >= 80) return 'bg-blue-100 text-blue-800'
  if (popularity >= 70) return 'bg-yellow-100 text-yellow-800'
  return 'bg-gray-100 text-gray-800'
}

const getStyleBadgeColor = (style) => {
  const colors = {
    classic: 'bg-blue-100 text-blue-800',
    modern: 'bg-purple-100 text-purple-800',
    unique: 'bg-indigo-100 text-indigo-800',
    strong: 'bg-red-100 text-red-800',
    cute: 'bg-pink-100 text-pink-800',
    elegant: 'bg-emerald-100 text-emerald-800',
    nature: 'bg-green-100 text-green-800',
    mythology: 'bg-amber-100 text-amber-800',
    friendly: 'bg-orange-100 text-orange-800',
    simple: 'bg-gray-100 text-gray-800',
    short: 'bg-cyan-100 text-cyan-800',
  }
  return colors[style] || 'bg-gray-100 text-gray-800'
}

// Lifecycle
onMounted(() => {
  responseData.value.names = mockNames
  
  // Load favorites from localStorage
  const savedFavorites = JSON.parse(localStorage.getItem('petNameFavorites') || '[]')
  favorites.value = savedFavorites
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>