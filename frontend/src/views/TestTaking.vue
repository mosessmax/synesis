<script setup>
   import { ref, onMounted } from 'vue'
   import { useRoute } from 'vue-router'
   import { Button } from '@/components/ui/button'
   import apiService from '/src/services/api.js';

   const route = useRoute()
   const useApiService = apiService()

   const testId = route.params.id
   const currentQuestion = ref(0)
   const questions = ref([])
   const answers = ref({})
   const testStarted = ref(false)

   const startTest = async () => {
     const testData = await apiService.startTest(testId)
     questions.value = testData.questions
     testStarted.value = true
   }

   const submitAnswer = (questionId, answer) => {
     answers.value[questionId] = answer
   }

   const submitTest = async () => {
     await apiService.submitTest(testId, answers.value)
     // Redirect to results page or show completion message
   }

   onMounted(startTest)
   </script>

   <template>
     <div v-if="testStarted">
       <div v-for="(question, index) in questions" :key="question.id" v-show="currentQuestion === index">
         <h2>{{ question.text }}</h2>
         <div v-for="option in question.options" :key="option.id">
           <Button @click="submitAnswer(question.id, option.id)">{{ option.text }}</Button>
         </div>
       </div>
       <Button @click="currentQuestion--" :disabled="currentQuestion === 0">Previous</Button>
       <Button @click="currentQuestion++" :disabled="currentQuestion === questions.length - 1">Next</Button>
       <Button @click="submitTest">Submit Test</Button>
     </div>
   </template>