import {useState} from 'react';
import {AppShellView} from './components/AppShellView';
import {LandingView} from './components/LandingView';
import {LoginView} from './components/LoginView';
import {SetupWizardView} from './components/SetupWizardView';
import {
  EVENT_TYPES,
  type EventProfile,
  type EventTypeOption,
  type UserProfile,
} from './data/utsavData';

const USER_PROFILE_KEY = 'userProfile';
const EVENT_PROFILE_KEY = 'eventProfile';

function readStoredJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

type ActiveScreen = 'landing' | 'login' | 'wizard' | 'app';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() =>
    readStoredJson<UserProfile>(USER_PROFILE_KEY)
  );
  const [eventProfile, setEventProfile] = useState<EventProfile | null>(() =>
    readStoredJson<EventProfile>(EVENT_PROFILE_KEY)
  );
  const [selectedEventType, setSelectedEventType] = useState<EventTypeOption>(
    EVENT_TYPES[0]
  );

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(() => {
    const storedUser = readStoredJson<UserProfile>(USER_PROFILE_KEY);
    const storedEvent = readStoredJson<EventProfile>(EVENT_PROFILE_KEY);
    if (storedUser && storedEvent) return 'app';
    if (storedUser && !storedEvent) return 'wizard';
    return 'landing';
  });

  const handleStartPlanning = (eventType?: EventTypeOption) => {
    if (eventType) {
      setSelectedEventType(eventType);
    }

    if (!userProfile) {
      setActiveScreen('login');
    } else if (!eventProfile) {
      setActiveScreen('wizard');
    } else {
      setActiveScreen('app');
    }
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleCompleteLogin = (profile: UserProfile) => {
    try {
      window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
    setUserProfile(profile);

    if (eventProfile) {
      setActiveScreen('app');
    } else {
      setActiveScreen('wizard');
    }
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleCompleteWizard = (profile: EventProfile) => {
    try {
      window.localStorage.setItem(EVENT_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
    setEventProfile(profile);
    setActiveScreen('app');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleEditEvent = () => {
    setActiveScreen('wizard');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleBackToLanding = () => {
    setActiveScreen('landing');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const handleSignOut = () => {
    try {
      window.localStorage.removeItem(USER_PROFILE_KEY);
    } catch {
      // Ignore storage errors
    }
    setUserProfile(null);
    setActiveScreen('login');
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  if (activeScreen === 'login') {
    return (
      <LoginView
        onCompleteLogin={handleCompleteLogin}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  if (activeScreen === 'wizard' && userProfile) {
    return (
      <SetupWizardView
        userProfile={userProfile}
        initialEventType={selectedEventType.label}
        initialProfile={eventProfile}
        onCompleteWizard={handleCompleteWizard}
        onCancelEdit={eventProfile ? () => setActiveScreen('app') : undefined}
      />
    );
  }

  if (activeScreen === 'app' && userProfile && eventProfile) {
    return (
      <AppShellView
        userProfile={userProfile}
        eventProfile={eventProfile}
        onEditEvent={handleEditEvent}
        onBackToLanding={handleBackToLanding}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <LandingView
      selectedEventType={selectedEventType}
      onSelectEventType={setSelectedEventType}
      onStartPlanning={handleStartPlanning}
    />
  );
}
