import axios from './axios';
import type { DateFilter } from '@/types/db/apiTypes';
import type { Expense, Income } from '@/types/db';

// API service
export const api = {
  getIncomeTimeFilter: async (filter?: DateFilter): Promise<Income[]> => {
    const params = new URLSearchParams();
    if (filter?.start_date) params.append('start_date', filter.start_date);
    if (filter?.end_date) params.append('end_date', filter.end_date);

    const url = `/income/time-filter${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  },

  getExpenseTimeFilter: async (filter?: DateFilter): Promise<Expense[]> => {
    const params = new URLSearchParams();
    if (filter?.start_date) params.append('start_date', filter.start_date);
    if (filter?.end_date) params.append('end_date', filter.end_date);

    const url = `/expense/time-filter${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  },

  importExpenses: async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/import-expenses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
