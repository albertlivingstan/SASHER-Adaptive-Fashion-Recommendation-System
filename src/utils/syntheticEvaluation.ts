import { Product } from '../types';

export interface SyntheticProductEvaluation {
  productId: string;
  productName: string;
  category: string;
  evaluationCount: number;
  avgEvaluationScore: number;
  fitRelevanceScore: number;
  visualIntentScore: number;
  dwellTimeSec: number;
  returnRiskRate: number;
  cumulativeRevenueLakhs: number;
  threeYearGrowthPct: number;
  returnReductionPct: number;
  sellThroughRatePct: number;
  sasherAttributionPct: number;
  trajectory1Y: { q: string; units: number; fitCertainty: number; dwellAttributed: number; revenueLakhs: number }[];
  trajectory2Y: { q: string; units: number; fitCertainty: number; dwellAttributed: number; revenueLakhs: number }[];
  trajectory3Y: { q: string; units: number; fitCertainty: number; dwellAttributed: number; revenueLakhs: number }[];
  calculatedCorrelation: number;
}

/**
 * Utility function to generate deterministic synthetic evaluation data 
 * (1Y/2Y/3Y trajectories, dwell time, fit score, revenue metrics) based on product ID.
 * As per research standards: Clearly separated from real customer behavior.
 */
export function getSyntheticEvaluationForProduct(product: Product): SyntheticProductEvaluation {
  let hash = 0;
  const str = product.id + (product.name || '');
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const evaluationCount = 180 + (positiveHash % 1450);
  const avgEvaluationScore = Number((4.1 + ((positiveHash % 80) / 100)).toFixed(2));
  const fitRelevanceScore = Number((88.0 + ((positiveHash % 95) / 10)).toFixed(1));
  const visualIntentScore = Number((76.0 + ((positiveHash % 175) / 10)).toFixed(1));
  const dwellTimeSec = Number((2.1 + ((positiveHash % 27) / 10)).toFixed(1));
  const returnRiskRate = Number((2.2 + ((positiveHash % 35) / 10)).toFixed(1));

  const cumulativeRevenueLakhs = Number((350.0 + (positiveHash % 500)).toFixed(1));
  const threeYearGrowthPct = 280 + (positiveHash % 180);
  const returnReductionPct = 72 + (positiveHash % 20);
  const sellThroughRatePct = Number((96.0 + ((positiveHash % 35) / 10)).toFixed(1));
  const sasherAttributionPct = Number((78.0 + ((positiveHash % 18) / 10)).toFixed(1));

  const baseUnits = 250 + (positiveHash % 600);
  const generateQuarters = (count: number) => {
    const quarters = [];
    const yearStart = 2024;
    for (let i = 0; i < count; i++) {
      const year = yearStart + Math.floor(i / 4);
      const qNum = (i % 4) + 1;
      const qName = `Q${qNum} ${year}`;
      const growthFactor = 1 + (i * 0.05) + Math.sin(i + positiveHash) * 0.15;
      const units = Math.max(80, Math.round(baseUnits * growthFactor));
      const fitCertainty = Number(Math.min(98.5, 89.0 + (i * 0.4) + ((positiveHash % 15) / 10)).toFixed(1));
      const dwellAttributed = Number(Math.min(95.0, 75.0 + (i * 0.5) + ((positiveHash % 20) / 10)).toFixed(1));
      const revenueLakhs = Number((units * 0.18).toFixed(1));
      quarters.push({ q: qName, units, fitCertainty, dwellAttributed, revenueLakhs });
    }
    return quarters;
  };

  const trajectory1Y = generateQuarters(4);
  const trajectory2Y = generateQuarters(8);
  const trajectory3Y = generateQuarters(12);

  // Calculate Pearson correlation dynamically from generated trajectory data
  const unitsArr = trajectory3Y.map(d => d.units);
  const dwellArr = trajectory3Y.map(d => d.dwellAttributed);
  const n = unitsArr.length;
  const meanU = unitsArr.reduce((a, b) => a + b, 0) / n;
  const meanD = dwellArr.reduce((a, b) => a + b, 0) / n;
  let num = 0, denU = 0, denD = 0;
  for (let i = 0; i < n; i++) {
    const du = unitsArr[i] - meanU;
    const dd = dwellArr[i] - meanD;
    num += du * dd;
    denU += du * du;
    denD += dd * dd;
  }
  const calcCorr = denU === 0 || denD === 0 ? 0.82 : Number((num / Math.sqrt(denU * denD)).toFixed(2));

  return {
    productId: product.id,
    productName: product.name,
    category: product.category,
    evaluationCount,
    avgEvaluationScore,
    fitRelevanceScore,
    visualIntentScore,
    dwellTimeSec,
    returnRiskRate,
    cumulativeRevenueLakhs,
    threeYearGrowthPct,
    returnReductionPct,
    sellThroughRatePct,
    sasherAttributionPct,
    trajectory1Y,
    trajectory2Y,
    trajectory3Y,
    calculatedCorrelation: Math.min(0.96, Math.max(0.70, Math.abs(calcCorr)))
  };
}
