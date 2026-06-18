'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserProfile } from '@/lib/models/user';
import { auth } from '@/lib/firebase/auth';
import { getUserProfileByUid } from '@/lib/firebase/firestore';

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
} | null;

type AuthContextValue = {
  user: AuthUser;
  userProfile: UserProfile | null;
  profileLoaded: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userProfile: null,
  profileLoaded: false,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (!firebaseUser) {
        setUser(null);
        setUserProfile(null);
        setProfileLoaded(true);
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
        createdAt: new Date(),
      });
      setProfileLoaded(false);
      setLoading(false);

      try {
        const profile = await getUserProfileByUid(firebaseUser.uid);
        if (!mounted) return;

        if (profile) {
          setUserProfile(profile);
        }
      } catch {
        if (!mounted) return;
      } finally {
        if (mounted) {
          setProfileLoaded(true);
        }
      }
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, profileLoaded, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
