import { ModelComparisonData, AblationStudyData, ResearchMetricSet } from '../types';

export const RESEARCH_METRICS: ResearchMetricSet = {
  precision10: 0.824,
  recall10: 0.768,
  map10: 0.712,
  ndcg10: 0.841,
  mrr: 0.819,
  latencyMs: 34.2,
  pValueVsBaseline: 0.0004
};

export const MODEL_COMPARISONS: ModelComparisonData[] = [
  {
    modelName: 'Popularity Baseline',
    precision10: 0.412,
    recall10: 0.384,
    map10: 0.355,
    ndcg10: 0.442,
    latencyMs: 4.8,
    description: 'Ranks items solely by global purchase and view frequency.'
  },
  {
    modelName: 'Content-Based (TF-IDF)',
    precision10: 0.589,
    recall10: 0.518,
    map10: 0.492,
    ndcg10: 0.601,
    latencyMs: 14.1,
    description: 'Cosine similarity across product metadata, fabric composition, and silhouettes.'
  },
  {
    modelName: 'Collaborative Filtering (MF)',
    precision10: 0.647,
    recall10: 0.592,
    map10: 0.564,
    ndcg10: 0.678,
    latencyMs: 18.5,
    description: 'Probabilistic Matrix Factorization on user-item implicit feedback matrix.'
  },
  {
    modelName: 'Static Profile Model',
    precision10: 0.612,
    recall10: 0.548,
    map10: 0.521,
    ndcg10: 0.635,
    latencyMs: 12.0,
    description: 'Fixed long-term user style preferences without session adaptation.'
  },
  {
    modelName: 'Session Transformer (SASRec)',
    precision10: 0.743,
    recall10: 0.689,
    map10: 0.651,
    ndcg10: 0.772,
    latencyMs: 28.6,
    description: 'Self-attentive sequential encoder over session interaction sequence.'
  },
  {
    modelName: 'Static Weighted Hybrid',
    precision10: 0.768,
    recall10: 0.714,
    map10: 0.672,
    ndcg10: 0.798,
    latencyMs: 31.0,
    description: 'Fixed linear combination of CF, Content, and Session vectors.'
  },
  {
    modelName: 'SASHER (Dynamic + Eye-Gaze)',
    precision10: 0.824,
    recall10: 0.768,
    map10: 0.712,
    ndcg10: 0.841,
    latencyMs: 34.2,
    isHighlighted: true,
    description: 'Full proposed architecture with real-time visual attention, dynamic softmax weighting, and MMR.'
  }
];

export const ABLATION_STUDY: AblationStudyData[] = [
  {
    configuration: 'Full SASHER Architecture',
    ndcg10: 0.841,
    map10: 0.712,
    deltaPercent: 0.0,
    description: 'Complete system with session Transformer, eye-gaze intent, dynamic weights, and MMR.'
  },
  {
    configuration: 'w/o Eye-Gaze Visual Attention',
    ndcg10: 0.789,
    map10: 0.668,
    deltaPercent: -6.18,
    description: 'Removes real-time gaze dwell and focal attention signals from dynamic weights.'
  },
  {
    configuration: 'w/o Session Encoder (Transformer)',
    ndcg10: 0.732,
    map10: 0.615,
    deltaPercent: -12.96,
    description: 'Replaces sequential self-attention with average pooling over session clicks.'
  },
  {
    configuration: 'w/o Dynamic Softmax Weighting',
    ndcg10: 0.774,
    map10: 0.658,
    deltaPercent: -7.97,
    description: 'Replaces adaptive session-stage weights with fixed static weights.'
  },
  {
    configuration: 'w/o Collaborative Filtering Layer',
    ndcg10: 0.802,
    map10: 0.684,
    deltaPercent: -4.64,
    description: 'Omits cross-user latent factor signals, relying only on content and session.'
  },
  {
    configuration: 'w/o Content Similarity Model',
    ndcg10: 0.811,
    map10: 0.691,
    deltaPercent: -3.57,
    description: 'Disables attribute-based embedding dot products.'
  },
  {
    configuration: 'w/o MMR Diversification (λ=1.0)',
    ndcg10: 0.826,
    map10: 0.704,
    deltaPercent: -1.78,
    description: 'Disables redundancy penalty, leading to category echo chambers.'
  }
];

