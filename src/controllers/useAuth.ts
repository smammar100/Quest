'use client';

import { useAuthContext } from '@/context/AuthContext';

// Controller hook: the single place components go for auth state and actions.
// Add signIn / signOut / signUp here as wrappers over lib/firebase/auth —
// never call Firebase directly from a component.
export function useAuth() {
  const { user, loading } = useAuthContext();

  return {
    user,
    loading,
    isAuthenticated: !loading && user !== null,
    // TODO: add signIn, signOut, signUp that call lib/firebase/auth
  };
}
