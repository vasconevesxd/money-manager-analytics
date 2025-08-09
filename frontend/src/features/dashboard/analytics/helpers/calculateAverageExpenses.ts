import type { Expense } from '@/types/db/index.types';
import type { AverageExpenseRow } from '../types/index.types';

/**
 * Calculates average expense amounts grouped by category & budget rule.
 */
export function calculateAverageExpenses(expenses: Expense[]): AverageExpenseRow[] {
  if (!Array.isArray(expenses) || expenses.length === 0) return [];

  const map = new Map<
    string,
    {
      categoryName: string;
      categoryBudgetName: string;
      currencyCode: string;
      total: number;
      count: number;
    }
  >();

  for (const expense of expenses) {
    if (!expense.category) continue;

    const categoryId = expense.category.id;
    const currencyCode = expense.currency_code;
    const categoryName = expense.category.name;
    const categoryBudgetName = expense.category.category_budget_rule?.name ?? '';

    const key = `${categoryId}:${categoryBudgetName}`;

    if (!map.has(key)) {
      map.set(key, {
        categoryName,
        categoryBudgetName,
        currencyCode,
        total: 0,
        count: 0,
      });
    }

    const entry = map.get(key)!;
    entry.total += expense.amount;
    entry.count++;
  }

  return Array.from(map.values()).map((entry) => ({
    categoryName: entry.categoryName,
    categoryBudgetName: entry.categoryBudgetName,
    currencyCode: entry.currencyCode,
    averageAmount: entry.count > 0 ? entry.total / entry.count : 0,
  }));
}
