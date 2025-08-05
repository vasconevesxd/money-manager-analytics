import { useQuery } from '@tanstack/vue-query';
import { api } from '@/lib/api';
import type { DateFilter } from '@/types/db/apiTypes';
import type { Ref } from 'vue';

export const useIncomeTimeFilterQuery = (dateFilter: Ref<DateFilter | undefined>) => {
  return useQuery({
    queryKey: ['income-time-filter', dateFilter],
    queryFn: () => api.getIncomeTimeFilter(dateFilter.value),
    enabled: !!dateFilter,
  });
};
