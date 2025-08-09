export type ExpensesCategoriesSerie = {
  name: string;
  color: string;
  amount: number;
  percentage: number;
  currency_code: string;
};

export interface AverageExpenseRow {
  categoryName: string;
  categoryBudgetName: string;
  averageAmount: number;
  currencyCode: string;
}