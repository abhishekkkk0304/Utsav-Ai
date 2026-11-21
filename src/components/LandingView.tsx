import {useState} from 'react';
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  Check,
  ChevronRight,
  Flower2,
  Menu,
  RefreshCw,
  Store,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import {
  EVENT_TYPES,
  FEATURES,
  HERO_IMAGE_PATH,
  HOW_IT_WORKS_STEPS,
  PRICING_TIERS,
  TESTIMONIALS,
  type EventTypeOption,
  type FeatureItem,
} from '../data/utsavData';
import {FadeInSection} from './FadeInSection';
import {ResilientImage} from './ResilientImage';

interface LandingViewProps {
  selectedEventType: EventTypeOption;
  onSelectEventType: (eventType: EventTypeOption) => void;
  onStartPlanning: (eventType?: EventTypeOption) => void;
}

function FeatureIcon({iconName}: {iconName: FeatureItem['iconName']}) {
  const iconClass = 'w-5 h-5 text-[#7A1F3D]';
  switch (iconName) {
    case 'calendar-clock':
      return <CalendarClock className={iconClass} aria-hidden="true" />;
    case 'store':
      return <Store className={iconClass} aria-hidden="true" />;
    case 'users':
      return <Users className={iconClass} aria-hidden="true" />;
    case 'wallet':
      return <Wallet className={iconClass} aria-hidden="true" />;
    case 'bell-ring':
      return <BellRing className={iconClass} aria-hidden="true" />;
    case 'refresh-cw':
      return <RefreshCw className={iconClass} aria-hidden="true" />;
  }
}

