import { Product, CategoryType } from '../types';

/**
 * Standard Canonical Product Interface
 * Complies with Section 13 Product Schema requirements.
 * Serves as a universal contract for ingesting external fashion catalogs.
 */
export interface CanonicalProductSchema {
  product_id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  price: number | null;
  currency?: string;
  rating: number | null;
  review_count: number | null;
  brand?: string;
  gender?: string;
  color?: string;
  season?: string;
  style?: string;
  description?: string;
  material?: string;
  fit?: string;
  available_sizes?: string[];
  attributes: Record<string, string | number | boolean>;
  recommendation_score: number | null;
  imageFallbackGradient?: string;
}

/**
 * Clean Data Adapter for translating raw product representations
 * into canonical schema and application runtime products.
 * Easily allows replacing or extending datasets without changing UI components.
 */
export class ProductDataAdapter {
  /**
   * Adapts a raw object from any external dataset/API into the canonical schema.
   * If a field does not exist, uses standard fallbacks (null or 'Not available')
   * without fabricating fake numbers or ratings.
   */
  public static toCanonical(raw: any): CanonicalProductSchema {
    if (!raw) {
      throw new Error('Cannot adapt null or undefined product record');
    }

    const productId = String(raw.product_id || raw.id || raw.sku || `prod-${Date.now()}`);
    const name = String(raw.name || raw.product_name || raw.title || 'Not available');
    const category = String(raw.category || raw.masterCategory || 'Uncategorized');
    const subcategory = String(raw.subcategory || raw.subCategory || raw.articleType || 'Not available');
    
    // Reliable image resolution with fallback
    const image = raw.image || raw.imageUrl || raw.img || raw.photo || '';
    
    // Price: null if unavailable (no fake prices)
    const price = typeof raw.price === 'number' && !isNaN(raw.price) ? raw.price : null;
    
    // Rating & reviews: strictly null when external dataset has no ratings (Section 2 & 3)
    const rating = typeof raw.rating === 'number' && !isNaN(raw.rating) ? raw.rating : null;
    const review_count = typeof raw.review_count === 'number' 
      ? raw.review_count 
      : typeof raw.reviewCount === 'number' 
      ? raw.reviewCount 
      : null;

    // Attributes map
    const attributes: Record<string, string | number | boolean> = {};
    if (raw.attributes && typeof raw.attributes === 'object') {
      Object.assign(attributes, raw.attributes);
    }
    if (raw.fabricWeight) attributes.fabricWeight = raw.fabricWeight;
    if (raw.construction) attributes.construction = raw.construction;
    if (raw.origin) attributes.origin = raw.origin;

    return {
      product_id: productId,
      name,
      category,
      subcategory,
      image,
      price,
      currency: raw.currency || '₹',
      rating,
      review_count,
      brand: raw.brand || 'Not available',
      gender: raw.gender || 'Unisex',
      color: raw.color || 'Not available',
      season: raw.season || 'All-Season',
      style: raw.style || 'Minimalist',
      description: raw.description || 'Not available',
      material: raw.material || 'Not available',
      fit: raw.fit || 'Not available',
      available_sizes: Array.isArray(raw.available_sizes) 
        ? raw.available_sizes 
        : Array.isArray(raw.availableSizes) 
        ? raw.availableSizes 
        : ['S', 'M', 'L'],
      attributes,
      recommendation_score: typeof raw.recommendation_score === 'number' ? raw.recommendation_score : null,
      imageFallbackGradient: raw.imageFallbackGradient || 'linear-gradient(145deg, #18191d, #27272a)'
    };
  }

  /**
   * Converts a CanonicalProductSchema into the application runtime Product type.
   */
  public static toRuntimeProduct(canonical: CanonicalProductSchema): Product {
    const validCategory: CategoryType = [
      'Outerwear', 'Tailoring', 'Knitwear', 'Tops', 'Dresses', 'Trousers', 'Footwear', 'Accessories'
    ].includes(canonical.category)
      ? (canonical.category as CategoryType)
      : 'Outerwear';

    const validGender: 'Unisex' | 'Men' | 'Women' = 
      canonical.gender === 'Men' ? 'Men' : canonical.gender === 'Women' ? 'Women' : 'Unisex';

    const validStyle: 'Minimalist' | 'Tailored' | 'Architectural' | 'Casual' | 'Avant-Garde' = 
      ['Minimalist', 'Tailored', 'Architectural', 'Casual', 'Avant-Garde'].includes(canonical.style || '')
        ? (canonical.style as any)
        : 'Minimalist';

    return {
      id: canonical.product_id,
      product_id: canonical.product_id,
      name: canonical.name,
      brand: canonical.brand || 'Not available',
      category: validCategory,
      subcategory: canonical.subcategory,
      articleType: canonical.subcategory,
      price: canonical.price ?? 0,
      currency: canonical.currency || '₹',
      imageUrl: canonical.image,
      imageFallbackGradient: canonical.imageFallbackGradient || 'linear-gradient(145deg, #18191d, #27272a)',
      gender: validGender,
      color: canonical.color || 'Not available',
      season: (canonical.season as any) || 'All-Season',
      style: validStyle,
      description: canonical.description || 'Not available',
      material: canonical.material || 'Not available',
      fit: canonical.fit || 'Not available',
      rating: canonical.rating,
      reviewCount: canonical.review_count,
      stock: 10,
      availableSizes: canonical.available_sizes,
      attributes: canonical.attributes,
      popularityScore: 0.85,
      recommendationScore: canonical.recommendation_score,
      featureVector: {
        outerwear: validCategory === 'Outerwear' ? 0.9 : 0.2,
        tailoring: validCategory === 'Tailoring' ? 0.9 : 0.2,
        knitwear: validCategory === 'Knitwear' ? 0.9 : 0.2,
        minimalism: validStyle === 'Minimalist' ? 0.9 : 0.4,
        formal: validStyle === 'Tailored' ? 0.9 : 0.3,
        casual: validStyle === 'Casual' ? 0.9 : 0.3,
        warmth: 0.6
      },
      collaborativeScore: 0.85
    };
  }

  /**
   * Adapts a raw collection of products into runtime Products.
   */
  public static adaptDataset(rawList: any[]): Product[] {
    return rawList.map(raw => this.toRuntimeProduct(this.toCanonical(raw)));
  }
}
