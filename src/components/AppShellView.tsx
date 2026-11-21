import {useEffect, useRef, useState} from 'react';
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Check,
  Flower2,
  LayoutDashboard,
  LogOut,
  Pencil,
  Sparkles,
  Store,
  Users,
  Wallet,
} from 'lucide-react';
import {
  APP_TABS,
  BUDGET_CATEGORIES,
  INITIAL_REMINDERS,
  calculateDaysToGo,
  formatINR,
  type AppTabId,
  type BudgetCategoryName,
  type EventProfile,
  type PlaceholderModule,
  type ReminderItem,
  type UserProfile,
} from '../data/utsavData';

interface AppShellViewProps {
  userProfile: UserProfile;
  eventProfile: EventProfile;
  onEditEvent: () => void;
  onBackToLanding: () => void;
  onSignOut: () => void;
}

function TabIcon({tabId, active}: {tabId: AppTabId; active: boolean}) {
  const cls = `w-5 h-5 shrink-0 ${active ? 'text-[#7A1F3D]' : 'text-[#2B2024]/65'}`;
  switch (tabId) {
    case 'dashboard':
      return <LayoutDashboard className={cls} aria-hidden="true" />;
    case 'timeline':
      return <CalendarDays className={cls} aria-hidden="true" />;
    case 'vendors':
      return <Store className={cls} aria-hidden="true" />;
    case 'guests':
      return <Users className={cls} aria-hidden="true" />;
    case 'budget':
      return <Wallet className={cls} aria-hidden="true" />;
    case 'shubh-ai':
      return <Sparkles className={cls} aria-hidden="true" />;
  }
}

function getAccentBorderClass(accent: PlaceholderModule['accent']) {
  switch (accent) {
    case 'marigold':
      return 'border-[#E8A317]/55';
    case 'maroon':
      return 'border-[#7A1F3D]/35';
    case 'blush':
      return 'border-[#7A1F3D]/25';
  }
}

