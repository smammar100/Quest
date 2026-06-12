'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
} | null;

type AuthContextValue = {
  user: AuthUser;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState<AuthUser>(null);
  const [loading] = useState(false);

  // TODO: replace the stubs above with real Firebase listener:
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (firebaseUser) => {
  //     setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName } : null);
  //     setLoading(false);
  //   });
  //   return unsub;
  // }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
