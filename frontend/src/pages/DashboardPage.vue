<script setup lang="ts">
  // Vue
  import { ref } from 'vue';

  // Types
  import type { TimeframeType } from '@/types';
  import { Timeframe } from '@/types';
  import type { CustomDateRange } from '@/features/dashboard/filters/types';

  //Libraries
  import dayjs from 'dayjs';

  // UI Components
  import { Separator } from '@/components/ui/separator';

  // Feature Components
  import OverviewInfo from '@/features/dashboard/OverviewInfo.vue';
  import CategoriesExpensesChart from '@/features/dashboard/analytics/CategoriesExpensesChart.vue';
  import CustomTimeFilter from '@/features/dashboard/filters/CustomTimeFilter.vue';
  import TimeFilter from '@/features/dashboard/filters/TimeFilter.vue';

  // Composables
  import { useExpenseTimeFilterQuery } from '@/features/dashboard/services/useExpenseTimeFilterQuery';
  import { useIncomeTimeFilterQuery } from '@/features/dashboard/services/useIncomeTimeFilterQuery';
  import { useDateFilter } from '@/features/dashboard/composables/useDateFilter';

  const timeframe = ref<TimeframeType>(Timeframe.YEAR);

  const customDateRange = ref({
    start: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
  });

  const { dateFilter } = useDateFilter(timeframe, customDateRange);

  const {
    data: expenseSummary,
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useExpenseTimeFilterQuery(dateFilter);
  const {
    data: incomeSummary,
    isLoading: isLoadingIncome,
    error: incomeError,
  } = useIncomeTimeFilterQuery(dateFilter);

  const handleCustomDateRangeSelected = (val: CustomDateRange) => {
    Object.assign(customDateRange.value, val);
  };

  const handleTimeframeChange = (val: TimeframeType) => {
    timeframe.value = val;
  };
  
</script>

<template>
  <main class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
    </div>

    <Separator />

    <!-- Spent & Saved Section -->
    <TimeFilter :timeframe="timeframe" @update:timeframe="handleTimeframeChange">
      <template #panels="{ timeframe }">
        <Transition name="fade-slide" mode="out-in">
          <section v-if="timeframe" :key="timeframe">
            <CustomTimeFilter
              :timeframe="timeframe"
              :custom-date-range="customDateRange"
              @update:custom-date-range-selected="handleCustomDateRangeSelected"
            />
            <OverviewInfo
              :income="incomeSummary"
              :expenses="expenseSummary"
              :request-state="{ isLoadingIncome, isLoadingExpenses, incomeError, expensesError }"
            />
            <CategoriesExpensesChart
              :expenses="expenseSummary"
              :request-state="{ isLoadingExpenses, expensesError }"
            />
          </section>
        </Transition>
      </template>
    </TimeFilter>
  </main>
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