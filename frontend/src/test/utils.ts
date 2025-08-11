import { mount, flushPromises } from '@vue/test-utils';
import { vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import type { Component } from 'vue';
import { createPinia } from 'pinia';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

// Create a fresh pinia instance for each test
export function createTestPinia() {
  return createPinia();
}

// Create a fresh query client for each test
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
    },
  });
}

// Create a test router
export function createTestRouter(routes = []) {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: { template: '<div>Home</div>' },
      },
      ...routes,
    ],
  });
}

// Mount component with common plugins
export async function mountWithPlugins(component: Component, options = {}) {
  const pinia = createTestPinia();
  const queryClient = createTestQueryClient();
  const router = createTestRouter();

  const wrapper = mount(component, {
    global: {
      plugins: [
        pinia,
        router,
        [VueQueryPlugin, { queryClient }],
      ],
      ...options?.global,
    },
    ...options,
  });

  await flushPromises();
  return { wrapper, pinia, queryClient, router };
}

// Mock API responses
export function mockApiResponse(method: string, url: string, response: any, status = 200) {
  return vi.spyOn(global, 'fetch').mockImplementation((input: any) => {
    if (
      input.url.includes(url) && 
      (input.method === method || (method === 'GET' && !input.method))
    ) {
      return Promise.resolve({
        ok: status >= 200 && status < 300,
        status,
        json: () => Promise.resolve(response),
      } as Response);
    }
    return Promise.reject(new Error(`Unhandled request: ${input.method || 'GET'} ${input.url}`));
  });
}

// Wait for component to update
export async function waitForComponentUpdate() {
  await new Promise(resolve => setTimeout(resolve, 0));
  await flushPromises();
}
