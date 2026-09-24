import React, { useState, useEffect } from 'react';
import { useSasher } from '../../context/SasherContext';
import { Terminal, X, Crosshair } from 'lucide-react';

export const GazeDebugModal: React.FC = () => {
  const { 
    isGazeDebugOpen, 
    toggleGazeDebug, 
    lastGazeCoordinates, 
    currentGazeTarget, 
    calibrationScore,
    isEyeTrackingActive,
    dynamicWeights,
    anomalyState
  } = useSasher();

  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateSize = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  if (!isGazeDebugOpen) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 w-84 bg-[#090a0c]/95 border border-[#3f3f46] rounded-xl p-4 shadow-2xl backdrop-blur-xl font-mono text-[11px] text-[#e4e4e7]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#27272a] text-[#a1a1aa]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#e2a876]" />
          <span className="font-semibold text-xs text-[#f4f4f5] tracking-wider uppercase">GAZE DEBUG HUD</span>
        </div>
        <button
          onClick={toggleGazeDebug}
          className="text-[#71717a] hover:text-[#f4f4f5] transition-colors cursor-pointer"
          aria-label="Close Debug"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of coordinates */}
      <div className="py-2.5 space-y-2 border-b border-[#27272a]/70">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px]">CURRENT GAZE X</span>
            <span className="text-[#10b981] font-bold text-xs tabular-nums">{lastGazeCoordinates.x} px</span>
          </div>
          <div className="p-1.5 bg-[#121316] rounded border border-[#27272a]">
            <span className="text-[#71717a] block text-[10px]">CURRENT GAZE Y</span>
            <span className="text-[#10b981] font-bold text-xs tabular-nums">{lastGazeCoordinates.y} px</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[#a1a1aa] px-1">
          <span>Viewport:</span>
          <span className="text-[#f4f4f5] tabular-nums">{viewport.width} &times; {viewport.height}</span>
        </div>

        <div className="flex items-center justify-between text-[#a1a1aa] px-1">
          <span>Calibration Quality:</span>
          <span className="text-[#10b981] font-medium tabular-nums">{calibrationScore}% (active)</span>
        </div>
      </div>

      {/* Target inspection */}
      <div className="py-2.5 space-y-1.5 border-b border-[#27272a]/70">
        <div className="text-[10px] text-[#71717a] uppercase tracking-wider">Target Resolution</div>
        <div>
          <span className="text-[#a1a1aa]">Target Product: </span>
          <span className="text-[#f4f4f5] font-semibold">
            {currentGazeTarget ? `${currentGazeTarget.productName} (#${currentGazeTarget.productId})` : 'None (Saccade)'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#a1a1aa]">Dwell Timer:</span>
          <span className="text-[#e2a876] font-bold tabular-nums">
            {currentGazeTarget ? `${currentGazeTarget.dwellSeconds}s` : '0.00s'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#a1a1aa]">Discrete Event:</span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
            currentGazeTarget?.status === 'interest_confirmed' 
              ? 'bg-[#10b981]/20 text-[#10b981]' 
              : 'text-[#71717a]'
          }`}>
            {currentGazeTarget?.status === 'interest_confirmed' ? 'EYE_GAZE' : 'SEARCHING'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#a1a1aa]">Intent Weight:</span>
          <span className="text-[#f4f4f5] tabular-nums">
            {currentGazeTarget?.status === 'interest_confirmed' ? '3.5× multiplier' : '1.0×'}
          </span>
        </div>
      </div>

      {/* Dynamic Weight Vector */}
      <div className="pt-2 text-[10px] text-[#71717a]">
        <div className="flex justify-between mb-1">
          <span>DYNAMIC WEIGHTS:</span>
          <span className="text-[#a1a1aa]">w_gaze: {dynamicWeights.eyeGaze}</span>
        </div>
        <div className="text-[9px] text-[#52525b] truncate">
          w_s:{dynamicWeights.session} | w_p:{dynamicWeights.profile} | w_cf:{dynamicWeights.collaborative} | w_c:{dynamicWeights.content}
        </div>
      </div>
    </div>
  );
};
