import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { feedbackService } from './feedbackService';
import { callGeminiApi } from './geminiService';

export interface AssistantMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: number;
  suggestedProducts?: Product[];
  actionButtons?: {
    label: string;
    action: 'why_product' | 'find_similar' | 'higher_rated' | 'style_outfit' | 'browse_category';
    payload?: any;
  }[];
}

class FashionAssistantService {
  /**
   * Process a user query against the actual product catalog and session state
   */
  public handleUserQuery(
    query: string,
    activeProduct: Product | null,
    recentInteractions: string[] = []
  ): AssistantMessage {
    const q = query.toLowerCase().trim();
    const now = Date.now();
    const allProducts = INITIAL_PRODUCTS;

    // 1. Context Question: "Why did you recommend this?" or "Why this product?"
    if (
      q.includes('why did you recommend') ||
      q.includes('why this product') ||
      q.includes('why recommend') ||
      q.includes('why is this recommended') ||
      (q.includes('why') && activeProduct)
    ) {
      if (!activeProduct) {
        return {
          id: `msg-${now}`,
          sender: 'assistant',
          text: 'To explain a recommendation, please select or view any product in the catalog first.',
          timestamp: now,
          actionButtons: [
            { label: 'Browse Casual Shirts', action: 'browse_category', payload: 'casual_shirts' },
            { label: 'Browse Dresses', action: 'browse_category', payload: 'dresses' },
            { label: 'Top Rated Pieces', action: 'higher_rated' }
          ]
        };
      }

      const ratingSummary = feedbackService.getRatingSummary(activeProduct.id);
      const ratingText = ratingSummary.averageRating 
        ? `★ ${ratingSummary.averageRating}/5 (${ratingSummary.totalReviews} verified ${ratingSummary.totalReviews === 1 ? 'review' : 'reviews'}).` 
        : 'Ratings unavailable — connect a review/rating dataset to enable this feature.';

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here is the algorithmic explanation for the **${activeProduct.name}**:\n\n• **Category Alignment**: Rooted in your interest in **${activeProduct.category}**.\n• **Style Vector**: Matches a **${activeProduct.style}** aesthetic with ${activeProduct.material}.\n• **Rating Status**: ${ratingText}\n• **Silhouette & Fit**: Engineered with a ${activeProduct.fit} construction.\n• **Stock Availability**: ${activeProduct.stock > 0 ? `${activeProduct.stock} units in stock` : 'Sold out'}.`,
        suggestedProducts: [activeProduct],
        timestamp: now,
        actionButtons: [
          { label: 'Find similar', action: 'find_similar', payload: activeProduct.id },
          { label: 'Style this outfit', action: 'style_outfit', payload: activeProduct.id }
        ]
      };
    }

    // 2. "Show products similar to this" / "Find similar"
    if (
      q.includes('similar to this') ||
      q.includes('find similar') ||
      q.includes('show similar') ||
      q.includes('like this')
    ) {
      const target = activeProduct || allProducts[0];
      const similar = allProducts.filter(
        p => p.id !== target.id && (p.category === target.category || p.style === target.style)
      ).slice(0, 3);

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here are pieces sharing similar ${target.style.toLowerCase()} style vectors, silhouette, and aesthetics with the **${target.name}**:`,
        suggestedProducts: similar.length > 0 ? similar : allProducts.slice(0, 3),
        timestamp: now,
        actionButtons: [
          { label: 'Style this outfit', action: 'style_outfit', payload: target.id }
        ]
      };
    }

