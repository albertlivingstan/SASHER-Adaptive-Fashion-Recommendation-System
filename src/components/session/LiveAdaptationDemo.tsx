import React from 'react';
import { useSasher } from '../../context/SasherContext';
import { Sparkles, Eye, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { CategoryType } from '../../types';

export const LiveAdaptationDemo: React.FC = () => {
  const { 
    recordInteraction, 
    sessionIntent, 
    recommendedProducts, 
    dynamicWeights, 
    setSelectedProduct, 
    setExplanationModalProduct,
    resetSession 
  } = useSasher();

  const handleSimulateIntent = (category: CategoryType, type: 'VIEW' | 'EYE_GAZE') => {
    const match = recommendedProducts.find(p => p.category === category) || recommendedProducts[0];
    recordInteraction(type, match.id, category, type === 'EYE_GAZE' ? 1400 : 800, type === 'EYE_GAZE' ? 3.5 : 1.0);
  };

  return (
    <section className="py-12 border-b border-[#27272a]/60 bg-[#0f1012]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#e2a876] mb-1">
              <span>LIVE ADAPTATION BENCHMARK</span>
              <span aria-hidden="true" className="text-[#3f3f46]">·</span>
              <span>HUMAN IN THE LOOP</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#f4f4f5]">
              Observe Recommendations Evolving Live
            </h2>
            <p className="text-sm text-[#71717a] mt-1 max-w-2xl">
              Trigger intentional browsing gestures below to see the Transformer sequence model and dynamic fusion gate recalculate ranking weights in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetSession}
              className="px-3.5 py-2 rounded-lg bg-[#18191d] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#f4f4f5] text-xs font-mono-tabular transition-colors cursor-pointer flex items-center gap-1.5 border border-[#27272a]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* Interactive Triggers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <button
            onClick={() => handleSimulateIntent('Outerwear', 'EYE_GAZE')}
            className="p-4 rounded-xl bg-[#121316] hover:bg-[#18191d] border border-[#27272a] hover:border-[#e2a876]/60 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#10b981] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>+3.5× Gaze Signal</span>
              </span>
              <span className="text-xs text-[#71717a] group-hover:text-[#e2a876] transition-colors">&rarr;</span>
            </div>
            <h4 className="text-sm font-semibold text-[#f4f4f5]">
              Simulate Gaze on Coats
            </h4>
            <p className="text-xs text-[#71717a] mt-1">
              Injects 1.4s visual attention event on heavy virgin wool overcoats.
            </p>
          </button>

          <button
            onClick={() => handleSimulateIntent('Tailoring', 'VIEW')}
            className="p-4 rounded-xl bg-[#121316] hover:bg-[#18191d] border border-[#27272a] hover:border-[#e2a876]/60 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#e2a876] flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Sequence Drift</span>
              </span>
              <span className="text-xs text-[#71717a] group-hover:text-[#e2a876] transition-colors">&rarr;</span>
            </div>
            <h4 className="text-sm font-semibold text-[#f4f4f5]">
              Explore Tailored Blazers
            </h4>
            <p className="text-xs text-[#71717a] mt-1">
              Shifts Transformer sequence intent toward formal full-canvas tailoring.
            </p>
          </button>

          <button
            onClick={() => handleSimulateIntent('Knitwear', 'EYE_GAZE')}
            className="p-4 rounded-xl bg-[#121316] hover:bg-[#18191d] border border-[#27272a] hover:border-[#e2a876]/60 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#10b981] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Visual Focus</span>
              </span>
              <span className="text-xs text-[#71717a] group-hover:text-[#e2a876] transition-colors">&rarr;</span>
            </div>
            <h4 className="text-sm font-semibold text-[#f4f4f5]">
              Focus on Pure Cashmere
            </h4>
            <p className="text-xs text-[#71717a] mt-1">
              Modulates material similarity weights toward warm insulating knitwear.
            </p>
          </button>

          <button
            onClick={() => handleSimulateIntent('Footwear', 'VIEW')}
            className="p-4 rounded-xl bg-[#121316] hover:bg-[#18191d] border border-[#27272a] hover:border-[#e2a876]/60 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#a1a1aa] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Accessory Anchor</span>
              </span>
              <span className="text-xs text-[#71717a] group-hover:text-[#e2a876] transition-colors">&rarr;</span>
            </div>
            <h4 className="text-sm font-semibold text-[#f4f4f5]">
              Pivot to Commando Derbies
            </h4>
            <p className="text-xs text-[#71717a] mt-1">
              Tests MMR diversification penalty preventing single-category collapse.
            </p>
          </button>

        </div>

        {/* Live Top-3 Ranking Preview */}
        <div className="p-6 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27272a]/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e2a876] animate-pulse" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f4f4f5]">
                Real-Time Top Ranked Recommendation Slate
              </h4>
            </div>
            <span className="text-xs font-mono-tabular text-[#a1a1aa]">
              {sessionIntent.trendDescription}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedProducts.slice(0, 3).map((prod, index) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#18191d] hover:bg-[#27272a]/60 border border-[#27272a]/70 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#121316] border border-[#27272a] flex items-center justify-center text-xs font-mono-tabular font-bold text-[#e2a876] shrink-0">
                  0{index + 1}
                </div>
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-16 object-cover rounded-md bg-[#27272a] shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono-tabular uppercase text-[#71717a] block truncate">
                    {prod.category} &middot; {prod.explanation.matchScore}% Match
                  </span>
                  <h5 className="text-xs font-medium text-[#f4f4f5] truncate group-hover:text-[#e2a876] transition-colors">
                    {prod.name}
                  </h5>
                  <span className="text-[11px] font-mono-tabular text-[#a1a1aa] block mt-0.5">
                    {prod.currency}{prod.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
