import React, { useState } from 'react';
import { CategoryType, RecommendedProduct } from '../../types';
import { CATEGORIES } from '../../data/products';
import { useSasher } from '../../context/SasherContext';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  onSelectProduct: (product: RecommendedProduct) => void;
  onExplainProduct: (product: RecommendedProduct) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectProduct, onExplainProduct }) => {
  const { 
    recommendedProducts, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    sessionIntent,
    resetSession
  } = useSasher();

  const [sortBy, setSortBy] = useState<'match' | 'price-asc' | 'price-desc' | 'popularity'>('match');

  // Filter products by active category and search
  const filteredProducts = recommendedProducts.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'match') return b.explanation.matchScore - a.explanation.matchScore;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'popularity') return b.popularityScore - a.popularityScore;
    return 0;
  });

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#27272a]/60 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#a1a1aa] mb-1">
            <span>RECOMMENDED FOR YOUR SESSION</span>
            <span aria-hidden="true" className="text-[#3f3f46]">·</span>
            <span className="text-[#e2a876]">{sessionIntent.trendDescription}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#f4f4f5]">
            Curated Discovery Catalog
          </h2>
          <p className="text-sm text-[#71717a] mt-1">
            These recommendations adapt in real time as you browse, gaze, or save items.
          </p>
        </div>

        {/* Quick Session Status / Reset */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-mono-tabular text-[#71717a] block">
              ACTIVE INTERACTIONS: {sessionIntent.totalInteractions}
            </span>
            <span className="text-xs text-[#a1a1aa]">
              Model Confidence: {Math.round(sessionIntent.confidence * 100)}%
            </span>
          </div>
          
          <button
            onClick={resetSession}
            title="Reset session intent and clear memory"
            className="p-2.5 rounded-lg border border-[#27272a] hover:border-[#3f3f46] bg-[#121316] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Session</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        
        {/* Interactive Functional Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {CATEGORIES.map(category => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category as CategoryType)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#f4f4f5] text-[#09090b] shadow-sm font-semibold'
                    : 'bg-[#18191d] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#27272a]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search silhouettes, materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#121316] border border-[#27272a] focus:border-[#e2a876] text-xs text-[#f4f4f5] placeholder-[#71717a] outline-none transition-colors"
            />
          </div>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#121316] border border-[#27272a] text-xs text-[#a1a1aa] focus:text-[#f4f4f5] outline-none cursor-pointer"
          >
            <option value="match">Rank: AI Match</option>
            <option value="popularity">Rank: Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid: 4 columns desktop, 2 columns tablet, 1 column mobile */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onExplain={onExplainProduct}
              onShowSimilar={(p) => {
                setActiveCategory(p.category);
                onSelectProduct(p);
              }}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center border border-dashed border-[#27272a] rounded-2xl bg-[#121316]/50">
          <Sparkles className="w-8 h-8 text-[#71717a] mx-auto mb-3" />
          <h3 className="font-editorial text-2xl text-[#f4f4f5]">No Styles Found</h3>
          <p className="text-sm text-[#71717a] mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or explore other fashion categories in our collection.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-xs text-[#f4f4f5] rounded-lg transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
