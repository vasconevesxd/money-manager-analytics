<script setup lang="ts">
  // Vue
  import { ref } from 'vue';

  // Libraries
  import { TwitterPicker } from 'vue-color';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';

  // Services
  import { useUpdateCategoryExpense } from './services/useCategoryExpensesQuery';

  // Types
  import type { CategoryBudgetRule, CategoryExpenseWithBudgetRule } from './types/index.types';

  defineProps<{
    categoryBudgetRules: CategoryBudgetRule[] | [];
    categoryExpensesWithBudgetRule: CategoryExpenseWithBudgetRule[] | [];
  }>();

  const { mutate: updateCategoryExpense } = useUpdateCategoryExpense();

  const updateCategoryExpenseMutation  = async ({categoryId, budgetRuleId, color}: {categoryId: number, budgetRuleId: number | null, color: string}) => {
    await updateCategoryExpense({ categoryId, category_budget_rule_id: budgetRuleId, color });
  };

  const selectedCategoryId = ref<number | null>(null);

  const openColorPicker = (categoryId: number) => {
    if (selectedCategoryId.value === categoryId) return selectedCategoryId.value = null
    return selectedCategoryId.value = categoryId;
  }

</script>

<template>
  <Table
    v-if="categoryExpensesWithBudgetRule && categoryBudgetRules"
  >
    <TableHeader>
      <TableRow>
        <TableHead>Color</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Budget Rule</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="category in categoryExpensesWithBudgetRule" :key="category.id">
        <TableCell>
          <div class="relative pl-2">
            <div
              class="w-4 h-4 rounded-full"
              :style="{ backgroundColor: category.color }"
              @click="openColorPicker(category.id)"
            ></div>

            <TwitterPicker
              v-if="selectedCategoryId === category.id"
              :key="category.id"
              v-model="category.color"
              class="absolute! top-8 left-[-5px]"
              @update:model-value="updateCategoryExpenseMutation({categoryId: category.id, budgetRuleId: category.category_budget_rule.id, color: $event as string})"
            />
          </div>
        </TableCell>

        <TableCell>{{ category.name }}</TableCell>

        <TableCell>
          <Select
            :key="`${category.category_budget_rule.id}-${category.category_budget_rule.name}`"
            v-model="category.category_budget_rule.id"
            @update:model-value="
              (val) => updateCategoryExpenseMutation({categoryId: category.id, budgetRuleId: val === null ? null : Number(val), color: category.color})
            "
          >
            <SelectTrigger>
              <SelectValue :placeholder="category.category_budget_rule.name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="rule in categoryBudgetRules" :key="rule.id" :value="rule.id">
                {{ rule.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <div v-else class="flex justify-center items-center h-full">
    <div class="flex flex-col items-center justify-center"></div>
    <p>Error loading...</p> 
  </div>
</template>
