import React, { useState } from 'react';
import { useSasher } from '../../context/SasherContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  ShoppingBag, 
  CreditCard, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Layers, 
  Target, 
  PieChart, 
  Clock, 
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';

export const PlatformAnalyticsView: React.FC = () => {
  const { interactions, dynamicWeights, completedOrders, cart } = useSasher();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Comprehensive Platform Telemetry
  const platformFunnel = [
    { stage: '1. Catalog Product Impressions', count: 48290, pct: 100, drop: '0%', color: '#2997ff' },
    { stage: '2. Gaze Fixations Registered', count: 32410, pct: 67.1, drop: '-32.9%', color: '#ff6b1a' },
    { stage: '3. High-Dwell (≥1.2s) Intent Lock', count: 18940, pct: 39.2, drop: '-41.6%', color: '#ff3d7f' },
    { stage: '4. Capsule Project Synthesis', count: 11280, pct: 23.4, drop: '-40.4%', color: '#e07a5f' },
    { stage: '5. Shopping Bag Additions', count: 6420, pct: 13.3, drop: '-43.1%', color: '#10b981' },
    { stage: '6. Payment Authorized & Settled', count: 3890, pct: 8.05, drop: '-39.4%', color: '#30d158' },
  ];

  const categoryDistribution = [
    { category: 'Outerwear', share: 34, aov: '₹21,800', gazeDwell: '2.4s', growth: '+38%' },
    { category: 'Tailoring', share: 28, aov: '₹18,400', gazeDwell: '2.1s', growth: '+26%' },
    { category: 'Knitwear', share: 18, aov: '₹14,200', gazeDwell: '1.8s', growth: '+19%' },
    { category: 'Trousers', share: 12, aov: '₹11,900', gazeDwell: '1.4s', growth: '+14%' },
    { category: 'Footwear & Acc.', share: 8, aov: '₹9,800', gazeDwell: '1.2s', growth: '+9%' },
  ];

  const paymentMethodShare = [
    { method: 'UPI (GPay / PhonePe / QR)', share: 44, volume: '₹3.42 Cr', successRate: '99.4%' },
    { method: 'Credit & Debit Cards (Visa / MC)', share: 36, volume: '₹2.80 Cr', successRate: '98.8%' },
    { method: '0% Interest EMI / BNPL', share: 12, volume: '₹93.2 L', successRate: '97.2%' },
    { method: 'Net Banking (Top 5 Banks)', share: 8, volume: '₹62.1 L', successRate: '98.1%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#27272a] gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2997ff]/10 border border-[#2997ff]/30 text-[#2997ff] text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Cross-Platform Telemetry & Commercial Analytics</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#f5f5f7] tracking-tight">
            Platform Analytics & Funnel Suite
          </h1>
          <p className="text-sm text-[#a1a1a6] mt-1 max-w-2xl">
            Real-time telemetry tracking full-session conversion, gaze attention density, recommender engine latency percentiles, and multi-channel payment performance.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#18181b] border border-[#27272a] rounded-xl self-start md:self-auto text-xs font-mono">
          {(['24h', '7d', '30d'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                timeRange === t ? 'bg-[#27272a] text-[#f5f5f7] font-semibold' : 'text-[#71717a] hover:text-[#f5f5f7]'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stat Cards Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] text-xs font-mono">
            <span>TOTAL GMV VOLUME</span>
            <DollarSign className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#f5f5f7]">₹7.77 Cr</span>
            <span className="text-xs font-mono text-[#10b981] font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +32.4%
            </span>
          </div>
          <span className="text-[11px] text-[#71717a] block mt-1">
            +₹1.84 Cr lift driven by Eye-Gaze Projects
          </span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] text-xs font-mono">
            <span>END-TO-END CONVERSION</span>
            <TrendingUp className="w-4 h-4 text-[#ff6b1a]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#f5f5f7]">8.05%</span>
            <span className="text-xs font-mono text-[#10b981] font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +240%
            </span>
          </div>
          <span className="text-[11px] text-[#71717a] block mt-1">
            vs Industry standard baseline of 2.3%
          </span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] text-xs font-mono">
            <span>AVG PROJECT ORDER VALUE</span>
            <ShoppingBag className="w-4 h-4 text-[#2997ff]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#f5f5f7]">₹38,900</span>
            <span className="text-xs font-mono text-[#10b981] font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +174%
            </span>
          </div>
          <span className="text-[11px] text-[#71717a] block mt-1">
            Project bundling increased single item AOV
          </span>
        </div>

        <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl">
          <div className="flex items-center justify-between text-[#71717a] text-xs font-mono">
            <span>INFERENCE LATENCY (P90)</span>
            <Zap className="w-4 h-4 text-[#ff3d7f]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#f5f5f7]">24.2 ms</span>
            <span className="text-xs font-mono text-[#10b981] font-semibold">Sub-50ms SLA</span>
          </div>
          <span className="text-[11px] text-[#71717a] block mt-1">
            Real-time client-side feature synthesis
          </span>
        </div>
      </div>

      {/* SECTION 1: END-TO-END CONVERSION FUNNEL */}
      <div className="bg-[#121316] border border-[#27272a] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27272a] gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#f5f5f7] font-mono flex items-center gap-2">
              <Target className="w-4 h-4 text-[#ff6b1a]" />
              <span>Full-Session Gaze-to-Checkout Conversion Funnel</span>
            </h3>
            <p className="text-xs text-[#a1a1a6] mt-0.5">
              Visualizing how real-time gaze attention reduces decision latency and drives complete look checkout.
            </p>
          </div>
          <span className="text-xs font-mono text-[#10b981]">
            Active Sessions Sample: 48,290
          </span>
        </div>

        <div className="space-y-4">
          {platformFunnel.map((step, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#f5f5f7] font-medium">{step.stage}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#71717a]">{step.drop !== '0%' ? step.drop : ''}</span>
                  <span className="text-[#a1a1aa] font-semibold">{step.count.toLocaleString('en-IN')}</span>
                  <span className="text-[#f5f5f7] font-bold w-12 text-right">{step.pct}%</span>
                </div>
              </div>
              <div className="w-full bg-[#18181b] h-3 rounded-full overflow-hidden border border-[#27272a]">
                <div 
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${step.pct}%`,
                    backgroundColor: step.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: CATEGORY ATTENTION MATRIX & PAYMENT SHARE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Performance */}
        <div className="lg:col-span-7 bg-[#121316] border border-[#27272a] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <h3 className="text-sm font-semibold text-[#f5f5f7] font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2997ff]" />
              <span>Category Visual Attention Density & AOV</span>
            </h3>
            <span className="text-[11px] font-mono text-[#a1a1aa]">Eye Fixation Analysis</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a]">
                  <th className="pb-2 font-medium">CATEGORY</th>
                  <th className="pb-2 font-medium">ATTENTION SHARE</th>
                  <th className="pb-2 font-medium">AVG DWELL</th>
                  <th className="pb-2 font-medium">AOV</th>
                  <th className="pb-2 font-medium text-right">LIFT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]/50">
                {categoryDistribution.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-[#18181b]/40 transition-colors">
                    <td className="py-2.5 font-medium text-[#f5f5f7]">{cat.category}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#ff6b1a] h-full" style={{ width: `${cat.share * 2.5}%` }} />
                        </div>
                        <span className="text-[#a1a1aa]">{cat.share}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-[#e07a5f]">{cat.gazeDwell}</td>
                    <td className="py-2.5 text-[#f5f5f7]">{cat.aov}</td>
                    <td className="py-2.5 text-right text-[#10b981] font-semibold">{cat.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="lg:col-span-5 bg-[#121316] border border-[#27272a] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <h3 className="text-sm font-semibold text-[#f5f5f7] font-mono flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#10b981]" />
              <span>Payment Gateway Settlement Share</span>
            </h3>
            <span className="text-[11px] font-mono text-[#10b981]">PCI-DSS Level 1</span>
          </div>

          <div className="space-y-3">
            {paymentMethodShare.map((pm, idx) => (
              <div key={idx} className="p-3 bg-[#18181b] rounded-xl border border-[#27272a] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#f5f5f7]">{pm.method}</span>
                  <span className="text-[#ff6b1a] font-bold">{pm.share}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                  <span>Volume: {pm.volume}</span>
                  <span className="text-[#10b981]">Success: {pm.successRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
