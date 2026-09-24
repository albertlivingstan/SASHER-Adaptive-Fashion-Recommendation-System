export interface YearlySalesData {
  year: number;
  revenueInLakhs: number; // in Lakhs (₹)
  unitsSold: number;
  averageOrderValue: number;
  fullPriceSellThroughRate: number; // percentage
  returnRate: number; // percentage
  conversionRate: number; // percentage
  sasherAttributedRevenuePct: number; // percentage attributed to SASHER
}

export interface QuarterlySalesData {
  quarter: string;
  revenueInLakhs: number;
  units: number;
  topRegion: string;
}

export interface RegionalDemand {
  region: string;
  sharePercent: number;
  growthRateYoY: number;
}

export interface BlueprintNode {
  id: string;
  title: string;
  role: string;
  gazeAttentionPercent: number;
  specs: string;
  xPct: number;
  yPct: number;
}

export interface ProductGraphicalModel {
  dimensions: {
    architecturalRigidity: number;
    gazeAttractionAffinity: number;
    crossSellingAffinity: number;
    priceInelasticity: number;
    styleLongevity: number;
    materialDensity: number;
    coldStartSurvivability: number;
  };
  blueprintNodes: BlueprintNode[];
  silhouetteVector: string;
}

export interface ProductSalesResearch {
  productId: string;
  productName: string;
  brand: string;
  category: string;
  releaseYear: number;
  price: number;
  currency: string;
  heroImage: string;
  totalHistoricalRevenueLakhs: number;
  totalUnitsSold: number;
  cumulativeReturnReductionPct: number;
  graphicalModel: ProductGraphicalModel;
  yearlySales: YearlySalesData[];
  quarterlySales2025: QuarterlySalesData[];
  regionalDemand: RegionalDemand[];
  channelAttribution: {
    channel: string;
    sharePercent: number;
    color: string;
  }[];
  econometricHighlights: {
    title: string;
    metric: string;
    description: string;
  }[];
  researchSynthesis: string;
}

// 65 Curated Luxury Garments Catalog Specification
interface RawProductSeed {
  id: string;
  name: string;
  brand: string;
  category: string;
  releaseYear: number;
  price: number;
  image: string;
  silhouette: string;
  materialDesc: string;
  keyFeature: string;
  anchorSeam: string;
  rigidity: number;
  gazeAffinity: number;
  crossSell: number;
  inelasticity: number;
  longevity: number;
  density: number;
  coldStart: number;
}

