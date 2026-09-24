import React from 'react';
import { useSasher } from '../../context/SasherContext';
import { Activity, Clock, MousePointer, Eye, Sparkles } from 'lucide-react';
import { CategoryType } from '../../types';

export const SessionIntentWidget: React.FC = () => {
  const { sessionIntent, dynamicWeights, isEyeTrackingActive, interactions } = useSasher();

  const minutes = Math.floor(sessionIntent.sessionDurationSec / 60);
  const seconds = sessionIntent.sessionDurationSec % 60;
  const timeFormatted = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;

  // Sort categories by current intent percentage
  const sortedCategories = (Object.entries(sessionIntent.categoryDistribution) as [CategoryType, number][])
    .filter(([cat]) => cat !== 'All')
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <div className="bg-[#121316] border border-[#27272a] rounded-2xl p-6 shadow-xl">
      {/* Title & Status */}
      <div className="flex items-center justify-between pb-4 border-b border-[#27272a]/60">
        <div>
          <span className="text-[10px] font-mono-tabular uppercase tracking-widest text-[#e2a876] block">
            REAL-TIME INTENT ENGINE
          </span>
          <h3 className="font-editorial text-2xl text-[#f4f4f5] mt-0.5">
            Your Current Session
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
          </span>
          <span className="text-xs font-mono-tabular text-[#10b981] uppercase tracking-wider font-semibold">
            ADAPTING
          </span>
        </div>
      </div>

      {/* Grid of high level session metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-[#27272a]/60 text-xs font-mono-tabular">
        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <div className="flex items-center gap-1.5 text-[#71717a] mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">Duration</span>
          </div>
          <span className="text-sm font-semibold text-[#f4f4f5]">{timeFormatted}</span>
        </div>

        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <div className="flex items-center gap-1.5 text-[#71717a] mb-1">
            <MousePointer className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">Interactions</span>
          </div>
          <span className="text-sm font-semibold text-[#f4f4f5]">{interactions.length} events</span>
        </div>

        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <div className="flex items-center gap-1.5 text-[#71717a] mb-1">
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase">Visual Gaze</span>
          </div>
          <span className="text-sm font-semibold text-[#10b981]">
            {isEyeTrackingActive ? 'Tracking' : 'Paused'}
          </span>
        </div>

        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <div className="flex items-center gap-1.5 text-[#71717a] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#e2a876]" />
            <span className="text-[10px] uppercase">Confidence</span>
          </div>
          <span className="text-sm font-semibold text-[#e2a876]">
            {Math.round(sessionIntent.confidence * 100)}%
          </span>
        </div>
      </div>

      {/* Category Intent Distribution Bars */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono-tabular uppercase tracking-wider text-[11px] text-[#a1a1aa]">
            SESSION CATEGORY DRIFT
          </span>
          <span className="text-[11px] text-[#71717a]">
            Primary: <strong className="text-[#f4f4f5]">{sessionIntent.primaryCategory}</strong>
          </span>
        </div>

        <div className="space-y-2.5">
          {sortedCategories.map(([category, value]) => {
            const pct = Math.round(value * 100);
            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-xs font-mono-tabular">
                  <span className="text-[#e4e4e7]">{category}</span>
                  <span className="text-[#a1a1aa] font-semibold">{pct}%</span>
                </div>
                <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                  <div
                    className={`h-full transition-all duration-700 ${
                      category === sessionIntent.primaryCategory
                        ? 'bg-[#e2a876]'
                        : 'bg-[#52525b]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Weight Allocation Summary */}
      <div className="mt-5 p-3.5 bg-[#18191d]/60 rounded-xl border border-[#27272a]/70">
        <div className="flex items-center justify-between text-[11px] font-mono-tabular mb-2">
          <span className="text-[#a1a1aa]">DYNAMIC WEIGHT FUSION (Σ w_i = 1.0)</span>
          <span className="text-[#e2a876] font-semibold">Adaptive</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10px] font-mono-tabular">
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block">w_session</span>
            <span className="text-[#f4f4f5] font-semibold">{dynamicWeights.session}</span>
          </div>
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block">w_gaze</span>
            <span className="text-[#10b981] font-semibold">{dynamicWeights.eyeGaze}</span>
          </div>
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block">w_profile</span>
            <span className="text-[#f4f4f5] font-semibold">{dynamicWeights.profile}</span>
          </div>
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block">w_collab</span>
            <span className="text-[#f4f4f5] font-semibold">{dynamicWeights.collaborative}</span>
          </div>
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block">w_content</span>
            <span className="text-[#f4f4f5] font-semibold">{dynamicWeights.content}</span>
          </div>
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block">w_pop</span>
            <span className="text-[#f4f4f5] font-semibold">{dynamicWeights.popularity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
