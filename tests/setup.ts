import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock da API fetch
globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  ) as unknown as jest.Mock;
  
