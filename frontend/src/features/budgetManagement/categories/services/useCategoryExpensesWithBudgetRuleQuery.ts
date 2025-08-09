import { useQuery } from '@tanstack/vue-query';
import { api } from '@/lib/api';
import type { CategoryExpenseWithBudgetRule } from '../types/index.types';

export const useCategoryExpensesWithBudgetRuleQuery = () => {
  return useQuery<CategoryExpenseWithBudgetRule[]>({
    queryKey: ['category-expense-by-budget-rule'],
    queryFn: () => api.getCategoryExpenseByBudgetRule(),
  });
};
