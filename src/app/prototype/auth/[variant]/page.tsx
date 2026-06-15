import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AuthScreen, { type AuthMode, type AuthLayout } from '../../../components/auth/AuthScreen';

// One dynamic route serving all 6 auth prototypes: {mode}-{layout}.
//   login-centered · login-split · login-social
//   signup-centered · signup-split · signup-social
// AuthScreen renders the matching Clerk-inspired layout in Quest styling.

const LAYOUTS = ['centered', 'split', 'social'] as const;
const MODES = ['login', 'signup'] as const;

type Params = Promise<{ variant: string }>;

function parse(variant: string): { mode: AuthMode; layout: AuthLayout } | null {
  const [mode, layout] = variant.split('-');
  if ((MODES as readonly string[]).includes(mode) && (LAYOUTS as readonly string[]).includes(layout)) {
    return { mode: mode as AuthMode, layout: layout as AuthLayout };
  }
  return null;
}

export function generateStaticParams() {
  return MODES.flatMap((m) => LAYOUTS.map((l) => ({ variant: `${m}-${l}` })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const parsed = parse((await params).variant);
  if (!parsed) return {};
  const verb = parsed.mode === 'login' ? 'Log in' : 'Sign up';
  return { title: `${verb} (${parsed.layout}) — Quest auth prototype` };
}

export default async function AuthPrototype({ params }: { params: Params }) {
  const parsed = parse((await params).variant);
  if (!parsed) notFound();
  return <AuthScreen mode={parsed.mode} layout={parsed.layout} />;
}
