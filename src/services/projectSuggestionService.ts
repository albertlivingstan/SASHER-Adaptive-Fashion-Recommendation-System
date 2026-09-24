import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

export interface GazeProductAnalysis {
  productId: string;
  productName: string;
  brand: string;
  category: string;
  dwellSeconds: number;
  fixationStabilityScore: number; // 0-100
  aestheticSignature: string;
  focusBreakdown: {
    feature: string;
    percentage: number;
    color: string;
  }[];
  visualTags: string[];
  intentLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'LOCKED';
}

export interface SuggestedProject {
  id: string;
  title: string;
  subtitle: string;
  curationCode: string;
  conceptNarrative: string;
  anchorProduct: Product;
  complementaryProducts: Product[];
  allProducts: Product[];
  totalRetailPrice: number;
  projectBundlePrice: number;
  bundleSavings: number;
  currency: string;
  colorPalette: { name: string; hex: string }[];
  styleSynergyScore: number; // 0-100
  fabricSynergy: string;
  seasonContext: string;
  keyLooksCount: number;
}

export class ProjectSuggestionService {
  /**
   * Performs real-time visual attention analysis on a product that captured the user's gaze
   */
  public analyzeGazedProduct(product: Product, dwellSeconds: number = 1.2): GazeProductAnalysis {
    const stability = Math.min(99, Math.round(75 + Math.min(24, dwellSeconds * 12)));
    
    // Determine feature focus weighting based on product feature vector
    const { minimalism, outerwear, tailoring, warmth, formal } = product.featureVector;
    
    const focusBreakdown = [
      {
        feature: 'Silhouette & Cut',
        percentage: Math.round(28 + minimalism * 18),
        color: '#ff6b1a'
      },
      {
        feature: 'Material & Texture',
        percentage: Math.round(24 + warmth * 16),
        color: '#ff3d7f'
      },
      {
        feature: 'Colorway & Tone',
        percentage: Math.round(22 + formal * 12),
        color: '#2997ff'
      },
      {
        feature: 'Functional Detailing',
        percentage: Math.max(10, 100 - (
          Math.round(28 + minimalism * 18) +
          Math.round(24 + warmth * 16) +
          Math.round(22 + formal * 12)
        )),
        color: '#10b981'
      }
    ];

    const visualTags = [
      product.style,
      product.material.split(',')[0],
      product.fit,
      `${product.season} Palette`
    ];

    const intentLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'LOCKED' = 
      dwellSeconds >= 2.0 ? 'LOCKED' :
      dwellSeconds >= 1.2 ? 'HIGH' :
      dwellSeconds >= 0.6 ? 'MEDIUM' : 'LOW';

    return {
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      category: product.category,
      dwellSeconds: parseFloat(dwellSeconds.toFixed(1)),
      fixationStabilityScore: stability,
      aestheticSignature: `${product.style} / ${product.fit}`,
      focusBreakdown,
      visualTags,
      intentLevel
    };
  }

  /**
   * Generates a curated styling and wardrobe project anchored on the gazed product
   */
  public generateProjectForProduct(anchorProduct: Product): SuggestedProject {
    const allCatalog = INITIAL_PRODUCTS;

    // Pick complementary items from DIFFERENT categories that match the anchor's aesthetic
    const complementary: Product[] = [];
    const usedCategories = new Set<string>([anchorProduct.category]);

    // Categories to seek in preference order
    const priorityCategories = ['Tailoring', 'Trousers', 'Knitwear', 'Footwear', 'Outerwear', 'Accessories', 'Tops']
      .filter(c => c !== anchorProduct.category);

    for (const cat of priorityCategories) {
      if (complementary.length >= 3) break;
      const candidates = allCatalog.filter(p => p.category === cat && p.id !== anchorProduct.id);
      if (candidates.length > 0) {
        // Find best aesthetic match
        const best = candidates.reduce((prev, curr) => {
          const prevDist = Math.abs(prev.featureVector.minimalism - anchorProduct.featureVector.minimalism);
          const currDist = Math.abs(curr.featureVector.minimalism - anchorProduct.featureVector.minimalism);
          return currDist < prevDist ? curr : prev;
        });
        complementary.push(best);
        usedCategories.add(cat);
      }
    }

    const allProjectItems = [anchorProduct, ...complementary];
    const totalRetail = allProjectItems.reduce((sum, item) => sum + item.price, 0);
    const bundleDiscount = 0.15; // 15% project ensemble discount
    const projectBundlePrice = Math.round(totalRetail * (1 - bundleDiscount));
    const bundleSavings = totalRetail - projectBundlePrice;

    // Aesthetic color palette derived from items
    const colorPalette = [
      { name: anchorProduct.color, hex: '#c5a059' },
      { name: 'Matte Obsidian', hex: '#1c1c1f' },
      { name: 'Warm Charcoal', hex: '#2c2c30' },
      { name: 'Chalk Off-White', hex: '#e4e4e7' }
    ];

    // Project title & narrative based on style and category
    let title = `Project: The ${anchorProduct.style} Capsule`;
    let subtitle = `Curated styling blueprint anchored by ${anchorProduct.name}`;
    let narrative = `Synthesized in real-time from your visual attention on ${anchorProduct.name}. This styling project harmonizes tactile double-faced textures with architectural tailoring, constructing a seamless modular wardrobe.`;

    if (anchorProduct.category === 'Outerwear') {
      title = `Project 01: The Architectural Winter Capsule`;
      subtitle = `Complete winter tailoring ensemble anchored by ${anchorProduct.name}`;
      narrative = `Gaze detection locked onto the silhouette and drape of this ${anchorProduct.name}. We assembled an effortless high-contrast silhouette pairing structured outerwear with refined knitwear and fluid trousers.`;
    } else if (anchorProduct.category === 'Tailoring') {
      title = `Project 02: Precision Monochromatic Uniform`;
      subtitle = `Formal & modern versatile collection built around ${anchorProduct.name}`;
      narrative = `Gaze focus revealed an affinity for structured sartorial tailoring. This project elevates the ${anchorProduct.name} with clean luxury essentials designed for effortless rotation.`;
    } else if (anchorProduct.category === 'Knitwear') {
      title = `Project 03: Tactile Cashmere & Wool Architecture`;
      subtitle = `Layering blueprint anchored by ${anchorProduct.name}`;
      narrative = `Gaze focus on knit structure and fiber texture triggered this tactile layering system, blending rich virgin wools with sculpted outerwear and modern footwear.`;
    }

    return {
      id: `proj-${anchorProduct.id}-${Date.now().toString(36)}`,
      title,
      subtitle,
      curationCode: `PRJ-EYE-${anchorProduct.id.toUpperCase()}`,
      conceptNarrative: narrative,
      anchorProduct,
      complementaryProducts: complementary,
      allProducts: allProjectItems,
      totalRetailPrice: totalRetail,
      projectBundlePrice,
      bundleSavings,
      currency: anchorProduct.currency,
      colorPalette,
      styleSynergyScore: Math.min(99, Math.round(92 + (anchorProduct.featureVector.minimalism * 6))),
      fabricSynergy: `${anchorProduct.material.split(',')[0]} + ${complementary[0]?.material.split(',')[0] || 'Virgin Wool'}`,
      seasonContext: anchorProduct.season,
      keyLooksCount: 3
    };
  }
}

export const projectSuggestionService = new ProjectSuggestionService();
