export type AppTabId =
  | 'dashboard'
  | 'timeline'
  | 'vendors'
  | 'guests'
  | 'budget'
  | 'shubh-ai';

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  iconName:
    | 'calendar-clock'
    | 'store'
    | 'users'
    | 'wallet'
    | 'bell-ring'
    | 'refresh-cw';
  featured?: boolean;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  detail: string;
}

export interface EventTypeOption {
  id: string;
  label: string;
  sampleTitle: string;
  daysToGo: number;
  guestCount: number;
  budgetDisplay: string;
}

export interface PricingTier {
  id: string;
  name: string;
  audience: string;
  price: string;
  cadence: string;
  description: string;
  highlighted?: boolean;
  specs: string[];
  ctaLabel: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  eventMeta: string;
  quote: string;
  outcome: string;
  avatarSrc: string;
}

export interface PlaceholderModule {
  id: string;
  title: string;
  subtitle: string;
  plannedCapabilities: string[];
  spanClass: string;
  accent: 'marigold' | 'maroon' | 'blush';
}

export interface AppTabConfig {
  id: AppTabId;
  label: string;
  heading: string;
  subheading: string;
  modules: PlaceholderModule[];
}

export interface ReminderItem {
  id: string;
  title: string;
  dueLabel: string;
  category: string;
  unread: boolean;
}

export const HERO_IMAGE_PATH =
  '/src/assets/images/hero_utsav_celebration_1795259658398.jpg';

export const FEATURES: FeatureItem[] = [
  {
    id: 'smart-timeline',
    number: '01',
    title: 'Smart Timeline',
    description:
      'Shubh sequences every milestone backward from your celebration date—venue holds, tasting locks, decor sign-offs, and family rituals.',
    outcome: 'Zero last-minute scrambles across multi-day schedules',
    iconName: 'calendar-clock',
    featured: true,
  },
  {
    id: 'vendor-matchmaker',
    number: '02',
    title: 'Vendor Matchmaker',
    description:
      'Curated shortlists of photographers, caterers, florists, and venues matched to your guest count, aesthetic, and city availability.',
    outcome: 'Compare 3 vetted quotes side-by-side without endless calls',
    iconName: 'store',
  },
  {
    id: 'rsvp-tracker',
    number: '03',
    title: 'RSVP Tracker',
    description:
      'Track household invitations, ceremony-by-ceremony headcounts, dietary notes, and travel arrivals from one clean guest directory.',
    outcome: 'Accurate catering counts locked 14 days before event day',
    iconName: 'users',
  },
  {
    id: 'budget-guardian',
    number: '04',
    title: 'Budget Guardian',
    description:
      'Real-time category allocations across venue, F&B, attire, and decor—flagging drift before deposits exceed your ceiling.',
    outcome: 'Stay within 2% of your target spend from day one',
    iconName: 'wallet',
  },
  {
    id: 'auto-reminders',
    number: '05',
    title: 'Auto Reminders',
    description:
      'Timely nudges for vendor advance payments, guest RSVP follow-ups, and permit deadlines sent exactly when action is needed.',
    outcome: 'Never miss a deposit window or vendor lock date',
    iconName: 'bell-ring',
  },
  {
    id: 'instant-replanning',
    number: '06',
    title: 'Instant Replanning',
    description:
      'Guest list grew by 40 or rain shifted your courtyard ceremony indoors? Tell Shubh what changed and watch dates, budgets, and tasks rebalance.',
    outcome: 'Complete schedule & cost recalibration in under 10 seconds',
    iconName: 'refresh-cw',
    featured: true,
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Tell us your event',
    detail: 'Share your celebration type, target budget, guest count, and preferred date.',
  },
  {
    step: '02',
    title: 'Get your plan',
    detail: 'Shubh builds a month-by-month roadmap, category budget split, and vendor checklist.',
  },
  {
    step: '03',
    title: 'Track everything',
    detail: 'Log deposits, shortlist venues, manage RSVPs, and keep every family stakeholder aligned.',
  },
  {
    step: '04',
    title: 'Shubh replans when life happens',
    detail: 'Date shifts or headcount surges update your tasks, cashflow, and reminders automatically.',
  },
];

