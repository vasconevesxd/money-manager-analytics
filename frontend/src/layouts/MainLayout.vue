<script setup lang="ts">
  import Navbar from '@/components/layout/Navbar.vue';
  import Footer from '@/components/layout/Footer.vue';
  import { Toaster } from 'vue-sonner';
  import 'vue-sonner/style.css';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Toaster position="top-right" />

    <Navbar />

    <!-- Main content -->
    <main class="container flex-1 py-6 mx-auto">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
