import Decimal from 'decimal.js';
import type { ExpensesCategoriesSerie } from '../types/index.types';

export function calculateExpensesPercentages(
  series: ExpensesCategoriesSerie[]
): ExpensesCategoriesSerie[] {
  const totalAmount = series.reduce((acc, category) => acc.plus(category.amount), new Decimal(0));

  if (totalAmount.isZero() || !totalAmount.isFinite()) {
    return series.map((category) => ({ ...category, percentage: 0 }));
  }

  return series
    .map((category) => {
      const percentage = new Decimal(category.amount)
        .dividedBy(totalAmount) // amount / total
        .times(100) // -> %
        .toDecimalPlaces(2); // round to 1 decimal

      return {
        ...category,
        percentage: percentage.toNumber(),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
}
