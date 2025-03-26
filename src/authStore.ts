export interface User {
  id: number;
  name: string;
  // Extendable
}

type CallbackType = 'auth' | 'guest' | 'change';

class AuthStore {
  private static instance: AuthStore;
  private user: User | null = null;
  private listeners = new Map<CallbackType, Set<() => void>>();

  private constructor() {
    this.listeners.set('auth', new Set());
    this.listeners.set('guest', new Set());
    this.listeners.set('change', new Set());
  }

  static getInstance() {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  setUser(user: User | null) {
    const wasAuthenticated = !!this.user;
    const isAuthenticated = !!user;

    this.user = user;
    this.emit('change');

    if (isAuthenticated) {
      this.emit('auth');
    } else {
      this.emit('guest');
    }

    if (wasAuthenticated && !isAuthenticated) {
      this.emit('guest');
    }
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.user;
  }

  subscribe(type: CallbackType, callback: () => void) {
    this.listeners.get(type)!.add(callback);
    return () => this.listeners.get(type)!.delete(callback);
  }

  clearListeners(type: CallbackType) {
    this.listeners.get(type)!.clear();
  }

  private emit(type: CallbackType) {
    this.listeners.get(type)!.forEach((cb) => cb());
  }
}

export const authStore = AuthStore.getInstance();
export { AuthStore };
