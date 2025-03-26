import { useSyncExternalStore } from 'react';
import { authStore, User } from './authStore';

export function useAuth(): User | null {
  return useSyncExternalStore(
    (callback : () => void) => authStore.subscribe('change', callback),
    () => authStore.getUser(),
    () => null
  );
}
