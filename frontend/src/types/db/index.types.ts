export interface CategoryBudgetRule {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryExpense {
  id: number;
  name: string;
  color?: string;
  category_budget_rule?: CategoryBudgetRule;
  category_budget_rule_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryIncome {
  id: number;
  name: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Expense {
  id: number;
  date_time: string;
  amount: number;
  comment?: string;
  currency_code: string;
  category_id?: number;
  category?: CategoryExpense;
  created_at?: string;
  updated_at?: string;
}

export interface Income {
  id: number;
  date_time: string;
  amount: number;
  comment?: string;
  currency_code: string;
  category_id?: number;
  category?: CategoryIncome;
  created_at?: string;
  updated_at?: string;
}
