<template>
    <div class="container p-4 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Test Results</h1>
      <div v-if="loading">Loading results...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div class="mb-6">
          <h2 class="mb-2 text-xl font-semibold">{{ result.testTitle }}</h2>
          <p>Score: {{ result.score }} / {{ result.totalQuestions }}</p>
          <p>Percentage: {{ (result.score / result.totalQuestions * 100).toFixed(2) }}%</p>
          <p>Time Taken: {{ formatTime(result.timeTaken) }}</p>
        </div>
        
        <div v-for="(question, index) in result.questions" :key="question.id" class="p-4 mb-6 border rounded">
          <h3 class="mb-2 text-lg font-semibold">Question {{ index + 1 }}</h3>
          <p class="mb-2">{{ question.text }}</p>
          <div v-for="option in question.options" :key="option.id" class="mb-1">
            <div :class="{
              'text-green-600': option.id === question.correctAnswerId,
              'text-red-600': option.id === question.userAnswerId && option.id !== question.correctAnswerId,
              'font-bold': option.id === question.userAnswerId || option.id === question.correctAnswerId
            }">
              {{ option.text }}
              <span v-if="option.id === question.userAnswerId">(Your answer)</span>
              <span v-if="option.id === question.correctAnswerId">(Correct answer)</span>
            </div>
          </div>
          <div v-if="question.explanation" class="mt-2 text-gray-600">
            <strong>Explanation:</strong> {{ question.explanation }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import apiService from '@/services/api.js'
  import { Notivue, Notification, Push } from 'notivue';

  const route = useRoute()
  const result = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }
  
  const fetchTestResult = async () => {
    try {
      const response = await apiService.test.getDetailedResult(route.params.id)
      result.value = response.data
    } catch (err) {
      error.value = 'Failed to load test results. Please try again.'
      console.error('Error fetching test result:', err)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchTestResult)
  </script>