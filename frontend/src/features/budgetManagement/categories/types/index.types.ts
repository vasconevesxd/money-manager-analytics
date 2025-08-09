export interface CategoryExpense {
  id: number;
  name: string;
  color: string;
}

export interface BudgetRule {
  id: number;
  name: string;
}

export interface CategoryExpenseWithBudgetRule extends CategoryExpense {
  category_budget_rule: BudgetRule;
}

export interface CategoryBudgetRule {
  id: number;
  name: string;
}
