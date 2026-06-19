'use client';

import { useAuthContext } from '@/context/AuthContext';
import {
  completeEmailSignupProfile,
  deleteCurrentAuthUser,
  getCurrentAuthUser,
  logOut,
  refreshUserVerificationStatus,
  sendSignupVerificationEmail,
  signInEmail,
  signInGoogle,
  signUpEmail,
} from '@/lib/firebase/auth';

// Controller hook: the single place components go for auth state and actions.
// Add signIn / signOut / signUp here as wrappers over lib/firebase/auth —
// never call Firebase directly from a component.
export function useAuth() {
  const { user, userProfile, profileLoaded, loading } = useAuthContext();

  return {
    user,
    userProfile,
    profileLoaded,
    loading,
    isAuthenticated: user !== null,
    signIn: signInEmail,
    signUp: signUpEmail,
    completeSignupProfile: completeEmailSignupProfile,
    sendVerificationEmail: sendSignupVerificationEmail,
    refreshVerificationStatus: refreshUserVerificationStatus,
    getCurrentUser: getCurrentAuthUser,
    deleteCurrentUser: deleteCurrentAuthUser,
    signInWithGoogle: signInGoogle,
    signOut: logOut,
  };
}