export function AppShellView({
  userProfile,
  eventProfile,
  onEditEvent,
  onBackToLanding,
  onSignOut,
}: AppShellViewProps) {
  const [activeTab, setActiveTab] = useState<AppTabId>('dashboard');
  const [remindersOpen, setRemindersOpen] = useState(false);
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const remindersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!remindersOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRemindersOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        remindersRef.current &&
        !remindersRef.current.contains(e.target as Node)
      ) {
        setRemindersOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [remindersOpen]);

  const currentTabConfig =
    APP_TABS.find((tab) => tab.id === activeTab) ?? APP_TABS[0];

  const daysToGo = calculateDaysToGo(eventProfile.date);
  const perGuestBudget =
    eventProfile.guestCount > 0
      ? Math.round(eventProfile.budget / eventProfile.guestCount)
      : 0;
  const unreadCount = reminders.filter((r) => r.unread).length;

  const markAllRead = () => {
    setReminders((prev) => prev.map((r) => ({...r, unread: false})));
  };

  const toggleReminderRead = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? {...r, unread: !r.unread} : r))
    );
  };

  const renderModuleLiveDetail = (moduleId: string) => {
    switch (moduleId) {
      case 'countdown':
        return (
          <div className="mt-4 rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/10 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-[#7A1F3D] tabular-nums">
              D-{daysToGo} to go · {eventProfile.date}
            </span>
            <span className="text-[#2B2024]/70">
              {eventProfile.daysCount} day{eventProfile.daysCount > 1 ? 's' : ''} · {eventProfile.city}
            </span>
          </div>
        );
      case 'plan-health':
        return (
          <div className="mt-4 rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/10 px-4 py-3 text-xs text-[#2B2024]/80 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-[#2B2024]">{eventProfile.eventType}</span>
            <span aria-hidden="true">·</span>
            <span>{eventProfile.venueType}</span>
            <span aria-hidden="true">·</span>
            <span>Top priorities: {eventProfile.priorities.join(', ')}</span>
          </div>
        );
      case 'budget-snapshot':
        return (
          <div className="mt-4 rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/10 px-4 py-3 text-xs flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-[#2B2024] tabular-nums">
              Total: {formatINR(eventProfile.budget)}
            </span>
            <span className="text-[#7A1F3D] font-medium tabular-nums">
              {formatINR(perGuestBudget)} / guest
            </span>
          </div>
        );
      case 'rsvp-snapshot':
        return (
          <div className="mt-4 rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/10 px-4 py-3 text-xs flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-[#2B2024] tabular-nums">
              Target: {eventProfile.guestCount} guests
            </span>
            <span className="text-[#2B2024]/70">Food: {eventProfile.food}</span>
          </div>
        );
      case 'budget-split':
        return (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {BUDGET_CATEGORIES.map((cat: BudgetCategoryName) => {
              const amount = eventProfile.budgetSplit?.[cat] ?? 0;
              return (
                <div
                  key={cat}
                  className="rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/10 px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs"
                >
                  <span className="text-[#2B2024]/80 truncate">{cat}</span>
                  <span className="font-semibold text-[#2B2024] tabular-nums shrink-0">
                    {formatINR(amount)}
                  </span>
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#2B2024] flex flex-col md:flex-row">
      {/* Desktop Left Sidebar Navigation */}
      <aside
        aria-label="Workspace navigation"
        className="hidden md:flex md:flex-col md:w-64 lg:w-68 shrink-0 bg-white border-r border-[#7A1F3D]/12 min-h-screen sticky top-0 h-screen justify-between p-5"
      >
        <div>
          {/* Brand Wordmark */}
          <div className="flex items-center justify-between gap-3 pb-6 mb-5 border-b border-[#7A1F3D]/10">
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2.5 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A1F3D] rounded-md"
            >
              <span className="w-8 h-8 rounded-full bg-[#F8E1E7] flex items-center justify-center border border-[#7A1F3D]/15">
                <Flower2 className="w-4 h-4 text-[#7A1F3D]" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-bold text-[#2B2024] group-hover:text-[#7A1F3D] transition-colors whitespace-nowrap">
                Utsav AI
              </span>
            </button>
          </div>

          {/* 6 Navigation Tabs */}
          <nav aria-label="Workspace tabs" className="space-y-1.5">
            {APP_TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D] ${
                    isActive
                      ? 'bg-[#F8E1E7]/75 text-[#7A1F3D] font-semibold shadow-[inset_0_0_0_1px_rgba(122,31,61,0.14)]'
                      : 'text-[#2B2024]/75 hover:bg-[#FFFBF5] hover:text-[#2B2024]'
                  }`}
                >
                  <TabIcon tabId={tab.id} active={isActive} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Host Profile, Overview & Sign Out */}
        <div className="pt-5 border-t border-[#7A1F3D]/10 space-y-2.5">
          <div className="px-3 py-2 rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/10">
            <p className="text-xs font-semibold text-[#2B2024] truncate">
              {userProfile.name}
            </p>
            <p className="text-[11px] text-[#2B2024]/60 truncate">
              {userProfile.email}
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToLanding}
            className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#2B2024]/75 hover:text-[#7A1F3D] hover:bg-[#FFFBF5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Overview</span>
          </button>

          <button
            type="button"
            onClick={onSignOut}
            className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#2B2024]/65 hover:text-[#7A1F3D] hover:bg-[#F8E1E7]/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Top Bar + Single Active Tab Viewport) */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#FFFBF5]/95 backdrop-blur-md border-b border-[#7A1F3D]/10 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToLanding}
              aria-label="Back to Utsav AI landing page"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-[#7A1F3D]/15 text-[#7A1F3D] shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="min-w-0">
              <h1 className="font-display text-base sm:text-xl font-bold text-[#2B2024] truncate">
                {eventProfile.eventName}
              </h1>
            </div>
          </div>

          {/* Right Controls: Live D-[days] to go Countdown Pill + Reminders Bell */}
          <div ref={remindersRef} className="flex items-center gap-3 shrink-0 relative">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#F8E1E7] text-[#7A1F3D] text-xs sm:text-sm font-semibold tabular-nums whitespace-nowrap shrink-0 border border-[#7A1F3D]/15">
              D-{daysToGo} to go
            </span>

            <button
              type="button"
              onClick={() => setRemindersOpen((prev) => !prev)}
              aria-expanded={remindersOpen}
              aria-label={`Reminders (${unreadCount} unread)`}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#7A1F3D]/15 text-[#2B2024] hover:border-[#7A1F3D]/35 hover:text-[#7A1F3D] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8A317] text-[#2B2024] text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Interactive Reminders Popover */}
            {remindersOpen && (
              <div
                role="dialog"
                aria-label="Event reminders"
                className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl bg-white border border-[#7A1F3D]/15 shadow-[0_12px_36px_rgba(43,32,36,0.14)] p-4 z-50"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#7A1F3D]/10">
                  <span className="font-display text-base font-semibold text-[#2B2024]">
                    Auto Reminders
                  </span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs font-semibold text-[#7A1F3D] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <ul className="mt-3 space-y-2.5">
                  {reminders.map((rem) => (
                    <li
                      key={rem.id}
                      className={`rounded-xl p-3 border transition-colors ${
                        rem.unread
                          ? 'bg-[#FFFBF5] border-[#E8A317]/40'
                          : 'bg-white border-[#7A1F3D]/10 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#7A1F3D]">
                            {rem.category} · {rem.dueLabel}
                          </p>
                          <p className="mt-0.5 text-sm text-[#2B2024]">
                            {rem.title}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleReminderRead(rem.id)}
                          aria-label={
                            rem.unread
                              ? `Mark "${rem.title}" as read`
                              : `Mark "${rem.title}" as unread`
                          }
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border cursor-pointer transition-colors ${
                            rem.unread
                              ? 'border-[#7A1F3D]/20 text-[#2B2024]/50 hover:text-[#7A1F3D]'
                              : 'bg-[#F8E1E7] border-[#7A1F3D]/20 text-[#7A1F3D]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Single Active Tab Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#7A1F3D] mb-1.5">
                {currentTabConfig.label}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2B2024]">
                {currentTabConfig.heading}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#2B2024]/75 max-w-2xl">
                {currentTabConfig.subheading}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <span className="text-xs text-[#2B2024]/70 tabular-nums whitespace-nowrap">
                {eventProfile.guestCount} guests · Budget {formatINR(eventProfile.budget)}
              </span>

              {activeTab === 'dashboard' && (
                <button
                  type="button"
                  onClick={onEditEvent}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7A1F3D] text-[#FFFBF5] text-xs sm:text-sm font-semibold hover:bg-[#621730] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
                >
                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Edit Event</span>
                </button>
              )}
            </div>
          </div>

          {/* Dashed-Border Placeholder Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {currentTabConfig.modules.map((mod) => {
              const borderClass = getAccentBorderClass(mod.accent);
              return (
                <section
                  key={mod.id}
                  aria-label={mod.title}
                  className={`${mod.spanClass} bg-white rounded-2xl p-6 sm:p-7 border-2 border-dashed ${borderClass} shadow-[0_4px_24px_rgba(43,32,36,0.04)] flex flex-col justify-between min-h-[210px] transition-colors duration-150 hover:bg-[#FFFBF5]/60`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold text-[#2B2024]">
                        {mod.title}
                      </h3>
                      <span className="text-xs font-medium text-[#7A1F3D]/75 whitespace-nowrap shrink-0">
                        Planned Feature
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#2B2024]/75">
                      {mod.subtitle}
                    </p>

                    {renderModuleLiveDetail(mod.id)}
                  </div>

                  {/* Clean Planned Capabilities Preview */}
                  <div className="mt-6 pt-4 border-t border-dashed border-[#7A1F3D]/15 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#2B2024]/70">
                    {mod.plannedCapabilities.map((cap, capIdx) => (
                      <span key={cap} className="inline-flex items-center gap-2.5">
                        {capIdx > 0 && <span aria-hidden="true">·</span>}
                        <span>{cap}</span>
                      </span>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar (collapses from left sidebar on < md viewports) */}
      <nav
        aria-label="Mobile workspace tabs"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#7A1F3D]/15 px-1 py-1.5 grid grid-cols-6 gap-0.5"
      >
        {APP_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer min-h-[48px] ${
                isActive
                  ? 'text-[#7A1F3D] bg-[#F8E1E7]/70 font-semibold'
                  : 'text-[#2B2024]/70 hover:text-[#2B2024]'
              }`}
            >
              <TabIcon tabId={tab.id} active={isActive} />
              <span className="mt-0.5 truncate max-w-full whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
