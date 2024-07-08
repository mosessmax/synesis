<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit">
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Name</Label>
                <Input id="name" v-model="name" placeholder="Enter your name" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="email">Email</Label>
                <Input id="email" v-model="email" placeholder="Enter your email" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="password">Password</Label>
                <Input id="password" v-model="password" type="password" placeholder="Create a password" />
              </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password" />
              </div>
            </div>
            <Button class="w-full mt-6" :disabled="isLoading">
              {{ isLoading ? 'Registering...' : 'Register' }}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" class="w-full" @click="$router.push('/login')">
            Already have an account? Login
          </Button>
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
  // API service here
  // import { register } from '@/services/api'
  
  const router = useRouter()
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const isLoading = ref(false)
  
  const handleSubmit = async () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match")
      return
    }
    
    isLoading.value = true
    try {
      // register API here
      // await register(name.value, email.value, password.value)
      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      // error handling () error message to user)
    } finally {
      isLoading.value = false
    }
  }
  </script>