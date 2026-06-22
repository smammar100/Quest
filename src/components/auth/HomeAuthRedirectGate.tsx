'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/controllers/useAuth';
import FullscreenLoader from '@/components/ui/FullscreenLoader';

export default function HomeAuthRedirectGate() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/post-quest');
    }
  }, [isAuthenticated, loading, router]);

  if (!loading && !isAuthenticated) {
    return null;
  }

  return <FullscreenLoader />;
}