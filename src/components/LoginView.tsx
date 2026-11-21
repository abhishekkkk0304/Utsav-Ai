import {useState, type FormEvent} from 'react';
import {ArrowLeft, ArrowRight, Flower2} from 'lucide-react';
import {HERO_IMAGE_PATH, type UserProfile} from '../data/utsavData';
import {ResilientImage} from './ResilientImage';

interface LoginViewProps {
  onCompleteLogin: (profile: UserProfile) => void;
  onBackToLanding: () => void;
}

export function LoginView({onCompleteLogin, onBackToLanding}: LoginViewProps) {
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [googleName, setGoogleName] = useState('Aarav Sharma');
  const [googleEmail, setGoogleEmail] = useState('aarav.sharma@gmail.com');
  const [errorMsg, setErrorMsg] = useState('');

  const handleContinueAsGuest = () => {
    onCompleteLogin({
      name: 'Guest Host',
      email: 'guest@utsavai.app',
    });
  };

  const handleGoogleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = googleName.trim();
    const trimmedEmail = googleEmail.trim();
    if (!trimmedName || !trimmedEmail || !trimmedEmail.includes('@')) {
      setErrorMsg('Please enter your name and a valid email address.');
      return;
    }
    setErrorMsg('');
    onCompleteLogin({
      name: trimmedName,
      email: trimmedEmail,
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#FFFBF5] text-[#2B2024] overflow-hidden">
      {/* Hero Background Visual + Measured Warm Scrim */}
      <div aria-hidden="true" className="absolute inset-0">
        <ResilientImage
          src={HERO_IMAGE_PATH}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5]/92 via-[#FFFBF5]/84 to-[#F8E1E7]/75" />
      </div>

      {/* Subtle Botanical Floral Motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          className="absolute -top-20 -right-20 w-[420px] h-[420px] text-[#E8A317]/18"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="78"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
          <path
            d="M100 20C108 48 128 60 156 54C138 78 138 102 156 126C128 120 108 132 100 160C92 132 72 120 44 126C62 102 62 78 44 54C72 60 92 48 100 20Z"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Centered Login Card */}
      <main className="relative z-10 w-full max-w-md">
        <div className="utsav-card p-8 sm:p-10 border border-[#7A1F3D]/12 shadow-[0_16px_48px_rgba(43,32,36,0.1)]">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F8E1E7] border border-[#7A1F3D]/15 flex items-center justify-center mb-4">
              <Flower2 className="w-6 h-6 text-[#7A1F3D]" aria-hidden="true" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[#2B2024]">
              Utsav AI
            </h1>
            <p className="mt-1.5 text-sm font-medium text-[#7A1F3D]">
              Your AI Event Planner
            </p>
            <p className="mt-4 text-sm text-[#2B2024]/75 leading-relaxed">
              Sign in so Shubh can save your event profile, budget split, and timeline on this device.
            </p>
          </div>

          {!showGoogleForm ? (
            <div className="mt-8 space-y-3.5">
              {/* Sign in with Google Button */}
              <button
                type="button"
                onClick={() => setShowGoogleForm(true)}
                className="w-full inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-[#2B2024]/18 text-[#2B2024] text-sm font-semibold hover:bg-[#FFFBF5] hover:border-[#7A1F3D]/35 transition-all duration-150 shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-[#7A1F3D]/12" />
                <span className="shrink mx-3 text-xs text-[#2B2024]/50">or</span>
                <div className="flex-grow border-t border-[#7A1F3D]/12" />
              </div>

              {/* Continue as Guest Button */}
              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#7A1F3D] text-[#FFFBF5] text-sm font-semibold hover:bg-[#621730] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
              >
                <span>Continue as Guest</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            /* Lightweight local Google profile chooser (zero cloud console setup required) */
            <form onSubmit={handleGoogleSubmit} className="mt-7 space-y-4">
              <div className="rounded-xl bg-[#FFFBF5] border border-[#7A1F3D]/15 p-3.5 text-xs text-[#2B2024]/75">
                Confirm your Google display name and email to personalize your local Utsav AI workspace.
              </div>

              <div>
                <label
                  htmlFor="google-name"
                  className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="google-name"
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-[#7A1F3D]/20 bg-white px-3.5 py-2.5 text-sm text-[#2B2024] focus:outline-2 focus:outline-[#7A1F3D]"
                />
              </div>

              <div>
                <label
                  htmlFor="google-email"
                  className="block text-xs font-semibold text-[#2B2024] mb-1.5"
                >
                  Google Email
                </label>
                <input
                  id="google-email"
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  required
                  className="w-full rounded-xl border border-[#7A1F3D]/20 bg-white px-3.5 py-2.5 text-sm text-[#2B2024] focus:outline-2 focus:outline-[#7A1F3D]"
                />
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs font-medium text-[#7A1F3D]">
                  {errorMsg}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowGoogleForm(false);
                    setErrorMsg('');
                  }}
                  className="px-4 py-3 rounded-xl border border-[#7A1F3D]/20 text-sm font-medium text-[#2B2024] hover:bg-[#FFFBF5] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E8A317] text-[#2B2024] text-sm font-semibold hover:bg-[#d69510] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F3D]"
                >
                  Continue with Google
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2B2024]/70 hover:text-[#7A1F3D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Utsav AI Overview</span>
          </button>
        </div>
      </main>
    </div>
  );
}