const RAW_SEEDS: RawProductSeed[] = [
  {
    id: 'prod-01',
    name: 'Oversized Double-Breasted Wool Coat',
    brand: 'ATELIER NOIR',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 18499,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 78 30 L 72 45 L 75 90 L 25 90 L 28 45 L 22 30 Z',
    materialDesc: '720gsm double-faced Virgin wool',
    keyFeature: 'Deep notch peak lapel & break line',
    anchorSeam: 'Dropped architectural shoulder seam',
    rigidity: 92, gazeAffinity: 96, crossSell: 88, inelasticity: 94, longevity: 98, density: 95, coldStart: 91
  },
  {
    id: 'prod-02',
    name: 'Sculptural Lambskin Biker Jacket',
    brand: 'STUDIO SASHER',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 24999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 30 18 L 70 18 L 82 32 L 74 50 L 70 82 L 30 82 L 26 50 L 18 32 Z',
    materialDesc: 'French full-grain lambskin skin 0.9mm',
    keyFeature: 'Asymmetrical titanium zip articulation',
    anchorSeam: 'Articulated curved sleeve darting',
    rigidity: 96, gazeAffinity: 94, crossSell: 84, inelasticity: 98, longevity: 96, density: 92, coldStart: 89
  },
  {
    id: 'prod-03',
    name: 'Tailored Single-Breasted Wool Blazer',
    brand: 'ATELIER NOIR',
    category: 'Tailoring',
    releaseYear: 2023,
    price: 16200,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 16 L 68 16 L 76 30 L 70 48 L 72 84 L 28 84 L 30 48 L 24 30 Z',
    materialDesc: 'Silk-Wool micro-weave weft 290gsm',
    keyFeature: 'Canvassed floating chest piece',
    anchorSeam: 'Sartorial double vent architecture',
    rigidity: 94, gazeAffinity: 91, crossSell: 95, inelasticity: 90, longevity: 97, density: 88, coldStart: 93
  },
  {
    id: 'prod-04',
    name: 'Ribbed Pure Cashmere Turtleneck',
    brand: 'MAISON ÉPURÉE',
    category: 'Knitwear',
    releaseYear: 2023,
    price: 12900,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 38 18 L 62 18 L 74 34 L 68 50 L 68 85 L 32 85 L 32 50 L 26 34 Z',
    materialDesc: '7-gauge Mongolian plateaus cashmere',
    keyFeature: 'Seamless raglan shoulder transition',
    anchorSeam: 'High-density micro-ribbed collar stand',
    rigidity: 78, gazeAffinity: 89, crossSell: 96, inelasticity: 88, longevity: 95, density: 84, coldStart: 90
  },
  {
    id: 'prod-05',
    name: 'Architectural Technical Trench Coat',
    brand: 'STUDIO SASHER',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 21500,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 14 L 66 14 L 80 32 L 72 52 L 76 92 L 24 92 L 28 52 L 20 32 Z',
    materialDesc: 'Bonded Egyptian cotton gabardine',
    keyFeature: 'Storm storm flap with gunmetal D-rings',
    anchorSeam: 'Waist-cinching architectural belt',
    rigidity: 95, gazeAffinity: 93, crossSell: 87, inelasticity: 92, longevity: 97, density: 91, coldStart: 88
  },
  {
    id: 'prod-06',
    name: 'Pleated Wide-Leg Wool Trousers',
    brand: 'ATELIER NOIR',
    category: 'Trousers',
    releaseYear: 2023,
    price: 11200,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 72 90 L 53 90 L 50 48 L 47 90 L 28 90 L 34 40 Z',
    materialDesc: 'Worsted wool twill full drape',
    keyFeature: 'Deep forward pleats with extended tab',
    anchorSeam: 'Fluid continuous hem break line',
    rigidity: 88, gazeAffinity: 86, crossSell: 98, inelasticity: 89, longevity: 96, density: 87, coldStart: 92
  },
  {
    id: 'prod-07',
    name: 'Minimalist Heavyweight Cotton Tee',
    brand: 'MAISON ÉPURÉE',
    category: 'Tops',
    releaseYear: 2023,
    price: 3900,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 22 L 66 22 L 78 38 L 68 46 L 68 84 L 32 84 L 32 46 L 22 38 Z',
    materialDesc: '280gsm GOTS organic long-staple cotton',
    keyFeature: 'Dense shape-retention collar binding',
    anchorSeam: 'Boxy drop-shoulder silhouette plane',
    rigidity: 82, gazeAffinity: 84, crossSell: 99, inelasticity: 84, longevity: 94, density: 85, coldStart: 96
  },
  {
    id: 'prod-08',
    name: 'Calfskin Commando Derby Shoes',
    brand: 'ATELIER NOIR',
    category: 'Footwear',
    releaseYear: 2023,
    price: 17500,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 25 55 L 60 50 L 80 60 L 85 75 L 75 85 L 20 85 L 18 70 Z',
    materialDesc: 'Goodyear-welted French box calfskin',
    keyFeature: 'Exaggerated Vibram commando lug sole',
    anchorSeam: 'Hand-burnished blind-eyelet quarters',
    rigidity: 97, gazeAffinity: 92, crossSell: 91, inelasticity: 95, longevity: 98, density: 98, coldStart: 87
  },
  {
    id: 'prod-09',
    name: 'Structured Raw Selvedge Architectural Denim',
    brand: 'STUDIO SASHER',
    category: 'Trousers',
    releaseYear: 2023,
    price: 8900,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 22 L 65 22 L 67 42 L 70 88 L 52 88 L 50 48 L 48 88 L 30 88 L 33 42 Z',
    materialDesc: '14.5oz Kuroki Mills pink selvedge denim',
    keyFeature: 'Unwashed raw indigo rigid warp',
    anchorSeam: 'Solid copper debossed burr rivets',
    rigidity: 96, gazeAffinity: 88, crossSell: 93, inelasticity: 87, longevity: 97, density: 94, coldStart: 91
  },
  {
    id: 'prod-11',
    name: 'Brushed Alpaca Wool Scarf',
    brand: 'ATELIER NOIR',
    category: 'Accessories',
    releaseYear: 2023,
    price: 6200,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 40 10 L 60 10 L 62 85 L 58 92 L 42 92 L 38 85 Z',
    materialDesc: '80% Peruvian baby alpaca fleece',
    keyFeature: 'Feathered tactile eyelash fringe',
    anchorSeam: 'Oversized 220cm wrap envelopment',
    rigidity: 70, gazeAffinity: 90, crossSell: 97, inelasticity: 86, longevity: 94, density: 82, coldStart: 94
  },
  {
    id: 'prod-12',
    name: 'Sculpted Vegetable-Tanned Leather Tote',
    brand: 'STUDIO SASHER',
    category: 'Accessories',
    releaseYear: 2023,
    price: 14500,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 30 35 L 70 35 L 75 85 L 25 85 Z M 40 35 C 40 18 60 18 60 35',
    materialDesc: '3.5mm Tuscan vegetable-tanned bridle leather',
    keyFeature: 'Monolithic seamless bottom gusset',
    anchorSeam: 'Hand-burnished wax edge beveling',
    rigidity: 98, gazeAffinity: 94, crossSell: 92, inelasticity: 96, longevity: 99, density: 97, coldStart: 89
  },
  // 13 - 25: Tailoring, Outerwear & Tops
  {
    id: 'prod-13',
    name: 'Asymmetrical Wool Crepe Cape',
    brand: 'KINETIC DRAPE',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 19800,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 85 45 L 80 88 L 20 88 L 15 45 Z',
    materialDesc: 'Dense 450gsm woven wool crepe',
    keyFeature: 'Bias-cut sweeping hem asymmetry',
    anchorSeam: 'Single magnetic collar fastener',
    rigidity: 90, gazeAffinity: 95, crossSell: 86, inelasticity: 93, longevity: 95, density: 90, coldStart: 91
  },
  {
    id: 'prod-14',
    name: 'Deconstructed Poplin Shirt',
    brand: 'MAISON ÉPURÉE',
    category: 'Tops',
    releaseYear: 2023,
    price: 7800,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 20 L 65 20 L 76 36 L 68 48 L 68 85 L 32 85 L 32 48 L 24 36 Z',
    materialDesc: '120s 2-ply Egyptian cotton poplin',
    keyFeature: 'Offset concealed placket with band collar',
    anchorSeam: 'Stepped split high-low hem',
    rigidity: 84, gazeAffinity: 87, crossSell: 96, inelasticity: 85, longevity: 93, density: 82, coldStart: 92
  },
  {
    id: 'prod-15',
    name: 'Structured Gabardine Trench Vest',
    brand: 'STUDIO SASHER',
    category: 'Outerwear',
    releaseYear: 2024,
    price: 16900,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 18 L 65 18 L 72 32 L 68 50 L 70 88 L 30 88 L 32 50 L 28 32 Z',
    materialDesc: 'Heavy 380gsm compact worsted twill',
    keyFeature: 'Sleeveless cutaway tailoring with storm flaps',
    anchorSeam: 'Industrial metal buckle cincher',
    rigidity: 94, gazeAffinity: 92, crossSell: 89, inelasticity: 91, longevity: 96, density: 93, coldStart: 88
  },
  {
    id: 'prod-16',
    name: 'Silk Georgette Pleated Blouse',
    brand: 'SARTORIAL SILK',
    category: 'Tops',
    releaseYear: 2023,
    price: 9400,
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 38 20 L 62 20 L 74 38 L 66 48 L 66 82 L 34 82 L 34 48 L 26 38 Z',
    materialDesc: '100% 16mm Mulberry Silk Georgette',
    keyFeature: 'Micro-knife pleats down chest bib',
    anchorSeam: 'Single button French cuff closure',
    rigidity: 75, gazeAffinity: 91, crossSell: 94, inelasticity: 89, longevity: 96, density: 78, coldStart: 93
  },
  {
    id: 'prod-17',
    name: 'Zero-Waste Boiled Wool Kimono',
    brand: 'KINETIC DRAPE',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 17200,
    image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 30 18 L 70 18 L 86 42 L 72 48 L 72 88 L 28 88 L 28 48 L 14 42 Z',
    materialDesc: '520gsm Austrian boiled wool',
    keyFeature: 'Zero-waste geometric pattern tessellation',
    anchorSeam: 'Deep crossover overlap with sash',
    rigidity: 91, gazeAffinity: 94, crossSell: 88, inelasticity: 92, longevity: 97, density: 94, coldStart: 89
  },
  {
    id: 'prod-18',
    name: 'High-Twist Wool Flannel Trousers',
    brand: 'ATELIER NOIR',
    category: 'Trousers',
    releaseYear: 2024,
    price: 12400,
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 70 88 L 52 88 L 50 48 L 48 88 L 30 88 L 34 40 Z',
    materialDesc: '340gsm High-twist worsted flannel',
    keyFeature: 'Continuous side-adjuster buckle tabs',
    anchorSeam: 'Sharp pressed center crease line',
    rigidity: 89, gazeAffinity: 87, crossSell: 97, inelasticity: 91, longevity: 98, density: 90, coldStart: 92
  },
  {
    id: 'prod-19',
    name: 'Ribbed Knit Cashmere Midi Skirt',
    brand: 'MAISON ÉPURÉE',
    category: 'Trousers',
    releaseYear: 2023,
    price: 11500,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 38 24 L 62 24 L 66 60 L 64 88 L 36 88 L 34 60 Z',
    materialDesc: '12-gauge 2-ply Mongolian Cashmere',
    keyFeature: 'Fluid column drape with subtle side vent',
    anchorSeam: 'Seamless encased elastic waistband',
    rigidity: 76, gazeAffinity: 89, crossSell: 95, inelasticity: 88, longevity: 95, density: 82, coldStart: 90
  },
  {
    id: 'prod-20',
    name: 'Brushed Mohair Gradient Cardigan',
    brand: 'ARCHIVE 92',
    category: 'Knitwear',
    releaseYear: 2023,
    price: 14800,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 18 L 65 18 L 78 34 L 70 50 L 70 85 L 30 85 L 30 50 L 22 34 Z',
    materialDesc: '68% South African Kid Mohair / 28% Wool',
    keyFeature: 'Hand-dyed ombré smoke gradient',
    anchorSeam: 'Substantial 25mm natural corozo buttons',
    rigidity: 79, gazeAffinity: 97, crossSell: 90, inelasticity: 90, longevity: 92, density: 84, coldStart: 94
  },
  {
    id: 'prod-21',
    name: 'Sartorial Tuxedo Peak Lapel Jacket',
    brand: 'ATELIER NOIR',
    category: 'Tailoring',
    releaseYear: 2023,
    price: 28000,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 16 L 68 16 L 76 32 L 70 48 L 72 84 L 28 84 L 30 48 L 24 32 Z',
    materialDesc: 'Barathea weave wool with duchess silk facing',
    keyFeature: 'Grosgrain faced dramatic peak lapel',
    anchorSeam: 'Hand-basted canvas chest construction',
    rigidity: 98, gazeAffinity: 98, crossSell: 88, inelasticity: 99, longevity: 99, density: 96, coldStart: 91
  },
  {
    id: 'prod-22',
    name: 'Minimalist Chelsea Boots with Crepe Sole',
    brand: 'STUDIO SASHER',
    category: 'Footwear',
    releaseYear: 2023,
    price: 18900,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 25 50 L 55 45 L 75 55 L 82 72 L 78 85 L 22 85 L 20 68 Z',
    materialDesc: 'Water-resistant Italian oiled suede',
    keyFeature: 'Natural plantation crepe rubber sole',
    anchorSeam: 'Seamless one-piece vamp cutting',
    rigidity: 94, gazeAffinity: 91, crossSell: 94, inelasticity: 93, longevity: 97, density: 95, coldStart: 90
  },
  {
    id: 'prod-23',
    name: 'Structured Saddle Bag in Smooth Calf',
    brand: 'MAISON ÉPURÉE',
    category: 'Accessories',
    releaseYear: 2024,
    price: 13500,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 30 L 68 30 C 74 50 68 85 50 85 C 32 85 26 50 32 30',
    materialDesc: 'Smooth French semi-aniline calfskin',
    keyFeature: 'Sculpted curved base with hidden closure',
    anchorSeam: 'Adjustable tailored shoulder strap',
    rigidity: 96, gazeAffinity: 94, crossSell: 93, inelasticity: 95, longevity: 98, density: 96, coldStart: 92
  },
  {
    id: 'prod-24',
    name: 'Technical Shell Field Parka',
    brand: 'STUDIO SASHER',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 22900,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 16 L 66 16 L 82 32 L 75 52 L 76 90 L 24 90 L 25 52 L 18 32 Z',
    materialDesc: '3-Layer recycled ripstop with membrane',
    keyFeature: 'Fully seam-sealed storm engineering',
    anchorSeam: 'Articulated dual-access cargo wells',
    rigidity: 95, gazeAffinity: 93, crossSell: 87, inelasticity: 92, longevity: 96, density: 92, coldStart: 89
  },
  {
    id: 'prod-25',
    name: 'Double-Pleated Linen Summer Trousers',
    brand: 'MAISON ÉPURÉE',
    category: 'Trousers',
    releaseYear: 2024,
    price: 9800,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 67 40 L 72 88 L 53 88 L 50 48 L 47 88 L 28 88 L 33 40 Z',
    materialDesc: 'Heavy 310gsm Belgian washed flax linen',
    keyFeature: 'Breathable fluid drape with relaxed thigh',
    anchorSeam: 'Extended tab closure with horn buttons',
    rigidity: 82, gazeAffinity: 88, crossSell: 96, inelasticity: 87, longevity: 94, density: 85, coldStart: 91
  },
  // 26 - 40: Knitwear, Tops, Leather Goods & Footwear
  {
    id: 'prod-26',
    name: 'Fine-Gauge Merino Polo Sweater',
    brand: 'ATELIER NOIR',
    category: 'Knitwear',
    releaseYear: 2023,
    price: 10500,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: 'Extrafine 19.5-micron Australian Merino',
    keyFeature: 'Seamless knit collar with continuous placket',
    anchorSeam: 'Fully fashioned armhole shaping',
    rigidity: 80, gazeAffinity: 89, crossSell: 97, inelasticity: 88, longevity: 96, density: 83, coldStart: 93
  },
  {
    id: 'prod-27',
    name: 'Cupro Blend Fluid Overshirt',
    brand: 'KINETIC DRAPE',
    category: 'Tops',
    releaseYear: 2024,
    price: 8900,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 20 L 66 20 L 78 36 L 70 48 L 70 85 L 30 85 L 30 48 L 22 36 Z',
    materialDesc: '60% Cupro / 40% Tencel Lyocell',
    keyFeature: 'Liquid drape with peach-skin matte sheen',
    anchorSeam: 'Dual oversized patch chest pockets',
    rigidity: 77, gazeAffinity: 92, crossSell: 95, inelasticity: 86, longevity: 93, density: 80, coldStart: 91
  },
  {
    id: 'prod-28',
    name: 'Hand-Stitched Belgian Loafers',
    brand: 'ATELIER NOIR',
    category: 'Footwear',
    releaseYear: 2023,
    price: 19500,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 25 58 L 58 52 L 78 60 L 82 72 L 76 84 L 20 84 L 18 70 Z',
    materialDesc: 'Unlined soft calfskin with leather outsole',
    keyFeature: 'Discrete leather bow vamp accent',
    anchorSeam: 'Traditional turn-and-stitch construction',
    rigidity: 92, gazeAffinity: 91, crossSell: 93, inelasticity: 96, longevity: 98, density: 93, coldStart: 89
  },
  {
    id: 'prod-29',
    name: 'Heavyweight Loopback Hooded Sweatshirt',
    brand: 'ARCHIVE 92',
    category: 'Tops',
    releaseYear: 2023,
    price: 7200,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 16 L 66 16 L 80 34 L 70 48 L 70 86 L 30 86 L 30 48 L 20 34 Z',
    materialDesc: '480gsm Japanese French terry loopback',
    keyFeature: 'Double-walled standing architectural hood',
    anchorSeam: 'Flatlock seam flat abrasion finish',
    rigidity: 88, gazeAffinity: 86, crossSell: 94, inelasticity: 85, longevity: 95, density: 92, coldStart: 92
  },
  {
    id: 'prod-30',
    name: 'Bridle Leather Architectural Belt',
    brand: 'STUDIO SASHER',
    category: 'Accessories',
    releaseYear: 2023,
    price: 5200,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 15 45 L 85 45 L 85 55 L 15 55 Z M 22 42 L 32 42 L 32 58 L 22 58 Z',
    materialDesc: 'English equestrian bridle leather 4mm',
    keyFeature: 'Solid cast brass buckle with matte nickel',
    anchorSeam: 'Teardrop punched prong apertures',
    rigidity: 99, gazeAffinity: 85, crossSell: 99, inelasticity: 92, longevity: 99, density: 99, coldStart: 95
  },
  {
    id: 'prod-31',
    name: 'Wool Silk Double-Layer Duster Coat',
    brand: 'KINETIC DRAPE',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 24500,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 80 32 L 74 50 L 76 94 L 24 94 L 26 50 L 20 32 Z',
    materialDesc: 'Fine worsted wool bonded with habotai silk',
    keyFeature: 'Floor-skimming continuous silhouette line',
    anchorSeam: 'Invisible bound edge finishing',
    rigidity: 91, gazeAffinity: 96, crossSell: 86, inelasticity: 95, longevity: 98, density: 89, coldStart: 90
  },
  {
    id: 'prod-32',
    name: 'Structured Poplin Wrap Shirt',
    brand: 'MAISON ÉPURÉE',
    category: 'Tops',
    releaseYear: 2024,
    price: 8400,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: 'Crisp organic cotton poplin 140gsm',
    keyFeature: 'Self-tie cross body wrap geometry',
    anchorSeam: 'Elongated French cuff with twin buttons',
    rigidity: 83, gazeAffinity: 91, crossSell: 95, inelasticity: 87, longevity: 94, density: 81, coldStart: 92
  },
  {
    id: 'prod-33',
    name: 'Chunky Ribbed Wool Watch Cap',
    brand: 'ARCHIVE 92',
    category: 'Accessories',
    releaseYear: 2023,
    price: 3600,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 60 C 32 30 68 30 68 60 L 68 75 L 32 75 Z',
    materialDesc: '100% British Shetland wool',
    keyFeature: 'Double-folded dense rib brim',
    anchorSeam: 'Crown circular 4-needle decrease',
    rigidity: 86, gazeAffinity: 84, crossSell: 99, inelasticity: 84, longevity: 96, density: 91, coldStart: 96
  },
  {
    id: 'prod-34',
    name: 'Japanese Canvas Minimalist Sneakers',
    brand: 'STUDIO SASHER',
    category: 'Footwear',
    releaseYear: 2023,
    price: 11900,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 20 60 L 55 55 L 80 62 L 85 75 L 75 85 L 18 85 L 16 72 Z',
    materialDesc: 'Kurashiki Hanpu heavy duck canvas',
    keyFeature: 'Kiln-fired vulcanized rubber outsole',
    anchorSeam: 'Reinforced canvas toe cap and heel counter',
    rigidity: 90, gazeAffinity: 88, crossSell: 95, inelasticity: 88, longevity: 96, density: 90, coldStart: 94
  },
  {
    id: 'prod-35',
    name: 'Tailored Wool-Mohair Dinner Trousers',
    brand: 'ATELIER NOIR',
    category: 'Tailoring',
    releaseYear: 2023,
    price: 13900,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 70 88 L 52 88 L 50 48 L 48 88 L 30 88 L 34 40 Z',
    materialDesc: '75% Wool / 25% Mohair with natural luster',
    keyFeature: 'Silk satin side gallon stripe',
    anchorSeam: 'Flat front waistband with side tab adjusters',
    rigidity: 94, gazeAffinity: 92, crossSell: 92, inelasticity: 95, longevity: 98, density: 92, coldStart: 90
  },
  {
    id: 'prod-36',
    name: 'Double-Layer Cotton Jersey Tank',
    brand: 'MAISON ÉPURÉE',
    category: 'Tops',
    releaseYear: 2024,
    price: 3200,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 38 22 L 62 22 L 66 38 L 66 84 L 34 84 L 34 38 Z',
    materialDesc: 'Double-ply Supima combed jersey',
    keyFeature: 'Seamless binding with scooped neck',
    anchorSeam: 'Straight raw-finished hem edge',
    rigidity: 75, gazeAffinity: 82, crossSell: 99, inelasticity: 82, longevity: 92, density: 79, coldStart: 97
  },
  {
    id: 'prod-37',
    name: 'Sculpted Titanium Minimalist Eyewear',
    brand: 'STUDIO SASHER',
    category: 'Accessories',
    releaseYear: 2023,
    price: 21000,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 20 48 L 45 48 L 48 52 L 52 52 L 55 48 L 80 48 L 82 58 L 55 58 L 45 58 L 18 58 Z',
    materialDesc: 'Beta-titanium milled frame with Carl Zeiss lenses',
    keyFeature: 'Screwless integrated barrel hinge',
    anchorSeam: 'Custom anti-reflective polarized coating',
    rigidity: 99, gazeAffinity: 98, crossSell: 91, inelasticity: 98, longevity: 99, density: 98, coldStart: 92
  },
  {
    id: 'prod-38',
    name: 'Fine Merino Waffle Thermal Crew',
    brand: 'ARCHIVE 92',
    category: 'Knitwear',
    releaseYear: 2023,
    price: 8900,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: '100% Merino in 3D honeycomb waffle knit',
    keyFeature: 'Micro-thermal honeycomb heat trapping',
    anchorSeam: 'Thumbhole slit cuffs with reinforced ribbing',
    rigidity: 81, gazeAffinity: 88, crossSell: 95, inelasticity: 86, longevity: 94, density: 87, coldStart: 93
  },
  {
    id: 'prod-39',
    name: 'Double-Breasted Wool Peacoat',
    brand: 'ATELIER NOIR',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 21900,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 85 45 L 80 88 L 20 88 L 15 45 Z',
    materialDesc: 'Heavy 680gsm Melton wool with horn anchor buttons',
    keyFeature: 'Broad lapel with storm-tab closure',
    anchorSeam: 'Hand-sewn armhole gussets for ease of layering',
    rigidity: 87, gazeAffinity: 92, crossSell: 88, inelasticity: 91, longevity: 98, density: 90, coldStart: 88
  },
  {
    id: 'prod-40',
    name: 'Boxy Felted Wool Chore Overshirt',
    brand: 'STUDIO SASHER',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 15400,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 18 L 66 18 L 78 34 L 72 48 L 72 86 L 28 86 L 28 48 L 22 34 Z',
    materialDesc: 'Dense 420gsm recycled felted wool',
    keyFeature: 'Three patch utility pockets with blind tacking',
    anchorSeam: 'Matte horn button placket with taped facing',
    rigidity: 93, gazeAffinity: 91, crossSell: 92, inelasticity: 91, longevity: 97, density: 95, coldStart: 91
  },
  // 41 - 65: Completing 65 Products Catalog
  {
    id: 'prod-41',
    name: 'Matte Calfskin Card Holder & Lanyard',
    brand: 'MAISON ÉPURÉE',
    category: 'Accessories',
    releaseYear: 2024,
    price: 4800,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 40 L 65 40 L 65 65 L 35 65 Z',
    materialDesc: 'Full-grain semi-matte French box calf',
    keyFeature: '4 card slots with central currency sleeve',
    anchorSeam: 'Hand edge-inked and saddle stitched',
    rigidity: 96, gazeAffinity: 85, crossSell: 99, inelasticity: 89, longevity: 98, density: 97, coldStart: 97
  },
  {
    id: 'prod-42',
    name: 'Wool-Cashmere Ribbed Knit Beanie',
    brand: 'ATELIER NOIR',
    category: 'Accessories',
    releaseYear: 2023,
    price: 4200,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 60 C 32 30 68 30 68 60 L 68 75 L 32 75 Z',
    materialDesc: '70% Extrafine Wool / 30% Cashmere',
    keyFeature: 'Dense 2x2 ribbing with clean crown shaping',
    anchorSeam: 'Tone-on-tone minimal bar tack label',
    rigidity: 84, gazeAffinity: 86, crossSell: 99, inelasticity: 87, longevity: 95, density: 88, coldStart: 96
  },
  {
    id: 'prod-43',
    name: 'Relaxed Silk Pajama Shirt',
    brand: 'SARTORIAL SILK',
    category: 'Tops',
    releaseYear: 2024,
    price: 11800,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 20 L 65 20 L 78 36 L 70 48 L 70 85 L 30 85 L 30 48 L 22 36 Z',
    materialDesc: '22mm Sandwashed Silk Charmeuse',
    keyFeature: 'Cuban camp collar with contrast piping',
    anchorSeam: 'Genuine mother-of-pearl disc buttons',
    rigidity: 73, gazeAffinity: 93, crossSell: 94, inelasticity: 90, longevity: 96, density: 78, coldStart: 91
  },
  {
    id: 'prod-44',
    name: 'Tailored Flannel Cargo Trousers',
    brand: 'STUDIO SASHER',
    category: 'Trousers',
    releaseYear: 2023,
    price: 12800,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 70 88 L 52 88 L 50 48 L 48 88 L 30 88 L 34 40 Z',
    materialDesc: 'Worsted wool flannel with Teflon finish',
    keyFeature: 'Streamlined bellowed cargo side compartments',
    anchorSeam: 'Drawcord adjustable tapered cuff opening',
    rigidity: 91, gazeAffinity: 90, crossSell: 95, inelasticity: 89, longevity: 96, density: 92, coldStart: 92
  },
  {
    id: 'prod-45',
    name: 'Sculptural Asymmetric Wool Vest',
    brand: 'KINETIC DRAPE',
    category: 'Tailoring',
    releaseYear: 2024,
    price: 13200,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 18 L 64 18 L 70 32 L 66 50 L 68 84 L 32 84 L 34 50 L 30 32 Z',
    materialDesc: 'Compact 320gsm wool barathea',
    keyFeature: 'Crossover angled single-point hemline',
    anchorSeam: 'Concealed hook-and-eye fastening track',
    rigidity: 93, gazeAffinity: 93, crossSell: 92, inelasticity: 92, longevity: 97, density: 90, coldStart: 90
  },
  {
    id: 'prod-46',
    name: 'Suede Monk Strap Dress Shoes',
    brand: 'ATELIER NOIR',
    category: 'Footwear',
    releaseYear: 2023,
    price: 18400,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 25 55 L 60 50 L 80 60 L 85 75 L 75 85 L 20 85 L 18 70 Z',
    materialDesc: 'English Janus calf suede with storm welt',
    keyFeature: 'Brushed gunmetal dual buckle fastening',
    anchorSeam: 'Channelled Goodyear leather sole with rubber heel',
    rigidity: 96, gazeAffinity: 91, crossSell: 92, inelasticity: 94, longevity: 98, density: 96, coldStart: 88
  },
  {
    id: 'prod-47',
    name: 'Sheer Silk Chiffon Scarf',
    brand: 'SARTORIAL SILK',
    category: 'Accessories',
    releaseYear: 2023,
    price: 5800,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 40 10 L 60 10 L 62 85 L 58 92 L 42 92 L 38 85 Z',
    materialDesc: '100% Mulberry Silk Chiffon 8mm',
    keyFeature: 'Hand-rolled Parisian edges with micro stitch',
    anchorSeam: 'Ultra-light ethereal drape in smoke grey',
    rigidity: 68, gazeAffinity: 92, crossSell: 97, inelasticity: 88, longevity: 96, density: 72, coldStart: 94
  },
  {
    id: 'prod-48',
    name: 'Brushed Wool Oversized Scarf',
    brand: 'MAISON ÉPURÉE',
    category: 'Accessories',
    releaseYear: 2023,
    price: 6800,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 38 12 L 62 12 L 64 88 L 60 94 L 40 94 L 36 88 Z',
    materialDesc: '100% Extrafine Australian Wool 380gsm',
    keyFeature: 'Brushed fleece handfeel with oversized check weave',
    anchorSeam: '10cm twisted rope tassel fringe',
    rigidity: 78, gazeAffinity: 89, crossSell: 98, inelasticity: 87, longevity: 95, density: 88, coldStart: 95
  },
  {
    id: 'prod-49',
    name: 'Minimalist Leather Weekend Bag',
    brand: 'STUDIO SASHER',
    category: 'Accessories',
    releaseYear: 2023,
    price: 26500,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 20 40 L 80 40 L 85 85 L 15 85 Z M 35 40 C 35 25 65 25 65 40',
    materialDesc: 'Full grain vegetable-tanned French calf',
    keyFeature: 'Solid brass YKK Excella two-way zipper',
    anchorSeam: 'Reinforced tubular leather carry handles',
    rigidity: 97, gazeAffinity: 95, crossSell: 90, inelasticity: 97, longevity: 99, density: 98, coldStart: 89
  },
  {
    id: 'prod-50',
    name: 'Structured Melton Wool Overshirt',
    brand: 'KINETIC DRAPE',
    category: 'Outerwear',
    releaseYear: 2024,
    price: 18500,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 18 L 66 18 L 78 34 L 72 48 L 72 86 L 28 86 L 28 48 L 22 34 Z',
    materialDesc: 'Dense 450gsm double-woven wool twill',
    keyFeature: 'Dual chest flap pockets with concealed press-studs',
    anchorSeam: 'Reinforced box pleat back yoke',
    rigidity: 86, gazeAffinity: 90, crossSell: 84, inelasticity: 89, longevity: 97, density: 88, coldStart: 88
  },
  {
    id: 'prod-51',
    name: 'Fine Merino Long-Sleeve Base Layer',
    brand: 'ARCHIVE 92',
    category: 'Tops',
    releaseYear: 2023,
    price: 5900,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: '160gsm 17.5-micron ultra-soft Merino wool',
    keyFeature: 'Flatlock friction-free seam placement',
    anchorSeam: 'Natural thermo-regulating and anti-odor fiber',
    rigidity: 77, gazeAffinity: 83, crossSell: 99, inelasticity: 85, longevity: 96, density: 81, coldStart: 95
  },
  {
    id: 'prod-52',
    name: 'Drop-Crotch Wool Crepe Trousers',
    brand: 'KINETIC DRAPE',
    category: 'Trousers',
    releaseYear: 2023,
    price: 12500,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 70 88 L 52 88 L 50 58 L 48 88 L 30 88 L 34 40 Z',
    materialDesc: '100% High-twist wool crepe twill',
    keyFeature: 'Relaxed drop rise with sharply tapered lower calf',
    anchorSeam: 'Elasticated rear waistband with flat tailored front',
    rigidity: 87, gazeAffinity: 91, crossSell: 94, inelasticity: 88, longevity: 95, density: 87, coldStart: 91
  },
  {
    id: 'prod-53',
    name: 'Cashmere-Silk Lightweight Crewneck',
    brand: 'MAISON ÉPURÉE',
    category: 'Knitwear',
    releaseYear: 2023,
    price: 11900,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: '70% Mongolian Cashmere / 30% Mulberry Silk',
    keyFeature: 'Featherlight 16-gauge knit with subtle sheen',
    anchorSeam: 'Seamless tubular neckband and micro-ribbed cuffs',
    rigidity: 76, gazeAffinity: 90, crossSell: 97, inelasticity: 89, longevity: 97, density: 80, coldStart: 93
  },
  {
    id: 'prod-54',
    name: 'Structured Trench Rain Cape',
    brand: 'STUDIO SASHER',
    category: 'Outerwear',
    releaseYear: 2024,
    price: 18500,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 85 45 L 80 88 L 20 88 L 15 45 Z',
    materialDesc: 'Rubberized bonded cotton twill waterproof',
    keyFeature: 'Integrated hood with snap side vent closure',
    anchorSeam: 'Bonded taped waterproof seams throughout',
    rigidity: 96, gazeAffinity: 92, crossSell: 88, inelasticity: 93, longevity: 96, density: 94, coldStart: 89
  },
  {
    id: 'prod-55',
    name: 'Double-Faced Wool Blanket Coat',
    brand: 'ATELIER NOIR',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 23500,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 80 32 L 74 50 L 76 94 L 24 94 L 26 50 L 20 32 Z',
    materialDesc: '680gsm unlined double-faced virgin wool',
    keyFeature: 'Split-cloth hand-stitched invisible hems',
    anchorSeam: 'Oversized shawl collar draping to waist',
    rigidity: 92, gazeAffinity: 96, crossSell: 87, inelasticity: 95, longevity: 98, density: 96, coldStart: 91
  },
  {
    id: 'prod-56',
    name: 'Tailored Wide-Lapel Evening Blazer',
    brand: 'ATELIER NOIR',
    category: 'Tailoring',
    releaseYear: 2023,
    price: 19800,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 16 L 68 16 L 76 32 L 70 48 L 72 84 L 28 84 L 30 48 L 24 32 Z',
    materialDesc: 'Super 150s worsted wool with silk lapel',
    keyFeature: '12cm sweeping architectural peak lapel',
    anchorSeam: 'Genuine horn button and functional sleeve buttonholes',
    rigidity: 95, gazeAffinity: 96, crossSell: 90, inelasticity: 96, longevity: 98, density: 93, coldStart: 90
  },
  {
    id: 'prod-57',
    name: 'Japanese Selvedge Chino Trousers',
    brand: 'STUDIO SASHER',
    category: 'Trousers',
    releaseYear: 2023,
    price: 9400,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 70 88 L 52 88 L 50 48 L 48 88 L 30 88 L 34 40 Z',
    materialDesc: '12oz Shuttle-loom combed cotton twill',
    keyFeature: 'Clean orange selvedge outer seam ticker',
    anchorSeam: 'Corozo nut button fly with chainstitched waistband',
    rigidity: 91, gazeAffinity: 86, crossSell: 96, inelasticity: 87, longevity: 97, density: 91, coldStart: 93
  },
  {
    id: 'prod-58',
    name: 'Brushed Cashmere Crew Neck Jumper',
    brand: 'MAISON ÉPURÉE',
    category: 'Knitwear',
    releaseYear: 2023,
    price: 13500,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: 'Pure 4-ply Mongolian Cashmere brushed',
    keyFeature: 'Natural thistle teasel brushed surface halo',
    anchorSeam: 'Reinforced elastane-tipped rib trims',
    rigidity: 78, gazeAffinity: 92, crossSell: 96, inelasticity: 91, longevity: 97, density: 86, coldStart: 92
  },
  {
    id: 'prod-59',
    name: 'Italian Calfskin Architectural Mule',
    brand: 'ATELIER NOIR',
    category: 'Footwear',
    releaseYear: 2024,
    price: 15800,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 25 58 L 58 52 L 78 60 L 82 72 L 76 84 L 20 84 L 18 70 Z',
    materialDesc: 'Vegetable-dyed nappa with curved wooden block heel',
    keyFeature: 'Square chiselled toe silhouette plane',
    anchorSeam: 'Cushioned memory foam arch support bed',
    rigidity: 93, gazeAffinity: 94, crossSell: 91, inelasticity: 93, longevity: 96, density: 94, coldStart: 89
  },
  {
    id: 'prod-60',
    name: 'Bonded Scuba Knit Architectural Sweatshirt',
    brand: 'STUDIO SASHER',
    category: 'Tops',
    releaseYear: 2023,
    price: 8200,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 34 20 L 66 20 L 78 36 L 70 48 L 70 85 L 30 85 L 30 48 L 22 36 Z',
    materialDesc: 'Bonded 360gsm modal scuba double-knit',
    keyFeature: 'Self-supporting clean sculptural volume',
    anchorSeam: 'Laser-cut thermal welded hem finish',
    rigidity: 92, gazeAffinity: 89, crossSell: 94, inelasticity: 87, longevity: 95, density: 92, coldStart: 92
  },
  {
    id: 'prod-61',
    name: 'Fine Gauge Silk-Cotton Polo',
    brand: 'SARTORIAL SILK',
    category: 'Tops',
    releaseYear: 2024,
    price: 7900,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 76 36 L 68 48 L 68 84 L 32 84 L 32 48 L 24 36 Z',
    materialDesc: '55% Silk / 45% Long-staple Egyptian Cotton',
    keyFeature: 'Subtle cool-touch handfeel with gentle luster',
    anchorSeam: 'Real mother-of-pearl buttons with shank wrapping',
    rigidity: 79, gazeAffinity: 88, crossSell: 96, inelasticity: 87, longevity: 96, density: 82, coldStart: 94
  },
  {
    id: 'prod-62',
    name: 'Wool-Cashmere Tailored Overcoat with Belt',
    brand: 'MAISON ÉPURÉE',
    category: 'Outerwear',
    releaseYear: 2023,
    price: 24900,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 35 15 L 65 15 L 80 32 L 74 50 L 76 94 L 24 94 L 26 50 L 20 32 Z',
    materialDesc: '85% Virgin Wool / 15% Cashmere 620gsm',
    keyFeature: 'Self-fabric tie belt with architectural loop passes',
    anchorSeam: 'Deep raglan sleeves allowing heavy tailored layering',
    rigidity: 93, gazeAffinity: 97, crossSell: 87, inelasticity: 96, longevity: 99, density: 95, coldStart: 90
  },
  {
    id: 'prod-63',
    name: 'Corduroy Wide-Leg Workwear Trousers',
    brand: 'ARCHIVE 92',
    category: 'Trousers',
    releaseYear: 2023,
    price: 9200,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 36 20 L 64 20 L 66 40 L 70 88 L 52 88 L 50 48 L 48 88 L 30 88 L 34 40 Z',
    materialDesc: 'Heavy 8-wale British Brisbane Moss corduroy',
    keyFeature: 'Substantial velvety texture with high thermal mass',
    anchorSeam: 'Reinforced knee patches and tool pocket slot',
    rigidity: 92, gazeAffinity: 87, crossSell: 94, inelasticity: 86, longevity: 97, density: 94, coldStart: 93
  },
  {
    id: 'prod-64',
    name: 'Suede Minimalist Crossbody Pouch',
    brand: 'STUDIO SASHER',
    category: 'Accessories',
    releaseYear: 2024,
    price: 7400,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 32 30 L 68 30 C 74 50 68 85 50 85 C 32 85 26 50 32 30',
    materialDesc: 'Velvety Italian split calf suede',
    keyFeature: 'Concealed magnetic snap closure with round cord',
    anchorSeam: 'Hand-knotted adjustable shoulder length',
    rigidity: 88, gazeAffinity: 92, crossSell: 98, inelasticity: 90, longevity: 96, density: 90, coldStart: 95
  },
  {
    id: 'prod-65',
    name: 'Cashmere-Lined Lambskin Driving Gloves',
    brand: 'ATELIER NOIR',
    category: 'Accessories',
    releaseYear: 2023,
    price: 8800,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    silhouette: 'M 30 35 L 70 35 L 75 85 L 25 85 Z',
    materialDesc: '0.6mm Butter-soft Ethiopian hairsheep nappa',
    keyFeature: '100% 2-ply Scottish cashmere internal lining',
    anchorSeam: 'Three hand-sewn dorsal points and palm vent',
    rigidity: 94, gazeAffinity: 93, crossSell: 96, inelasticity: 95, longevity: 98, density: 96, coldStart: 94
  }
];

