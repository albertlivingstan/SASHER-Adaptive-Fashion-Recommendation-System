import React from 'react';
import { 
  Database, 
  AlertCircle, 
  FileCode, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface ProductResearchDeepDiveProps {
  productId: string;
  onNavigateToFullResearch?: () => void;
}

export const ProductResearchDeepDive: React.FC<ProductResearchDeepDiveProps> = ({
  productId,
  onNavigateToFullResearch
}) => {
  return (
    <div className="space-y-6 font-sans">
      {/* Header Notice */}
      <div className="p-5 bg-[#18191d] border border-[#27272a] rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#e2a876]">
          <Activity className="w-4 h-4" />
          <span>Evaluation & Longitudinal Research State</span>
        </div>

        <div className="p-4 bg-[#121316] rounded-xl border border-[#3f3f46]/40 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#e2a876] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#f4f4f5]">
              Research analytics will appear after evaluation data is connected.
            </h4>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              In accordance with academic rigor and data integrity standards, historical 3-year sales, return telemetry, and longitudinal research curves are not simulated. Live analytics will activate once your enterprise or research evaluation logs are linked.
            </p>
          </div>
        </div>
      </div>

      {/* Dataset Connection Checklist */}
      <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl space-y-4 text-xs font-mono-tabular">
        <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#f4f4f5] flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>Required Longitudinal Data Feeds</span>
          </span>
          <span className="text-[11px] text-[#e2a876] px-2 py-0.5 bg-[#e2a876]/10 rounded">
            Status: Awaiting Feed
          </span>
        </div>

        <div className="space-y-2.5">
          {[
            {
              field: 'Longitudinal Sales Records (3Y)',
              status: 'Awaiting Connection',
              desc: 'Timestamped transaction volume, units sold, and channel attribution.'
            },
            {
              field: 'Customer Return Telemetry',
              status: 'Awaiting Connection',
              desc: 'Post-purchase return rates, reasons, and fit-certainty correlation.'
            },
            {
              field: 'Recommendation Attribution Logs',
              status: 'Awaiting Connection',
              desc: 'A/B tested offline-replay and live session acceptance logs.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-[#18191d] rounded-xl border border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#f4f4f5] font-semibold block">{item.field}</span>
                <span className="text-[11px] text-[#71717a]">{item.desc}</span>
              </div>
              <span className="text-[10px] text-[#71717a] shrink-0 font-medium px-2 py-1 bg-[#27272a] rounded-lg">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Schema Example */}
      <div className="p-5 bg-[#121316] border border-[#27272a] rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs font-mono-tabular">
          <span className="text-[#71717a] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Evaluation Ingestion Schema (`/api/analytics/evaluate`)</span>
          </span>
        </div>

        <pre className="p-3.5 bg-[#090a0c] rounded-xl border border-[#27272a] text-[11px] font-mono text-[#a1a1aa] overflow-x-auto leading-relaxed">
{`// Connect your real dataset via secure API proxy:
POST /api/analytics/evaluate
{
  "product_id": "${productId}",
  "timeframe": "2024-2026",
  "metrics": ["precision@10", "ndcg@10", "sales_volume", "return_rate"]
}`}
        </pre>
      </div>
    </div>
  );
};
