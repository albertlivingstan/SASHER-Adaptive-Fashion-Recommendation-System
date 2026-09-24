import React, { useState } from 'react';
import { RecommendedProduct } from '../../types';
import { useSasher } from '../../context/SasherContext';
import { Heart, Eye, Sparkles, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: RecommendedProduct;
  onSelect: (product: RecommendedProduct) => void;
  onExplain: (product: RecommendedProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onExplain }) => {
  const { 
    wishlistIds, 
    toggleWishlist, 
    addToCart, 
    recordInteraction, 
    currentGazeTarget,
    triggerProjectForProduct
  } = useSasher();

  const [isHovered, setIsHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isWishlisted = wishlistIds.has(product.id);
  const isBeingGazed = currentGazeTarget?.productId === product.id;
  const isInterestConfirmed = isBeingGazed && currentGazeTarget?.status === 'interest_confirmed';

  const handleMouseEnter = () => {
    setIsHovered(true);
    recordInteraction('HOVER', product.id, product.category);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    recordInteraction('VIEW', product.id, product.category);
    onSelect(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'M');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleExplainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExplain(product);
  };

  return (
    <div
      data-gaze-product-id={product.id}
      data-gaze-category={product.category}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`group relative rounded-xl bg-[#121316] border transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between overflow-hidden ${
        isInterestConfirmed
          ? 'border-[#10b981]/70 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-[#10b981]/40'
          : isBeingGazed
          ? 'border-[#e2a876]/70 shadow-lg'
          : 'border-[#27272a]/70 hover:border-[#3f3f46] hover:shadow-xl'
      }`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18191d]">
        {!imageFailed ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          /* Styled Fallback Container as required by Zero-Broken-Image Policy */
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
            style={{ background: product.imageFallbackGradient }}
          >
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white/70">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-editorial text-lg text-white font-medium">{product.brand}</span>
            <span className="text-xs text-white/60 mt-1">{product.articleType}</span>
          </div>
        )}

        {/* Subtle Scrim for Top Action Icons */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Badges / Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="text-[10px] font-mono-tabular tracking-wider uppercase bg-[#0c0d0e]/75 backdrop-blur-md text-[#d4d4d8] px-2 py-0.5 rounded">
            {product.category}
          </span>

          <button
            onClick={handleWishlistClick}
            data-magnetic
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-[#e2a876] text-[#09090b]'
                : 'bg-[#0c0d0e]/60 hover:bg-[#0c0d0e]/90 text-[#f4f4f5]'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Visual Attention Real-Time Cue (Rule 9) */}
        {(isBeingGazed || isHovered) && (
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0c0d0e]/85 backdrop-blur-md border border-[#27272a] text-[11px] font-mono-tabular">
            <span className="flex items-center gap-1.5 text-[#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span>{isInterestConfirmed ? 'Visual interest detected' : 'Visual attention...'}</span>
            </span>
            <span className="text-[#a1a1aa]">
              {currentGazeTarget?.dwellSeconds ? `${currentGazeTarget.dwellSeconds}s` : '0.4s'}
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata line: brand / category / match score */}
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] mb-1">
            <span className="tracking-wider uppercase text-[11px] font-medium text-[#71717a]">
              {product.brand}
            </span>
            
            <button
              onClick={handleExplainClick}
              className="group/why flex items-center gap-1 text-[11px] font-mono-tabular text-[#e2a876] hover:underline cursor-pointer"
              title="Click to view explainable AI signal decomposition"
            >
              <span>{product.explanation.matchScore}% AI Match</span>
            </button>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-[#f4f4f5] leading-snug line-clamp-1 group-hover:text-[#e2a876] transition-colors">
            {product.name}
          </h3>

          {/* Clean Why Recommended kicker */}
          <p className="text-[11px] text-[#71717a] mt-1 line-clamp-1">
            {product.explanation.primaryReasons[0]}
          </p>
        </div>

        {/* Bottom row: Price and Quick Add */}
        <div className="pt-2 border-t border-[#27272a]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-tabular text-sm font-semibold text-[#f4f4f5]">
              {product.currency}{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-mono-tabular text-xs text-[#71717a] line-through">
                {product.currency}{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerProjectForProduct(product);
              }}
              data-magnetic
              className="px-2 py-1 bg-[#18181b] hover:bg-[#27272a] text-[#ff6b1a] border border-[#ff6b1a]/40 rounded-lg text-[10px] font-mono tracking-wider transition-colors cursor-pointer flex items-center gap-1"
              title="Analyze with eye-gaze and suggest cohesive project"
            >
              <Sparkles className="w-3 h-3" />
              <span>Suggest Project</span>
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={justAdded}
              data-magnetic
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                justAdded
                  ? 'bg-[#10b981] text-[#09090b]'
                  : 'bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5]'
              }`}
              aria-label="Add to bag"
              title="Quick add to bag"
            >
              {justAdded ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
