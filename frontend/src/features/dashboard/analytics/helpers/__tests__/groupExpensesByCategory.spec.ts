import { describe, it, expect } from 'vitest';
import { groupExpensesByCategory } from '../groupExpensesByCategory';
import type { Expense, CategoryExpense } from '@/types/db/index.types';

describe('groupExpensesByCategory', () => {
  it('should group expenses by category name', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        comment: 'Groceries',
        date_time: '2023-01-01',
        category: {
          id: 1,
          name: 'Food',
          color: '#FF5733',
        },
        currency_code: 'USD',
      },
      {
        id: 2,
        amount: 50,
        comment: 'Gas',
        date_time: '2023-01-02',
        category: {
          id: 2,
          name: 'Transportation',
          color: '#33FF57',
        },
        currency_code: 'USD',
      },
      {
        id: 3,
        amount: 150,
        comment: 'Restaurant',
        date_time: '2023-01-03',
        category: {
          id: 1,
          name: 'Food',
          color: '#FF5733',
        },
        currency_code: 'USD',
      },
    ];
    
    const result = groupExpensesByCategory(expenses);
    
    expect(result).toHaveLength(2);
    
    // Check Food category
    const foodCategory = result.find(item => item.name === 'Food');
    expect(foodCategory).toBeDefined();
    expect(foodCategory?.color).toBe('#FF5733');
    expect(foodCategory?.amount).toBe(250); // 100 + 150
    expect(foodCategory?.currency_code).toBe('USD');
    
    // Check Transportation category
    const transportCategory = result.find(item => item.name === 'Transportation');
    expect(transportCategory).toBeDefined();
    expect(transportCategory?.color).toBe('#33FF57');
    expect(transportCategory?.amount).toBe(50);
    expect(transportCategory?.currency_code).toBe('USD');
  });
  
  it('should handle expenses without category', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        comment: 'Groceries',
        date_time: '2023-01-01',
        category: null as CategoryExpense | null, // No category
        currency_code: 'USD',
      },
    ];
    
    const result = groupExpensesByCategory(expenses);
    expect(result).toEqual([]);
  });
  
  it('should handle expenses with category but without name', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        comment: 'Groceries',
        date_time: '2023-01-01',
        category: {
          id: 1,
          name: '', // Empty name
          color: '#FF5733',
        },
        currency_code: 'USD',
      },
    ];
    
    const result = groupExpensesByCategory(expenses);
    expect(result).toEqual([]);
  });
  
  it('should use default color when category color is missing', () => {
    const expenses: Expense[] = [
      {
        id: 1,
        amount: 100,
        comment: 'Groceries',
        date_time: '2023-01-01',
        category: {
          id: 1,
          name: 'Food',
          color: null as string | null, // No color
        },
        currency_code: 'USD',
      },
    ];
    
    const result = groupExpensesByCategory(expenses);
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Food');
    expect(result[0].color).toBe('#000000'); // Default color
    expect(result[0].amount).toBe(100);
  });
});
