import { useQuery } from '@tanstack/vue-query';
import { api } from '@/lib/api';
import type { DateFilter } from '@/types/db/api.types';
import type { Ref } from 'vue';
import { computed } from 'vue';

export const useExpenseTimeFilterQuery = (dateFilter: Ref<DateFilter | undefined>) => {
  return useQuery({
    queryKey: ['expense-time-filter', dateFilter],
    queryFn: () => {
      if (!dateFilter.value) {
        throw new Error('DateFilter is required');
      }
      return api.getExpenseTimeFilter(dateFilter.value);
    },
    enabled: computed(() => Boolean(dateFilter.value?.start_date && dateFilter.value?.end_date)),
  });
};
