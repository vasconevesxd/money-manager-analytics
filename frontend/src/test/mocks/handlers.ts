import { http, HttpResponse } from 'msw';

// Mock expense data
export const mockExpenses = [
  {
    id: 1,
    amount: 100,
    comment: 'Groceries',
    date_time: '2023-01-01',
    currency_code: 'USD',
    category: {
      id: 1,
      name: 'Food',
      color: '#FF5733',
      category_budget_rule: {
        id: 1,
        name: 'Essential Needs',
      },
    },
  },
  {
    id: 2,
    amount: 50,
    comment: 'Gas',
    date_time: '2023-01-02',
    currency_code: 'USD',
    category: {
      id: 2,
      name: 'Transportation',
      color: '#33FF57',
      category_budget_rule: {
        id: 2,
        name: 'Savings & Investments',
      },
    },
  },
];

// Mock income data
export const mockIncomes = [
  {
    id: 1,
    amount: 1000,
    comment: 'Salary',
    date_time: '2023-01-01',
    currency_code: 'USD',
    category: {
      id: 1,
      name: 'Salary',
      color: '#3357FF',
    },
  },
];

// Mock category budget rules
export const mockCategoryBudgetRules = [
  {
    id: 1,
    name: 'Food',
  },
  {
    id: 2,
    name: 'Transportation',
  },
];

// Define handlers
export const handlers = [
  // Expense time filter endpoint
  http.get('/api/expense/time-filter', () => {
    return HttpResponse.json(mockExpenses);
  }),

  // Income time filter endpoint
  http.get('/api/income/time-filter', () => {
    return HttpResponse.json(mockIncomes);
  }),

  // Category budget rule endpoint
  http.get('/api/category-budget-rule', () => {
    return HttpResponse.json(mockCategoryBudgetRules);
  }),

  // Category expense by budget rule endpoint
  http.get('/api/category-expense-by-budget-rule', () => {
    return HttpResponse.json([
      {
          id: 1,
          name: 'Food',
          color: '#FF5733',
          category_budget_rule: {
            id: 1,
            name: 'Food',
            amount: 500,
          },
      },
      {
        id: 2,
        name: 'Transportation',
        color: '#33FF57',
        category_budget_rule: {
          id: 2,
          name: 'Transportation',
          amount: 200,
        },
      },
    ]);
  }),
];
