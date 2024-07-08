<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white">
        <div class="p-4">
          <h1 class="text-2xl font-bold">CBT System</h1>
        </div>
        <nav class="mt-4">
          <RouterLink
            to="/dashboard"
            class="block px-4 py-2 hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            Dashboard
          </RouterLink>
          <RouterLink
          to="/results"
          class="block px-4 py-2 hover:bg-gray-700"
          active-class="bg-gray-700"
        >
          Results
        </RouterLink>
          <button
            @click="logout"
            class="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Logout
          </button>
        </nav>
      </aside>
  
      <!-- Main content -->
      <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900">
              {{ $route.name }}
            </h1>
          </div>
        </header>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <RouterView />
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { RouterLink, useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const logout = () => {
    // Clear authentication token
    localStorage.removeItem('token')
    // Redirect to login page
    router.push('/login')
  }
  </script>