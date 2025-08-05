<script setup lang="ts">
  // Third-party imports
  import { ref, watch } from 'vue';

  // Local imports
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
  import type { TimeframeType } from '@/types';

  const props = defineProps<{
    timeframe: TimeframeType;
  }>();

  const emit = defineEmits<{
  (e: 'update:timeframe', value: TimeframeType): void;
  }>();

  const timeframe = ref<TimeframeType>(props.timeframe);

  watch(timeframe, (newVal) => {
    emit('update:timeframe', newVal);
  });
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Spent & Saved</h2>
    <Tabs v-model="timeframe" class="w-full">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      <TabsContent :value="timeframe">
          <slot name="panels" :timeframe="timeframe" />
      </TabsContent>
    </Tabs>
  </section>
</template>

