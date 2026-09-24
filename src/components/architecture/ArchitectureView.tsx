import React, { useState } from 'react';
import { ARCHITECTURE_PIPELINE_STAGES } from '../../data/research';
import { 
  Cpu, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  Eye, 
  Terminal, 
  Code2 
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('session_transformer');

  const activeStage = ARCHITECTURE_PIPELINE_STAGES.find(s => s.id === selectedStageId) || ARCHITECTURE_PIPELINE_STAGES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="pb-8 border-b border-[#27272a]/60">
        <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#e2a876] mb-1">
          <span>SYSTEM SPECIFICATION</span>
          <span aria-hidden="true" className="text-[#3f3f46]">·</span>
          <span>NEURAL PIPELINE FLOW</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#f4f4f5]">
          How SASHER Operates
        </h1>
        <p className="text-sm text-[#71717a] mt-1 max-w-2xl">
          An end-to-end interactive inspection of SASHER&apos;s adaptive recommendation topology from real-time browser sensors to diverse recommendation generation.
        </p>
      </div>

      {/* Interactive Pipeline Nodes (Clickable flow) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono-tabular">
          <span>PIPELINE SEQUENCE: CLICK ANY COMPONENT TO INSPECT</span>
          <span className="text-[#e2a876]">ACTIVE NODE: {activeStage.title}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ARCHITECTURE_PIPELINE_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-[#18191d] border-[#e2a876] shadow-xl ring-1 ring-[#e2a876]/30'
                    : 'bg-[#121316] border-[#27272a] hover:border-[#3f3f46]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-tabular text-xs font-bold text-[#e2a876]">
                      {stage.stepNumber}
                    </span>
                    <span className="text-[10px] uppercase font-mono-tabular text-[#71717a]">
                      {stage.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#f4f4f5] leading-tight">
                    {stage.title}
                  </h4>
                </div>

                <div className="text-[10px] text-[#71717a] flex items-center justify-between pt-2 border-t border-[#27272a]/60 font-mono-tabular">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3 text-[#a1a1aa]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Detail Card */}
      <div className="p-8 bg-[#121316] border border-[#27272a] rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#e2a876] mb-1">
              <span>STAGE {activeStage.stepNumber}</span>
              <span className="text-[#3f3f46]">·</span>
              <span>{activeStage.category}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#f4f4f5]">
              {activeStage.headline}
            </h2>
            <p className="text-sm text-[#a1a1aa] mt-1">{activeStage.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="p-5 bg-[#18191d] rounded-xl border border-[#27272a] space-y-3">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#71717a] block">
              ALGORITHMIC PURPOSE
            </span>
            <p className="text-sm text-[#e4e4e7] leading-relaxed">
              {activeStage.purpose}
            </p>
          </div>

          <div className="p-5 bg-[#18191d] rounded-xl border border-[#27272a] space-y-3">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#71717a] block">
              DATA FLOW & TRANSFORMATION
            </span>
            <div className="space-y-2 font-mono-tabular text-[11px]">
              <div>
                <span className="text-[#71717a] block text-[10px]">INPUT SIGNALS:</span>
                <span className="text-[#f4f4f5]">{activeStage.inputs}</span>
              </div>
              <div className="pt-2 border-t border-[#27272a]/60">
                <span className="text-[#71717a] block text-[10px]">OUTPUT TENSORS / SLATES:</span>
                <span className="text-[#10b981]">{activeStage.outputs}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tech Stack Chips for this stage */}
        <div className="pt-4 border-t border-[#27272a]/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono-tabular text-[#71717a] mr-2">TECHNOLOGIES:</span>
          {activeStage.technologies.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-[#18191d] border border-[#27272a] text-xs font-mono-tabular text-[#e2a876]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Technology Showcase Section (Rule 21) */}
      <div className="p-8 bg-[#121316] border border-[#27272a] rounded-2xl space-y-6">
        <div className="pb-4 border-b border-[#27272a]/60">
          <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#10b981] block">
            PRODUCTION ARCHITECTURE STACK
          </span>
          <h3 className="font-editorial text-2xl text-[#f4f4f5] mt-1">
            Enterprise & Research Technology Foundation
          </h3>
          <p className="text-xs text-[#71717a] mt-0.5">
            Full decoupled architecture separating high-throughput inference from client-side visual sensors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          
          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] space-y-2">
            <div className="flex items-center gap-2 text-[#f4f4f5] font-semibold">
              <Code2 className="w-4 h-4 text-[#e2a876]" />
              <span>Frontend Layer</span>
            </div>
            <p className="text-[11px] text-[#71717a]">
              React 19, TypeScript, Tailwind CSS, Lucide, Motion, WebGazer client-side gaze estimation.
            </p>
          </div>

          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] space-y-2">
            <div className="flex items-center gap-2 text-[#f4f4f5] font-semibold">
              <Cpu className="w-4 h-4 text-[#10b981]" />
              <span>Deep Learning / ML</span>
            </div>
            <p className="text-[11px] text-[#71717a]">
              PyTorch Transformer sequence encoder, Faiss dense vector search, TF-IDF content similarity.
            </p>
          </div>

          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] space-y-2">
            <div className="flex items-center gap-2 text-[#f4f4f5] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
              <span>Security Guardian</span>
            </div>
            <p className="text-[11px] text-[#71717a]">
              Scikit-learn IsolationForest anomaly detection, event velocity filter, robust fallback switch.
            </p>
          </div>

          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] space-y-2">
            <div className="flex items-center gap-2 text-[#f4f4f5] font-semibold">
              <Database className="w-4 h-4 text-[#a1a1aa]" />
              <span>Backend & Telemetry</span>
            </div>
            <p className="text-[11px] text-[#71717a]">
              FastAPI asynchronous engine, WebSockets bidirectional streaming, SQLAlchemy persistence.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
