<script setup lang="ts">
import FooterComponent from './FooterComponent.vue';
import HeaderComponent from './HeaderComponent.vue';

</script>

<template>
  <HeaderComponent />
  <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
            AI-Powered Pet Naming
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the
            <span className="text-indigo-600"> Perfect Name</span>
            <br />
            for Your Pet
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover thousands of unique, meaningful, and creative names for your furry, feathered, or scaled
            friends. Our AI-powered generator creates personalized suggestions based on your pet's personality and
            your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/generator"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
              Start Generating Names
            </a>
          </div>
        </div>
        <div className="relative">
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-center">
              <div className="text-6xl mb-4">🐕</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Meet "Charlie"</h3>
              <p className="text-gray-600 mb-4">Perfect name for a friendly Golden Retriever</p>
              <div className="flex justify-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Classic</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Friendly</span>
              </div>
            </div>
          </div>
          <div
            className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold transform -rotate-12">
            AI Generated!
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Pets Name?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We've built the most comprehensive and intelligent pet naming platform to help you find the perfect name
          for your beloved companion.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
        <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="flex justify-center mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </div>
        ))}
      </div>
    </div>
  </section>
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Names for Every Pet</h2>
        <p className="text-xl text-gray-600">
          From traditional pets to exotic companions, we have names for all types of animals.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {petTypes.map((pet, index) => (
        <div key={index}
          className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-4xl mb-3">{pet.icon}</div>
          <h3 className="font-semibold text-gray-900 mb-1">{pet.name}</h3>
          <p className="text-sm text-gray-600">{pet.count}</p>
        </div>
        ))}
      </div>
    </div>
  </section>

  {/* How It Works Section */}
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600">Get personalized pet name suggestions in just three simple steps.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-indigo-600">1</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Tell Us About Your Pet</h3>
          <p className="text-gray-600">
            Share your pet's type, size, personality, and any preferences you have for their name.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-green-600">2</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Get AI Suggestions</h3>
          <p className="text-gray-600">
            Our intelligent algorithm generates personalized name suggestions with meanings and origins.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-purple-600">3</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose & Save</h3>
          <p className="text-gray-600">
            Browse suggestions, save your favorites, and find the perfect name for your companion.
          </p>
        </div>
      </div>
    </div>
  </section>
  <FooterComponent/>

</template>