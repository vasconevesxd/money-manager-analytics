import { useMutation } from '@tanstack/vue-query';
import { api } from '@/lib/api';
import type { CategoryExpenseWithBudgetRule } from '../types/index.types';

export const useUpdateCategoryExpense = () => {
  return useMutation<
    CategoryExpenseWithBudgetRule,
    Error,
    { categoryId: number; category_budget_rule_id: number | null; color: string }
  >({
    mutationFn: async (payload: {
      categoryId: number;
      category_budget_rule_id: number | null;
      color: string;
    }) => {
      const response = await api.updateCategoryExpense(payload.categoryId, {
        category_budget_rule_id: payload.category_budget_rule_id,
        color: payload.color,
      });
      return response;
    },
  });
};
