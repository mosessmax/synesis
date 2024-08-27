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
                <Label for="number">Matric Number</Label>
                <Input id="number" v-model="matricNumber" placeholder="Enter your Matric Number" />
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
  import { Toaster, toast } from 'vue-sonner';
  import apiService from '/src/services/api.js'
  
  const router = useRouter()
  const matricNumber = ref('')
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  
  const validateForm = () => {
    const missingFields = []
    if (!matricNumber.value) missingFields.push('matricNumber')
    if (!email.value) missingFields.push('email')
    if (!password.value) missingFields.push('password')
    if (missingFields.length > 0) {
      toast.error('Missing fields', {
        description: `Please fill in the missing fields: ${missingFields.join(', ')}.`,
      })
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;
  isLoading.value = true;
  try {
    const response = await apiService.auth.login(matricNumber.value, email.value, password.value)
    localStorage.setItem('token', response.token)
    toast.success('Login successful', {
  description: 'Redirecting to dashboard...',
})
    router.push('/dashboard')
  } catch (err) {
   toast.error('Login Error', {
  description: 'Invalid credentials',
})
    } finally {
    isLoading.value = false;
  }
};
    
  </script>