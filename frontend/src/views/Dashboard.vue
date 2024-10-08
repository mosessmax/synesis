<template>
  <div class="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Available Tests</CardTitle>
        <CardDescription>Tests you can take right now</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="availableTests.length" class="space-y-4">
          <div v-for="test in availableTests" :key="test.id" class="flex items-center justify-between">
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
          <div v-for="result in pastResults" :key="result.id" class="flex items-center justify-between">
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
    <div v-if="!testStarted">
        <Button @click="startTest">Start Test</Button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/user'

// import { fetchAvailableTests, fetchPastResults } from '@/services/api'
import api from '@/services/api'

const router = useRouter()
const userStore = useUserStore()

const availableTests = ref([])
const pastResults = ref([])

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }

  try {
    const [testsResponse, resultsResponse] = await Promise.all([
      api.getAvailableTests(),
      api.getTestResults()
    ]);
    availableTests.value = testsResponse.data;
    pastResults.value = resultsResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
}
});

const startTest = async (testId) => {
  try {
    await api.startTest(testId);
    router.push(`/test/${testId}`);
  } catch (error) {
    console.error('Error starting test:', error);
  }
};

const viewResult = (resultId) => {
  router.push(`/results/${resultId}`)
}
</script>