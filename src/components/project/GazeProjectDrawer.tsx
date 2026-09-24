import React, { useState } from 'react';
import { useSasher } from '../../context/SasherContext';
import { Sparkles, Eye, ShoppingBag, X, Check, ArrowRight, Layers, Tag, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { SuggestedProject, GazeProductAnalysis } from '../../services/projectSuggestionService';

export const GazeProjectDrawer: React.FC = () => {
  const {
    activeSuggestedProject,
    activeGazeAnalysis,
    isProjectDrawerOpen,
    setIsProjectDrawerOpen,
    addAllProjectItemsToCart,
    addToCart,
    currentGazeTarget
  } = useSasher();

  const [isExpanded, setIsExpanded] = useState(true);
  const [addedAll, setAddedAll] = useState(false);

  if (!isProjectDrawerOpen || !activeSuggestedProject) return null;

  const handleAddAll = () => {
    addAllProjectItemsToCart(activeSuggestedProject);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2400);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto sm:max-w-2xl z-45 font-sans">
      <div className="relative bg-[#121316]/98 border border-[#27272a] hover:border-[#3f3f46] rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300">
        
        {/* Top Gradient Accent Bar */}
        <div 
          className="h-1 w-full"
          style={{ background: 'var(--brand-gradient)' }}
        />

        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-[#27272a]/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff6b1a]/10 border border-[#ff6b1a]/30 flex items-center justify-center text-[#ff6b1a] shrink-0">
              <Eye className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#ff6b1a]/15 text-[#ff6b1a] font-semibold">
                  Visual Attention Locked
                </span>
                <span className="text-xs text-[#71717a]">·</span>
                <span className="text-xs font-mono text-[#a1a1aa]">
                  {activeGazeAnalysis?.dwellSeconds || 1.2}s Gaze Fixation
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#f5f5f7] mt-0.5 flex items-center gap-2">
                <span>{activeSuggestedProject.title}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-[#71717a] hover:text-[#f5f5f7] rounded-lg transition-colors cursor-pointer"
              aria-label={isExpanded ? "Collapse project preview" : "Expand project preview"}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsProjectDrawerOpen(false)}
              className="p-1.5 text-[#71717a] hover:text-[#f5f5f7] rounded-lg transition-colors cursor-pointer"
              aria-label="Close project drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Real-Time Eye Gaze Visual Analysis Breakdown */}
            {activeGazeAnalysis && (
              <div className="p-3 bg-[#18181b]/70 border border-[#27272a] rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1aa] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff3d7f]" />
                    <span>Eye Attention Feature Analysis</span>
                  </span>
                  <span className="text-xs font-mono text-[#10b981]">
                    Stability {activeGazeAnalysis.fixationStabilityScore}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {activeGazeAnalysis.focusBreakdown.map((item, idx) => (
                    <div key={idx} className="bg-[#121316] p-2 rounded-lg border border-[#27272a]/60">
                      <div className="flex items-center justify-between text-[10px] text-[#71717a] mb-1">
                        <span className="truncate">{item.feature}</span>
                        <span className="font-mono text-[#f5f5f7] font-semibold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#a1a1aa] leading-relaxed pt-1">
                  {activeSuggestedProject.conceptNarrative}
                </p>
              </div>
            )}

            {/* Assembled Project Pieces */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs uppercase font-mono tracking-wider text-[#a1a1aa] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#2997ff]" />
                  <span>Curated Project Pieces ({activeSuggestedProject.allProducts.length})</span>
                </span>
                <span className="text-xs font-mono text-[#ff6b1a]">
                  Synergy {activeSuggestedProject.styleSynergyScore}%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {activeSuggestedProject.allProducts.map((item, idx) => {
                  const isAnchor = item.id === activeSuggestedProject.anchorProduct.id;
                  return (
                    <div
                      key={item.id}
                      className={`relative bg-[#18181b] rounded-xl border p-2 flex flex-col justify-between transition-all group ${
                        isAnchor 
                          ? 'border-[#ff6b1a]/70 ring-1 ring-[#ff6b1a]/30' 
                          : 'border-[#27272a] hover:border-[#3f3f46]'
                      }`}
                    >
                      {isAnchor && (
                        <span className="absolute top-2 left-2 z-10 text-[9px] font-mono uppercase tracking-wider bg-[#ff6b1a] text-black px-1.5 py-0.5 rounded font-bold">
                          Gaze Focus
                        </span>
                      )}

                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#121316] mb-2">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#71717a] block truncate uppercase">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-medium text-[#f5f5f7] line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-xs font-mono text-[#e4e4e7] block mt-1 font-semibold">
                          {item.currency}{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Price Summary */}
            <div className="pt-3 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#71717a]">Project Bundle:</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#f5f5f7]">
                    {activeSuggestedProject.currency}{activeSuggestedProject.projectBundlePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-mono text-[#71717a] line-through">
                    {activeSuggestedProject.currency}{activeSuggestedProject.totalRetailPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#10b981]/15 text-[#10b981]">
                    Save {activeSuggestedProject.currency}{activeSuggestedProject.bundleSavings.toLocaleString('en-IN')} (15%)
                  </span>
                </div>
                <span className="text-[11px] text-[#71717a] block mt-0.5">
                  Dynamic ensemble pricing applied for complete look.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleAddAll}
                  disabled={addedAll}
                  data-magnetic
                  className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    addedAll
                      ? 'bg-[#10b981] text-[#09090b]'
                      : 'bg-[#f5f5f7] hover:bg-[#e4e4e7] text-[#0b0b0d] shadow-lg'
                  }`}
                >
                  {addedAll ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Project Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Complete Project ({activeSuggestedProject.allProducts.length} Items)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