    // 3. "Which products have high ratings?" / "Top rated" / "Best rated" / "Reviews"
    if (
      q.includes('high rating') ||
      q.includes('higher rated') ||
      q.includes('top rated') ||
      q.includes('best rated') ||
      q.includes('best rating') ||
      q.includes('highest rated') ||
      q.includes('customer review')
    ) {
      // Check real ratings from feedbackService + product rating metadata
      const allWithRatings = allProducts.map(p => {
        const summary = feedbackService.getRatingSummary(p.id);
        const effectiveRating = summary.averageRating !== null ? summary.averageRating : (p.rating || 0);
        const effectiveCount = summary.totalReviews > 0 ? summary.totalReviews : (p.reviewCount || 0);
        return { product: p, rating: effectiveRating, reviews: effectiveCount };
      }).filter(item => item.rating >= 3.8);

      if (allWithRatings.length > 0) {
        allWithRatings.sort((a, b) => b.rating - a.rating);
        const top = allWithRatings.slice(0, 3).map(i => i.product);
        return {
          id: `msg-${now}`,
          sender: 'assistant',
          text: `Based strictly on verified user reviews and authentic customer ratings, here are our top-rated fashion pieces:`,
          suggestedProducts: top,
          timestamp: now,
          actionButtons: [
            { label: 'Casual Shirts', action: 'browse_category', payload: 'casual_shirts' },
            { label: 'Women’s Dresses', action: 'browse_category', payload: 'dresses' },
            { label: 'Footwear & Shoes', action: 'browse_category', payload: 'shoes' }
          ]
        };
      } else {
        return {
          id: `msg-${now}`,
          sender: 'assistant',
          text: `Ratings unavailable — connect a review/rating dataset to enable this feature.\n\nYou can submit verified 1–5 star reviews in any product card to build authentic community ratings!`,
          suggestedProducts: allProducts.slice(0, 3),
          timestamp: now
        };
      }
    }

