<script setup lang="ts">
  import { computed } from 'vue';
  import dayjs from 'dayjs';
  import { CalendarIcon } from 'lucide-vue-next';
  import { cn } from '@/lib/utils';
  import { Button } from '@/components/ui/button';
  import { Calendar } from '@/components/ui/calendar';
  import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import type { DateValue } from '@internationalized/date';

  // Define props with TypeScript
  const props = defineProps<{
    modelValue: string | undefined;
    label: string;
  }>();

  // Define emits for v-model support
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void;
  }>();

  // Computed property for display date
  const displayDate = computed(() => {
    return props.modelValue ? dayjs(props.modelValue).format('MMMM D, YYYY') : 'Pick a date';
  });

  // Handle date selection from Calendar
  const handleDateSelect = (date: DateValue | undefined) => {
    if (!date) return;
    const formattedDate = date.toString();
    emit('update:modelValue', formattedDate);
  };
</script>

<template>
  <FormField v-slot="{ field }" name="dob">
    <FormItem class="flex flex-col">
      <FormLabel>{{ label }}</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="outline"
              :class="
                cn('w-[240px] ps-3 text-start font-normal', !field.value && 'text-muted-foreground')
              "
              aria-label="Open date picker"
            >
              <span>{{ displayDate }}</span>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar :model-value="field.value" @update:model-value="handleDateSelect" />
        </PopoverContent>
      </Popover>
      <!-- Bind hidden input to form field value -->
      <input type="hidden" v-model="field.value" />
    </FormItem>
  </FormField>
</template>
