import { describe, it, expect } from 'vitest';
import { calculateExpensesPercentages } from '../calculateExpensesPercentages';
import type { ExpensesCategoriesSerie } from '../../types/index.types';

describe('calculateExpensesPercentages', () => {
  it('should calculate percentages correctly', () => {
    const series: ExpensesCategoriesSerie[] = [
      {
        name: 'Food',
        color: '#FF5733',
        amount: 150,
        percentage: 0,
        currency_code: 'USD',
      },
      {
        name: 'Transportation',
        color: '#33FF57',
        amount: 50,
        percentage: 0,
        currency_code: 'USD',
      },
    ];
    
    const result = calculateExpensesPercentages(series);
    
    expect(result).toHaveLength(2);
    
    // Check Food category (150 / 200 = 75%)
    const foodCategory = result.find(item => item.name === 'Food');
    expect(foodCategory).toBeDefined();
    expect(foodCategory?.percentage).toBe(75);
    
    // Check Transportation category (50 / 200 = 25%)
    const transportCategory = result.find(item => item.name === 'Transportation');
    expect(transportCategory).toBeDefined();
    expect(transportCategory?.percentage).toBe(25);
  });
  
  it('should handle zero total amount', () => {
    const series: ExpensesCategoriesSerie[] = [
      {
        name: 'Food',
        color: '#FF5733',
        amount: 0,
        percentage: 0,
        currency_code: 'USD',
      },
      {
        name: 'Transportation',
        color: '#33FF57',
        amount: 0,
        percentage: 0,
        currency_code: 'USD',
      },
    ];
    
    const result = calculateExpensesPercentages(series);
    
    expect(result).toHaveLength(2);
    expect(result[0].percentage).toBe(0);
    expect(result[1].percentage).toBe(0);
  });
  
  it('should handle negative amounts', () => {
    const series: ExpensesCategoriesSerie[] = [
      {
        name: 'Food',
        color: '#FF5733',
        amount: 100,
        percentage: 0,
        currency_code: 'USD',
      },
      {
        name: 'Refund',
        color: '#33FF57',
        amount: -50,
        percentage: 0,
        currency_code: 'USD',
      },
    ];
    
    const result = calculateExpensesPercentages(series);
    
    expect(result).toHaveLength(2);
    
    // Check Food category (100 / 50 = 200%)
    const foodCategory = result.find(item => item.name === 'Food');
    expect(foodCategory).toBeDefined();
    expect(foodCategory?.percentage).toBe(200);
    
    // Check Refund category (-50 / 50 = -100%)
    const refundCategory = result.find(item => item.name === 'Refund');
    expect(refundCategory).toBeDefined();
    expect(refundCategory?.percentage).toBe(-100);
  });
  
  it('should sort categories by percentage in descending order', () => {
    const series: ExpensesCategoriesSerie[] = [
      {
        name: 'Entertainment',
        color: '#5733FF',
        amount: 25,
        percentage: 0,
        currency_code: 'USD',
      },
      {
        name: 'Food',
        color: '#FF5733',
        amount: 150,
        percentage: 0,
        currency_code: 'USD',
      },
      {
        name: 'Transportation',
        color: '#33FF57',
        amount: 50,
        percentage: 0,
        currency_code: 'USD',
      },
    ];
    
    const result = calculateExpensesPercentages(series);
    
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Food'); // 150 / 225 = 66.67%
    expect(result[1].name).toBe('Transportation'); // 50 / 225 = 22.22%
    expect(result[2].name).toBe('Entertainment'); // 25 / 225 = 11.11%
  });
  
  it('should round percentages to 2 decimal places', () => {
    const series: ExpensesCategoriesSerie[] = [
      {
        name: 'Food',
        color: '#FF5733',
        amount: 100,
        percentage: 0,
        currency_code: 'USD',
      },
      {
        name: 'Transportation',
        color: '#33FF57',
        amount: 33.33,
        percentage: 0,
        currency_code: 'USD',
      },
    ];
    
    const result = calculateExpensesPercentages(series);
    
    // Check Food category (100 / 133.33 = 75.00%)
    const foodCategory = result.find(item => item.name === 'Food');
    expect(foodCategory?.percentage).toBeCloseTo(75, 2);
    
    // Check Transportation category (33.33 / 133.33 = 25.00%)
    const transportCategory = result.find(item => item.name === 'Transportation');
    expect(transportCategory?.percentage).toBeCloseTo(25, 2);
  });
});
