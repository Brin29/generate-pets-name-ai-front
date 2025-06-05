<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Profile Information -->
      <div class="lg:col-span-2">
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Personal Information</h3>
          </div>
          <div class="px-6 py-6">
            <form id="profile-form" onsubmit="saveProfile(event)">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" 
                    id="firstName" 
                    name="firstName" 
                    value="John"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500">
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" 
                    id="lastName" 
                    name="lastName" 
                    value="Doe"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500">
                </div>
                <div class="md:col-span-2">
                  <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" 
                    id="email" 
                    name="email" 
                    value="john.doe@example.com"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500">
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" 
                    id="phone" 
                    name="phone" 
                    value="+1 (555) 123-4567"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500">
                </div>
                <div>
                  <label for="birthDate" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input type="date" 
                    id="birthDate" 
                    name="birthDate" 
                    value="1990-01-15"
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500">
                </div>
                <div class="md:col-span-2">
                  <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea id="bio" 
                    name="bio" 
                    rows="4" 
                    disabled
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Tell us about yourself...">Software developer passionate about creating amazing user experiences. Love coding, coffee, and continuous learning.</textarea>
                </div>
              </div>
                      
              <div id="form-actions" class="hidden mt-6 flex justify-end space-x-3">
                <button type="button" 
                  onclick="cancelEdit()"
                  class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"> Cancel
                </button>
                <button type="submit"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"> Save Changes
                </button>
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
                <p class="text-sm text-gray-500">Last changed 3 months ago</p>
              </div>
              <button onclick="changePassword()" 
                  class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Change Password
              </button>
            </div>
                
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button onclick="toggle2FA()" 
                id="2fa-btn"
                class="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Enable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <!-- Account Stats -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Account Statistics</h3>
          </div>
          <div class="px-6 py-6 space-y-4">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Profile Views</span>
              <span class="text-sm font-medium text-gray-900">1,234</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Last Login</span>
              <span class="text-sm font-medium text-gray-900">2 hours ago</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Account Status</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

          <!-- Connected Accounts -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Connected Accounts</h3>
          </div>
          <div class="px-6 py-6 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-sm font-medium text-gray-900">Google</span>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              </div>
            
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  <span class="text-sm font-medium text-gray-900">Twitter</span>
                </div>
                <button class="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  Connect
                </button>
              </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div class="px-6 py-6 space-y-3">
            <button onclick="downloadData()" 
              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Download My Data
            </button>
            <button onclick="exportProfile()" 
              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                Export Profile
            </button>
            <button onclick="deleteAccount()" 
              class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>