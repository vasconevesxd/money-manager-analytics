<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import PieChart from '@/components/charts/PieChart.vue';

  defineProps<{
    isLoadingBudgetCategories: boolean;
    budgetCategoriesError: boolean;
    budgetCategories: any[];
  }>();
</script>

<template>
  <section class="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Budget Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="isLoadingBudgetCategories" class="h-[300px] flex items-center justify-center">
          <div
            class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
          ></div>
          <span class="ml-2">Loading chart...</span>
        </div>
        <div
          v-else-if="budgetCategoriesError"
          class="h-[300px] flex items-center justify-center text-destructive"
        >
          Failed to load budget categories
        </div>
        <div
          v-else-if="budgetCategories.length === 0"
          class="h-[300px] flex items-center justify-center"
        >
          No budget categories found
        </div>
        <PieChart v-else :series="budgetChartData" title="Budget" />

        <div
          v-if="!isLoadingBudgetCategories && !budgetCategoriesError && budgetCategories.length > 0"
          class="mt-4 grid gap-2"
        >
          <div v-for="(category, index) in budgetCategories" :key="index" class="flex items-center">
            <div
              class="h-3 w-3 mr-2 rounded-full"
              :style="{ backgroundColor: category.color }"
            ></div>
            <span>{{ category.name }}</span>
            <span class="ml-auto font-medium">{{ category.percentage }}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <router-link to="/categories" class="text-sm text-primary hover:underline">
          View detailed breakdown
        </router-link>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
        <CardDescription>Breakdown by category</CardDescription>
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
          v-else-if="expenseCategories.length === 0"
          class="h-[300px] flex items-center justify-center"
        >
          No expense data found
        </div>
        <PieChart v-else :series="expenseChartData" title="Expenses" />

        <div
          v-if="!isLoadingExpenseData && !expensesDataError && expenseCategories.length > 0"
          class="mt-4 grid gap-2"
        >
          <div
            v-for="(category, index) in expenseCategories"
            :key="index"
            class="flex items-center"
          >
            <div
              class="h-3 w-3 mr-2 rounded-full"
              :style="{ backgroundColor: category.color }"
            ></div>
            <span>{{ category.name }}</span>
            <span class="ml-auto font-medium">${{ category.value.toLocaleString() }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
