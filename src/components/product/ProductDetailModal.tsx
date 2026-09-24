import React, { useState } from 'react';
import { RecommendedProduct } from '../../types';
import { useSasher } from '../../context/SasherContext';
import { ProductResearchDeepDive } from './ProductResearchDeepDive';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Check, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  Layers,
  TrendingUp,
  ArrowUpRight,
  Activity
} from 'lucide-react';

interface ProductDetailModalProps {
  product: RecommendedProduct | null;
  onClose: () => void;
  onViewResearch?: () => void;
}

type ModalTab = 'overview' | 'research';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onViewResearch }) => {
  const { 
    wishlistIds, 
    toggleWishlist, 
    addToCart, 
    currentGazeTarget 
  } = useSasher();

  const [activeTab, setActiveTab] = useState<ModalTab>('overview');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isTechDetailsOpen, setIsTechDetailsOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlistIds.has(product.id);
  const isGazed = currentGazeTarget?.productId === product.id;
  const { explanation } = product;

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0d0e]/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121316] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#0c0d0e]/80 text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: Large Product Image Gallery */}
        <div className="md:w-1/2 bg-[#18191d] relative min-h-[380px] md:min-h-full flex items-center justify-center overflow-hidden">
          {!imageFailed ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover object-center max-h-[700px]"
            />
          ) : (
            <div 
              className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
              style={{ background: product.imageFallbackGradient }}
            >
              <Sparkles className="w-10 h-10 text-white/70 mb-4" />
              <span className="font-editorial text-2xl text-white">{product.brand}</span>
              <span className="text-sm text-white/60 mt-1">{product.name}</span>
            </div>
          )}

          {/* Gaze Visual Attention Overlay */}
          {isGazed && (
            <div className="absolute bottom-4 left-4 right-4 bg-[#0c0d0e]/90 backdrop-blur-md border border-[#10b981]/50 rounded-xl p-3 flex items-center justify-between text-xs font-mono-tabular">
              <span className="flex items-center gap-2 text-[#10b981]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                <span>Visual Attention Detected</span>
              </span>
              <span className="text-[#f4f4f5]">
                Dwell {currentGazeTarget?.dwellSeconds}s (+3.5× intent)
              </span>
            </div>
          )}
        </div>

        {/* RIGHT: Product Information & Explainable AI */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-6">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tabular text-[#a1a1aa] mb-2">
              <span className="uppercase tracking-widest text-[#71717a]">{product.brand}</span>
              <span className="text-[#e2a876] font-semibold">{explanation.matchScore}% AI Match</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl text-[#f4f4f5] leading-tight">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-mono-tabular text-2xl font-bold text-[#f4f4f5]">
                {product.currency}{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-mono-tabular text-sm text-[#71717a] line-through">
                  {product.currency}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-[#10b981] ml-auto">In Stock ({product.stock} units)</span>
            </div>
          </div>

          {/* Perspective Subnav Switcher */}
          <div className="flex items-center gap-2 p-1 bg-[#18191d] rounded-xl border border-[#27272a] text-xs font-mono-tabular">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-[#f4f4f5] text-[#09090b] font-semibold shadow'
                  : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e2a876]" />
              <span>Overview & Fit</span>
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'research'
                  ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow'
                  : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Research Deep Dive (3Y SVG)</span>
            </button>
          </div>

          {activeTab === 'overview' ? (
            <>
              {/* Description & Specs */}
              <div className="space-y-3 pt-4 border-t border-[#27272a]/60">
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono-tabular">
                  <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]">
                    <span className="text-[#71717a] block text-[10px]">MATERIAL</span>
                    <span className="text-[#f4f4f5]">{product.material}</span>
                  </div>
                  <div className="p-2.5 bg-[#18191d] rounded-lg border border-[#27272a]">
                    <span className="text-[#71717a] block text-[10px]">SILHOUETTE</span>
                    <span className="text-[#f4f4f5]">{product.fit}</span>
                  </div>
                </div>
              </div>

              {/* EXPLAINABLE AI: Why This Is Recommended */}
              <div className="p-4 bg-[#18191d]/80 rounded-xl border border-[#27272a] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e2a876] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why This Is Recommended</span>
                  </h4>
                  <span className="text-[11px] font-mono-tabular text-[#a1a1aa]">
                    Adaptive Intent Match
                  </span>
                </div>

                {/* Checkmarked Natural Language Reasons */}
                <div className="space-y-1.5 text-xs text-[#e4e4e7]">
                  {explanation.primaryReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Horizontal Contribution Breakdown Bars (Rule 12) */}
                <div className="pt-3 border-t border-[#27272a]/60 space-y-2">
                  <div className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#71717a]">
                    Signal Contribution Breakdown
                  </div>

                  {/* Session Interest */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#a1a1aa]">Session Interest</span>
                      <span className="font-mono-tabular text-[#f4f4f5]">{explanation.sessionContribution}%</span>
                    </div>
                    <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#e2a876] h-full" style={{ width: `${explanation.sessionContribution}%` }} />
                    </div>
                  </div>

                  {/* Visual Attention */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#a1a1aa]">Visual Attention (Gaze)</span>
                      <span className="font-mono-tabular text-[#10b981]">{explanation.visualAttentionContribution}%</span>
                    </div>
                    <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#10b981] h-full" style={{ width: `${explanation.visualAttentionContribution}%` }} />
                    </div>
                  </div>

                  {/* Profile Preference */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#a1a1aa]">Profile Preference</span>
                      <span className="font-mono-tabular text-[#f4f4f5]">{explanation.profileContribution}%</span>
                    </div>
                    <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#a1a1aa] h-full" style={{ width: `${explanation.profileContribution}%` }} />
                    </div>
                  </div>

                  {/* Content Similarity */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#a1a1aa]">Content Similarity</span>
                      <span className="font-mono-tabular text-[#f4f4f5]">{explanation.contentSimilarityContribution}%</span>
                    </div>
                    <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#71717a] h-full" style={{ width: `${explanation.contentSimilarityContribution}%` }} />
                    </div>
                  </div>
                </div>

                {/* Expandable Technical Details for Researchers */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsTechDetailsOpen(!isTechDetailsOpen)}
                    className="text-[11px] font-mono-tabular text-[#71717a] hover:text-[#a1a1aa] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isTechDetailsOpen ? 'Hide Technical Decomposition' : 'Show Technical Decomposition'}</span>
                    {isTechDetailsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {isTechDetailsOpen && (
                    <div className="mt-2 p-3 bg-[#0c0d0e] rounded-lg border border-[#27272a] text-[10px] font-mono-tabular space-y-1 text-[#a1a1aa] animate-in fade-in">
                      <div className="flex justify-between">
                        <span>Dot Product Raw:</span>
                        <span className="text-[#f4f4f5]">{explanation.technicalDetails.dotProduct}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MMR Re-ranked Score:</span>
                        <span className="text-[#f4f4f5]">{explanation.technicalDetails.mmrScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dynamic Weight w_session:</span>
                        <span className="text-[#e2a876]">{explanation.technicalDetails.wSession}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dynamic Weight w_gaze:</span>
                        <span className="text-[#10b981]">{explanation.technicalDetails.wGaze}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* PRODUCT RESEARCH DEEP DIVE MODULE (Responsive SVG Charts) */
            <div className="space-y-4">
              <ProductResearchDeepDive
                productId={product.id}
                onNavigateToFullResearch={onViewResearch}
              />
            </div>
          )}

          {/* Size Selector */}
          <div>
            <span className="text-xs uppercase tracking-wider text-[#71717a] font-mono-tabular block mb-2">
              Select Size
            </span>
            <div className="flex items-center gap-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 rounded-lg text-xs font-medium font-mono-tabular transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#f4f4f5] text-[#09090b] font-bold'
                      : 'bg-[#18191d] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#27272a]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Longitudinal Research Link */}
          {onViewResearch && (
            <button
              onClick={onViewResearch}
              className="w-full py-2.5 px-3.5 rounded-xl border border-[#27272a] hover:border-[#e2a876]/50 bg-[#18191d]/80 hover:bg-[#18191d] text-[#a1a1aa] hover:text-[#e2a876] text-xs font-mono-tabular transition-colors flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-[#e2a876]" />
                <span>Inspect Longitudinal Sales & Graphical Model</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>
          )}

          {/* Actions: Add to Cart & Wishlist */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#27272a]/60">
            <button
              onClick={handleAddToCart}
              disabled={addedAnimation}
              className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                addedAnimation
                  ? 'bg-[#10b981] text-[#09090b]'
                  : 'bg-[#f4f4f5] hover:bg-white text-[#09090b]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag &middot; {product.currency}{product.price.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-[#e2a876] bg-[#e2a876]/10 text-[#e2a876]'
                  : 'border-[#27272a] hover:border-[#3f3f46] text-[#a1a1aa] hover:text-[#f4f4f5]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