export const EVENT_TYPES: EventTypeOption[] = [
  {
    id: 'wedding',
    label: 'Wedding',
    sampleTitle: "Aarav & Meera's Wedding",
    daysToGo: 124,
    guestCount: 280,
    budgetDisplay: '₹24,00,000',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    sampleTitle: 'Riya & Kabir Engagement Soirée',
    daysToGo: 48,
    guestCount: 120,
    budgetDisplay: '₹6,50,000',
  },
  {
    id: 'birthday',
    label: 'Birthday',
    sampleTitle: "Dadi's 75th Milestone Dinner",
    daysToGo: 29,
    guestCount: 65,
    budgetDisplay: '₹2,40,000',
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    sampleTitle: '25th Silver Jubilee Celebration',
    daysToGo: 62,
    guestCount: 95,
    budgetDisplay: '₹4,80,000',
  },
  {
    id: 'corporate-offsite',
    label: 'Corporate Offsite',
    sampleTitle: 'Annual Leadership Retreat · Udaipur',
    daysToGo: 41,
    guestCount: 85,
    budgetDisplay: '₹12,00,000',
  },
  {
    id: 'baby-shower',
    label: 'Baby Shower',
    sampleTitle: 'Nandini & Dev Godh Bharai',
    daysToGo: 19,
    guestCount: 50,
    budgetDisplay: '₹1,85,000',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    audience: 'For intimate gatherings & early exploration',
    price: '₹0',
    cadence: 'forever · 1 active event',
    description:
      'Start mapping your milestone checklist, budget split, and initial guest roster without a card.',
    specs: [
      '1 active event workspace',
      'Up to 75 guest RSVP entries',
      'Core Smart Timeline & Budget Split',
      '10 Shubh AI planning prompts / month',
    ],
    ctaLabel: 'Start Planning Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    audience: 'For couples & families hosting signature milestones',
    price: '₹1,499',
    cadence: 'per celebration · 12 months access',
    description:
      'Full AI planning intelligence with unlimited Shubh replanning, vendor comparisons, and payment alerts.',
    highlighted: true,
    specs: [
      'Unlimited guests & multi-ceremony RSVPs',
      'Unlimited Instant Replanning with Shubh',
      'Vendor Matchmaker & deposit schedules',
      'Up to 6 family collaborator seats',
    ],
    ctaLabel: 'Start Planning with Pro',
  },
  {
    id: 'planner-studio',
    name: 'Planner Studio',
    audience: 'For boutique event studios & corporate teams',
    price: '₹4,999',
    cadence: 'per month · multi-client workspace',
    description:
      'Run simultaneous client celebrations with shared vendor directories, live client approvals, and consolidated payouts.',
    specs: [
      'Up to 15 concurrent client events',
      'Shared studio vendor roster & rate cards',
      'Client-ready RSVP & budget exports',
      'Priority Shubh AI scenario modeling',
    ],
    ctaLabel: 'Start Planning Studio',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ananya',
    name: 'Ananya Deshmukh',
    role: 'Bride & Product Architect',
    location: 'Pune',
    eventMeta: '3-Day Courtyard Wedding · 260 Guests',
    quote:
      'When our mehendi venue fell through six weeks out, Shubh rebalanced our timeline, shortlisted three available lawns, and protected our catering deposit in one evening.',
    outcome: 'Saved ₹1.8L in rush fees and locked final vendors in 48 hours',
    avatarSrc: '/src/assets/images/avatar_ananya_1795259658940.jpg',
  },
  {
    id: 'rohan',
    name: 'Rohan Kulkarni',
    role: 'VP Operations, Meridian Labs',
    location: 'Bengaluru',
    eventMeta: 'Annual Corporate Offsite · 90 Attendees',
    quote:
      'Instead of juggling four spreadsheets for flights, AV, and banquet billing, every payment milestone and dietary count lived in a single calm workspace.',
    outcome: 'Closed final offsite reconciliation 4% under approved budget',
    avatarSrc: '/src/assets/images/avatar_rohan_1795259658606.jpg',
  },
  {
    id: 'kavita',
    name: 'Kavita Nair',
    role: 'Founder, Marigold & Co. Events',
    location: 'Jaipur',
    eventMeta: 'Planner Studio · 11 Active Celebrations',
    quote:
      'Our coordinators spend half as much time chasing vendor installments. Families love seeing clear RSVPs and D-day countdowns without endless group chats.',
    outcome: 'Cut weekly client status calls from 6 hours to 45 minutes',
    avatarSrc: '/src/assets/images/avatar_kavita_1795259659119.jpg',
  },
];

