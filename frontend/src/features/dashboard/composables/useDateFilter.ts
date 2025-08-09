// Vue
import { computed, type Ref } from 'vue';

// Libraries
import dayjs from 'dayjs';

// Types
import type { DateFilter } from '@/types/db/api.types';
import type { TimeframeType } from '@/types/index.types';

export const useDateFilter = (
  timeframe: Ref<TimeframeType>,
  customDateRange: Ref<{ start: string; end: string }>
) => {
  const dateFilter = computed<DateFilter | undefined>(() => {
    const { start, end } = customDateRange.value;

    if (!timeframe.value || !start || !end) return undefined;

    const now = dayjs();

    const timeframeConfigs: Record<TimeframeType, DateFilter> = {
      day: {
        start_date: now.format('YYYY-MM-DD'),
        end_date: now.format('YYYY-MM-DD'),
      },
      week: {
        start_date: now.startOf('week').format('YYYY-MM-DD'),
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
  });

  return {
    dateFilter,
  };
};
