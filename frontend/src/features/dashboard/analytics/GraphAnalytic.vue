<script setup lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import BarChart from '@/components/charts/BarChart.vue';

  defineProps<{
    isLoadingExpenseData: boolean;
    expensesDataError: boolean;
    expenseTrendData: {
      categories: string[];
      series: number[];
    };
  }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Expense Trends</CardTitle>
      <CardDescription>Monthly expense trends by category</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoadingExpenseData" class="h-[300px] flex items-center justify-center">
        <div
          class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
        ></div>
        <span class="ml-2">Loading chart...</span>
      </div>
      <div
        v-else-if="expensesDataError"
        class="h-[300px] flex items-center justify-center text-destructive"
      >
        Failed to load expenses
      </div>
      <div
        v-else-if="!expenseTrendData.series.length"
        class="h-[300px] flex items-center justify-center"
      >
        No expense trend data available
      </div>
      <BarChart
        v-else
        :categories="expenseTrendData.categories"
        :series="expenseTrendData.series"
      />
    </CardContent>
  </Card>
</template>
