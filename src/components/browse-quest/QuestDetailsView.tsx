'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import {
  resolveCurrencySymbolForCountry,
  resolveSupportedCountryCode,
} from '@/lib/constants/country-pricing';
import type { QuestDetails, QuestDetailsApiResponse } from '@/lib/models/quest-details';
import LoadingState from './LoadingState';
import s from './QuestDetailsView.module.css';

const DEFAULT_USER_ID = process.env.NEXT_PUBLIC_QUEST_BROWSE_USER_ID ?? 'web_guest';
const DEFAULT_COUNTRY_CODE = resolveSupportedCountryCode(
  process.env.NEXT_PUBLIC_QUEST_BROWSE_COUNTRY_CODE ?? 'SG'
);

const parseNumber = (value?: string | number | null) => {
  if (value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatMoney = (symbol: string, amount: number) => {
  return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
};

const toDate = (value?: string | null) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value?: string | null) => {
  const parsed = toDate(value);
  if (!parsed) return null;

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
};

const normalizeName = (firstName?: string, lastName?: string) => {
  const first = (firstName ?? '').trim();
  const last = (lastName ?? '').trim();

  if (!first && !last) return 'Quest Poster';

  const cleanedFirst = first
    ? `${first.charAt(0).toUpperCase()}${first.slice(1).toLowerCase()}`
    : '';

  const initialLast = last ? `${last.charAt(0).toUpperCase()}.` : '';
  return `${cleanedFirst} ${initialLast}`.trim();
};

const initials = (value: string) =>
  value
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const readDescription = (desc?: string) => {
  if (!desc?.trim()) return 'No description provided.';
  return desc.split('<perks>')[0].trim() || 'No description provided.';
};

const readCompletionDate = (quest: QuestDetails) => {
  const dueDateLabel = formatDate(quest.dueDate);
  if (!dueDateLabel) return 'No due date';

  const dueType = (quest.due_date_type ?? '').toLowerCase();
  const endDateLabel = formatDate(quest.date_range_end);

  if (endDateLabel) {
    return `${dueDateLabel} - ${endDateLabel}`;
  }

  const prefix = dueType === 'exact' ? 'On' : 'Before';
  return `${prefix} ${dueDateLabel}`;
};

const readCountryName = (countryCode?: string) => {
  if (!countryCode || countryCode.trim().length !== 2) return null;

  try {
    return (
      new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode.toUpperCase()) ?? null
    );
  } catch {
    return null;
  }
};

const isOnlineQuest = (quest: QuestDetails) => {
  const country = (quest.starting_country ?? '').trim().toLowerCase();
  const location = (quest.starting_location?.primaryText ?? '').trim().toLowerCase();
  const address = (quest.address ?? '').trim().toLowerCase();

  return country === 'online' || location === 'online' || address === 'online';
};

