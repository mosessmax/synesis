<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit">
            <div class="grid items-center w-full gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="email">Matric Number</Label>
                <Input id="email" v-model="matricNumber" placeholder="Enter your Matric Number" />
                </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="email">Email</Label>
                <Input id="email" v-model="email" placeholder="Enter your email" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="password">Password</Label>
                <Input id="password" v-model="password" type="password" placeholder="Enter your password" />
              </div>
            </div>
            <Button class="w-full mt-6" :disabled="isLoading">
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </Button>
          </form>
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button variant="link" @click="$router.push('/register')">
            Don't have an account?
          </Button>
          <Button variant="link">Forgot password?</Button>
        </CardFooter>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
  import { Label } from '@/components/ui/label'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { useToast } from '@/components/ui/toast'
  import apiService from '/src/services/api.js'
  
  const router = useRouter()
  const { toast } = useToast()
  const matricNumber = ref('')
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  

  const handleSubmit = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    // const response = await login(email.value, password.value)
    // save the token to localStorage
    // localStorage.setItem('token', response.token)
    await apiService.auth.login(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred during login';
  } finally {
    isLoading.value = false;
  }
};
    
  </script>