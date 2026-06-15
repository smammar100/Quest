// Shared content for the Hero category-landing prototypes (/prototype/v1…v5).
// All 5 design variations render IDENTICAL content from this file so the only
// variable is the design. Adapted from the Airtasker "Individual Hero Page"
// section map (hero → why-join → tasks → earnings → how-to → top heroes → FAQ).

export const HERO_COPY = {
    eyebrow: 'Earn as a Hero',
    // {label} is the category label, lowercased by the page where needed
    titlePattern: (label: string) => `${label} quests near you.`,
    subPattern: (label: string) =>
      `Browse hundreds of open ${label.toLowerCase()} quests. Set your price, work your hours, get paid fast.`,
    cta: 'Become a Hero',
    ctaSecondary: 'See open quests',
    // floating "See what you could earn" widget
    earnWidget: {
      label: 'See what you could earn',
      cadence: '1–2 quests / week',
      amount: '$1,126',
      period: 'per month',
    },
  };
  
  export type HeroReason = { icon: string; title: string; body: string };
  export const HERO_REASONS: HeroReason[] = [
    { icon: 'event_available', title: 'All on your terms', body: 'Pick the quests that fit your week. Work when you want, where you want, for what you want.' },
    { icon: 'rocket_launch', title: 'Get going for free', body: 'No joining fee, no subscription. Set up a profile and start earning the same day.' },
    { icon: 'verified_user', title: 'Secure payments', body: 'Funds are held safely the moment a quest is posted, and released the moment your work is accepted.' },
    { icon: 'workspace_premium', title: 'Skills that pay', body: 'Turn what you’re already good at into real-world income — no degree, no gatekeepers.' },
  ];
  
  export type HowStep = { n: string; icon: string; title: string; body: string; accent: 'electric' | 'marigold' | 'lime' | 'violet' };
  export const HOW_STEPS: HowStep[] = [
    { n: '01', icon: 'notifications_active', title: 'Quests find you', body: 'Get matched to nearby quests that fit your skills. New ones land in your feed every day.', accent: 'electric' },
    { n: '02', icon: 'sell', title: 'Set your price', body: 'Make an offer or take a fixed payout — you decide what your time is worth.', accent: 'marigold' },
    { n: '03', icon: 'bolt', title: 'Work. Get paid. Fast.', body: 'Finish the quest, upload your proof, and get paid — usually within 24 hours.', accent: 'lime' },
  ];
  
  export type TopHero = {
    name: string;
    location: string;
    years: string;
    rating: string;
    reviews: string;
    completion: string;
    avatar: string;
    blurb: string;
  };
  const av = (id: string) => `https://images.unsplash.com/${id}?w=160&h=160&fit=crop&crop=faces&auto=format&q=80`;
  export const TOP_HEROES: TopHero[] = [
    { name: 'Maya R.', location: 'Brooklyn, NY', years: '4 years on Quest', rating: '4.9', reviews: '212 reviews', completion: '99%', avatar: av('photo-1494790108377-be9c29b29330'), blurb: 'Quest replaced my old agency work. I pick the quests I want and get paid the same week.' },
    { name: 'Arjun P.', location: 'Austin, TX', years: '2 years on Quest', rating: '4.8', reviews: '138 reviews', completion: '97%', avatar: av('photo-1506794778202-cad84cf45f1d'), blurb: 'I do three quests on weekends and it covers my rent. The app does all the chasing for me.' },
    { name: 'Siti N.', location: 'San Jose, CA', years: '5 years on Quest', rating: '5.0', reviews: '301 reviews', completion: '100%', avatar: av('photo-1534528741775-53994a69daeb'), blurb: 'Top-rated status means the best quests come to me first. Best side income I’ve had.' },
  ];
  
  export type HeroFaq = { q: string; a: string };
  export const HERO_FAQS: HeroFaq[] = [
    { q: 'How do I get paid?', a: 'Every quest shows its payout up front. Quest holds the funds when the poster posts the quest and releases them to you — usually within 24 hours of your proof being accepted.' },
    { q: 'Do I need experience?', a: 'Most quests are open to all. Build a five-star streak on simple quests and higher-paying, recurring work unlocks fast.' },
    { q: 'How much can I earn?', a: 'It depends on the category and how much you take on — Heroes typically earn between $15 and $60/hr. Recurring quests add steady weekly income.' },
    { q: 'Is it safe?', a: 'Every poster and payment is verified, funds are held in escrow, and you choose every quest you take. You only ever travel to vetted or confirmed locations.' },
    { q: 'What does it cost to join?', a: 'Nothing. Creating a profile and browsing quests is free — Quest only takes a small service fee from completed quests.' },
  ];
  
  // A simple distribution for the "what Heroes earn" bell-curve viz. Each value is
  // a relative bar height (0–100); the median marker sits at index `medianIndex`.
  export const EARN_CURVE = {
    bars: [10, 22, 40, 64, 88, 100, 86, 60, 36, 18, 8],
    medianIndex: 5,
    axisLabel: 'Hourly rate (USD)',
  };