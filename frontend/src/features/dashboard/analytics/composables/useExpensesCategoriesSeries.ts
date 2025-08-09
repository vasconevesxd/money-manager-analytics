import { computed } from 'vue';
import type { Ref } from 'vue';
import type { Expense } from '@/types/db/index.types';
import type { ExpensesCategoriesSerie } from '../types/index.types';
import { groupExpensesByCategory } from '../helpers/groupExpensesByCategory';
import { calculateExpensesPercentages } from '../helpers/calculateExpensesPercentages';

export function useExpensesCategoriesSeries(expenses: Ref<Expense[] | undefined>) {
  return computed<ExpensesCategoriesSerie[]>(() => {
    if (!expenses.value) return [];

    const grouped = groupExpensesByCategory(expenses.value);
    return calculateExpensesPercentages(grouped);
  });
}
