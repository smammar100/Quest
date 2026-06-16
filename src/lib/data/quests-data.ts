// Single source of truth for the Browse mega-menu, /quests index, and
// /quests/[category] template pages. Dummy content — swap per category as
// real listings come online; the page structure never changes.

export type QuestListing = {
    title: string;
    sub: string; // subcategory slug
    payType: 'Fixed payout' | 'Hourly';
    pay: string; // "$90" or "$28/hr"
    posted: string;
    time: string; // time needed
    commitment: string;
    level: 'Open to all' | 'Experienced' | 'Top-rated Hero';
    teaser: string;
    tags: string[];
  };
  
  export type QuestSubcategory = { slug: string; label: string; blurb: string };
  
  export type QuestCategory = {
    slug: string;
    label: string;
    tagline: string;
    icon: string; // Material Symbols glyph
    count: string; // fake live total for the sample heading
    earn: { min: number; max: number };
    image: string; // hero background (Unsplash photo id, verified)
    subcategories: QuestSubcategory[];
    listings: QuestListing[];
    seo: { intro: string; sections: { h: string; body: string }[] };
  };
  
  // Hero background image per category — verified Unsplash photo ids.
  const heroImg = (id: string) =>
    `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;
  
  // Estimated monthly earnings shown in the hero "what you could earn" widget,
  // derived from the category's hourly range (~1.5 quests/wk · ~3 hrs · 4.3 wks).
  export const monthlyEstimate = (earn: { min: number; max: number }) => {
    const avg = (earn.min + earn.max) / 2;
    const monthly = Math.round((avg * 3 * 1.5 * 4.3) / 10) * 10;
    return `$${monthly.toLocaleString('en-US')}`;
  };
  
  export const QUEST_CATEGORIES: QuestCategory[] = [
    {
      slug: 'field-data',
      label: 'Field data',
      tagline: 'Audits, surveys, and on-the-ground checks with photo proof.',
      icon: 'pin_drop',
      count: '1,284',
      earn: { min: 18, max: 35 },
      image: heroImg('photo-1441986300917-64674bd600d8'),
      subcategories: [
        { slug: 'retail-audits', label: 'Retail audits', blurb: 'Shelf checks and price audits in store' },
        { slug: 'mystery-shopping', label: 'Mystery shopping', blurb: 'Score the service as a secret customer' },
        { slug: 'site-inspections', label: 'Site inspections', blurb: 'Walk a property and report what you see' },
        { slug: 'surveys', label: 'Street surveys', blurb: 'Intercept and survey people in person' },
        { slug: 'photo-capture', label: 'Photo capture', blurb: 'Photograph places, products, and proof' },
        { slug: 'verification', label: 'Address verification', blurb: 'Confirm a business operates on-site' },
      ],
      listings: [
        { title: 'Photograph shelf pricing in 12 supermarkets', sub: 'retail-audits', payType: 'Fixed payout', pay: '$240', posted: '1 day ago', time: '2 days', commitment: 'One-off', level: 'Open to all', teaser: 'Visit 12 listed stores across the city, photograph our product on shelf with the price tag visible, and upload through the app as you go. Clear checklist provided…', tags: ['Retail audit', 'Photo proof'] },
        { title: 'Mystery shop a phone store and rate the pitch', sub: 'mystery-shopping', payType: 'Fixed payout', pay: '$70', posted: '1 day ago', time: '1 hr', commitment: 'One-off', level: 'Open to all', teaser: 'Walk in as a normal customer, ask about the latest plan, and score the rep on a short rubric afterwards. Receipt reimbursed, report takes ten minutes…', tags: ['Mystery shop', 'Report'] },
        { title: 'Weekly shelf check at 4 pharmacies', sub: 'retail-audits', payType: 'Hourly', pay: '$22/hr', posted: '2 days ago', time: '3 hrs/week', commitment: '3 months', level: 'Experienced', teaser: 'Same four stores every Friday: count facings, flag out-of-stocks, photograph the end cap. Looking for someone reliable who lives nearby…', tags: ['Retail audit', 'Recurring'] },
        { title: 'Inspect a rental apartment before I sign', sub: 'site-inspections', payType: 'Fixed payout', pay: '$60', posted: '2 days ago', time: '45 min', commitment: 'One-off', level: 'Open to all', teaser: "I'm moving cities and can't view it myself. Walk through, film every room, test the taps and windows, and tell me honestly what the listing photos hide…", tags: ['Inspection', 'Video walkthrough'] },
        { title: 'Run a 50-person sidewalk survey downtown', sub: 'surveys', payType: 'Fixed payout', pay: '$200', posted: '3 days ago', time: '2 days', commitment: 'One-off', level: 'Experienced', teaser: 'Five-question intercept survey about commuting habits. Tablet provided, responses logged in the field. Friendly persistence required…', tags: ['Survey', 'In person'] },
        { title: 'Verify 20 business addresses on-site', sub: 'verification', payType: 'Fixed payout', pay: '$180', posted: '3 days ago', time: '3 days', commitment: 'One-off', level: 'Open to all', teaser: 'Confirm each business actually operates at its registered address: photo of the storefront and signage, GPS pin from the doorstep…', tags: ['Verification', 'Photo proof'] },
        { title: 'Photograph 30 store shelves for a CPG brand', sub: 'photo-capture', payType: 'Fixed payout', pay: '$90', posted: '4 days ago', time: '4 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'One aisle per store, wide and close shots, natural lighting. Stores are clustered in two neighbourhoods so it routes nicely by bike…', tags: ['Photo capture', 'Retail'] },
        { title: 'Monthly site inspection of a construction yard', sub: 'site-inspections', payType: 'Hourly', pay: '$28/hr', posted: '4 days ago', time: '2 hrs/month', commitment: '6 months', level: 'Experienced', teaser: 'Walk the perimeter, photograph stock piles and equipment, complete a 20-point safety checklist. Hard hat provided on site…', tags: ['Inspection', 'Recurring'] },
        { title: 'Mystery dine at 3 restaurants, score the service', sub: 'mystery-shopping', payType: 'Fixed payout', pay: '$150', posted: '5 days ago', time: '1 week', commitment: 'One-off', level: 'Open to all', teaser: 'Meals reimbursed up to $40 each. Time the greeting, the order, and the bill; note cleanliness and how the staff handle a special request…', tags: ['Mystery shop', 'Hospitality'] },
        { title: 'Count foot traffic outside a retail site', sub: 'surveys', payType: 'Hourly', pay: '$18/hr', posted: '5 days ago', time: '6 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Two three-hour windows, morning and evening. Clicker counts by direction, weather notes every half hour. A folding chair is a good idea…', tags: ['Survey', 'Foot traffic'] },
        { title: 'Photograph a billboard from 4 angles, weekly', sub: 'photo-capture', payType: 'Fixed payout', pay: '$25', posted: '6 days ago', time: '20 min', commitment: '2 months', level: 'Open to all', teaser: 'Proof-of-posting shots for an outdoor campaign: straight on, both approaches, and a context shot with traffic. Same spot every Monday…', tags: ['Photo capture', 'Recurring'] },
        { title: 'Check 8 vending machines and restock photos', sub: 'retail-audits', payType: 'Fixed payout', pay: '$120', posted: '6 days ago', time: '1 day', commitment: 'One-off', level: 'Open to all', teaser: 'Photograph each machine inside and out, note which rows are empty, and test one purchase per machine (reimbursed). All 8 are within one mall district…', tags: ['Retail audit', 'Photo proof'] },
        { title: 'Verify solar panels were installed at 6 homes', sub: 'verification', payType: 'Fixed payout', pay: '$140', posted: '1 week ago', time: '2 days', commitment: 'One-off', level: 'Experienced', teaser: 'Drive-by verification with telephoto shots of the roof and meter box close-ups where owners are home. Route plan and homeowner letters provided…', tags: ['Verification', 'Driving'] },
        { title: 'Interview 10 shop owners about deliveries', sub: 'surveys', payType: 'Fixed payout', pay: '$250', posted: '1 week ago', time: '1 week', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Fifteen-minute structured interviews, recorded with consent. We supply the question guide and intro letter; you bring the warmth…', tags: ['Survey', 'Interviews'] },
        { title: 'Inspect storm damage on a holiday cabin', sub: 'site-inspections', payType: 'Fixed payout', pay: '$110', posted: '1 week ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Photograph the roof line from the ground, gutters, deck, and any fallen branches. Owner is overseas and needs evidence for insurance…', tags: ['Inspection', 'Insurance'] },
        { title: 'Audit planogram compliance in 5 big-box stores', sub: 'retail-audits', payType: 'Fixed payout', pay: '$175', posted: '1 week ago', time: '2 days', commitment: 'One-off', level: 'Experienced', teaser: 'Compare each bay against the planogram PDF, flag misplaced SKUs, and photograph violations. Detail-lovers will enjoy this one…', tags: ['Retail audit', 'Planogram'] },
        { title: 'Mystery call 15 dealerships, log response times', sub: 'mystery-shopping', payType: 'Fixed payout', pay: '$95', posted: '8 days ago', time: '4 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Phone-based mystery shop: ask the same three questions, note hold time and whether they follow up within 48 hours…', tags: ['Mystery shop', 'Phone'] },
        { title: 'GPS-tag 40 EV chargers with condition photos', sub: 'photo-capture', payType: 'Fixed payout', pay: '$320', posted: '8 days ago', time: '4 days', commitment: 'One-off', level: 'Experienced', teaser: 'Confirm each public charger exists, photograph the unit and screen state, and drop an accurate pin. Great by e-bike; route file supplied…', tags: ['Photo capture', 'Mapping'] },
        { title: 'Exit-poll shoppers at a farmers market', sub: 'surveys', payType: 'Hourly', pay: '$20/hr', posted: '9 days ago', time: '5 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Saturday morning, clipboard and smiles. Four questions about what shoppers bought and why; aim is 80 responses across the morning…', tags: ['Survey', 'Weekend'] },
        { title: 'Verify a warehouse is operating for a lender', sub: 'verification', payType: 'Fixed payout', pay: '$85', posted: '9 days ago', time: '1 hr', commitment: 'One-off', level: 'Experienced', teaser: 'Visit during business hours, photograph loading docks in use, count trucks, and collect a business card from reception…', tags: ['Verification', 'B2B'] },
        { title: 'Weekly competitor price check at 3 stations', sub: 'retail-audits', payType: 'Fixed payout', pay: '$30', posted: '10 days ago', time: '30 min', commitment: '3 months', level: 'Open to all', teaser: 'Photograph the price boards at three fuel stations every Wednesday on your commute. Possibly the easiest recurring quest on the platform…', tags: ['Price check', 'Recurring'] },
        { title: 'Inspect 10 bus shelters for ad damage', sub: 'site-inspections', payType: 'Fixed payout', pay: '$100', posted: '10 days ago', time: '1 day', commitment: 'One-off', level: 'Open to all', teaser: 'Photograph each shelter panel, note cracked glass or graffiti, and rate visibility at night for two of them. All ten on one tram line…', tags: ['Inspection', 'Outdoor media'] },
      ],
      seo: {
        intro: 'Field-data Heroes are the eyes and ears businesses can’t have everywhere at once — auditing shelves, verifying addresses, and gathering ground truth no API can reach.',
        sections: [
          { h: 'What does a field-data Hero do?', body: 'You visit real places and bring back structured proof: shelf photos, survey responses, inspection checklists, GPS-tagged confirmations. Brands, lenders, and platforms rely on it to make decisions they can’t make from a desk. Most quests take under half a day and pay per visit or per route.' },
          { h: 'What skills do I need?', body: 'A smartphone with a decent camera, reliability, and attention to detail. The best field Heroes follow the brief exactly, shoot clean photos, and flag anything odd instead of guessing. No formal qualifications needed for most quests — recurring audit routes tend to go to Heroes with a track record.' },
          { h: 'How do payouts work?', body: 'Each quest shows its payout up front — fixed for one-off visits, hourly for longer shifts like foot-traffic counts. Funds are held by Quest when the business posts the quest and released to you when your proof is accepted, usually within 24 hours.' },
          { h: 'How do I get my first field-data quest?', body: 'Complete your profile, verify your ID, and start with open-to-all quests near you — shelf photography and address verification are the classic first quests. Good ratings unlock recurring routes and higher-paying inspection work fast.' },
        ],
      },
    },
    {
      slug: 'errands',
      label: 'Errands',
      tagline: 'Pickups, drop-offs, queues, and the small jobs that eat a day.',
      icon: 'bolt',
      count: '2,031',
      earn: { min: 15, max: 28 },
      image: heroImg('photo-1583258292688-d0213dc5a3a8'),
      subcategories: [
        { slug: 'delivery', label: 'Pickup & delivery', blurb: 'Collect and drop parcels across town' },
        { slug: 'grocery', label: 'Grocery runs', blurb: 'Shop a list and deliver it fresh' },
        { slug: 'queueing', label: 'Queueing & waiting', blurb: 'Hold a place or wait for access' },
        { slug: 'pets', label: 'Pet care', blurb: 'Walks, feeding, and vet trips' },
        { slug: 'rides', label: 'Rides & drop-offs', blurb: 'Airport runs and one-way drives' },
      ],
      listings: [
        { title: 'Pick up a parcel in Brooklyn, ship it to me', sub: 'delivery', payType: 'Fixed payout', pay: '$40', posted: '1 day ago', time: '1 hr', commitment: 'One-off', level: 'Open to all', teaser: 'Collect a small box from a seller in Williamsburg, double-check the contents against my photo, and post it from any courier branch the same day…', tags: ['Pickup', 'Shipping'] },
        { title: 'Weekly grocery run for my grandmother', sub: 'grocery', payType: 'Fixed payout', pay: '$35', posted: '1 day ago', time: '90 min', commitment: '6 months', level: 'Experienced', teaser: 'Same list every Tuesday plus whatever she adds by phone. She likes a chat at the door, so allow ten minutes for that — honestly the best part…', tags: ['Groceries', 'Recurring'] },
        { title: 'Queue for limited-edition sneaker drop', sub: 'queueing', payType: 'Fixed payout', pay: '$80', posted: '1 day ago', time: '5 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Doors open 10am Saturday; queue forms early. Hold my place, buy size 10 with my prepaid card, and hand off at the station…', tags: ['Queueing', 'Weekend'] },
        { title: 'Walk my golden retriever weekday lunchtimes', sub: 'pets', payType: 'Hourly', pay: '$22/hr', posted: '2 days ago', time: '1 hr/day', commitment: '3 months', level: 'Experienced', teaser: 'Charlie is friendly but strong on the lead. Thirty-minute park loop, fresh water, and a treat if he behaves. Photo update each walk…', tags: ['Dog walking', 'Recurring'] },
        { title: 'Return 3 online orders before the window closes', sub: 'delivery', payType: 'Fixed payout', pay: '$30', posted: '2 days ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Three parcels, three different couriers, all boxed and labelled by me. Just needs someone with an afternoon and a car boot…', tags: ['Returns', 'Driving'] },
        { title: 'Airport pickup for my parents, with a sign', sub: 'rides', payType: 'Fixed payout', pay: '$65', posted: '3 days ago', time: '2 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Flight lands 9:40pm. Meet them at arrivals with a sign, help with two suitcases, and drive them 30 minutes home. They will offer you biscuits…', tags: ['Airport', 'Evening'] },
        { title: 'Wait at my flat for the washing machine repair', sub: 'queueing', payType: 'Fixed payout', pay: '$50', posted: '3 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Engineer gives a four-hour window and I can’t take the morning off. Let them in, send me a video of what they say, lock up after…', tags: ['Waiting', 'Home access'] },
        { title: 'Daily cat feeding while we travel, 10 days', sub: 'pets', payType: 'Fixed payout', pay: '$200', posted: '4 days ago', time: '20 min/day', commitment: '10 days', level: 'Experienced', teaser: 'Two indoor cats, food and litter routine on the fridge. One is shy, the other will supervise you closely. Daily photo required by the children…', tags: ['Pet sitting', 'Daily'] },
        { title: 'Collect a birthday cake across town by 2pm', sub: 'delivery', payType: 'Fixed payout', pay: '$45', posted: '4 days ago', time: '90 min', commitment: 'One-off', level: 'Open to all', teaser: 'Custom cake, paid for, boxed. Needs a flat car boot and a gentle driver — the bakery will show you how to hold it. Party starts at 4pm sharp…', tags: ['Pickup', 'Time-critical'] },
        { title: 'Big monthly shop for a family of five', sub: 'grocery', payType: 'Fixed payout', pay: '$55', posted: '5 days ago', time: '2.5 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Warehouse store run with a long list, organised by aisle. Card preloaded; substitutions by text. Strong trolley game required…', tags: ['Groceries', 'Big shop'] },
        { title: 'Queue at the passport office with my documents', sub: 'queueing', payType: 'Hourly', pay: '$20/hr', posted: '5 days ago', time: '3 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Hold my spot from 7am; I’ll arrive before the counter opens and take over. Sealed document folder stays with you, unopened, the whole time…', tags: ['Queueing', 'Early morning'] },
        { title: 'Drive my car to my new city, 300 miles', sub: 'rides', payType: 'Fixed payout', pay: '$280', posted: '6 days ago', time: '1 day', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'One-way relocation drive, fuel and train ticket back covered. Clean licence and a calm motorway temperament essential. The playlist is yours…', tags: ['Driving', 'Long distance'] },
        { title: 'Pharmacy pickup and drop-off, twice weekly', sub: 'delivery', payType: 'Fixed payout', pay: '$18', posted: '6 days ago', time: '40 min', commitment: '3 months', level: 'Experienced', teaser: 'Collect a repeat prescription Mondays and Thursdays and drop it through my uncle’s letterbox. ID check at the counter, all set up with the pharmacist…', tags: ['Pharmacy', 'Recurring'] },
        { title: 'Take two rabbits to the vet and back', sub: 'pets', payType: 'Fixed payout', pay: '$48', posted: '1 week ago', time: '2 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Carrier provided, appointment booked, vet knows them. They are better travellers than the cat. Hold the carrier level on the stairs…', tags: ['Pets', 'Driving'] },
        { title: 'Office plant watering every Friday', sub: 'queueing', payType: 'Fixed payout', pay: '$25', posted: '1 week ago', time: '45 min', commitment: '6 months', level: 'Open to all', teaser: 'Thirty-ish plants across two floors, watering can in the kitchen, access badge at reception. The monstera on level 2 is the diva — notes provided…', tags: ['Office', 'Recurring'] },
        { title: 'School run cover for one week', sub: 'rides', payType: 'Fixed payout', pay: '$190', posted: '1 week ago', time: '1 hr × 2/day', commitment: '1 week', level: 'Top-rated Hero', teaser: 'Drop-off 8:15, pickup 3:30, two kids, one school. Background check and references required; you’ll meet the family beforehand…', tags: ['School run', 'Vetted'] },
        { title: 'Source and deliver 5 specific vinyl records', sub: 'delivery', payType: 'Fixed payout', pay: '$60', posted: '8 days ago', time: '3 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'A want-list for my dad’s 60th. Three record shops in the centre likely have them; budget per record on the list, receipts please…', tags: ['Shopping', 'Gift'] },
        { title: 'Weekly farmers-market haul before 9am', sub: 'grocery', payType: 'Fixed payout', pay: '$32', posted: '8 days ago', time: '1 hr', commitment: '3 months', level: 'Open to all', teaser: 'Sourdough from one stall, eggs and greens from two others — they’ll know the order under my name. Early birds only; it sells out…', tags: ['Groceries', 'Early morning'] },
        { title: 'House-sit Saturday for furniture deliveries', sub: 'queueing', payType: 'Fixed payout', pay: '$70', posted: '9 days ago', time: '6 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Two deliveries, both “sometime between 8 and 4”, naturally. Wifi, coffee machine, and a sofa you can use until its replacement arrives…', tags: ['Waiting', 'Home access'] },
        { title: 'Feed the chickens while we’re away, 5 days', sub: 'pets', payType: 'Fixed payout', pay: '$75', posted: '9 days ago', time: '30 min/day', commitment: '5 days', level: 'Open to all', teaser: 'Six hens, morning feed and let-out, evening lock-up. Eggs are yours for the week — expect about two dozen. Wellies by the gate…', tags: ['Pets', 'Daily'] },
        { title: 'Move 8 boxes from storage to my flat', sub: 'rides', payType: 'Fixed payout', pay: '$85', posted: '10 days ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Ground-floor unit to a second-floor flat, no lift. Nothing heavier than books. Van or big boot needed; I’ll carry too…', tags: ['Moving', 'Lifting'] },
        { title: 'Stand in line for gig tickets at the box office', sub: 'queueing', payType: 'Fixed payout', pay: '$55', posted: '10 days ago', time: '3 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'In-person-only release, two tickets, my card details via the app’s secure checkout at the till. Queue camaraderie practically guaranteed…', tags: ['Queueing', 'Tickets'] },
      ],
      seo: {
        intro: 'Errand Heroes give people their day back — collecting, delivering, queueing, and covering the small in-person jobs that pile up faster than anyone admits.',
        sections: [
          { h: 'What does an errand Hero do?', body: 'Pickups and returns, grocery runs, waiting in queues or for deliveries, pet care, and drop-offs. The common thread: a real person, on time, with proof it’s done. Most errands take under two hours, and many become weekly regulars once a poster trusts you.' },
          { h: 'What skills do I need?', body: 'Punctuality beats everything. A car or e-bike widens what you can take, and a friendly door-step manner turns one-off quests into recurring ones. Pet and school-run quests may ask for references or a background check.' },
          { h: 'How do payouts work?', body: 'Posters fund the quest when they post it, including any purchase budget. You never spend your own money — prepaid cards or in-app checkout cover purchases. Payout releases when delivery proof is accepted.' },
          { h: 'How do I get my first errand quest?', body: 'Start with parcel pickups and grocery runs near you — they’re plentiful, quick, and rated fast. Keep your radius tight at first; speed and a five-star streak matter more than distance covered.' },
        ],
      },
    },
    {
      slug: 'content',
      label: 'Content',
      tagline: 'Photo, video, and UGC shot where it actually happens.',
      icon: 'videocam',
      count: '1,562',
      earn: { min: 25, max: 60 },
      image: heroImg('photo-1492691527719-9d1e07e534b4'),
      subcategories: [
        { slug: 'ugc', label: 'UGC video', blurb: 'Authentic clips filmed in your space' },
        { slug: 'product-photo', label: 'Product photography', blurb: 'Clean shots for shops and menus' },
        { slug: 'real-estate', label: 'Real-estate shoots', blurb: 'Interiors and walkthroughs for listings' },
        { slug: 'social', label: 'Social content', blurb: 'Reels and posts shot on location' },
        { slug: 'event-video', label: 'Event coverage', blurb: 'Film the day and cut a highlight' },
      ],
      listings: [
        { title: 'Film a 60-second UGC ad for a water bottle', sub: 'ugc', payType: 'Fixed payout', pay: '$250', posted: '1 day ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Script outline provided, your voice and your kitchen. We need natural, not polished — phone footage welcome if the light is good. Product shipped to you…', tags: ['UGC', 'Vertical video'] },
        { title: 'Shoot 40 product photos for an Etsy shop', sub: 'product-photo', payType: 'Fixed payout', pay: '$400', posted: '1 day ago', time: '1 day', commitment: 'One-off', level: 'Experienced', teaser: 'Ceramics on neutral backgrounds plus a few lifestyle shots with coffee. You bring the camera and the eye; I bring 23 mugs and pastries…', tags: ['Product photo', 'E-commerce'] },
        { title: 'Photograph a 2-bed listing before Friday', sub: 'real-estate', payType: 'Fixed payout', pay: '$220', posted: '2 days ago', time: '2 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Wide-angle interiors, a balcony sunset shot if the weather plays along, and 25 edited images back within 48 hours for the agent…', tags: ['Real estate', 'Editing'] },
        { title: 'Shoot 10 Reels at our café in one afternoon', sub: 'social', payType: 'Fixed payout', pay: '$500', posted: '2 days ago', time: '4 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Latte art, the bake display, staff banter, the lunchtime rush. You shoot and rough-cut; we post. Bring your own ring light if you like ours is temperamental…', tags: ['Reels', 'On location'] },
        { title: 'Film my daughter’s graduation ceremony', sub: 'event-video', payType: 'Fixed payout', pay: '$300', posted: '3 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'One camera, the stage moment plus candids outside afterwards. We’re abroad and heartbroken to miss it — a same-day highlight clip would mean everything…', tags: ['Event video', 'Family'] },
        { title: 'Unbox and review our snack box on camera', sub: 'ugc', payType: 'Fixed payout', pay: '$120', posted: '3 days ago', time: '90 min', commitment: 'One-off', level: 'Open to all', teaser: 'Genuine first reactions, three short clips: unboxing, taste test, verdict. Keep the snacks obviously. No script — we want what you actually think…', tags: ['UGC', 'Unboxing'] },
        { title: 'Weekly market-stall photos for our socials', sub: 'social', payType: 'Fixed payout', pay: '$80', posted: '4 days ago', time: '1 hr', commitment: '3 months', level: 'Open to all', teaser: 'Saturday mornings, 20 phone photos of the flower stall: arrangements, hands wrapping bouquets, happy customers who say yes. We repost same day…', tags: ['Social', 'Recurring'] },
        { title: 'Photograph 8 Airbnb units across the city', sub: 'real-estate', payType: 'Fixed payout', pay: '$900', posted: '4 days ago', time: '1 week', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Full interior sets for eight apartments, staging tweaks as you go (we supply the checklist), keys via lockboxes. Batch them however suits your week…', tags: ['Real estate', 'Multi-site'] },
        { title: 'Capture b-roll of our food truck at lunch', sub: 'event-video', payType: 'Hourly', pay: '$45/hr', posted: '5 days ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Steam, sizzle, the queue, the hand-off. 4K horizontal for a sizzle reel plus a few verticals. We’ll feed you a burrito at the end, possibly two…', tags: ['B-roll', 'Food'] },
        { title: 'Three UGC testimonials for a fitness app', sub: 'ugc', payType: 'Fixed payout', pay: '$330', posted: '5 days ago', time: '1 week', commitment: 'One-off', level: 'Experienced', teaser: 'Use the app for a week, then film three 30-second clips: first impressions, favourite feature, honest verdict. Selfie style, outdoors preferred…', tags: ['UGC', 'Testimonial'] },
        { title: 'Flat-lay photos of 25 vintage garments', sub: 'product-photo', payType: 'Fixed payout', pay: '$280', posted: '6 days ago', time: '1 day', commitment: 'One-off', level: 'Open to all', teaser: 'Depop seller drowning in stock. Flat-lays on linen, detail shots of labels and stitching. My spare room, your setup, a very good playlist…', tags: ['Product photo', 'Fashion'] },
        { title: 'Film a 5k charity run, drone welcome', sub: 'event-video', payType: 'Fixed payout', pay: '$450', posted: '6 days ago', time: '5 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Start-line energy, the costume contingent, finish-line hugs. Drone overhead of the park loop if you’re licensed. Two-minute wrap film within a week…', tags: ['Event video', 'Drone'] },
        { title: 'Monthly content day at our climbing gym', sub: 'social', payType: 'Fixed payout', pay: '$350', posted: '1 week ago', time: '4 hrs', commitment: '6 months', level: 'Experienced', teaser: 'One afternoon a month: member spotlights, new route previews, chalk-cloud slow-mo. You’ll get a free membership and forearms of steel…', tags: ['Social', 'Recurring'] },
        { title: 'Photograph our barbershop’s 20 best cuts', sub: 'product-photo', payType: 'Fixed payout', pay: '$240', posted: '1 week ago', time: '2 days', commitment: 'One-off', level: 'Open to all', teaser: 'Before/after pairs as clients come through over two afternoons. Clean backdrop ready by the window seat; consent forms at the till…', tags: ['Portrait', 'Local business'] },
        { title: 'Walkthrough video of a house for remote buyers', sub: 'real-estate', payType: 'Fixed payout', pay: '$150', posted: '1 week ago', time: '90 min', commitment: 'One-off', level: 'Experienced', teaser: 'Steady single-take walkthrough, narrated: open every cupboard, run the shower, read the meter. Buyers are overseas and trust your eyes over the brochure…', tags: ['Real estate', 'Walkthrough'] },
        { title: 'UGC how-to clips for a stand mixer, in your kitchen', sub: 'ugc', payType: 'Fixed payout', pay: '$380', posted: '8 days ago', time: '2 days', commitment: 'One-off', level: 'Experienced', teaser: 'Three recipes, three 45-second clips, mixer is yours to keep afterwards. Flour clouds encouraged. We’ll send the recipe cards and a brand apron…', tags: ['UGC', 'How-to'] },
        { title: 'Street-style portraits outside fashion week', sub: 'social', payType: 'Hourly', pay: '$55/hr', posted: '8 days ago', time: '6 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Two afternoons by the venue entrance shooting looks for our trend roundup. Fast, polite, and quick with a release form on the phone…', tags: ['Street style', 'Fashion'] },
        { title: 'Photograph a retiring baker’s last morning', sub: 'event-video', payType: 'Fixed payout', pay: '$200', posted: '9 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: '4am start, last batch of a 40-year career. Documentary style, the regulars, the empty trays at noon. The neighbourhood is chipping in for this one…', tags: ['Documentary', 'Early morning'] },
        { title: '360° photos of 12 gyms for a booking app', sub: 'real-estate', payType: 'Fixed payout', pay: '$600', posted: '9 days ago', time: '1 week', commitment: 'One-off', level: 'Experienced', teaser: 'Panorama rig provided and shipped. Two or three spheres per venue on a checklist; upload from the app on site. Route covers the inner city…', tags: ['360 photo', 'Multi-site'] },
        { title: 'Product shots of 60 menu dishes over 3 days', sub: 'product-photo', payType: 'Fixed payout', pay: '$750', posted: '10 days ago', time: '3 days', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Full menu refresh for delivery apps. Kitchen plates on schedule, you shoot on our prep table by the window. Naturally, you eat the props…', tags: ['Food photo', 'Menu'] },
        { title: 'Capture testimonial clips at our user meetup', sub: 'ugc', payType: 'Fixed payout', pay: '$280', posted: '10 days ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Pull aside 8–10 happy attendees for 20-second clips against the branded wall. Mic and prompt list provided; charm is your own…', tags: ['Testimonial', 'Event'] },
      ],
      seo: {
        intro: 'Content Heroes shoot what can’t be staged from a studio — real kitchens, real cafés, real reactions — the on-location photo and video brands can’t fake.',
        sections: [
          { h: 'What does a content Hero do?', body: 'UGC ads filmed in your own home, product photography, real-estate shoots, social content days, and event coverage. Posters bring the brief; you bring the eye and the location. Deliverables are usually clips or edited photo sets within a fixed turnaround.' },
          { h: 'What skills do I need?', body: 'For UGC, authenticity beats gear — a recent phone and good light go far. Product, real-estate, and event quests usually expect a camera, basic editing, and a portfolio. Reliability on turnaround time is what posters rate hardest.' },
          { h: 'How do payouts work?', body: 'Fixed payouts per deliverable are the norm — per video, per photo set, per shoot day. The payout is funded up front and released when the poster accepts your files. Products you review are typically yours to keep.' },
          { h: 'How do I get my first content quest?', body: 'Unboxing and testimonial UGC quests are open to all and the fastest way to build ratings. Add three sample clips to your profile — posters book Heroes whose existing style already matches their brand.' },
        ],
      },
    },
    {
      slug: 'events',
      label: 'Events',
      tagline: 'Setup, staffing, and on-the-day hands for events of every size.',
      icon: 'celebration',
      count: '948',
      earn: { min: 18, max: 40 },
      image: heroImg('photo-1530103862676-de8c9debad1d'),
      subcategories: [
        { slug: 'staffing', label: 'Event staffing', blurb: 'Check-in, ushering, and booth crew' },
        { slug: 'setup', label: 'Setup & teardown', blurb: 'Build and pack down the space' },
        { slug: 'catering', label: 'Catering help', blurb: 'Plate, serve, and run the bar' },
        { slug: 'photography', label: 'Event photography', blurb: 'Capture the candids and key moments' },
        { slug: 'music', label: 'DJs & music', blurb: 'Sets and sound for the night' },
      ],
      listings: [
        { title: 'Check in 200 guests at a tech conference', sub: 'staffing', payType: 'Hourly', pay: '$24/hr', posted: '1 day ago', time: '6 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Badge desk from 7:30am: scan QR codes, hand out lanyards, point people at the coffee. Calm under a 9am rush essential; breakfast provided…', tags: ['Check-in', 'Conference'] },
        { title: 'Set up 40 tables for a wedding reception', sub: 'setup', payType: 'Fixed payout', pay: '$180', posted: '1 day ago', time: '4 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Friday afternoon: tables, chairs, linens, and centrepieces per the planner’s diagram. Strong backs and straight tablecloth instincts appreciated…', tags: ['Setup', 'Wedding'] },
        { title: 'Canapé service for 30 at a gallery opening', sub: 'catering', payType: 'Hourly', pay: '$22/hr', posted: '2 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Tray service, black and white dress code, two hours of circulating plus setup and pack-down. Knowing your bruschetta from your crostini helps…', tags: ['Canapés', 'Service'] },
        { title: 'Photograph a 40th birthday garden party', sub: 'photography', payType: 'Fixed payout', pay: '$300', posted: '2 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Candids over posed, golden hour group shot, kids’ table chaos documented in full. Gallery within the week; grandma gets prints…', tags: ['Photography', 'Party'] },
        { title: 'DJ a house party, 9pm to 1am', sub: 'music', payType: 'Fixed payout', pay: '$400', posted: '3 days ago', time: '4 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Thirty guests, living-room setup, your decks. Brief: start disco, end wherever the night takes it. Neighbours warned until midnight only…', tags: ['DJ', 'Party'] },
        { title: 'Hand out samples at a food festival, 2 days', sub: 'staffing', payType: 'Hourly', pay: '$20/hr', posted: '3 days ago', time: '7 hrs/day', commitment: '2 days', level: 'Open to all', teaser: 'Booth duty for a hot-sauce brand: pour thimble cups, learn three talking points, survive the heat-challenge guys. Branded apron and cap provided…', tags: ['Sampling', 'Festival'] },
        { title: 'Tear down a trade-show booth after close', sub: 'setup', payType: 'Fixed payout', pay: '$150', posted: '4 days ago', time: '3 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Sunday 6pm: dismantle the modular stand, box the demo units against the packing list, pallet-wrap, and hand to venue logistics…', tags: ['Teardown', 'Trade show'] },
        { title: 'Plate and run dishes for a private dinner party', sub: 'catering', payType: 'Fixed payout', pay: '$160', posted: '4 days ago', time: '5 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Chef cooks, you plate and serve five courses for ten guests, then handle the kitchen reset. Quiet competence is the whole job description…', tags: ['Service', 'Private dinner'] },
        { title: 'Second shooter for a wedding, 8 hours', sub: 'photography', payType: 'Fixed payout', pay: '$450', posted: '5 days ago', time: '8 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Cover the groom prep and cocktail hour while the lead stays with the bride. Own camera, two bodies preferred, RAWs handed over same night…', tags: ['Photography', 'Wedding'] },
        { title: 'Acoustic set for a café’s Sunday brunch', sub: 'music', payType: 'Fixed payout', pay: '$220', posted: '5 days ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Two 45-minute sets, low-key covers and originals welcome. PA in house. Goes monthly for the right person; brunch is on us…', tags: ['Live music', 'Brunch'] },
        { title: 'Usher and seat guests at a charity gala', sub: 'staffing', payType: 'Hourly', pay: '$23/hr', posted: '6 days ago', time: '5 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Black-tie event for 300: greet, check table numbers, guide to seats, handle the inevitable seat-swap diplomacy with grace…', tags: ['Ushering', 'Gala'] },
        { title: 'Build a balloon arch and photo wall', sub: 'setup', payType: 'Fixed payout', pay: '$180', posted: '6 days ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Kit and design photo supplied; you bring the patience and a good pump arm. Must survive until at least the third hour of a kids’ party…', tags: ['Decor', 'Party'] },
        { title: 'Bar-back a wedding bar, no pouring needed', sub: 'catering', payType: 'Hourly', pay: '$19/hr', posted: '1 week ago', time: '6 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Keep the bartenders stocked: ice runs, glass polishing, crate hauling, the occasional lime emergency. Great first events quest…', tags: ['Bar', 'Wedding'] },
        { title: 'Photo-booth attendant with our prop kit', sub: 'photography', payType: 'Hourly', pay: '$21/hr', posted: '1 week ago', time: '4 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Run the booth at a 30th: coax groups in, manage the prop box, email gifs on the spot. The feather boa will go missing; this is normal…', tags: ['Photo booth', 'Party'] },
        { title: 'String-quartet coordination for a proposal', sub: 'music', payType: 'Fixed payout', pay: '$120', posted: '1 week ago', time: '2 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Cue the musicians hidden in the park, signal as the couple rounds the fountain, film the moment discreetly from the bushes. No pressure…', tags: ['Coordination', 'Surprise'] },
        { title: 'Festival wristband crew, 3-day weekend', sub: 'staffing', payType: 'Hourly', pay: '$18/hr', posted: '8 days ago', time: '8 hrs/day', commitment: '3 days', level: 'Open to all', teaser: 'Gate team for a 5,000-person music festival: wristbands on, prohibited-items spiel, good vibes maintained. Crew camping and meals included…', tags: ['Festival', 'Weekend'] },
        { title: 'Reset a community hall between two bookings', sub: 'setup', payType: 'Fixed payout', pay: '$90', posted: '8 days ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Yoga workshop out at 2pm, christening in at 5pm. Stack mats, deploy 60 chairs and 8 trestles per the photo, bins out, floors swept…', tags: ['Turnaround', 'Venue'] },
        { title: 'Coffee-cart barista for a morning conference', sub: 'catering', payType: 'Fixed payout', pay: '$200', posted: '9 days ago', time: '5 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Cart and beans provided, 150 delegates, an 8:30 stampede, then a mellow tail. Latte art earns tips; speed earns survival…', tags: ['Barista', 'Conference'] },
        { title: 'Livestream a school play on two cameras', sub: 'photography', payType: 'Fixed payout', pay: '$260', posted: '9 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Wide static plus a roaming close-up, mixed live for grandparents in three countries. Tech run Thursday, show Friday. The dragon costume deserves 4K…', tags: ['Livestream', 'School'] },
        { title: 'Karaoke host with our machine, office party', sub: 'music', payType: 'Fixed payout', pay: '$180', posted: '10 days ago', time: '4 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Wrangle the queue, hype the shy ones, and gently end the sales team’s fourth Journey attempt. Machine and screens are set up for you…', tags: ['Karaoke', 'Office'] },
      ],
      seo: {
        intro: 'Event Heroes are the extra pairs of hands every gathering needs — the crew that sets up, checks in, serves, shoots, and packs down while the host enjoys the party.',
        sections: [
          { h: 'What does an event Hero do?', body: 'Guest check-in, ushering, sampling booths, table setup and teardown, catering support, event photography, and music. Quests range from two-hour hall resets to full festival weekends with crew camping.' },
          { h: 'What skills do I need?', body: 'Show up early, stay cheerful, lift carefully. Service quests favour hospitality experience; photography and DJ quests need gear and a portfolio. Most setup and staffing quests are genuinely open to all.' },
          { h: 'How do payouts work?', body: 'Hourly for shifts, fixed for defined jobs like a teardown or a photo set. Overtime is agreed in the app before it happens, never assumed. Payouts release after the event day is confirmed done.' },
          { h: 'How do I get my first events quest?', body: 'Setup, teardown, and cloakroom quests are the classic entries — no portfolio, just punctuality. Event companies post in batches, so one good shift often becomes a season of them.' },
        ],
      },
    },
    {
      slug: 'home',
      label: 'Home',
      tagline: 'Cleaning, assembly, repairs, and muscle for around the house.',
      icon: 'home',
      count: '1,776',
      earn: { min: 20, max: 45 },
      image: heroImg('photo-1581578731548-c64695cc6952'),
      subcategories: [
        { slug: 'cleaning', label: 'Cleaning', blurb: 'Weekly, deep, and end-of-lease' },
        { slug: 'assembly', label: 'Furniture assembly', blurb: 'Flat-pack built and bolted down' },
        { slug: 'yard', label: 'Yard & garden', blurb: 'Mow, prune, and tidy outdoors' },
        { slug: 'handyman', label: 'Handyman jobs', blurb: 'Mount, fix, and small repairs' },
        { slug: 'moving', label: 'Moving help', blurb: 'Lift, load, and haul boxes' },
      ],
      listings: [
        { title: 'End-of-lease clean for a 2-bed flat', sub: 'cleaning', payType: 'Fixed payout', pay: '$450', posted: '1 day ago', time: '1 day', commitment: 'One-off', level: 'Experienced', teaser: 'Full bond clean: oven, windows, skirting boards, the works. Agent’s checklist attached; we get the bond back or the photos prove we should have…', tags: ['Deep clean', 'End of lease'] },
        { title: 'Assemble a PAX wardrobe, two doors, mirror', sub: 'assembly', payType: 'Fixed payout', pay: '$120', posted: '1 day ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'All boxes delivered and waiting in the bedroom. Sliding doors are the boss fight, as you probably know. Tools and good humour required…', tags: ['Flat-pack', 'IKEA'] },
        { title: 'Mow, edge, and tidy a suburban lawn', sub: 'yard', payType: 'Fixed payout', pay: '$100', posted: '2 days ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Front and back, edges along the path, clippings to the green bin. Mower in the shed works fine; petrol can’s full. Could become fortnightly…', tags: ['Lawn', 'Garden'] },
        { title: 'Mount a 65-inch TV and hide the cables', sub: 'handyman', payType: 'Fixed payout', pay: '$90', posted: '2 days ago', time: '90 min', commitment: 'One-off', level: 'Experienced', teaser: 'Bracket purchased, wall is double brick. Cables into a trunking run down to the console. Spirit level non-negotiable; my last attempt haunts me…', tags: ['TV mount', 'Drilling'] },
        { title: 'Two movers for a 1-bed flat, same building', sub: 'moving', payType: 'Fixed payout', pay: '$160', posted: '3 days ago', time: '3 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Third floor to ground floor, lift available for everything except the sofa, which has opinions. Boxes packed and labelled; trolley on site…', tags: ['Moving', 'Lifting'] },
        { title: 'Weekly clean, 3 hours, same time each week', sub: 'cleaning', payType: 'Hourly', pay: '$28/hr', posted: '3 days ago', time: '3 hrs/week', commitment: '6 months', level: 'Experienced', teaser: 'Kitchen, bathrooms, floors, and a rotating deep-clean target each visit. Products supplied; the robot vacuum is a colleague, not a replacement…', tags: ['Cleaning', 'Recurring'] },
        { title: 'Build 6 flat-pack pieces for a new office', sub: 'assembly', payType: 'Fixed payout', pay: '$280', posted: '4 days ago', time: '1 day', commitment: 'One-off', level: 'Experienced', teaser: 'Four desks, a bookshelf, and a meeting table. All boxes in the right rooms, instructions allegedly included. Cordless driver strongly advised…', tags: ['Flat-pack', 'Office'] },
        { title: 'Clear gutters on a single-storey house', sub: 'yard', payType: 'Fixed payout', pay: '$130', posted: '4 days ago', time: '2 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Autumn’s full harvest is up there. Ladder in the garage, gloves provided, green bin for the spoils. Photos of clean gutters to finish…', tags: ['Gutters', 'Ladder work'] },
        { title: 'Fix a dripping tap and a running toilet', sub: 'handyman', payType: 'Fixed payout', pay: '$110', posted: '5 days ago', time: '90 min', commitment: 'One-off', level: 'Experienced', teaser: 'Classic double bill. Washers, valve, whatever it needs — parts reimbursed on receipt. The drip has a rhythm and it’s ruining my life…', tags: ['Plumbing', 'Repair'] },
        { title: 'Help load a rental van for 2 hours', sub: 'moving', payType: 'Hourly', pay: '$25/hr', posted: '5 days ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Van booked for 9am Saturday. You and me, boxes and a mattress, Tetris in the back. Strong coffee provided before we start…', tags: ['Loading', 'Weekend'] },
        { title: 'Deep-clean an oven and two bathrooms', sub: 'cleaning', payType: 'Fixed payout', pay: '$180', posted: '6 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'The oven has seen things. Bathrooms need grout attention and a descale. Strong products fine — windows open, fan on, gloves supplied…', tags: ['Deep clean', 'Oven'] },
        { title: 'Plant 40 hedge seedlings along a fence line', sub: 'yard', payType: 'Fixed payout', pay: '$220', posted: '6 days ago', time: '1 day', commitment: 'One-off', level: 'Open to all', teaser: 'Holes at marked intervals, compost in, water well. Seedlings delivered Thursday; ideally in the ground by Sunday. Honest outdoor work…', tags: ['Planting', 'Garden'] },
        { title: 'Hang 12 pictures and 2 floating shelves', sub: 'handyman', payType: 'Fixed payout', pay: '$140', posted: '1 week ago', time: '3 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Gallery wall layout taped up and ready. Mix of plasterboard and brick, fixings supplied for both. Bring a laser level and end my masking-tape era…', tags: ['Hanging', 'Shelves'] },
        { title: 'Pack a kitchen into boxes, carefully', sub: 'moving', payType: 'Hourly', pay: '$24/hr', posted: '1 week ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Glassware, crockery, and a teapot collection that outnumbers the family. Paper and boxes supplied; label everything like it’s evidence…', tags: ['Packing', 'Fragile'] },
        { title: 'Post-renovation builders’ clean, 3 rooms', sub: 'cleaning', payType: 'Fixed payout', pay: '$320', posted: '1 week ago', time: '1 day', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Plaster dust on every surface including, somehow, inside closed cupboards. Industrial vacuum on site; bring your own respirator preference…', tags: ['Builders clean', 'Dust'] },
        { title: 'Assemble a trampoline before a birthday', sub: 'assembly', payType: 'Fixed payout', pay: '$95', posted: '8 days ago', time: '2 hrs', commitment: 'One-off', level: 'Open to all', teaser: '14-foot trampoline with enclosure, boxed in the garage. Party is Sunday 2pm; springs are a two-person job so I’ll be your assistant…', tags: ['Trampoline', 'Outdoor'] },
        { title: 'Prune three apple trees and shred the brash', sub: 'yard', payType: 'Fixed payout', pay: '$190', posted: '8 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Winter prune for shape and airflow — someone who knows their leaders from their laterals. Shredder available; chips stay for mulch…', tags: ['Pruning', 'Trees'] },
        { title: 'Draught-proof 8 windows and 2 doors', sub: 'handyman', payType: 'Fixed payout', pay: '$170', posted: '9 days ago', time: '4 hrs', commitment: 'One-off', level: 'Experienced', teaser: 'Strip and re-seal before winter bites. Materials bought per the surveyor’s list, sitting in the hallway. The kitchen door whistles in B-flat…', tags: ['Insulation', 'Winter'] },
        { title: 'Move a piano across town with a crew', sub: 'moving', payType: 'Fixed payout', pay: '$380', posted: '9 days ago', time: '4 hrs', commitment: 'One-off', level: 'Top-rated Hero', teaser: 'Upright piano, ground floor to ground floor, ramp and skate provided, four people total. Experience with pianos essential — it was grandma’s…', tags: ['Piano', 'Specialist'] },
        { title: 'Spring-clean a garden shed and sort tools', sub: 'yard', payType: 'Fixed payout', pay: '$120', posted: '10 days ago', time: '3 hrs', commitment: 'One-off', level: 'Open to all', teaser: 'Everything out, sweep and de-cobweb, everything back with logic instead of archaeology. Keep/donate/dump piles decided together over tea…', tags: ['Organising', 'Shed'] },
      ],
      seo: {
        intro: 'Home Heroes do the jobs that wait on every household list — the cleaning, building, fixing, and hauling that turn a free weekend back into a free weekend.',
        sections: [
          { h: 'What does a home Hero do?', body: 'Cleans (weekly, deep, or end-of-lease), assembles flat-pack furniture, handles yard work, mounts and fixes things, and provides muscle for moves. Posters supply access and materials; you supply the hands and the know-how.' },
          { h: 'What skills do I need?', body: 'Cleaning and yard quests need reliability and elbow grease. Assembly and handyman quests expect your own tools and a portfolio of past jobs — a photo of a straight shelf says more than any certificate.' },
          { h: 'How do payouts work?', body: 'Fixed payouts for defined jobs, hourly for open-ended help like packing or loading. Parts and materials are reimbursed on receipt or bought by the poster in advance. Payout releases when the poster confirms the job.' },
          { h: 'How do I get my first home quest?', body: 'Lawn mowing, shed sorting, and loading help are great first quests — minimal gear, fast ratings. Recurring cleans are the steady earners, and they almost always go to Heroes the poster has already met once.' },
        ],
      },
    },
  ];
  
  export const getCategory = (slug: string) =>
    QUEST_CATEGORIES.find((c) => c.slug === slug);
  
  export const INITIAL_VISIBLE = 12;
  
  // ── Browse mega-menu: flat, alphabetical task-type list (Airtasker-style) ──
  // Each type points at its parent category page. Built once from the category
  // subcategories plus a few extra real-world roles so the menu reads dense.
  export type TaskType = { label: string; category: string; sub?: string };
  
  const EXTRA_TYPES: TaskType[] = [
    { label: 'Bartender', category: 'events', sub: 'catering' },
    { label: 'Caterer', category: 'events', sub: 'catering' },
    { label: 'Courier', category: 'errands', sub: 'delivery' },
    { label: 'DJ', category: 'events', sub: 'music' },
    { label: 'Dog walker', category: 'errands', sub: 'pets' },
    { label: 'End of lease cleaner', category: 'home', sub: 'cleaning' },
    { label: 'Event photographer', category: 'content', sub: 'real-estate' },
    { label: 'Gardener', category: 'home', sub: 'yard' },
    { label: 'Grocery shopper', category: 'errands', sub: 'grocery' },
    { label: 'Handyman', category: 'home', sub: 'handyman' },
    { label: 'House cleaner', category: 'home', sub: 'cleaning' },
    { label: 'Mover', category: 'home', sub: 'moving' },
    { label: 'Mystery shopper', category: 'field-data', sub: 'mystery-shopping' },
    { label: 'Pet sitter', category: 'errands', sub: 'pets' },
    { label: 'Photographer', category: 'content', sub: 'product-photo' },
    { label: 'Removalist', category: 'home', sub: 'moving' },
    { label: 'Retail auditor', category: 'field-data', sub: 'retail-audits' },
    { label: 'Site inspector', category: 'field-data', sub: 'site-inspections' },
    { label: 'Street surveyor', category: 'field-data', sub: 'surveys' },
    { label: 'UGC creator', category: 'content', sub: 'ugc' },
    { label: 'Usher', category: 'events', sub: 'staffing' },
    { label: 'Videographer', category: 'content', sub: 'event-video' },
    { label: 'Wait staff', category: 'events', sub: 'catering' },
    { label: 'Window cleaner', category: 'home', sub: 'cleaning' },
  ];
  
  // merge subcategory labels + extra roles, dedupe by label, sort A→Z
  const _merged = new Map<string, TaskType>();
  for (const c of QUEST_CATEGORIES) {
    for (const s of c.subcategories) _merged.set(s.label, { label: s.label, category: c.slug, sub: s.slug });
  }
  for (const t of EXTRA_TYPES) if (!_merged.has(t.label)) _merged.set(t.label, t);
  
  export const TASK_TYPES: TaskType[] = [..._merged.values()].sort((a, b) =>
    a.label.localeCompare(b.label)
  );