import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';
import { MODEL_COMPARISONS } from '../../data/research';
import { 
  BarChart3, 
  Activity, 
  Layers, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  CheckCircle2,
  Sliders,
  Cpu
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type MetricKey = 'ndcg10' | 'map10' | 'precision10' | 'recall10';
type ViewMode = 'grouped' | 'single_metric' | 'pareto_frontier';

export const ModelComparisonGraphicalChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('ndcg10');

  const metricLabels: Record<MetricKey, string> = {
    ndcg10: 'NDCG@10',
    map10: 'MAP@10',
    precision10: 'Precision@10',
    recall10: 'Recall@10'
  };

  const modelLabels = MODEL_COMPARISONS.map(m => m.modelName.replace(' (Dynamic + Eye-Gaze)', '*'));

  // 1. Grouped Bar Chart Data (NDCG, MAP, Precision, Recall across all models)
  const groupedChartData = {
    labels: modelLabels,
    datasets: [
      {
        label: 'NDCG@10',
        data: MODEL_COMPARISONS.map(m => m.ndcg10),
        backgroundColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#e2a876' : 'rgba(226, 168, 118, 0.35)'),
        borderColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#f59e0b' : '#a1a1aa'),
        borderWidth: MODEL_COMPARISONS.map(m => m.isHighlighted ? 2 : 1),
        borderRadius: 4
      },
      {
        label: 'MAP@10',
        data: MODEL_COMPARISONS.map(m => m.map10),
        backgroundColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#10b981' : 'rgba(16, 185, 129, 0.25)'),
        borderColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#34d399' : '#71717a'),
        borderWidth: MODEL_COMPARISONS.map(m => m.isHighlighted ? 2 : 1),
        borderRadius: 4
      },
      {
        label: 'Precision@10',
        data: MODEL_COMPARISONS.map(m => m.precision10),
        backgroundColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#38bdf8' : 'rgba(56, 189, 248, 0.25)'),
        borderColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#7dd3fc' : '#52525b'),
        borderWidth: MODEL_COMPARISONS.map(m => m.isHighlighted ? 2 : 1),
        borderRadius: 4
      },
      {
        label: 'Recall@10',
        data: MODEL_COMPARISONS.map(m => m.recall10),
        backgroundColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#c084fc' : 'rgba(192, 132, 252, 0.25)'),
        borderColor: MODEL_COMPARISONS.map(m => m.isHighlighted ? '#e9d5ff' : '#3f3f46'),
        borderWidth: MODEL_COMPARISONS.map(m => m.isHighlighted ? 2 : 1),
        borderRadius: 4
      }
    ]
  };

  const groupedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#d4d4d8',
          font: { family: 'monospace', size: 11 },
          boxWidth: 12,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(18, 19, 22, 0.95)',
        borderColor: '#3f3f46',
        borderWidth: 1,
        titleColor: '#f4f4f5',
        bodyColor: '#e4e4e7',
        titleFont: { family: 'monospace', size: 12 },
        bodyFont: { family: 'monospace', size: 11 },
        padding: 10
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#a1a1aa',
          font: { family: 'monospace', size: 10 },
          maxRotation: 25,
          minRotation: 15
        }
      },
      y: {
        min: 0.3,
        max: 0.9,
        grid: { color: 'rgba(255, 255, 255, 0.06)' },
        ticks: {
          color: '#71717a',
          font: { family: 'monospace', size: 10 },
          stepSize: 0.1
        }
      }
    }
  };

  // 2. Single Metric Focus Chart Data
  const singleMetricData = {
    labels: modelLabels,
    datasets: [
      {
        label: metricLabels[selectedMetric],
        data: MODEL_COMPARISONS.map(m => m[selectedMetric]),
        backgroundColor: MODEL_COMPARISONS.map(m => 
          m.isHighlighted ? '#e2a876' : 'rgba(113, 113, 122, 0.45)'
        ),
        borderColor: MODEL_COMPARISONS.map(m => 
          m.isHighlighted ? '#f59e0b' : '#3f3f46'
        ),
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  };

  const singleMetricOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(18, 19, 22, 0.95)',
        borderColor: '#e2a876',
        borderWidth: 1,
        titleColor: '#f4f4f5',
        bodyColor: '#e4e4e7',
        callbacks: {
          label: (ctx: any) => `${metricLabels[selectedMetric]}: ${ctx.raw.toFixed(3)}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#a1a1aa',
          font: { family: 'monospace', size: 10 },
          maxRotation: 20
        }
      },
      y: {
        min: 0.3,
        max: 0.9,
        grid: { color: 'rgba(255, 255, 255, 0.06)' },
        ticks: {
          color: '#71717a',
          font: { family: 'monospace', size: 10 }
        }
      }
    }
  };

  return (
    <div className="p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#27272a]/70">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#e2a876] mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>BENCHMARK PERFORMANCE EVALUATION</span>
            <span className="text-[#3f3f46]">·</span>
            <span className="text-[#10b981]">10-FOLD CROSS-VALIDATION</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#f4f4f5]">
            Model Comparison across Algorithms
          </h3>
          <p className="text-xs text-[#71717a] mt-0.5">
            Empirical accuracy and computational latency evaluated under strict offline replay conditions.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#18191d] rounded-xl border border-[#27272a] self-start lg:self-auto">
          <button
            onClick={() => setViewMode('grouped')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer ${
              viewMode === 'grouped'
                ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            Grouped Matrix
          </button>
          <button
            onClick={() => setViewMode('single_metric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer ${
              viewMode === 'single_metric'
                ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            Single Metric Focus
          </button>
          <button
            onClick={() => setViewMode('pareto_frontier')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer ${
              viewMode === 'pareto_frontier'
                ? 'bg-[#e2a876] text-[#09090b] font-semibold shadow'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            Latency vs. Accuracy
          </button>
        </div>
      </div>

      {/* Sub-selector for single metric mode */}
      {viewMode === 'single_metric' && (
        <div className="flex items-center gap-2 p-1 bg-[#18191d] rounded-lg border border-[#27272a] w-fit">
          {(['ndcg10', 'map10', 'precision10', 'recall10'] as const).map(metric => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-3 py-1 rounded text-xs font-mono-tabular transition-colors cursor-pointer ${
                selectedMetric === metric
                  ? 'bg-[#f4f4f5] text-[#09090b] font-semibold'
                  : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
              }`}
            >
              {metricLabels[metric]}
            </button>
          ))}
        </div>
      )}

      {/* GRAPHICAL DISPLAY CONTAINER */}
      <div className="w-full bg-[#16171b] border border-[#27272a] rounded-xl p-4 sm:p-5 relative min-h-[340px] flex flex-col justify-center">
        {viewMode === 'grouped' && (
          <div className="h-[360px] w-full">
            <Bar data={groupedChartData} options={groupedOptions} />
          </div>
        )}

        {viewMode === 'single_metric' && (
          <div className="h-[340px] w-full">
            <Bar data={singleMetricData} options={singleMetricOptions} />
          </div>
        )}

        {viewMode === 'pareto_frontier' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-tabular px-2">
              <span className="text-[#a1a1aa]">Tradeoff Space: Latency (ms, lower is better) vs NDCG@10 (higher is better)</span>
              <span className="text-[#e2a876] font-semibold">SASHER: Optimal Pareto Frontier</span>
            </div>

            {/* Responsive SVG 2D Tradeoff Chart */}
            <div className="w-full overflow-hidden">
              <svg viewBox="0 0 680 280" className="w-full h-auto select-none" style={{ maxHeight: '300px' }}>
                {/* Axes and Grid */}
                <line x1="60" y1="20" x2="60" y2="230" stroke="#3f3f46" strokeWidth="1.5" />
                <line x1="60" y1="230" x2="640" y2="230" stroke="#3f3f46" strokeWidth="1.5" />

                {/* Y-Axis NDCG@10 ticks */}
                {[0.4, 0.5, 0.6, 0.7, 0.8, 0.85].map(val => {
                  const y = 230 - ((val - 0.35) / 0.55) * 200;
                  return (
                    <g key={val}>
                      <line x1="55" y1={y} x2="640" y2={y} stroke="#27272a" strokeDasharray="3,3" />
                      <text x="50" y={y + 3} fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {val.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* X-Axis Latency ticks */}
                {[5, 10, 15, 20, 25, 30, 35].map(ms => {
                  const x = 60 + ((ms - 0) / 40) * 560;
                  return (
                    <g key={ms}>
                      <line x1={x} y1="20" x2={x} y2="235" stroke="#27272a" strokeDasharray="3,3" />
                      <text x={x} y="248" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        {ms}ms
                      </text>
                    </g>
                  );
                })}

                {/* Pareto Frontier Curve connecting best tradeoffs */}
                <path
                  d="M 127 196 Q 230 135 460 76 Q 510 65 538 51"
                  fill="none"
                  stroke="#e2a876"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />

                {/* Model Scatter Points */}
                {MODEL_COMPARISONS.map(m => {
                  const x = 60 + (m.latencyMs / 40) * 560;
                  const y = 230 - ((m.ndcg10 - 0.35) / 0.55) * 200;
                  const isSasher = m.isHighlighted;

                  return (
                    <g key={m.modelName} className="cursor-pointer">
                      {isSasher && (
                        <>
                          <circle cx={x} cy={y} r="14" fill="none" stroke="#e2a876" strokeWidth="1.5" className="animate-ping" opacity="0.4" />
                          <circle cx={x} cy={y} r="8" fill="#e2a876" opacity="0.25" />
                        </>
                      )}

                      <circle
                        cx={x}
                        cy={y}
                        r={isSasher ? "6.5" : "4.5"}
                        fill={isSasher ? "#e2a876" : "#52525b"}
                        stroke={isSasher ? "#ffffff" : "#a1a1aa"}
                        strokeWidth={isSasher ? "2" : "1.5"}
                      />

                      {/* Label */}
                      <text
                        x={x}
                        y={isSasher ? y - 12 : y + 16}
                        fill={isSasher ? "#e2a876" : "#a1a1aa"}
                        fontSize={isSasher ? "10.5" : "9"}
                        fontWeight={isSasher ? "bold" : "normal"}
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {m.modelName.split(' ')[0]} ({m.ndcg10.toFixed(3)})
                      </text>
                    </g>
                  );
                })}

                {/* Axis Titles */}
                <text x="350" y="270" fill="#a1a1aa" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Mean Online Inference Latency (Milliseconds) &rarr;
                </text>
                <text x="20" y="125" fill="#a1a1aa" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 20 125)">
                  NDCG@10 Accuracy &uarr;
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Algorithmic Performance Table Breakdown */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono-tabular">
          <thead>
            <tr className="border-b border-[#27272a] text-[#71717a] uppercase text-[10px]">
              <th className="pb-3 font-medium">Model / Algorithm</th>
              <th className="pb-3 font-medium">NDCG@10</th>
              <th className="pb-3 font-medium">MAP@10</th>
              <th className="pb-3 font-medium">Precision@10</th>
              <th className="pb-3 font-medium">Recall@10</th>
              <th className="pb-3 font-medium text-right">Inference Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a]/50 text-[#e4e4e7]">
            {MODEL_COMPARISONS.map(m => (
              <tr 
                key={m.modelName} 
                className={`transition-colors ${
                  m.isHighlighted 
                    ? 'bg-[#e2a876]/10 text-[#e2a876] font-medium' 
                    : 'hover:bg-[#18191d]/50'
                }`}
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className={m.isHighlighted ? 'text-[#e2a876] font-bold' : 'text-[#f4f4f5]'}>
                      {m.modelName}
                    </span>
                    {m.isHighlighted && (
                      <span className="text-[9px] bg-[#e2a876] text-[#09090b] font-bold px-1.5 py-0.2 rounded">
                        PROPOSED
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#71717a] block mt-0.5">{m.description}</span>
                </td>
                <td className="py-3 font-bold">{m.ndcg10.toFixed(3)}</td>
                <td className="py-3">{m.map10.toFixed(3)}</td>
                <td className="py-3">{m.precision10.toFixed(3)}</td>
                <td className="py-3">{m.recall10.toFixed(3)}</td>
                <td className="py-3 text-right">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono-tabular ${
                    m.latencyMs < 35 ? 'text-[#10b981] bg-[#10b981]/10' : 'text-[#a1a1aa] bg-[#27272a]'
                  }`}>
                    {m.latencyMs} ms
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
