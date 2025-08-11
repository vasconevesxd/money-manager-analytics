import type { Expense } from '@/types/db/index.types';
import type { ExpensesCategoriesSerie } from '../types/index.types';

//TODO: Handle expenses with different currencies
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
        currency_code: expense.currency_code,
      });
    }
  }

  return Array.from(map.values());
}
