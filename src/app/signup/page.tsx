import type { Metadata } from 'next';
import AuthScreen from '../components/auth/AuthScreen';

export const metadata: Metadata = {
  title: 'Sign up — Quest',
  description: 'Create your Quest account to hire trusted humans — or start earning as one.',
};

export default function SignupPage() {
  return <AuthScreen mode="signup" layout="centered" switchHref="/login" />;
}
