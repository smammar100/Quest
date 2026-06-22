'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UserProfile } from '@/lib/models/user';
import { auth, handleAuthRedirectResult } from '@/lib/firebase/auth';
import { getUserProfileByUid } from '@/lib/firebase/firestore';

type BackendSelfUserPayload = {
  user?: {
    countryCode?: unknown;
    country_code?: unknown;
  } | null;
};

const AUTH_COOKIE_NAME = 'quest_auth';
const backendCountryCodeRequestCache = new Map<string, Promise<string | undefined>>();

const setAuthCookie = (isAuthenticated: boolean) => {
  if (typeof document === 'undefined') {
    return;
  }

  if (isAuthenticated) {
    document.cookie = `${AUTH_COOKIE_NAME}=1; Path=/; Max-Age=2592000; SameSite=Lax`;
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
};

const normalizeCountryCode = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.trim().toUpperCase();
  return normalized.length === 2 ? normalized : undefined;
};

const getBackendCountryCodeByUid = async (uid: string): Promise<string | undefined> => {
  const cachedRequest = backendCountryCodeRequestCache.get(uid);
  if (cachedRequest) {
    return cachedRequest;
  }

  const request = (async () => {
    const response = await fetch(`/api/auth/self?${new URLSearchParams({ userID: uid }).toString()}`);

    if (!response.ok) {
      return undefined;
    }

    const payload = (await response.json()) as BackendSelfUserPayload;
    const backendUser = payload.user;

    return (
      normalizeCountryCode(backendUser?.country_code) ??
      normalizeCountryCode(backendUser?.countryCode)
    );
  })();

  backendCountryCodeRequestCache.set(uid, request);
  return request;
};

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

    void (async () => {
      try {
        const result = await handleAuthRedirectResult();
        console.info('[auth] redirect result', {
          hasUser: Boolean(result?.user),
          providerId: result?.providerId ?? null,
          operationType: result?.operationType ?? null,
        });
      } catch (error) {
        console.error('[auth] redirect result error', error);
      }
    })();

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (!firebaseUser) {
        setAuthCookie(false);
        setUser(null);
        setUserProfile(null);
        setProfileLoaded(true);
        setLoading(false);
        return;
      }

      setAuthCookie(true);

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });
      const baseProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName: firebaseUser.displayName ?? '',
        photoURL: firebaseUser.photoURL ?? undefined,
        role: 'poster',
        createdAt: new Date(),
      };
      setUserProfile(baseProfile);
      setProfileLoaded(false);
      setLoading(false);

      try {
        const [backendCountryResult, firestoreProfileResult] = await Promise.allSettled([
          getBackendCountryCodeByUid(firebaseUser.uid),
          getUserProfileByUid(firebaseUser.uid),
        ]);

        if (!mounted) return;

        const backendCountryCode =
          backendCountryResult.status === 'fulfilled'
            ? backendCountryResult.value
            : undefined;
        const firestoreProfile =
          firestoreProfileResult.status === 'fulfilled'
            ? firestoreProfileResult.value
            : null;

        setUserProfile({
          uid: firebaseUser.uid,
          email: firestoreProfile?.email ?? baseProfile.email,
          displayName: firestoreProfile?.displayName ?? baseProfile.displayName,
          photoURL: firestoreProfile?.photoURL ?? baseProfile.photoURL,
          role: firestoreProfile?.role ?? baseProfile.role,
          createdAt: firestoreProfile?.createdAt ?? baseProfile.createdAt,
          countryCode: backendCountryCode ?? firestoreProfile?.countryCode,
        });
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
