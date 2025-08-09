<script setup lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">Categories</CardTitle>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
