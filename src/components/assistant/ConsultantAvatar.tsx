import React from 'react';

export interface ConsultantAvatarProps {
  isSpeaking?: boolean;
  isWalking?: boolean;
  isWaving?: boolean;
  className?: string;
}

/**
 * Animated Professional Fashion Consultant (Julian Laurent)
 * Designed as an elegant, couture stylist.
 * Features:
 * - Walking motion (alternating leg strides, arm swing, subtle walk bob)
 * - Waving greeting gesture (elevated arm waving "Hi!")
 * - Speaking animation (expressive lip movement)
 * - Idle breathing & blinking
 * - Respects prefers-reduced-motion
 */
export const ConsultantAvatar: React.FC<ConsultantAvatarProps> = ({ 
  isSpeaking = false,
  isWalking = false,
  isWaving = false,
  className = "w-36 h-64"
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <style>{`
        @keyframes consultantBreathe {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.008); }
        }
        @keyframes consultantBlink {
          0%, 94%, 98%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.08); }
        }
        @keyframes consultantGesture {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.2deg); }
        }
        @keyframes consultantSpeak {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.2); }
        }
        /* Walking Animations */
        @keyframes consultantWalkBob {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-5px); }
          50% { transform: translateY(0px); }
          75% { transform: translateY(-5px); }
        }
        @keyframes consultantLegLeftStride {
          0%, 100% { transform: rotate(-16deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes consultantLegRightStride {
          0%, 100% { transform: rotate(16deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes consultantArmLeftSwing {
          0%, 100% { transform: rotate(20deg); }
          50% { transform: rotate(-20deg); }
        }
        @keyframes consultantArmRightSwing {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        /* Waving Animation */
        @keyframes consultantWaveArm {
          0%, 100% { transform: rotate(-45deg); }
          25% { transform: rotate(-65deg); }
          50% { transform: rotate(-45deg); }
          75% { transform: rotate(-65deg); }
        }
        @keyframes consultantWaveHand {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(24deg); }
        }

        .consultant-torso {
          animation: consultantBreathe 4s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .consultant-eyelids {
          animation: consultantBlink 4.5s infinite;
          transform-origin: center;
        }
        .consultant-gesture-arm {
          animation: consultantGesture 5s ease-in-out infinite;
          transform-origin: top left;
        }
        .consultant-speaking-mouth {
          animation: consultantSpeak 0.22s ease-in-out infinite;
          transform-origin: center;
        }

        .consultant-is-walking {
          animation: consultantWalkBob 0.65s ease-in-out infinite !important;
        }
        .consultant-leg-left-walk {
          animation: consultantLegLeftStride 0.65s ease-in-out infinite;
          transform-origin: 68px 172px;
        }
        .consultant-leg-right-walk {
          animation: consultantLegRightStride 0.65s ease-in-out infinite;
          transform-origin: 92px 172px;
        }
        .consultant-arm-left-walk {
          animation: consultantArmLeftSwing 0.65s ease-in-out infinite;
          transform-origin: 50px 92px;
        }
        .consultant-arm-right-walk {
          animation: consultantArmRightSwing 0.65s ease-in-out infinite;
          transform-origin: 110px 92px;
        }
        .consultant-waving-arm {
          animation: consultantWaveArm 1s ease-in-out infinite;
          transform-origin: 110px 92px;
        }
        .consultant-waving-hand {
          animation: consultantWaveHand 0.5s ease-in-out infinite;
          transform-origin: 120px 145px;
        }

        @media (prefers-reduced-motion: reduce) {
          .consultant-torso,
          .consultant-eyelids,
          .consultant-gesture-arm,
          .consultant-speaking-mouth,
          .consultant-is-walking,
          .consultant-leg-left-walk,
          .consultant-leg-right-walk,
          .consultant-arm-left-walk,
          .consultant-arm-right-walk,
          .consultant-waving-arm,
          .consultant-waving-hand {
            animation: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 160 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-2xl overflow-visible ${isWalking ? 'consultant-is-walking' : ''}`}
        aria-label="Julian Laurent - Fashion Consultant"
      >
        {/* Floor Shadow */}
        <ellipse 
          cx="80" 
          cy="292" 
          rx={isWalking ? "40" : "46"} 
          ry={isWalking ? "5" : "6"} 
          fill="rgba(0,0,0,0.35)" 
          className="transition-all duration-300"
        />

        {/* LEGS & SHOES */}
        <g id="legs">
          {/* Left Leg */}
          <g className={isWalking ? 'consultant-leg-left-walk' : ''}>
            <path
              d="M 62 170 L 60 274 L 74 274 L 76 172 Z"
              fill="#18191d"
              stroke="#27272a"
              strokeWidth="0.8"
            />
            <line x1="67" y1="180" x2="67" y2="270" stroke="#2b2d33" strokeWidth="0.8" />
            {/* Left Shoe */}
            <path
              d="M 57 274 C 57 274 54 282 54 286 C 54 289 60 289 74 289 C 76 289 76 280 76 274 Z"
              fill="#09090b"
            />
            <path d="M 54 286 L 76 286" stroke="#e2a876" strokeWidth="0.5" opacity="0.6" />
          </g>

          {/* Right Leg */}
          <g className={isWalking ? 'consultant-leg-right-walk' : ''}>
            <path
              d="M 84 172 L 86 274 L 100 274 L 98 170 Z"
              fill="#18191d"
              stroke="#27272a"
              strokeWidth="0.8"
            />
            <line x1="93" y1="180" x2="93" y2="270" stroke="#2b2d33" strokeWidth="0.8" />
            {/* Right Shoe */}
            <path
              d="M 84 274 C 84 280 84 289 86 289 C 100 289 106 289 106 286 C 106 282 103 274 103 274 Z"
              fill="#09090b"
            />
            <path d="M 84 286 L 106 286" stroke="#e2a876" strokeWidth="0.5" opacity="0.6" />
          </g>
        </g>

        {/* TORSO & BLAZER (Animated with breathing or walk bob) */}
        <g className={!isWalking ? "consultant-torso" : ""} id="torso">
          {/* Inner Knitwear / Mockneck */}
          <path
            d="M 70 76 L 90 76 L 92 110 L 68 110 Z"
            fill="#0c0d0e"
          />
          <line x1="72" y1="84" x2="88" y2="84" stroke="#27272a" strokeWidth="1" />

          {/* Left Arm / Sleeve */}
          <g className={isWalking ? 'consultant-arm-left-walk' : ''}>
            <path
              d="M 46 88 L 38 160 L 48 164 L 56 94 Z"
              fill="#22242a"
              stroke="#16171a"
              strokeWidth="0.8"
            />
            {/* Left Hand / Cuff */}
            <path d="M 40 160 L 48 162 L 47 166 L 39 164 Z" fill="#ffffff" />
            <path
              d="M 39 164 C 39 164 36 178 40 182 C 44 184 48 178 48 172 L 46 164 Z"
              fill="#d8a47f"
            />
          </g>

          {/* Right Arm (Waving gesture, Walking swing, or Resting stance) */}
          {isWaving ? (
            <g className="consultant-waving-arm">
              {/* Arm raised up waving */}
              <path
                d="M 110 92 L 126 55 L 136 58 L 118 96 Z"
                fill="#22242a"
                stroke="#16171a"
                strokeWidth="0.8"
              />
              <path d="M 125 55 L 135 58 L 134 52 L 124 50 Z" fill="#ffffff" />
              {/* Hand waving */}
              <g className="consultant-waving-hand">
                <path
                  d="M 126 50 C 126 50 128 36 136 34 C 142 36 142 46 138 52 Z"
                  fill="#d8a47f"
                />
                {/* Waving fingers */}
                <line x1="130" y1="36" x2="134" y2="30" stroke="#d8a47f" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="134" y1="36" x2="138" y2="31" stroke="#d8a47f" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="137" y1="37" x2="142" y2="33" stroke="#d8a47f" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            </g>
          ) : isWalking ? (
            <g className="consultant-arm-right-walk">
              <path
                d="M 114 88 L 122 152 L 112 156 L 104 94 Z"
                fill="#22242a"
                stroke="#16171a"
                strokeWidth="0.8"
              />
              <path d="M 112 152 L 120 150 L 121 154 L 113 156 Z" fill="#ffffff" />
              <path
                d="M 112 156 C 112 156 116 172 121 172 C 125 170 123 158 121 152 Z"
                fill="#d8a47f"
              />
            </g>
          ) : (
            <g className="consultant-gesture-arm">
              <path
                d="M 114 88 L 122 152 L 112 156 L 104 94 Z"
                fill="#22242a"
                stroke="#16171a"
                strokeWidth="0.8"
              />
              <path d="M 112 152 L 120 150 L 121 154 L 113 156 Z" fill="#ffffff" />
              <path
                d="M 112 156 C 112 156 116 172 121 172 C 125 170 123 158 121 152 Z"
                fill="#d8a47f"
              />
              {/* Minimalist Lookbook Swatch / Pen */}
              <rect x="117" y="162" width="5" height="16" rx="1.5" fill="#e2a876" />
            </g>
          )}

          {/* Tailored Single-Breasted Blazer Body */}
          <path
            d="M 52 86 L 108 86 L 114 176 L 46 176 Z"
            fill="#272930"
            stroke="#18191d"
            strokeWidth="1"
          />

          {/* Sculpted Lapels */}
          <path
            d="M 54 86 L 76 86 L 80 134 L 56 122 Z"
            fill="#1f2026"
            stroke="#121316"
            strokeWidth="0.8"
          />
          <path
            d="M 106 86 L 84 86 L 80 134 L 104 122 Z"
            fill="#1f2026"
            stroke="#121316"
            strokeWidth="0.8"
          />

          {/* Pocket Square / Silk Accent */}
          <polygon points="62,108 67,102 70,108" fill="#e2a876" opacity="0.9" />
          <line x1="60" y1="108" x2="72" y2="108" stroke="#121316" strokeWidth="1.2" />

          {/* Blazer Button */}
          <circle cx="80" cy="140" r="2.5" fill="#121316" stroke="#e2a876" strokeWidth="0.6" />

          {/* Flap Pockets */}
          <rect x="52" y="148" width="18" height="2.5" rx="0.5" fill="#18191d" />
          <rect x="90" y="148" width="18" height="2.5" rx="0.5" fill="#18191d" />

          {/* NECK & HEAD */}
          <rect x="74" y="60" width="12" height="18" rx="2" fill="#d8a47f" />
          <path d="M 74 68 L 86 68" stroke="#be8967" strokeWidth="1" opacity="0.4" />

          {/* Head Shape */}
          <path
            d="M 68 40 C 68 28 92 28 92 40 C 92 56 88 64 80 64 C 72 64 68 56 68 40 Z"
            fill="#d8a47f"
          />

          {/* Hair - Neat Contemporary Chic Styling */}
          <path
            d="M 66 38 C 66 22 75 16 88 18 C 96 20 95 30 94 36 C 92 32 86 30 80 30 C 74 30 68 33 66 38 Z"
            fill="#18181b"
          />
          <path d="M 67 36 L 69 46 L 72 44 L 70 36 Z" fill="#18181b" />

          {/* Eyebrows */}
          <path d="M 72 37 Q 76 35 78 37" stroke="#27272a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 82 37 Q 84 35 88 37" stroke="#27272a" strokeWidth="1.2" strokeLinecap="round" />

          {/* Eyes (Blinking Animation) */}
          <g className="consultant-eyelids">
            <circle cx="75" cy="42" r="1.6" fill="#18181b" />
            <circle cx="85" cy="42" r="1.6" fill="#18181b" />
            {/* Catchlight */}
            <circle cx="75.6" cy="41.5" r="0.5" fill="#ffffff" />
            <circle cx="85.6" cy="41.5" r="0.5" fill="#ffffff" />
          </g>

          {/* Nose */}
          <path d="M 80 41 L 79 48 L 82 48" stroke="#be8967" strokeWidth="1" strokeLinecap="round" />

          {/* Mouth (Talking Animation when speaking / smiling when waving) */}
          {isSpeaking ? (
            <g>
              <ellipse cx="80" cy="55" rx="3.5" ry="2.2" fill="#7a3e2a" className="consultant-speaking-mouth" />
              <path
                d="M 76 54 Q 80 57 84 54"
                stroke="#a66e50"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          ) : isWaving ? (
            <path
              d="M 76 53 Q 80 57 84 53"
              stroke="#a66e50"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M 77 54 Q 80 56 83 54"
              stroke="#a66e50"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          )}

          {/* Refined Minimalist Glasses (Tortoise / Wireframe Accent) */}
          <rect x="71" y="38" width="8" height="7" rx="2" fill="none" stroke="#27272a" strokeWidth="0.9" />
          <rect x="81" y="38" width="8" height="7" rx="2" fill="none" stroke="#27272a" strokeWidth="0.9" />
          <line x1="79" y1="41" x2="81" y2="41" stroke="#27272a" strokeWidth="0.9" />
        </g>
      </svg>
    </div>
  );
};
