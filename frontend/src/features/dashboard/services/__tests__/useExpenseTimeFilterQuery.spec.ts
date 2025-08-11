import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useExpenseTimeFilterQuery } from '../useExpenseTimeFilterQuery';
import { api } from '@/lib/api';
import { createTestQueryClient, waitForComponentUpdate } from '@/test/utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { mockExpenses } from '@/test/mocks/handlers';
import { mount, type VueWrapper } from '@vue/test-utils';
import type { DateFilter } from '@/types/db/api.types';
import type { Expense } from '@/types/db/index.types';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { ComponentPublicInstance } from 'vue';

// Mock the API
vi.mock('@/lib/api', () => ({
  api: {
    getExpenseTimeFilter: vi.fn()
  }
}));

// Helper to wait for next microtask tick
const flushPromises = () => new Promise(setImmediate);

// Define types for component and query
interface TestComponentVM {
  query: UseQueryReturnType<Expense[], Error>;
  dateFilter?: {
    value: DateFilter;
  };
}

// Helper to safely cast wrapper.vm to our expected type
function getVM(wrapper: VueWrapper<ComponentPublicInstance>): TestComponentVM {
  return wrapper.vm as unknown as TestComponentVM;
}

describe('useExpenseTimeFilterQuery', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.resetAllMocks();
    queryClient = createTestQueryClient();
    (api.getExpenseTimeFilter as ReturnType<typeof vi.fn>).mockResolvedValue(mockExpenses);
  });

  it('should fetch expenses when enabled', async () => {
    const TestComponent = {
      template: '<div>Test</div>',
      setup() {
        const dateFilter = ref<DateFilter>({ start_date: '2023-01-01', end_date: '2023-01-31' });
        const query = useExpenseTimeFilterQuery(dateFilter);
        return { query };
      }
    };

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]]
      }
    });

    await flushPromises();
    await waitForComponentUpdate();

    expect(api.getExpenseTimeFilter).toHaveBeenCalledTimes(1);
    expect(api.getExpenseTimeFilter).toHaveBeenCalledWith({
      start_date: '2023-01-01',
      end_date: '2023-01-31'
    });

    const vm = getVM(wrapper);
    expect(vm.query.data.value).toEqual(mockExpenses);
    expect(vm.query.isPending.value).toBe(false);
    expect(vm.query.error.value).toBeNull();
  });

  it('should handle API errors', async () => {
    const error = new Error('API error');
    (api.getExpenseTimeFilter as ReturnType<typeof vi.fn>).mockRejectedValue(error);

    const TestComponent = {
      template: '<div>Test</div>',
      setup() {
        const dateFilter = ref<DateFilter>({ start_date: '2023-01-01', end_date: '2023-01-31' });
        const query = useExpenseTimeFilterQuery(dateFilter);
        return { query };
      }
    };

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]]
      }
    });

    await flushPromises();
    await waitForComponentUpdate();

    expect(api.getExpenseTimeFilter).toHaveBeenCalledTimes(1);

    const vm = getVM(wrapper);
    expect(vm.query.data.value).toBeUndefined();
    expect(vm.query.isPending.value).toBe(false);
    expect(vm.query.error.value).toBe(error);
  });

  it('should refetch when dateFilter changes', async () => {
    // Create a reactive dateFilter that we can modify
    const dateFilter = ref<DateFilter>({ start_date: '2023-01-01', end_date: '2023-01-31' });
    
    // Create a component that uses our reactive dateFilter
    const TestComponent = {
      template: '<div>Test</div>',
      setup() {
        const query = useExpenseTimeFilterQuery(dateFilter);
        return { query };
      }
    };

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]]
      }
    });

    await flushPromises();
    await waitForComponentUpdate();

    // Verify initial call
    expect(api.getExpenseTimeFilter).toHaveBeenCalledTimes(1);
    expect(api.getExpenseTimeFilter).toHaveBeenCalledWith({
      start_date: '2023-01-01',
      end_date: '2023-01-31'
    });

    // Clear the mock to track new calls
    (api.getExpenseTimeFilter as ReturnType<typeof vi.fn>).mockClear();
    
    // Change dateFilter directly (since it's in our test scope)
    dateFilter.value = {
      start_date: '2023-02-01',
      end_date: '2023-02-28'
    };

    // Wait for Vue reactivity & query refetch
    await flushPromises();
    await waitForComponentUpdate();
    await flushPromises();

    // Verify the refetch happened with new parameters
    expect(api.getExpenseTimeFilter).toHaveBeenCalledTimes(1);
    expect(api.getExpenseTimeFilter).toHaveBeenCalledWith({
      start_date: '2023-02-01',
      end_date: '2023-02-28'
    });

    const vm = getVM(wrapper);
    expect(vm.query.data.value).toEqual(mockExpenses);
    expect(vm.query.isPending.value).toBe(false);
    expect(vm.query.error.value).toBeNull();
  });

  it('should not fetch when dateFilter is missing required fields', async () => {
    const TestComponent = {
      template: '<div>Test</div>',
      setup() {
        // Missing end_date
        const dateFilter = ref<Partial<DateFilter>>({ start_date: '2023-01-01' });
        // Using type assertion is necessary here for the test case
        const query = useExpenseTimeFilterQuery(dateFilter as unknown as typeof dateFilter);
        return { query };
      }
    };

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]]
      }
    });

    await flushPromises();
    await waitForComponentUpdate();

    // Should not call API when missing required fields
    expect(api.getExpenseTimeFilter).not.toHaveBeenCalled();

    const vm = getVM(wrapper);
    // Just check that the API wasn't called
    expect(api.getExpenseTimeFilter).not.toHaveBeenCalled();
  });

  it('should not fetch when dateFilter is undefined', async () => {
    const TestComponent = {
      template: '<div>Test</div>',
      setup() {
        const dateFilter = ref<DateFilter | undefined>(undefined);
        const query = useExpenseTimeFilterQuery(dateFilter);
        return { query };
      }
    };

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]]
      }
    });

    await flushPromises();
    await waitForComponentUpdate();

    // Should not call API when dateFilter is undefined
    expect(api.getExpenseTimeFilter).not.toHaveBeenCalled();

    const vm = getVM(wrapper);
    // Just check that the API wasn't called
    expect(api.getExpenseTimeFilter).not.toHaveBeenCalled();
  });
});
