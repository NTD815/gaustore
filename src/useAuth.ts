import { useSyncExternalStore } from 'react';
import { authStore, User } from './authStore';

export function useAuth<T extends User>(): T | null {
  return useSyncExternalStore(
    (callback : () => void) => authStore.subscribe('change', callback),
    () => authStore.getUser() as T | null,
    () => null
  );
}
