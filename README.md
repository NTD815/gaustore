# Event-Driven Auth Store

A singleton-based, event-driven authentication store with React hook support.

## Installation

```bash
npm install gaustore
```

## Usage

```tsx
import { authStore, useAuth, User } from 'gaustore';

// Set user data
authStore.setUser({ id: 1, name: 'John Doe' });

// Subscribe to authentication changes
const unsubscribe = authStore.subscribe('change', () => {
  console.log('Auth state changed:', authStore.isAuthenticated());
});

// React component example
function Profile() {
  const user = useAuth();

  return (
    <div>
      {user ? <p>Welcome, {user.name}</p> : <p>Please log in.</p>}
    </div>
  );
}

//Extend the User type 
interface MyUser extends User{
  key: string
}

//then store and get
authStore.setUser({ id:1, name:'John Doe', key:'Value'});

//get from hook for reactive state with extended type
const user = useAuth<MyUser>();

//or directly from store
const userFromStore = authStore.getUser<MyUser>();
```

## API

- `authStore.setUser(user: User | null)`: Sets the current user.
- `authStore.getUser(): User | null`: Retrieves the current user.
- `authStore.isAuthenticated(): boolean`: Checks if a user is authenticated.
- `authStore.subscribe(event: 'auth' | 'guest' | 'change', callback: () => void)`: Subscribes to authentication events.
- `authStore.clearListeners(event: 'auth' | 'guest' | 'change')`: Clears event listeners.

## License

MIT
