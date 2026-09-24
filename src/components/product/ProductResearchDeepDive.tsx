import React, { useState } from 'react';
import { 
  getProductResearchById, 
  ProductSalesResearch, 
  YearlySalesData 
} from '../../data/productResearch';
import { 
  TrendingUp, 
  Eye, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Percent, 
  DollarSign, 
  Activity, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

interface ProductResearchDeepDiveProps {
  productId: string;
  onNavigateToFullResearch?: () => void;
}

type MetricMode = 'sales_volume' | 'engagement_dynamics' | 'quarterly_seasonality';

export const ProductResearchDeepDive: React.FC<ProductResearchDeepDiveProps> = ({
  productId,
  onNavigateToFullResearch
}) => {
  const [activeMode, setActiveMode] = useState<MetricMode>('sales_volume');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [hoveredQuarter, setHoveredQuarter] = useState<string | null>(null);

  const research: ProductSalesResearch = getProductResearchById(productId);
  const { yearlySales, quarterlySales2025, cumulativeReturnReductionPct } = research;

  // Chart dimensions for responsive SVG
  const width = 540;
  const height = 180;
  const padding = { top: 25, right: 35, bottom: 35, left: 55 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Revenue domain
  const maxRevenue = Math.max(...yearlySales.map(d => d.revenueInLakhs)) * 1.15;
  const minRevenue = 0;

  // Conversion domain (0 to 8%)
  const maxConversion = 8.0;

  // Return domain (0 to 25%)
  const maxReturn = 26.0;

  // Compute SVG coordinates for Yearly Sales
  const pointsRevenue = yearlySales.map((d, i) => {
    const x = padding.left + (i / (yearlySales.length - 1)) * chartW;
    const y = padding.top + chartH - ((d.revenueInLakhs - minRevenue) / (maxRevenue - minRevenue)) * chartH;
    return { ...d, x, y };
  });

  const pointsConversion = yearlySales.map((d, i) => {
    const x = padding.left + (i / (yearlySales.length - 1)) * chartW;
    const y = padding.top + chartH - (d.conversionRate / maxConversion) * chartH;
    return { ...d, x, y };
  });

  const pointsReturn = yearlySales.map((d, i) => {
    const x = padding.left + (i / (yearlySales.length - 1)) * chartW;
    const y = padding.top + chartH - (d.returnRate / maxReturn) * chartH;
    return { ...d, x, y };
  });

  // SVG Path generation helper
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) * 0.45;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) * 0.55;
      const cp2y = p1.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const revenueLinePath = createSmoothPath(pointsRevenue);
  const revenueAreaPath = `${revenueLinePath} L ${pointsRevenue[pointsRevenue.length - 1].x} ${padding.top + chartH} L ${pointsRevenue[0].x} ${padding.top + chartH} Z`;

  const conversionLinePath = createSmoothPath(pointsConversion);
  const returnLinePath = createSmoothPath(pointsReturn);

  // Active hover year data
  const activeYearData = yearlySales.find(d => d.year === hoveredYear) || yearlySales[yearlySales.length - 1];

  return (
    <div className="p-4 sm:p-5 bg-[#15161a] border border-[#27272a] rounded-xl space-y-4">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272a]/70">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono-tabular uppercase tracking-wider text-[#e2a876]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Product Research Deep Dive</span>
            <span className="text-[#3f3f46]">·</span>
            <span className="text-[#10b981]">3-Year Empirical Audit</span>
          </div>
          <h4 className="font-editorial text-lg text-[#f4f4f5] mt-0.5">
            Longitudinal Sales Trends & Engagement Metrics
          </h4>
        </div>

        {/* View Mode Pills */}
        <div className="flex items-center gap-1 p-1 bg-[#18191d] rounded-lg border border-[#27272a] self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('sales_volume')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono-tabular transition-colors cursor-pointer ${
              activeMode === 'sales_volume'
                ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            Sales & Revenue
          </button>
          <button
            onClick={() => setActiveMode('engagement_dynamics')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono-tabular transition-colors cursor-pointer ${
              activeMode === 'engagement_dynamics'
                ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            Attention & Returns
          </button>
          <button
            onClick={() => setActiveMode('quarterly_seasonality')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono-tabular transition-colors cursor-pointer ${
              activeMode === 'quarterly_seasonality'
                ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            2025 Quarterly
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono-tabular">
        <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]/60">
          <span className="text-[10px] text-[#71717a] block uppercase">Cumulative Revenue</span>
          <span className="text-base font-bold text-[#f4f4f5] mt-0.5 block">
            ₹{research.totalHistoricalRevenueLakhs.toFixed(1)}L
          </span>
          <span className="text-[10px] text-[#10b981]">+382% 3Y Growth</span>
        </div>

        <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]/60">
          <span className="text-[10px] text-[#71717a] block uppercase">Return Reduction</span>
          <span className="text-base font-bold text-[#10b981] mt-0.5 block">
            -{cumulativeReturnReductionPct}%
          </span>
          <span className="text-[10px] text-[#71717a]">Gaze Drape Certainty</span>
        </div>

        <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]/60">
          <span className="text-[10px] text-[#71717a] block uppercase">Sell-Through Rate</span>
          <span className="text-base font-bold text-[#e2a876] mt-0.5 block">
            {activeYearData.fullPriceSellThroughRate}%
          </span>
          <span className="text-[10px] text-[#71717a]">Zero Discounting</span>
        </div>

        <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]/60">
          <span className="text-[10px] text-[#71717a] block uppercase">SASHER Attribution</span>
          <span className="text-base font-bold text-[#f4f4f5] mt-0.5 block">
            {activeYearData.sasherAttributedRevenuePct}%
          </span>
          <span className="text-[10px] text-[#10b981]">Algorithmic Intent</span>
        </div>
      </div>

      {/* GRAPHICAL REPRESENTATION: Responsive SVG Charts */}
      <div className="p-3 bg-[#111215] border border-[#27272a] rounded-xl relative">
        {activeMode === 'sales_volume' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tabular px-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#e2a876]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e2a876]" />
                  <span>Annual Revenue (₹ Lakhs)</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#a1a1aa]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#71717a]" />
                  <span>Units Sold</span>
                </span>
              </div>
              <span className="text-[#71717a] text-[11px]">Hover nodes to inspect values</span>
            </div>

            <div className="w-full overflow-hidden">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-auto select-none"
                style={{ maxHeight: '200px' }}
              >
                <defs>
                  <linearGradient id={`revGrad-${productId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2a876" stopOpacity="0.32" />
                    <stop offset="85%" stopColor="#e2a876" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#e2a876" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                  const y = padding.top + chartH * (1 - pct);
                  const val = (minRevenue + pct * (maxRevenue - minRevenue)).toFixed(0);
                  return (
                    <g key={idx}>
                      <line 
                        x1={padding.left} 
                        y1={y} 
                        x2={width - padding.right} 
                        y2={y} 
                        stroke="#27272a" 
                        strokeDasharray="3,3" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={padding.left - 8} 
                        y={y + 3} 
                        fill="#71717a" 
                        fontSize="9" 
                        fontFamily="monospace" 
                        textAnchor="end"
                      >
                        ₹{val}L
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Area */}
                <path d={revenueAreaPath} fill={`url(#revGrad-${productId})`} />

                {/* Revenue Line */}
                <path 
                  d={revenueLinePath} 
                  fill="none" 
                  stroke="#e2a876" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* Secondary Unit Volume Bar Stems */}
                {pointsRevenue.map((pt, i) => {
                  const barH = (pt.unitsSold / 1200) * 40;
                  return (
                    <g key={`stem-${i}`}>
                      <line 
                        x1={pt.x} 
                        y1={padding.top + chartH} 
                        x2={pt.x} 
                        y2={padding.top + chartH - barH} 
                        stroke="#3f3f46" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                    </g>
                  );
                })}

                {/* Data Points */}
                {pointsRevenue.map((pt, i) => {
                  const isHovered = hoveredYear === pt.year;
                  return (
                    <g 
                      key={pt.year}
                      onMouseEnter={() => setHoveredYear(pt.year)}
                      onMouseLeave={() => setHoveredYear(null)}
                      className="cursor-pointer"
                    >
                      {/* Interactive Target */}
                      <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />
                      
                      {/* Pulse ring on hover */}
                      {isHovered && (
                        <circle cx={pt.x} cy={pt.y} r="8" fill="none" stroke="#e2a876" strokeWidth="1.5" className="animate-ping" />
                      )}

                      {/* Dot */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isHovered ? "5.5" : "4"} 
                        fill="#09090b" 
                        stroke="#e2a876" 
                        strokeWidth={isHovered ? "2.5" : "2"} 
                      />

                      {/* X-Axis Label */}
                      <text 
                        x={pt.x} 
                        y={height - 12} 
                        fill={isHovered ? "#f4f4f5" : "#a1a1aa"} 
                        fontSize="10" 
                        fontFamily="monospace" 
                        fontWeight={isHovered ? "bold" : "normal"}
                        textAnchor="middle"
                      >
                        {pt.year}{pt.year === 2026 ? ' (YTD)' : ''}
                      </text>

                      {/* Value callout above node */}
                      <text 
                        x={pt.x} 
                        y={pt.y - 10} 
                        fill="#f4f4f5" 
                        fontSize="9" 
                        fontFamily="monospace" 
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ₹{pt.revenueInLakhs.toFixed(1)}L
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {activeMode === 'engagement_dynamics' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tabular px-1">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#10b981]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span>Conversion Rate (%) &uarr;</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#ef4444]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span>Customer Return Rate (%) &darr;</span>
                </span>
              </div>
              <span className="text-[#71717a] text-[11px]">Hover nodes for details</span>
            </div>

            <div className="w-full overflow-hidden">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-auto select-none"
                style={{ maxHeight: '200px' }}
              >
                {/* Reference Grid lines */}
                {[0, 0.33, 0.66, 1].map((pct, idx) => {
                  const y = padding.top + chartH * (1 - pct);
                  return (
                    <g key={idx}>
                      <line 
                        x1={padding.left} 
                        y1={y} 
                        x2={width - padding.right} 
                        y2={y} 
                        stroke="#27272a" 
                        strokeDasharray="3,3" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={padding.left - 8} 
                        y={y + 3} 
                        fill="#71717a" 
                        fontSize="9" 
                        fontFamily="monospace" 
                        textAnchor="end"
                      >
                        {(pct * 25).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}

                {/* Return Rate Line (Falling) */}
                <path 
                  d={returnLinePath} 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeDasharray="4,4" 
                  strokeLinecap="round" 
                />

                {/* Conversion Rate Line (Rising) */}
                <path 
                  d={conversionLinePath} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />

                {/* Nodes */}
                {yearlySales.map((d, i) => {
                  const x = padding.left + (i / (yearlySales.length - 1)) * chartW;
                  const yConv = padding.top + chartH - (d.conversionRate / maxConversion) * chartH;
                  const yRet = padding.top + chartH - (d.returnRate / maxReturn) * chartH;
                  const isHovered = hoveredYear === d.year;

                  return (
                    <g 
                      key={d.year}
                      onMouseEnter={() => setHoveredYear(d.year)}
                      onMouseLeave={() => setHoveredYear(null)}
                      className="cursor-pointer"
                    >
                      {/* Conversion Node */}
                      <circle cx={x} cy={yConv} r="4.5" fill="#09090b" stroke="#10b981" strokeWidth="2" />
                      <text x={x} y={yConv - 8} fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        {d.conversionRate}%
                      </text>

                      {/* Return Node */}
                      <circle cx={x} cy={yRet} r="4.5" fill="#09090b" stroke="#ef4444" strokeWidth="2" />
                      <text x={x} y={yRet + 15} fill="#ef4444" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        {d.returnRate}%
                      </text>

                      {/* Year Label */}
                      <text 
                        x={x} 
                        y={height - 12} 
                        fill={isHovered ? "#f4f4f5" : "#a1a1aa"} 
                        fontSize="10" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {d.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {activeMode === 'quarterly_seasonality' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tabular px-1">
              <span className="text-[#a1a1aa]">2025 Seasonal Revenue Distribution by Quarter</span>
              <span className="text-[#e2a876] font-semibold">Q4 Peak Sell-Through</span>
            </div>

            {/* Responsive SVG Bar Chart */}
            <div className="w-full overflow-hidden">
              <svg 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-auto select-none"
                style={{ maxHeight: '200px' }}
              >
                {/* Horizontal guide lines */}
                {[0.25, 0.5, 0.75, 1].map((pct, idx) => {
                  const y = padding.top + chartH * (1 - pct);
                  return (
                    <line 
                      key={idx}
                      x1={padding.left} 
                      y1={y} 
                      x2={width - padding.right} 
                      y2={y} 
                      stroke="#27272a" 
                      strokeDasharray="3,3" 
                      strokeWidth="1" 
                    />
                  );
                })}

                {/* Bars */}
                {quarterlySales2025.map((q, idx) => {
                  const maxQRev = Math.max(...quarterlySales2025.map(d => d.revenueInLakhs)) * 1.25;
                  const barWidth = 65;
                  const barSpacing = chartW / quarterlySales2025.length;
                  const x = padding.left + idx * barSpacing + (barSpacing - barWidth) / 2;
                  const barH = (q.revenueInLakhs / maxQRev) * chartH;
                  const y = padding.top + chartH - barH;
                  const isHovered = hoveredQuarter === q.quarter;

                  return (
                    <g 
                      key={q.quarter}
                      onMouseEnter={() => setHoveredQuarter(q.quarter)}
                      onMouseLeave={() => setHoveredQuarter(null)}
                      className="cursor-pointer"
                    >
                      {/* Bar */}
                      <rect 
                        x={x} 
                        y={y} 
                        width={barWidth} 
                        height={barH} 
                        rx="4" 
                        fill={isHovered ? "#e2a876" : "#27272a"} 
                        stroke={isHovered ? "#f4f4f5" : "#3f3f46"}
                        strokeWidth="1"
                        className="transition-colors duration-200"
                      />

                      {/* Revenue Label */}
                      <text 
                        x={x + barWidth / 2} 
                        y={y - 8} 
                        fill="#f4f4f5" 
                        fontSize="9" 
                        fontFamily="monospace" 
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ₹{q.revenueInLakhs.toFixed(1)}L
                      </text>

                      {/* Quarter Label */}
                      <text 
                        x={x + barWidth / 2} 
                        y={height - 14} 
                        fill={isHovered ? "#e2a876" : "#a1a1aa"} 
                        fontSize="10" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {q.quarter.split(' ')[0]}
                      </text>

                      {/* Top Region Label */}
                      <text 
                        x={x + barWidth / 2} 
                        y={height - 3} 
                        fill="#71717a" 
                        fontSize="7.5" 
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {q.topRegion.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* Dynamic Detail Card of currently selected Year / Quarter */}
        <div className="mt-2 pt-2 border-t border-[#27272a]/60 flex flex-wrap items-center justify-between text-xs font-mono-tabular text-[#a1a1aa] gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#f4f4f5] font-semibold">
              FY{activeYearData.year} Snapshot:
            </span>
            <span>{activeYearData.unitsSold.toLocaleString()} units sold</span>
            <span className="text-[#3f3f46]">·</span>
            <span className="text-[#10b981]">Conv. {activeYearData.conversionRate}%</span>
            <span className="text-[#3f3f46]">·</span>
            <span className="text-[#ef4444]">Returns {activeYearData.returnRate}%</span>
          </div>

          {onNavigateToFullResearch && (
            <button
              onClick={onNavigateToFullResearch}
              className="text-[11px] text-[#e2a876] hover:text-[#f4f4f5] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore in Research Lab</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
