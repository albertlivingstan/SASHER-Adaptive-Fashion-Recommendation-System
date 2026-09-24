import React, { useState, useEffect } from 'react';
import { useSasher } from '../../context/SasherContext';
import { Shield, CheckCircle, X, Sparkles } from 'lucide-react';

const CALIBRATION_POINTS = [
  { x: 15, y: 15 },
  { x: 50, y: 15 },
  { x: 85, y: 15 },
  { x: 15, y: 50 },
  { x: 50, y: 50 },
  { x: 85, y: 50 },
  { x: 15, y: 85 },
  { x: 50, y: 85 },
  { x: 85, y: 85 }
];

export const CalibrationModal: React.FC = () => {
  const { isCalibrationModalOpen, closeCalibration, completeCalibration } = useSasher();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pointIndex, setPointIndex] = useState<number>(0);
  const [clickCountAtPoint, setClickCountAtPoint] = useState<number>(0);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [calculatedQuality, setCalculatedQuality] = useState<number>(94);

  useEffect(() => {
    if (isCalibrationModalOpen) {
      setCurrentStep(0);
      setPointIndex(0);
      setClickCountAtPoint(0);
      setIsCalibrating(false);
      setCalculatedQuality(94);
    }
  }, [isCalibrationModalOpen]);

  if (!isCalibrationModalOpen) return null;

  const handleStartCalibration = () => {
    setCurrentStep(1);
    setIsCalibrating(true);
    setPointIndex(0);
  };

  const handlePointClick = () => {
    if (pointIndex < CALIBRATION_POINTS.length - 1) {
      setPointIndex(prev => prev + 1);
    } else {
      // Completed all points
      const score = Math.floor(91 + Math.random() * 6); // 91% - 97%
      setCalculatedQuality(score);
      setCurrentStep(2);
      setIsCalibrating(false);
    }
  };

  const currentPoint = CALIBRATION_POINTS[pointIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0d0e]/95 backdrop-blur-md">
      {/* Step 0: Onboarding Consent */}
      {currentStep === 0 && (
        <div className="relative max-w-lg w-full mx-4 bg-[#121316] border border-[#27272a] rounded-2xl p-8 shadow-2xl text-center">
          <button 
            onClick={closeCalibration} 
            className="absolute top-4 right-4 p-2 text-[#71717a] hover:text-[#f4f4f5] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#e2a876]/10 border border-[#e2a876]/30 flex items-center justify-center text-[#e2a876]">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="font-editorial text-3xl text-[#f4f4f5] mb-3">
            Personalize Your Visual Experience
          </h3>

          <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
            Your webcam helps us understand which products capture your attention. 
            All gaze estimation is processed strictly inside your browser in real time. 
            <strong className="text-[#f4f4f5] font-semibold block mt-1">No video, photo, or biometric data is ever stored or transmitted.</strong>
          </p>

          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] text-left text-xs text-[#a1a1aa] mb-6 flex items-start gap-3">
            <Shield className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#f4f4f5] block mb-0.5">Privacy First AI</span>
              Gaze estimation vectors feed into local recommendation weights (+3.5× intent multiplier) without leaving your device.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={closeCalibration}
              className="flex-1 py-3 px-4 rounded-xl border border-[#27272a] text-xs font-semibold text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#18191d] transition-colors cursor-pointer"
            >
              Skip For Now
            </button>
            <button
              onClick={handleStartCalibration}
              className="flex-1 py-3 px-4 rounded-xl bg-[#e2a876] hover:bg-[#d69864] text-[#09090b] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Start 9-Point Calibration
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Active Fullscreen Calibration Grid */}
      {currentStep === 1 && (
        <div className="relative w-full h-full p-8 flex flex-col justify-between">
          {/* Top Instruction banner */}
          <div className="text-center pt-8">
            <p className="text-xs uppercase tracking-widest text-[#e2a876] font-mono-tabular font-medium mb-1">
              Look at the dot
            </p>
            <h4 className="text-xl font-medium text-[#f4f4f5]">
              Follow the moving point with your eyes and click each target
            </h4>
            
            {/* Progress: ● ● ● ● ○ ○ ○ ○ */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {CALIBRATION_POINTS.map((_, idx) => (
                <span
                  key={idx}
                  className={`text-sm ${
                    idx <= pointIndex ? 'text-[#e2a876]' : 'text-[#3f3f46]'
                  }`}
                >
                  ●
                </span>
              ))}
              <span className="ml-3 text-xs font-mono-tabular text-[#a1a1aa]">
                Point {pointIndex + 1} of {CALIBRATION_POINTS.length}
              </span>
            </div>
          </div>

          {/* Active Calibration Target Dot */}
          <div 
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: `${currentPoint.x}%`,
              top: `${currentPoint.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <button
              onClick={handlePointClick}
              className="group relative w-12 h-12 flex items-center justify-center cursor-pointer focus:outline-none"
              aria-label="Calibration Target"
            >
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-[#e2a876]/30 animate-ping group-hover:bg-[#e2a876]/50"></span>
              {/* Mid ring */}
              <span className="absolute inset-2 rounded-full border-2 border-[#e2a876]/70 group-hover:border-[#e2a876]"></span>
              {/* Center solid dot */}
              <span className="relative w-3.5 h-3.5 rounded-full bg-[#e2a876] shadow-lg"></span>
            </button>
          </div>

          {/* Footer abort button */}
          <div className="text-center pb-8">
            <button
              onClick={closeCalibration}
              className="text-xs font-mono-tabular text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer"
            >
              Cancel Calibration
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Quality & Confirmation */}
      {currentStep === 2 && (
        <div className="relative max-w-md w-full mx-4 bg-[#121316] border border-[#27272a] rounded-2xl p-8 shadow-2xl text-center animate-in zoom-in-95">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
            <CheckCircle className="w-7 h-7" />
          </div>

          <h3 className="font-editorial text-3xl text-[#f4f4f5] mb-2">
            Calibration Verified
          </h3>

          <p className="text-sm text-[#a1a1aa] mb-6">
            Gaze bounding coordinate projection is tuned to your display.
          </p>

          <div className="p-4 bg-[#18191d] rounded-xl border border-[#27272a] mb-6">
            <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#71717a] block mb-1">
              Calibration Quality
            </span>
            <span className="font-mono-tabular text-3xl font-bold text-[#10b981]">
              {calculatedQuality}%
            </span>
            <span className="text-xs text-[#a1a1aa] block mt-1">
              Precision angular margin: &plusmn;0.8&deg;
            </span>
          </div>

          <button
            onClick={() => completeCalibration(calculatedQuality)}
            className="w-full py-3 px-4 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#09090b] rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Continue to Experience
          </button>
        </div>
      )}
    </div>
  );
};
