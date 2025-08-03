<script setup lang="ts">
  import { ref } from 'vue';
  import PieChart from '@/components/charts/PieChart.vue';
  import type { Expense } from '@/types/db';
  import { useExpensesCategoriesSeries } from './composables/useExpensesCategoriesSeries';

  const props = defineProps<{ expenses: Expense[] | undefined }>();

  const expensesCategoriesSeries = useExpensesCategoriesSeries(props.expenses);

  const selectedName = ref('');

  const toggleSelectedCategory = (name: string) => {
    selectedName.value = selectedName.value === name ? '' : name;
  };

  const formatAmount = (amount: number): string => {
    return `${amount.toFixed(1)}€`;
  };
</script>

<template>
  <div v-if="expensesCategoriesSeries.length > 0" class="grid grid-cols-1">
    <h2 class="text-xl font-semibold mb-4 tracking-tight">Categories Expenses</h2>

    <div class="pt-6 rounded-2xl shadow-md bg-white">
      <div class="grid grid-cols-1 md:grid-cols-[minmax(0,1.5fr)_1fr] items-start gap-4 px-4">
        <PieChart :series="expensesCategoriesSeries" :selected-name="selectedName" />

        <div class="grid gap-2 max-h-[420px] overflow-y-auto mr-12">
          <button
            v-for="category in expensesCategoriesSeries"
            :key="category.name"
            class="grid grid-cols-2 py-2 justify-around items-start pr-12 hover:bg-gray-100 rounded-md p-2 cursor-pointer"
            :class="{ 'bg-gray-100': selectedName === category.name }"
            @click="toggleSelectedCategory(category.name)"
          >
            <div class="flex items-center space-x-2">
              <div
                class="h-3 w-3 rounded-full flex-shrink-0"
                :style="{ backgroundColor: category.color }"
              ></div>
              <span class="text-sm text-gray-700 text-nowrap">{{ category.name }}</span>
            </div>

            <span class="text-sm font-medium text-end text-gray-900">
              {{ formatAmount(category.amount) }} ({{ category.percentage }}%)
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
