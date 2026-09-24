import React, { useState } from 'react';
import { SasherProvider, useSasher } from './context/SasherContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/navigation/Navbar';
import { CartDrawer } from './components/navigation/CartDrawer';
import { HeroSection } from './components/hero/HeroSection';
import { VisualIntentControl } from './components/eyetracking/VisualIntentControl';
import { CalibrationModal } from './components/eyetracking/CalibrationModal';
import { GazeDebugModal } from './components/eyetracking/GazeDebugModal';
import { ProductGrid } from './components/product/ProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { WhyRecommendedModal } from './components/recommendations/WhyRecommendedModal';
import { LiveAdaptationDemo } from './components/session/LiveAdaptationDemo';
import { SessionIntentWidget } from './components/session/SessionIntentWidget';
import { AiInsightsView } from './components/insights/AiInsightsView';
import { ResearchDashboardView } from './components/research/ResearchDashboardView';
import { TrustStatusPanel } from './components/security/TrustStatusPanel';
import { Footer } from './components/footer/Footer';
import { LiveTelemetryHub } from './components/analytics/LiveTelemetryHub';
import { CustomCursor } from './components/ui/CustomCursor';
import { GoogleSignInModal } from './components/auth/GoogleSignInModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { GazeTrackingStudioView } from './components/eyetracking/GazeTrackingStudioView';
import { PlatformAnalyticsView } from './components/analytics/PlatformAnalyticsView';
import { RecommendedProduct } from './types';
import { Sparkles, Eye, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('discover');
  const [selectedProductForModal, setSelectedProductForModal] = useState<RecommendedProduct | null>(null);

  const {
    setExplanationModalProduct,
    recentAdaptiveNotification,
    dismissAdaptiveNotification,
    isProjectDrawerOpen,
    setIsProjectDrawerOpen,
    activeSuggestedProject
  } = useSasher();

  const scrollToCatalog = () => {
    setCurrentTab('discover');
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    setCurrentTab('gaze_studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#ff6b1a]/20 selection:text-[#faebd7]">
      {/* Custom Cursor & Glow with Magnetic Reaction */}
      <CustomCursor />

      {/* Google Authentication Modal */}
      <GoogleSignInModal />

      {/* 3-Zone Global Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Floating Top-Right Eye-Tracking Attention Control */}
      <VisualIntentControl />

      {/* Modals & Slide-out Panels */}
      <CalibrationModal />
      <GazeDebugModal />
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onViewResearch={() => {
          setSelectedProductForModal(null);
          setCurrentTab('research');
          setTimeout(() => {
            const el = document.getElementById('section-product-research');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />
      <WhyRecommendedModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Dynamic Adaptive Notification Toast (Rule 13) */}
      {recentAdaptiveNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#18191d]/95 border border-[#10b981]/50 rounded-xl p-3.5 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping shrink-0" />
            <span className="text-[#f4f4f5] font-medium leading-snug">
              {recentAdaptiveNotification}
            </span>
          </div>
          <button
            onClick={dismissAdaptiveNotification}
            className="text-[#71717a] hover:text-[#f4f4f5] transition-colors p-1"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tab Routed Views */}
      <main className="flex-1">
        {currentTab === 'discover' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onExplore={scrollToCatalog}
              onHowItWorks={scrollToHowItWorks}
              onOpenTelemetry={() => setCurrentTab('telemetry')}
            />

            {/* Advanced Animated Live Telemetry & Algorithms Engine (Reference Video Signature) */}
            <LiveTelemetryHub onExploreRecommendations={scrollToCatalog} />

            {/* Live Recommendation Adaptation Demo */}
            <LiveAdaptationDemo />

            {/* Catalog Grid */}
            <div id="catalog-section">
              <ProductGrid
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                onExplainProduct={(p) => setExplanationModalProduct(p)}
              />
            </div>

            {/* Session Intent & Security Trust Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 border-t border-[#27272a]/60">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <SessionIntentWidget />
                </div>
                <div className="lg:col-span-5">
                  <TrustStatusPanel />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'telemetry' && (
          <div className="space-y-12 pb-16">
            <LiveTelemetryHub onExploreRecommendations={scrollToCatalog} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <LiveAdaptationDemo />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <SessionIntentWidget />
                </div>
                <div className="lg:col-span-5">
                  <TrustStatusPanel />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'recommendations' && (
          <div className="pt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <SessionIntentWidget />
            </div>
            <ProductGrid
              onSelectProduct={(p) => setSelectedProductForModal(p)}
              onExplainProduct={(p) => setExplanationModalProduct(p)}
            />
          </div>
        )}

        {currentTab === 'gaze_studio' && <GazeTrackingStudioView />}

        {currentTab === 'platform_analytics' && <PlatformAnalyticsView />}

        {currentTab === 'insights' && <AiInsightsView />}

        {currentTab === 'research' && <ResearchDashboardView />}
      </main>

      {/* Editorial Footer */}
      <Footer onSelectTab={(tab) => setCurrentTab(tab)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SasherProvider>
        <MainLayout />
      </SasherProvider>
    </AuthProvider>
  );
}
