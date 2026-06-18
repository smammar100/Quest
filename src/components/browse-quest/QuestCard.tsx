import type { BrowseQuest } from '@/lib/models/browse-quest';
import {
  resolveCurrencySymbolForCountry,
  resolveSupportedCountryCode,
} from '@/lib/constants/country-pricing';
import s from './QuestCard.module.css';

type Props = {
  quest: BrowseQuest;
  userCountryCode: string;
};

const getCountryName = (countryCode?: string) => {
  if (!countryCode || countryCode.length !== 2) {
    return countryCode ?? null;
  }

  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode.toUpperCase()) ?? null;
  } catch {
    return countryCode;
  }
};

const getFlagFromCountryCode = (countryCode?: string) => {
  if (!countryCode || countryCode.length !== 2) {
    return '';
  }

  const upper = countryCode.toUpperCase();
  const base = 0x1f1e6;
  const a = 'A'.charCodeAt(0);

  return String.fromCodePoint(
    base + upper.charCodeAt(0) - a,
    base + upper.charCodeAt(1) - a
  );
};

const toDate = (value?: string) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDateRange = (quest: BrowseQuest) => {
  const dueDate = toDate(quest.dueDate);
  if (!dueDate) {
    return 'No due date';
  }

  const dateFormat = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
  });

  const endDate = toDate(quest.dateRangeEnd ?? quest.date_range_end);
  if (endDate) {
    return `${dateFormat.format(dueDate)} - ${dateFormat.format(endDate)}`;
  }

  const dueDateType = (quest.dueDateType ?? quest.due_date_type ?? '').toLowerCase();
  const prefix = dueDateType === 'exact' ? 'On' : 'Before';
  return `${prefix} ${dateFormat.format(dueDate)}`;
};

const getLocationLabel = (quest: BrowseQuest, userCountryCode: string) => {
  const startingCountry = quest.starting_country;
  const userCountry = getCountryName(userCountryCode) ?? 'Singapore';

  if (startingCountry === 'online') {
    return 'Online';
  }

  if (startingCountry === userCountry && startingCountry === 'Singapore') {
    return quest.district ?? quest.address ?? quest.starting_location?.primaryText ?? 'Location not set';
  }

  return quest.starting_location?.primaryText ?? quest.address ?? 'No location';
};

const initials = (name: string) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const getTruncatedName = (firstName?: string, lastName?: string) => {
  const baseFirst = firstName?.trim() || 'Quest';
  let cleaned = `${baseFirst.charAt(0).toUpperCase()}${baseFirst.slice(1).toLowerCase()}`;
  if (cleaned.length > 15) {
    cleaned = cleaned.slice(0, 15);
  }

  const trimmedLast = (lastName ?? '').trim();
  if (trimmedLast) {
    cleaned += ` ${trimmedLast.charAt(0).toUpperCase()}.`;
  }

  return cleaned;
};

const postedDiff = (postedAt?: string) => {
  const posted = toDate(postedAt);
  if (!posted) {
    return 'Posted 0 seconds ago';
  }

  const diffMs = Date.now() - posted.getTime();
  const safeMs = diffMs < 0 ? 0 : diffMs;
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (safeMs >= day) {
    const value = Math.floor(safeMs / day);
    return `Posted ${value} ${value === 1 ? 'day' : 'days'} ago`;
  }

  if (safeMs >= hour) {
    const value = Math.floor(safeMs / hour);
    return `Posted ${value} ${value === 1 ? 'hour' : 'hours'} ago`;
  }

  if (safeMs >= minute) {
    const value = Math.floor(safeMs / minute);
    return `Posted ${value} ${value === 1 ? 'minute' : 'minutes'} ago`;
  }

  const value = Math.floor(safeMs / second);
  return `Posted ${value} ${value === 1 ? 'second' : 'seconds'} ago`;
};

const isFullyVerified = (quest: BrowseQuest) => {
  const countryCode = resolveSupportedCountryCode(quest.country_code);
  if (countryCode === 'SG') {
    return Boolean(quest.my_info) && Boolean(quest.phone_verified) && Boolean(quest.email_verified);
  }

  return Boolean(quest.email_verified);
};

export default function QuestCard({ quest, userCountryCode }: Props) {
  const title = quest.title?.trim() ? quest.title.trim() : 'No Title';
  const location = getLocationLabel(quest, userCountryCode);
  const timing = quest.timing?.trim() ? quest.timing.trim() : 'No Timing';
  const showDate = timing !== 'Immediately';
  const dateLabel = formatDateRange(quest);
  const proposalCount = String(quest.proposalsCount ?? '0');
  const showOffers = proposalCount !== '0';

  const posterCountryCode = quest.user_country_code?.toUpperCase().trim();
  const isGlobalQuest = (quest.scope_of_reach ?? '').toLowerCase() === 'global';
  const posterCountryName = getCountryName(posterCountryCode);
  const posterFlag = getFlagFromCountryCode(posterCountryCode);

  const questCountryCode =
    quest.country_code?.toUpperCase().trim() || posterCountryCode || userCountryCode;
  const currencySymbol = isGlobalQuest
    ? 'US$'
    : resolveCurrencySymbolForCountry(questCountryCode);
  const priceFinal = `${currencySymbol}${quest.price ?? '0'}`;

  const name = getTruncatedName(quest.firstName, quest.lastName);
  const verified = isFullyVerified(quest);
  const highlighted = (quest.paid_features ?? '').includes('highlight');
  const priceNegotiable = Boolean(quest.priceNegotiable ?? quest.price_negotiable);

  return (
    <article className={s.card}>
      <div className={s.headRow}>
        <div className={s.titleWrap}>
          {highlighted ? (
            <span className={`material-symbols-outlined ${s.highlight}`} aria-hidden="true">
              kid_star
            </span>
          ) : null}
          <h2 className={s.title}>{title}</h2>
        </div>
      </div>

      <div className={s.detailList}>
        <div className={s.detailRow}>
          <span className="material-symbols-outlined" aria-hidden="true">
            location_on
          </span>
          <p>{location}</p>
        </div>

        <div className={s.detailRow}>
          <span className="material-symbols-outlined" aria-hidden="true">
            {showDate ? 'calendar_today' : 'schedule'}
          </span>
          <p>{showDate ? dateLabel : timing}</p>
        </div>

        {showOffers ? (
          <div className={s.detailRow}>
            <span className="material-symbols-outlined" aria-hidden="true">
              local_offer
            </span>
            <p>{proposalCount} offers</p>
          </div>
        ) : null}
      </div>

      <div className={s.footer}>
        <div className={s.posterBlock}>
          {quest.image ? (
            <img className={s.avatar} src={quest.image} alt="Quest poster avatar" />
          ) : (
            <div className={s.avatarFallback} aria-hidden="true">
              {initials(name)}
            </div>
          )}

          <div className={s.posterTextWrap}>
            <p className={s.posterLine}>
              <span>{postedDiff(quest.datePosted)} by </span>
              <span className={s.posterName}>{name}</span>
              {verified ? <span className={s.verified}>verified</span> : null}
            </p>
            {isGlobalQuest && posterCountryName ? (
              <p className={s.countryLine}>
                from {posterCountryName} {posterFlag}
              </p>
            ) : null}
          </div>
        </div>

        <div className={s.priceBlock}>
          <p className={s.price}>{priceFinal}</p>
          {priceNegotiable ? <p className={s.negotiable}>Negotiable</p> : null}
        </div>
      </div>
    </article>
  );
};
