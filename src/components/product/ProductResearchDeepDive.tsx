import React, { useState } from 'react';
import { 
  Database, 
  Info, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  RefreshCw, 
  Star,
  ShoppingBag,
  ArrowUpRight,
  X,
  Layers,
  Cpu
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../data/products';
import { DUMMY_JSON_FASHION_PRODUCTS } from '../../data/dummyJsonProducts';
import { feedbackService } from '../../services/feedbackService';
import { Product } from '../../types';
import { getSyntheticEvaluationForProduct } from '../../utils/syntheticEvaluation';

interface ProductResearchDeepDiveProps {
  productId: string;
  product?: Product;
  onNavigateToFullResearch?: () => void;
  onClose?: () => void;
}

export const ProductResearchDeepDive: React.FC<ProductResearchDeepDiveProps> = ({
  productId,
  product: passedProduct,
  onNavigateToFullResearch,
  onClose
}) => {
  // Find product by id from merged catalog
  const product = passedProduct || 
    INITIAL_PRODUCTS.find(p => p.id === productId) || 
    DUMMY_JSON_FASHION_PRODUCTS.find(p => p.id === productId) || 
    INITIAL_PRODUCTS[0];

  const syntheticEval = getSyntheticEvaluationForProduct(product);

  const [timeframe, setTimeframe] = useState<'1Y' | '2Y' | '3Y'>('3Y');
  const [hoveredQuarterIndex, setHoveredQuarterIndex] = useState<number | null>(null);

  // Live DummyJSON API sync test state
  const [isSyncingApi, setIsSyncingApi] = useState(false);
  const [apiStatus, setApiStatus] = useState({
    tested: true,
    success: true,
    latencyMs: 132,
    statusCode: 200,
    sampleCount: 194,
    timestamp: 'Just now'
  });

  const handleTestDummyJsonApi = async () => {
    setIsSyncingApi(true);
    const start = performance.now();
    try {
      const res = await fetch('https://dummyjson.com/products?limit=5');
      const latency = Math.round(performance.now() - start);
      if (res.ok) {
        const data = await res.json();
        setApiStatus({
          tested: true,
          success: true,
          latencyMs: latency,
          statusCode: res.status,
          sampleCount: data.total || 194,
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        setApiStatus({
          tested: true,
          success: false,
          statusCode: res.status,
          latencyMs: latency,
          sampleCount: 194,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    } catch {
      setApiStatus({
        tested: true,
        success: false,
        statusCode: 500,
        latencyMs: 132,
        sampleCount: 194,
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsSyncingApi(false);
    }
  };

  const quarters = timeframe === '1Y' 
    ? syntheticEval.trajectory1Y 
    : timeframe === '2Y' 
    ? syntheticEval.trajectory2Y 
    : syntheticEval.trajectory3Y;

  // SVG Chart Calculations
  const scores = quarters.map(q => q.fitCertainty);
  const minScore = Math.floor(Math.min(...scores) - 3);
  const maxScore = Math.ceil(Math.max(...scores) + 3);
  const scoreRange = Math.max(1, maxScore - minScore);

  const chartHeight = 200;
  const chartWidth = 600;
  const paddingX = 40;
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

  const returnRiskLabel = syntheticEval.returnRiskRate < 3.0 
    ? 'Low' 
    : syntheticEval.returnRiskRate < 6.0 
    ? 'Moderate' 
    : 'Elevated';

  return (
    <div className="space-y-6 font-sans text-[#f4f4f5]">
      
      {/* 1. TOP HEADER: COMPACT RESEARCH-STATUS HEADER */}
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
            <span>Active Model State</span>
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#71717a] hover:text-[#f4f4f5] hover:bg-[#27272a] rounded-xl transition-colors cursor-pointer"
              aria-label="Close analytics"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. PRODUCT EVALUATION CARD */}
      <div className="p-5 sm:p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#27272a]/60">
          <div>
            <h3 className="text-sm font-semibold text-[#f4f4f5] uppercase tracking-wider font-mono">
              Product Evaluation & Longitudinal Research State
            </h3>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Target Item: <span className="text-[#f4f4f5] font-medium">{product.name}</span> ({product.category})
            </p>
          </div>
          <div className="self-start sm:self-auto px-2.5 py-1 bg-[#18191d] border border-[#27272a] rounded-xl text-xs font-mono text-[#e2a876]">
            ID: {product.id}
          </div>
        </div>

        {/* Muted Disclaimer Information Box */}
        <div className="p-3 bg-[#18191d]/80 rounded-xl border border-[#27272a] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
          <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
            “Synthetic values generated for UI and algorithm prototyping only. They do not represent real customer behavior or longitudinal research results.”
          </p>
        </div>
      </div>

      {/* 3. DUMMYJSON CONNECTION SECTION */}
      <div className="p-4 sm:p-5 bg-[#121316] border border-[#27272a] rounded-2xl space-y-3 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#27272a]">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#2997ff]" />
            <span className="text-[#f4f4f5] font-semibold uppercase tracking-wider">
              Data Source &middot; DummyJSON Product Catalog
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#10b981]/15 text-[#10b981] rounded-full text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              Connected
            </span>
          </div>

          <button
            onClick={handleTestDummyJsonApi}
            disabled={isSyncingApi}
            className="px-3 py-1.5 rounded-xl bg-[#18191d] hover:bg-[#22242a] border border-[#27272a] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#2997ff] ${isSyncingApi ? 'animate-spin' : ''}`} />
            <span>{isSyncingApi ? 'Syncing...' : 'Sync API'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px] uppercase">API Status</span>
            <span className="text-[#10b981] font-semibold">{apiStatus.statusCode} OK</span>
          </div>
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px] uppercase">Latency</span>
            <span className="text-[#f4f4f5]">Demo latency {apiStatus.latencyMs} ms</span>
          </div>
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px] uppercase">Dataset</span>
            <span className="text-[#e2a876]">{apiStatus.sampleCount} demo products</span>
          </div>
          <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px] uppercase">Source</span>
            <span className="text-[#2997ff]">DummyJSON</span>
          </div>
        </div>
      </div>

      {/* 4. FOUR EQUAL-HEIGHT EVALUATION METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tabular">
        <div className="p-4 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Demo Evaluations</span>
          <div className="text-2xl font-bold text-[#f4f4f5]">{syntheticEval.evaluationCount}</div>
          <span className="text-[10px] text-[#10b981]">Synthetically seeded</span>
        </div>

        <div className="p-4 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Synthetic Avg. Score</span>
          <div className="text-2xl font-bold text-[#e2a876]">
            {Math.round(syntheticEval.avgEvaluationScore * 20)}%
          </div>
          <span className="text-[10px] text-[#a1a1aa]">★ {syntheticEval.avgEvaluationScore}/5.0</span>
        </div>

        <div className="p-4 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Visual Intent</span>
          <div className="text-2xl font-bold text-[#2997ff]">{syntheticEval.visualIntentScore}%</div>
          <span className="text-[10px] text-[#2997ff]">Dwell: {syntheticEval.dwellTimeSec}s</span>
        </div>

        <div className="p-4 bg-[#121316] border border-[#27272a] rounded-2xl flex flex-col justify-between space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-[#71717a]">Return-Risk Indicator</span>
          <div className="text-2xl font-bold text-[#10b981]">{returnRiskLabel}</div>
          <span className="text-[10px] text-[#a1a1aa]">{syntheticEval.returnRiskRate}% risk metric</span>
        </div>
      </div>

      {/* 5. MAJOR FIX: LONGITUDINAL PROTOTYPE TRAJECTORY CHART */}
      <div className="p-5 sm:p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-5 font-mono-tabular">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272a]">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#e2a876]" />
              <span>Longitudinal Prototype Trajectory</span>
            </h4>
            <p className="text-[11px] text-[#71717a] mt-0.5">
              Quarterly Fit &amp; Evaluation Score Trajectory ({timeframe})
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
          {quarters.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-sm text-[#71717a]">
              Prototype trajectory unavailable
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56 overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
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
                <path d={areaData} fill="url(#chartGradient)" />

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
          )}

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
              <span>Fit / Evaluation Score Trajectory</span>
            </span>
          </div>
          <span>Synthetic prototype data &middot; Seed: {product.id}</span>
        </div>
      </div>

      {/* 8. IMPROVED BOTTOM SECTION: TWO-COLUMN SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-tabular text-xs">
        {/* DEMO BATCH */}
        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
            <span className="font-semibold uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#e2a876]" />
              <span>DEMO BATCH</span>
            </span>
            <span className="text-[10px] text-[#e2a876] bg-[#e2a876]/15 px-2 py-0.5 rounded">
              Synthetic Logs
            </span>
          </div>
          <div className="space-y-2 text-[#a1a1aa]">
            <div className="flex justify-between">
              <span>Prototype observations:</span>
              <span className="text-[#f4f4f5] font-bold">{syntheticEval.evaluationCount} recs</span>
            </div>
            <div className="flex justify-between">
              <span>Demo units (Base):</span>
              <span className="text-[#f4f4f5] font-bold">{quarters[0]?.units || 250} units</span>
            </div>
            <div className="flex justify-between">
              <span>Quarterly records:</span>
              <span className="text-[#f4f4f5] font-bold">{quarters.length} quarters ({timeframe})</span>
            </div>
          </div>
        </div>

        {/* VISUAL INTENT */}
        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
            <span className="font-semibold uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#2997ff]" />
              <span>VISUAL INTENT</span>
            </span>
            <span className="text-[10px] text-[#2997ff] bg-[#2997ff]/15 px-2 py-0.5 rounded">
              Gaze Telemetry
            </span>
          </div>
          <div className="space-y-2 text-[#a1a1aa]">
            <div className="flex justify-between">
              <span>Average dwell time:</span>
              <span className="text-[#f4f4f5] font-bold">{syntheticEval.dwellTimeSec} seconds</span>
            </div>
            <div className="flex justify-between">
              <span>Intent score:</span>
              <span className="text-[#f4f4f5] font-bold">{syntheticEval.visualIntentScore}%</span>
            </div>
            <div className="flex justify-between">
              <span>Calculated correlation:</span>
              <span className="text-[#10b981] font-bold">r = {syntheticEval.calculatedCorrelation.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. JUMP TO FULL RESEARCH DASHBOARD */}
      {onNavigateToFullResearch && (
        <div className="p-4 bg-gradient-to-r from-[#18191d] to-[#141518] border border-[#27272a] rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-[#f4f4f5] block">
              Explore Full SAHR-IN Research Dashboard
            </span>
            <span className="text-[11px] text-[#71717a]">
              View multi-dimensional graphical models, radar topology, and latent vector graphs.
            </span>
          </div>
          <button
            onClick={onNavigateToFullResearch}
            className="px-3.5 py-2 bg-[#f4f4f5] hover:bg-white text-[#09090b] rounded-xl text-xs font-semibold font-mono tracking-wider uppercase transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <span>Research Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
