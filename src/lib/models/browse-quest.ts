export type BrowseQuest = {
  idQuests?: string;
  title?: string;
  timing?: string;
  price?: string;
  address?: string;
  district?: string;
  posting_persona?: string;
  q?: string;
  datePosted?: string;
  proposalsCount?: string | number;
  likedQuestCount?: string | number;
  scope_of_reach?: string;
  dueDate?: string;
  dueDateType?: string;
  dateRangeEnd?: string;
  due_date_type?: string;
  date_range_end?: string;
  paid_features?: string;
  starting_country?: string;
  starting_location?: {
    primaryText?: string;
    secondaryText?: string;
    lat?: number;
    lng?: number;
  };
  user_country_code?: string;
  country_code?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  image?: string;
  phone_verified?: boolean;
  email_verified?: boolean;
  my_info?: string;
  price_negotiable?: boolean;
  priceNegotiable?: boolean;
};

export type BrowseQuestResponse = {
  quests?: BrowseQuest[];
  rowsSkipped?: number;
  resultCount?: string | number;
};

export const BROWSE_CATEGORIES = [
  "All",
  "Errands",
  "Creative",
  "Part-time",
  "Social media",
  "Household",
  "Tech & IT",
  "Teach me",
  "Business & admin",
  "Care services",
  "Research",
  "Talents",
  "Odd jobs",
] as const;

export type BrowseCategory = (typeof BROWSE_CATEGORIES)[number];
