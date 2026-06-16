import type { Metadata } from 'next';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import ScrollFX from '@/components/sections/ScrollFX';
import QuestList from '@/components/browse-quest/QuestList';

export const metadata: Metadata = {
  title: 'Browse quest list | Quest',
  description:
    'Browse live quests with category tabs and pagination',
};

export default function BrowseQuestListPage() {
  return (
    <>
      <SiteHeader />
      <QuestList />
      <SiteFooter />
      <ScrollFX />
    </>
  );
}