    // 4. College Event or Casual Recommendation
    if (
      q.includes('college') ||
      q.includes('campus') ||
      q.includes('university') ||
      q.includes('fest')
    ) {
      const casualPicks = allProducts.filter(
        p => p.category === 'Tops' || p.category === 'Footwear' || p.category === 'Trousers' || (p.style === 'Casual' && p.category === 'Outerwear')
      ).slice(0, 3);

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `For a college or campus event, I recommend pieces balancing relaxed comfort, standout styling, and effortless movement:`,
        suggestedProducts: casualPicks,
        timestamp: now,
        actionButtons: [
          { label: 'Show Casual Shirts', action: 'browse_category', payload: 'casual_shirts' },
          { label: 'Show Shoes', action: 'browse_category', payload: 'shoes' },
          { label: 'Under ₹5,000', action: 'browse_category', payload: 'under_5000' }
        ]
      };
    }

    // 5. Women's Dresses & Gowns
    if (
      q.includes('dress') ||
      q.includes('dresses') ||
      q.includes('gown') ||
      q.includes('frock')
    ) {
      const dresses = allProducts.filter(p => p.category === 'Dresses' || p.subcategory?.toLowerCase().includes('dress') || p.name.toLowerCase().includes('dress') || p.name.toLowerCase().includes('gown'));
      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here are our verified women’s dresses and evening gowns, featuring contemporary silhouettes, premium drape, and authentic customer reviews:`,
        suggestedProducts: dresses.slice(0, 4),
        timestamp: now,
        actionButtons: [
          { label: 'Style with Handbag', action: 'browse_category', payload: 'watches' },
          { label: 'Explore Footwear', action: 'browse_category', payload: 'shoes' }
        ]
      };
    }

    // 6. Casual Shirts / Tops / Tees
    if (
      q.includes('shirt') ||
      q.includes('shirts') ||
      q.includes('top') ||
      q.includes('tops') ||
      q.includes('blouse') ||
      q.includes('tee') ||
      q.includes('t-shirt')
    ) {
      const tops = allProducts.filter(p => p.category === 'Tops');
      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here are our verified shirts and tops, tailored in breathable cottons, check patterns, and relaxed casual drape:`,
        suggestedProducts: tops.slice(0, 4),
        timestamp: now,
        actionButtons: [
          { label: 'Show Matching Trousers', action: 'browse_category', payload: 'Trousers' },
          { label: 'Show Shoes', action: 'browse_category', payload: 'shoes' }
        ]
      };
    }

    // 7. Shoes & Footwear
    if (
      q.includes('shoe') ||
      q.includes('shoes') ||
      q.includes('sneaker') ||
      q.includes('sneakers') ||
      q.includes('footwear') ||
      q.includes('boot') ||
      q.includes('boots') ||
      q.includes('loafer') ||
      q.includes('slipper')
    ) {
      const shoes = allProducts.filter(p => p.category === 'Footwear');
      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here is our verified footwear collection, featuring contemporary sneakers, leather slippers, and statement shoes:`,
        suggestedProducts: shoes.slice(0, 4),
        timestamp: now,
        actionButtons: [
          { label: 'Casual Shirts', action: 'browse_category', payload: 'casual_shirts' },
          { label: 'Watches & Bags', action: 'browse_category', payload: 'watches' }
        ]
      };
    }

    // 8. Watches & Bags & Accessories
    if (
      q.includes('watch') ||
      q.includes('watches') ||
      q.includes('bag') ||
      q.includes('bags') ||
      q.includes('handbag') ||
      q.includes('tote') ||
      q.includes('accessory') ||
      q.includes('accessories') ||
      q.includes('sunglass') ||
      q.includes('sunglasses')
    ) {
      const accessories = allProducts.filter(p => p.category === 'Accessories');
      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here are our verified luxury accessories, timepieces, sunglasses, and leather bags:`,
        suggestedProducts: accessories.slice(0, 4),
        timestamp: now,
        actionButtons: [
          { label: 'Show Women’s Dresses', action: 'browse_category', payload: 'dresses' },
          { label: 'Show Shoes', action: 'browse_category', payload: 'shoes' }
        ]
      };
    }

    // 9. Outerwear / Coats / Jackets
    if (
      q.includes('outerwear') ||
      q.includes('coat') ||
      q.includes('jacket') ||
      q.includes('trench') ||
      q.includes('biker')
    ) {
      const coats = allProducts.filter(p => p.category === 'Outerwear');
      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here are our signature architectural outerwear pieces, handcrafted in heavy virgin wool, waterproof gabardine, and full-grain lambskin:`,
        suggestedProducts: coats.slice(0, 4),
        timestamp: now,
        actionButtons: [
          { label: 'Matching Knitwear', action: 'browse_category', payload: 'Knitwear' },
          { label: 'Tailored Trousers', action: 'browse_category', payload: 'Trousers' }
        ]
      };
    }

    // 10. Tailoring & Blazers
    if (
      q.includes('tailoring') ||
      q.includes('blazer') ||
      q.includes('suit') ||
      q.includes('formal')
    ) {
      const tailoring = allProducts.filter(p => p.category === 'Tailoring');
      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here is our bespoke tailoring collection, built with full-canvas construction and Super 120s Italian wool:`,
        suggestedProducts: tailoring.slice(0, 3),
        timestamp: now,
        actionButtons: [
          { label: 'Fine Shirts', action: 'browse_category', payload: 'casual_shirts' },
          { label: 'Dress Footwear', action: 'browse_category', payload: 'shoes' }
        ]
      };
    }

    // 11. Color advice: "What color suits this outfit?"
    if (q.includes('color') || q.includes('shade') || q.includes('palette')) {
      const target = activeProduct || allProducts[0];
      const colorAdvice: Record<string, string> = {
        'Camel Warm Ash': 'Pairs harmoniously with Matte Obsidian, Charcoal Mélange, and Raw Chalk White.',
        'Matte Obsidian': 'A pure anchor neutral that pairs with Camel, Oatmeal Heather, and Deep Slate Sage.',
        'Charcoal Mélange': 'Works exceptionally well with Ivory Travertine knitwear and Crisp Optic White poplin.',
        'Ivory Travertine': 'Enhances textural warmth when combined with Charcoal tailoring or Deep Indigo denim.',
        'Deep Slate Sage': 'Complements earthy monochromes, Warm Camel, and Black trousers.'
      };

      const advice = colorAdvice[target.color] || `For ${target.color}, I recommend anchoring with neutral charcoal, matte black, or raw chalk white.`;
      const complement = allProducts.filter(p => p.id !== target.id && p.category !== target.category).slice(0, 2);

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Regarding color harmony for **${target.name}** (${target.color}):\n\n${advice}`,
        suggestedProducts: complement,
        timestamp: now
      };
    }

    // 12. Price filtering: "Show me products under this price" / "under 5000" / "under 10000"
    const priceMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || q.match(/less than\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
    if (priceMatch && priceMatch[1]) {
      const maxPrice = parseInt(priceMatch[1], 10);
      const filtered = allProducts.filter(p => p.price <= maxPrice);

      if (filtered.length === 0) {
        return {
          id: `msg-${now}`,
          sender: 'assistant',
          text: `No products in our current collection are priced below ₹${maxPrice.toLocaleString('en-IN')}. Our collection starts at ₹1,200 for accessories and ₹2,400 for shirts.`,
          timestamp: now,
          actionButtons: [
            { label: 'Show Under ₹5,000', action: 'browse_category', payload: 'under_5000' },
            { label: 'Browse Casual Shirts', action: 'browse_category', payload: 'casual_shirts' }
          ]
        };
      }

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here are verified fashion pieces priced under ₹${maxPrice.toLocaleString('en-IN')}:`,
        suggestedProducts: filtered.slice(0, 4),
        timestamp: now,
        actionButtons: [
          { label: 'Top Rated Pieces', action: 'higher_rated' },
          { label: 'Casual Shirts', action: 'browse_category', payload: 'casual_shirts' }
        ]
      };
    }

    // 13. "Suggest something based on my previous choices" / browsing history
    if (
      q.includes('previous choice') ||
      q.includes('my choices') ||
      q.includes('history') ||
      q.includes('based on what i viewed')
    ) {
      if (recentInteractions.length === 0) {
        return {
          id: `msg-${now}`,
          sender: 'assistant',
          text: `You have not interacted with products in this session yet. Explore our catalog or select any garment, and our hybrid recommendation engine will adapt to your visual intent in real time!`,
          suggestedProducts: allProducts.slice(0, 3),
          timestamp: now
        };
      }

      const viewedProducts = allProducts.filter(p => recentInteractions.includes(p.id));
      const favoriteCategory = viewedProducts[0]?.category || 'Tops';
      const recommendations = allProducts.filter(p => p.category === favoriteCategory).slice(0, 3);

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Based on your recent interest in **${favoriteCategory}**, here are tailored suggestions harmonized with your session preferences:`,
        suggestedProducts: recommendations,
        timestamp: now
      };
    }

    // 14. Style this outfit
    if (q.includes('style this') || q.includes('outfit') || q.includes('pair')) {
      const anchor = activeProduct || allProducts[0];
      const complementCategories: Record<string, string[]> = {
        'Outerwear': ['Knitwear', 'Trousers', 'Footwear'],
        'Tailoring': ['Tops', 'Trousers', 'Footwear'],
        'Knitwear': ['Trousers', 'Outerwear', 'Accessories'],
        'Tops': ['Trousers', 'Outerwear', 'Footwear'],
        'Dresses': ['Accessories', 'Footwear'],
        'Trousers': ['Outerwear', 'Tops', 'Footwear'],
        'Footwear': ['Tops', 'Trousers', 'Outerwear'],
        'Accessories': ['Dresses', 'Tops', 'Tailoring']
      };

      const desiredCats = complementCategories[anchor.category] || ['Trousers', 'Footwear'];
      const ensemble = desiredCats.map(cat => allProducts.find(p => p.category === cat && p.id !== anchor.id)).filter(Boolean) as Product[];

      return {
        id: `msg-${now}`,
        sender: 'assistant',
        text: `Here is a curated outfit ensemble styling around the **${anchor.name}**:`,
        suggestedProducts: [anchor, ...ensemble],
        timestamp: now
      };
    }

    // 15. Intelligent Keyword Search across catalog (brands, names, tags, materials)
    const keywords = q.replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 2);
    if (keywords.length > 0) {
      const matches = allProducts.filter(p => {
        const targetString = `${p.name} ${p.category} ${p.subcategory || ''} ${p.brand} ${p.description} ${p.material} ${p.color} ${p.style}`.toLowerCase();
        return keywords.some(k => targetString.includes(k));
      });

      if (matches.length > 0) {
        return {
          id: `msg-${now}`,
          sender: 'assistant',
          text: `Found ${matches.length} matching pieces in our verified collection:`,
          suggestedProducts: matches.slice(0, 4),
          timestamp: now,
          actionButtons: [
            { label: 'Casual Shirts', action: 'browse_category', payload: 'casual_shirts' },
            { label: 'Women’s Dresses', action: 'browse_category', payload: 'dresses' },
            { label: 'Footwear', action: 'browse_category', payload: 'shoes' }
          ]
        };
      }
    }

    // 16. Polite, knowledgeable Fallback with working suggestions
    return {
      id: `msg-${now}`,
      sender: 'assistant',
      text: `I'm happy to assist you! Our collection features genuine luxury & contemporary apparel, shoes, dresses, shirts, and accessories. You can ask me:\n\n• *"Show me women’s dresses"* \n• *"Show casual shirts"* \n• *"What should I wear for a college event?"* \n• *"Show footwear and sneakers"* \n• *"Which products have top ratings?"* \n• *"Show products under ₹5,000"*`,
      timestamp: now,
      suggestedProducts: allProducts.slice(0, 3),
      actionButtons: [
        { label: 'College Event Outfits', action: 'browse_category', payload: 'college' },
        { label: 'Women’s Dresses', action: 'browse_category', payload: 'dresses' },
        { label: 'Casual Shirts', action: 'browse_category', payload: 'casual_shirts' },
        { label: 'Shoes & Footwear', action: 'browse_category', payload: 'shoes' },
        { label: 'Top Rated Pieces', action: 'higher_rated' }
      ]
    };
  }

  /**
   * Process a user query with Gemini Flash AI, incorporating full 61-product catalog context
   */
  public async handleUserQueryAsync(
    query: string,
    activeProduct: Product | null,
    recentInteractions: string[] = []
  ): Promise<AssistantMessage> {
    const syncResult = this.handleUserQuery(query, activeProduct, recentInteractions);
    const now = Date.now();

    try {
      const activeInfo = activeProduct
        ? `CURRENTLY VIEWING PRODUCT OUT OF OUR 61 CATALOG ITEMS:
- Name: ${activeProduct.name}
- Brand: ${activeProduct.brand}
- Category: ${activeProduct.category} (${activeProduct.subcategory || activeProduct.articleType})
- Material: ${activeProduct.material}
- Color: ${activeProduct.color}
- Style: ${activeProduct.style}
- Fit: ${activeProduct.fit}
- Price: ${activeProduct.currency}${activeProduct.price.toLocaleString('en-IN')}
- Description: ${activeProduct.description}
- Stock: ${activeProduct.stock} units`
        : 'NO SPECIFIC PRODUCT CURRENTLY VIEWED.';

      const prompt = `You are Julian Laurent, lead AI Fashion Consultant & Stylist for SASHER Adaptive Fashion System.
Answer the user's fashion query as Julian Laurent in an articulate, high-fashion, polished tone.

${activeInfo}

USER QUERY: "${query}"

INSTRUCTIONS:
1. Speak as Julian Laurent ("Hello, I'm Julian...", "As your fashion consultant...").
2. Ensure ANY product information you describe matches the exact product details listed above.
3. Keep response elegant, direct, and under 100 words. Format key points with bullet points or bold text if appropriate.`;

      const aiResponse = await callGeminiApi(prompt);
      if (aiResponse) {
        return {
          ...syncResult,
          id: `msg-ai-${now}`,
          text: aiResponse,
          timestamp: now
        };
      }
    } catch (err) {
      console.warn('Gemini query processing fallback:', err);
    }

    return syncResult;
  }

  /**
   * Produce immediate context-aware greeting when a product is opened
   */
  public getProductContextGreeting(product: Product): AssistantMessage {
    const now = Date.now();
    const ratingSummary = feedbackService.getRatingSummary(product.id);
    const ratingLine = ratingSummary.averageRating 
      ? `★ ${ratingSummary.averageRating}/5 (${ratingSummary.totalReviews} verified reviews)`
      : 'Ratings unavailable — connect a review/rating dataset to enable this feature.';

    return {
      id: `msg-ctx-${now}`,
      sender: 'assistant',
      text: `Hi! I'm Julian, your fashion consultant. I can explain why the **${product.name}** was recommended for your aesthetic profile.\n\n• **Category**: ${product.category} · ${product.subcategory || product.articleType}\n• **Material**: ${product.material}\n• **Price**: ${product.currency}${product.price.toLocaleString('en-IN')}\n• **Ratings**: ${ratingLine}`,
      suggestedProducts: [product],
      timestamp: now,
      actionButtons: [
        { label: 'Why this product?', action: 'why_product', payload: product.id },
        { label: 'Find similar', action: 'find_similar', payload: product.id },
        { label: 'Top Rated Pieces', action: 'higher_rated', payload: product.id },
        { label: 'Style this outfit', action: 'style_outfit', payload: product.id }
      ]
    };
  }
}

export const assistantService = new FashionAssistantService();
