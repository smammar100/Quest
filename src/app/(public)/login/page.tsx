import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthScreen from '../../../components/auth/AuthScreen';

export const metadata: Metadata = {
  title: 'Log in — Quest',
  description: 'Log in to Quest to hire trusted humans or pick up quests near you.',
};

export default function LoginPage() {
  return (
    <Suspense>
      <AuthScreen mode="login" layout="centered" switchHref="/signup" />
    </Suspense>
  );
}