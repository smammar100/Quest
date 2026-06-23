'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import {
  resolveCurrencySymbolForCountry,
  resolveSupportedCountryCode,
} from '@/lib/constants/country-pricing';
import type { QuestDetails, QuestDetailsApiResponse } from '@/lib/models/quest-details';
import DownloadAppModal from '@/components/layout/DownloadAppModal';
import LoadingState from './LoadingState';
import QuestCard from './QuestCard';
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
  if (isOnlineQuest(quest)) return 'Online';
  return (
    quest.starting_location?.primaryText ||
    quest.address?.trim() ||
    'No location provided'
  );
};

const readEndLocationValue = (quest: QuestDetails) => {
  if (isOnlineQuest(quest)) return null;
  return quest.ending_location?.primaryText?.trim() || null;
};

const readEndLocationMapUrl = (quest: QuestDetails) => {
  const text = quest.ending_location?.primaryText?.trim();
  if (!text) return null;
  const lat = parseNumber(quest.ending_location?.lat);
  const lng = parseNumber(quest.ending_location?.lng);
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text)}`;
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

  if (normalized === 'pending') {
    return 'Open';
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

  const payload = (await response.json()) as {
    quest?: QuestDetailsApiResponse;
    offersReceived?: string | number;
  };

  if (!Array.isArray(payload.quest) || payload.quest.length === 0) {
    return { quest: null, offersReceived: 0 };
  }

  return {
    quest: payload.quest[0],
    offersReceived: parseNumber(payload.offersReceived) ?? 0,
  };
};

type Props = {
  questID: string;
};

export default function QuestDetailsView({ questID }: Props) {
  const { user, userProfile, profileLoaded, loading: authLoading } = useAuthContext();
  const [quest, setQuest] = useState<QuestDetails | null>(null);
  const [offersReceived, setOffersReceived] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

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

      if (!payload.quest) {
        setQuest(null);
        setOffersReceived(0);
        setError('This quest could not be found.');
        return;
      }

      setQuest(payload.quest);
      setOffersReceived(payload.offersReceived);
    } catch (fetchError) {
      setQuest(null);
      setOffersReceived(0);
      setError(fetchError instanceof Error ? fetchError.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [questID, userID]);

  useEffect(() => {
    if (shouldWaitForAuth) return;

    if (!user) {
      setQuest(null);
      setOffersReceived(0);
      setLoading(false);
      setError('Your session has expired. Please sign in again.');
      return;
    }

    void loadQuestDetails();
  }, [loadQuestDetails, shouldWaitForAuth, user]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightboxOpen(false); setZoom(1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  const viewModel = useMemo(() => {
    if (!quest) return null;

    const title = quest.title?.trim() || 'Untitled quest';
    const description = readDescription(quest.desc);
    const requirements = quest.requirements?.trim() || null;
    const status = readQuestStatus(quest.status);
    const highlight = (quest.paid_features ?? '').includes('highlight');
    const resolvedCountry = resolveSupportedCountryCode(quest.country_code ?? countryCode);
    const verified = resolvedCountry === 'SG'
      ? Boolean(quest.my_info) && Boolean(quest.phone_verified) && Boolean(quest.email_verified)
      : Boolean(quest.email_verified);

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

    const additional = (parseNumber(quest.additional_purchases_price) ?? 0) / 100;
    const durationHours = parseNumber(quest.number_of_hours);

    const rawRecurrence = quest.payment_recurrence?.trim().toLowerCase() ?? '';
    const isPerHour = rawRecurrence.includes('hour');
    const isOneTime = !rawRecurrence || rawRecurrence.includes('one') || rawRecurrence.includes('fixed');

    // price is the total budget; for per-hour quests derive the hourly rate from price ÷ hours
    let displayPrice = formattedPrice;
    let hourlyRate: string | null = null;
    if (isPerHour && durationHours != null && durationHours > 0) {
      hourlyRate = formatMoney(symbol, price / durationHours);
    }
    const recurrence = !isPerHour && !isOneTime ? quest.payment_recurrence?.trim() || null : null;

    const startingCountry = readCountryName(quest.starting_country);
    const endingCountry = readCountryName(quest.ending_country);

    const locationValue = readLocationValue(quest);
    const locationMapUrl = readLocationMapUrl(quest);
    const endLocationValue = readEndLocationValue(quest);
    const endLocationMapUrl = readEndLocationMapUrl(quest);
    const completionDate = readCompletionDate(quest);

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
      verified,
      name,
      postedDate,
      reviewCount,
      ratingValue,
      avatar: quest.image,
      displayPrice,
      hourlyRate,
      symbol,
      recurrence,
      additional,
      negotiable: Boolean(quest.price_negotiable),
      locationValue,
      locationMapUrl,
      endLocationValue,
      endLocationMapUrl,
      completionDate,
      durationHours,
      heroesRequired: readHeroesRequired(quest),
      offersReceived,
      urgent: Boolean(quest.urgent),
      similarQuests: quest.similarQuests ?? [],
      timeRange: quest.time_range?.trim() || null,
      postingPersona: quest.posting_persona?.trim() || null,
      startingCountry,
      endingCountry,
      images,
    };
  }, [countryCode, offersReceived, quest]);

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
          {lightboxOpen && viewModel.images.length > 0 ? (
            <div
              className={s.lightboxBackdrop}
              role="dialog"
              aria-modal="true"
              aria-label="Quest image"
              onClick={() => { setLightboxOpen(false); setZoom(1); }}
            >
              <div className={s.lightboxInner} onClick={(e) => e.stopPropagation()}>
                <img
                  className={s.lightboxImg}
                  src={viewModel.images[0]}
                  alt="Quest image"
                  style={{ transform: `scale(${zoom})` }}
                />
              </div>
              <div className={s.lightboxControls}>
                <button
                  type="button"
                  className={s.lightboxBtn}
                  aria-label="Zoom in"
                  onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z + 0.5, 4)); }}
                >+</button>
                <button
                  type="button"
                  className={s.lightboxBtn}
                  aria-label="Zoom out"
                  onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z - 0.5, 0.5)); }}
                >−</button>
                <button
                  type="button"
                  className={s.lightboxBtn}
                  aria-label="Close"
                  onClick={() => { setLightboxOpen(false); setZoom(1); }}
                >✕</button>
              </div>
            </div>
          ) : null}

          <article className={s.hero}>
            {viewModel.images.length > 0 ? (
              <div
                className={s.cover}
                role="button"
                tabIndex={0}
                aria-label="View full image"
                onClick={() => setLightboxOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true); }}
              >
                <img src={viewModel.images[0]} alt="Quest image" />
              </div>
            ) : null}

            <div className={s.heroTop}>
              <span className={`${s.status} ${s[`status${viewModel.status.replace(/\s/g, '')}`] ?? ''}`}>
                {viewModel.status}
              </span>
              {viewModel.urgent ? <span className={s.urgent}>Urgent</span> : null}
            </div>

            <div className={s.titleRow}>
              <div className={s.titleWrap}>
                {viewModel.highlight ? (
                  <span className={`material-symbols-outlined ${s.highlight}`} aria-hidden="true">
                    keyboard_double_arrow_up
                  </span>
                ) : null}
                <h1 className={s.title}>{viewModel.title}</h1>
              </div>
            </div>

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
                  <p className={s.posterName}>
                    {viewModel.name}
                    {viewModel.verified ? (
                      <svg className={s.verified} viewBox="0 0 24 24" aria-label="Verified" role="img">
                        <circle cx="12" cy="12" r="12" fill="#1D9BF0" />
                        <path d="M6.5 12.5l3.5 3.5 7.5-7.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </p>
                  {viewModel.reviewCount > 0 && viewModel.ratingValue ? (
                    <p className={s.posterMeta}>
                      <span className={s.starIcon}>★</span> {viewModel.ratingValue} ({viewModel.reviewCount} reviews)
                    </p>
                  ) : null}
                </div>
              </div>

              {viewModel.postedDate ? (
                <p className={s.postedAt}>Posted {viewModel.postedDate}</p>
              ) : null}
            </div>
          </article>

          <div className={s.priceCard}>
            <p className={s.priceCardLabel}>Budget</p>
            <p className={s.priceCardAmount}>
              {viewModel.displayPrice}
              {viewModel.hourlyRate ? (
                <span className={s.priceCardHourly}> ({viewModel.hourlyRate}/hr)</span>
              ) : null}
            </p>
            {viewModel.recurrence ? (
              <div className={s.priceCardMeta}>
                <span>{viewModel.recurrence}</span>
              </div>
            ) : null}
            {viewModel.negotiable ? (
              <span className={s.negotiableBadge}>Negotiable</span>
            ) : null}
            <DownloadAppModal>
              <button type="button" className={s.offerBtn}>Make an offer</button>
            </DownloadAppModal>
            <p className={s.offersNote}>
              {viewModel.offersReceived === 0
                ? 'Be the first to make an offer'
                : `${viewModel.offersReceived} ${viewModel.offersReceived === 1 ? 'offer' : 'offers'} received so far`}
            </p>
          </div>

          <div className={s.grid}>
            {/* Location */}
            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">location_on</span>
                <span className={s.blockLabel}>{viewModel.endLocationValue ? 'Starting Location' : 'Location'}</span>
              </p>
              <div className={s.blockValueRow}>
                <p className={s.blockValue}>{viewModel.locationValue}</p>
                {viewModel.locationMapUrl ? (
                  <a className={s.mapLink} href={viewModel.locationMapUrl} target="_blank" rel="noopener noreferrer">View map</a>
                ) : null}
              </div>
            </article>

            {viewModel.endLocationValue ? (
              <article className={s.block}>
                <p className={s.blockLabelRow}>
                  <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">location_on</span>
                  <span className={s.blockLabel}>Ending Location</span>
                </p>
                <div className={s.blockValueRow}>
                  <p className={s.blockValue}>{viewModel.endLocationValue}</p>
                  {viewModel.endLocationMapUrl ? (
                    <a className={s.mapLink} href={viewModel.endLocationMapUrl} target="_blank" rel="noopener noreferrer">View map</a>
                  ) : null}
                </div>
              </article>
            ) : null}

            {/* Completion Date */}
            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">event</span>
                <span className={s.blockLabel}>Completion Date</span>
              </p>
              <p className={s.blockValue}>
                {viewModel.completionDate}{viewModel.timeRange ? ` (${viewModel.timeRange})` : ''}
              </p>
            </article>

            {/* Duration */}
            {viewModel.durationHours != null ? (
              <article className={s.block}>
                <p className={s.blockLabelRow}>
                  <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">schedule</span>
                  <span className={s.blockLabel}>Duration</span>
                </p>
                <p className={s.blockValue}>
                  {Number.isInteger(viewModel.durationHours) ? viewModel.durationHours : viewModel.durationHours.toFixed(1)}{' '}
                  {viewModel.durationHours === 1 ? 'hour' : 'hours'}
                </p>
              </article>
            ) : null}

            {/* Additional Purchase */}
            {viewModel.additional > 0 ? (
              <article className={s.block}>
                <p className={s.blockLabelRow}>
                  <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">shopping_cart</span>
                  <span className={s.blockLabel}>Additional Purchase</span>
                </p>
                <p className={s.blockValue}>
                  Requires an additional purchase of {formatMoney(viewModel.symbol, viewModel.additional)}
                </p>
              </article>
            ) : null}

            {/* Description */}
            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">description</span>
                <span className={s.blockLabel}>Description</span>
              </p>
              <p className={`${s.blockValue} ${s.multilineValue}`}>{viewModel.description}</p>
            </article>

            {/* Requirements */}
            {viewModel.requirements ? (
              <article className={s.block}>
                <p className={s.blockLabelRow}>
                  <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">checklist</span>
                  <span className={s.blockLabel}>Requirements</span>
                </p>
                <p className={`${s.blockValue} ${s.multilineValue}`}>{viewModel.requirements}</p>
              </article>
            ) : null}

            {/* Heroes Required */}
            <article className={s.block}>
              <p className={s.blockLabelRow}>
                <span className={`material-symbols-outlined ${s.blockIcon}`} aria-hidden="true">group</span>
                <span className={s.blockLabel}>Heroes Required</span>
              </p>
              <p className={s.blockValue}>{viewModel.heroesRequired}</p>
            </article>

          </div>

          {viewModel.similarQuests.length > 0 ? (
            <div className={s.similarSection}>
              <p className={s.similarLabel}>Similar Quests</p>
              <div className={s.similarGrid}>
                {viewModel.similarQuests.map((sq, i) => (
                  <QuestCard
                    key={sq.idQuests ?? `similar-${i}`}
                    quest={sq}
                    userCountryCode={countryCode}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