export const ARCHITECTURE_PIPELINE_STAGES = [
  {
    id: 'user_signals',
    title: 'Interaction Signal Layer',
    stepNumber: '01',
    category: 'Ingestion',
    headline: 'Multi-Modal Implicit Telemetry',
    summary: 'Captures continuous behavioral events alongside calibrated real-time gaze coordinates.',
    purpose: 'Discretizes continuous user browsing into high-fidelity interaction tuples: View, Hover, Dwell, Eye-Gaze, Wishlist, Cart, Purchase.',
    inputs: 'Mouse trajectories, WebGazer gaze coordinates (x,y), viewport bounding boxes, dwell timers.',
    outputs: 'Stream of serialized interaction events with timestamp, dwell duration, and visual attention intensity.',
    technologies: ['WebGazer.js', 'IntersectionObserver', 'High-Resolution Timers', 'WebSockets']
  },
  {
    id: 'session_transformer',
    title: 'Session Understanding',
    stepNumber: '02',
    category: 'Deep Learning',
    headline: 'Self-Attentive Sequence Encoder',
    summary: 'Processes chronological interaction sequences to model short-term stylistic transitions.',
    purpose: 'Encodes non-linear stylistic drift as users explore disparate fashion categories during an active browsing journey.',
    inputs: 'Sequence of past k item embeddings with positional encodings and event weight multipliers.',
    outputs: 'Dense 128-dimensional Session Intent Vector s_t with category distribution softmax.',
    technologies: ['PyTorch Transformer', 'Multi-Head Self Attention', 'Positional Embedding', 'FastAPI']
  },
  {
    id: 'hybrid_engines',
    title: 'Candidate Scoring Matrix',
    stepNumber: '03',
    category: 'Candidate Retrieval',
    headline: 'Multi-Branch Recommendation Ensemble',
    summary: 'Evaluates candidate items through 5 distinct algorithmic lenses.',
    purpose: 'Overcomes cold start, provides semantic serendipity, and guarantees collaborative coverage across the catalog.',
    inputs: 'Session vector, User profile vector, Latent CF factor matrix, Content TF-IDF vectors, Global popularity.',
    outputs: 'Individual candidate score vectors: S_session, S_profile, S_collab, S_content, S_popularity, S_gaze.',
    technologies: ['Matrix Factorization', 'Cosine Similarity', 'Faiss Index', 'Scikit-learn']
  },
  {
    id: 'dynamic_weighting',
    title: 'Adaptive Softmax Weighting',
    stepNumber: '04',
    category: 'Adaptive Controller',
    headline: 'Context-Dependent Fusion Gate',
    summary: 'Dynamically shifts weighting coefficients based on session depth and visual engagement.',
    purpose: 'Shifts authority from static priors (popularity, profile) to real-time intent (session, gaze) as evidence accumulates.',
    inputs: 'Session step count, gaze dwell accumulation, entropy of category views.',
    outputs: 'Normalized weight distribution [w1, w2, w3, w4, w5, w6] where Σ w_i = 1.',
    technologies: ['Gated Softmax Unit', 'Entropy Regularization', 'Online Calibration']
  },
  {
    id: 'mmr_diversity',
    title: 'MMR Diversification',
    stepNumber: '05',
    category: 'Re-ranking',
    headline: 'Maximal Marginal Relevance Filter',
    summary: 'Prevents category echo chambers by balancing recommendation relevance against intra-list redundancy.',
    purpose: 'Generates diverse top-K slates preventing the "outerwear trap" while maintaining high style coherence.',
    inputs: 'Ranked candidate list, item pairwise similarity matrix, diversity parameter λ = 0.72.',
    outputs: 'Re-ordered top-K recommendation slate optimized for both relevance and novel discovery.',
    technologies: ['Greedy MMR Selection', 'Pairwise Cosine Distance', 'Coverage Penalty']
  },
  {
    id: 'anomaly_detection',
    title: 'Security & Robustness',
    stepNumber: '06',
    category: 'Security / Anomaly',
    headline: 'IsolationForest Behavioral Guardian',
    summary: 'Continuously monitors interaction velocity and entropy to isolate automated or adversarial attacks.',
    purpose: 'Protects the recommendation model from click-farming, crawler pollution, and session poisoning.',
    inputs: 'Event velocity (Hz), dwell time variance, trajectory smoothness, gaze-to-click divergence.',
    outputs: 'Anomaly confidence score; triggers graceful degradation to robust fallback mode if score > 0.85.',
    technologies: ['IsolationForest', 'Z-Score Entropy Check', 'Fallback Safe Pipeline']
  }
];

export interface HourlyTelemetryPoint {
  hour: string;
  latencyMs: number;
  p99LatencyMs: number;
  recommendationVolume: number; // requests in that hour
  cacheHitRatio: number; // percentage
  gazeEventsProcessed: number;
}

