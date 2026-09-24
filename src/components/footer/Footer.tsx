import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-[#27272a]/60 bg-[#090a0c] py-12 text-[#a1a1aa] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#27272a]/40">
          
          <div className="space-y-1">
            <span className="font-editorial text-2xl text-[#f4f4f5] tracking-tight block">
              SASHER
            </span>
            <p className="text-[#71717a] text-xs max-w-md">
              Secure Adaptive Session-Aware Hybrid E-Commerce Recommendation System combining eye-gaze attention, sequential modeling, and explainable AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider font-mono-tabular">
            <button
              onClick={() => onSelectTab('discover')}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              Discover
            </button>
            <button
              onClick={() => onSelectTab('telemetry')}
              className="text-[#ff4d36] hover:text-[#f4f4f5] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d36] animate-pulse" />
              <span>Live Telemetry</span>
            </button>
            <button
              onClick={() => onSelectTab('recommendations')}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              Recommendations
            </button>
            <button
              onClick={() => onSelectTab('insights')}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              AI Insights
            </button>
            <button
              onClick={() => onSelectTab('research')}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              Research & Evaluation
            </button>
            <button
              onClick={() => onSelectTab('architecture')}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            >
              Architecture
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#71717a] text-[11px] font-mono-tabular">
          <div>
            &copy; {new Date().getFullYear()} SASHER Fashion AI Research Consortium. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Client-Side Local Gaze Estimation</span>
            <span>·</span>
            <span>Zero Biometric Telemetry Stored</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
