<script setup lang="ts">
  // Vue
  import { computed } from 'vue';

  // Libraries
  import Decimal from 'decimal.js';

  // Types
  import type { Income, Expense } from '@/types/db';

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

  const hasIncome = computed(() => props.income && props.income.length > 0);
  const hasExpenses = computed(() => props.expenses && props.expenses.length > 0);

  const totalIncome = computed(
    () =>
      props.income?.reduce((sum, { amount }) => sum.plus(amount), new Decimal(0)).toNumber() ?? 0
  );

  const totalExpenses = computed(
    () =>
      props.expenses?.reduce((sum, { amount }) => sum.plus(amount), new Decimal(0)).toNumber() ?? 0
  );

  const totalSaved = computed(
    () => new Decimal(totalIncome.value).minus(totalExpenses.value).toNumber() ?? 0
  );
</script>

<template>
  <div v-if="hasIncome && hasExpenses" class="grid gap-4 md:grid-cols-3 mt-4">
    <OverviewCard
      title="Income"
      description="Total income based on selected timeframe"
      :value="`${totalIncome}€`"
      :is-loading="requestState.isLoadingIncome"
      :error="requestState.incomeError"
    />
    <OverviewCard
      title="Spent"
      description="Total expenses based on selected timeframe"
      :value="`${totalExpenses}€`"
      :is-loading="requestState.isLoadingExpenses"
      :error="requestState.expensesError"
    />
    <OverviewCard
      title="Saved"
      description="Total saved based on selected timeframe"
      :value="`${totalSaved}€`"
      :is-loading="requestState.isLoadingIncome || requestState.isLoadingExpenses"
      :error="requestState.incomeError || requestState.expensesError"
      :value-class="totalSaved >= 0 ? 'text-green-600' : 'text-red-600'"
    />
  </div>
</template>
