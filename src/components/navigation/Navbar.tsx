import React, { useState, useEffect } from 'react';
import { useSasher } from '../../context/SasherContext';
import { GoogleAuthButton } from '../auth/GoogleAuthButton';
import { Eye, Heart, ShoppingBag, EyeOff, ShieldCheck, Activity, Sun, Moon, Laptop } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    isEyeTrackingActive, 
    toggleEyeTracking, 
    openCalibration,
    isCalibrated,
    wishlistIds, 
    cart, 
    setIsCartDrawerOpen,
    anomalyState
  } = useSasher();

  const [theme, setTheme] = useState<'system' | 'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('app_theme_mode') as 'system' | 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        applyTheme(savedTheme);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const applyTheme = (mode: 'system' | 'dark' | 'light') => {
    try {
      if (mode === 'system') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', mode);
      }
      localStorage.setItem('app_theme_mode', mode);
    } catch (e) {
      console.error(e);
    }
  };

  const cycleTheme = () => {
    const nextTheme: 'dark' | 'light' | 'system' = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#0b0b0d]/80 backdrop-blur-xl border-b border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setCurrentTab('discover')}
          data-magnetic
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-2"
        >
          <span className="font-editorial text-2xl sm:text-3xl tracking-tight text-[#f5f5f7] group-hover:text-[#ff6b1a] transition-colors">
            SASHER
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#ff6b1a]" />
        </button>

        {/* Zone 2: Clean text navigation links with brand-gradient underline indicator */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium">
          {[
            { id: 'discover', label: 'Discover' },
            { id: 'telemetry', label: 'Live Telemetry', hasPulse: true },
            { id: 'recommendations', label: 'Recommendations' },
            { id: 'insights', label: 'AI Insights' },
            { id: 'research', label: 'Research' },
            { id: 'architecture', label: 'Architecture' },
          ].map((navItem) => {
            const isActive = currentTab === navItem.id;
            return (
              <button
                key={navItem.id}
                onClick={() => setCurrentTab(navItem.id)}
                data-magnetic
                className={`relative py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive ? 'text-[#f5f5f7] font-semibold' : 'text-[#a1a1a6] hover:text-[#f5f5f7]'
                }`}
              >
                {navItem.hasPulse && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b1a] animate-pulse" />
                )}
                <span>{navItem.label}</span>
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background: 'var(--brand-gradient)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Google Auth + Eye-Tracker + Theme */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Gaze Sensor Toggle */}
          <button
            onClick={toggleEyeTracking}
            data-magnetic
            title={isEyeTrackingActive ? "Visual intent tracking is active (Click to pause)" : "Visual intent paused (Click to resume)"}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
              isEyeTrackingActive
                ? 'bg-[#18181b] border-[#27272a] text-[#f5f5f7] hover:border-[#ff6b1a]/60'
                : 'bg-[#18181b]/50 border-transparent text-[#71717a] hover:text-[#a1a1a6]'
            }`}
          >
            {isEyeTrackingActive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30d158] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30d158]"></span>
                </span>
                <span className="text-[11px] text-[#f5f5f7]">GAZE</span>
                <span className="text-[10px] text-[#30d158]">ON</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#71717a]" />
                <span className="text-[11px] text-[#71717a]">PAUSED</span>
              </>
            )}
          </button>

          {/* Theme Toggle (System / Light / Dark) */}
          <button
            onClick={cycleTheme}
            data-magnetic
            title={`Current theme: ${theme.toUpperCase()} (Click to toggle)`}
            className="p-2 text-[#a1a1a6] hover:text-[#f5f5f7] rounded-full hover:bg-[#1c1c1f] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' && <Moon className="w-4 h-4 text-[#ff6b1a]" />}
            {theme === 'light' && <Sun className="w-4 h-4 text-[#2997ff]" />}
            {theme === 'system' && <Laptop className="w-4 h-4 text-[#a1a1a6]" />}
          </button>

          {/* Google Sign In Integration */}
          <GoogleAuthButton compact={true} />

          {/* Wishlist count */}
          <button
            onClick={() => setCurrentTab('discover')}
            data-magnetic
            className="p-2 text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors relative cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistIds.size > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b1a] rounded-full"></span>
            )}
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            data-magnetic
            className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f7] hover:bg-[#ffffff] text-[#0b0b0d] rounded-full text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{totalCartItems}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav row */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-[#27272a]/40 bg-[#0b0b0d]/95 text-xs">
        <button
          onClick={() => setCurrentTab('discover')}
          className={`py-1 cursor-pointer ${currentTab === 'discover' ? 'text-[#ff6b1a] font-medium' : 'text-[#a1a1a6]'}`}
        >
          Discover
        </button>
        <button
          onClick={() => setCurrentTab('telemetry')}
          className={`py-1 cursor-pointer flex items-center gap-1 ${currentTab === 'telemetry' ? 'text-[#ff6b1a] font-medium' : 'text-[#a1a1a6]'}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b1a] animate-pulse" />
          <span>Live Hub</span>
        </button>
        <button
          onClick={() => setCurrentTab('recommendations')}
          className={`py-1 cursor-pointer ${currentTab === 'recommendations' ? 'text-[#ff6b1a] font-medium' : 'text-[#a1a1a6]'}`}
        >
          Adaptive AI
        </button>
        <button
          onClick={() => setCurrentTab('insights')}
          className={`py-1 cursor-pointer ${currentTab === 'insights' ? 'text-[#ff6b1a] font-medium' : 'text-[#a1a1a6]'}`}
        >
          Insights
        </button>
        <button
          onClick={() => setCurrentTab('research')}
          className={`py-1 cursor-pointer ${currentTab === 'research' ? 'text-[#ff6b1a] font-medium' : 'text-[#a1a1a6]'}`}
        >
          Research
        </button>
      </div>
    </header>
  );
};
