<!-- src/views/Dashboard.vue -->
<template>
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Tests</CardTitle>
          <CardDescription>Tests you can take right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="availableTests.length" class="space-y-4">
            <div v-for="test in availableTests" :key="test.id" class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium">{{ test.title }}</h3>
                <p class="text-sm text-gray-500">Duration: {{ test.duration }} minutes</p>
              </div>
              <Button @click="startTest(test.id)">Start Test</Button>
            </div>
          </div>
          <div v-else>
            <p>No tests available at the moment.</p>
          </div>
        </CardContent>
      </Card>
  
      <Card>
        <CardHeader>
          <CardTitle>Past Results</CardTitle>
          <CardDescription>Your performance in previous tests</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="pastResults.length" class="space-y-4">
            <div v-for="result in pastResults" :key="result.id" class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium">{{ result.testTitle }}</h3>
                <p class="text-sm text-gray-500">Score: {{ result.score }}%</p>
              </div>
              <Button variant="outline" @click="viewResult(result.id)">View Details</Button>
            </div>
          </div>
          <div v-else>
            <p>You haven't taken any tests yet.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import { useUserStore } from '@/store/user'

  
  const router = useRouter()
  const userStore = useUserStore()
  
  const availableTests = ref([])
  const pastResults = ref([])
  
  onMounted(async () => {
    if (!userStore.isLoggedIn) {
      router.push('/login')
      return
    }
  
  })
  
  const startTest = (testId) => {
    router.push(`/test/${testId}`)
  }
  
  const viewResult = (resultId) => {
    router.push(`/results/${resultId}`)
  }
  </script>