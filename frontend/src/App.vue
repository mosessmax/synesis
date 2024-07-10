<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Button } from './components/ui/button';
import { Toaster, toast } from 'vue-sonner';
</script>

<template>
  
  <RouterView />
<Toaster />

<button @click="() => toast({ title: 'Hello', description: 'This is a toast message' })">Show Toast</button>

  <!-- <div class="container py-8">
    <Button>click me</Button>
  </div> -->

</template>

<style scoped>

</style>