export const APP_TABS: AppTabConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    heading: 'Celebration Overview',
    subheading:
      'Your command center for countdown milestones, plan health, active tasks, budget pacing, and RSVP momentum.',
    modules: [
      {
        id: 'countdown',
        title: 'Countdown',
        subtitle: 'Days remaining, upcoming ceremony milestones, and seasonal readiness window.',
        plannedCapabilities: ['D-day ticker', 'Next ceremony milestone', 'Weather & buffer watch'],
        spanClass: 'md:col-span-5',
        accent: 'maroon',
      },
      {
        id: 'plan-health',
        title: 'Plan Health',
        subtitle: 'Readiness status across locked vendors, pending confirmations, and schedule buffers.',
        plannedCapabilities: ['Timeline pacing', 'Vendor lock ratio', 'Action priority alert'],
        spanClass: 'md:col-span-7',
        accent: 'marigold',
      },
      {
        id: 'upcoming-tasks',
        title: 'Upcoming Tasks',
        subtitle: 'Next 7 days of high-priority tasks assigned across family and coordinators.',
        plannedCapabilities: ['Owner assignment', 'Due-date filters', 'One-click completion'],
        spanClass: 'md:col-span-4',
        accent: 'blush',
      },
      {
        id: 'budget-snapshot',
        title: 'Budget Snapshot',
        subtitle: 'Allocated ceiling vs. committed deposits and upcoming tranche releases.',
        plannedCapabilities: ['Committed vs. remaining', 'Top category burn', 'Next payment due'],
        spanClass: 'md:col-span-4',
        accent: 'marigold',
      },
      {
        id: 'rsvp-snapshot',
        title: 'RSVP Snapshot',
        subtitle: 'Confirmed guests, pending households, and dietary or hotel room tallies.',
        plannedCapabilities: ['Confirmed / Pending / Declined', 'Ceremony headcounts', 'Reminder trigger'],
        spanClass: 'md:col-span-4',
        accent: 'maroon',
      },
    ],
  },
  {
    id: 'timeline',
    label: 'Timeline',
    heading: 'Master Timeline',
    subheading:
      'Structured month-by-month celebration roadmap paired with your live checklist and overdue safety net.',
    modules: [
      {
        id: 'month-timeline',
        title: 'Month-by-Month Timeline',
        subtitle: 'Chronological phases from 6 months out through event week run-of-show.',
        plannedCapabilities: ['Phase milestones', 'Dependency markers', 'Auto-shifted dates'],
        spanClass: 'md:col-span-12',
        accent: 'marigold',
      },
      {
        id: 'checklist',
        title: 'Checklist',
        subtitle: 'Actionable tasks grouped by ceremony, owner, and vendor dependency.',
        plannedCapabilities: ['Category filters', 'Assignee tags', 'Notes & attachments'],
        spanClass: 'md:col-span-7',
        accent: 'maroon',
      },
      {
        id: 'overdue-tasks',
        title: 'Overdue Tasks',
        subtitle: 'Time-sensitive items past target date with instant Shubh rescheduling options.',
        plannedCapabilities: ['Slip impact view', '1-click reschedule', 'Escalation reminders'],
        spanClass: 'md:col-span-5',
        accent: 'blush',
      },
    ],
  },
  {
    id: 'vendors',
    label: 'Vendors',
    heading: 'Vendor Directory',
    subheading:
      'Move effortlessly from AI-curated vendor matches to shortlisted quotes and signed contracts.',
    modules: [
      {
        id: 'suggested-vendors',
        title: 'Suggested Vendors',
        subtitle: 'Vetted venues, photographers, caterers, and decorators matched to your budget & city.',
        plannedCapabilities: ['Budget-fit scoring', 'Availability match', 'Portfolio previews'],
        spanClass: 'md:col-span-4',
        accent: 'marigold',
      },
      {
        id: 'shortlist',
        title: 'Shortlist',
        subtitle: 'Side-by-side quote comparison, tasting notes, and package inclusions.',
        plannedCapabilities: ['Quote matrix', 'Site visit notes', 'Negotiation checklist'],
        spanClass: 'md:col-span-4',
        accent: 'blush',
      },
      {
        id: 'booked',
        title: 'Booked',
        subtitle: 'Confirmed partners with contract terms, point-of-contact details, and arrival schedules.',
        plannedCapabilities: ['Signed contracts', 'Advance paid status', 'Day-of call sheet'],
        spanClass: 'md:col-span-4',
        accent: 'maroon',
      },
    ],
  },
  {
    id: 'guests',
    label: 'Guests',
    heading: 'Guest & RSVP Hub',
    subheading:
      'Organize households, track real-time ceremony responses, and dispatch polished digital invites.',
    modules: [
      {
        id: 'guest-list',
        title: 'Guest List',
        subtitle: 'Searchable household directory with side tags, room needs, and meal preferences.',
        plannedCapabilities: ['CSV import', 'Household grouping', 'Dietary & travel flags'],
        spanClass: 'md:col-span-7',
        accent: 'maroon',
      },
      {
        id: 'rsvp-summary',
        title: 'RSVP Summary',
        subtitle: 'Per-function attendance breakdown so catering and seating stay exact.',
        plannedCapabilities: ['Function headcount', 'Plus-one tracking', 'Non-responder list'],
        spanClass: 'md:col-span-5',
        accent: 'marigold',
      },
      {
        id: 'send-invites',
        title: 'Send Invites',
        subtitle: 'WhatsApp & email invitation dispatch with scheduled polite RSVP follow-ups.',
        plannedCapabilities: ['Custom card preview', 'Batch dispatch', 'Automated nudge'],
        spanClass: 'md:col-span-12',
        accent: 'blush',
      },
    ],
  },
  {
    id: 'budget',
    label: 'Budget',
    heading: 'Budget & Cashflow',
    subheading:
      'Maintain total clarity across category allocations, logged invoices, and upcoming vendor installments.',
    modules: [
      {
        id: 'budget-split',
        title: 'Budget Split',
        subtitle: 'Recommended allocation across Venue, Catering, Decor, Attire, Photography, and Buffer.',
        plannedCapabilities: ['Interactive sliders', 'Contingency reserve', 'Per-guest cost'],
        spanClass: 'md:col-span-12',
        accent: 'marigold',
      },
      {
        id: 'expenses',
        title: 'Expenses',
        subtitle: 'Itemized ledger of vendor quotes, advances paid, and balance commitments.',
        plannedCapabilities: ['Receipt uploads', 'Category tagging', 'Variance alerts'],
        spanClass: 'md:col-span-7',
        accent: 'maroon',
      },
      {
        id: 'payments-due',
        title: 'Payments Due',
        subtitle: 'Chronological payment calendar highlighting upcoming vendor tranches.',
        plannedCapabilities: ['7-day & 30-day due', 'Mark paid toggle', 'Auto reminder sync'],
        spanClass: 'md:col-span-5',
        accent: 'blush',
      },
    ],
  },
  {
    id: 'shubh-ai',
    label: 'Shubh AI',
    heading: 'Shubh, Your AI Planner',
    subheading:
      'Ask questions about traditions, vendor trade-offs, or instantly replan your entire event when circumstances change.',
    modules: [
      {
        id: 'chat-with-shubh',
        title: 'Chat with Shubh',
        subtitle: 'Conversational planner grounded in your exact budget, guest count, city, and timeline.',
        plannedCapabilities: ['Context-aware advice', 'Draft vendor briefs', 'Checklist generation'],
        spanClass: 'md:col-span-7',
        accent: 'maroon',
      },
      {
        id: 'what-changed-replan',
        title: 'What Changed? Replan',
        subtitle: 'Enter a budget adjustment, guest surge, or new date to cascade updates across every tab.',
        plannedCapabilities: ['Guest count delta', 'Budget rebalance', 'One-click apply plan'],
        spanClass: 'md:col-span-5',
        accent: 'marigold',
      },
    ],
  },
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    title: 'Confirm floral moodboard with Marigold Decorators',
    dueLabel: 'Due in 2 days',
    category: 'Vendors',
    unread: true,
  },
  {
    id: 'rem-2',
    title: 'Second catering tasting tranche (25% advance)',
    dueLabel: 'Due in 5 days',
    category: 'Budget',
    unread: true,
  },
  {
    id: 'rem-3',
    title: 'Send gentle RSVP follow-up to 18 pending households',
    dueLabel: 'Scheduled for Friday',
    category: 'Guests',
    unread: false,
  },
];

