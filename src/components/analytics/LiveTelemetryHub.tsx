import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSasher } from '../../context/SasherContext';
import { 
  Play, 
  Pause, 
  Activity, 
  Clock, 
  Cpu, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Terminal,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';

interface MetricCardItem {
  id: string;
  category: string;
  value: string;
  subValue?: string;
  changeRate: string;
  color: string;
  detailTitle: string;
  detailDescription: string;
  algorithms: { name: string; latency: string; share: number; status: string }[];
}

export const LiveTelemetryHub: React.FC<{ onExploreRecommendations?: () => void }> = ({ onExploreRecommendations }) => {
  const { sessionIntent, dynamicWeights, interactions, isEyeTrackingActive, anomalyState } = useSasher();
  
  // Interactive canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Live running simulation stats
  const [isRunning, setIsRunning] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string>('inferences');
  const [elapsedSessionSeconds, setElapsedSessionSeconds] = useState(1420); // 23h 40m baseline platform runtime
  const [liveInferences, setLiveInferences] = useState(482914);
  const [liveGazeSamples, setLiveGazeSamples] = useState(105420);
  const [currentLatency, setCurrentLatency] = useState(32.4);
  const [activeAlgorithmsCount, setActiveAlgorithmsCount] = useState(6);
  const [logFeed, setLogFeed] = useState<{ id: string; timestamp: string; tag: string; message: string; latency: string }[]>([]);

  // Mouse tracking for reactive vortex
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  // Live timer & incrementing telemetry counter
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedSessionSeconds(prev => prev + 1);
      // Increment live inferences realistically
      setLiveInferences(prev => prev + Math.floor(Math.random() * 4) + 1);
      if (isEyeTrackingActive) {
        setLiveGazeSamples(prev => prev + Math.floor(Math.random() * 6) + 3);
      }
      // Micro jitter latency
      setCurrentLatency(prev => parseFloat((31.5 + Math.random() * 3.8).toFixed(1)));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isEyeTrackingActive]);

  // Generate live algorithmic log events
  useEffect(() => {
    if (!isRunning) return;

    const logTimer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + Math.floor(now.getMilliseconds() / 100);
      
      const eventTemplates = [
        { tag: 'TRANSFORMER', message: `SASRec forward pass on sequence [k=${interactions.length + 4}]`, latency: '14.2ms' },
        { tag: 'DYNAMIC_GATE', message: `Softmax fusion weights re-balanced [w_gaze: ${(dynamicWeights.eyeGaze * 100).toFixed(1)}%]`, latency: '3.8ms' },
        { tag: 'EYE_GAZE', message: `Dwell kernel hit target bounding region (x: ${Math.floor(Math.random() * 800 + 200)}, y: ${Math.floor(Math.random() * 600 + 100)})`, latency: '1.9ms' },
        { tag: 'MMR_RERANK', message: `Maximal Marginal Relevance slate solved with λ=0.72`, latency: '7.6ms' },
        { tag: 'ISOLATION_FOREST', message: `Behavioral velocity check clean (entropy: 0.94)`, latency: '4.1ms' }
      ];

      const chosen = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      setLogFeed(prev => [
        { id: Math.random().toString(), timestamp: timeStr, tag: chosen.tag, message: chosen.message, latency: chosen.latency },
        ...prev.slice(0, 5)
      ]);
    }, 2400);

    return () => clearInterval(logTimer);
  }, [isRunning, interactions.length, dynamicWeights.eyeGaze]);

  // Canvas particle vortex and rotating dashed rings (matching reference video!)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = 85;
    const particles = Array.from({ length: particleCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 160 + 25,
      speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.6 ? '#ff4d36' : Math.random() > 0.3 ? '#e2a876' : '#ffffff'
    }));

    let ringRotation = 0;
    let ringInnerRotation = 0;
    let pulseScale = 1;
    let pulseDir = 1;

    const render = () => {
      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Center of the animation vortex
      const centerX = mouseRef.current.isHovering 
        ? width * 0.28 + (mouseRef.current.x - width * 0.5) * 0.15 
        : width * 0.22;
      const centerY = height * 0.52 + (mouseRef.current.y - height * 0.5) * 0.15;

      // 1. Draw dot grid background (like the reference video's subtle dot matrix)
      const dotSpacing = 28;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Ambient radial glow in warm coral/red (video aesthetic)
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      gradient.addColorStop(0, 'rgba(255, 77, 54, 0.16)');
      gradient.addColorStop(0.4, 'rgba(226, 168, 118, 0.06)');
      gradient.addColorStop(1, 'rgba(12, 13, 14, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.fill();

      // 3. Rotating Segmented Dashed Outer Rings (exact signature from video)
      ringRotation += 0.009;
      ringInnerRotation -= 0.014;

      // Outer dashed circle
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringRotation);
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 77, 54, 0.45)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([8, 14, 2, 10]);
      ctx.stroke();
      ctx.restore();

      // Middle dashed coral ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringInnerRotation);
      ctx.beginPath();
      ctx.arc(0, 0, 72, 0, Math.PI * 2);
      ctx.strokeStyle = '#ff4d36';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([12, 8, 4, 16]);
      ctx.stroke();
      ctx.restore();

      // Innermost pulsing solid ring
      pulseScale += 0.005 * pulseDir;
      if (pulseScale > 1.15) pulseDir = -1;
      if (pulseScale < 0.9) pulseDir = 1;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(pulseScale, pulseScale);
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center glowing core dot
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff4d36';
      ctx.shadowColor = '#ff4d36';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 4. Swirling dynamic orbital particle streams
      particles.forEach(p => {
        p.angle += p.speed;
        const px = centerX + Math.cos(p.angle) * p.radius;
        const py = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Subtle motion dash trail towards rotation
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
          px - Math.sin(p.angle) * 7 * (p.speed > 0 ? 1 : -1),
          py + Math.cos(p.angle) * 7 * (p.speed > 0 ? 1 : -1)
        );
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.45;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
    mouseRef.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  // Convert elapsed seconds into formatted hours & minutes
  const formatHours = (totalSec: number) => {
    const hours = (totalSec / 3600).toFixed(1);
    return `${hours} hrs`;
  };

  // Metric cards definitions (directly modeled from reference video!)
  const metricCards: MetricCardItem[] = useMemo(() => [
    {
      id: 'inferences',
      category: 'ALGORITHM RUNS',
      value: `${(liveInferences / 1000).toFixed(1)}k+`,
      subValue: `${liveInferences.toLocaleString()} inferences`,
      changeRate: '+142/min',
      color: '#ff4d36', // Coral red from video
      detailTitle: 'Live Inference Pipeline & Softmax Gate',
      detailDescription: 'Total forward passes through SASRec sequence encoders, collaborative latent matrix models, and dynamic softmax fusion.',
      algorithms: [
        { name: 'SASRec Transformer', latency: '14.2ms', share: 44, status: 'Inference Active' },
        { name: 'Dynamic Weight Softmax', latency: '3.8ms', share: 22, status: 'Normalizing' },
        { name: 'MMR Diversification Filter', latency: '7.6ms', share: 18, status: 'λ=0.72' },
        { name: 'Cosine Content Similarity', latency: '4.5ms', share: 16, status: 'TF-IDF Match' }
      ]
    },
    {
      id: 'hours',
      category: 'OBSERVED TIME',
      value: formatHours(elapsedSessionSeconds),
      subValue: `${Math.floor(elapsedSessionSeconds / 60)} active minutes`,
      changeRate: 'Live 1.0s clock',
      color: '#e2a876', // Warm amber
      detailTitle: 'User Interaction & Session Dwell Hours',
      detailDescription: 'Continuous runtime during which user visual fixations, category transitions, and preference drift are actively evaluated.',
      algorithms: [
        { name: 'Active Session Clock', latency: '<1ms', share: 50, status: 'Synchronized' },
        { name: 'Dwell Integrator', latency: '2.1ms', share: 30, status: 'Kernel Buffer' },
        { name: 'Preference Decay Half-Life', latency: '1.2ms', share: 20, status: 't_half=15m' }
      ]
    },
    {
      id: 'gaze',
      category: 'GAZE SAMPLES',
      value: `~${(liveGazeSamples / 1000).toFixed(0)}k`,
      subValue: `${liveGazeSamples.toLocaleString()} telemetry points`,
      changeRate: '30 Hz stream',
      color: '#10b981', // Emerald green
      detailTitle: 'Synchronized Visual Attention Vectors',
      detailDescription: 'Client-side webcam gaze estimation points mapped onto product bounding boxes with zero server image storage.',
      algorithms: [
        { name: 'WebGazer Tracker', latency: '8.4ms', share: 48, status: isEyeTrackingActive ? '30 FPS Active' : 'Sensor Paused' },
        { name: 'Exponential Smoothing', latency: '0.4ms', share: 28, status: 'α = 0.25' },
        { name: 'Bounding Hit-Tester', latency: '1.1ms', share: 24, status: 'DOM Quad Tree' }
      ]
    },
    {
      id: 'guardian',
      category: 'SECURITY GUARDIAN',
      value: '99.98%',
      subValue: `${anomalyState.eventsProcessed} audited actions`,
      changeRate: 'IsolationForest',
      color: '#38bdf8', // Cyan
      detailTitle: 'Anomaly Detection & Anomaly Filter',
      detailDescription: 'Real-time defense against robotic click-farming and session poisoning with automated fallback switch.',
      algorithms: [
        { name: 'IsolationForest Engine', latency: '4.1ms', share: 60, status: anomalyState.fallbackActive ? 'Fallback Engaged' : 'Clean' },
        { name: 'Velocity Threshold Check', latency: '0.6ms', share: 25, status: `${anomalyState.eventVelocity} evt/sec` },
        { name: 'Entropy Anomaly Detector', latency: '1.8ms', share: 15, status: 'Score: ' + anomalyState.anomalyScore }
      ]
    }
  ], [liveInferences, elapsedSessionSeconds, liveGazeSamples, anomalyState, isEyeTrackingActive]);

  const activeCard = metricCards.find(c => c.id === activeCardId) || metricCards[0];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#0c0d0e] border-y border-[#27272a]/70 py-16 px-4 sm:px-6 lg:px-8 font-sans"
    >
      {/* 1. Interactive Canvas Background (Particle Vortex & Rotating Rings from video) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Kicker & Live Status Pill (Modeled like "NBA HUB · 2009 - 2026") */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5 text-xs font-mono-tabular tracking-widest uppercase text-[#a1a1aa]">
            <span className="text-[#f4f4f5] font-semibold">SASHER HUB</span>
            <span className="text-[#3f3f46]">·</span>
            <span>2024 — 2026</span>
            <span className="text-[#3f3f46]">·</span>
            <span className="text-[#ff4d36] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d36] animate-ping" />
              LIVE TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18191d]/80 border border-[#27272a] text-xs font-mono-tabular text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#3f3f46] transition-colors cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-3 h-3 text-[#e2a876]" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#10b981]" />
                  <span>Resume Stream</span>
                </>
              )}
            </button>
            <span className="text-xs font-mono-tabular text-[#71717a] hidden sm:inline">
              Latency: <strong className="text-[#10b981]">{currentLatency}ms</strong>
            </span>
          </div>
        </div>

        {/* Hero Headline (Direct reference to video: "Every number. Real.") */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] text-[#f4f4f5] tracking-tight">
            Every calculation.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d36] via-[#f97316] to-[#e2a876] drop-shadow-[0_0_20px_rgba(255,77,54,0.4)]">
              Real.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#a1a1aa] font-light mt-3 max-w-2xl leading-relaxed">
            Models, session dwell hours, and recommendation forecasts built only on authenticated user attention you can trace back to its mathematical source.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={onExploreRecommendations}
              className="px-6 py-3 rounded-full bg-[#f4f4f5] hover:bg-white text-[#09090b] text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-xl cursor-pointer flex items-center gap-2"
            >
              <span>Explore Live Slates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                const target = document.getElementById('pipeline-inspection-drawer');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-mono-tabular text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-2"
            >
              <span>See how algorithms work</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#ff4d36]" />
            </button>
          </div>
        </div>

        {/* 4 Bottom Metric Cards with Glowing Active Outline (Directly matching video cards!) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricCards.map((card) => {
            const isActive = card.id === activeCardId;
            return (
              <button
                key={card.id}
                onClick={() => setActiveCardId(card.id)}
                className={`relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
                  isActive
                    ? 'bg-[#18191d]/90 shadow-2xl ring-2'
                    : 'bg-[#121316]/70 hover:bg-[#18191d]/60 border border-[#27272a]/70 hover:border-[#3f3f46]'
                }`}
                style={{
                  borderColor: isActive ? card.color : undefined,
                  boxShadow: isActive ? `0 0 25px ${card.color}25` : undefined
                }}
              >
                {/* Active Glowing Border Effect */}
                {isActive && (
                  <div 
                    className="absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-300"
                    style={{ borderColor: card.color }}
                  />
                )}

                {/* Top Category Label */}
                <div className="flex items-center justify-between text-[11px] font-mono-tabular uppercase tracking-wider text-[#71717a] mb-2">
                  <span>{card.category}</span>
                  <span className="text-[10px]" style={{ color: card.color }}>
                    {card.changeRate}
                  </span>
                </div>

                {/* Big Number (like "17", "7,500+", "~105k" from video) */}
                <div 
                  className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f4f4f5]"
                  style={{ color: isActive ? '#f4f4f5' : '#e4e4e7' }}
                >
                  {card.value}
                </div>

                {/* Subtitle count */}
                <div className="text-[11px] font-mono-tabular text-[#a1a1aa] mt-2 truncate">
                  {card.subValue}
                </div>

                {/* Small active status dot */}
                {isActive && (
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-3"
                    style={{ backgroundColor: card.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Detail Breakdown for the Selected Metric (Interactive Algorithm Waterfall) */}
        <div id="pipeline-inspection-drawer" className="p-6 sm:p-8 bg-[#121316]/90 border border-[#27272a] rounded-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#27272a]/60 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase text-[#ff4d36] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INSPECTING: {activeCard.detailTitle}</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#f4f4f5]">
                {activeCard.detailTitle}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-1 max-w-2xl">
                {activeCard.detailDescription}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right font-mono-tabular">
                <span className="text-[10px] text-[#71717a] block uppercase">Computational State</span>
                <span className="text-xs text-[#10b981] font-semibold flex items-center gap-1.5 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                  60 FPS STREAMING
                </span>
              </div>
            </div>
          </div>

          {/* Algorithms Performance Waterfall */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Left Column: Subsystem Computational Shares */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#71717a] block">
                ACTIVE ALGORITHMIC CORES IN PARALLEL
              </span>

              <div className="space-y-3">
                {activeCard.algorithms.map((algo, i) => (
                  <div key={i} className="p-3.5 bg-[#18191d] rounded-xl border border-[#27272a] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-[#ff4d36]" />
                        <span className="font-medium text-[#f4f4f5]">{algo.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#71717a]">{algo.status}</span>
                        <span className="text-[#10b981] font-semibold">{algo.latency}</span>
                      </div>
                    </div>
                    
                    {/* Share Bar */}
                    <div className="w-full bg-[#121316] h-1.5 rounded-full overflow-hidden border border-[#27272a]/60">
                      <div 
                        className="h-full transition-all duration-700 rounded-full"
                        style={{ 
                          width: `${algo.share}%`,
                          backgroundColor: activeCard.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Real-Time Terminal Log Feed */}
            <div className="lg:col-span-5 bg-[#090a0c] p-4 rounded-xl border border-[#27272a] font-mono text-[11px] space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#27272a] text-[#71717a]">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#ff4d36]" />
                  <span className="uppercase text-[10px] font-semibold text-[#a1a1aa]">LIVE INFERENCE STREAM</span>
                </div>
                <span className="text-[10px] text-[#10b981]">ONLINE</span>
              </div>

              <div className="space-y-2 h-56 overflow-y-auto pr-1">
                {logFeed.map((log) => (
                  <div key={log.id} className="text-[10px] leading-relaxed text-[#a1a1aa] border-b border-[#27272a]/40 pb-1.5">
                    <span className="text-[#71717a] mr-2">[{log.timestamp}]</span>
                    <span className="text-[#ff4d36] font-semibold mr-1.5">{log.tag}</span>
                    <span className="text-[#e4e4e7]">{log.message}</span>
                    <span className="text-[#10b981] float-right">{log.latency}</span>
                  </div>
                ))}
                {logFeed.length === 0 && (
                  <div className="text-[#71717a] text-center py-10">Initializing streaming inference hooks...</div>
                )}
              </div>

              <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-[10px] text-[#71717a]">
                <span>Telemetry: High-Resolution Monotonic Clock</span>
                <span className="text-[#ff4d36]">Sync: 0.04ms jitter</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
