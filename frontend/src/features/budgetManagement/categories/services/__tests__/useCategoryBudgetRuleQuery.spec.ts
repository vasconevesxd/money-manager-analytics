import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  useCategoryBudgetRuleQuery, 
  useUpdateCategoryBudgetRule,
  useCreateCategoryBudgetRule 
} from '../useCategoryBudgetRuleQuery';
import { api } from '@/lib/api';
import { createTestQueryClient, waitForComponentUpdate } from '@/test/utils';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { mockCategoryBudgetRules } from '@/test/mocks/handlers';
import { mount } from '@vue/test-utils';

// Mock the API
vi.mock('@/lib/api', () => ({
  api: {
    getCategoryBudgetRule: vi.fn(),
    updateCategoryBudgetRule: vi.fn(),
    createCategoryBudget: vi.fn()
  }
}));

const flushPromises = () => new Promise(setImmediate);

describe('Category Budget Rule Queries', () => {
  let queryClient: QueryClient;
  
  beforeEach(() => {
    vi.resetAllMocks();
    queryClient = createTestQueryClient();
    (api.getCategoryBudgetRule as any).mockResolvedValue(mockCategoryBudgetRules);
  });
  
  // ... unchanged tests for useCategoryBudgetRuleQuery ...
  
  describe('useUpdateCategoryBudgetRule', () => {
    it('should update category budget rule', async () => {
      const updatedRule = { id: 1, name: 'Updated Food' };
      (api.updateCategoryBudgetRule as any).mockResolvedValue(updatedRule);
      
      const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
      
      const TestComponent = {
        template: '<div>Test</div>',
        setup() {
          return { mutation: useUpdateCategoryBudgetRule() };
        }
      };
      
      const wrapper = mount(TestComponent, {
        global: { plugins: [[VueQueryPlugin, { queryClient }]] }
      });
      
      await wrapper.vm.mutation.mutateAsync({ categoryId: 1, name: 'Updated Food' });
      await flushPromises();           // Wait for Vue Query internal updates
      await waitForComponentUpdate();  // Wait for Vue component updates
      
      expect(api.updateCategoryBudgetRule).toHaveBeenCalledTimes(1);
      expect(api.updateCategoryBudgetRule).toHaveBeenCalledWith(1, { name: 'Updated Food' });
      expect(wrapper.vm.mutation.data.value).toEqual(updatedRule);
      expect(wrapper.vm.mutation.isPending.value).toBe(false);
      expect(wrapper.vm.mutation.error.value).toBeNull();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['category-budget-rule'] });
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['category-expense-by-budget-rule'] });
    });
    
    it('should handle API errors during update', async () => {
      const error = new Error('API error');
      (api.updateCategoryBudgetRule as any).mockRejectedValue(error);
      
      const TestComponent = {
        template: '<div>Test</div>',
        setup() {
          return { mutation: useUpdateCategoryBudgetRule() };
        }
      };
      
      const wrapper = mount(TestComponent, {
        global: { plugins: [[VueQueryPlugin, { queryClient }]] }
      });
      
      await expect(wrapper.vm.mutation.mutateAsync({ categoryId: 1, name: 'Updated Food' }))
        .rejects.toThrow();
      await flushPromises();
      await waitForComponentUpdate();
      
      expect(api.updateCategoryBudgetRule).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.mutation.data?.value).toBeUndefined();
      expect(wrapper.vm.mutation.isPending?.value).toBe(false);
      expect(wrapper.vm.mutation.error?.value).toBe(error);
    });
  });
  
  describe('useCreateCategoryBudgetRule', () => {
    it('should create category budget rule', async () => {
      const newRule = { id: 3, name: 'New Category' };
      (api.createCategoryBudget as any).mockResolvedValue(newRule);
      
      const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
      
      const TestComponent = {
        template: '<div>Test</div>',
        setup() {
          return { mutation: useCreateCategoryBudgetRule() };
        }
      };
      
      const wrapper = mount(TestComponent, {
        global: { plugins: [[VueQueryPlugin, { queryClient }]] }
      });
      
      await wrapper.vm.mutation.mutateAsync({ name: 'New Category' });
      await flushPromises();
      await waitForComponentUpdate();
      
      expect(api.createCategoryBudget).toHaveBeenCalledTimes(1);
      expect(api.createCategoryBudget).toHaveBeenCalledWith('New Category');
      expect(wrapper.vm.mutation.data?.value).toEqual(newRule);
      expect(wrapper.vm.mutation.isPending?.value).toBe(false);
      expect(wrapper.vm.mutation.error?.value).toBeNull();
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['category-budget-rule'] });
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['category-expense-by-budget-rule'] });
    });
    
    it('should handle API errors during creation', async () => {
      const error = new Error('API error');
      (api.createCategoryBudget as any).mockRejectedValue(error);
      
      const TestComponent = {
        template: '<div>Test</div>',
        setup() {
          return { mutation: useCreateCategoryBudgetRule() };
        }
      };
      
      const wrapper = mount(TestComponent, {
        global: { plugins: [[VueQueryPlugin, { queryClient }]] }
      });
      
      await expect(wrapper.vm.mutation.mutateAsync({ name: 'New Category' }))
        .rejects.toThrow();
      await flushPromises();
      await waitForComponentUpdate();
      
      expect(api.createCategoryBudget).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.mutation.data?.value).toBeUndefined();
      expect(wrapper.vm.mutation.isPending?.value).toBe(false);
      expect(wrapper.vm.mutation.error?.value).toBe(error);
    });
  });
});