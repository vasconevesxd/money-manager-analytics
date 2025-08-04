<script setup lang="ts">
  // Third-party imports
  import { computed, ref } from 'vue';
  import { useQuery } from '@tanstack/vue-query';
  import dayjs from 'dayjs';
  import Decimal from 'decimal.js';

  // Local imports
  import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
  import InputDatepicker from '@/components/datepicker/InputDatepicker.vue';
  import OverviewCard from '@/components/OverviewCard.vue';
  import CategoriesExpensesChart from '@/features/dashboard/analytics/CategoriesExpensesChart.vue';
  import api from '@/lib/api';

  // Type imports
  import type { DateFilter } from '@/types/db/apiTypes';
  import type { Expense, Income } from '@/types/db';

  const timeframe = ref<'day' | 'week' | 'year' | 'custom'>('year');

  const customDateRange = ref({
    start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'), // Default: 1 month ago
    end: dayjs().format('YYYY-MM-DD'), // Default: today
  });

  const getDateFilter = (): DateFilter | undefined => {
    const now = dayjs();
    const timeframeConfigs: Record<string, DateFilter> = {
      day: {
        start_date: now.format('YYYY-MM-DD'),
        end_date: now.format('YYYY-MM-DD'),
      },
      week: {
        start_date: now.startOf('week').format('YYYY-MM-DD'), // Start on Sunday
        end_date: now.format('YYYY-MM-DD'),
      },
      year: {
        start_date: now.startOf('year').format('YYYY-MM-DD'),
        end_date: now.endOf('year').format('YYYY-MM-DD'),
      },
      custom: {
        start_date: customDateRange.value.start,
        end_date: customDateRange.value.end,
      },
    };

    return timeframeConfigs[timeframe.value] ?? undefined;
  };

  const dateFilter = computed(() => getDateFilter());

  const {
    data: income,
    isLoading: isLoadingIncome,
    error: incomeError,
  } = useQuery<Income[]>({
    queryKey: computed(() => ['income-time-filter', dateFilter.value]),
    queryFn: () => api.getIncomeTimeFilter(dateFilter.value),
  });

  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useQuery<Expense[]>({
    queryKey: computed(() => ['expense-time-filter', dateFilter.value]),
    queryFn: () => api.getExpenseTimeFilter(dateFilter.value),
  });


  const totalIncome = computed(() =>
  income.value?.reduce((sum, { amount }) => sum.plus(amount), new Decimal(0)).toNumber() ?? 0
);

const totalExpenses = computed(() =>
  expenses.value?.reduce((sum, { amount }) => sum.plus(amount), new Decimal(0)).toNumber() ?? 0
);

const totalSaved = computed(() => new Decimal(totalIncome.value).minus(totalExpenses.value).toNumber() ?? 0);


</script>

<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Spent & Saved</h2>
    <Tabs v-model="timeframe" class="w-full">
      <TabsList class="grid w-full grid-cols-4">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      <TabsContent :value="timeframe">
        <div v-if="timeframe === 'custom'" class="mt-4 p-4 bg-muted rounded-md">
          <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div class="flex flex-col space-y-2">
              <InputDatepicker
                v-model="customDateRange.start"
                :max-date="customDateRange.end"
                label="Start Date"
                class="px-3 py-2 border rounded-md"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <InputDatepicker
                v-model="customDateRange.end"
                :min-date="customDateRange.start"
                label="End Date"
                class="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
        <Transition name="fade-slide" mode="out-in">
          <div :key="timeframe" class="grid gap-4 md:grid-cols-3 mt-4">
            <OverviewCard
              title="Income"
              description="Total income based on selected timeframe"
              :value="`${totalIncome}€`"
              :is-loading="isLoadingIncome"
              :error="incomeError"
            />
            <OverviewCard
              title="Spent"
              description="Total expenses based on selected timeframe"
              :value="`${totalExpenses}€`"
              :is-loading="isLoadingExpenses"
              :error="expensesError"
            />
            <OverviewCard
              title="Saved"
              description="Total saved based on selected timeframe"
              :value="`${totalSaved}€`"
              :is-loading="isLoadingIncome || isLoadingExpenses"
              :error="incomeError || expensesError"
              :value-class="totalSaved >= 0 ? 'text-green-600' : 'text-red-600'"
            />
          </div>
        </Transition>

        <Transition  v-if="expenses && expenses.length > 0"  name="fade-slide" mode="out-in">
          <div :key="`chart-${timeframe}`" class="mt-6" >
            <CategoriesExpensesChart :expenses="expenses" />
          </div>
        </Transition>
      </TabsContent>
    </Tabs>
  </section>
</template>

<style scoped>
  /* Fade + Slide Transition */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
