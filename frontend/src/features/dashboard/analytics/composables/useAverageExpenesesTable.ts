// Vue
import { computed } from 'vue';

// Helpers
import { calculateAverageExpenses } from '../helpers/calculateAverageExpenses';

// Types
import type { AverageExpenseRow } from '../types/index.types';
import type { Expense } from '@/types/db/index.types';
import type { ComputedRef, Ref } from 'vue';


export const useAverageExpensesTable = (
  expenses: Ref<Expense[]>
): ComputedRef<AverageExpenseRow[]> => {
  return computed(() => {
    return calculateAverageExpenses(expenses.value);
  });
};
