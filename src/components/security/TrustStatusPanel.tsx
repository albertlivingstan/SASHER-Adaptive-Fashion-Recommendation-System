import React, { useState } from 'react';
import { useSasher } from '../../context/SasherContext';
import { ShieldCheck, ShieldAlert, AlertTriangle, RefreshCw, Zap, Lock } from 'lucide-react';

export const TrustStatusPanel: React.FC = () => {
  const { anomalyState, simulateRoboticAttack, resetAnomalyState } = useSasher();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isFallback = anomalyState.fallbackActive;
  const isSuspicious = anomalyState.status === 'suspicious';

  return (
    <div className={`p-6 rounded-2xl border transition-all ${
      isFallback
        ? 'bg-[#ef4444]/5 border-[#ef4444]/40 text-[#fca5a5]'
        : isSuspicious
        ? 'bg-[#f59e0b]/5 border-[#f59e0b]/40 text-[#fde68a]'
        : 'bg-[#121316] border-[#27272a] text-[#a1a1aa]'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#27272a]/60 gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${
            isFallback
              ? 'bg-[#ef4444]/15 border-[#ef4444]/40 text-[#ef4444]'
              : 'bg-[#10b981]/15 border-[#10b981]/30 text-[#10b981]'
          }`}>
            {isFallback ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-tabular uppercase tracking-wider font-semibold text-[#f4f4f5]">
                SYSTEM GUARDIAN & ANOMALY DETECTION
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono-tabular font-bold ${
                isFallback
                  ? 'bg-[#ef4444] text-[#09090b]'
                  : 'bg-[#10b981]/20 text-[#10b981]'
              }`}>
                {isFallback ? 'ROBUST FALLBACK ACTIVE' : 'GUARDIAN NORMAL'}
              </span>
            </div>
            <p className="text-xs text-[#71717a] mt-0.5">
              IsolationForest behavioral filter isolating robotic poisoning and click-velocity anomalies.
            </p>
          </div>
        </div>

        {/* Action button to test defense */}
        <div className="flex items-center gap-2">
          {!isFallback ? (
            <button
              onClick={simulateRoboticAttack}
              className="px-3.5 py-1.5 rounded-lg bg-[#ef4444]/15 hover:bg-[#ef4444]/25 border border-[#ef4444]/30 text-xs font-mono-tabular text-[#fca5a5] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Attack Burst</span>
            </button>
          ) : (
            <button
              onClick={resetAnomalyState}
              className="px-3.5 py-1.5 rounded-lg bg-[#10b981]/20 hover:bg-[#10b981]/30 border border-[#10b981]/40 text-xs font-mono-tabular text-[#10b981] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore Hybrid Pipeline</span>
            </button>
          )}
        </div>
      </div>

      {/* Warning message if fallback is triggered */}
      {isFallback && (
        <div className="mt-4 p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-start gap-3 text-xs text-[#fca5a5]">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#ef4444]" />
          <div>
            <strong className="block font-semibold">Unusual interaction pattern detected.</strong>
            Recommendation engine switched to robust fallback mode. High-entropy session weights have been temporarily neutralized to prevent model poisoning.
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono-tabular">
        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <span className="text-[#71717a] block text-[10px]">SESSION STATUS</span>
          <span className={`text-sm font-bold ${isFallback ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
            {anomalyState.status.toUpperCase()}
          </span>
        </div>

        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <span className="text-[#71717a] block text-[10px]">ANOMALY SCORE</span>
          <span className={`text-sm font-bold ${anomalyState.anomalyScore > 0.5 ? 'text-[#ef4444]' : 'text-[#f4f4f5]'}`}>
            {anomalyState.anomalyScore.toFixed(3)}
          </span>
        </div>

        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <span className="text-[#71717a] block text-[10px]">EVENTS PROCESSED</span>
          <span className="text-sm font-bold text-[#f4f4f5]">
            {anomalyState.eventsProcessed.toLocaleString()}
          </span>
        </div>

        <div className="p-3 bg-[#18191d] rounded-xl border border-[#27272a]/60">
          <span className="text-[#71717a] block text-[10px]">FALLBACK ENGINE</span>
          <span className={`text-sm font-bold ${isFallback ? 'text-[#ef4444]' : 'text-[#a1a1aa]'}`}>
            {isFallback ? 'ENGAGED' : 'INACTIVE'}
          </span>
        </div>
      </div>
    </div>
  );
};
