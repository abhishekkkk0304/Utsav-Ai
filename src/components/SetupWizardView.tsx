import {useMemo, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Flower2,
  MapPin,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import {
  BUDGET_CATEGORIES,
  BUDGET_CATEGORY_COLORS,
  CITIES,
  FOOD_OPTIONS,
  PRIORITY_OPTIONS,
  STYLE_OPTIONS,
  VENUE_TYPES,
  WEDDING_FUNCTIONS,
  WIZARD_EVENT_TYPES,
  calculateBudgetSplit,
  calculateDaysToGo,
  formatINR,
  getDefaultFutureDateString,
  getTomorrowDateString,
  type BudgetCategoryName,
  type EventProfile,
  type UserProfile,
} from '../data/utsavData';

interface SetupWizardViewProps {
  userProfile: UserProfile;
  initialEventType?: string;
  initialProfile?: EventProfile | null;
  onCompleteWizard: (profile: EventProfile) => void;
  onCancelEdit?: () => void;
}

const STEP_LABELS = [
  'The Event',
  'When & Where',
  'Budget & Guests',
  'Preferences',
];

export function SetupWizardView({
  userProfile,
  initialEventType,
  initialProfile,
  onCompleteWizard,
  onCancelEdit,
}: SetupWizardViewProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 'summary'>(1);

  // Step 1 state
  const [eventType, setEventType] = useState<string>(
    initialProfile?.eventType || initialEventType || 'Wedding'
  );
  const [eventName, setEventName] = useState<string>(
    initialProfile?.eventName || "Aarav & Meera's Wedding"
  );
  const [hosts, setHosts] = useState<string>(
    initialProfile?.hosts || `${userProfile.name} & Family`
  );
  const [daysCount, setDaysCount] = useState<number>(
    initialProfile?.daysCount ?? (eventType === 'Wedding' ? 3 : 1)
  );
  const [functions, setFunctions] = useState<string[]>(
    initialProfile?.functions?.length
      ? initialProfile.functions
      : ['Haldi', 'Mehendi', 'Sangeet', 'Wedding', 'Reception']
  );

  // Step 2 state
  const tomorrowMin = useMemo(() => getTomorrowDateString(), []);
  const [date, setDate] = useState<string>(
    initialProfile?.date || getDefaultFutureDateString(124)
  );
  const [city, setCity] = useState<string>(initialProfile?.city || 'Mumbai');
  const [venueType, setVenueType] = useState<string>(
    initialProfile?.venueType || 'Hotel'
  );

  // Step 3 state
  const [budget, setBudget] = useState<number>(
    initialProfile?.budget ?? 1500000
  );
  const [guestCount, setGuestCount] = useState<number>(
    initialProfile?.guestCount ?? 220
  );

  // Step 4 state
  const [style, setStyle] = useState<string[]>(
    initialProfile?.style?.length ? initialProfile.style : ['Traditional']
  );
  const [food, setFood] = useState<string>(initialProfile?.food || 'Both');
  const [priorities, setPriorities] = useState<string[]>(
    initialProfile?.priorities?.length
      ? initialProfile.priorities
      : ['Venue', 'Food', 'Photography']
  );
  const [notes, setNotes] = useState<string>(initialProfile?.notes || '');

  // Validation error & hovered donut slice
  const [stepError, setStepError] = useState<string>('');
  const [hoveredCategory, setHoveredCategory] =
    useState<BudgetCategoryName | null>(null);

  const liveDaysToGo = calculateDaysToGo(date);
  const isDateInFuture = Boolean(date && date >= tomorrowMin);
  const budgetPerGuest = guestCount > 0 ? Math.round(budget / guestCount) : 0;

  const budgetSplitResult = useMemo(
    () => calculateBudgetSplit(eventType, budget, priorities),
    [eventType, budget, priorities]
  );

  const handleSelectEventType = (selected: string) => {
    setEventType(selected);
    if (selected === 'Wedding') {
      const hasWeddingFn = functions.some((fn) =>
        (WEDDING_FUNCTIONS as readonly string[]).includes(fn)
      );
      if (!hasWeddingFn) {
        setFunctions(['Haldi', 'Mehendi', 'Sangeet', 'Wedding', 'Reception']);
      }
      if (!initialProfile) {
        setDaysCount(3);
        if (eventName.endsWith('Celebration') || eventName.includes('Wedding')) {
          setEventName("Aarav & Meera's Wedding");
        }
      }
    } else if (!initialProfile) {
      setDaysCount(1);
      setFunctions([selected]);
      setEventName(`${userProfile.name.split(' ')[0]}'s ${selected}`);
    }
  };

  const toggleFunction = (fnName: string) => {
    setFunctions((prev) =>
      prev.includes(fnName)
        ? prev.filter((item) => item !== fnName)
        : [...prev, fnName]
    );
  };

  const toggleStyle = (styleName: string) => {
    setStyle((prev) =>
      prev.includes(styleName)
        ? prev.filter((item) => item !== styleName)
        : [...prev, styleName]
    );
  };

  const togglePriority = (priorityName: string) => {
    setPriorities((prev) => {
      if (prev.includes(priorityName)) {
        return prev.filter((item) => item !== priorityName);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), priorityName];
      }
      return [...prev, priorityName];
    });
  };

  const handleNext = () => {
    setStepError('');

    if (step === 1) {
      if (!eventName.trim()) {
        setStepError('Please enter an event name so Shubh can title your workspace.');
        return;
      }
      if (!hosts.trim()) {
        setStepError('Please enter at least one host name.');
        return;
      }
      if (eventType === 'Wedding' && functions.length === 0) {
        setStepError('Select at least one wedding function.');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!date || !isDateInFuture) {
        setStepError('Please choose an event date in the future.');
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (budget < 50000 || budget > 10000000) {
        setStepError('Budget must be between ₹50,000 and ₹1,00,00,000.');
        return;
      }
      if (guestCount < 10 || guestCount > 2000) {
        setStepError('Guest count must be between 10 and 2,000.');
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      if (priorities.length !== 3) {
        setStepError('Please pick your top 3 priorities so Shubh can weight your budget split.');
        return;
      }
      setStep('summary');
    }
  };

  const handleBack = () => {
    setStepError('');
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 'summary') setStep(4);
  };

  const handleGeneratePlan = () => {
    const finalFunctions =
      eventType === 'Wedding'
        ? functions
        : functions.length > 0
          ? functions
          : [eventType];

    const profile: EventProfile = {
      eventType,
      eventName: eventName.trim(),
      hosts: hosts.trim(),
      functions: finalFunctions,
      daysCount,
      date,
      city,
      venueType,
      budget,
      guestCount,
      style: style.length > 0 ? style : ['Traditional'],
      food,
      priorities,
      notes: notes.trim(),
      budgetSplit: budgetSplitResult.amounts,
      createdAt: initialProfile?.createdAt || new Date().toISOString(),
    };
    onCompleteWizard(profile);
  };

  // Pure SVG Donut Chart geometry
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  let cumulativeFraction = 0;

  const donutSegments = BUDGET_CATEGORIES.map((category) => {
    const pct = budgetSplitResult.percentages[category];
    const fraction = pct / 100;
    const strokeLength = fraction * circumference;
    const dashOffset = -cumulativeFraction * circumference;
    cumulativeFraction += fraction;

    return {
      category,
      pct,
      amount: budgetSplitResult.amounts[category],
      color: BUDGET_CATEGORY_COLORS[category],
      strokeLength,
      dashOffset,
      isBoosted: budgetSplitResult.boostedCategories.includes(category),
    };
  });

  const numericStep = step === 'summary' ? 4 : step;
  const progressPercent = step === 'summary' ? 100 : (numericStep / 4) * 100;

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#2B2024] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Wizard Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[#F8E1E7] flex items-center justify-center border border-[#7A1F3D]/15">
              <Flower2 className="w-4 h-4 text-[#7A1F3D]" aria-hidden="true" />
            </span>
            <div>
              <span className="font-display text-xl font-bold text-[#2B2024]">
                Utsav AI
              </span>
              <p className="text-xs text-[#2B2024]/65">
                Welcome, {userProfile.name}
              </p>
            </div>
          </div>

          {onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#7A1F3D]/20 bg-white text-xs font-semibold text-[#2B2024] hover:border-[#7A1F3D]/40 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Dashboard</span>
            </button>
          )}
        </header>

        {/* 4-Step Progress Bar */}
        <div className="utsav-card p-5 sm:p-6 mb-6 border border-[#7A1F3D]/10">
          <div className="flex items-center justify-between text-xs font-semibold text-[#7A1F3D] mb-3">
            <span>
              {step === 'summary'
                ? 'Plan Summary & Budget Split'
                : `Step ${numericStep} of 4 · ${STEP_LABELS[numericStep - 1]}`}
            </span>
            <span className="tabular-nums">{Math.round(progressPercent)}% complete</span>
          </div>

          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 w-full rounded-full bg-[#F8E1E7] overflow-hidden"
          >
            <div
              className="h-full bg-[#7A1F3D] rounded-full transition-all duration-300"
              style={{width: `${progressPercent}%`}}
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {STEP_LABELS.map((label, idx) => {
              const stepNum = (idx + 1) as 1 | 2 | 3 | 4;
              const isCompleted = step === 'summary' || numericStep > stepNum;
              const isCurrent = step !== 'summary' && numericStep === stepNum;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (isCompleted || initialProfile) {
                      setStepError('');
                      setStep(stepNum);
                    }
                  }}
                  disabled={!isCompleted && !initialProfile && !isCurrent}
                  className={`text-left text-xs font-medium py-1.5 px-2 rounded-lg transition-colors truncate ${
                    isCurrent
                      ? 'text-[#7A1F3D] font-semibold bg-[#F8E1E7]/60'
                      : isCompleted
                        ? 'text-[#2B2024] hover:bg-[#FFFBF5] cursor-pointer'
                        : 'text-[#2B2024]/45 cursor-default'
                  }`}
                >
                  <span className="tabular-nums mr-1">0{stepNum}.</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content Card */}
        <main className="utsav-card p-6 sm:p-9 border border-[#7A1F3D]/10">
          {/* STEP 1: THE EVENT */}
          {step === 1 && (
            <div className="space-y-7">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2B2024]">
                  Tell Shubh about your celebration
                </h1>
                <p className="mt-1.5 text-sm text-[#2B2024]/70">
                  Choose the occasion, name your workspace, and tell us who is hosting.
                </p>
              </div>

              {/* Event Type Cards */}
              <div>
                <span className="block text-xs font-semibold text-[#2B2024] mb-3">
                  Event Type
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {WIZARD_EVENT_TYPES.map((typeOption) => {
                    const active = eventType === typeOption;
                    return (
                      <button
                        key={typeOption}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleSelectEventType(typeOption)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                          active
                            ? 'bg-[#7A1F3D] border-[#7A1F3D] text-[#FFFBF5] shadow-sm'
                            : 'bg-[#FFFBF5] border-[#7A1F3D]/15 text-[#2B2024] hover:border-[#7A1F3D]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{typeOption}</span>
                          {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Name & Hosts */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="wizard-event-name"
                    className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                  >
                    Event Name
                  </label>
                  <input
                    id="wizard-event-name"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Aarav & Meera's Wedding"
                    className="w-full rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] px-4 py-2.5 text-sm text-[#2B2024] focus:outline-2 focus:outline-[#7A1F3D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wizard-hosts"
                    className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                  >
                    Host Names
                  </label>
                  <input
                    id="wizard-hosts"
                    type="text"
                    value={hosts}
                    onChange={(e) => setHosts(e.target.value)}
                    placeholder="e.g. Sharma & Kapoor Families"
                    className="w-full rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] px-4 py-2.5 text-sm text-[#2B2024] focus:outline-2 focus:outline-[#7A1F3D]"
                  />
                </div>
              </div>

              {/* Number of Days / Functions */}
              <div className="grid sm:grid-cols-12 gap-5 items-start">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="wizard-days"
                    className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                  >
                    Number of Days / Functions
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDaysCount((d) => Math.max(1, d - 1))}
                      aria-label="Decrease days"
                      className="w-10 h-10 rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] text-base font-semibold hover:bg-[#F8E1E7]/50 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      id="wizard-days"
                      type="number"
                      min={1}
                      max={10}
                      value={daysCount}
                      onChange={(e) =>
                        setDaysCount(Math.max(1, Math.min(10, Number(e.target.value) || 1)))
                      }
                      className="w-20 text-center rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] py-2 text-sm font-semibold tabular-nums focus:outline-2 focus:outline-[#7A1F3D]"
                    />
                    <button
                      type="button"
                      onClick={() => setDaysCount((d) => Math.min(10, d + 1))}
                      aria-label="Increase days"
                      className="w-10 h-10 rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] text-base font-semibold hover:bg-[#F8E1E7]/50 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {eventType === 'Wedding' && (
                  <div className="sm:col-span-8">
                    <span className="block text-xs font-semibold text-[#2B2024] mb-2">
                      Wedding Functions
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {WEDDING_FUNCTIONS.map((fn) => {
                        const selected = functions.includes(fn);
                        return (
                          <button
                            key={fn}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleFunction(fn)}
                            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                              selected
                                ? 'bg-[#E8A317] text-[#2B2024] font-semibold'
                                : 'bg-[#FFFBF5] border border-[#7A1F3D]/15 text-[#2B2024] hover:bg-[#F8E1E7]/45'
                            }`}
                          >
                            {fn}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: WHEN & WHERE */}
          {step === 2 && (
            <div className="space-y-7">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2B2024]">
                  When &amp; where are you celebrating?
                </h1>
                <p className="mt-1.5 text-sm text-[#2B2024]/70">
                  Your target date powers live countdown milestones and vendor availability pacing.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Future Event Date + Live D-[days] to go */}
                <div>
                  <label
                    htmlFor="wizard-date"
                    className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                  >
                    Event Date (must be in the future)
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      id="wizard-date"
                      type="date"
                      min={tomorrowMin}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="flex-1 min-w-[180px] rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] px-4 py-2.5 text-sm text-[#2B2024] tabular-nums focus:outline-2 focus:outline-[#7A1F3D]"
                    />
                    {isDateInFuture ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F8E1E7] text-[#7A1F3D] text-xs font-semibold tabular-nums whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        D-{liveDaysToGo} to go
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-[#7A1F3D]">
                        Pick a future date
                      </span>
                    )}
                  </div>
                </div>

                {/* City Dropdown */}
                <div>
                  <label
                    htmlFor="wizard-city"
                    className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                  >
                    City
                  </label>
                  <div className="relative">
                    <select
                      id="wizard-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] px-4 py-2.5 text-sm text-[#2B2024] focus:outline-2 focus:outline-[#7A1F3D]"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Venue Type Preference */}
              <div>
                <span className="block text-xs font-semibold text-[#2B2024] mb-3">
                  Venue Type Preference
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {VENUE_TYPES.map((vt) => {
                    const active = venueType === vt;
                    return (
                      <button
                        key={vt}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setVenueType(vt)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          active
                            ? 'bg-[#7A1F3D] border-[#7A1F3D] text-[#FFFBF5]'
                            : 'bg-[#FFFBF5] border-[#7A1F3D]/15 text-[#2B2024] hover:border-[#7A1F3D]/40'
                        }`}
                      >
                        <span className="text-sm font-medium">{vt}</span>
                        {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET & GUESTS */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2B2024]">
                  Set your budget &amp; expected guest count
                </h1>
                <p className="mt-1.5 text-sm text-[#2B2024]/70">
                  Shubh guards every category allocation and calculates per-guest headroom live.
                </p>
              </div>

              {/* Total Budget Slider + Number Input */}
              <div className="rounded-2xl bg-[#FFFBF5] border border-[#7A1F3D]/12 p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label
                    htmlFor="wizard-budget-number"
                    className="text-sm font-semibold text-[#2B2024]"
                  >
                    Total Budget (INR)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#7A1F3D]">₹</span>
                    <input
                      id="wizard-budget-number"
                      type="number"
                      min={50000}
                      max={10000000}
                      step={25000}
                      value={budget}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!Number.isNaN(val)) setBudget(val);
                      }}
                      onBlur={() =>
                        setBudget((b) => Math.max(50000, Math.min(10000000, b)))
                      }
                      className="w-36 rounded-xl border border-[#7A1F3D]/20 bg-white px-3 py-2 text-sm font-semibold text-right tabular-nums focus:outline-2 focus:outline-[#7A1F3D]"
                    />
                  </div>
                </div>

                <input
                  aria-label="Total budget slider"
                  type="range"
                  min={50000}
                  max={10000000}
                  step={25000}
                  value={Math.max(50000, Math.min(10000000, budget))}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[#7A1F3D] cursor-pointer"
                />

                <div className="flex items-center justify-between text-xs text-[#2B2024]/65 tabular-nums">
                  <span>₹50,000</span>
                  <span className="font-semibold text-[#7A1F3D] text-sm">
                    {formatINR(budget)}
                  </span>
                  <span>₹1,00,00,000 (1 Cr)</span>
                </div>
              </div>

              {/* Expected Guest Count Slider + Number Input */}
              <div className="rounded-2xl bg-[#FFFBF5] border border-[#7A1F3D]/12 p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label
                    htmlFor="wizard-guests-number"
                    className="text-sm font-semibold text-[#2B2024]"
                  >
                    Expected Guest Count
                  </label>
                  <input
                    id="wizard-guests-number"
                    type="number"
                    min={10}
                    max={2000}
                    value={guestCount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) setGuestCount(val);
                    }}
                    onBlur={() =>
                      setGuestCount((g) => Math.max(10, Math.min(2000, g)))
                    }
                    className="w-28 rounded-xl border border-[#7A1F3D]/20 bg-white px-3 py-2 text-sm font-semibold text-right tabular-nums focus:outline-2 focus:outline-[#7A1F3D]"
                  />
                </div>

                <input
                  aria-label="Expected guest count slider"
                  type="range"
                  min={10}
                  max={2000}
                  step={5}
                  value={Math.max(10, Math.min(2000, guestCount))}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#E8A317] cursor-pointer"
                />

                <div className="flex items-center justify-between text-xs text-[#2B2024]/65 tabular-nums">
                  <span>10 guests</span>
                  <span className="font-semibold text-[#2B2024] text-sm">
                    {guestCount} guests
                  </span>
                  <span>2,000 guests</span>
                </div>
              </div>

              {/* Live Budget Per Guest Readout */}
              <div className="rounded-2xl bg-[#F8E1E7]/55 border border-[#7A1F3D]/15 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-medium text-[#7A1F3D]">
                  Live per-guest benchmark
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-[#2B2024] tabular-nums">
                  Budget per guest: {formatINR(budgetPerGuest)}
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: PREFERENCES */}
          {step === 4 && (
            <div className="space-y-7">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2B2024]">
                  Aesthetic, food &amp; top 3 priorities
                </h1>
                <p className="mt-1.5 text-sm text-[#2B2024]/70">
                  Pick your top 3 priorities—Shubh automatically shifts +3% budget allocation toward each one.
                </p>
              </div>

              {/* Style Chips */}
              <div>
                <span className="block text-xs font-semibold text-[#2B2024] mb-2.5">
                  Celebration Style
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {STYLE_OPTIONS.map((opt) => {
                    const active = style.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleStyle(opt)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#E8A317] text-[#2B2024] font-semibold'
                            : 'bg-[#FFFBF5] border border-[#7A1F3D]/15 text-[#2B2024] hover:bg-[#F8E1E7]/45'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Food Preference */}
              <div>
                <span className="block text-xs font-semibold text-[#2B2024] mb-2.5">
                  Food Preference
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FOOD_OPTIONS.map((opt) => {
                    const active = food === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setFood(opt)}
                        className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#7A1F3D] border-[#7A1F3D] text-[#FFFBF5]'
                            : 'bg-[#FFFBF5] border-[#7A1F3D]/15 text-[#2B2024] hover:border-[#7A1F3D]/40'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Top 3 Priority Ranking */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-semibold text-[#2B2024]">
                    Priority Ranking (Pick your top 3)
                  </span>
                  <span className="text-xs font-semibold text-[#7A1F3D] tabular-nums">
                    {priorities.length}/3 selected
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PRIORITY_OPTIONS.map((opt) => {
                    const rankIndex = priorities.indexOf(opt);
                    const isPicked = rankIndex !== -1;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={isPicked}
                        onClick={() => togglePriority(opt)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isPicked
                            ? 'bg-[#F8E1E7]/75 border-[#7A1F3D] text-[#7A1F3D] font-semibold'
                            : 'bg-[#FFFBF5] border-[#7A1F3D]/15 text-[#2B2024] hover:border-[#7A1F3D]/35'
                        }`}
                      >
                        <span className="text-sm">{opt}</span>
                        {isPicked && (
                          <span className="w-5 h-5 rounded-full bg-[#7A1F3D] text-[#FFFBF5] text-xs font-bold flex items-center justify-center tabular-nums shrink-0">
                            {rankIndex + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="wizard-notes"
                  className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                >
                  Anything else Shubh should know?
                </label>
                <textarea
                  id="wizard-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Elderly guests need ground-floor access, morning pheras preferred, acoustic live band for sangeet..."
                  className="w-full rounded-xl border border-[#7A1F3D]/20 bg-[#FFFBF5] px-4 py-3 text-sm text-[#2B2024] focus:outline-2 focus:outline-[#7A1F3D]"
                />
              </div>
            </div>
          )}

          {/* SUMMARY & SVG DONUT CHART SCREEN */}
          {step === 'summary' && (
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold text-[#7A1F3D] mb-1">
                  Shubh Plan Blueprint Ready
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#2B2024]">
                  {eventName}
                </h1>
                <p className="mt-1 text-sm text-[#2B2024]/70">
                  Review your celebration profile and priority-weighted budget split before opening your workspace.
                </p>
              </div>

              {/* Input Summary Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl bg-[#FFFBF5] border border-[#7A1F3D]/12 p-5 text-sm">
                <div>
                  <span className="text-xs text-[#2B2024]/60 block">Event &amp; Hosts</span>
                  <span className="font-semibold text-[#2B2024]">
                    {eventType} · {hosts}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#2B2024]/60 block">Date &amp; Countdown</span>
                  <span className="font-semibold text-[#7A1F3D] tabular-nums">
                    {date} (D-{liveDaysToGo} to go)
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#2B2024]/60 block">City &amp; Venue</span>
                  <span className="font-semibold text-[#2B2024] inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7A1F3D]" aria-hidden="true" />
                    {city} · {venueType}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#2B2024]/60 block">Budget &amp; Guests</span>
                  <span className="font-semibold text-[#2B2024] tabular-nums inline-flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 text-[#7A1F3D]" aria-hidden="true" />
                    {formatINR(budget)} · {guestCount} guests ({formatINR(budgetPerGuest)}/guest)
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#2B2024]/60 block">Style &amp; Food</span>
                  <span className="font-semibold text-[#2B2024]">
                    {(style.length ? style : ['Traditional']).join(', ')} · {food}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#2B2024]/60 block">Top 3 Priorities (+3% each)</span>
                  <span className="font-semibold text-[#7A1F3D]">
                    {priorities.join(' · ')}
                  </span>
                </div>
                {eventType === 'Wedding' && functions.length > 0 && (
                  <div className="sm:col-span-2 lg:col-span-3 pt-2 border-t border-[#7A1F3D]/10">
                    <span className="text-xs text-[#2B2024]/60 block">
                      Functions ({daysCount} days)
                    </span>
                    <span className="font-medium text-[#2B2024]">
                      {functions.join(' · ')}
                    </span>
                  </div>
                )}
                {notes.trim() && (
                  <div className="sm:col-span-2 lg:col-span-3 pt-2 border-t border-[#7A1F3D]/10">
                    <span className="text-xs text-[#2B2024]/60 block">Notes for Shubh</span>
                    <span className="text-[#2B2024]/85">{notes}</span>
                  </div>
                )}
              </div>

              {/* SVG Donut Chart + Budget Split Legend */}
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-56 h-56">
                    <svg
                      viewBox="0 0 220 220"
                      className="w-full h-full -rotate-90"
                      role="img"
                      aria-label="Budget split donut chart"
                    >
                      <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        fill="transparent"
                        stroke="#F8E1E7"
                        strokeWidth="28"
                      />
                      {donutSegments.map((seg) => {
                        const isHighlighted = hoveredCategory === seg.category;
                        return (
                          <circle
                            key={seg.category}
                            cx="110"
                            cy="110"
                            r={radius}
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth={isHighlighted ? '33' : '28'}
                            strokeDasharray={`${seg.strokeLength} ${circumference}`}
                            strokeDashoffset={seg.dashOffset}
                            className="transition-all duration-150 cursor-pointer"
                            onMouseEnter={() => setHoveredCategory(seg.category)}
                            onMouseLeave={() => setHoveredCategory(null)}
                          />
                        );
                      })}
                    </svg>

                    {/* Center Total Readout */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                      <span className="text-[11px] font-medium text-[#2B2024]/65">
                        {hoveredCategory ? hoveredCategory : 'Total Budget'}
                      </span>
                      <span className="font-display text-lg font-bold text-[#2B2024] tabular-nums mt-0.5">
                        {hoveredCategory
                          ? formatINR(budgetSplitResult.amounts[hoveredCategory])
                          : formatINR(budget)}
                      </span>
                      {hoveredCategory && (
                        <span className="text-xs font-semibold text-[#7A1F3D] tabular-nums">
                          {budgetSplitResult.percentages[hoveredCategory]}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-2.5">
                  {donutSegments.map((seg) => (
                    <div
                      key={seg.category}
                      onMouseEnter={() => setHoveredCategory(seg.category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border transition-colors ${
                        hoveredCategory === seg.category
                          ? 'bg-[#FFFBF5] border-[#7A1F3D]/30'
                          : 'bg-white border-[#7A1F3D]/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{backgroundColor: seg.color}}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-[#2B2024] truncate">
                          {seg.category}
                        </span>
                        {seg.isBoosted && (
                          <span className="text-[11px] font-semibold text-[#7A1F3D] whitespace-nowrap">
                            +3% Priority
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 shrink-0 tabular-nums text-sm">
                        <span className="text-[#2B2024]/65 w-12 text-right">
                          {seg.pct.toFixed(1)}%
                        </span>
                        <span className="font-semibold text-[#2B2024] w-28 text-right">
                          {formatINR(seg.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Feedback */}
          {stepError && (
            <p
              role="alert"
              className="mt-6 rounded-xl bg-[#F8E1E7]/70 border border-[#7A1F3D]/25 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#7A1F3D]"
            >
              {stepError}
            </p>
          )}

          {/* Wizard Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-[#7A1F3D]/12 flex items-center justify-between gap-4">
            {step !== 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#7A1F3D]/20 bg-white text-sm font-semibold text-[#2B2024] hover:bg-[#FFFBF5] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>{step === 'summary' ? 'Back to Preferences' : 'Back'}</span>
              </button>
            ) : (
              <div className="text-xs text-[#2B2024]/60 inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#7A1F3D]" aria-hidden="true" />
                <span>Saved locally in your browser</span>
              </div>
            )}

            {step !== 'summary' ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7A1F3D] text-[#FFFBF5] text-sm font-semibold hover:bg-[#621730] transition-colors cursor-pointer"
              >
                <span>{step === 4 ? 'Review Budget Split' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGeneratePlan}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8A317] text-[#2B2024] text-sm sm:text-base font-semibold hover:bg-[#d69510] transition-colors shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Generate My Plan</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
