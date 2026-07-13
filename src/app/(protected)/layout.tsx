import type { Metadata } from 'next';
import SiteHeader from '@/components/layout/SiteHeader';

// Authenticated pages carry no SEO value; keep them out of the index even if
// a crawler reaches one before middleware redirects it.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Every route under (protected)/ gets the authenticated nav automatically.
// Middleware (src/middleware.ts) is responsible for redirecting unauthenticated
// users away from these routes before this layout renders.
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
