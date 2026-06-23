export type QuestDetailsLocation = {
  primaryText?: string;
  secondaryText?: string;
  lat?: number;
  lng?: number;
};

import type { BrowseQuest } from './browse-quest';

export type QuestDetails = {
  idQuests?: string;
  title?: string;
  desc?: string;
  jobImgURL?: string[];
  imageURL?: string[];
  dueDate?: string;
  due_date_type?: string;
  date_range_end?: string;
  time_range?: string;
  urgent?: boolean;
  timing?: string;
  number_of_hours?: string | number;
  requirements?: string;
  status?: string;
  posting_persona?: string;
  paid_features?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  datePosted?: string;
  likesCount?: string | number;
  views_count?: string | number;
  ratingAsCitizen?: string | number;
  reviewsAsCitizen?: string | number;
  price?: string | number;
  price_negotiable?: boolean;
  transaction_currency?: string;
  payment_recurrence?: string;
  additional_purchases_price?: string | number;
  numOffers?: string | number;
  proposalsCount?: string | number;
  starting_country?: string;
  ending_country?: string;
  starting_location?: QuestDetailsLocation;
  ending_location?: QuestDetailsLocation;
  address?: string;
  lat?: number;
  lng?: number;
  scope_of_reach?: string;
  country_code?: string;
  user_country_code?: string;
  my_info?: boolean | string | number;
  phone_verified?: boolean | string | number;
  email_verified?: boolean | string | number;
  similarQuests?: BrowseQuest[];
};

export type QuestDetailsApiResponse = QuestDetails[];
