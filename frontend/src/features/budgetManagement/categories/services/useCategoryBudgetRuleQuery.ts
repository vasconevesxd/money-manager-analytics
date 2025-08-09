import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/lib/api';
import type { CategoryBudgetRule, CategoryExpenseWithBudgetRule } from '../types/index.types';

export const useCategoryBudgetRuleQuery = () => {
  return useQuery<CategoryBudgetRule[] | []>({
    queryKey: ['category-budget-rule'],
    queryFn: async () => {
      const response = await api.getCategoryBudgetRule();
      return response?.map(({ id, name }: CategoryBudgetRule) => ({ id, name })) ?? [];
    },
  });
};

export const useUpdateCategoryBudgetRule = () => {
  const queryClient = useQueryClient();

  return useMutation<CategoryExpenseWithBudgetRule, Error, { categoryId: number; name: string }>({
    mutationFn: async (payload: { categoryId: number; name: string }) => {
      const response = await api.updateCategoryBudgetRule(payload.categoryId, {
        name: payload.name,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-budget-rule'] });
      queryClient.invalidateQueries({ queryKey: ['category-expense-by-budget-rule'] });
    },
  });
};

export const useCreateCategoryBudgetRule = () => {
  const queryClient = useQueryClient();

  return useMutation<CategoryExpenseWithBudgetRule, Error, { name: string }>({
    mutationFn: async (payload: { name: string }) => {
      const response = await api.createCategoryBudget(payload.name);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-budget-rule'] });
      queryClient.invalidateQueries({ queryKey: ['category-expense-by-budget-rule'] });
    },
  });
};
