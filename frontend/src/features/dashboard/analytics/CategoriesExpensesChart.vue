<script setup lang="ts">
  // Vue
  import { ref, computed } from 'vue';

  // Libraries
  import Decimal from 'decimal.js';

  // Types
  import type { Expense } from '@/types/db/index.types';

  // Components
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import PieChart from '@/components/charts/PieChart.vue';

  // Composables
  import { useExpensesCategoriesSeries } from './composables/useExpensesCategoriesSeries';

  const props = defineProps<{ expenses: Expense[] | undefined }>();

  const expensesCategoriesSeries = useExpensesCategoriesSeries(computed(() => props.expenses));

  const selectedName = ref('');

  const toggleSelectedCategory = (name: string) => {
    selectedName.value = selectedName.value === name ? '' : name;
  };

  const formatAmount = (amount: number, currency: string): string => {
    return new Decimal(amount)
      .toNumber()
      .toLocaleString('en-US', { style: 'currency', currency: currency });
  };
</script>

<template>
  <Card v-if="expensesCategoriesSeries.length > 0">
    <CardHeader>
      <CardTitle>Categories Expenses</CardTitle>
    </CardHeader>
    <CardContent>
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
              {{ formatAmount(category.amount, category.currency_code) }} ({{
                category.percentage
              }}%)
            </span>
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
