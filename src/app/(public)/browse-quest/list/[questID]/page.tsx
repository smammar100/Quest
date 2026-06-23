import type { Metadata } from 'next';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ScrollFX from '@/components/sections/ScrollFX';
import QuestDetailsView from '@/components/browse-quest/QuestDetailsView';

export const metadata: Metadata = {
  title: 'Quest details | Quest',
  description: 'View full quest details including price, location, schedule, and requirements.',
};

type Props = {
  params: Promise<{ questID: string }>;
};

export default async function BrowseQuestDetailsPage({ params }: Props) {
  const { questID } = await params;

  return (
    <>
      <SiteHeader />
      <QuestDetailsView questID={decodeURIComponent(questID)} />
      <SiteFooter />
      <ScrollFX />
    </>
  );
}
