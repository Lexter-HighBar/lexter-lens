import { createContext } from 'react';


export const UserdataApiContext = createContext<{
  get: <T, S = T>(url: string, search?: Partial<S>) => Promise<T>;
  post: <T, E>(url: string, body: E) => Promise<T>;
  patch: <T, E>(url: string, body: E) => Promise<T>;
  destroy: <T>(url: string) => Promise<T>;
} | null>(null);
