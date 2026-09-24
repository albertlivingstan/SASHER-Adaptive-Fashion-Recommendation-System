import React, { useState } from 'react';
import { 
  Activity, 
  BarChart2, 
  PieChart, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  Cpu, 
  Zap, 
  Target, 
  TrendingUp, 
  Layers,
  Sparkles,
  Info,
  RefreshCw
} from 'lucide-react';
import { DUMMY_JSON_FASHION_PRODUCTS } from '../../data/dummyJsonProducts';

export const EvaluationAnalyticsView: React.FC = () => {
  const [activeModelMode, setActiveModelMode] = useState<'hybrid' | 'gaze' | 'semantic'>('hybrid');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(true);
  const [timeframe, setTimeframe] = useState<'1Y' | '2Y' | '3Y'>('3Y');
  const [hoveredQuarterIndex, setHoveredQuarterIndex] = useState<number | null>(null);

  const runEvaluationTest = () => {
    setIsEvaluating(true);
    setEvaluationComplete(false);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationComplete(true);
    }, 1200);
  };

  // Dummy longitudinal trajectory data for global analytics view
  const trajectory1Y = [
    { q: 'Q1 2024', units: 340, fitCertainty: 91.2 },
    { q: 'Q2 2024', units: 410, fitCertainty: 93.5 },
    { q: 'Q3 2024', units: 480, fitCertainty: 94.8 },
    { q: 'Q4 2024', units: 560, fitCertainty: 96.4 }
  ];

  const trajectory2Y = [
    ...trajectory1Y,
    { q: 'Q1 2025', units: 620, fitCertainty: 95.1 },
    { q: 'Q2 2025', units: 710, fitCertainty: 96.8 },
    { q: 'Q3 2025', units: 780, fitCertainty: 97.5 },
    { q: 'Q4 2025', units: 890, fitCertainty: 98.2 }
  ];

  const trajectory3Y = [
    ...trajectory2Y,
    { q: 'Q1 2026', units: 950, fitCertainty: 97.4 },
    { q: 'Q2 2026', units: 1040, fitCertainty: 98.1 },
    { q: 'Q3 2026', units: 1120, fitCertainty: 98.6 },
    { q: 'Q4 2026', units: 1250, fitCertainty: 99.1 }
  ];

  const quarters = timeframe === '1Y' 
    ? trajectory1Y 
    : timeframe === '2Y' 
    ? trajectory2Y 
    : trajectory3Y;

  // SVG Chart Calculations
  const scores = quarters.map(q => q.fitCertainty);
  const minScore = Math.floor(Math.min(...scores) - 3);
  const maxScore = Math.ceil(Math.max(...scores) + 3);
  const scoreRange = Math.max(1, maxScore - minScore);

  const chartHeight = 220;
  const chartWidth = 700;
  const paddingX = 45;
  const paddingY = 25;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  const points = quarters.map((q, idx) => {
    const x = paddingX + (idx / (quarters.length - 1)) * usableWidth;
    const y = chartHeight - paddingY - ((q.fitCertainty - minScore) / scoreRange) * usableHeight;
    return { x, y, q };
  });

  const pathData = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaData = `${pathData} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  const featureWeights = [
    { feature: 'Visual Attention Dwell (Eye-Gaze)', weight: 35, impact: 'High', color: '#ff6b1a' },
    { feature: 'Collaborative Filtering Matrix', weight: 30, impact: 'High', color: '#2997ff' },
    { feature: 'Semantic Style Vector Embedding', weight: 20, impact: 'Medium', color: '#10b981' },
    { feature: 'Verified User Sentiment & Reviews', weight: 15, impact: 'Medium', color: '#e07a5f' }
  ];

  const matchCohortDistribution = [
    { cohort: '90% - 100% Match', count: 42, percentage: 38, color: '#30d158' },
    { cohort: '80% - 89% Match', count: 58, percentage: 52, color: '#2997ff' },
    { cohort: '70% - 79% Match', count: 12, percentage: 10, color: '#ff6b1a' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans text-[#f4f4f5]">
      
      {/* 1. COMPACT RESEARCH-STATUS HEADER */}
      <div className="p-4 sm:p-5 bg-[#18191d] border border-[#27272a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded-lg bg-[#ff6b1a]/15 text-[#ff6b1a] border border-[#ff6b1a]/30 text-xs font-mono font-bold tracking-wider uppercase">
            SYNTHETIC DEMO DATA
          </div>
          <div className="flex items-center gap-2 text-xs text-[#a1a1aa] font-mono">
            <span className="text-[#f4f4f5] font-medium">Demo Dataset</span>
            <span>&middot;</span>
            <span className="text-[#2997ff]">DummyJSON Catalog</span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>Active Model State (v2.4)</span>
          </span>
          <button
            onClick={runEvaluationTest}
            disabled={isEvaluating}
            className="px-3 py-1.5 rounded-xl bg-[#ff6b1a] hover:bg-[#e05a10] text-[#09090b] font-mono font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow"
          >
            <Zap className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
            <span>{isEvaluating ? 'Benchmarking...' : 'Run Benchmark'}</span>
          </button>
        </div>
      </div>

      {/* 2. FOUR EQUAL-HEIGHT EVALUATION METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tabular">
        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Hybrid Precision (P@5)</span>
          <div className="text-2xl font-bold text-[#f5f5f7]">91.8%</div>
          <span className="text-[10px] text-[#10b981]">Top-5 relevance score</span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">NDCG Ranking Metric</span>
          <div className="text-2xl font-bold text-[#2997ff]">0.892</div>
          <span className="text-[10px] text-[#2997ff]">Normalized Discounted Gain</span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Inference Latency P99</span>
          <div className="text-2xl font-bold text-[#f5f5f7]">38.4 ms</div>
          <span className="text-[10px] text-[#10b981]">Sub-50ms compliance</span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Pearson Correlation (r)</span>
          <div className="text-2xl font-bold text-[#e2a876]">r = 0.86</div>
          <span className="text-[10px] text-[#a1a1aa]">Dwell vs Intent metric</span>
        </div>
      </div>

      {/* 3. MAJOR LONGITUDINAL PROTOTYPE TRAJECTORY CHART */}
      <div className="p-5 sm:p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-5 font-mono-tabular">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272a]">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#e2a876]" />
              <span>Longitudinal Prototype Trajectory</span>
            </h4>
            <p className="text-[11px] text-[#71717a] mt-0.5">
              Global Platform Fit &amp; Evaluation Score Trajectory ({timeframe})
            </p>
          </div>

          {/* Timeframe Selector Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#18191d] rounded-xl border border-[#27272a] self-start sm:self-auto text-xs">
            {(['1Y', '2Y', '3Y'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-semibold ${
                  timeframe === tf 
                    ? 'bg-[#f4f4f5] text-[#09090b] shadow' 
                    : 'text-[#71717a] hover:text-[#f4f4f5]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Chart Canvas */}
        <div className="relative pt-2 pb-1">
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-60 overflow-visible">
              <defs>
                <linearGradient id="globalChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2997ff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2997ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const y = paddingY + usableHeight * ratio;
                const val = Math.round(maxScore - ratio * scoreRange);
                return (
                  <g key={idx}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#27272a" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={paddingX - 10} y={y + 4} fill="#71717a" fontSize="10" textAnchor="end" fontFamily="monospace">
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Area under curve */}
              <path d={areaData} fill="url(#globalChartGradient)" />

              {/* Main line */}
              <path d={pathData} fill="none" stroke="#2997ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Points */}
              {points.map((pt, idx) => {
                const isHovered = hoveredQuarterIndex === idx;
                return (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredQuarterIndex(idx)} onMouseLeave={() => setHoveredQuarterIndex(null)}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 4}
                      fill="#0b0b0d"
                      stroke="#2997ff"
                      strokeWidth="2.5"
                      className="transition-all"
                    />
                    {/* X-axis label */}
                    <text x={pt.x} y={chartHeight - 5} fill="#71717a" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {pt.q.q.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hover Tooltip Popup */}
          {hoveredQuarterIndex !== null && quarters[hoveredQuarterIndex] && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#18191d] border border-[#2997ff]/40 rounded-xl p-3 text-xs shadow-2xl z-20 pointer-events-none flex items-center gap-4">
              <div>
                <span className="text-[#71717a] block text-[10px]">Quarter</span>
                <span className="font-bold text-[#f4f4f5]">{quarters[hoveredQuarterIndex].q}</span>
              </div>
              <div>
                <span className="text-[#71717a] block text-[10px]">Fit Certainty</span>
                <span className="font-bold text-[#2997ff]">{quarters[hoveredQuarterIndex].fitCertainty}%</span>
              </div>
              <div>
                <span className="text-[#71717a] block text-[10px]">Demo Units</span>
                <span className="font-bold text-[#e2a876]">{quarters[hoveredQuarterIndex].units}</span>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#71717a] pt-2 border-t border-[#27272a]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2997ff]" />
              <span>Global Fit / Evaluation Score Trajectory</span>
            </span>
          </div>
          <span>Synthetic prototype data &middot; DummyJSON Catalog</span>
        </div>
      </div>

      {/* 4. FEATURE WEIGHTS & MATCH COHORTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Feature Weights */}
        <div className="lg:col-span-7 bg-[#121316] border border-[#27272a] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <h3 className="text-sm font-semibold text-[#f5f5f7] font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#ff6b1a]" />
              <span>Recommendation Feature Importance Weights</span>
            </h3>
            <span className="text-[11px] font-mono text-[#a1a1aa]">SHAP Values</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {featureWeights.map((fw, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#f5f5f7] font-medium">{fw.feature}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#18191d] border border-[#27272a] text-[#a1a1aa]">{fw.impact}</span>
                    <span className="text-[#f5f5f7] font-bold w-10 text-right">{fw.weight}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#18191d] h-3 rounded-full overflow-hidden border border-[#27272a]">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${fw.weight * 2.5}%`, backgroundColor: fw.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#71717a] font-sans pt-2">
            The hybrid scoring engine combines real-time eye-gaze dwell duration with collaborative filtering matrices and semantic text embeddings to compute a mathematically rigorous recommendation match score.
          </p>
        </div>

        {/* Right: Match Cohort Distribution */}
        <div className="lg:col-span-5 bg-[#121316] border border-[#27272a] rounded-2xl p-6 space-y-5 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <h3 className="text-sm font-semibold text-[#f5f5f7] flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#2997ff]" />
              <span>Match Score Cohort Distribution</span>
            </h3>
            <span className="text-[11px] text-[#a1a1aa]">Catalog Split</span>
          </div>

          <div className="space-y-3.5">
            {matchCohortDistribution.map((mc, idx) => (
              <div key={idx} className="p-3.5 bg-[#18191d] border border-[#27272a] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#f5f5f7]">{mc.cohort}</span>
                  <span className="font-bold" style={{ color: mc.color }}>{mc.percentage}% ({mc.count} items)</span>
                </div>
                <div className="w-full bg-[#121316] h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${mc.percentage}%`, backgroundColor: mc.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. RESEARCH INTEGRITY NOTICE */}
      <div className="p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#30d158]" />
          <h3 className="text-sm font-semibold text-[#f5f5f7] font-mono uppercase tracking-wider">
            Academic Research Integrity & Data Governance
          </h3>
        </div>
        <p className="text-xs text-[#a1a1a6] leading-relaxed font-sans max-w-4xl">
          “Synthetic values generated for UI and algorithm prototyping only. They do not represent real customer behavior or longitudinal research results.” All product catalog records are dynamically sourced from the DummyJSON API (<code className="text-[#2997ff] font-mono">dummyjson.com/products</code>).
        </p>
      </div>

    </div>
  );
};
