<script setup lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
  import { Skeleton } from '@/components/ui/skeleton';

  defineProps<{
    title: string;
    description: string;
    value: number | string;
    isLoading: boolean;
    error: unknown;
    valueClass?: string;
  }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="flex items-center">
        <Skeleton class="w-full h-5" />
      </div>
      <div v-else-if="error" class="text-destructive">Error loading data</div>
      <div v-else class="text-2xl font-bold" :class="valueClass">
        {{ value }}
      </div>
    </CardContent>
  </Card>
</template>
