import { computed } from 'vue';
import type { Expense } from '@/types/db';
import type { ExpensesCategoriesSerie } from '../types';
import { groupExpensesByCategory } from '../helpers/groupExpensesByCategory';
import { calculateExpensesPercentages } from '../helpers/calculateExpensesPercentages';

export function useExpensesCategoriesSeries(expenses: Expense[] | undefined) {
  return computed<ExpensesCategoriesSerie[]>(() => {
    if (!expenses) return [];

    const grouped = groupExpensesByCategory(expenses);
    return calculateExpensesPercentages(grouped);
  });
}
