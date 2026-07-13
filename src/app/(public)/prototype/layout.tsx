import type { Metadata } from 'next';

// Prototypes are design scratch space. robots.txt already disallows
// /prototype/, and this noindex is the belt-and-suspenders layer in case a
// prototype URL gets linked from somewhere crawlable.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
