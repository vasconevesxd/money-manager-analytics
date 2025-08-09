import axios from './axios';
import type { DateFilter } from '@/types/db/api.types';
import type { Expense, Income } from '@/types/db/index.types';

// API service
export const api = {
  getIncomeTimeFilter: async (filter?: DateFilter): Promise<Income[]> => {
    const params = new URLSearchParams();
    if (filter?.start_date) params.append('start_date', filter.start_date);
    if (filter?.end_date) params.append('end_date', filter.end_date);

    const url = `/income/time-filter${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  },

  getExpenseTimeFilter: async (filter?: DateFilter): Promise<Expense[]> => {
    const params = new URLSearchParams();
    if (filter?.start_date) params.append('start_date', filter.start_date);
    if (filter?.end_date) params.append('end_date', filter.end_date);

    const url = `/expense/time-filter${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  },

  importExpenses: async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/import-expenses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getCategoryBudgetRule: async () => {
    const response = await axios.get('/category-budget-rule');
    return response.data;
  },

  getCategoryExpenseByBudgetRule: async () => {
    const response = await axios.get('/category-expense-by-budget-rule');
    return response.data;
  },

  updateCategoryBudgetRule: async (categoryId: number, payload: { name?: string }) => {
    const response = await axios.patch(`/category-budget-rule/${categoryId}`, payload);
    return response.data;
  },

  createCategoryBudget: async (category: string) => {
    const response = await axios.post('/category-budget-rule', { name: category });
    return response.data;
  },

  updateCategoryExpense: async (
    categoryId: number,
    payload: { color?: string; category_budget_rule_id?: number | null }
  ) => {
    const response = await axios.patch(`/category-expense/${categoryId}`, payload);
    return response.data;
  },
};

export default api;
