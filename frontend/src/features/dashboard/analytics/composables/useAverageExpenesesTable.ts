// Vue
import { computed } from 'vue';

// Helpers
import { calculateAverageExpenses } from '../helpers/calculateAverageExpenses';

// Types
import type { AverageExpenseRow } from '../types/index.types';
import type { Expense } from '@/types/db/index.types';
import type {  ComputedRef } from 'vue';


export const useAverageExpensesTable = (
  expenses: Expense[]
): ComputedRef<AverageExpenseRow[]> => {
  return computed(() => {
    return calculateAverageExpenses(expenses);
  });
};
