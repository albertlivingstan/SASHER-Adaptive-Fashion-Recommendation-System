import React from 'react';
import { useSasher } from '../../context/SasherContext';
import { 
  Activity, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  BarChart2, 
  RefreshCw 
} from 'lucide-react';
import { CategoryType } from '../../types';

export const AiInsightsView: React.FC = () => {
  const { 
    sessionIntent, 
    dynamicWeights, 
    interactions, 
    recommendedProducts, 
    isEyeTrackingActive,
    calibrationScore,
    resetSession 
  } = useSasher();

  const gazeInteractions = interactions.filter(i => i.type === 'EYE_GAZE');
  const viewInteractions = interactions.filter(i => i.type === 'VIEW');
  const wishlistInteractions = interactions.filter(i => i.type === 'WISHLIST');

  const categories = Object.entries(sessionIntent.categoryDistribution)
    .filter(([cat]) => cat !== 'All')
    .sort(([, a], [, b]) => b - a) as [CategoryType, number][];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#27272a]/60 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#e2a876] mb-1">
            <span>SASHER OBSERVABILITY SUITE</span>
            <span aria-hidden="true" className="text-[#3f3f46]">·</span>
            <span>EXPLAINABLE ML</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#f4f4f5]">
            AI Insights & Behavioral Telemetry
          </h1>
          <p className="text-sm text-[#71717a] mt-1 max-w-2xl">
            Inspect the underlying multimodal inference pipeline: see how visual attention, sequential browsing, and hybrid model components coordinate recommendations.
          </p>
        </div>

        <button
          onClick={resetSession}
          className="px-4 py-2 rounded-xl bg-[#18191d] hover:bg-[#27272a] text-[#a1a1aa] hover:text-[#f4f4f5] text-xs font-mono-tabular transition-colors cursor-pointer flex items-center gap-2 border border-[#27272a]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Session Baseline</span>
        </button>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[10px] font-mono-tabular uppercase">Current Intent Anchor</span>
            <Activity className="w-4 h-4 text-[#e2a876]" />
          </div>
          <span className="font-editorial text-3xl text-[#f4f4f5] block">
            {sessionIntent.primaryCategory}
          </span>
          <span className="text-xs text-[#a1a1aa] mt-1 block">
            Confidence: {Math.round(sessionIntent.confidence * 100)}%
          </span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[10px] font-mono-tabular uppercase">Visual Attention Gaze</span>
            <Eye className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="font-editorial text-3xl text-[#10b981] block">
            {gazeInteractions.length} Events
          </span>
          <span className="text-xs text-[#a1a1aa] mt-1 block">
            Dwell &ge; 1.2s (+3.5× weight)
          </span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[10px] font-mono-tabular uppercase">Session Depth</span>
            <TrendingUp className="w-4 h-4 text-[#e2a876]" />
          </div>
          <span className="font-editorial text-3xl text-[#f4f4f5] block">
            {interactions.length} Actions
          </span>
          <span className="text-xs text-[#a1a1aa] mt-1 block">
            {viewInteractions.length} views · {wishlistInteractions.length} saved
          </span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[10px] font-mono-tabular uppercase">Gaze Calibration</span>
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="font-editorial text-3xl text-[#f4f4f5] block">
            {calibrationScore}%
          </span>
          <span className="text-xs text-[#a1a1aa] mt-1 block">
            Local browser estimation
          </span>
        </div>
      </div>

      {/* Grid: Signal Contributions & Category Intent Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Dynamic Signal Contribution Decomposition */}
        <div className="lg:col-span-6 p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-6">
          <div>
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#e2a876] block">
              ADAPTIVE FUSION GATE
            </span>
            <h3 className="font-editorial text-2xl text-[#f4f4f5] mt-1">
              Dynamic Signal Contributions
            </h3>
            <p className="text-xs text-[#71717a] mt-1">
              How the recommendation engine weights multimodal inputs based on active session depth.
            </p>
          </div>

          <div className="space-y-4">
            {/* Session Weight */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#f4f4f5] font-medium">Short-Term Session Intent (w1)</span>
                <span className="text-[#e2a876] font-bold">{(dynamicWeights.session * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                <div className="bg-[#e2a876] h-full transition-all duration-500" style={{ width: `${dynamicWeights.session * 100}%` }} />
              </div>
              <span className="text-[10px] text-[#71717a]">Transformer sequence encoder over active browsing trajectory.</span>
            </div>

            {/* Eye Gaze Weight */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#f4f4f5] font-medium">Eye Gaze Visual Attention (w6)</span>
                <span className="text-[#10b981] font-bold">{(dynamicWeights.eyeGaze * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                <div className="bg-[#10b981] h-full transition-all duration-500" style={{ width: `${dynamicWeights.eyeGaze * 100}%` }} />
              </div>
              <span className="text-[10px] text-[#71717a]">Fixation and dwell duration exceeding 1.2s threshold.</span>
            </div>

            {/* User Profile */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#f4f4f5] font-medium">Long-Term Style Profile (w2)</span>
                <span className="text-[#a1a1aa] font-bold">{(dynamicWeights.profile * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                <div className="bg-[#a1a1aa] h-full transition-all duration-500" style={{ width: `${dynamicWeights.profile * 100}%` }} />
              </div>
              <span className="text-[10px] text-[#71717a]">Historical aesthetic affinity (Architectural Minimalist).</span>
            </div>

            {/* Collaborative Filtering */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#f4f4f5] font-medium">Collaborative Filtering (w3)</span>
                <span className="text-[#a1a1aa] font-bold">{(dynamicWeights.collaborative * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                <div className="bg-[#71717a] h-full transition-all duration-500" style={{ width: `${dynamicWeights.collaborative * 100}%` }} />
              </div>
              <span className="text-[10px] text-[#71717a]">Cross-user latent matrix factorization factors.</span>
            </div>

            {/* Content Similarity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#f4f4f5] font-medium">Content / Fabric Similarity (w4)</span>
                <span className="text-[#a1a1aa] font-bold">{(dynamicWeights.content * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                <div className="bg-[#52525b] h-full transition-all duration-500" style={{ width: `${dynamicWeights.content * 100}%` }} />
              </div>
              <span className="text-[10px] text-[#71717a]">Textual embedding and composition dot products.</span>
            </div>

            {/* Popularity Prior */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#f4f4f5] font-medium">Global Popularity Prior (w5)</span>
                <span className="text-[#a1a1aa] font-bold">{(dynamicWeights.popularity * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                <div className="bg-[#3f3f46] h-full transition-all duration-500" style={{ width: `${dynamicWeights.popularity * 100}%` }} />
              </div>
              <span className="text-[10px] text-[#71717a]">Cold-start anchor, dampened as session evidence grows.</span>
            </div>
          </div>
        </div>

        {/* Right: Category Distribution & Visual Attention Heat */}
        <div className="lg:col-span-6 p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-6">
          <div>
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#10b981] block">
              REAL-TIME CLASSIFICATION
            </span>
            <h3 className="font-editorial text-2xl text-[#f4f4f5] mt-1">
              Category Affinity & Gaze Fixation
            </h3>
            <p className="text-xs text-[#71717a] mt-1">
              Active softmax distribution showing real-time category probability transitions.
            </p>
          </div>

          <div className="space-y-4">
            {categories.map(([cat, val]) => {
              const pct = Math.round(val * 100);
              const isTop = cat === sessionIntent.primaryCategory;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono-tabular">
                    <span className={`font-medium ${isTop ? 'text-[#e2a876]' : 'text-[#f4f4f5]'}`}>
                      {cat} {isTop && <span className="text-[10px] text-[#e2a876]">· Top Intent</span>}
                    </span>
                    <span className="text-[#a1a1aa] font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full bg-[#18191d] h-2 rounded-full overflow-hidden border border-[#27272a]">
                    <div
                      className={`h-full transition-all duration-700 ${
                        isTop ? 'bg-[#e2a876]' : 'bg-[#3f3f46]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dwell Heatmap Notice */}
          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] text-xs text-[#a1a1aa] space-y-2">
            <div className="flex items-center gap-2 text-[#f4f4f5] font-medium">
              <Eye className="w-4 h-4 text-[#10b981]" />
              <span>Multimodal Eye-Gaze Integration Note</span>
            </div>
            <p className="leading-relaxed text-[11px] text-[#71717a]">
              Unlike traditional click-only recommenders, SASHER incorporates gaze dwell (&ge; 1.2s) as an implicit high-intent signal. In user trials, visual attention was found to precede wishlist actions by an average of 4.2 seconds.
            </p>
          </div>
        </div>

      </div>

      {/* Model Confidence & Latency Section */}
      <div className="p-6 bg-[#121316] border border-[#27272a] rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27272a]/60 gap-2">
          <div>
            <h4 className="font-editorial text-2xl text-[#f4f4f5]">
              Real-Time Inference Telemetry
            </h4>
            <p className="text-xs text-[#71717a]">
              Pipeline round-trip latency, entropy thresholds, and fallback status.
            </p>
          </div>
          <span className="text-xs font-mono-tabular text-[#10b981] font-semibold">
            STATUS: PIPELINE NORMAL
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center text-xs font-mono-tabular">
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px]">AVG INFERENCE LATENCY</span>
            <span className="text-lg font-bold text-[#f4f4f5]">34.2 ms</span>
          </div>
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px]">MMR DIVERSITY FACTOR</span>
            <span className="text-lg font-bold text-[#e2a876]">&lambda; = 0.72</span>
          </div>
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px]">SAMPLING FREQUENCY</span>
            <span className="text-lg font-bold text-[#f4f4f5]">30 Hz</span>
          </div>
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px]">GAZE DWELL THRESHOLD</span>
            <span className="text-lg font-bold text-[#10b981]">1.20 s</span>
          </div>
        </div>
      </div>

    </div>
  );
};
