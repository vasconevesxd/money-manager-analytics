<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { TimeframeType } from '@/types/index.types';
  import InputDatepicker from '@/components/datepicker/InputDatepicker.vue';
  import type { CustomDateRange } from './types/index.types';

  const emit = defineEmits<{
    (e: 'update:customDateRangeSelected', value: CustomDateRange): void;
  }>();

  const props = defineProps<{
    timeframe: TimeframeType;
    customDateRange: CustomDateRange;
  }>();

  const customDateRangeSelected = ref<CustomDateRange>({
    start: props.customDateRange.start,
    end: props.customDateRange.end,
  });

  watch(
    customDateRangeSelected,
    (newDataRange) => {
      emit('update:customDateRangeSelected', newDataRange);
    },
    { deep: true }
  );
</script>

<template>
  <div v-if="timeframe === 'custom'" class="mt-4 p-4 bg-muted rounded-md">
    <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div class="flex flex-col space-y-2">
        <InputDatepicker
          v-model="customDateRangeSelected.start"
          :max-date="customDateRangeSelected.end"
          label="Start Date"
          class="px-3 py-2 border rounded-md"
        />
      </div>
      <div class="flex flex-col space-y-2">
        <InputDatepicker
          v-model="customDateRangeSelected.end"
          :min-date="customDateRangeSelected.start"
          label="End Date"
          class="px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  </div>
</template>
