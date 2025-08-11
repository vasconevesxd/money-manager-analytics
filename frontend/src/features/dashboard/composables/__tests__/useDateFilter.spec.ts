import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useDateFilter } from '../useDateFilter';
import { Timeframe } from '@/types/index.types';
import dayjs from 'dayjs';

describe('useDateFilter', () => {
  const now = dayjs();
  
  // Mock the current date for consistent testing
  const mockToday = now.format('YYYY-MM-DD');
  const mockStartOfWeek = now.startOf('week').format('YYYY-MM-DD');
  const mockStartOfYear = now.startOf('year').format('YYYY-MM-DD');
  const mockEndOfYear = now.endOf('year').format('YYYY-MM-DD');
  
  const customStart = '2023-01-01';
  const customEnd = '2023-01-31';
  
  const timeframe = ref(Timeframe.DAY);
  const customDateRange = ref({ start: customStart, end: customEnd });
  
  beforeEach(() => {
    timeframe.value = Timeframe.DAY;
    customDateRange.value = { start: customStart, end: customEnd };
  });
  
  it('should return undefined when timeframe is falsy', () => {
    timeframe.value = '' as any;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    expect(dateFilter.value).toBeUndefined();
  });
  
  it('should return undefined when start date is missing', () => {
    customDateRange.value.start = '';
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    expect(dateFilter.value).toBeUndefined();
  });
  
  it('should return undefined when end date is missing', () => {
    customDateRange.value.end = '';
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    expect(dateFilter.value).toBeUndefined();
  });
  
  it('should return day filter when timeframe is day', () => {
    timeframe.value = Timeframe.DAY;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    
    expect(dateFilter.value).toEqual({
      start_date: mockToday,
      end_date: mockToday,
    });
  });
  
  it('should return week filter when timeframe is week', () => {
    timeframe.value = Timeframe.WEEK;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    
    expect(dateFilter.value).toEqual({
      start_date: mockStartOfWeek,
      end_date: mockToday,
    });
  });
  
  it('should return year filter when timeframe is year', () => {
    timeframe.value = Timeframe.YEAR;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    
    expect(dateFilter.value).toEqual({
      start_date: mockStartOfYear,
      end_date: mockEndOfYear,
    });
  });
  
  it('should return custom filter when timeframe is custom', () => {
    timeframe.value = Timeframe.CUSTOM;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    
    expect(dateFilter.value).toEqual({
      start_date: customStart,
      end_date: customEnd,
    });
  });
  
  it('should update filter when customDateRange changes', () => {
    timeframe.value = Timeframe.CUSTOM;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    
    expect(dateFilter.value).toEqual({
      start_date: customStart,
      end_date: customEnd,
    });
    
    // Update custom date range
    const newStart = '2023-02-01';
    const newEnd = '2023-02-28';
    customDateRange.value = { start: newStart, end: newEnd };
    
    expect(dateFilter.value).toEqual({
      start_date: newStart,
      end_date: newEnd,
    });
  });
  
  it('should update filter when timeframe changes', () => {
    timeframe.value = Timeframe.DAY;
    const { dateFilter } = useDateFilter(timeframe, customDateRange);
    
    expect(dateFilter.value).toEqual({
      start_date: mockToday,
      end_date: mockToday,
    });
    
    // Change timeframe to custom
    timeframe.value = Timeframe.CUSTOM;
    
    expect(dateFilter.value).toEqual({
      start_date: customStart,
      end_date: customEnd,
    });
  });
});
