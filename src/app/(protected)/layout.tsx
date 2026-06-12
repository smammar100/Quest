// Auth guard for all routes under (protected)/.
// TODO: add real session check here once Firebase is wired up.
// Example:
//   const session = await getServerSession();
//   if (!session) redirect('/login');
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
