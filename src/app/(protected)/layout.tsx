import SiteHeader from '@/components/layout/SiteHeader';

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
