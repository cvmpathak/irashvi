import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  // Make sure every test starts with a clean DOM.
  cleanup();
});

afterEach(() => {
  cleanup();
});

// JSDOM does not implement matchMedia or scrollTo by default.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// JSDOM does not implement scrollTo; provide a no-op stub.
if (!window.scrollTo) {
  window.scrollTo = (() => {}) as typeof window.scrollTo;
}