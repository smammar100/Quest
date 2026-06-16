// Mock dataset for the /prototype/bounties quest-board redesigns.
// Quest voice: posters post "quests", "Heroes" apply and do real-world
// work AI can't. Categories mirror the live site (Field data / Errands /
// Content / Events / Home). Visual-only — no backend. Shared by all versions.

export type BountyCategory = {
  id: string;
  label: string;
  blurb: string;
  icon: string; // material-symbols name
};

export const BOUNTY_CATEGORIES: BountyCategory[] = [
  {
    id: "all",
    label: "All quests",
    blurb: "Everything open right now",
    icon: "grid_view",
  },
  {
    id: "field-data",
    label: "Field data",
    blurb: "Audits, surveys & on-the-ground checks",
    icon: "pin_drop",
  },
  {
    id: "errands",
    label: "Errands",
    blurb: "Pickups, drop-offs, queues & small jobs",
    icon: "bolt",
  },
  {
    id: "content",
    label: "Content",
    blurb: "Photo, video & UGC shot on location",
    icon: "videocam",
  },
  {
    id: "events",
    label: "Events",
    blurb: "Setup, staffing & on-the-day hands",
    icon: "celebration",
  },
  {
    id: "home",
    label: "Home",
    blurb: "Cleaning, assembly, repairs & muscle",
    icon: "home",
  },
];

export type Bounty = {
  id: string;
  title: string;
  description: string;
  category: string; // category id
  categoryLabel: string; // short human label, e.g. "Retail audit"
  categoryIcon: string;
  price: number;
  rate: "hr" | "fixed";
  tags: string[];
  location: string;
  remote: boolean;
  duration: string; // e.g. "~12h"
  applied: number;
  postedAgo: string;
  poster: { name: string };
  fundsSecured: boolean;
  recurring?: boolean;
  due?: string; // e.g. "Fri, Jul 3"
  expired?: boolean;
  featured?: boolean;
};

