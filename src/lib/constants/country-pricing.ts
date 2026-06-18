export const USD_COUNTRY_CODE = 'US';

// Keep in sync with quest-test/lib/src/utils/constants/country_pricing_constants.dart
export const CURRENCY_CODE_BY_COUNTRY = {
  SG: 'SGD',
  MY: 'MYR',
  PH: 'PHP',
  PK: 'PKR',
  AU: 'AUD',
  CA: 'CAD',
  US: 'USD',
  ID: 'IDR',
  JP: 'JPY',
  HK: 'HKD',
  TH: 'THB',
  KR: 'KRW',
} as const;

export type SupportedCountryCode = keyof typeof CURRENCY_CODE_BY_COUNTRY;
export type SupportedCurrencyCode =
  (typeof CURRENCY_CODE_BY_COUNTRY)[SupportedCountryCode];

const CURRENCY_SYMBOL_BY_CODE: Record<Lowercase<SupportedCurrencyCode>, string> = {
  sgd: 'S$',
  myr: 'RM',
  php: 'PHP',
  pkr: 'PKR',
  aud: 'AUD',
  cad: 'CAD',
  usd: 'US$',
  idr: 'Rp',
  jpy: '¥',
  hkd: 'HK$',
  thb: '฿',
  krw: '₩',
};

const isSupportedCountryCode = (value: string): value is SupportedCountryCode =>
  Object.prototype.hasOwnProperty.call(CURRENCY_CODE_BY_COUNTRY, value);

export function resolveSupportedCountryCode(countryCode?: string | null): SupportedCountryCode {
  const normalized = countryCode?.toUpperCase().trim();
  if (!normalized) {
    return USD_COUNTRY_CODE;
  }

  return isSupportedCountryCode(normalized) ? normalized : USD_COUNTRY_CODE;
}

export function resolveCurrencyCodeForCountry(countryCode?: string | null): SupportedCurrencyCode {
  return CURRENCY_CODE_BY_COUNTRY[resolveSupportedCountryCode(countryCode)];
}

export function resolveCurrencySymbolForCountry(countryCode?: string | null): string {
  const currencyCode = resolveCurrencyCodeForCountry(countryCode).toLowerCase() as Lowercase<SupportedCurrencyCode>;
  return CURRENCY_SYMBOL_BY_CODE[currencyCode] ?? 'US$';
}