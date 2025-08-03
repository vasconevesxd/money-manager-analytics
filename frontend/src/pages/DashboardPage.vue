<script setup lang="ts">
  import TimeFilter from '@/features/dashboard/filters/TimeFilter.vue';
  import { Separator } from '@/components/ui/separator';

  /*
const showCustomDatePicker = ref(false);


// Fetch budget categories
const { 
  data: budgetCategoriesData, 
  isLoading: isLoadingBudgetCategories,
  error: budgetCategoriesError 
} = useQuery({
  queryKey: ['budgetCategories'],
  queryFn: api.getBudgetCategories,
});

// Fetch expense summary based on selected timeframe
const {
  data: expenseSummary,
  isLoading: isLoadingExpenses,
  error: expensesError,
  refetch: refetchExpenses
} = useQuery({
  queryKey: ['expenseSummary', dateFilter],
  queryFn: () => api.getExpenseTimeFilter(dateFilter.value),
  enabled: true
});

// Fetch income summary based on selected timeframe
const {
  data: incomeSummary,
  isLoading: isLoadingIncome,
  error: incomeError,
  refetch: refetchIncome
} = useQuery({
  queryKey: ['incomeSummary', dateFilter],
  queryFn: () => api.getIncomeTimeFilter(dateFilter.value),
  enabled: true
});

// Fetch expense data for charts
const {
  data: expensesData,
  isLoading: isLoadingExpenseData,
  error: expensesDataError
} = useQuery({
  queryKey: ['expenses', dateFilter],
  queryFn: () => api.getExpenses(dateFilter.value),
});

// Watch for timeframe changes to refetch data
watch(timeframe, () => {
  refetchExpenses();
  refetchIncome();
});

// Watch for custom date range changes
watch(customDateRange, () => {
  if (timeframe.value === 'custom') {
    refetchExpenses();
    refetchIncome();
  }
}, { deep: true });

// Budget categories with frontend properties
const budgetCategories = computed(() => {
  if (!budgetCategoriesData.value) return [];
  
  // Add frontend-only properties (percentage and color)
  return budgetCategoriesData.value.map((category, index) => ({
    ...category,
    percentage: category.percentage ?? (index === 0 ? 50 : index === 1 ? 30 : 20), // Default 50/30/20 rule
    color: category.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }));
});

// Prepare data for budget chart
const budgetChartData = computed(() => {
  return budgetCategories.value.map(cat => ({
    name: cat.name,
    value: cat.percentage ?? 0,
    color: cat.color ?? DEFAULT_COLORS[0]
  }));
});

// Process expenses data to create expense categories
const expenseCategories = computed(() => {
  if (!expensesData.value) return [];
  
  // Group expenses by category
  const categoryMap = new Map<number, { name: string; total: number }>();
  
  expensesData.value.forEach(expense => {
    if (!expense.category_id) return;
    
    const categoryId = expense.category_id;
    const categoryName = expense.category?.name ?? `Category ${categoryId}`;
    
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, { name: categoryName, total: 0 });
    }
    
    const category = categoryMap.get(categoryId)!;
    category.total += expense.amount;
  });
  
  // Convert map to array and add colors
  return Array.from(categoryMap.entries()).map(([id, { name, total }], index) => ({
    id,
    name,
    value: total,
    color: DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }));
});

// Prepare data for expense chart
const expenseChartData = computed(() => {
  return expenseCategories.value.map(cat => ({
    name: cat.name,
    value: cat.value,
    color: cat.color
  }));
});

// Summary data for the current timeframe
const summaryData = computed(() => {
  const defaultData = {
    spent: 0,
    saved: 0,
    income: 0
  };
  
  if (!expenseSummary.value || !incomeSummary.value) return defaultData;
  
  return {
    spent: expenseSummary.value.total,
    income: incomeSummary.value.total,
    saved: incomeSummary.value.total - expenseSummary.value.total
  };
});

// Generate expense trends data from actual expenses
const expenseTrendData = computed(() => {
  if (!expensesData.value) return { categories: [], series: [] };
  
  // Get last 6 months
  const months = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push(month.toLocaleString('default', { month: 'short' }));
  }
  
  // Group expenses by category and month
  const categoryExpenses = new Map();
  
  expensesData.value.forEach(expense => {
    if (!expense.category_id) return;
    
    const expenseDate = new Date(expense.date_time);
    const monthIndex = 5 - (today.getMonth() - expenseDate.getMonth() + (12 * (today.getFullYear() - expenseDate.getFullYear())));
    
    // Only include expenses from the last 6 months
    if (monthIndex < 0 || monthIndex > 5) return;
    
    const categoryId = expense.category_id;
    const categoryName = expense.category?.name ?? `Category ${categoryId}`;
    
    if (!categoryExpenses.has(categoryId)) {
      categoryExpenses.set(categoryId, {
        category: categoryName,
        data: Array(6).fill(0)
      });
    }
    
    const category = categoryExpenses.get(categoryId);
    category.data[monthIndex] += expense.amount;
  });
  
  // Convert map to array
  const series = Array.from(categoryExpenses.values())
    .sort((a, b) => 
      b.data.reduce((sum: number, val: number) => sum + val, 0) - 
      a.data.reduce((sum: number, val: number) => sum + val, 0)
    )
    .slice(0, 3); // Take top 3 categories
  
  return {
    categories: months,
    series
  };
});

// Toggle custom date picker
const toggleCustomDatePicker = () => {
  showCustomDatePicker.value = !showCustomDatePicker.value;
  if (showCustomDatePicker.value) {
    timeframe.value = 'custom';
  }
};

// Update custom date range
const updateCustomDateRange = () => {
  if (timeframe.value === 'custom') {
    refetchExpenses();
    refetchIncome();
  }
}; */
</script>

<template>
  <main class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
    </div>

    <Separator />

    <!-- Spent & Saved Section -->
    <TimeFilter />
  </main>
</template>
