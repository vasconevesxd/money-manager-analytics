import type { Expense } from '@/types/db';
import type { ExpensesCategoriesSerie } from '../types';

export function groupExpensesByCategory(expenses: Expense[]): ExpensesCategoriesSerie[] {
  const map = new Map<string, ExpensesCategoriesSerie>();

  for (const expense of expenses) {
    const category = expense.category;
    if (!category?.name) continue;

    const existing = map.get(category.name);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      map.set(category.name, {
        name: category.name,
        color: category.color || '#000000',
        amount: expense.amount,
        percentage: 0,
      });
    }
  }

  return Array.from(map.values());
}