export interface UserProfile {
  name: string;
  email: string;
}

export type BudgetCategoryName =
  | 'Venue'
  | 'Catering'
  | 'Decor'
  | 'Photography'
  | 'Attire & Jewellery'
  | 'Entertainment'
  | 'Invitations & Gifts'
  | 'Contingency';

export interface EventProfile {
  eventType: string;
  eventName: string;
  hosts: string;
  functions: string[];
  daysCount: number;
  date: string;
  city: string;
  venueType: string;
  budget: number;
  guestCount: number;
  style: string[];
  food: string;
  priorities: string[];
  notes: string;
  budgetSplit: Record<string, number>;
  createdAt: string;
}

export const WIZARD_EVENT_TYPES = [
  'Wedding',
  'Engagement',
  'Birthday',
  'Anniversary',
  'Corporate Offsite',
  'Baby Shower',
  'Other',
] as const;

export const WEDDING_FUNCTIONS = [
  'Haldi',
  'Mehendi',
  'Sangeet',
  'Wedding',
  'Reception',
] as const;

export const CITIES = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Jaipur',
  'Goa',
  'Udaipur',
  'Other',
] as const;

export const VENUE_TYPES = [
  'Banquet Hall',
  'Hotel',
  'Outdoor/Lawn',
  'Beach',
  'Heritage Property',
  'Home',
] as const;

