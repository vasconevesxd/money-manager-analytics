import { useQuery } from '@tanstack/vue-query';
import { api } from '@/lib/api';
import type { DateFilter } from '@/types/db/api.types';
import type { Ref } from 'vue';

export const useExpenseTimeFilterQuery = (dateFilter: Ref<DateFilter | undefined>) => {
  return useQuery({
    queryKey: ['expense-time-filter', dateFilter],
    queryFn: () => api.getExpenseTimeFilter(dateFilter.value),
    enabled: !!dateFilter,
  });
};
