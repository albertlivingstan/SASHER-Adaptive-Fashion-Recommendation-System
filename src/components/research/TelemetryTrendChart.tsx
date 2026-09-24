import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HOURLY_TELEMETRY_24H, HourlyTelemetryPoint } from '../../data/research';
import { Activity, Clock, Zap, ArrowUpRight, Cpu, Layers } from 'lucide-react';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type ChartMode = 'dual' | 'latency' | 'volume';

export const TelemetryTrendChart: React.FC = () => {
  const [chartMode, setChartMode] = useState<ChartMode>('dual');
  const [hoveredPoint, setHoveredPoint] = useState<HourlyTelemetryPoint | null>(null);

  // Compute 24h summary statistics
  const stats = useMemo(() => {
    const totalVolume = HOURLY_TELEMETRY_24H.reduce((acc, curr) => acc + curr.recommendationVolume, 0);
    const avgLatency = (
      HOURLY_TELEMETRY_24H.reduce((acc, curr) => acc + curr.latencyMs, 0) / HOURLY_TELEMETRY_24H.length
    ).toFixed(1);
    const avgP99 = (
      HOURLY_TELEMETRY_24H.reduce((acc, curr) => acc + curr.p99LatencyMs, 0) / HOURLY_TELEMETRY_24H.length
    ).toFixed(1);
    const peakVolumePoint = [...HOURLY_TELEMETRY_24H].sort((a, b) => b.recommendationVolume - a.recommendationVolume)[0];
    const avgCache = (
      HOURLY_TELEMETRY_24H.reduce((acc, curr) => acc + curr.cacheHitRatio, 0) / HOURLY_TELEMETRY_24H.length
    ).toFixed(1);

    return {
      totalVolume,
      avgLatency,
      avgP99,
      peakHour: peakVolumePoint.hour,
      peakVolume: peakVolumePoint.recommendationVolume,
      avgCache
    };
  }, []);

  const labels = HOURLY_TELEMETRY_24H.map(item => item.hour);

  // Chart datasets configuration with muted warm accents matching the editorial theme
  const chartData = useMemo(() => {
    if (chartMode === 'latency') {
      return {
        labels,
        datasets: [
          {
            label: 'P99 Latency (ms)',
            data: HOURLY_TELEMETRY_24H.map(d => d.p99LatencyMs),
            borderColor: '#e07a5f', // Muted terracotta
            backgroundColor: 'rgba(224, 122, 95, 0.08)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: true,
            tension: 0.38,
            pointRadius: 2,
            pointHoverRadius: 6,
            pointBackgroundColor: '#e07a5f',
            pointBorderColor: '#0c0d0e',
            yAxisID: 'y'
          },
          {
            label: 'Mean Latency (ms)',
            data: HOURLY_TELEMETRY_24H.map(d => d.latencyMs),
            borderColor: '#e2a876', // Primary warm amber gold
            backgroundColor: 'rgba(226, 168, 118, 0.15)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.38,
            pointRadius: 3,
            pointHoverRadius: 7,
            pointBackgroundColor: '#e2a876',
            pointBorderColor: '#0c0d0e',
            yAxisID: 'y'
          }
        ]
      };
    }

    if (chartMode === 'volume') {
      return {
        labels,
        datasets: [
          {
            label: 'Recommendation Volume (req/hr)',
            data: HOURLY_TELEMETRY_24H.map(d => d.recommendationVolume),
            borderColor: '#e2a876',
            backgroundColor: 'rgba(226, 168, 118, 0.14)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.38,
            pointRadius: 3,
            pointHoverRadius: 7,
            pointBackgroundColor: '#e2a876',
            pointBorderColor: '#0c0d0e',
            yAxisID: 'y'
          }
        ]
      };
    }

    // Default 'dual' mode
    return {
      labels,
      datasets: [
        {
          label: 'Recommendation Volume (req/hr)',
          data: HOURLY_TELEMETRY_24H.map(d => d.recommendationVolume),
          borderColor: '#e2a876', // Muted warm amber gold
          backgroundColor: 'rgba(226, 168, 118, 0.12)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.38,
          pointRadius: 2.5,
          pointHoverRadius: 6.5,
          pointBackgroundColor: '#e2a876',
          pointBorderColor: '#121316',
          pointBorderWidth: 1.5,
          yAxisID: 'y1'
        },
        {
          label: 'Model Latency (ms)',
          data: HOURLY_TELEMETRY_24H.map(d => d.latencyMs),
          borderColor: '#e07a5f', // Muted warm terracotta
          backgroundColor: 'rgba(224, 122, 95, 0.06)',
          borderWidth: 2.2,
          fill: true,
          tension: 0.38,
          pointRadius: 2.5,
          pointHoverRadius: 6.5,
          pointBackgroundColor: '#e07a5f',
          pointBorderColor: '#121316',
          pointBorderWidth: 1.5,
          yAxisID: 'y'
        }
      ]
    };
  }, [chartMode, labels]);

  // Chart.js Options configured for ultra-refined dark luxury theme with muted warm accents
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onHover: (_event: any, elements: any[]) => {
        if (elements && elements.length > 0) {
          const idx = elements[0].index;
          if (HOURLY_TELEMETRY_24H[idx]) {
            setHoveredPoint(HOURLY_TELEMETRY_24H[idx]);
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          align: 'end' as const,
          labels: {
            boxWidth: 12,
            boxHeight: 3,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            color: '#a1a1aa',
            font: {
              family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              size: 11
            },
            padding: 18
          }
        },
        tooltip: {
          backgroundColor: 'rgba(18, 19, 22, 0.94)',
          titleColor: '#f4f4f5',
          bodyColor: '#e4e4e7',
          borderColor: '#3f3f46',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: {
            family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            size: 12,
            weight: 600 as const
          },
          bodyFont: {
            family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            size: 11
          },
          callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label: function (context: any) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              if (label.includes('Latency')) {
                return ` ${label}: ${value.toFixed(1)} ms`;
              }
              return ` ${label}: ${value.toLocaleString()} requests`;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            afterBody: function (contexts: any) {
              if (contexts.length > 0) {
                const idx = contexts[0].dataIndex;
                const point = HOURLY_TELEMETRY_24H[idx];
                return [
                  ` Cache Hit Ratio: ${point.cacheHitRatio}%`,
                  ` Gaze Telemetry Frames: ${point.gazeEventsProcessed.toLocaleString()}`
                ];
              }
              return [];
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.03)',
            tickLength: 8
          },
          ticks: {
            color: '#71717a',
            font: {
              family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              size: 10
            },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 12
          },
          border: {
            color: '#27272a'
          }
        },
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          grid: {
            color: 'rgba(255, 255, 255, 0.04)'
          },
          ticks: {
            color: '#e07a5f',
            font: {
              family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              size: 10
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            callback: function (value: any) {
              if (chartMode === 'volume') {
                return `${Number(value).toLocaleString()} req`;
              }
              return `${value} ms`;
            }
          },
          border: {
            color: '#27272a'
          },
          title: {
            display: chartMode !== 'volume',
            text: 'Latency (ms)',
            color: '#e07a5f',
            font: {
              family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              size: 10
            }
          }
        },
        ...(chartMode === 'dual'
          ? {
              y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                  drawOnChartArea: false // Prevent overlapping grid lines
                },
                ticks: {
                  color: '#e2a876',
                  font: {
                    family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    size: 10
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  callback: function (value: any) {
                    return `${(Number(value) / 1000).toFixed(1)}k req`;
                  }
                },
                border: {
                  color: '#27272a'
                },
                title: {
                  display: true,
                  text: 'Volume (req/hr)',
                  color: '#e2a876',
                  font: {
                    family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    size: 10
                  }
                }
              }
            }
          : {})
      }
    };
  }, [chartMode]);

  return (
    <div className="p-6 bg-[#121316] border border-[#27272a] rounded-2xl space-y-6">
      {/* Header and Filter Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#27272a]/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#e2a876] mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>24-HOUR CONTINUOUS INFERENCE BENCHMARK</span>
            <span aria-hidden="true" className="text-[#3f3f46]">·</span>
            <span className="text-[#10b981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              LIVE TELEMETRY FEED
            </span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#f4f4f5]">
            Hourly Model Latency & Recommendation Volume
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5 max-w-2xl">
            Diurnal throughput trajectory and sub-50ms latency stability across multi-stage transformer sequence encoding and visual gaze weighting.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#18191d] rounded-xl border border-[#27272a] self-start lg:self-center">
          <button
            onClick={() => setChartMode('dual')}
            data-magnetic
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer flex items-center gap-1.5 ${
              chartMode === 'dual'
                ? 'bg-[#f4f4f5] text-[#09090b] font-semibold shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Dual Overlay</span>
          </button>

          <button
            onClick={() => setChartMode('latency')}
            data-magnetic
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer flex items-center gap-1.5 ${
              chartMode === 'latency'
                ? 'bg-[#f4f4f5] text-[#09090b] font-semibold shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Latency Focus</span>
          </button>

          <button
            onClick={() => setChartMode('volume')}
            data-magnetic
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer flex items-center gap-1.5 ${
              chartMode === 'volume'
                ? 'bg-[#f4f4f5] text-[#09090b] font-semibold shadow-sm'
                : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Volume Focus</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 bg-[#18191d] rounded-xl border border-[#27272a]/70">
          <span className="text-[10px] font-mono-tabular uppercase text-[#71717a] block mb-1">
            24H MEAN LATENCY
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-2xl text-[#f4f4f5]">{stats.avgLatency}</span>
            <span className="text-xs font-mono-tabular text-[#a1a1aa]">ms</span>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#10b981] mt-0.5 block">
            Target SLA: &lt;50ms
          </span>
        </div>

        <div className="p-3.5 bg-[#18191d] rounded-xl border border-[#27272a]/70">
          <span className="text-[10px] font-mono-tabular uppercase text-[#71717a] block mb-1">
            P99 TAIL LATENCY
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-2xl text-[#e07a5f]">{stats.avgP99}</span>
            <span className="text-xs font-mono-tabular text-[#a1a1aa]">ms</span>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#71717a] mt-0.5 block">
            Peak load variance
          </span>
        </div>

        <div className="p-3.5 bg-[#18191d] rounded-xl border border-[#27272a]/70">
          <span className="text-[10px] font-mono-tabular uppercase text-[#71717a] block mb-1">
            24H TOTAL VOLUME
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-2xl text-[#e2a876]">
              {stats.totalVolume.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#a1a1aa] mt-0.5 block">
            Inferences processed
          </span>
        </div>

        <div className="p-3.5 bg-[#18191d] rounded-xl border border-[#27272a]/70">
          <span className="text-[10px] font-mono-tabular uppercase text-[#71717a] block mb-1">
            PEAK CONCURRENCY
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-2xl text-[#f4f4f5]">
              {stats.peakVolume.toLocaleString()}
            </span>
            <span className="text-xs font-mono-tabular text-[#a1a1aa]">/hr</span>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#e2a876] mt-0.5 block">
            Occurred at {stats.peakHour} UTC
          </span>
        </div>

        <div className="p-3.5 bg-[#18191d] rounded-xl border border-[#27272a]/70 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono-tabular uppercase text-[#71717a] block mb-1">
            MEAN CACHE HIT RATIO
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-2xl text-[#10b981]">{stats.avgCache}%</span>
          </div>
          <span className="text-[10px] font-mono-tabular text-[#71717a] mt-0.5 block">
            Faiss vector retrieval
          </span>
        </div>
      </div>

      {/* Hourly Live Scrubber / Telemetry Inspector */}
      <div className="p-3 bg-[#18191d]/90 rounded-xl border border-[#27272a] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tabular">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e2a876] animate-pulse" />
          <span className="text-[#a1a1aa]">
            {hoveredPoint ? `Inspecting ${hoveredPoint.hour} UTC` : `Latest Synced Window (${HOURLY_TELEMETRY_24H[HOURLY_TELEMETRY_24H.length - 1].hour} UTC)`}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="text-[#71717a]">Latency:</span>
            <span className="text-[#e07a5f] font-semibold">
              {(hoveredPoint || HOURLY_TELEMETRY_24H[HOURLY_TELEMETRY_24H.length - 1]).latencyMs.toFixed(1)} ms
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#71717a]">P99 Tail:</span>
            <span className="text-[#e07a5f]/80 font-semibold">
              {(hoveredPoint || HOURLY_TELEMETRY_24H[HOURLY_TELEMETRY_24H.length - 1]).p99LatencyMs.toFixed(1)} ms
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#71717a]">Volume:</span>
            <span className="text-[#e2a876] font-semibold">
              {(hoveredPoint || HOURLY_TELEMETRY_24H[HOURLY_TELEMETRY_24H.length - 1]).recommendationVolume.toLocaleString()} req/hr
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#71717a]">Cache Hit:</span>
            <span className="text-[#10b981] font-semibold">
              {(hoveredPoint || HOURLY_TELEMETRY_24H[HOURLY_TELEMETRY_24H.length - 1]).cacheHitRatio}%
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#71717a]">Gaze Frames:</span>
            <span className="text-[#f4f4f5] font-semibold">
              {(hoveredPoint || HOURLY_TELEMETRY_24H[HOURLY_TELEMETRY_24H.length - 1]).gazeEventsProcessed.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      {/* Chart.js Line Canvas Container */}
      <div className="relative h-80 sm:h-96 w-full pt-2">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Narrative Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#27272a]/60 text-[11px] font-mono-tabular text-[#71717a] gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#e2a876] inline-block rounded" />
            <span className="text-[#e2a876]">Muted Amber: Volume (Right Axis)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#e07a5f] inline-block rounded" />
            <span className="text-[#e07a5f]">Warm Terracotta: Latency (Left Axis)</span>
          </span>
        </div>
        <span>Sampling Interval: 60 mins · Engine: PyTorch C++ Runtime</span>
      </div>
    </div>
  );
};
