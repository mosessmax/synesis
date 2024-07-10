<script setup>
   import { ref, onMounted } from 'vue'
   import { useRoute } from 'vue-router'
   import apiService from '/src/services/api.js';

   const route = useRoute()
   const useApiService = apiService()

   const testId = route.params.id
   const result = ref(null)

   const fetchResult = async () => {
     result.value = await apiService.getTestResult(testId)
   }

   onMounted(fetchResult)
   </script>

   <template>
     <div v-if="result">
       <h1>Test Result</h1>
       <p>Score: {{ result.score }}</p>
       <p>Time Taken: {{ result.timeTaken }}</p>
       <div v-for="question in result.questions" :key="question.id">
         <h3>{{ question.text }}</h3>
         <p>Your Answer: {{ question.userAnswer }}</p>
         <p>Correct Answer: {{ question.correctAnswer }}</p>
       </div>
     </div>
   </template>