// ── Location ──────────────────────────────────────────────────────────────────

export type LocationData = {
  primaryText: string;   // first component of the human-readable name (Google Maps)
  secondaryText: string; // second component of the human-readable name (Google Maps)
  lat: number;
  lng: number;
};

// ── Enums ─────────────────────────────────────────────────────────────────────

export type DueDateType = 'range' | 'before' | 'exact';
export type PaymentRecurrence = 'one time payment' | 'per hour';
export type ScopeOfReach = 'local' | 'global';

// ── API payload (POST /quest) ─────────────────────────────────────────────────

export type PostQuestPayload = {
  // Client-generated — never provided by the agent; added by the controller.
  questID: string;
  citizenID: string;

  // Required
  title: string;
  desc: string;
  numOffers: number;
  scopeOfReach: ScopeOfReach;
  startingCountry: string;
  startingLocation: LocationData;
  dueDate: string;             // ISO 8601 timestamp
  dueDateType: DueDateType;
  timeRange: string;
  numberOfHours: number;
  paymentRecurrence: PaymentRecurrence;
  price: number;
  minimumBudget: number;
  averageBudget: number;
  countryCode: string;

  // Optional
  genre?: string;
  subCategory?: string;
  requirements?: string;
  screeningQuestions?: string[];
  jobImgURL?: string[];
  endingCountry?: string;
  endingLocation?: LocationData;
  dateRangeEnd?: string;       // ISO 8601; only when dueDateType === 'range'
  urgent?: boolean;
  additionalPurchasePrice?: number;
  priceNegotiable?: boolean;
  portfolioLinkRequired?: boolean;
  paidFeatures?: string;
  discountCode?: string;
  dynamicLink?: string;
};

// What the agent returns — all fields except the two the controller generates.
export type AgentQuestData = Omit<PostQuestPayload, 'questID' | 'citizenID'>;

// ── Conversational agent types ────────────────────────────────────────────────

export type ChatMessage = {
  role: 'user' | 'agent';
  content: string;
};

// Shape returned by the conversational agent on each turn.
// The agent now posts the quest to the backend itself — when readyToPost is
// true the frontend just advances to 'done'; no quest data is forwarded.
export type AgentTurnResponse = {
  message: string;
  readyToPost: boolean;
};