export const BOUNTIES: Bounty[] = [
  {
    id: "shelf-pricing-audit",
    title: "Photograph shelf pricing in 12 supermarkets",
    description:
      "Visit 12 supermarkets across the North Side, photograph shelf pricing for a set list of products, and log it in our short form. Clear instructions provided. Great for someone who's out and about anyway.",
    category: "field-data",
    categoryLabel: "Retail audit",
    categoryIcon: "pin_drop",
    price: 22,
    rate: "hr",
    tags: ["retail audit", "photo proof", "reliable"],
    location: "Chicago, IL",
    remote: false,
    duration: "~6h",
    applied: 3,
    postedAgo: "2h ago",
    poster: { name: "Mariah K." },
    fundsSecured: true,
    due: "Fri, Jul 3",
    featured: true,
  },
  {
    id: "mystery-shop-phone-store",
    title: "Mystery shop a phone store and rate the pitch",
    description:
      "Walk into a city-centre phone store as a regular customer, ask about upgrading your plan, then fill in a short scorecard on the pitch, upsell, and service. Discreet — no recording needed.",
    category: "field-data",
    categoryLabel: "Mystery shopping",
    categoryIcon: "pin_drop",
    price: 30,
    rate: "fixed",
    tags: ["mystery shopping", "retail"],
    location: "Melbourne, AU",
    remote: false,
    duration: "~1h",
    applied: 18,
    postedAgo: "1d ago",
    poster: { name: "Daniel O." },
    fundsSecured: true,
  },
  {
    id: "inspect-rental-apartment",
    title: "Inspect a rental apartment before I sign",
    description:
      "I'm relocating and can't view in person. Visit a 1-bed in Mitte, check it matches the listing, test taps and sockets, and bring back detailed photos plus a 2-minute walkthrough video before I sign the lease.",
    category: "field-data",
    categoryLabel: "Verification",
    categoryIcon: "pin_drop",
    price: 60,
    rate: "fixed",
    tags: ["verification", "photography", "real estate"],
    location: "Berlin, DE",
    remote: false,
    duration: "~2h",
    applied: 5,
    postedAgo: "1d ago",
    poster: { name: "Jonas W." },
    fundsSecured: true,
    due: "Wed, Jul 1",
  },
  {
    id: "sidewalk-survey-downtown",
    title: "Run a 50-person sidewalk survey downtown",
    description:
      "Stop 50 people near the convention center and ask 6 quick questions on a tablet we provide. Friendly and outgoing is a must. Best done over a lunchtime when foot traffic is high.",
    category: "field-data",
    categoryLabel: "Street survey",
    categoryIcon: "pin_drop",
    price: 25,
    rate: "hr",
    tags: ["survey", "outgoing", "tablet provided"],
    location: "Austin, TX",
    remote: false,
    duration: "~4h",
    applied: 7,
    postedAgo: "2d ago",
    poster: { name: "Priya N." },
    fundsSecured: true,
  },
  {
    id: "grocery-run-grandmother",
    title: "Weekly grocery run for my grandmother",
    description:
      "Pick up a pre-paid grocery order and deliver it to my grandmother in North Austin every Saturday morning. Carry the bags in, say hello — she loves a chat. Lovely recurring quest.",
    category: "errands",
    categoryLabel: "Grocery run",
    categoryIcon: "bolt",
    price: 30,
    rate: "fixed",
    tags: ["grocery", "recurring", "friendly"],
    location: "Austin, TX",
    remote: false,
    duration: "~1.5h",
    applied: 6,
    postedAgo: "3d ago",
    poster: { name: "Helen P." },
    fundsSecured: true,
    recurring: true,
  },
  {
    id: "parcel-pickup-brooklyn",
    title: "Pick up a parcel in Brooklyn, ship it to me",
    description:
      "Collect a small parcel from a shop in Williamsburg before they close at 6pm, then drop it at any post office to ship to me. I'll cover postage. Quick one for someone nearby.",
    category: "errands",
    categoryLabel: "Pickup & delivery",
    categoryIcon: "bolt",
    price: 40,
    rate: "fixed",
    tags: ["pickup", "delivery", "same-day"],
    location: "Brooklyn, NY",
    remote: false,
    duration: "~2h",
    applied: 11,
    postedAgo: "5h ago",
    poster: { name: "Marcus T." },
    fundsSecured: true,
    due: "Today, 6pm",
  },
  {
    id: "queue-sneaker-drop",
    title: "Queue for a limited-edition sneaker drop",
    description:
      "Line up at the flagship store on release morning and buy one pair in my size with funds I send ahead. Bring a power bank and patience — this one tends to sell out fast.",
    category: "errands",
    categoryLabel: "Queueing & waiting",
    categoryIcon: "bolt",
    price: 20,
    rate: "hr",
    tags: ["queueing", "early start"],
    location: "London, UK",
    remote: false,
    duration: "~3h",
    applied: 24,
    postedAgo: "6h ago",
    poster: { name: "Aisha R." },
    fundsSecured: true,
  },
  {
    id: "ugc-water-bottle",
    title: "Film a 60-second UGC ad for a water bottle",
    description:
      "Authentic creator wanted to film a natural, talk-to-camera 60-second UGC ad for our insulated water bottle. Vertical 9:16, daylight, your own style. Product shipped to you before the shoot.",
    category: "content",
    categoryLabel: "UGC video",
    categoryIcon: "videocam",
    price: 120,
    rate: "fixed",
    tags: ["UGC", "video", "vertical"],
    location: "Los Angeles, CA",
    remote: false,
    duration: "~3h",
    applied: 21,
    postedAgo: "1d ago",
    poster: { name: "Bloom Goods" },
    fundsSecured: true,
    featured: true,
  },
  {
    id: "etsy-product-photos",
    title: "Shoot 40 product photos for an Etsy shop",
    description:
      "Photograph 40 handmade ceramics on a clean white background at your place or mine. Consistent lighting and crisp edges matter more than fancy styling. I'll supply a shot list.",
    category: "content",
    categoryLabel: "Product photography",
    categoryIcon: "videocam",
    price: 90,
    rate: "fixed",
    tags: ["product photo", "studio", "ecommerce"],
    location: "Portland, OR",
    remote: false,
    duration: "~4h",
    applied: 9,
    postedAgo: "2d ago",
    poster: { name: "Renata C." },
    fundsSecured: true,
  },
  {
    id: "plan-social-content",
    title: "Plan a month of social content for a bakery",
    description:
      "Map out 20 posts for our neighbourhood bakery — captions, hooks, and a simple shot list we can film ourselves. Remote-friendly; one optional call to swap ideas.",
    category: "content",
    categoryLabel: "Social content",
    categoryIcon: "videocam",
    price: 35,
    rate: "hr",
    tags: ["social", "planning", "captions"],
    location: "Remote",
    remote: true,
    duration: "~5h",
    applied: 14,
    postedAgo: "3d ago",
    poster: { name: "Theo M." },
    fundsSecured: true,
  },
  {
    id: "waiters-dinner-party",
    title: "Two waiters for a 40-guest dinner party",
    description:
      "Hosting a milestone birthday and need two friendly servers for the evening — pour drinks, clear plates, keep the night flowing. Smart-casual dress. Dinner included, of course.",
    category: "events",
    categoryLabel: "Event staffing",
    categoryIcon: "celebration",
    price: 28,
    rate: "hr",
    tags: ["hospitality", "evening", "team of 2"],
    location: "Sydney, AU",
    remote: false,
    duration: "~5h",
    applied: 8,
    postedAgo: "2d ago",
    poster: { name: "Olivia H." },
    fundsSecured: true,
    due: "Sat, Jul 5",
  },
  {
    id: "market-stall-setup",
    title: "Setup & teardown for a weekend market stall",
    description:
      "Help me set up a market stall Saturday morning (gazebo, tables, signage) and break it down Sunday evening. Some lifting involved. Reliable and on-time is everything here.",
    category: "events",
    categoryLabel: "Setup & teardown",
    categoryIcon: "celebration",
    price: 22,
    rate: "hr",
    tags: ["setup", "lifting", "weekend"],
    location: "Brooklyn, NY",
    remote: false,
    duration: "~6h",
    applied: 4,
    postedAgo: "4d ago",
    poster: { name: "Sam D." },
    fundsSecured: true,
  },
  {
    id: "end-of-lease-clean",
    title: "End-of-lease clean for a 2-bed flat",
    description:
      "Bond clean for a 2-bed, 1-bath flat — kitchen, oven, bathroom, floors, windows inside. Moving out Friday so it needs to be spotless for the inspection. Supplies can be provided.",
    category: "home",
    categoryLabel: "Cleaning",
    categoryIcon: "home",
    price: 35,
    rate: "hr",
    tags: ["deep clean", "end of lease"],
    location: "Manchester, UK",
    remote: false,
    duration: "~4h",
    applied: 12,
    postedAgo: "1d ago",
    poster: { name: "Grace L." },
    fundsSecured: true,
    due: "Fri, Jul 3",
  },
  {
    id: "mount-tv",
    title: "Mount a 65-inch TV and hide the cables",
    description:
      "Wall-mount a 65-inch TV on plasterboard, get it level, and route the cables neatly out of sight. Bracket and basic trunking already bought. Should be a tidy couple of hours for a pro.",
    category: "home",
    categoryLabel: "Handyman",
    categoryIcon: "home",
    price: 90,
    rate: "fixed",
    tags: ["mounting", "cable tidy", "tools needed"],
    location: "Chicago, IL",
    remote: false,
    duration: "~2h",
    applied: 6,
    postedAgo: "2d ago",
    poster: { name: "Derek S." },
    fundsSecured: true,
  },
  {
    id: "assemble-pax-wardrobe",
    title: "Assemble a PAX wardrobe, two doors, mirror",
    description:
      "Flat-pack PAX wardrobe with two hinged doors and a mirror panel needs assembling and anchoring to the wall. All parts and instructions on site. Bring your own drill if you can.",
    category: "home",
    categoryLabel: "Furniture assembly",
    categoryIcon: "home",
    price: 80,
    rate: "fixed",
    tags: ["flat-pack", "assembly", "anchoring"],
    location: "Toronto, CA",
    remote: false,
    duration: "~3h",
    applied: 5,
    postedAgo: "3d ago",
    poster: { name: "Nina B." },
    fundsSecured: true,
  },
  {
    id: "weekly-pharmacy-check",
    title: "Weekly shelf check at 4 pharmacies",
    description:
      "Same four pharmacies every Friday: count facings, flag out-of-stocks, and photograph the end cap. Looking for someone reliable who lives nearby and can commit for a few months.",
    category: "field-data",
    categoryLabel: "Retail audit",
    categoryIcon: "pin_drop",
    price: 24,
    rate: "hr",
    tags: ["retail audit", "recurring", "local"],
    location: "Leeds, UK",
    remote: false,
    duration: "~2h",
    applied: 2,
    postedAgo: "5d ago",
    poster: { name: "Omar F." },
    fundsSecured: true,
    recurring: true,
  },
];

