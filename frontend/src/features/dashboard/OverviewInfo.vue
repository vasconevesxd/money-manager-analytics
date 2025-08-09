<script setup lang="ts">
  // Vue
  import { computed, toRef } from 'vue';

  // Types
  import type { Income, Expense } from '@/types/db/index.types';

  // Composables
  import { useOverviewCalculations } from './composables/useOverviewCalculations';

  // Components
  import OverviewCard from '@/components/cards/OverviewCard.vue';

  const props = defineProps<{
    income: Income[] | undefined;
    expenses: Expense[] | undefined;
    requestState: {
      isLoadingIncome: boolean;
      isLoadingExpenses: boolean;
      incomeError: Error | null;
      expensesError: Error | null;
    };
  }>();

  const incomeRef = toRef(props, 'income');
  const expensesRef = toRef(props, 'expenses');

  const hasIncome = computed(() => incomeRef.value && incomeRef.value.length > 0);
  const hasExpenses = computed(() => expensesRef.value && expensesRef.value.length > 0);

  const { totalSaved, totalIncomeCurrency, totalExpensesCurrency, totalSavedCurrency } =
    useOverviewCalculations(incomeRef, expensesRef);

  const isTotalSavedPositive = computed(() =>
    totalSaved.value && totalSaved.value.toNumber() > 0 ? 'text-green-600' : 'text-red-600'
  );
</script>

<template>
  <div v-if="hasIncome && hasExpenses" class="grid gap-4 md:grid-cols-3">
    <OverviewCard
      title="Income"
      description="Total income based on selected timeframe"
      :value="totalIncomeCurrency"
      :is-loading="requestState.isLoadingIncome"
      :error="requestState.incomeError"
    />
    <OverviewCard
      title="Spent"
      description="Total expenses based on selected timeframe"
      :value="totalExpensesCurrency"
      :is-loading="requestState.isLoadingExpenses"
      :error="requestState.expensesError"
    />
    <OverviewCard
      title="Saved"
      description="Total saved based on selected timeframe"
      :value="totalSavedCurrency"
      :is-loading="requestState.isLoadingIncome || requestState.isLoadingExpenses"
      :error="requestState.incomeError || requestState.expensesError"
      :value-class="isTotalSavedPositive"
    />
  </div>
</template>