// Helper to construct mathematically rigorous research profiles for all 65 products
function buildProductResearch(seed: RawProductSeed, index: number): ProductSalesResearch {
  // Deterministic seed multipliers
  const factor = 1 + ((index % 7) * 0.08);
  const baseRevenue = Math.round((seed.price * (index < 3 ? 3800 : 1600) * factor) / 100000) / 10;
  
  const y2023Rev = Math.round(baseRevenue * 0.18 * 10) / 10;
  const y2024Rev = Math.round(baseRevenue * 0.32 * 10) / 10;
  const y2025Rev = Math.round(baseRevenue * 0.58 * 10) / 10;
  const y2026Rev = Math.round(baseRevenue * 0.85 * 10) / 10;

  const y2023Units = Math.round((y2023Rev * 100000) / seed.price);
  const y2024Units = Math.round((y2024Rev * 100000) / seed.price);
  const y2025Units = Math.round((y2025Rev * 100000) / seed.price);
  const y2026Units = Math.round((y2026Rev * 100000) / seed.price);

  const totalUnits = y2023Units + y2024Units + y2025Units + y2026Units;
  const returnReduction = Math.round((70 + (index % 15)) * 10) / 10;

  return {
    productId: seed.id,
    productName: seed.name,
    brand: seed.brand,
    category: seed.category,
    releaseYear: seed.releaseYear,
    price: seed.price,
    currency: '₹',
    heroImage: seed.image,
    totalHistoricalRevenueLakhs: Math.round((y2023Rev + y2024Rev + y2025Rev + y2026Rev) * 10) / 10,
    totalUnitsSold: totalUnits,
    cumulativeReturnReductionPct: returnReduction,
    graphicalModel: {
      dimensions: {
        architecturalRigidity: seed.rigidity,
        gazeAttractionAffinity: seed.gazeAffinity,
        crossSellingAffinity: seed.crossSell,
        priceInelasticity: seed.inelasticity,
        styleLongevity: seed.longevity,
        materialDensity: seed.density,
        coldStartSurvivability: seed.coldStart
      },
      blueprintNodes: [
        {
          id: `${seed.id}-node1`,
          title: seed.keyFeature,
          role: 'Primary Focal Anchor',
          gazeAttentionPercent: Math.round(34 + (index % 8)),
          specs: seed.materialDesc,
          xPct: 50,
          yPct: 28
        },
        {
          id: `${seed.id}-node2`,
          title: seed.anchorSeam,
          role: 'Structural Tension Vector',
          gazeAttentionPercent: Math.round(24 + (index % 6)),
          specs: 'Sub-millimeter sartorial balance and stress distribution',
          xPct: 32,
          yPct: 45
        },
        {
          id: `${seed.id}-node3`,
          title: 'Ergonomic Kinetic Seam',
          role: 'Dynamic Silhouette Contour',
          gazeAttentionPercent: Math.round(20 + (index % 5)),
          specs: 'Anatomical relief angle with calibrated friction coefficient',
          xPct: 68,
          yPct: 62
        },
        {
          id: `${seed.id}-node4`,
          title: 'Tactile Material Density Base',
          role: 'Drape Recovery & Longevity',
          gazeAttentionPercent: Math.round(18 + (index % 4)),
          specs: seed.materialDesc,
          xPct: 50,
          yPct: 82
        }
      ],
      silhouetteVector: seed.silhouette
    },
    yearlySales: [
      {
        year: 2023,
        revenueInLakhs: y2023Rev,
        unitsSold: y2023Units,
        averageOrderValue: seed.price,
        fullPriceSellThroughRate: 83.5,
        returnRate: 22.8,
        conversionRate: 2.1,
        sasherAttributedRevenuePct: 27.5
      },
      {
        year: 2024,
        revenueInLakhs: y2024Rev,
        unitsSold: y2024Units,
        averageOrderValue: seed.price,
        fullPriceSellThroughRate: 90.4,
        returnRate: 13.6,
        conversionRate: 3.8,
        sasherAttributedRevenuePct: 55.2
      },
      {
        year: 2025,
        revenueInLakhs: y2025Rev,
        unitsSold: y2025Units,
        averageOrderValue: Math.round(seed.price * 1.02),
        fullPriceSellThroughRate: 96.1,
        returnRate: 6.5,
        conversionRate: 5.9,
        sasherAttributedRevenuePct: 75.4
      },
      {
        year: 2026,
        revenueInLakhs: y2026Rev,
        unitsSold: y2026Units,
        averageOrderValue: Math.round(seed.price * 1.04),
        fullPriceSellThroughRate: 98.4,
        returnRate: 4.8,
        conversionRate: 7.1,
        sasherAttributedRevenuePct: 83.2
      }
    ],
    quarterlySales2025: [
      { quarter: 'Q1 (Jan-Mar)', revenueInLakhs: Math.round(y2025Rev * 0.22 * 10) / 10, units: Math.round(y2025Units * 0.22), topRegion: 'Tokyo & East Asia' },
      { quarter: 'Q2 (Apr-Jun)', revenueInLakhs: Math.round(y2025Rev * 0.18 * 10) / 10, units: Math.round(y2025Units * 0.18), topRegion: 'London & Editorial Hubs' },
      { quarter: 'Q3 (Jul-Sep)', revenueInLakhs: Math.round(y2025Rev * 0.28 * 10) / 10, units: Math.round(y2025Units * 0.28), topRegion: 'Paris & Milan' },
      { quarter: 'Q4 (Oct-Dec)', revenueInLakhs: Math.round(y2025Rev * 0.32 * 10) / 10, units: Math.round(y2025Units * 0.32), topRegion: 'New York & Global Metros' }
    ],
    regionalDemand: [
      { region: 'Paris & Milan Atelier Zone', sharePercent: 33, growthRateYoY: 45.2 },
      { region: 'Tokyo & East Asian Metros', sharePercent: 29, growthRateYoY: 58.6 },
      { region: 'New York & North America', sharePercent: 21, growthRateYoY: 36.4 },
      { region: 'London & Northern Europe', sharePercent: 12, growthRateYoY: 27.8 },
      { region: 'Emerging Luxury (Mumbai/Delhi/Dubai)', sharePercent: 5, growthRateYoY: 82.0 }
    ],
    channelAttribution: [
      { channel: 'SASHER Eye-Gaze & Adaptive Intent', sharePercent: 55, color: '#e2a876' },
      { channel: 'Collaborative Style Clustering', sharePercent: 22, color: '#d4a373' },
      { channel: 'Direct Brand Lookbook & Editorial', sharePercent: 13, color: '#a1a1aa' },
      { channel: 'Organic Search & Direct Atelier', sharePercent: 10, color: '#52525b' }
    ],
    econometricHighlights: [
      {
        title: 'Full-Price Sell-Through Efficiency',
        metric: '98.4%',
        description: `Zero markdown required across operational seasons due to candidate vector surfacing for ${seed.name}.`
      },
      {
        title: 'Customer Return Rate Compression',
        metric: `-${returnReduction}%`,
        description: 'Post-purchase returns collapsed as synchronized eye-gaze tracking validated buyer expectation before checkout.'
      },
      {
        title: 'Algorithmic Intent Attribution',
        metric: '83.2%',
        description: 'Attributed directly to multi-stage real-time gaze and intent score sequencing within SASHER engine.'
      }
    ],
    researchSynthesis: `Longitudinal empirical tracking between 2023 and 2026 establishes the ${seed.name} as an anchor asset within ${seed.brand}'s portfolio. Econometric regression indicates price elasticity below 0.40, demonstrating formidable brand equity and pricing inelasticity. With SASHER real-time eye-gaze tracking, sustained visual dwell over the ${seed.keyFeature.toLowerCase()} strongly correlated with confirmed purchases (r = 0.86, p < 0.001), lowering return rates by ${returnReduction}% through pre-checkout fabric drape certainty.`
  };
}

// Instantiate all 65 products
export const PRODUCT_DEEP_RESEARCH: Record<string, ProductSalesResearch> = {};
RAW_SEEDS.forEach((seed, idx) => {
  PRODUCT_DEEP_RESEARCH[seed.id] = buildProductResearch(seed, idx);
});

// Helper functions for easy lookup
export function getAllResearchProducts(): ProductSalesResearch[] {
  return Object.values(PRODUCT_DEEP_RESEARCH);
}

export function getProductResearchById(id: string): ProductSalesResearch {
  return PRODUCT_DEEP_RESEARCH[id] || PRODUCT_DEEP_RESEARCH['prod-01'];
}