export const STYLE_OPTIONS = [
  'Traditional',
  'Modern',
  'Minimal',
  'Royal',
  'Boho',
  'Destination',
] as const;

export const FOOD_OPTIONS = ['Veg', 'Non-veg', 'Both', 'Jain'] as const;

export const PRIORITY_OPTIONS = [
  'Venue',
  'Food',
  'Decor',
  'Photography',
  'Entertainment',
  'Attire',
  'Guest Experience',
] as const;

export const BUDGET_CATEGORIES: BudgetCategoryName[] = [
  'Venue',
  'Catering',
  'Decor',
  'Photography',
  'Attire & Jewellery',
  'Entertainment',
  'Invitations & Gifts',
  'Contingency',
];

export const BUDGET_CATEGORY_COLORS: Record<BudgetCategoryName, string> = {
  Venue: '#7A1F3D',
  Catering: '#E8A317',
  Decor: '#B84A62',
  Photography: '#D4812A',
  'Attire & Jewellery': '#9E3B56',
  Entertainment: '#F2BE4B',
  'Invitations & Gifts': '#E4A5B5',
  Contingency: '#6E5A60',
};

const BASE_SPLITS_BY_EVENT: Record<string, Record<BudgetCategoryName, number>> = {
  Wedding: {
    Venue: 25,
    Catering: 30,
    Decor: 12,
    Photography: 8,
    'Attire & Jewellery': 10,
    Entertainment: 5,
    'Invitations & Gifts': 4,
    Contingency: 6,
  },
  Engagement: {
    Venue: 26,
    Catering: 32,
    Decor: 14,
    Photography: 9,
    'Attire & Jewellery': 7,
    Entertainment: 4,
    'Invitations & Gifts': 3,
    Contingency: 5,
  },
  Birthday: {
    Venue: 24,
    Catering: 34,
    Decor: 14,
    Photography: 7,
    'Attire & Jewellery': 3,
    Entertainment: 10,
    'Invitations & Gifts': 3,
    Contingency: 5,
  },
  Anniversary: {
    Venue: 25,
    Catering: 32,
    Decor: 13,
    Photography: 9,
    'Attire & Jewellery': 6,
    Entertainment: 7,
    'Invitations & Gifts': 3,
    Contingency: 5,
  },
  'Corporate Offsite': {
    Venue: 32,
    Catering: 28,
    Decor: 8,
    Photography: 6,
    'Attire & Jewellery': 2,
    Entertainment: 12,
    'Invitations & Gifts': 4,
    Contingency: 8,
  },
  'Baby Shower': {
    Venue: 22,
    Catering: 32,
    Decor: 18,
    Photography: 9,
    'Attire & Jewellery': 5,
    Entertainment: 5,
    'Invitations & Gifts': 4,
    Contingency: 5,
  },
  Other: {
    Venue: 25,
    Catering: 30,
    Decor: 14,
    Photography: 8,
    'Attire & Jewellery': 5,
    Entertainment: 8,
    'Invitations & Gifts': 4,
    Contingency: 6,
  },
};

