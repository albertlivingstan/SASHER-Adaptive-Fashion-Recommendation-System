import React, { useState } from 'react';
import { useSasher } from '../../context/SasherContext';
import { Eye, EyeOff, CheckCircle2, Sliders, Shield, Terminal, RefreshCw, X } from 'lucide-react';

export const VisualIntentControl: React.FC = () => {
  const { 
    isEyeTrackingActive, 
    toggleEyeTracking, 
    calibrationScore, 
    openCalibration,
    currentGazeTarget,
    toggleGazeDebug,
    isGazeDebugOpen
  } = useSasher();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-22 right-4 sm:right-6 z-30 font-sans">
      {/* Collapsed Pill Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex flex-col items-start bg-[#121316]/95 hover:bg-[#18191d] border border-[#27272a] hover:border-[#3f3f46] rounded-xl px-3.5 py-2.5 shadow-2xl backdrop-blur-md transition-all cursor-pointer text-left"
          aria-label="Open Visual Intent Panel"
        >
          <div className="flex items-center justify-between w-full gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#f4f4f5]">
              <Eye className={`w-3.5 h-3.5 ${isEyeTrackingActive ? 'text-[#e2a876]' : 'text-[#71717a]'}`} />
              <span>Visual Intent</span>
            </span>
            <span className={`text-[10px] font-mono-tabular uppercase tracking-wider font-semibold ${
              isEyeTrackingActive ? 'text-[#10b981]' : 'text-[#71717a]'
            }`}>
              {isEyeTrackingActive ? 'ACTIVE' : 'PAUSED'}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#a1a1aa] font-mono-tabular">
            <span className="flex items-center gap-1">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                isEyeTrackingActive ? 'bg-[#10b981] animate-pulse' : 'bg-[#71717a]'
              }`} />
              <span>{isEyeTrackingActive ? 'Tracking' : 'Sensors Off'}</span>
            </span>
            {isEyeTrackingActive && (
              <>
                <span className="text-[#3f3f46]">·</span>
                <span>Calib {calibrationScore}%</span>
              </>
            )}
          </div>
        </button>
      )}

      {/* Expanded Elegant Attention Panel */}
      {isOpen && (
        <div className="w-80 bg-[#121316] border border-[#27272a] rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]/60">
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#f4f4f5]">
                Visual Attention
              </h4>
              <p className="text-[11px] text-[#71717a]">Gaze-Driven Re-ranking</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#71717a] hover:text-[#f4f4f5] rounded-md transition-colors cursor-pointer"
              aria-label="Close attention panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body stats */}
          <div className="py-3 space-y-3">
            {/* Status indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a1a1aa]">Sensor Status</span>
              <span className="flex items-center gap-1.5 font-mono-tabular font-medium text-[#f4f4f5]">
                <span className={`w-2 h-2 rounded-full ${isEyeTrackingActive ? 'bg-[#10b981] animate-ping' : 'bg-[#71717a]'}`} />
                {isEyeTrackingActive ? 'Tracking Active' : 'Sensors Paused'}
              </span>
            </div>

            {/* Calibration */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a1a1aa]">Gaze Calibration</span>
              <span className="font-mono-tabular text-[#f4f4f5] font-medium flex items-center gap-1">
                <span>{calibrationScore}%</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              </span>
            </div>

            {/* Current Focus */}
            <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]/70">
              <span className="text-[10px] uppercase tracking-wider text-[#71717a] block mb-1">
                Current Focus
              </span>
              <p className="text-xs font-medium text-[#f4f4f5] truncate">
                {currentGazeTarget ? `"${currentGazeTarget.productName}"` : 'Scanning catalog (no focal target)'}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#27272a]/50 text-[11px] font-mono-tabular">
                <div>
                  <span className="text-[#71717a] block text-[10px]">Dwell Time</span>
                  <span className="text-[#e2a876] font-semibold">
                    {currentGazeTarget ? `${currentGazeTarget.dwellSeconds}s` : '0.0s'}
                  </span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[10px]">Intent Contribution</span>
                  <span className="text-[#10b981] font-semibold">
                    {currentGazeTarget?.dwellSeconds && currentGazeTarget.dwellSeconds >= 1.2 ? '+3.5×' : '+1.0×'}
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-2 text-[10px] text-[#71717a] bg-[#18191d]/50 p-2 rounded-md">
              <Shield className="w-3.5 h-3.5 text-[#71717a] shrink-0 mt-0.5" />
              <span>Webcam calculations run strictly client-side. No video, images, or biometric telemetry are ever stored or transmitted.</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-[#27272a]/60 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={toggleEyeTracking}
                className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isEyeTrackingActive 
                    ? 'bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5]'
                    : 'bg-[#e2a876] hover:bg-[#d69864] text-[#09090b]'
                }`}
              >
                {isEyeTrackingActive ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Pause Tracking</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Resume Tracking</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  openCalibration();
                }}
                className="w-full py-2 px-3 bg-[#18191d] hover:bg-[#27272a] text-[#f4f4f5] border border-[#27272a] rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#a1a1aa]" />
                <span>Recalibrate</span>
              </button>
            </div>

            {/* Technical Debug HUD trigger */}
            <button
              onClick={() => {
                toggleGazeDebug();
              }}
              className="w-full py-1.5 text-center text-[10px] font-mono-tabular text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Terminal className="w-3 h-3" />
              <span>{isGazeDebugOpen ? 'Hide Gaze Debug HUD' : 'Researcher Gaze Debug Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
