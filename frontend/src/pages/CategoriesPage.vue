<script setup lang="ts">
  import { computed } from 'vue';
  import { useQuery, useQueryClient } from '@tanstack/vue-query';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Separator } from '@/components/ui/separator';
  import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from '@/components/ui/table';
  import api from '@/lib/api';

  // Default colors for new categories
  const DEFAULT_COLORS = [
    'hsl(142, 76%, 36%)', // Green
    'hsl(217, 91%, 60%)', // Blue
    'hsl(47, 100%, 50%)', // Yellow
    'hsl(12, 83%, 62%)', // Red
    'hsl(271, 91%, 65%)', // Purple
  ];

  // Query client for cache management
  const queryClient = useQueryClient();

  // Fetch budget categories
  const {
    data: budgetCategoriesData,
    isLoading: isLoadingBudgetCategories,
    error: budgetCategoriesError,
  } = useQuery({
    queryKey: ['budgetCategories'],
    queryFn: api.getBudgetCategories,
  });

  // Fetch expense categories
  const {
    data: expensesData,
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => api.getExpenses(),
  });

  // Budget categories with frontend properties
  const budgetCategories = computed(() => {
    if (!budgetCategoriesData.value || !expensesData.value) return [];

    // Count usage of each category by ID
    const usageCount: Record<number, number> = {};
    expensesData.value.forEach((expense) => {
      const id = expense.category_budget_rule_id;
      usageCount[id] = (usageCount[id] || 0) + 1;
    });

    // Total usage for percentage calculation
    const totalUsage = Object.values(usageCount).reduce((sum, count) => sum + count, 0);

    return budgetCategoriesData.value.map((category, index) => {
      const usage = usageCount[category.id] || 0;
      const percentage = Math.round(totalUsage > 0 ? (usage / totalUsage) * 100 : 0);

      return {
        ...category,
        percentage,
        color: category.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      };
    });
  });

  // Extract unique expense categories from expenses data
  const expenseCategories = computed(() => {
    if (!expensesData.value) return [];

    // Create a map to group expenses by category
    const categoryMap = new Map();

    expensesData.value.forEach((expense) => {
      if (!expense.category_id || !expense.category) return;

      const categoryId = expense.category_id;
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: expense.category.name,
          budget: 0,
          color: DEFAULT_COLORS[categoryMap.size % DEFAULT_COLORS.length],
          categoryBudgetRuleId: expense.category_budget_rule_id || undefined,
        });
      }

      // Sum up the amount for budget calculation
      const category = categoryMap.get(categoryId);
      category.budget += expense.amount;
    });

    return Array.from(categoryMap.values());
  });

  // Assign budget category rule to an expense category
  const assignBudgetRule = (categoryId: number, budgetRuleId: number | undefined) => {
    // In a real implementation, this would update the expense category in the database
    console.log(`Assigning budget rule ${budgetRuleId} to expense category ${categoryId}`);

    // Update expenses with this category to have the new budget rule
    const updatePromises = expensesData.value
      ?.filter((expense) => expense.category_id === categoryId)
      .map((expense) =>
        api.updateExpense(expense.id, {
          category_budget_rule_id: budgetRuleId,
        })
      );

    if (updatePromises?.length) {
      Promise.all(updatePromises).then(() => {
        queryClient.invalidateQueries({ queryKey: ['expenses'] });
      });
    }
  };
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Categories</h1>
    </div>

    <Separator />

    <!-- Budget Categories -->
    <section>
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Budget Categories</h2>
        </div>

        <!-- Loading state -->
        <Card v-if="isLoadingBudgetCategories">
          <CardContent class="p-6 flex justify-center items-center">
            <div
              class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
            ></div>
            <span class="ml-2">Loading categories...</span>
          </CardContent>
        </Card>

        <!-- Error state -->
        <Card v-else-if="budgetCategoriesError" class="border-destructive">
          <CardHeader>
            <CardTitle class="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load budget categories. Please try again later.</p>
            <Button
              variant="outline"
              class="mt-4"
              @click="() => queryClient.invalidateQueries({ queryKey: ['budgetCategories'] })"
            >
              Retry
            </Button>
          </CardContent>
        </Card>

        <!-- Budget Categories Table -->
        <Card v-else>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="category in budgetCategories" :key="category.id">
                  <TableCell>
                    <div
                      class="h-4 w-4 rounded-full"
                      :style="{ backgroundColor: category.color }"
                    ></div>
                  </TableCell>
                  <TableCell>{{ category.name }}</TableCell>
                  <TableCell>{{ category.percentage }}%</TableCell>
                </TableRow>
                <TableRow v-if="budgetCategories.length === 0">
                  <TableCell colspan="3" class="text-center py-4"
                    >No budget categories found</TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Expense Categories -->
    <section>
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Expense Categories</h2>
        </div>

        <!-- Loading state -->
        <Card v-if="isLoadingExpenses">
          <CardContent class="p-6 flex justify-center items-center">
            <div
              class="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"
            ></div>
            <span class="ml-2">Loading expense categories...</span>
          </CardContent>
        </Card>

        <!-- Error state -->
        <Card v-else-if="expensesError" class="border-destructive">
          <CardHeader>
            <CardTitle class="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load expense categories. Please try again later.</p>
            <Button
              variant="outline"
              class="mt-4"
              @click="() => queryClient.invalidateQueries({ queryKey: ['expenses'] })"
            >
              Retry
            </Button>
          </CardContent>
        </Card>

        <!-- Expense Categories Table -->
        <Card v-else>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Budget Rule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="category in expenseCategories" :key="category.id">
                  <TableCell>
                    <div
                      class="h-4 w-4 rounded-full"
                      :style="{ backgroundColor: category.color }"
                    ></div>
                  </TableCell>
                  <TableCell>{{ category.name }}</TableCell>
                  <TableCell>${{ category.budget.toLocaleString() }}</TableCell>
                  <TableCell>
                    <select
                      class="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      :value="category.categoryBudgetRuleId || ''"
                      @change="
                        (e: Event) =>
                          assignBudgetRule(
                            category.id,
                            (e.target as HTMLSelectElement).value
                              ? Number((e.target as HTMLSelectElement).value)
                              : undefined
                          )
                      "
                    >
                      <option value="">No Budget Rule</option>
                      <option
                        v-for="budgetRule in budgetCategories"
                        :key="budgetRule.id"
                        :value="budgetRule.id"
                      >
                        {{ budgetRule.name }} ({{ budgetRule.percentage }}%)
                      </option>
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow v-if="expenseCategories.length === 0">
                  <TableCell colspan="4" class="text-center py-4"
                    >No expense categories found</TableCell
                  >
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>
