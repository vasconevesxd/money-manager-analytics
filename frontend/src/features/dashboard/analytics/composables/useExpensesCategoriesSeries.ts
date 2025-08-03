import { computed } from 'vue';
import type { Expense } from '@/types/db';
import type { ExpensesCategoriesSerie } from '../types';
import { groupExpensesByCategory } from '../utils/groupExpensesByCategory';
import { calculateExpensesPercentages } from '../utils/calculateExpensesPercentages';

export function useExpensesCategoriesSeries(expenses: Expense[] | undefined) {
  return computed<ExpensesCategoriesSerie[]>(() => {
    if (!expenses) return [];

    const grouped = groupExpensesByCategory(expenses);
    return calculateExpensesPercentages(grouped);
  });
}
