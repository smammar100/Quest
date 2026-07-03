import type { Metadata } from 'next';
import SiteHeader from '../../../../../components/layout/SiteHeader';
import SiteFooter from '../../../../../components/layout/SiteFooter';
import CanlifeBody from '../../../../../components/prototype/blog/CanlifeBody';
import { VariantSwitcher } from '../../../../../components/prototype/blog/shared';

export const metadata: Metadata = {
  title: 'Blog · V7 Canlife remix',
  robots: { index: false, follow: false },
};

/* V7 — the Canlife insurance-kit blog body (Figma node 4375-5230) rebuilt in
   Quest branding. Centered display headline, working pill search, working
   trending-topic pills, 3×2 big-radius card grid, "See more" reveal. */
export default function BlogV7() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full bg-white pb-24 font-sans">
        <CanlifeBody />
      </main>
      <SiteFooter />
      <VariantSwitcher active={7} />
    </>
  );
}
