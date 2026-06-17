'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserProfile } from '@/lib/models/user';
import { auth } from '@/lib/firebase/auth';
import { getUserProfileByUid } from '@/lib/firebase/firestore';

const DEFAULT_COUNTRY_CODE = process.env.NEXT_PUBLIC_QUEST_BROWSE_COUNTRY_CODE ?? 'SG';

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
} | null;

type AuthContextValue = {
  user: AuthUser;
  userProfile: UserProfile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userProfile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (!firebaseUser) {
        setUser(null);
        setUserProfile(null);
        setLoading(false);
        return;
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });
      setUserProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName: firebaseUser.displayName ?? '',
        photoURL: firebaseUser.photoURL ?? undefined,
        role: 'poster',
        countryCode: DEFAULT_COUNTRY_CODE,
        createdAt: new Date(),
      });
      setLoading(false);

      try {
        const profile = await getUserProfileByUid(firebaseUser.uid);
        if (!mounted) return;

        if (profile) {
          setUserProfile(profile);
        }
      } catch {
        if (!mounted) return;
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
