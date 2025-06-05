<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Generated Pet Names</h1>
            <p class="text-gray-600 mt-1">
              {{ responseData.totalGenerated }} names for your {{ responseData.petSize }} {{ responseData.petGender }} {{ responseData.petType }}
            </p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="regenerateNames"
              :disabled="isLoading"
              class="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              <svg :class="['w-4 h-4', { 'animate-spin': isLoading }]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ isLoading ? 'Generating...' : 'Generate More' }}</span>
            </button>
            <button
              v-if="favorites.length > 0"
              @click="exportFavorites"
              class="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Favorites</span>
            </button>
          </div>
        </div>
      </div>
    </div>

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
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ nameData.name }}</h3>
              <p v-if="nameData.meaning" class="text-sm text-gray-600 italic">"{{ nameData.meaning }}"</p>
            </div>
            <button
              @click="toggleFavorite(nameData.id, nameData.name)"
              class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <svg
                :class="['w-5 h-5', favorites.includes(nameData.name) ? 'text-red-500 fill-current' : 'text-gray-400']"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <!-- Origin and Popularity -->
          <div class="space-y-2 mb-4">
            <div v-if="nameData.origin" class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Origin:</span>
              <span class="font-medium text-gray-700">{{ nameData.origin }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Popularity:</span>
              <span :class="['px-2 py-1 rounded-full text-xs font-medium', getPopularityColor(nameData.popularity)]">
                {{ nameData.popularity }}%
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

          <!-- Actions -->
          <div class="flex space-x-2">
            <button
              @click="copyName(nameData.name)"
              class="flex-1 flex items-center justify-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors text-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </button>
            <button
              @click="shareName(nameData.name)"
              class="flex-1 flex items-center justify-center space-x-1 bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>Share</span>
            </button>
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

      <!-- Favorites Summary -->
      <div v-if="favorites.length > 0" class="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2 fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Your Favorites ({{ favorites.length }})
          </h3>
          <button
            @click="exportFavorites"
            class="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-colors"
          >
            Export List
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(favName, index) in favorites.slice(0, 10)"
            :key="index"
            class="bg-white border border-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ favName }}
          </span>
          <span
            v-if="favorites.length > 10"
            class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            +{{ favorites.length - 10 }} more
          </span>
        </div>
      </div>
    </div>

    <!-- Toast Message -->
    <div
      v-if="showToast"
      class="fixed top-4 right-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 z-50 transform transition-all duration-300"
      :class="{ 'translate-x-0': showToast, 'translate-x-full': !showToast }"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              :class="['h-6 w-6', toastType === 'success' ? 'text-green-400' : toastType === 'error' ? 'text-red-400' : 'text-blue-400']"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="toastType === 'success'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                v-else-if="toastType === 'error'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{{ toastMessage }}</p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="hideToast"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

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
const isLoading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Mock data
const mockNames = [
  {
    id: '1',
    name: 'Max',
    meaning: 'Greatest',
    origin: 'Latin',
    popularity: 95,
    style: ['classic', 'strong'],
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Charlie',
    meaning: 'Free man',
    origin: 'English',
    popularity: 88,
    style: ['classic', 'friendly'],
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Cooper',
    meaning: 'Barrel maker',
    origin: 'English',
    popularity: 82,
    style: ['modern', 'strong'],
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Buddy',
    meaning: 'Friend',
    origin: 'American',
    popularity: 90,
    style: ['classic', 'cute'],
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Rocky',
    meaning: 'Rock',
    origin: 'Italian',
    popularity: 85,
    style: ['strong', 'classic'],
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Bear',
    meaning: 'Bear-like',
    origin: 'English',
    popularity: 78,
    style: ['nature', 'strong'],
    isFavorite: false,
  },
  {
    id: '7',
    name: 'Duke',
    meaning: 'Leader',
    origin: 'Latin',
    popularity: 80,
    style: ['elegant', 'strong'],
    isFavorite: false,
  },
  {
    id: '8',
    name: 'Zeus',
    meaning: 'God of sky',
    origin: 'Greek',
    popularity: 75,
    style: ['mythology', 'strong'],
    isFavorite: false,
  },
  {
    id: '9',
    name: 'Tucker',
    meaning: 'Fabric pleater',
    origin: 'English',
    popularity: 72,
    style: ['modern', 'friendly'],
    isFavorite: false,
  },
  {
    id: '10',
    name: 'Jack',
    meaning: 'God is gracious',
    origin: 'English',
    popularity: 92,
    style: ['classic', 'simple'],
    isFavorite: false,
  },
  {
    id: '11',
    name: 'Oliver',
    meaning: 'Olive tree',
    origin: 'Latin',
    popularity: 87,
    style: ['classic', 'elegant'],
    isFavorite: false,
  },
  {
    id: '12',
    name: 'Leo',
    meaning: 'Lion',
    origin: 'Latin',
    popularity: 83,
    style: ['strong', 'short'],
    isFavorite: false,
  },
  {
    id: '13',
    name: 'Milo',
    meaning: 'Soldier',
    origin: 'Germanic',
    popularity: 79,
    style: ['modern', 'cute'],
    isFavorite: false,
  },
  {
    id: '14',
    name: 'Bentley',
    meaning: 'Meadow with grass',
    origin: 'English',
    popularity: 76,
    style: ['elegant', 'modern'],
    isFavorite: false,
  },
  {
    id: '15',
    name: 'Toby',
    meaning: 'God is good',
    origin: 'Hebrew',
    popularity: 81,
    style: ['classic', 'friendly'],
    isFavorite: false,
  },
  {
    id: '16',
    name: 'Atlas',
    meaning: 'Bearer of heavens',
    origin: 'Greek',
    popularity: 68,
    style: ['mythology', 'unique'],
    isFavorite: false,
  },
  {
    id: '17',
    name: 'Finn',
    meaning: 'Fair',
    origin: 'Irish',
    popularity: 74,
    style: ['modern', 'short'],
    isFavorite: false,
  },
  {
    id: '18',
    name: 'Ace',
    meaning: 'One',
    origin: 'Latin',
    popularity: 70,
    style: ['modern', 'strong'],
    isFavorite: false,
  },
  {
    id: '19',
    name: 'Scout',
    meaning: 'To listen',
    origin: 'French',
    popularity: 65,
    style: ['nature', 'unique'],
    isFavorite: false,
  },
  {
    id: '20',
    name: 'Ranger',
    meaning: 'Forest guardian',
    origin: 'French',
    popularity: 67,
    style: ['nature', 'strong'],
    isFavorite: false,
  },
  {
    id: '21',
    name: 'Phoenix',
    meaning: 'Rising bird',
    origin: 'Greek',
    popularity: 63,
    style: ['mythology', 'unique'],
    isFavorite: false,
  },
  {
    id: '22',
    name: 'Storm',
    meaning: 'Tempest',
    origin: 'English',
    popularity: 61,
    style: ['nature', 'strong'],
    isFavorite: false,
  },
  {
    id: '23',
    name: 'Sage',
    meaning: 'Wise one',
    origin: 'Latin',
    popularity: 69,
    style: ['nature', 'elegant'],
    isFavorite: false,
  },
  {
    id: '24',
    name: 'River',
    meaning: 'Stream of water',
    origin: 'English',
    popularity: 66,
    style: ['nature', 'modern'],
    isFavorite: false,
  },
]

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

// Methods
const toggleFavorite = (nameId, nameName) => {
  const index = favorites.value.indexOf(nameName)
  
  if (index > -1) {
    favorites.value.splice(index, 1)
    showToastMessage(`${nameName} removed from favorites`, 'info')
  } else {
    favorites.value.push(nameName)
    showToastMessage(`${nameName} added to favorites`, 'success')
  }
  
  localStorage.setItem('petNameFavorites', JSON.stringify(favorites.value))
}

const copyName = async (name) => {
  try {
    await navigator.clipboard.writeText(name)
    showToastMessage(`"${name}" copied to clipboard!`, 'success')
  } catch (err) {
    showToastMessage('Failed to copy name', 'error')
  }
}

const shareName = async (name) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Pet Name Suggestion',
        text: `Check out this pet name: ${name}`,
        url: window.location.href
      })
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    copyName(name)
  }
}

const regenerateNames = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    showToastMessage('New names generated!', 'success')
  }, 2000)
}

const exportFavorites = () => {
  const favoriteNames = responseData.value.names.filter((name) => favorites.value.includes(name.name))
  const exportData = {
    exportDate: new Date().toISOString(),
    petInfo: {
      type: responseData.value.petType,
      gender: responseData.value.petGender,
      size: responseData.value.petSize,
      style: responseData.value.nameStyle,
    },
    favoriteNames: favoriteNames.map((name) => ({
      name: name.name,
      meaning: name.meaning,
      origin: name.origin,
      popularity: name.popularity,
    })),
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'pet-name-favorites.json'
  link.click()
  URL.revokeObjectURL(url)
  
  showToastMessage('Favorites exported successfully!', 'success')
}

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

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  
  setTimeout(() => {
    hideToast()
  }, 3000)
}

const hideToast = () => {
  showToast.value = false
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