const readLocationMapUrl = (quest: QuestDetails) => {
  if (isOnlineQuest(quest)) return null;

  const lat =
    parseNumber(quest.starting_location?.lat) ?? parseNumber(quest.lat);
  const lng =
    parseNumber(quest.starting_location?.lng) ?? parseNumber(quest.lng);

  if (lat != null && lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  const query =
    quest.starting_location?.primaryText?.trim() ||
    quest.address?.trim() ||
    quest.ending_location?.primaryText?.trim() ||
    '';

  if (!query) return null;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const readLocationValue = (quest: QuestDetails) => {
  if (isOnlineQuest(quest)) {
    return 'Online';
  }

  const start = quest.starting_location?.primaryText;
  const end = quest.ending_location?.primaryText;

  if (start && end) {
    return `${start} -> ${end}`;
  }

  if (start) {
    return start;
  }

  if (quest.address?.trim()) {
    return quest.address.trim();
  }

  return 'No location provided';
};

const readHeroesRequired = (quest: QuestDetails) => {
  const numOffers = parseNumber(quest.numOffers) ?? 1;
  const accepted = parseNumber(quest.proposalsCount) ?? 0;

  if (numOffers <= 1) return 1;
  const remaining = numOffers - accepted;
  return remaining > 0 ? remaining : 0;
};

const readQuestStatus = (status?: string) => {
  const normalized = (status ?? '').toLowerCase().trim();
  if (!normalized) return 'Pending';

  if (normalized.includes('delete') || normalized === 'restricted') {
    return 'Removed';
  }

  if (normalized === 'accepted' || normalized === 'completed') {
    return 'In Progress';
  }

  if (normalized === 'final') {
    return 'Completed';
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const requestQuestDetails = async (questID: string, userID: string) => {
  const params = new URLSearchParams({ questID, userID });
  const response = await fetch(`/api/quest-details?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Could not load quest details right now.');
  }

  const payload = (await response.json()) as QuestDetailsApiResponse;
  if (!Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  return payload[0];
};

type Props = {
  questID: string;
};

export default function QuestDetailsView({ questID }: Props) {
  const { user, userProfile, profileLoaded, loading: authLoading } = useAuthContext();
  const [quest, setQuest] = useState<QuestDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shouldWaitForAuth = authLoading || (user !== null && !profileLoaded);

  const countryCode = resolveSupportedCountryCode(
    userProfile?.countryCode ?? DEFAULT_COUNTRY_CODE
  );
  const userID = user?.uid ?? DEFAULT_USER_ID;

  const loadQuestDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await requestQuestDetails(questID, userID);
      if (!payload) {
        setQuest(null);
        setError('This quest could not be found.');
        return;
      }

      setQuest(payload);
    } catch (fetchError) {
      setQuest(null);
      setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [questID, userID]);

  useEffect(() => {
    if (shouldWaitForAuth) return;

    if (!user) {
      setQuest(null);
      setLoading(false);
      setError('Your session has expired. Please sign in again.');
      return;
    }

    void loadQuestDetails();
  }, [loadQuestDetails, shouldWaitForAuth, user]);

  const viewModel = useMemo(() => {
    if (!quest) return null;

    const title = quest.title?.trim() || 'Untitled quest';
    const description = readDescription(quest.desc);
    const requirements = quest.requirements?.trim() || null;
    const status = readQuestStatus(quest.status);
    const highlight = (quest.paid_features ?? '').includes('highlight');

    const name = normalizeName(quest.firstName, quest.lastName);
    const postedDate = formatDate(quest.datePosted);

    const reviewCount = parseNumber(quest.reviewsAsCitizen) ?? 0;
    const ratingTotal = parseNumber(quest.ratingAsCitizen) ?? 0;
    const ratingValue = reviewCount > 0 ? (ratingTotal / reviewCount).toFixed(2) : null;

    const isGlobal = (quest.scope_of_reach ?? '').toLowerCase() === 'global';
    const questCountry =
      quest.transaction_currency?.toLowerCase() === 'usd'
        ? 'US'
        : quest.country_code ?? quest.user_country_code ?? countryCode;

    const symbol = isGlobal ? 'US$' : resolveCurrencySymbolForCountry(questCountry);
    const price = parseNumber(quest.price) ?? 0;
    const formattedPrice = formatMoney(symbol, price);

    const additional = parseNumber(quest.additional_purchases_price) ?? 0;
    const recurrence = quest.payment_recurrence?.trim() || null;

    const startingCountry = readCountryName(quest.starting_country);
    const endingCountry = readCountryName(quest.ending_country);

    const locationValue = readLocationValue(quest);
    const locationMapUrl = readLocationMapUrl(quest);
    const completionDate = readCompletionDate(quest);
    const durationHours = parseNumber(quest.number_of_hours);
    const offersReceived = parseNumber(quest.proposalsCount) ?? 0;

    const images = Array.isArray(quest.jobImgURL)
      ? quest.jobImgURL
      : Array.isArray(quest.imageURL)
      ? quest.imageURL
      : [];

    return {
      title,
      description,
      requirements,
      status,
      highlight,
      name,
      postedDate,
      reviewCount,
      ratingValue,
      avatar: quest.image,
      formattedPrice,
      symbol,
      recurrence,
      additional,
      negotiable: Boolean(quest.price_negotiable),
      locationValue,
      locationMapUrl,
      completionDate,
      durationHours,
      heroesRequired: readHeroesRequired(quest),
      offersReceived,
      urgent: Boolean(quest.urgent),
      timeRange: quest.time_range?.trim() || null,
      postingPersona: quest.posting_persona?.trim() || null,
      startingCountry,
      endingCountry,
      images,
    };
  }, [countryCode, quest]);

  if (shouldWaitForAuth || loading) {
    return (
      <section className={s.pageWrap}>
        <div className={s.stateWrap}>
          <LoadingState label="Loading quest details" />
        </div>
      </section>
    );
  }

  return (
    <section className={s.pageWrap}>
      <Link href="/browse-quest/list" className={s.backLink}>
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_back
        </span>
        Back to browse quests
      </Link>

      {error && (
        <div>
          <p className={s.errorLine}>{error}</p>
          {user ? (
            <button type="button" className={s.retryBtn} onClick={() => void loadQuestDetails()}>
              Try again
            </button>
          ) : (
            <Link href="/login" className={s.retryBtn}>
              Go to login
            </Link>
          )}
        </div>
      )}

      {!error && viewModel && (
        <>
          <article className={s.hero}>
            <p className={s.eyebrow}>Quest Details</p>

            <div className={s.titleRow}>
              <div className={s.titleWrap}>
                {viewModel.highlight ? (
                  <span className={`material-symbols-outlined ${s.highlight}`} aria-hidden="true">
                    keyboard_double_arrow_up
                  </span>
                ) : null}
                <h1 className={s.title}>{viewModel.title}</h1>
              </div>
              <span className={s.status}>{viewModel.status}</span>
            </div>

            <div className={s.priceRow}>
              <p className={s.price}>{viewModel.formattedPrice}</p>
              {viewModel.recurrence ? <p className={s.recurring}>{viewModel.recurrence}</p> : null}
              {viewModel.negotiable ? <p className={s.negotiable}>Negotiable</p> : null}
            </div>

            {viewModel.additional > 0 ? (
              <p className={s.additional}>
                Additional purchase required: {formatMoney(viewModel.symbol, viewModel.additional)}
              </p>
            ) : null}

            <div className={s.posterRow}>
              <div className={s.posterMain}>
                {viewModel.avatar ? (
                  <img className={s.avatar} src={viewModel.avatar} alt="Quest poster avatar" />
                ) : (
                  <div className={s.avatarFallback} aria-hidden="true">
                    {initials(viewModel.name)}
                  </div>
                )}

                <div>
                  <p className={s.posterLabel}>Posted by</p>
                  <p className={s.posterName}>{viewModel.name}</p>
                  <p className={s.posterMeta}>
                    {viewModel.reviewCount > 0 && viewModel.ratingValue
                      ? `${viewModel.ratingValue} stars (${viewModel.reviewCount} reviews)`
                      : 'No reviews yet'}
                  </p>
                </div>
              </div>

              <div>
                {viewModel.postedDate ? <p className={s.postedAt}>Posted {viewModel.postedDate}</p> : null}
                {viewModel.urgent ? <span className={s.urgent}>Urgent</span> : null}
              </div>
            </div>

            {viewModel.images.length > 0 ? (
              <div className={s.cover}>
                <img src={viewModel.images[0]} alt="Quest image" />
              </div>
            ) : null}
          </article>

          <div className={s.grid}>
            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                  location_on
                </span>
                <span className={s.blockLabel}>Location</span>
              </p>
              {viewModel.locationMapUrl ? (
                <a
                  className={`${s.blockValue} ${s.locationLink}`}
                  href={viewModel.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {viewModel.locationValue}
                </a>
              ) : (
                <p className={s.blockValue}>{viewModel.locationValue}</p>
              )}
              {viewModel.startingCountry || viewModel.endingCountry ? (
                <p className={s.blockValue}>
                  {viewModel.startingCountry ?? 'Unknown'}
                  {viewModel.endingCountry ? ` -> ${viewModel.endingCountry}` : ''}
                </p>
              ) : null}
            </article>

            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                  event
                </span>
                <span className={s.blockLabel}>Completion Date</span>
              </p>
              <p className={s.blockValue}>
                {viewModel.completionDate}
                {viewModel.timeRange ? ` (${viewModel.timeRange})` : ''}
              </p>
            </article>

            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                  schedule
                </span>
                <span className={s.blockLabel}>Duration</span>
              </p>
              <p className={s.blockValue}>
                {viewModel.durationHours != null
                  ? `${Number.isInteger(viewModel.durationHours) ? viewModel.durationHours : viewModel.durationHours.toFixed(1)} Hour(s)`
                  : 'Not specified'}
              </p>
            </article>

            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                  group
                </span>
                <span className={s.blockLabel}>Heroes Required</span>
              </p>
              <p className={s.blockValue}>{viewModel.heroesRequired}</p>
            </article>

            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                  local_offer
                </span>
                <span className={s.blockLabel}>Offers Received</span>
              </p>
              <p className={s.blockValue}>{viewModel.offersReceived}</p>
            </article>

            {viewModel.postingPersona ? (
              <article className={s.block}>
                <p className={s.blockLabelRow}>
                  <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                    person
                  </span>
                  <span className={s.blockLabel}>Posting Persona</span>
                </p>
                <p className={s.blockValue}>{viewModel.postingPersona}</p>
              </article>
            ) : null}
          </div>

          <div className={s.detailsStack}>
            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                  description
                </span>
                <span className={s.blockLabel}>Description</span>
              </p>
              <p className={`${s.blockValue} ${s.multilineValue}`}>{viewModel.description}</p>
            </article>

            {viewModel.requirements ? (
              <article className={s.block}>
                <p className={s.blockLabelRow}>
                  <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">
                    checklist
                  </span>
                  <span className={s.blockLabel}>Requirements</span>
                </p>
                <p className={`${s.blockValue} ${s.multilineValue}`}>{viewModel.requirements}</p>
              </article>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}
