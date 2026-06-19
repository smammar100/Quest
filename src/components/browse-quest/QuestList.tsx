'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import {
  BROWSE_CATEGORIES,
  type BrowseCategory,
  type BrowseQuest,
  type BrowseQuestResponse,
} from '@/lib/models/browse-quest';
import { resolveSupportedCountryCode } from '@/lib/constants/country-pricing';
import QuestCard from './QuestCard';
import s from './QuestList.module.css';

const DEFAULT_COUNTRY_CODE = resolveSupportedCountryCode(
  process.env.NEXT_PUBLIC_QUEST_BROWSE_COUNTRY_CODE ?? 'SG'
);
const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_QUEST_BROWSE_USER_ID ?? 'web_guest';

type FetchMode = 'replace' | 'append';

const formatCount = (value?: string | number) => {
  if (value == null) return '0';
  const count = Number(value);
  if (Number.isNaN(count)) return String(value);
  return new Intl.NumberFormat('en-US').format(count);
};

const dedupeById = (items: BrowseQuest[]) => {
  const seen = new Set<string>();
  const result: BrowseQuest[] = [];

  for (const item of items) {
    const id = item.idQuests ?? `${item.title ?? 'untitled'}-${item.datePosted ?? ''}`;
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(item);
  }

  return result;
};

const requestQuests = async ({
  category,
  currentPage,
  offset,
  userID,
  countryCode,
}: {
  category: BrowseCategory;
  currentPage: number;
  offset: number;
  userID: string;
  countryCode: string;
}) => {
  const params = new URLSearchParams({
    category,
    currentPage: String(currentPage),
    offset: String(offset),
    userID,
    countryCode,
  });

  const fetchPromise = fetch(`/api/browse-quests?${params.toString()}`, {
    cache: 'no-store',
  });

  const settled = await fetchPromise;

  if (!settled.ok) {
    throw new Error('Could not load quests right now.');
  }

  return (await settled.json()) as BrowseQuestResponse;
};

export default function QuestList() {
  const { user, userProfile, profileLoaded, loading: authLoading } = useAuthContext();
  const [category, setCategory] = useState<BrowseCategory>('All');
  const [quests, setQuests] = useState<BrowseQuest[]>([]);
  const [resultCount, setResultCount] = useState<string | number>('0');
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countryCode = resolveSupportedCountryCode(
    userProfile?.countryCode ?? DEFAULT_COUNTRY_CODE
  );
  const userID = user?.uid ?? DEFAULT_USER_ID;
  const shouldWaitForCountry = authLoading || (user !== null && !profileLoaded);
  const isLoadingView = shouldWaitForCountry || loading;

  const fetchQuests = useCallback(
    async (nextPage: number, nextOffset: number, mode: FetchMode) => {
      if (mode === 'append') {
        setLoadingMore(true);
      }

      try {
        const payload = await requestQuests({
          category,
          currentPage: nextPage,
          offset: nextOffset,
          userID,
          countryCode,
        });
        const incoming = payload.quests ?? [];

        setQuests((prev) =>
          mode === 'append' ? dedupeById([...prev, ...incoming]) : dedupeById(incoming)
        );
        setResultCount(payload.resultCount ?? '0');
        setCurrentPage(nextPage);
        setOffset(nextOffset + incoming.length);
        setHasMore(incoming.length > 2);
      } catch (err) {
        if (mode === 'replace') {
          setQuests([]);
          setResultCount('0');
          setCurrentPage(0);
          setOffset(0);
          setHasMore(false);
        }
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, countryCode, userID]
  );

  useEffect(() => {
    if (shouldWaitForCountry) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const payload = await requestQuests({
          category,
          currentPage: 0,
          offset: 0,
          userID,
          countryCode,
        });
        if (cancelled) return;

        const incoming = payload.quests ?? [];
        setQuests(dedupeById(incoming));
        setResultCount(payload.resultCount ?? '0');
        setCurrentPage(0);
        setOffset(incoming.length);
        setHasMore(incoming.length > 2);
        setError(null);
      } catch {
        if (cancelled) return;
        setQuests([]);
        setResultCount('0');
        setCurrentPage(0);
        setOffset(0);
        setHasMore(false);
        setError('Could not load live quests right now.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [category, countryCode, userID, shouldWaitForCountry]);

  const subtitle = useMemo(() => {
    const activeLabel = category === 'All' ? 'all categories' : category;
    return `${formatCount(resultCount)} quests in ${activeLabel}`;
  }, [category, resultCount]);

  return (
    <section className={s.pageWrap}>
      <div className={s.hero}>
        <p className={s.eyebrow}>Browse Quest Marketplace</p>
        <h1 className={s.title}>Find quests that match your skills.</h1>
        <p className={s.sub}>{subtitle}</p>
      </div>

      <div className={s.toolbar}>
        <div className={s.searchBox}>
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <input
            type="text"
            placeholder="Search quests, locations, or keywords"
            aria-label="Search quests"
          />
        </div>
        <p className={s.searchHint}>Search coming soon</p>
      </div>

      <div className={s.categoryRail} role="tablist" aria-label="Quest categories">
        {BROWSE_CATEGORIES.map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`${s.categoryChip}${selected ? ` ${s.active}` : ''}`}
              onClick={() => {
                if (item === category) return;
                setLoading(true);
                setError(null);
                setCategory(item);
                setQuests([]);
                setResultCount('0');
                setCurrentPage(0);
                setOffset(0);
                setHasMore(true);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {isLoadingView && <p className={s.stateLine}>Loading quests...</p>}
      {error && <p className={s.errorLine}>{error}</p>}

      {!isLoadingView && !error && quests.length === 0 && (
        <p className={s.stateLine}>No quests found for this category yet.</p>
      )}

      {!isLoadingView && quests.length > 0 && (
        <>
          <div className={s.grid}>
            {quests.map((quest, index) => (
              <QuestCard
                key={quest.idQuests ?? `${quest.title}-${quest.datePosted}-${index}`}
                quest={quest}
                userCountryCode={countryCode}
              />
            ))}
          </div>

          <div className={s.paginationWrap}>
            <p className={s.pageInfo}>Page {currentPage + 1}</p>
            <button
              type="button"
              className={s.moreBtn}
              onClick={() => void fetchQuests(currentPage + 1, offset, 'append')}
              disabled={!hasMore || loadingMore}
            >
              {loadingMore ? 'Loading...' : hasMore ? 'Load more quests' : 'No more quests'}
            </button>
          </div>
        </>
      )}
    </section>
  );
}