export function LandingView({
  selectedEventType,
  onSelectEventType,
  onStartPlanning,
}: LandingViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#2B2024] selection:bg-[#F8E1E7] selection:text-[#7A1F3D]">
      {/* Sticky Navbar — 3-Zone Contract + Mobile Hamburger */}
      <header className="sticky top-0 z-40 bg-[#FFFBF5]/92 backdrop-blur-md border-b border-[#7A1F3D]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A1F3D] rounded-md"
          >
            <span className="w-8 h-8 rounded-full bg-[#F8E1E7] flex items-center justify-center border border-[#7A1F3D]/15">
              <Flower2 className="w-4 h-4 text-[#7A1F3D]" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-[#2B2024]">
              Utsav AI
            </span>
          </a>

          {/* Zone 2: Single-line Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2B2024]/80"
          >
            <a
              href="#features"
              className="whitespace-nowrap shrink-0 hover:text-[#7A1F3D] transition-colors duration-150 underline-offset-4 hover:underline"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="whitespace-nowrap shrink-0 hover:text-[#7A1F3D] transition-colors duration-150 underline-offset-4 hover:underline"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="whitespace-nowrap shrink-0 hover:text-[#7A1F3D] transition-colors duration-150 underline-offset-4 hover:underline"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="whitespace-nowrap shrink-0 hover:text-[#7A1F3D] transition-colors duration-150 underline-offset-4 hover:underline"
            >
              Stories
            </a>
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onStartPlanning()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1F3D] text-[#FFFBF5] text-sm font-semibold hover:bg-[#621730] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
            >
              Start Planning
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#7A1F3D]/15 bg-white text-[#2B2024] hover:bg-[#F8E1E7]/50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#7A1F3D]/10 bg-[#FFFBF5] px-4 py-4 space-y-2 shadow-lg">
            <a
              href="#features"
              onClick={handleNavClick}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2B2024] hover:bg-[#F8E1E7]/50"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={handleNavClick}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2B2024] hover:bg-[#F8E1E7]/50"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={handleNavClick}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2B2024] hover:bg-[#F8E1E7]/50"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={handleNavClick}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2B2024] hover:bg-[#F8E1E7]/50"
            >
              Stories
            </a>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartPlanning();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7A1F3D] text-[#FFFBF5] text-sm font-semibold hover:bg-[#621730] transition-colors cursor-pointer"
              >
                Start Planning
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* Full-Viewport Hero Section with Subtle Floral & Confetti Motif */}
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center py-12 lg:py-16">
          {/* Subtle Botanical & Celebration Confetti Motif */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <svg
              className="absolute -top-16 -right-16 w-[440px] h-[440px] text-[#E8A317]/15"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" />
              <circle cx="100" cy="100" r="54" stroke="#7A1F3D" strokeOpacity="0.14" strokeWidth="0.75" />
              <path
                d="M100 20C108 48 128 60 156 54C138 78 138 102 156 126C128 120 108 132 100 160C92 132 72 120 44 126C62 102 62 78 44 54C72 60 92 48 100 20Z"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <svg
              className="absolute -bottom-20 -left-20 w-[360px] h-[360px] text-[#7A1F3D]/10"
              viewBox="0 0 200 200"
              fill="none"
            >
              <path
                d="M100 28C114 58 142 74 172 74C148 96 144 126 160 154C130 144 108 154 100 180C92 154 70 144 40 154C56 126 52 96 28 74C58 74 86 58 100 28Z"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            {/* Delicate geometric marigold & blush petals */}
            <span className="absolute top-24 left-[12%] w-2.5 h-2.5 rotate-45 rounded-[2px] bg-[#E8A317]/35" />
            <span className="absolute top-44 left-[44%] w-2 h-3 rotate-12 rounded-full bg-[#F8E1E7]" />
            <span className="absolute bottom-28 left-[22%] w-3 h-1.5 -rotate-25 rounded-full bg-[#7A1F3D]/25" />
            <span className="absolute bottom-36 right-[46%] w-2 h-2 rotate-45 rounded-[2px] bg-[#E8A317]/40" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Narrative Column */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#7A1F3D] mb-4">
                  AI Celebration Architecture · Guided by Shubh
                </p>

                <h1 className="font-display text-[clamp(2.35rem,4.3vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[#2B2024] text-balance">
                  Plan Your Perfect Event with AI
                </h1>

                <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#2B2024]/80 max-w-[52ch]">
                  Enter your budget, guests and date. Shubh, your AI planner, handles the rest.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onStartPlanning()}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#7A1F3D] text-[#FFFBF5] text-sm sm:text-base font-semibold hover:bg-[#621730] transition-all duration-150 shadow-[0_6px_20px_rgba(122,31,61,0.22)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
                  >
                    Start Planning
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#7A1F3D]/20 text-[#2B2024] text-sm sm:text-base font-semibold hover:bg-[#F8E1E7]/45 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
                  >
                    See How It Works
                  </a>
                </div>

                {/* Unboxed Celebration Scope Metadata */}
                <div className="mt-8 pt-6 border-t border-[#7A1F3D]/12 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#2B2024]/70">
                  <span>Smart Timelines</span>
                  <span aria-hidden="true">·</span>
                  <span>Budget Guardrails</span>
                  <span aria-hidden="true">·</span>
                  <span>Multi-Ceremony RSVPs</span>
                  <span aria-hidden="true">·</span>
                  <span>Instant Replanning</span>
                </div>
              </div>

              {/* Right Editorial Visual Column */}
              <div className="lg:col-span-6 flex">
                <div className="utsav-card p-3 w-full flex flex-col">
                  <div className="relative overflow-hidden rounded-[12px] flex-1 min-h-[300px] sm:min-h-[380px]">
                    <ResilientImage
                      src={HERO_IMAGE_PATH}
                      alt="Courtyard evening celebration decorated with cascading marigold garlands, blush floral centerpieces, and warm brass candle lanterns"
                      fallbackLabel="Marigold & Ivory Courtyard Celebration"
                      className="w-full h-full lg:h-full object-cover"
                    />
                  </div>
                  <div className="pt-3 px-2 pb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-[#2B2024]/70">
                    <span className="font-medium text-[#2B2024]">
                      {selectedEventType.sampleTitle}
                    </span>
                    <span className="tabular-nums">
                      D-{selectedEventType.daysToGo} · {selectedEventType.guestCount} guests · {selectedEventType.budgetDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event-Type Selector Chips */}
        <section
          aria-label="Event types"
          className="py-10 border-y border-[#7A1F3D]/10 bg-white/70"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#2B2024]">
                  Tailored to every milestone you host
                </h2>
                <p className="text-sm text-[#2B2024]/70 mt-1">
                  Select a celebration type to preview its workspace or launch planning immediately.
                </p>
              </div>

              <div
                role="group"
                aria-label="Choose celebration type"
                className="flex flex-wrap items-center gap-2.5"
              >
                {EVENT_TYPES.map((evt) => {
                  const active = evt.id === selectedEventType.id;
                  return (
                    <button
                      key={evt.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onSelectEventType(evt)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D] ${
                        active
                          ? 'bg-[#E8A317] text-[#2B2024] font-semibold shadow-sm'
                          : 'bg-[#FFFBF5] text-[#2B2024] border border-[#7A1F3D]/15 hover:border-[#7A1F3D]/35 hover:bg-[#F8E1E7]/40'
                      }`}
                    >
                      {evt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Selection Preview Bar */}
            <div className="mt-6 rounded-2xl bg-[#FFFBF5] border border-[#7A1F3D]/12 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="font-display font-semibold text-[#7A1F3D]">
                  {selectedEventType.sampleTitle}
                </span>
                <span aria-hidden="true" className="text-[#2B2024]/30 hidden sm:inline">
                  ·
                </span>
                <span className="text-[#2B2024]/75 tabular-nums">
                  {selectedEventType.guestCount} guests
                </span>
                <span aria-hidden="true" className="text-[#2B2024]/30">
                  ·
                </span>
                <span className="text-[#2B2024]/75 tabular-nums">
                  Target budget {selectedEventType.budgetDisplay}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onStartPlanning(selectedEventType)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A1F3D] hover:text-[#621730] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Open {selectedEventType.label} Workspace
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 6 Feature Cards Section */}
        <section id="features" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-[#7A1F3D] mb-2">
                  Core Capabilities
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2024] text-balance">
                  Six planning engines working quietly in harmony
                </h2>
                <p className="mt-3 text-base text-[#2B2024]/75">
                  Every checklist, vendor quote, guest count, and rupee stays connected—so one change updates your entire celebration plan.
                </p>
              </div>
            </FadeInSection>

            <div className="mt-12 grid md:grid-cols-12 gap-6">
              {FEATURES.map((feature, index) => {
                const colSpan =
                  feature.featured ? 'md:col-span-6' : 'md:col-span-6 lg:col-span-4';
                return (
                  <FadeInSection
                    key={feature.id}
                    delayMs={index * 60}
                    className={colSpan}
                  >
                    <article className="utsav-card h-full p-7 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 border border-[#7A1F3D]/8">
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-5">
                          <div className="w-11 h-11 rounded-xl bg-[#F8E1E7]/75 flex items-center justify-center">
                            <FeatureIcon iconName={feature.iconName} />
                          </div>
                          <span className="font-display text-lg font-semibold text-[#E8A317] tabular-nums">
                            {feature.number}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-semibold text-[#2B2024]">
                          {feature.title}
                        </h3>

                        <p className="mt-2.5 text-sm leading-relaxed text-[#2B2024]/75">
                          {feature.description}
                        </p>
                      </div>

                      <p className="mt-5 pt-4 border-t border-[#7A1F3D]/10 text-xs font-medium text-[#7A1F3D]">
                        {feature.outcome}
                      </p>
                    </article>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4-Step How-It-Works Strip */}
        <section
          id="how-it-works"
          className="py-16 sm:py-20 bg-[#F8E1E7]/35 border-y border-[#7A1F3D]/10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#7A1F3D] mb-2">
                    How It Works
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2024] text-balance">
                    From first idea to final toast in four steps
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onStartPlanning()}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A1F3D] hover:text-[#621730] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Start Planning now
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOW_IT_WORKS_STEPS.map((item, idx) => (
                <FadeInSection key={item.step} delayMs={idx * 70}>
                  <div className="relative utsav-card h-full p-6 border border-[#7A1F3D]/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#E8A317] text-[#2B2024] font-display font-bold text-sm tabular-nums">
                          {item.step}
                        </span>
                        {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                          <ChevronRight
                            className="hidden lg:block w-5 h-5 text-[#7A1F3D]/40"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[#2B2024]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#2B2024]/75">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 3-Tier Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="text-center max-w-2xl mx-auto">
                <p className="text-xs font-semibold tracking-wide text-[#7A1F3D] mb-2">
                  Transparent Pricing
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2024] text-balance">
                  Plans sized for intimate dinners and multi-day weddings
                </h2>
                <p className="mt-3 text-base text-[#2B2024]/75">
                  Start free in minutes and upgrade only when your celebration grows.
                </p>
              </div>
            </FadeInSection>

            <div className="mt-12 grid lg:grid-cols-3 gap-6 items-stretch">
              {PRICING_TIERS.map((tier, idx) => (
                <FadeInSection key={tier.id} delayMs={idx * 75} className="flex">
                  <article
                    className={`utsav-card w-full p-7 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 ${
                      tier.highlighted
                        ? 'ring-2 ring-[#7A1F3D] relative'
                        : 'border border-[#7A1F3D]/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display text-2xl font-bold text-[#2B2024]">
                          {tier.name}
                        </h3>
                        {tier.highlighted && (
                          <span className="text-xs font-semibold text-[#7A1F3D]">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#2B2024]/65">{tier.audience}</p>

                      <div className="mt-6 pb-6 border-b border-[#7A1F3D]/10">
                        <span className="font-display text-4xl font-bold text-[#2B2024] tabular-nums">
                          {tier.price}
                        </span>
                        <span className="ml-2 text-xs text-[#2B2024]/65">
                          {tier.cadence}
                        </span>
                        <p className="mt-3 text-sm text-[#2B2024]/80 leading-relaxed">
                          {tier.description}
                        </p>
                      </div>

                      <ul className="mt-6 space-y-3 text-sm text-[#2B2024]/85">
                        {tier.specs.map((spec) => (
                          <li key={spec} className="flex items-start gap-2.5">
                            <Check
                              className="w-4 h-4 text-[#7A1F3D] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() => onStartPlanning()}
                        className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D] ${
                          tier.highlighted
                            ? 'bg-[#E8A317] text-[#2B2024] hover:bg-[#d69510]'
                            : 'bg-[#7A1F3D] text-[#FFFBF5] hover:bg-[#621730]'
                        }`}
                      >
                        {tier.ctaLabel}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Testimonial Cards */}
        <section
          id="testimonials"
          className="py-16 sm:py-20 bg-white border-t border-[#7A1F3D]/10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-[#7A1F3D] mb-2">
                  Host &amp; Studio Stories
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2B2024] text-balance">
                  Trusted when dates shift, guest lists grow, and details matter
                </h2>
              </div>
            </FadeInSection>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((item, idx) => (
                <FadeInSection key={item.id} delayMs={idx * 75} className="flex">
                  <article className="rounded-2xl bg-[#FFFBF5] border border-[#7A1F3D]/10 p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(43,32,36,0.04)]">
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#7A1F3D]/15">
                          <ResilientImage
                            src={item.avatarSrc}
                            alt={`Portrait of ${item.name}`}
                            fallbackLabel={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-semibold text-[#2B2024] truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#2B2024]/70 truncate">
                            {item.role} · {item.location}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs font-medium text-[#7A1F3D] mb-3">
                        {item.eventMeta}
                      </p>

                      <blockquote className="text-sm leading-relaxed text-[#2B2024]/85">
                        “{item.quote}”
                      </blockquote>
                    </div>

                    <p className="mt-5 pt-4 border-t border-[#7A1F3D]/10 text-xs font-semibold text-[#2B2024]">
                      Outcome: {item.outcome}
                    </p>
                  </article>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="relative overflow-hidden rounded-2xl bg-[#7A1F3D] text-[#FFFBF5] px-6 py-12 sm:px-12 sm:py-14 shadow-[0_12px_36px_rgba(122,31,61,0.22)]">
                {/* Subtle marigold radial petal motif */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full border border-[#E8A317]/25"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-4 w-40 h-40 rounded-full border border-[#F8E1E7]/20"
                />

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="max-w-2xl">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-balance">
                      Bring calm clarity to your next celebration
                    </h2>
                    <p className="mt-3 text-base text-[#FFFBF5]/85">
                      Open your Utsav AI workspace now and let Shubh organize timelines, vendors, budgets, and RSVPs in one place.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => onStartPlanning()}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#E8A317] text-[#2B2024] text-base font-semibold hover:bg-[#f0ae24] transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFBF5]"
                    >
                      Start Planning
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      {/* 4-Column Footer */}
      <footer className="border-t border-[#7A1F3D]/12 bg-[#FFFBF5] py-12 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#7A1F3D]/10">
            {/* Col 1: Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-[#7A1F3D]" aria-hidden="true" />
                <span className="font-display text-lg font-bold text-[#2B2024]">
                  Utsav AI
                </span>
              </div>
              <p className="mt-3 text-sm text-[#2B2024]/70 leading-relaxed max-w-xs">
                Celebration planning crafted around your budget, guest count, and traditions—guided by Shubh.
              </p>
            </div>

            {/* Col 2: Product */}
            <div>
              <h3 className="text-sm font-semibold text-[#2B2024] mb-3">
                Product
              </h3>
              <ul className="space-y-2.5 text-sm text-[#2B2024]/75">
                <li>
                  <a href="#features" className="hover:text-[#7A1F3D] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-[#7A1F3D] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-[#7A1F3D] transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onStartPlanning()}
                    className="hover:text-[#7A1F3D] transition-colors cursor-pointer"
                  >
                    Launch App Shell
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Celebrations */}
            <div>
              <h3 className="text-sm font-semibold text-[#2B2024] mb-3">
                Celebrations
              </h3>
              <ul className="space-y-2.5 text-sm text-[#2B2024]/75">
                {EVENT_TYPES.slice(0, 4).map((evt) => (
                  <li key={evt.id}>
                    <button
                      type="button"
                      onClick={() => onStartPlanning(evt)}
                      className="hover:text-[#7A1F3D] transition-colors cursor-pointer"
                    >
                      {evt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Connect */}
            <div>
              <h3 className="text-sm font-semibold text-[#2B2024] mb-3">
                Stories & Support
              </h3>
              <ul className="space-y-2.5 text-sm text-[#2B2024]/75">
                <li>
                  <a href="#testimonials" className="hover:text-[#7A1F3D] transition-colors">
                    Host Stories
                  </a>
                </li>
                <li>
                  <a href="#top" className="hover:text-[#7A1F3D] transition-colors">
                    Back to Top
                  </a>
                </li>
                <li>
                  <span className="text-[#2B2024]/55">hello@utsavai.app</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#2B2024]/60">
            <p>© {new Date().getFullYear()} Utsav AI. Thoughtful event planning for every milestone.</p>
            <p>Crafted with Marigold, Ivory &amp; Maroon</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
