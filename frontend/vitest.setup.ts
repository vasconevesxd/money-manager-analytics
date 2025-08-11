import { vi, beforeAll, afterAll, afterEach } from 'vitest';
import { config } from '@vue/test-utils';
import { server } from './src/test/mocks/server';

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

// Mock global objects
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Configure Vue Test Utils
config.global.stubs = {
  transition: false,
  'router-link': true,
  'router-view': true,
};

// Mock Highcharts since it's used in charts
vi.mock('highcharts', () => ({
  default: {
    chart: vi.fn(),
  },
}));

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    path: '/',
    query: {},
    params: {},
  })),
}));
