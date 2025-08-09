export interface CategoryBudgetRule {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  percentage?: number;
}

export interface CategoryExpense {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  budget?: number;
  color?: string;
  category_budget_rule_id?: number;
}

export interface CategoryIncome {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  budget?: number;
  color?: string;
}

export interface Expense {
  id: number;
  date_time: string;
  amount: number;
  comment?: string;
  currency_code: string;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  category?: CategoryExpense;
  categoryBudgetRule?: CategoryBudgetRule;
}

export interface Income {
  id: number;
  date_time: string;
  amount: number;
  comment?: string;
  currency_code: string;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  category?: CategoryExpense;
  categoryBudgetRule?: CategoryBudgetRule;
}
