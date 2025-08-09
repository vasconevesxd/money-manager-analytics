import { computed } from 'vue';
import type { Ref } from 'vue';
import type { Income, Expense } from '@/types/db/index.types';
import Decimal from 'decimal.js';

export const useOverviewCalculations = (
  income: Ref<Income[] | undefined>,
  expenses: Ref<Expense[] | undefined>
) => {
  const currency = computed(
    () => income.value?.[0].currency_code ?? expenses.value?.[0].currency_code
  );

  const totalIncome = computed(
    () =>
      income.value?.reduce((sum, { amount }) => sum.plus(amount), new Decimal(0)) ?? new Decimal(0)
  );

  const totalExpenses = computed(
    () =>
      expenses.value?.reduce((sum, { amount }) => sum.plus(amount), new Decimal(0)) ??
      new Decimal(0)
  );

  const totalSaved = computed(() => totalIncome.value.minus(totalExpenses.value));

  const totalIncomeCurrency = computed(() =>
    totalIncome.value
      .toNumber()
      .toLocaleString('en-US', { style: 'currency', currency: currency.value })
  );

  const totalExpensesCurrency = computed(() =>
    totalExpenses.value
      .toNumber()
      .toLocaleString('en-US', { style: 'currency', currency: currency.value })
  );

  const totalSavedCurrency = computed(() =>
    totalSaved.value
      .toNumber()
      .toLocaleString('en-US', { style: 'currency', currency: currency.value })
  );

  return {
    totalIncome,
    totalExpenses,
    totalSaved,
    totalIncomeCurrency,
    totalExpensesCurrency,
    totalSavedCurrency,
  };
};