// Heroes recently paid — shown as a scrolling ticker along the top.
// Faces are Unsplash portraits (face-cropped).
const face = (id: string) =>
  `https://images.unsplash.com/${id}?w=72&h=72&fit=crop&crop=faces&q=80`;

export const RECENT_EARNERS = [
  { name: "Maya", amount: 40, place: "Brooklyn", avatar: face("photo-1494790108377-be9c29b29330") },
  { name: "Tomás", amount: 120, place: "Lisbon", avatar: face("photo-1500648767791-00dcc994a43e") },
  { name: "Priya", amount: 25, place: "Austin", avatar: face("photo-1438761681033-6461ffad8d80") },
  { name: "Ben", amount: 60, place: "Berlin", avatar: face("photo-1507003211169-0a1dd7228f2d") },
  { name: "Grace", amount: 35, place: "Manchester", avatar: face("photo-1544005313-94ddf0286df2") },
  { name: "Diego", amount: 90, place: "Mexico City", avatar: face("photo-1535713875002-d1d0cf377fde") },
  { name: "Aisha", amount: 50, place: "London", avatar: face("photo-1554151228-14d9def656e4") },
  { name: "Sam", amount: 28, place: "Sydney", avatar: face("photo-1506794778202-cad84cf45f1d") },
  { name: "Lena", amount: 75, place: "Toronto", avatar: face("photo-1517841905240-472988babdf9") },
  { name: "Omar", amount: 24, place: "Leeds", avatar: face("photo-1527980965255-d3b416303d12") },
];

export const SORT_TABS = ["newest", "top pay", "ending soon"] as const;
