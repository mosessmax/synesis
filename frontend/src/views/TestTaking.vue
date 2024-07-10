<template>
    <div class="container p-4 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">{{ test.title }}</h1>
      <div v-if="!testStarted">
        <Button @click="startTest">Start Test</Button>
      </div>
      <div v-else-if="!testSumitted">
        <div v-for="(question, index) in test.questions" :key="question.id" class="mb-6">
          <h2 class="mb-2 text-lg font-semibold">Question {{ index + 1 }}</h2>
          <p class="mb-2">{{ question.text }}</p>
          <div v-for="option in question.options" :key="option.id" class="mb-1">
            <label class="flex items-center">
              <input
                type="radio"
                :name="question_ + question.id"
                :value="option.id"
                v-model="answers[question.id]"
                class="mr-2" />
  
              {{ option.text }}
            </label>
          </div>
        </div>
  
        <Button @lclick="submitTest" :disabled="!allQuestionsAnswered">Submit Test</Button>
      </div>
      <div v-else>
        <h2 class="text-xl font-semibold">Test Submitted</h2>
        <p>
          Thank you for taking the test. You can view your results once they are available.
        </p>
      </div>
    </div>
  </template>
  

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import apiService from "/src/services/api.js";

const route = useRoute();
const toast = useToast();
// const useApiService = apiService();

const test = ref({})
const answers = ref({})
const testStarted = ref(false)
const testSumitted = ref(false)

const allQuestionsAnswered = computed(() => {
  return test.value.questions &&
  test.value.questions.every(q => answers.value[q?.id] !== undefined)
})

const startTest = async () => {
    if (!allQuestionsAnswered.value) {
        toast({
            title: "Error",
            description: "failed to start the test, please try again.",
            variant: 'desctruvtive',
        })
    }
}

const submitTest = async () => {
    if (!allQuestionsAnswered.value) {
        toast({
            title: "Warning",
            description: "Please answer all questions before submitting the test.",
            variant: 'destructive',
        })
        return
    }

    try {
    await apiService.submitTest(test.id, answers.value)
    testSumitted.value = true
    toast({
        title: "Success",
        description: "Test submitted successfully.",
        variant: 'success',
    })
    setTimeout(()=>{
        router.push(`/results/${test.id}`)
    }, 3000)
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to submit the test, please try again.",
            variant: 'destructive',
        })
    }
}
// const testId = route.params.id;
// const currentQuestion = ref(0);
// const questions = ref([]);
// const answers = ref({});
// const testStarted = ref(false);

// const startTest = async () => {
//   const testData = await apiService.startTest(testId);
//   questions.value = testData.questions;
//   testStarted.value = true;
// };

// const submitAnswer = (questionId, answer) => {
//   answers.value[questionId] = answer;
// };

// const submitTest = async () => {
//   await apiService.submitTest(testId, answers.value);
//   // Redirect to results page or show completion message
// };

// onMounted(startTest);
// fetch the test details when the component is mounted
onMounted(async () => {
  const testId = route.params.id
  const response = await apiService.getTestDetails(testId)
  test.value = response.data
})

</script>
