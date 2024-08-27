<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <Card class="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit">
            <div class="grid items-center w-full gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="number">Matric Number</Label>
                <Input id="number" v-model="matricNumber" placeholder="Enter your matric number" required />
                </div>
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Name</Label>
                <Input id="name" v-model="name" required placeholder="Enter your name" />
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
  // import { useToast } from '@/components/ui/toast'
  import { Toaster, toast } from 'vue-sonner'
  import apiService from '/src/services/api.js';
  
  const router = useRouter()
  const matricNumber = ref('') 
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const isLoading = ref(false);

  const validateForm = () => {
  let missingFields = [];
  if (!name.value) missingFields.push("Name");
  if (!matricNumber.value) missingFields.push("Matric Number");
  if (!email.value) missingFields.push("Email");
  if (!password.value) missingFields.push("Password");
  if (!confirmPassword.value) missingFields.push("Confirm Password");

  if (missingFields.length > 0) {
    toast({
      title: 'Missing Fields',
      description: `Please fill in the following fields: ${missingFields.join(', ')}.`,
      status: 'error',
      variant: 'destructive',
      duration: 5000,
      isClosable: true
    });
    return false;
  }

  if (password.value !== confirmPassword.value) {
    toast({
      title: "Passwords don\'t match",
      description: "Please ensure the passwords match.",
      status: 'error',
      variant: 'destructive',
      duration: 3000,
      isClosable: true
    });
    return false;
  }

  return true;
};
// if i need more validation, i'll add more here  

  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    isLoading.value = true;
    try {
      await apiService.auth.register(name.value, matricNumber.value, email.value, password.value)
      toast({
        title: 'success',
        description: 'registration successful. please login.',
        status: 'success',
        variant: 'destructive',
        duration: 3000,
        isClosable: true
      })
      // await register(name.value, email.value, password.value)
      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
      toast({
        title: 'error',
        description: 'registration failed. please check try again.',
        status: 'error',
        variant: 'destructive',
        duration: 3000,
        isClosable: true
      })
    } finally {
      isLoading.value = false
    }
  }
  </script>