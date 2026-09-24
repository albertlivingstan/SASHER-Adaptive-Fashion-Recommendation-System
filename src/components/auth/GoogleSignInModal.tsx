import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';

export const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const GoogleSignInModal: React.FC = () => {
  const { isSignInModalOpen, closeSignInModal, signInWithGoogle, isLoading } = useAuth();
  const [selectedEmail, setSelectedEmail] = useState<string>('albert87g@gmail.com');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  if (!isSignInModalOpen) return null;

  const handleSignIn = async (email: string) => {
    await signInWithGoogle(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#141416] border border-[#27272a] rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Brand Gradient Hairline Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff6b1a] via-[#ff3d7f] to-[#2997ff]" />

        {/* Close Button */}
        <button
          onClick={closeSignInModal}
          className="absolute top-4 right-4 text-[#71717a] hover:text-[#f5f5f7] p-1.5 rounded-lg hover:bg-[#1c1c1f] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-[#ffffff] shadow-sm flex items-center justify-center">
            <GoogleLogoIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl text-[#f5f5f7] tracking-tight">
              Sign in with Google
            </h3>
            <p className="text-xs text-[#a1a1a6]">
              Sync your adaptive fashion profile & visual intent
            </p>
          </div>
        </div>

        {/* Description / Value Proposition */}
        <div className="p-3.5 bg-[#1c1c1f] rounded-xl border border-[#27272a] text-xs text-[#a1a1a6] space-y-2 mb-5">
          <div className="flex items-center gap-2 text-[#f5f5f7] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6b1a]" />
            <span>Personalized Adaptive Experience</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Signing in saves your calibrated gaze preferences, aesthetic similarity vectors, and wishlist across sessions with strict zero-third-party disclosure.
          </p>
        </div>

        {/* Quick Accounts Chooser */}
        <div className="space-y-2.5 mb-5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#71717a] block">
            Choose an account
          </span>

          {/* Primary Recommended Account */}
          <button
            onClick={() => handleSignIn('albert87g@gmail.com')}
            disabled={isLoading}
            className="w-full p-3 rounded-xl border border-[#27272a] hover:border-[#ff6b1a] bg-[#18181b] hover:bg-[#1f2024] transition-all flex items-center justify-between group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff6b1a] to-[#2997ff] flex items-center justify-center text-white font-bold text-sm shadow">
                A
              </div>
              <div>
                <span className="text-sm font-semibold text-[#f5f5f7] block group-hover:text-[#ff6b1a] transition-colors">
                  Albert G.
                </span>
                <span className="text-xs text-[#a1a1a6] font-mono">
                  albert87g@gmail.com
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#ff6b1a]/15 text-[#ff6b1a] border border-[#ff6b1a]/30">
                Current
              </span>
              <ArrowRight className="w-4 h-4 text-[#71717a] group-hover:text-[#ff6b1a] transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>

          {/* Alternate Account Option */}
          <button
            onClick={() => handleSignIn('albert.researcher@gmail.com')}
            disabled={isLoading}
            className="w-full p-3 rounded-xl border border-[#27272a] hover:border-[#27272a]/90 bg-[#141416] hover:bg-[#18181b] transition-all flex items-center justify-between group cursor-pointer text-left opacity-80 hover:opacity-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#27272a] flex items-center justify-center text-[#f5f5f7] font-semibold text-sm">
                R
              </div>
              <div>
                <span className="text-sm font-medium text-[#f5f5f7] block">
                  Albert (Research Lab)
                </span>
                <span className="text-xs text-[#71717a] font-mono">
                  albert.researcher@gmail.com
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#71717a] group-hover:text-[#f5f5f7] transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Custom Email Input Toggle */}
        {!isCustomMode ? (
          <button
            onClick={() => setIsCustomMode(true)}
            className="text-xs text-[#2997ff] hover:text-[#52a9ff] transition-colors mb-5 block font-medium cursor-pointer"
          >
            Use another Google account
          </button>
        ) : (
          <div className="mb-5 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="name@gmail.com"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 bg-[#18181b] border border-[#27272a] rounded-xl px-3 py-2 text-xs font-mono text-[#f5f5f7] focus:outline-none focus:border-[#2997ff]"
              />
              <button
                onClick={() => customInput && handleSignIn(customInput)}
                className="px-3.5 py-2 bg-[#f5f5f7] text-[#0b0b0d] font-semibold text-xs rounded-xl hover:bg-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* Footer Security Badges */}
        <div className="pt-4 border-t border-[#27272a] flex items-center justify-between text-[11px] text-[#71717a]">
          <div className="flex items-center gap-1.5 text-[#30d158]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OAuth 2.0 Secure Session</span>
          </div>
          <span className="text-[10px]">Privacy & Terms protected</span>
        </div>
      </div>
    </div>
  );
};
