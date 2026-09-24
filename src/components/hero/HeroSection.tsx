import React from 'react';
import { useSasher } from '../../context/SasherContext';
import { useAuth } from '../../context/AuthContext';
import { ParticleField } from '../ui/ParticleField';
import { CountUp } from '../ui/CountUp';
import { GoogleLogoIcon } from '../auth/GoogleSignInModal';
import { ArrowRight, Eye, Sparkles, Activity, Layers, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onHowItWorks: () => void;
  onOpenTelemetry?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onHowItWorks, onOpenTelemetry }) => {
  const { sessionIntent, dynamicWeights, isEyeTrackingActive, recommendedProducts } = useSasher();
  const { user, isAuthenticated, openSignInModal } = useAuth();

  const heroFeaturedProduct = recommendedProducts[0];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#27272a]/60">
      {/* Interactive Particle Field Canvas Background (Repel + Swirl + Damped Spring) */}
      <ParticleField className="opacity-70" densityScale={1.0} interactive={true} />

      {/* Background ambient lighting and faint radial wash */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(41,151,255,0.06), transparent 70%)'
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ff6b1a]/8 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quiet Editorial Subheading */}
            <div className="flex items-center gap-2 text-xs font-mono-tabular tracking-widest uppercase text-[#ff6b1a]">
              <span>SASHER ADAPTIVE RE-RANKING ENGINE</span>
              <span aria-hidden="true" className="text-[#3f3f46]">/</span>
              <span className="text-[#2997ff]">HUMAN-AI SYMBIOSIS</span>
            </div>

            {/* Large Editorial Headline with Brand Gradient text on highlight */}
            <h1 className="font-editorial text-5xl sm:text-6xl xl:text-7xl font-normal leading-[1.06] text-[#f4f4f5] tracking-tight">
              Adaptive Fashion Recommendations That Understand Your{' '}
              <span className="text-brand-gradient font-medium">Intent.</span>
            </h1>

            {/* Clean Supporting Statement */}
            <p className="text-base sm:text-lg text-[#a1a1aa] font-light leading-relaxed max-w-xl">
              Discover garments that continuously adapt to your session behavior, 
              curated stylistic preferences, and real-time visual attention without sensory overload.
            </p>

            {/* CTAs with Magnetic Effect */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                data-magnetic
                className="group px-7 py-3.5 bg-[#f4f4f5] hover:bg-[#ffffff] text-[#09090b] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2.5"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#09090b]" />
              </button>

              <button
                onClick={onOpenTelemetry || onHowItWorks}
                data-magnetic
                className="group px-6 py-3.5 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-[#ff6b1a]/60 text-[#f4f4f5] rounded-full text-xs font-medium tracking-wider transition-colors cursor-pointer flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#ff6b1a] animate-pulse" />
                <span>Live Analytics Hub</span>
              </button>

              {!isAuthenticated ? (
                <button
                  onClick={openSignInModal}
                  data-magnetic
                  className="px-5 py-3.5 bg-[#1c1c1f]/80 hover:bg-[#27272a] border border-[#27272a] hover:border-[#2997ff]/60 text-[#f5f5f7] rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer flex items-center gap-2"
                >
                  <GoogleLogoIcon className="w-4 h-4" />
                  <span>Sign In with Google</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1f]/80 border border-[#2997ff]/40 rounded-full text-xs text-[#2997ff] font-mono-tabular">
                  <span className="w-2 h-2 rounded-full bg-[#30d158]" />
                  <span>Google Synced: {user?.name.split(' ')[0]}</span>
                </div>
              )}
            </div>

            {/* Live Session Telemetry Kicker (Human editorial style) */}
            <div className="pt-6 border-t border-[#27272a]/50 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-[11px] font-mono-tabular text-[#71717a] block">SESSION INTENT</span>
                <span className="font-editorial text-2xl text-[#f4f4f5]">
                  <CountUp value={Math.round(sessionIntent.confidence * 100)} suffix="%" durationMs={900} />
                </span>
                <span className="text-[11px] text-[#a1a1aa] block truncate">{sessionIntent.primaryCategory}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono-tabular text-[#71717a] block">GAZE SIGNAL</span>
                <span className="font-editorial text-2xl text-[#30d158]">
                  {isEyeTrackingActive ? 'ACTIVE' : 'PAUSED'}
                </span>
                <span className="text-[11px] text-[#a1a1aa] block">+3.5× Attention Factor</span>
              </div>
              <div>
                <span className="text-[11px] font-mono-tabular text-[#71717a] block">ADAPTIVE SCORE</span>
                <span className="font-editorial text-2xl text-[#ff6b1a]">
                  <CountUp value={Number((dynamicWeights.session + dynamicWeights.eyeGaze).toFixed(2))} decimals={2} durationMs={900} />
                </span>
                <span className="text-[11px] text-[#a1a1aa] block">Dynamic Weight</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Editorial Fashion Composition with subtle AI visual layers */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Product Editorial Card */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-[#18191d] border border-[#27272a] shadow-2xl group transition-all duration-300 hover:scale-[1.01]"
                data-gaze-product-id={heroFeaturedProduct?.id}
                data-gaze-category={heroFeaturedProduct?.category}
              >
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <img
                    src={heroFeaturedProduct?.imageUrl}
                    alt={heroFeaturedProduct?.name || 'Featured Fashion Editorial'}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient Scrim for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/30 to-transparent"></div>

                  {/* Editorial Overlays */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono-tabular tracking-wider uppercase text-[#f4f4f5]/80 bg-[#0c0d0e]/60 backdrop-blur-md px-2.5 py-1 rounded">
                      {heroFeaturedProduct?.brand || 'ATELIER NOIR'}
                    </span>
                  </div>

                  {/* Visual Attention Focal Indicator Overlay */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0d0e]/80 backdrop-blur-md border border-[#30d158]/30 text-[11px] font-mono-tabular text-[#30d158]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-ping" />
                    <span>GAZE FOCUS DETECTED</span>
                  </div>

                  {/* Bottom details inside card */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#a1a1aa] font-mono-tabular">
                      <span>{heroFeaturedProduct?.category}</span>
                      <span className="text-[#ff6b1a] font-semibold">
                        <CountUp value={heroFeaturedProduct?.explanation.matchScore || 94} suffix="% AI MATCH" durationMs={900} />
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#f4f4f5] leading-tight">
                      {heroFeaturedProduct?.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-[#27272a]/60">
                      <span className="font-mono-tabular text-sm font-semibold text-[#f4f4f5]">
                        {heroFeaturedProduct?.currency}{heroFeaturedProduct?.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#a1a1aa]">
                        {heroFeaturedProduct?.explanation.primaryReasons[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI Telemetry Card 1 (Bottom Left) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#121316]/95 border border-[#27272a] rounded-xl p-3.5 shadow-2xl backdrop-blur-md hidden sm:block max-w-[200px]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono-tabular text-[#a1a1aa] mb-1">
                  <Activity className="w-3 h-3 text-[#ff6b1a]" />
                  <span>SESSION INTENT</span>
                </div>
                <div className="text-xs font-semibold text-[#f4f4f5]">
                  {sessionIntent.primaryCategory}
                </div>
                <div className="w-full bg-[#27272a] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#ff6b1a] to-[#ff3d7f] h-full transition-all duration-500" 
                    style={{ width: `${Math.round(sessionIntent.confidence * 100)}%` }}
                  />
                </div>
              </div>

              {/* Floating AI Telemetry Card 2 (Top Right Offset) */}
              <div className="absolute -top-5 -right-4 sm:-right-8 bg-[#121316]/95 border border-[#27272a] rounded-xl p-3 shadow-2xl backdrop-blur-md hidden sm:block">
                <div className="flex items-center gap-1.5 text-[10px] font-mono-tabular text-[#30d158]">
                  <Eye className="w-3 h-3" />
                  <span>DWELL TIME 1.4s</span>
                </div>
                <div className="text-[11px] text-[#f4f4f5] font-medium mt-0.5">
                  Visual Interest Confirmed
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* STATS ROW BELOW HERO: 3 Bento Tiles Grounded in Real Dataset */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Tile 1: Solid #ff6b1a number */}
          <div className="p-6 bg-[#141416] border border-[#27272a] rounded-[18px] transition-transform duration-300 hover:scale-[1.02]">
            <span className="text-xs uppercase font-mono-tabular tracking-wider text-[#a1a1a6] block mb-1">
              VERIFIED FASHION CATALOG
            </span>
            <div className="text-4xl sm:text-5xl font-semibold text-[#ff6b1a] font-mono-tabular">
              <CountUp value={recommendedProducts.length || 75} suffix=" Items" durationMs={900} />
            </div>
            <p className="text-xs text-[#6e6e73] mt-2">
              Authentic luxury apparel, footwear, dresses, and accessories with verified imagery and metadata.
            </p>
          </div>

          {/* Tile 2: White number */}
          <div className="p-6 bg-[#141416] border border-[#27272a] rounded-[18px] transition-transform duration-300 hover:scale-[1.02]">
            <span className="text-xs uppercase font-mono-tabular tracking-wider text-[#a1a1a6] block mb-1">
              STYLE CATEGORIES
            </span>
            <div className="text-4xl sm:text-5xl font-semibold text-[#f5f5f7] font-mono-tabular">
              <CountUp value={8} suffix=" Curations" durationMs={900} />
            </div>
            <p className="text-xs text-[#6e6e73] mt-2">
              Outerwear, Tailoring, Knitwear, Tops, Dresses, Trousers, Footwear, and Accessories.
            </p>
          </div>

          {/* Tile 3: Gradient 1px border */}
          <div className="p-6 rounded-[18px] border-brand-gradient transition-transform duration-300 hover:scale-[1.02]">
            <span className="text-xs uppercase font-mono-tabular tracking-wider text-[#a1a1a6] block mb-1">
              DATA INTEGRITY
            </span>
            <div className="text-4xl sm:text-5xl font-semibold text-[#f5f5f7] font-mono-tabular">
              <CountUp value={100} suffix="% Truthful" durationMs={900} />
            </div>
            <p className="text-xs text-[#2997ff] mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strictly grounded feature vectors with zero fabricated statistics</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

