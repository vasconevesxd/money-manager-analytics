import { describe, it, expect } from 'vitest';
import { calculateAverageExpenses } from '../calculateAverageExpenses';
import type { Expense } from '@/types/db/index.types';

describe('calculateAverageExpenses', () => {
  it('should return empty array when expenses array is empty', () => {
    const result = calculateAverageExpenses([]);
    expect(result).toEqual([]);
  });
  
  it('should return empty array when expenses is not an array', () => {
    const result = calculateAverageExpenses(undefined as any);
    expect(result).toEqual([]);
  });
  
  it('should calculate average expenses by category', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        description: 'Groceries',
        date: '2023-01-01',
        category_expense_id: 1,
        currency_id: 1,
        category: {
          id: 1,
          name: 'Food',
          color: '#FF5733',
          category_budget_rule_id: 1,
          category_budget_rule: {
            id: 1,
            name: 'Monthly Food',
          },
        },
        currency_code: 'USD',
      },
      {
        id: 2,
        amount: 200,
        description: 'Restaurant',
        date: '2023-01-02',
        category_expense_id: 1,
        currency_id: 1,
        category: {
          id: 1,
          name: 'Food',
          color: '#FF5733',
          category_budget_rule_id: 1,
          category_budget_rule: {
            id: 1,
            name: 'Monthly Food',
          },
        },
        currency_code: 'USD',
      },
      {
        id: 3,
        amount: 50,
        description: 'Gas',
        date: '2023-01-03',
        category_expense_id: 2,
        currency_id: 1,
        category: {
          id: 2,
          name: 'Transportation',
          color: '#33FF57',
          category_budget_rule_id: 2,
          category_budget_rule: {
            id: 2,
            name: 'Monthly Transport',
          },
        },
        currency_code: 'USD',
      },
    ];
    
    const result = calculateAverageExpenses(expenses);
    
    expect(result).toHaveLength(2);
    
    // Check Food category
    const foodCategory = result.find(item => item.categoryName === 'Food');
    expect(foodCategory).toBeDefined();
    expect(foodCategory?.categoryBudgetName).toBe('Monthly Food');
    expect(foodCategory?.currencyCode).toBe('USD');
    expect(foodCategory?.averageAmount).toBe(150); // (100 + 200) / 2
    
    // Check Transportation category
    const transportCategory = result.find(item => item.categoryName === 'Transportation');
    expect(transportCategory).toBeDefined();
    expect(transportCategory?.categoryBudgetName).toBe('Monthly Transport');
    expect(transportCategory?.currencyCode).toBe('USD');
    expect(transportCategory?.averageAmount).toBe(50); // 50 / 1
  });
  
  it('should handle expenses without category', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        description: 'Groceries',
        date: '2023-01-01',
        category_expense_id: 1,
        currency_id: 1,
        category: null as any, // No category
        currency_code: 'USD',
      },
    ];
    
    const result = calculateAverageExpenses(expenses);
    expect(result).toEqual([]);
  });
  
  it('should handle expenses without category budget rule', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        description: 'Groceries',
        date: '2023-01-01',
        category_expense_id: 1,
        currency_id: 1,
        category: {
          id: 1,
          name: 'Food',
          color: '#FF5733',
          category_budget_rule_id: null,
          category_budget_rule: null, // No budget rule
        },
        currency_code: 'USD',
      },
    ];
    
    const result = calculateAverageExpenses(expenses);
    
    expect(result).toHaveLength(1);
    expect(result[0].categoryName).toBe('Food');
    expect(result[0].categoryBudgetName).toBe(''); // Empty string for missing budget rule
    expect(result[0].averageAmount).toBe(100);
  });
});