const PRIORITY_TO_CATEGORY: Record<string, BudgetCategoryName> = {
  Venue: 'Venue',
  Food: 'Catering',
  Decor: 'Decor',
  Photography: 'Photography',
  Entertainment: 'Entertainment',
  Attire: 'Attire & Jewellery',
  'Guest Experience': 'Invitations & Gifts',
};

export interface BudgetSplitResult {
  percentages: Record<BudgetCategoryName, number>;
  amounts: Record<BudgetCategoryName, number>;
  boostedCategories: BudgetCategoryName[];
}

export function calculateBudgetSplit(
  eventType: string,
  totalBudget: number,
  priorities: string[]
): BudgetSplitResult {
  const base =
    BASE_SPLITS_BY_EVENT[eventType] ?? BASE_SPLITS_BY_EVENT['Other'];
  const percentages: Record<BudgetCategoryName, number> = {...base};

  const boostedCategories = Array.from(
    new Set(
      priorities
        .slice(0, 3)
        .map((p) => PRIORITY_TO_CATEGORY[p])
        .filter((cat): cat is BudgetCategoryName => Boolean(cat))
    )
  );

  if (boostedCategories.length > 0) {
    const totalBoost = boostedCategories.length * 3;
    for (const cat of boostedCategories) {
      percentages[cat] += 3;
    }

    const nonBoosted = BUDGET_CATEGORIES.filter(
      (cat) => !boostedCategories.includes(cat)
    );

    let remainingToDeduct = totalBoost;
    let eligible = [...nonBoosted];

    while (remainingToDeduct > 0.0001 && eligible.length > 0) {
      const perCatShare = remainingToDeduct / eligible.length;
      let deductedThisRound = 0;
      const nextEligible: BudgetCategoryName[] = [];

      for (const cat of eligible) {
        const floor = 0.5;
        const available = Math.max(0, percentages[cat] - floor);
        const take = Math.min(available, perCatShare);
        percentages[cat] = Number((percentages[cat] - take).toFixed(4));
        deductedThisRound += take;
        if (percentages[cat] - floor > 0.001) {
          nextEligible.push(cat);
        }
      }

      remainingToDeduct -= deductedThisRound;
      if (deductedThisRound < 0.0001) break;
      eligible = nextEligible;
    }
  }

  // Round percentages nicely to 1 decimal while preserving exact 100% sum
  for (const cat of BUDGET_CATEGORIES) {
    percentages[cat] = Math.round(percentages[cat] * 10) / 10;
  }
  const pctSum = BUDGET_CATEGORIES.reduce((acc, c) => acc + percentages[c], 0);
  const pctDiff = Math.round((100 - pctSum) * 10) / 10;
  if (Math.abs(pctDiff) > 0) {
    percentages['Contingency'] = Math.round((percentages['Contingency'] + pctDiff) * 10) / 10;
  }

  // Compute exact INR rupee amounts summing to totalBudget
  const amounts = {} as Record<BudgetCategoryName, number>;
  let amountSum = 0;
  let largestCat: BudgetCategoryName = BUDGET_CATEGORIES[0];

  for (const cat of BUDGET_CATEGORIES) {
    const amt = Math.round((percentages[cat] / 100) * totalBudget);
    amounts[cat] = amt;
    amountSum += amt;
    if (amounts[cat] > amounts[largestCat]) {
      largestCat = cat;
    }
  }

  const rupeeDiff = totalBudget - amountSum;
  if (rupeeDiff !== 0) {
    amounts[largestCat] += rupeeDiff;
  }

  return {
    percentages,
    amounts,
    boostedCategories,
  };
}

export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDefaultFutureDateString(daysAhead = 120): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateDaysToGo(dateString: string): number {
  if (!dateString) return 0;
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return 0;
  const target = new Date(year, month - 1, day);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = target.getTime() - todayStart.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat('en-IN').format(Math.round(amount))}`;
}

