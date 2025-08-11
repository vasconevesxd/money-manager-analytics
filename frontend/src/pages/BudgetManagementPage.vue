<script setup lang="ts">
  // Components
  import CategoriesCard from '@/features/budgetManagement/categories/CategoriesCard.vue';
  import TableCategories from '@/features/budgetManagement/categories/TableCategories.vue';
  import AddBudget from '@/features/budgetManagement/categories/budget/AddBudget.vue';
  import EditBudget from '@/features/budgetManagement/categories/budget/EditBudget.vue';
  import { Separator } from '@/components/ui/separator';

  // Services
  import { useCategoryBudgetRuleQuery } from '@/features/budgetManagement/categories/services/useCategoryBudgetRuleQuery';
  import { useCategoryExpensesWithBudgetRuleQuery } from '@/features/budgetManagement/categories/services/useCategoryExpensesWithBudgetRuleQuery';

  const { data: categoryBudgetRules } = useCategoryBudgetRuleQuery();

  const { data: categoryExpensesWithBudgetRule } = useCategoryExpensesWithBudgetRuleQuery();
</script>

<template>
  <main class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Budget Management</h1>
    </div>

    <Separator />

    <CategoriesCard>
      <div class="flex justify-end gap-4 mb-2">
        <AddBudget />
        <EditBudget v-if="categoryBudgetRules" :category-budget-rules="categoryBudgetRules" />
      </div>
      <TableCategories
        v-if="categoryBudgetRules && categoryExpensesWithBudgetRule"
        :category-budget-rules="categoryBudgetRules"
        :category-expenses-with-budget-rule="categoryExpensesWithBudgetRule"
      />
    </CategoriesCard>
  </main>
</template>
