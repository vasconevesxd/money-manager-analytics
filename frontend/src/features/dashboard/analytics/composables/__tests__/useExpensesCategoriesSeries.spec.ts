import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useExpensesCategoriesSeries } from '../useExpensesCategoriesSeries';
import type { Expense } from '@/types/db/index.types';

describe('useExpensesCategoriesSeries', () => {
  const mockExpenses: Expense[] = [
    {
      id: 1,
      amount: 100,
      comment: 'Groceries',
      date_time: '2023-01-01',
      category_id: 1,
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
      category_id: 2,
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
    {
      id: 3,
      amount: 150,
      comment: 'Restaurant',
      date_time: '2023-01-03',
      category_id: 1,
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
  ];

  it('should return empty array when expenses are undefined', () => {
    const expenses = ref<Expense[] | undefined>(undefined);
    const result = useExpensesCategoriesSeries(expenses);
    expect(result.value).toEqual([]);
  });

  it('should return empty array when expenses array is empty', () => {
    const expenses = ref<Expense[]>([]);
    const result = useExpensesCategoriesSeries(expenses);
    expect(result.value).toEqual([]);
  });

  it('should group expenses by category and calculate percentages', () => {
    const expenses = ref<Expense[]>(mockExpenses);
    const result = useExpensesCategoriesSeries(expenses);
    
    expect(result.value).toHaveLength(2);
    
    // Check Food category
    const foodCategory = result.value.find(item => item.name === 'Food');
    expect(foodCategory).toBeDefined();
    expect(foodCategory?.amount).toBe(250); // 100 + 150
    expect(foodCategory?.color).toBe('#FF5733');
    expect(foodCategory?.currency_code).toBe('USD');
    
    // Check Transportation category
    const transportCategory = result.value.find(item => item.name === 'Transportation');
    expect(transportCategory).toBeDefined();
    expect(transportCategory?.amount).toBe(50);
    expect(transportCategory?.color).toBe('#33FF57');
    expect(transportCategory?.currency_code).toBe('USD');
  });
});