export const HOURLY_TELEMETRY_24H: HourlyTelemetryPoint[] = [
  { hour: '00:00', latencyMs: 29.2, p99LatencyMs: 41.5, recommendationVolume: 2840, cacheHitRatio: 94.2, gazeEventsProcessed: 14200 },
  { hour: '01:00', latencyMs: 28.5, p99LatencyMs: 40.1, recommendationVolume: 1980, cacheHitRatio: 95.1, gazeEventsProcessed: 9900 },
  { hour: '02:00', latencyMs: 27.9, p99LatencyMs: 39.4, recommendationVolume: 1420, cacheHitRatio: 95.8, gazeEventsProcessed: 7100 },
  { hour: '03:00', latencyMs: 27.4, p99LatencyMs: 38.6, recommendationVolume: 1150, cacheHitRatio: 96.2, gazeEventsProcessed: 5750 },
  { hour: '04:00', latencyMs: 27.8, p99LatencyMs: 39.0, recommendationVolume: 1320, cacheHitRatio: 95.9, gazeEventsProcessed: 6600 },
  { hour: '05:00', latencyMs: 28.3, p99LatencyMs: 39.8, recommendationVolume: 1890, cacheHitRatio: 95.2, gazeEventsProcessed: 9450 },
  { hour: '06:00', latencyMs: 29.8, p99LatencyMs: 42.1, recommendationVolume: 2940, cacheHitRatio: 94.0, gazeEventsProcessed: 14700 },
  { hour: '07:00', latencyMs: 31.4, p99LatencyMs: 44.5, recommendationVolume: 4320, cacheHitRatio: 92.8, gazeEventsProcessed: 21600 },
  { hour: '08:00', latencyMs: 33.2, p99LatencyMs: 46.8, recommendationVolume: 6180, cacheHitRatio: 91.5, gazeEventsProcessed: 30900 },
  { hour: '09:00', latencyMs: 34.6, p99LatencyMs: 48.9, recommendationVolume: 7850, cacheHitRatio: 90.4, gazeEventsProcessed: 39250 },
  { hour: '10:00', latencyMs: 35.8, p99LatencyMs: 50.6, recommendationVolume: 8420, cacheHitRatio: 89.8, gazeEventsProcessed: 42100 },
  { hour: '11:00', latencyMs: 36.2, p99LatencyMs: 51.4, recommendationVolume: 8910, cacheHitRatio: 89.4, gazeEventsProcessed: 44550 },
  { hour: '12:00', latencyMs: 36.8, p99LatencyMs: 52.0, recommendationVolume: 9240, cacheHitRatio: 89.0, gazeEventsProcessed: 46200 },
  { hour: '13:00', latencyMs: 35.5, p99LatencyMs: 50.2, recommendationVolume: 8650, cacheHitRatio: 89.9, gazeEventsProcessed: 43250 },
  { hour: '14:00', latencyMs: 34.9, p99LatencyMs: 49.5, recommendationVolume: 8320, cacheHitRatio: 90.5, gazeEventsProcessed: 41600 },
  { hour: '15:00', latencyMs: 35.4, p99LatencyMs: 50.1, recommendationVolume: 8760, cacheHitRatio: 90.0, gazeEventsProcessed: 43800 },
  { hour: '16:00', latencyMs: 36.1, p99LatencyMs: 51.2, recommendationVolume: 9080, cacheHitRatio: 89.6, gazeEventsProcessed: 45400 },
  { hour: '17:00', latencyMs: 37.0, p99LatencyMs: 52.8, recommendationVolume: 9450, cacheHitRatio: 88.9, gazeEventsProcessed: 47250 },
  { hour: '18:00', latencyMs: 38.2, p99LatencyMs: 54.4, recommendationVolume: 9820, cacheHitRatio: 88.4, gazeEventsProcessed: 49100 },
  { hour: '19:00', latencyMs: 37.9, p99LatencyMs: 53.9, recommendationVolume: 9680, cacheHitRatio: 88.7, gazeEventsProcessed: 48400 },
  { hour: '20:00', latencyMs: 38.6, p99LatencyMs: 55.2, recommendationVolume: 9940, cacheHitRatio: 88.2, gazeEventsProcessed: 49700 },
  { hour: '21:00', latencyMs: 37.1, p99LatencyMs: 52.7, recommendationVolume: 9120, cacheHitRatio: 89.3, gazeEventsProcessed: 45600 },
  { hour: '22:00', latencyMs: 34.2, p99LatencyMs: 48.5, recommendationVolume: 6850, cacheHitRatio: 90.9, gazeEventsProcessed: 34250 },
  { hour: '23:00', latencyMs: 31.0, p99LatencyMs: 44.0, recommendationVolume: 4520, cacheHitRatio: 92.5, gazeEventsProcessed: 22600 }
];

